/* Reviewed property models. Rates are scenario inputs; no lender eligibility is implied. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.OGProperty = factory();
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';
  function number(value, label, min = 0, max = 1e12) {
    if (value === null || value === undefined || String(value).trim() === '') throw new Error('Enter ' + label + '.');
    const n = Number(value);
    if (!Number.isFinite(n) || n < min || n > max) throw new Error(label + ' must be between ' + min + ' and ' + max + '.');
    return n;
  }
  function integer(value, label, min, max) {
    const n = number(value, label, min, max);
    if (!Number.isInteger(n)) throw new Error(label + ' must be a whole number.');
    return n;
  }
  function term(years, max = 40) {
    const y = number(years, 'loan tenure in years', 1 / 12, max);
    const months = Math.round(y * 12);
    if (Math.abs(y * 12 - months) > 0.00001) throw new Error('Use a tenure corresponding to whole months.');
    return months;
  }
  function stamp(x) {
    const value = number(x.value, 'dutiable value', 0.01);
    const cents = Math.round(value * 100);
    if (Math.abs(value * 100 - cents) > 0.001) throw new Error('Use at most two decimal places for the property value.');
    const owned = integer(x.owned, 'properties already owned', 0, 2);
    const rates = { sc: [0, 20, 30], spr: [5, 30, 35], fr: [60, 60, 60], entity: [65, 65, 65], trustee: [65, 65, 65] };
    if (!Object.hasOwn(rates, x.profile)) throw new Error('Select a supported buyer profile.');
    const tiers = [[180000, 1], [180000, 2], [640000, 3], [500000, 4], [1500000, 5], [Infinity, 6]];
    let remaining = cents, weighted = 0;
    const rows = [];
    for (const [cap, rate] of tiers) {
      if (remaining === 0) break;
      const slice = Math.min(remaining, cap * 100);
      weighted += slice * rate;
      rows.push({ base: slice / 100, rate, duty: slice * rate / 10000 });
      remaining -= slice;
    }
    const bsd = Math.max(1, Math.floor(weighted / 10000));
    const rate = rates[x.profile][owned];
    const absd = rate === 0 ? 0 : Math.max(1, Math.floor(cents * rate / 10000));
    return { value, bsd, absd, total: bsd + absd, rate, rows };
  }
  function cpf(x) {
    const initial = number(x.initial, 'initial CPF housing withdrawal');
    const monthly = number(x.monthly, 'monthly CPF housing withdrawal');
    const years = number(x.years, 'projection period in years', 0, 60);
    const months = Math.round(years * 12);
    if (Math.abs(years * 12 - months) > 0.00001) throw new Error('Use a projection period corresponding to whole months.');
    const rate = number(x.rate, 'OA annual rate', 0, 20) / 100;
    const startMonth = integer(x.startMonth, 'starting calendar month', 1, 12);
    let balance = initial, pending = 0;
    for (let m = 0; m < months; m++) {
      balance += monthly;
      pending += balance * rate / 12;
      if ((startMonth - 1 + m) % 12 === 11) { balance += pending; pending = 0; }
    }
    const principal = initial + monthly * months;
    const refund = balance + pending;
    return { principal, refund, interest: refund - principal, months };
  }
  function mortgage(x) {
    const principal = number(x.principal, 'loan principal', 0.01);
    const months = term(x.years);
    const rate = number(x.rate, 'annual mortgage rate', 0, 30) / 1200;
    const extra = number(x.extra === undefined ? 0 : x.extra, 'extra monthly repayment');
    const lump = number(x.lump === undefined ? 0 : x.lump, 'one-off repayment');
    const lumpMonth = lump > 0 ? integer(x.lumpMonth, 'one-off repayment month', 1, months) : 0;
    const basePayment = rate === 0 ? principal / months : principal * rate / -Math.expm1(-months * Math.log1p(rate));
    let balance = principal, totalInterest = 0, totalPaid = 0;
    const monthly = [];
    for (let m = 1; m <= months; m++) {
      const opening = balance;
      const interest = opening * rate;
      let paidPrincipal = Math.min(opening, basePayment + extra - interest + (m === lumpMonth ? lump : 0));
      if (m === months || opening - paidPrincipal < 1e-7) paidPrincipal = opening;
      balance = Math.max(0, opening - paidPrincipal);
      const payment = paidPrincipal + interest;
      totalInterest += interest; totalPaid += payment;
      monthly.push({ month: m, payment, interest, principal: paidPrincipal, balance, totalInterest, totalPaid });
      if (balance === 0) break;
    }
    const yearly = [];
    for (let start = 0; start < monthly.length; start += 12) {
      const rows = monthly.slice(start, start + 12);
      yearly.push({ year: Math.floor(start / 12) + 1, months: rows.length, interest: rows.reduce((s, r) => s + r.interest, 0), principal: rows.reduce((s, r) => s + r.principal, 0), balance: rows.at(-1).balance });
    }
    return { principal, basePayment, scheduledPayment: basePayment + extra, totalInterest, totalPaid, months: monthly.length, monthly, yearly };
  }
  function compare(x) {
    const a = mortgage({ principal: x.principal, years: x.years, rate: x.rateA });
    const b = mortgage({ principal: x.principal, years: x.years, rate: x.rateB });
    const horizon = x.horizon === 'remaining' ? a.months : integer(x.horizon, 'comparison horizon in months', 1, a.months);
    const feesA = number(x.feesA, 'fees for the current/HDB option');
    const feesB = number(x.feesB, 'fees for the new/bank option');
    const feeDifference = feesB - feesA;
    const endA = a.monthly[horizon - 1], endB = b.monthly[horizon - 1];
    const interestSaved = endA.totalInterest - endB.totalInterest;
    const cashSaved = endA.totalPaid - endB.totalPaid;
    const balanceAdvantage = endA.balance - endB.balance;
    let economicBreakEven = feeDifference <= 0 ? 0 : null;
    if (economicBreakEven === null) {
      for (let m = 0; m < horizon; m++) {
        if (a.monthly[m].totalInterest - b.monthly[m].totalInterest >= feeDifference - 1e-7) { economicBreakEven = m + 1; break; }
      }
    }
    const monthlySaving = a.basePayment - b.basePayment;
    const cashRecovery = feeDifference <= 0 ? 0 : monthlySaving > 0 ? Math.ceil(feeDifference / monthlySaving) : null;
    return { a, b, horizon, feesA, feesB, feeDifference, monthlySaving, interestSaved, cashSaved, balanceAdvantage, netSaved: interestSaved - feeDifference, cashAfterFees: cashSaved - feeDifference, costA: endA.totalInterest + feesA, costB: endB.totalInterest + feesB, endA, endB, economicBreakEven, cashRecovery };
  }
  function hdb(x) {
    term(x.years, 25);
    return compare(x);
  }
  function refinance(x) {
    const fees = number(x.fees, 'switching costs');
    const penalty = number(x.penalty, 'existing loan exit penalty');
    return compare({ ...x, feesA: 0, feesB: fees + penalty });
  }
  return { stamp, cpf, mortgage, compare, hdb, refinance };
});
