/* Reviewed 14 Sep 2026. Pure models shared by the browser and regression tests. */
(function (root, factory) {
  const models = factory();
  if (typeof module === 'object' && module.exports) module.exports = models;
  else root.OGFinance = models;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  function number(value, label, min = 0, max = 1e12) {
    const n = Number(value);
    if (value === '' || value === null || value === undefined || !Number.isFinite(n) || n < min || n > max) {
      throw new Error(label + ': enter a number from ' + min + ' to ' + max + '.');
    }
    return n;
  }
  function months(value, label, max = 600) {
    const n = number(value, label, 1, max);
    if (!Number.isInteger(n)) throw new Error(label + ': use whole months.');
    return n;
  }
  function payment(principal, monthlyRate, n) {
    return monthlyRate === 0 ? principal / n : principal * monthlyRate / -Math.expm1(-n * Math.log1p(monthlyRate));
  }
  function presentValue(pmt, monthlyRate, n) {
    return monthlyRate === 0 ? pmt * n : pmt * -Math.expm1(-n * Math.log1p(monthlyRate)) / monthlyRate;
  }
  function effectiveRate(netProceeds, pmt, n) {
    if (netProceeds <= 0) throw new Error('Loan fees must be smaller than the loan principal.');
    if (Math.abs(pmt * n - netProceeds) < 1e-8) return 0;
    let lo = 0, hi = 1;
    while (presentValue(pmt, hi, n) > netProceeds) hi *= 2;
    for (let i = 0; i < 100; i++) {
      const mid = (lo + hi) / 2;
      if (presentValue(pmt, mid, n) > netProceeds) lo = mid;
      else hi = mid;
    }
    return Math.expm1(12 * Math.log1p((lo + hi) / 2)) * 100;
  }
  function carLoan(x) {
    const price = number(x.price, 'Car price'), down = number(x.down, 'Downpayment', 0, price);
    const n = months(x.months, 'Loan tenure', 84), rate = number(x.rate, 'Interest rate', 0, 100);
    const fees = number(x.fees, 'Loan fees'), principal = price - down;
    if (!['flat', 'effective'].includes(x.mode)) throw new Error('Choose an interest quote type.');
    if (!['low', 'high'].includes(x.omv)) throw new Error('Choose the vehicle OMV band.');
    if (principal === 0 && fees > 0) throw new Error('Set loan fees to zero when no loan is used.');
    const monthly = x.mode === 'flat' ? principal * (1 + rate / 100 * n / 12) / n
      : payment(principal, Math.expm1(Math.log1p(rate / 100) / 12), n);
    const interest = Math.max(0, monthly * n - principal);
    const eir = principal === 0 ? 0 : effectiveRate(principal - fees, monthly, n);
    return { principal, monthly, interest, total: principal + interest + fees, eir,
      cap: price * (x.omv === 'low' ? 0.70 : 0.60),
      overCap: principal > price * (x.omv === 'low' ? 0.70 : 0.60) + 0.005 };
  }
  function carBudget(x) {
    const income = number(x.income, 'Take-home income'), fixed = number(x.fixed, 'Other living costs');
    const savings = number(x.savings, 'Savings target');
    const repair = x.stressRepair ? 300 : 0, usableIncome = income * (x.stressIncome ? 0.8 : 1);
    let monthlyCash, economic = null, upfront = null, exitEquity = null, interest = null;
    if (x.mode === 'direct') {
      monthlyCash = number(x.direct, 'Monthly cash outflow') + repair;
    } else if (x.mode === 'components') {
      const price = number(x.price, 'Purchase price'), resale = number(x.resale, 'Gross resale proceeds');
      const hold = months(x.hold, 'Holding period', 120), n = months(x.months, 'Loan tenure', 84);
      const principal = number(x.principal, 'Loan principal', 0, price);
      const annual = number(x.rate, 'Annual effective rate', 0, 100) + (x.stressRate ? 1 : 0);
      const r = Math.expm1(Math.log1p(annual / 100) / 12), pay = payment(principal, r, n);
      const running = ['insurance', 'tax', 'fuel', 'maintenance', 'parking'].reduce((s, key) => s + number(x[key], key), 0) + repair;
      let balance = principal; interest = 0;
      for (let i = 0; i < Math.min(hold, n); i++) {
        const due = balance * r; interest += due; balance = Math.max(0, balance + due - pay);
      }
      monthlyCash = pay + running;
      upfront = price - principal;
      exitEquity = resale - balance;
      economic = (price - resale + interest) / hold + running;
    } else throw new Error('Choose a cost input mode.');
    const remaining = usableIncome - fixed - savings - monthlyCash;
    return { monthlyCash, remaining, economic, upfront, exitEquity, interest,
      ratio: usableIncome > 0 ? monthlyCash / usableIncome : null,
      status: usableIncome === 0 ? 'NO INCOME ENTERED' : remaining < 0 ? 'MONTHLY SHORTFALL' : 'SURPLUS IN THIS SCENARIO' };
  }
  function bsd(value) {
    let remaining = value, total = 0;
    for (const [band, rate] of [[180000, .01], [180000, .02], [640000, .03], [500000, .04], [1500000, .05], [Infinity, .06]]) {
      const slice = Math.min(remaining, band); total += slice * rate; remaining -= slice;
    }
    return total;
  }
  function property(x) {
    const income = number(x.income, 'Recognised gross income'), debt = number(x.debt, 'Other monthly debts');
    const housingDebt = number(x.housingDebt, 'Other assessed housing instalments', 0, debt);
    const price = number(x.price, 'Purchase price'), valuation = number(x.valuation, 'Valuation');
    const dp = number(x.downPct, 'Downpayment percentage', 0, 100) / 100;
    const rate = number(x.rate, 'Payment rate', 0, 100), assessment = number(x.assessment, 'Assessment rate', 0, 100);
    const years = number(x.years, 'Tenure in years', 1, 35), age = number(x.age, 'Assessment age', 18, 90);
    const n = months(years * 12, 'Loan tenure');
    const existing = number(x.existing, 'Existing housing loans', 0, 2);
    if (!['private', 'bankhdb', 'bankec', 'hdb'].includes(x.route)) throw new Error('Choose a loan route.');
    const hdb = x.route === 'hdb', flat = x.route === 'bankhdb';
    if ((flat && years > 30) || (hdb && (years > 25 || age + years > 65))) {
      throw new Error(hdb ? 'For this HDB model, tenure must be at most 25 years and end by age 65.' : 'A bank loan for an HDB flat cannot exceed 30 years.');
    }
    if (hdb && existing !== 0) throw new Error('This HDB model covers buyers with no outstanding housing loan. Confirm other cases with HDB.');
    const reduced = years > (flat ? 25 : 30) || age + years > 65;
    const ltv = hdb ? .75 : [[.75, .55], [.45, .25], [.35, .15]][existing][reduced ? 1 : 0];
    const cashPct = hdb ? 0 : existing > 0 ? .25 : reduced ? .10 : .05;
    const assessRate = Math.max(assessment, rate, hdb ? 3 : 4);
    const tdsrBudget = Math.max(0, income * .55 - debt), msrBudget = Math.max(0, income * .30 - housingDebt);
    const budget = hdb ? msrBudget : x.route === 'private' ? tdsrBudget : Math.min(tdsrBudget, msrBudget);
    const incomeCap = presentValue(budget, assessRate / 1200, n);
    const value = Math.min(price, valuation), ltvCap = value * ltv, maxLoan = Math.min(incomeCap, ltvCap);
    const loan = price * (1 - dp), instalment = payment(loan, rate / 1200, n);
    const duties = bsd(Math.max(price, valuation)) + Math.max(price, valuation) * number(x.absd, 'ABSD percentage', 0, 100) / 100;
    return { loan, instalment, assessRate, assessedInstalment: payment(loan, assessRate / 1200, n),
      stressInstalment: payment(loan, (rate + 1) / 1200, n), incomeCap, ltvCap, maxLoan, ltv,
      minCash: value * cashPct + Math.max(0, price - valuation),
      upfront: price - loan + duties, duties,
      status: loan > maxLoan + .005 ? 'EXCEEDS MODELLED LIMIT' : 'WITHIN MODELLED LIMIT',
      gate: hdb ? 'MSR + LTV' : x.route === 'private' ? 'TDSR + LTV' : 'TDSR + MSR + LTV' };
  }
  function life(x) {
    const expenses = number(x.expenses, 'Annual household expenses');
    const care = number(x.care, 'Additional annual care costs'), support = number(x.support, 'Survivor contribution');
    const years = number(x.years, 'Support years', 0, 60);
    if (!Number.isInteger(years)) throw new Error('Support years must be a whole number.');
    const inflation = number(x.inflation, 'Annual cost inflation', 0, 20) / 100;
    const returns = number(x.returns, 'Annual net investment return', 0, 20) / 100;
    const gap = Math.max(0, expenses + care - support);
    let incomeNeed = 0;
    // Annual shortfalls funded at the start of each year; both costs and survivor
    // contribution grow at the selected inflation rate. Returns are after fees/tax.
    for (let t = 0; t < years; t++) incomeNeed += gap * Math.pow((1 + inflation) / (1 + returns), t);
    const immediate = ['mortgage', 'debts', 'final', 'future'].reduce((s, key) => s + number(x[key], key), 0);
    const available = ['assets', 'cpf', 'cover'].reduce((s, key) => s + number(x[key], key), 0);
    return { annualGap: gap, incomeNeed, obligations: incomeNeed + immediate, available, gap: Math.max(0, incomeNeed + immediate - available) };
  }
  return { payment, presentValue, effectiveRate, carLoan, carBudget, bsd, property, life };
});
