import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const {compare} = require('../scripts/lease-buy-model.js');
const html = readFileSync(new URL('../car-leasing-vs-buying-calculator-singapore.html', import.meta.url), 'utf8');
const defaults = Object.fromEntries([...html.matchAll(/<input\b[^>]*name="([^"]+)"[^>]*value="([^"]+)"/g)].map(m => [m[1], Number(m[2])]));
for (const m of html.matchAll(/<select\b[^>]*name="([^"]+)"[^>]*>([\s\S]*?)<\/select>/g)) {
  defaults[m[1]] = m[2].match(/<option\b[^>]*value="([^"]+)"[^>]*selected[^>]*>/)[1];
}
const near = (a,b) => assert.ok(Math.abs(a-b) < 0.005, a + ' != ' + b);

test('lease-buy published defaults reconcile cost, cash and rental threshold', () => {
  const r = compare(defaults);
  near(r.lease.total, 81150); near(r.buy.total, 89690);
  near(r.buy.financeCost, 10040); near(r.difference, 8540);
  near(r.leaseBreakEvenMonthly, 2037.222222);
  near(r.buy.netCash, r.buy.total); near(r.lease.netCash, r.lease.total);
  near(r.buy.exitEquity, 30000); near(r.lease.exitCash, 2400);
  assert.equal(r.winner, 'Lease');
  for (const amount of ['89,690.00','81,150.00','8,540.00','2,037.22']) assert.ok(html.includes(amount));
});
test('sale below settlement retains the additional exit cash owed', () => {
  const r = compare({...defaults, resaleValue:25000});
  near(r.buy.exitEquity, -10000); near(r.buy.total, 129690);
  near(r.buy.netCash, r.buy.total); near(r.difference, 48540);
});
test('refundable deposit changes cash tied up but leaves total cost unchanged', () => {
  const base = compare(defaults), r = compare({...defaults, leaseDeposit:8000});
  near(r.lease.total, base.lease.total);
  near(r.lease.upfront - base.lease.upfront, 5000);
  near(r.lease.exitCash - base.lease.exitCash, 5000);
  near(r.lease.netCash, r.lease.total);
});
test('deposit forfeiture or return fees are charged once', () => {
  const base = compare(defaults), r = compare({...defaults, leaseEndFees:3000});
  near(r.lease.exitCash, 0); near(r.lease.total - base.lease.total, 2400);
  near(r.lease.netCash, r.lease.total);
});
test('lease exclusions and route extras affect the correct route only', () => {
  const base = compare(defaults);
  const r = compare({...defaults, leaseIncludesInsurance:'no', leaseExtraMonthly:100, buyExtraMonthly:50});
  near(r.lease.total - base.lease.total, 1200 * 3 + 100 * 36);
  near(r.buy.total - base.buy.total, 50 * 36);
  near(r.leaseBreakEvenMonthly - base.leaseBreakEvenMonthly, -150);
});
test('instalments stop at maturity and exit debt must then be zero', () => {
  const r = compare({...defaults, horizonYears:8, loanSettlement:0});
  assert.equal(r.buy.paidMonths, 60); near(r.buy.instalments, 98400);
  near(r.buy.financeCost, 14400); near(r.buy.netCash, r.buy.total);
  assert.throws(() => compare({...defaults, horizonYears:5}), /settlement must be zero/);
});
test('quoted loan cash is validated and a cash purchase carries no financing', () => {
  assert.throws(() => compare({...defaults, loanSettlement:0}), /do not cover/);
  assert.throws(() => compare({...defaults, loanMonthly:0}), /quoted monthly instalment/);
  assert.throws(() => compare({...defaults, downPct:100}), /cash purchase/);
  const r = compare({...defaults, downPct:100, loanYears:0, loanMonthly:0, loanSettlement:0});
  near(r.buy.financeCost, 0); assert.equal(r.buy.paidMonths, 0);
  near(r.buy.netCash, r.buy.total);
});
test('reducing-balance estimate reconciles an independent repayment schedule', () => {
  const r = compare({...defaults, loanType:'effective', loanMonthly:'', loanSettlement:''});
  let balance = 84000, interest = 0;
  for (let i=0; i<36; i++) {
    const charge = balance * 0.06 / 12;
    interest += charge; balance += charge - r.buy.payment;
  }
  near(r.buy.settlement, balance); near(r.buy.financeCost, interest);
  near(r.buy.netCash, r.buy.total);
});
test('zero rate and a loan shorter than the horizon remain meaningful', () => {
  const r = compare({...defaults, loanType:'effective', rate:0});
  near(r.buy.payment, 1400); near(r.buy.settlement, 33600);
  near(r.buy.financeCost, 0);
  const tiny = compare({...defaults, loanType:'effective', rate:1e-18});
  near(tiny.buy.payment, 1400); near(tiny.buy.settlement, 33600);
  near(tiny.buy.financeCost, 0);
  const ended = compare({...defaults, loanType:'effective', horizonYears:8});
  assert.equal(ended.buy.paidMonths, 60); near(ended.buy.settlement, 0);
});
test('signed vehicle value changes, ties and negative rental thresholds survive', () => {
  const base = compare(defaults);
  const tie = compare({...defaults, leaseMonthly:base.leaseBreakEvenMonthly});
  assert.equal(tie.winner, 'Tie');
  const gain = compare({...defaults, downPct:100, loanYears:0, loanMonthly:0, loanSettlement:0, resaleValue:200000});
  assert.ok(gain.buy.total < 0); assert.ok(gain.leaseBreakEvenMonthly < 0);
  near(gain.buy.netCash, gain.buy.total);
});
test('missing, negative, nonfinite and fractional-month inputs fail clearly', () => {
  for (const key of Object.keys(defaults).filter(k => typeof defaults[k] === 'number' && k !== 'rate')) {
    for (const value of ['', null, NaN, Infinity, -1]) assert.throws(() => compare({...defaults, [key]:value}), key);
  }
  for (const change of [{horizonYears:0}, {horizonYears:3.1}, {loanYears:5.1}, {downPct:101}, {buyPrice:0}, {kmPerL:0}, {loanType:'flat'}, {leaseIncludesInsurance:'maybe'}]) {
    assert.throws(() => compare({...defaults, ...change}));
  }
  assert.doesNotThrow(() => compare({...defaults, rate:''}));
  assert.throws(() => compare({...defaults, loanType:'effective', rate:''}), /Enter annual/);
});
test('lease-buy UI clears stale results, switches financing mode and resets', () => {
  const nodes = new Map();
  for (const m of html.matchAll(/\bid="([^"]+)"/g)) nodes.set(m[1], {textContent:'',innerHTML:'',hidden:false});
  const fields = Object.entries(defaults).map(([name,value]) => ({name,value:String(value)}));
  const handlers = {};
  const form = {querySelectorAll:() => fields, addEventListener:(type,fn) => {handlers[type]=fn;}};
  new vm.Script(readFileSync(new URL('../scripts/lease-buy-calculator.js', import.meta.url), 'utf8')).runInNewContext({
    document:{querySelector:() => form, getElementById:id => {assert.ok(nodes.has(id), id); return nodes.get(id);}},
    window:{OGLeaseBuy:{compare}}, Intl, setTimeout:fn => fn()
  });
  assert.equal(nodes.get('calculator-results').hidden, false);
  assert.match(nodes.get('buyTotal').textContent, /89,690\.00/);
  fields.find(f => f.name === 'resaleValue').value = '25000';
  handlers.input(); assert.match(nodes.get('buy-exit').textContent, /-10,000\.00/);
  fields.find(f => f.name === 'horizonYears').value = '';
  handlers.input();
  assert.equal(nodes.get('calculator-results').hidden, true);
  assert.match(nodes.get('calculator-error').textContent, /Enter comparison/);
  fields.forEach(f => {f.value=String(defaults[f.name]);});
  fields.find(f => f.name === 'loanType').value = 'effective';
  handlers.change();
  assert.equal(nodes.get('quote-fields').hidden, true);
  assert.equal(nodes.get('estimate-fields').hidden, false);
  fields.forEach(f => {f.value=String(defaults[f.name]);});
  handlers.reset();
  assert.equal(nodes.get('calculator-results').hidden, false);
  assert.match(nodes.get('leaseTotal').textContent, /81,150\.00/);
  const rows = nodes.get('rows').innerHTML;
  assert.ok(!rows.includes('Loan payments'));
  assert.match(rows, /Financing cost through exit/);
});
