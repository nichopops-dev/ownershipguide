import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const M = require('../scripts/finance-models.js');
const near = (actual, expected, tolerance = .005) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);

// Read the values users actually see, so edited defaults cannot silently drift
// away from the worked arithmetic or input names expected by the model.
function defaults(file) {
  const html = readFileSync(new URL('../' + file, import.meta.url), 'utf8');
  const values = {};
  for (const m of html.matchAll(/<input\b([^>]+)>/g)) {
    const a = Object.fromEntries([...m[1].matchAll(/([\w-]+)="([^"]*)"/g)].map(x => [x[1], x[2]]));
    if (a.name) values[a.name] = a.type === 'checkbox' ? false : a.value;
  }
  for (const m of html.matchAll(/<select\b[^>]*name="([^"]+)"[^>]*>\s*<option value="([^"]+)"/g)) values[m[1]] = m[2];
  return values;
}
const loan = () => defaults('car-loan-calculator-singapore.html');
const car = () => defaults('car-affordability-calculator-singapore.html');
const home = () => defaults('property-affordability-calculator-singapore.html');
const life = () => defaults('life-insurance-calculator-singapore.html');

test('flat loan defaults reproduce the full-term worked example', () => {
  const r = M.carLoan(loan()); near(r.principal, 84000); near(r.monthly, 1194.6); near(r.interest, 16346.4); near(r.total, 100346.4);
  const rate = Math.pow(1 + r.eir / 100, 1 / 12) - 1;
  near(M.presentValue(r.monthly, rate, 84), 84000);
});
test('fees increase effective cost without silently financing the fees', () => {
  const base = M.carLoan(loan()), r = M.carLoan({...loan(), fees: 1000});
  near(r.monthly, base.monthly); near(r.total, base.total + 1000); assert.ok(r.eir > base.eir);
  near(M.presentValue(r.monthly, Math.pow(1 + r.eir / 100, 1 / 12) - 1, 84), 83000);
});
test('annual effective input round-trips, including zero-rate and cash purchase', () => {
  near(M.carLoan({...loan(), mode: 'effective', rate: 12}).eir, 12);
  const zero = M.carLoan({...loan(), rate: 0}); near(zero.monthly, 1000); near(zero.eir, 0);
  const cash = M.carLoan({...loan(), down: 120000}); near(cash.monthly, 0); near(cash.eir, 0);
});
test('loan cap depends on OMV and invalid tenures/fees cannot produce a quote', () => {
  assert.equal(M.carLoan(loan()).overCap, false);
  assert.equal(M.carLoan({...loan(), omv: 'high'}).overCap, true);
  for (const update of [{months: 0}, {months: 85}, {months: 12.5}, {fees: 84000}, {rate: ''}, {price: -1}]) {
    assert.throws(() => M.carLoan({...loan(), ...update}));
  }
});
test('car direct budget subtracts savings and applies repairs in both modes', () => {
  near(M.carBudget(car()).remaining, 400);
  near(M.carBudget({...car(), stressIncome: true}).remaining, -1040);
  near(M.carBudget({...car(), stressRepair: true}).remaining, 100);
  const base = M.carBudget({...car(), mode: 'components'});
  near(M.carBudget({...car(), mode: 'components', stressRepair: true}).remaining, base.remaining - 300);
});
test('car cashflow and ownership cost reconcile at an early exit', () => {
  const x = {...car(), mode: 'components', hold: 24}; const r = M.carBudget(x);
  near(r.upfront + r.monthlyCash * 24 - r.exitEquity, r.economic * 24);
  assert.notEqual(r.monthlyCash, r.economic);
});
test('car budget includes road tax exactly once and no interest after payoff', () => {
  const x = {...car(), mode: 'components', hold: 120};
  const r = M.carBudget(x), noTax = M.carBudget({...x, tax: 0});
  near(r.economic - noTax.economic, 67); near(r.monthlyCash - noTax.monthlyCash, 67);
  near(r.interest, M.carBudget({...x, hold: 60}).interest);
  near(r.exitEquity, 75000);
});
test('car zero income is not a safe percentage, blanks fail, losses at exit retain their sign', () => {
  assert.equal(M.carBudget({...car(), income: 0}).ratio, null);
  assert.equal(M.carBudget({...car(), income: 0}).status, 'NO INCOME ENTERED');
  assert.throws(() => M.carBudget({...car(), income: ''}));
  assert.ok(M.carBudget({...car(), mode: 'components', resale: 0, hold: 1}).exitEquity < 0);
});
test('bank capacity uses assessment floor even when payment rate is low', () => {
  const low = M.property({...home(), rate: 1, assessment: 1});
  const high = M.property({...home(), rate: 3, assessment: 4});
  near(low.assessRate, 4); near(low.incomeCap, high.incomeCap);
  assert.ok(low.instalment < high.instalment);
});
test('HDB bank loan uses both MSR and TDSR, including existing housing payments', () => {
  const x = {...home(), route: 'bankhdb'}; const r = M.property(x);
  near(M.payment(r.incomeCap, .04 / 12, 300), 3600);
  near(M.payment(M.property({...x, housingDebt: 1000}).incomeCap, .04 / 12, 300), 2600);
  assert.equal(r.status, 'EXCEEDS MODELLED LIMIT');
  assert.ok(M.property({...x, debt: 6500}).incomeCap < r.incomeCap);
});
test('HDB concessionary loan uses MSR and its own floor, not bank TDSR', () => {
  const r = M.property({...home(), route: 'hdb', debt: 6500, rate: 2.6, assessment: 2.6});
  near(r.assessRate, 3); near(M.payment(r.incomeCap, .03 / 12, 300), 3600);
  assert.throws(() => M.property({...home(), route: 'hdb', years: 26}));
  assert.throws(() => M.property({...home(), route: 'hdb', existing: 1}));
});
test('LTV, age and tenure restrictions are independent from income capacity', () => {
  near(M.property({...home(), age: 41}).ltv, .55);
  near(M.property({...home(), existing: 1}).ltv, .45);
  near(M.property({...home(), existing: 2, years: 31}).ltv, .15);
  near(M.property({...home(), route: 'bankhdb', years: 26}).ltv, .55);
  assert.throws(() => M.property({...home(), route: 'bankhdb', years: 31}));
});
test('valuation gap uses lower value for lending and higher value for duty', () => {
  const r = M.property({...home(), price: 1500000, valuation: 1400000});
  near(r.ltvCap, 1050000); near(r.minCash, 170000); near(r.duties, 44600);
  near(M.bsd(800000), 18600);
  near(M.property({...home(), price: 1400000, valuation: 1500000}).duties, 44600);
});
test('cash purchase remains a zero-payment scenario and empty property inputs fail', () => {
  near(M.property({...home(), downPct: 100}).instalment, 0);
  assert.throws(() => M.property({...home(), income: ''}));
  assert.throws(() => M.property({...home(), housingDebt: 1201}));
});
test('life defaults reproduce the expense-based 420000 gap', () => {
  const r = M.life(life()); near(r.annualGap, 36000); near(r.incomeNeed, 540000);
  near(r.obligations, 770000); near(r.available, 350000); near(r.gap, 420000);
});
test('life inflation and return change the gap in the correct direction', () => {
  const base = M.life(life());
  assert.ok(M.life({...life(), inflation: 3}).gap > base.gap);
  assert.ok(M.life({...life(), returns: 3}).gap < base.gap);
  near(M.life({...life(), inflation: 3, returns: 3}).gap, base.gap);
  near(M.life({...life(), years: 2, inflation: 10}).incomeNeed, 36000 + 39600);
});
test('life zero years retains immediate obligations and surplus resources clamp the gap', () => {
  near(M.life({...life(), years: 0, cover: 0, assets: 0, cpf: 0}).gap, 230000);
  near(M.life({...life(), cover: 2000000}).gap, 0);
  near(M.life({...life(), support: 100000}).annualGap, 0);
  assert.throws(() => M.life({...life(), years: ''}));
  assert.throws(() => M.life({...life(), years: 1.5}));
});
