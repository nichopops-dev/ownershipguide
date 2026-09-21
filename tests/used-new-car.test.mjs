import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const { compare } = require('../scripts/used-new-car-model.js');
const html = readFileSync(new URL('../used-car-vs-new-car-calculator-singapore.html', import.meta.url), 'utf8');
const defaults = Object.fromEntries([...html.matchAll(/<input\b[^>]*name="([^"]+)"[^>]*value="([^"]+)"/g)].map(m => [m[1], Number(m[2])]));
const near = (actual, expected, tolerance = 0.005) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);

test('published defaults reconcile ownership cost and cash', () => {
  const r = compare(defaults);
  near(r.used.total, 112075); near(r.new.total, 136787.4);
  near(r.used.monthly, 1867.9167); near(r.new.monthly, 2279.79);
  near(r.used.exitEquity, 25000); near(r.new.exitEquity, 43100);
  near(r.used.netCash, r.used.total); near(r.new.netCash, r.new.total);
  assert.equal(r.winner, 'Used');
  for (const amount of ['112,075.00','136,787.40','1,867.92','2,279.79','24,712.40']) assert.ok(html.includes(amount));
});

test('holding period does not shorten either loan', () => {
  const r = compare({...defaults, years:2, usedExit:70000, newExit:115000, usedSettlement:47000, newSettlement:76000});
  assert.equal(r.used.payments, 24); assert.equal(r.new.payments, 24);
  near(r.used.instalments, 21150); near(r.new.instalments, 34074.96);
  assert.equal(r.used.loanMonths, 84); assert.equal(r.new.loanMonths, 84);
});

test('payments stop at maturity and settled loans require zero exit debt', () => {
  const r = compare({...defaults, years:7, usedSettlement:0, newSettlement:0});
  assert.equal(r.used.payments, 84); assert.equal(r.new.payments, 84);
  assert.throws(() => compare({...defaults, years:7, usedSettlement:1}), /settlement must be zero/);
});

test('cash purchases have no instalments, finance cost or exit settlement', () => {
  const r = compare({...defaults, usedDownPct:100, usedLoanMonthly:0, usedLoanYears:0, usedSettlement:0});
  near(r.used.financeCost, 0); assert.equal(r.used.payments, 0); near(r.used.netCash, r.used.total);
  assert.throws(() => compare({...defaults, usedDownPct:100, usedLoanMonthly:1, usedLoanYears:0, usedSettlement:0}), /cash purchase/);
});

test('negative exit equity remains visible and cash still reconciles', () => {
  const r = compare({...defaults, usedExit:10000, usedSettlement:20000});
  assert.equal(r.used.exitEquity, -10000); near(r.used.netCash, r.used.total);
});

test('incomplete loan cash is rejected instead of creating fake savings', () => {
  assert.throws(() => compare({...defaults, usedSettlement:0}), /does not cover the purchase price/);
  assert.throws(() => compare({...defaults, newLoanMonthly:0}), /positive new car loan term/);
});

test('blank, nonfinite, negative and non-month horizons fail', () => {
  for (const key of Object.keys(defaults)) {
    for (const value of ['', NaN, Infinity, null]) assert.throws(() => compare({...defaults, [key]:value}));
  }
  for (const update of [{years:0}, {years:5.1}, {usedDownPct:101}, {newPrice:0}, {usedAnnual:-1}, {newLoanYears:10.1}]) {
    assert.throws(() => compare({...defaults, ...update}));
  }
});

test('calculator UI hides stale results, recovers and resets defaults', () => {
  const nodes = new Map();
  for (const m of html.matchAll(/\bid="([^"]+)"/g)) nodes.set(m[1], {textContent:'', innerHTML:'', hidden:false});
  const fields = Object.entries(defaults).map(([name,value]) => ({name, value:String(value)}));
  const handlers = {};
  const form = {querySelectorAll:() => fields, addEventListener:(type,fn) => {handlers[type] = fn;}};
  new vm.Script(readFileSync(new URL('../scripts/used-new-car-calculator.js', import.meta.url), 'utf8')).runInNewContext({
    document:{querySelector:() => form, getElementById:id => {assert.ok(nodes.has(id), id); return nodes.get(id);}},
    window:{OGUsedNewCar:{compare}}, Intl, setTimeout:fn => fn()
  });
  assert.equal(nodes.get('calculator-results').hidden, false);
  fields.find(f => f.name === 'years').value = '';
  handlers.input();
  assert.equal(nodes.get('calculator-results').hidden, true);
  assert.match(nodes.get('calculator-error').textContent, /Enter holding period/);
  fields.find(f => f.name === 'years').value = '5';
  let prevented = false;
  handlers.submit({preventDefault(){prevented = true;}});
  assert.equal(prevented, true);
  assert.equal(nodes.get('calculator-results').hidden, false);
  fields.forEach(f => {f.value = String(defaults[f.name]);});
  handlers.reset();
  assert.match(nodes.get('usedMonthly').textContent, /1,867\.92/);
  assert.match(nodes.get('tbody').innerHTML, /Financing cost through exit/);
});
