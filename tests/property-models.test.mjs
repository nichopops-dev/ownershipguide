import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const m = require('../scripts/property-models.js');
const near = (actual, expected, tolerance = 0.01) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
function defaults(filename) {
  const html = readFileSync(new URL('../' + filename, import.meta.url), 'utf8');
  const result = {};
  for (const tag of html.matchAll(/<input\b[^>]*>/g)) {
    const name = tag[0].match(/\bname="([^"]+)"/); const value = tag[0].match(/\bvalue="([^"]*)"/);
    if (name && value) result[name[1]] = value[1];
  }
  for (const select of html.matchAll(/<select\b[^>]*name="([^"]+)"[^>]*>(.*?)<\/select>/gs)) result[select[1]] = select[2].match(/value="([^"]*)"/)[1];
  return result;
}
test('published BSD defaults and second-home worked example', () => {
  const x = defaults('bsd-absd-calculator-singapore.html');
  assert.equal(m.stamp(x).total, 44600);
  assert.equal(m.stamp({ ...x, owned: 1 }).total, 344600);
  assert.equal(m.stamp({ ...x, value: 800000 }).bsd, 18600);
});
test('all BSD thresholds and a value in the top tier', () => {
  for (const [value, expected] of [[180000, 1800], [360000, 5400], [1000000, 24600], [1500000, 44600], [3000000, 119600], [4000000, 179600]]) near(m.stamp({ value, profile: 'sc', owned: 0 }).bsd, expected, 0);
});
test('duty rounding and minimum do not invent ABSD for an exempt profile', () => {
  assert.equal(m.stamp({ value: 1500019, profile: 'sc', owned: 0 }).bsd, 44600);
  assert.equal(m.stamp({ value: 1500020, profile: 'sc', owned: 0 }).bsd, 44601);
  const low = m.stamp({ value: 0.01, profile: 'spr', owned: 0 });
  assert.equal(low.bsd, 1); assert.equal(low.absd, 1);
  assert.equal(m.stamp({ value: 0.01, profile: 'sc', owned: 0 }).absd, 0);
});
test('ordinary ABSD profile matrix', () => {
  for (const [profile, rates] of Object.entries({ sc: [0,20,30], spr: [5,30,35], fr: [60,60,60], entity: [65,65,65], trustee: [65,65,65] })) {
    rates.forEach((rate, owned) => assert.equal(m.stamp({ value: 1000000, profile, owned }).absd, rate * 10000));
  }
});
test('CPF published mixed-withdrawal example uses real page defaults', () => {
  const r = m.cpf(defaults('cpf-accrued-interest-calculator-singapore.html'));
  assert.equal(r.principal, 160000); near(r.interest, 17070.91686035157); near(r.refund, 177070.91686035157);
});
test('CPF lump sum compounds annually, not monthly', () => {
  const r = m.cpf({ initial: 200000, monthly: 0, years: 5, rate: 2.5, startMonth: 1 });
  near(r.refund, 200000 * 1.025 ** 5, 1e-7);
  assert.ok(r.refund < 200000 * (1 + 0.025 / 12) ** 60);
});
test('CPF monthly withdrawals earn different accrual periods before December', () => {
  const r = m.cpf({ initial: 0, monthly: 100, years: 1, rate: 12, startMonth: 1 });
  near(r.principal, 1200); near(r.interest, 78); // 1 + 2 + ... + 12 dollars.
});
test('CPF calendar boundary capitalises December interest only once', () => {
  near(m.cpf({ initial: 1200, monthly: 0, years: 1/6, rate: 12, startMonth: 12 }).refund, 1224.12);
  near(m.cpf({ initial: 1200, monthly: 0, years: 1/6, rate: 12, startMonth: 1 }).refund, 1224);
});
test('CPF zero duration and zero interest remain meaningful', () => {
  const x = { initial: 10000, monthly: 1000, years: 0, rate: 2.5, startMonth: 1 };
  assert.equal(m.cpf(x).refund, 10000);
  const r = m.cpf({ ...x, years: 2, rate: 0 });
  assert.equal(r.refund, 34000); assert.equal(r.interest, 0);
});
test('mortgage defaults reproduce the published payment and five-year balance', () => {
  const r = m.mortgage(defaults('mortgage-amortization-calculator-singapore.html'));
  near(r.basePayment, 3003.741421556958); near(r.monthly[0].interest, 1750);
  near(r.monthly[59].balance, 517922.4226128958); near(r.monthly[59].totalInterest, 98146.9079063136);
  near(r.totalInterest, 301122.42646708695);
});
test('partial final year is included and reconciles after extra repayments', () => {
  const r = m.mortgage({ principal: 12000, rate: 0, years: 2, extra: 50 });
  assert.equal(r.months, 22); assert.equal(r.yearly.length, 2); assert.equal(r.yearly[1].months, 10);
  near(r.monthly.at(-1).payment, 450); assert.equal(r.yearly.at(-1).balance, 0);
  near(r.yearly.reduce((s, row) => s + row.principal, 0), 12000);
});
test('oversized one-off prepayment pays only the amount outstanding', () => {
  const r = m.mortgage({ principal: 12000, rate: 12, years: 2, lump: 100000, lumpMonth: 1 });
  assert.equal(r.months, 1); near(r.totalPaid, 12120); near(r.totalInterest, 120); assert.equal(r.monthly[0].balance, 0);
});
test('every mortgage row and annual summary reconcile', () => {
  for (const rate of [0, 2.6, 4.5]) {
    const r = m.mortgage({ principal: 400000, rate, years: 25, extra: 200, lump: 30000, lumpMonth: 19 });
    let balance = 400000;
    for (const row of r.monthly) { near(row.interest, balance * rate / 1200, 1e-7); near(row.payment, row.interest + row.principal, 1e-7); balance -= row.principal; near(balance, row.balance, 1e-7); }
    near(r.totalPaid, 400000 + r.totalInterest, 1e-6);
    near(r.yearly.reduce((s, row) => s + row.interest, 0), r.totalInterest, 1e-6);
  }
});
test('refinance defaults separate economic break-even from cash recovery', () => {
  const r = m.refinance(defaults('refinance-savings-calculator-singapore.html'));
  assert.equal(r.economicBreakEven, 8); assert.equal(r.cashRecovery, 12);
  near(r.netSaved, 9812.066672222514); near(r.monthlySaving, 221.17957962822948);
  near(r.cashAfterFees + r.balanceAdvantage, r.netSaved, 1e-6);
});
test('comparison horizon bounds both reported savings and economic break-even', () => {
  const x = defaults('refinance-savings-calculator-singapore.html');
  const short = m.refinance({ ...x, horizon: 6 });
  assert.ok(short.netSaved < 0); assert.equal(short.economicBreakEven, null);
  assert.equal(short.cashRecovery, 12);
  assert.throws(() => m.refinance({ ...x, horizon: 301 }), /horizon/);
});
test('HDB example, tenure limit and equal-cost tie', () => {
  const x = defaults('hdb-loan-vs-bank-loan-calculator-singapore.html');
  near(m.hdb(x).netSaved, -6878.843428550623);
  assert.throws(() => m.hdb({ ...x, years: 30 }), /tenure/);
  const tie = m.hdb({ ...x, rateB: x.rateA, feesB: x.feesA });
  near(tie.netSaved, 0); near(tie.monthlySaving, 0);
});
test('same rates with fees never recover costs through lower payments', () => {
  const x = defaults('refinance-savings-calculator-singapore.html');
  const r = m.refinance({ ...x, rateB: x.rateA });
  assert.equal(r.netSaved, -2500); assert.equal(r.economicBreakEven, null); assert.equal(r.cashRecovery, null);
});
test('blank, negative, nonfinite and invalid category inputs are rejected', () => {
  const a = defaults('mortgage-amortization-calculator-singapore.html');
  for (const value of ['', ' ', -1, 'Infinity', 'abc']) assert.throws(() => m.mortgage({ ...a, principal: value }));
  assert.throws(() => m.mortgage({ ...a, years: 0 }));
  assert.throws(() => m.mortgage({ ...a, lump: 1000, lumpMonth: 400 }));
  assert.throws(() => m.stamp({ value: 1e6, profile: 'invalid', owned: 0 }));
  assert.throws(() => m.stamp({ value: 1e6, profile: 'sc', owned: 0.5 }));
  assert.throws(() => m.cpf({ initial: '', monthly: 0, years: 1, rate: 2.5, startMonth: 1 }));
});
