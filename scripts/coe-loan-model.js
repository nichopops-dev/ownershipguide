/* COE funding quote model; uses the reviewed shared repayment and EIR helpers. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./finance-models.js'));
  else root.OGCoeLoan = factory(root.OGFinance);
})(typeof window !== 'undefined' ? window : this, function (finance) {
  'use strict';
  function number(value, label, min = 0, max = 1e9) {
    if (value === null || value === undefined || String(value).trim() === '') throw new Error('Enter ' + label + '.');
    const n = Number(value);
    if (!Number.isFinite(n) || n < min || n > max) throw new Error(label + ' must be between ' + min + ' and ' + max + '.');
    return n;
  }
  function months(value, label) {
    const n = number(value,label,1/12,10) * 12;
    if (Math.abs(n - Math.round(n)) > 0.00001) throw new Error(label + ' must correspond to whole months.');
    return Math.round(n);
  }
  function calculate(x) {
    const amount = number(x.coeAmount,'COE amount');
    const down = amount * number(x.downPct,'cash contribution percent',0,100) / 100;
    const principal = amount - down;
    const n = months(x.tenureYears,'loan term in years');
    const coeMonths = months(x.coeYears,'COE period remaining in years');
    const rate = number(x.ratePct,'annual rate',0,100);
    const fees = number(x.fees,'upfront loan fees');
    if (!['flat','effective','nominal'].includes(x.rateType)) throw new Error('Choose a rate definition.');
    if (principal === 0 && fees !== 0) throw new Error('Set loan fees to zero when no loan is used.');
    if (principal > 0 && fees >= principal) throw new Error('Loan fees must be smaller than the loan principal.');
    const monthlyRate = x.rateType === 'effective' ? Math.expm1(Math.log1p(rate / 100) / 12) : rate / 1200;
    const monthly = principal === 0 ? 0 : x.rateType === 'flat'
      ? principal * (1 + rate / 100 * n / 12) / n
      : finance.payment(principal,monthlyRate,n);
    const repayments = monthly * n;
    const interest = Math.max(0,repayments - principal);
    const eir = principal === 0 ? null : finance.effectiveRate(principal - fees,monthly,n);
    return {amount,down,principal,months:n,coeMonths,rate,fees,monthly,repayments,interest,eir,
      loanTotal:repayments + fees,fullFunding:down + repayments + fees,
      financingCost:interest + fees,initialCash:down + fees,
      beyondCoe:principal > 0 && n > coeMonths};
  }
  return {calculate};
});
