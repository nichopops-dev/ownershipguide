/* Compare resource cost and cash flows separately. No lender settlement quote is implied. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.OGCOERenew = factory();
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';
  function number(value, label, min = 0, max = 1e9) {
    if (value === null || value === undefined || String(value).trim() === '') throw new Error('Enter ' + label + '.');
    const n = Number(value);
    if (!Number.isFinite(n) || n < min || n > max) throw new Error(label + ' must be between ' + min + ' and ' + max + '.');
    return n;
  }
  function months(value, label, max = 10) {
    const years = number(value, label, 1 / 12, max);
    const result = Math.round(years * 12);
    if (Math.abs(years * 12 - result) > 0.00001) throw new Error(label + ' must correspond to whole months.');
    return result;
  }
  function loan(principal, annualRate, termMonths, horizonMonths) {
    if (principal === 0) return { payment:0, interest:0, paid:0, balance:0, payments:0 };
    const rate = annualRate / 1200;
    const payment = rate === 0 ? principal / termMonths : principal * rate / -Math.expm1(-termMonths * Math.log1p(rate));
    let balance = principal, interest = 0, paid = 0;
    const payments = Math.min(termMonths, horizonMonths);
    for (let m = 0; m < payments; m++) {
      const charge = balance * rate;
      const principalPaid = m === termMonths - 1 ? balance : Math.min(balance, payment - charge);
      interest += charge; paid += principalPaid + charge; balance = Math.max(0, balance - principalPaid);
    }
    return { payment, interest, paid, balance, payments };
  }
  function compare(x) {
    const horizon = months(x.years, 'holding period in years');
    const renewYears = number(x.renewYears, 'renewal term', 5, 10);
    if (![5,10].includes(renewYears)) throw new Error('Choose a 5-year or 10-year renewal term.');
    const replacementMonths = months(x.replacementCOEYears, 'replacement COE remaining in years');
    if (horizon > renewYears * 12) throw new Error('The holding period cannot exceed the selected renewal term.');
    if (horizon > replacementMonths) throw new Error('The holding period cannot exceed the replacement car’s remaining COE.');
    const years = horizon / 12;
    const currentValue = number(x.currentValue, 'current car sale or deregistration value');
    const annualRunning = number(x.annualRunning, 'base annual running costs');
    const renewPremium = number(x.renewPremium, 'renewal premium');
    const renewResale = number(x.renewResale, 'renewal exit value');
    const renewMaintUplift = number(x.renewMaintUplift, 'extra annual renewal costs');
    const renewOneOff = number(x.renewOneOff, 'one-off renewal repairs');
    const replacePrice = number(x.replacePrice, 'replacement price', 0.01);
    const replaceResale = number(x.replaceResale, 'replacement exit value');
    const replaceMaintDelta = number(x.replaceMaintDelta, 'replacement annual cost difference', -annualRunning);
    const fees = number(x.fees, 'replacement upfront fees');
    const downPct = number(x.downPct, 'replacement downpayment percent', 0, 100);
    const rate = number(x.apr, 'annual reducing-balance rate', 0, 50);
    const loanMonths = months(x.loanYears, 'replacement loan term in years', 7);
    const down = replacePrice * downPct / 100;
    const principal = replacePrice - down;
    const finance = loan(principal, rate, loanMonths, horizon);
    const renewRunning = years * (annualRunning + renewMaintUplift);
    const replaceRunning = years * (annualRunning + replaceMaintDelta);
    // Existing car value is an asset consumed by keeping it, not a new cash payment.
    const renewTotal = currentValue + renewPremium + renewOneOff + renewRunning - renewResale;
    const replaceTotal = replacePrice + fees + finance.interest + replaceRunning - replaceResale;
    const renewUpfront = renewPremium + renewOneOff;
    const replaceGrossUpfront = down + fees;
    const replaceNetUpfront = replaceGrossUpfront - currentValue;
    const renewNetCash = renewUpfront + renewRunning - renewResale;
    const replaceExitNet = replaceResale - finance.balance;
    const replaceNetCash = replaceNetUpfront + finance.paid + replaceRunning - replaceExitNet;
    const difference = replaceTotal - renewTotal;
    return { horizon, years, currentValue, renewPremium, renewOneOff, renewResale, replacePrice,
      replaceResale, fees, principal, down, finance, renewRunning, replaceRunning,
      renewTotal, replaceTotal, renewMonthly:renewTotal/horizon, replaceMonthly:replaceTotal/horizon,
      renewUpfront, replaceGrossUpfront, replaceNetUpfront, renewNetCash, replaceNetCash,
      replaceExitNet, difference, renewalRepairHeadroom:difference/years,
      winner:Math.abs(difference)<0.005?'Tie':difference>0?'Renew':'Replace' };
  }
  return { compare };
});
