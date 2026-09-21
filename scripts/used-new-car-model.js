/* Compare two car quotes using actual instalment and exit-settlement inputs. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.OGUsedNewCar = factory();
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  function number(value, label, min = 0, max = 1e9) {
    if (value === null || value === undefined || String(value).trim() === '') throw new Error('Enter ' + label + '.');
    const n = Number(value);
    if (!Number.isFinite(n) || n < min || n > max) throw new Error(label + ' must be between ' + min + ' and ' + max + '.');
    return n;
  }

  function months(value, label, min = 1 / 12, max = 10) {
    const years = number(value, label, min, max);
    const result = Math.round(years * 12);
    if (Math.abs(years * 12 - result) > 0.00001) throw new Error(label + ' must correspond to whole months.');
    return result;
  }

  function option(x, prefix, label, horizon) {
    const price = number(x[prefix + 'Price'], label + ' purchase price', 0.01);
    const exit = number(x[prefix + 'Exit'], label + ' gross exit value');
    const downPct = number(x[prefix + 'DownPct'], label + ' downpayment percent', 0, 100);
    const payment = number(x[prefix + 'LoanMonthly'], label + ' monthly loan instalment');
    const loanMonths = months(x[prefix + 'LoanYears'], label + ' loan term in years', 0, 10);
    const settlement = number(x[prefix + 'Settlement'], label + ' loan settlement at exit');
    const fees = number(x[prefix + 'Fees'], label + ' upfront fees');
    const oneOff = number(x[prefix + 'OneOff'], label + ' one-off costs');
    const annual = number(x[prefix + 'Annual'], label + ' annual running costs');
    const down = price * downPct / 100;
    const principal = price - down;

    if (principal < 0.005) {
      if (payment !== 0 || settlement !== 0) throw new Error(label + ' cash purchase must have zero loan instalment and zero exit settlement.');
    } else {
      if (loanMonths === 0 || payment === 0) throw new Error('Enter a positive ' + label + ' loan term and monthly instalment.');
      if (horizon >= loanMonths && settlement !== 0) throw new Error(label + ' exit settlement must be zero when the loan ends within the holding period.');
    }

    const payments = principal < 0.005 ? 0 : Math.min(horizon, loanMonths);
    const instalments = payment * payments;
    const financeOutflow = down + instalments + settlement;
    if (financeOutflow + 0.005 < price) {
      throw new Error(label + ' loan cash does not cover the purchase price. Check the instalment or exit settlement.');
    }

    const financeCost = financeOutflow - price;
    const years = horizon / 12;
    const running = annual * years;
    const total = price - exit + financeCost + fees + oneOff + running;
    const upfront = down + fees + oneOff;
    const exitEquity = exit - settlement;
    const netCash = upfront + instalments + running - exitEquity;
    return { price, exit, downPct, down, principal, payment, loanMonths, settlement, fees, oneOff,
      annual, payments, instalments, financeOutflow, financeCost, running, total,
      monthly: total / horizon, upfront, exitEquity, netCash,
      activeMonthly: payment + annual / 12 };
  }

  function compare(x) {
    const horizon = months(x.years, 'holding period in years');
    const used = option(x, 'used', 'used car', horizon);
    const neu = option(x, 'new', 'new car', horizon);
    const difference = neu.total - used.total;
    const winner = Math.abs(difference) < 0.005 ? 'Tie' : difference > 0 ? 'Used' : 'New';
    return { horizon, years: horizon / 12, used, new: neu, difference, winner,
      usedCostHeadroom: difference, usedAnnualHeadroom: difference / (horizon / 12) };
  }

  return { compare };
});
