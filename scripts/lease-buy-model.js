/* Compare the same car-access period with quoted financing and exit cash. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.OGLeaseBuy = factory();
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';
  function number(value, label, min = 0, max = 1e9) {
    if (value === null || value === undefined || String(value).trim() === '') throw new Error('Enter ' + label + '.');
    const n = Number(value);
    if (!Number.isFinite(n) || n < min || n > max) throw new Error(label + ' must be between ' + min + ' and ' + max + '.');
    return n;
  }
  function months(value, label, min = 1 / 12) {
    const years = number(value, label, min, 10);
    const n = Math.round(years * 12);
    if (Math.abs(years * 12 - n) > 0.00001) throw new Error(label + ' must correspond to whole months.');
    return n;
  }
  function included(value, label) {
    if (value !== 'yes' && value !== 'no') throw new Error('Choose whether the lease includes ' + label + '.');
    return value === 'yes';
  }
  function compare(x) {
    const horizon = months(x.horizonYears, 'comparison period in years');
    const years = horizon / 12;
    const price = number(x.buyPrice, 'purchase price', 0.01);
    const exit = number(x.resaleValue, 'gross sale proceeds');
    const down = price * number(x.downPct, 'downpayment percent', 0, 100) / 100;
    const principal = price - down;
    const loanMonths = months(x.loanYears, 'loan term in years', 0);
    if (!['quote', 'effective'].includes(x.loanType)) throw new Error('Choose a financing input method.');
    let payment = 0, settlement = 0;
    const paidMonths = principal < 0.005 ? 0 : Math.min(horizon, loanMonths);
    if (principal >= 0.005) {
      if (loanMonths === 0) throw new Error('Enter a positive loan term for a financed purchase.');
      if (x.loanType === 'quote') {
        payment = number(x.loanMonthly, 'quoted monthly instalment', 0.01);
        settlement = number(x.loanSettlement, 'quoted settlement at exit');
        if (horizon >= loanMonths && settlement !== 0) throw new Error('Exit settlement must be zero once the loan has ended.');
      } else {
        const r = number(x.rate, 'annual reducing-balance rate', 0, 100) / 1200;
        payment = r === 0 ? principal / loanMonths : principal * r / -Math.expm1(-loanMonths * Math.log1p(r));
        const growth = Math.expm1(paidMonths * Math.log1p(r));
        settlement = horizon >= loanMonths ? 0 : r === 0
          ? principal * (1 - paidMonths / loanMonths)
          : principal * (1 + growth) - payment * growth / r;
        settlement = Math.max(0, settlement);
      }
    } else if (x.loanType === 'quote' &&
        (number(x.loanMonthly, 'quoted monthly instalment') !== 0 ||
         number(x.loanSettlement, 'quoted settlement at exit') !== 0)) {
      throw new Error('A cash purchase must have zero instalment and zero exit settlement.');
    }
    const instalments = payment * paidMonths;
    const financeCost = down + instalments + settlement - price;
    if (financeCost < -0.005) throw new Error('Loan payments and settlement do not cover the financed purchase. Check the quote.');
    const fees = number(x.buyFees, 'buying fees');
    const insurance = number(x.insAnnual, 'annual insurance');
    const tax = number(x.roadTaxAnnual, 'annual road tax');
    const maintenance = number(x.maintAnnual, 'annual maintenance and repairs');
    const parking = number(x.parkingMonthly, 'monthly parking');
    const distance = number(x.mileageAnnual, 'annual distance');
    const efficiency = number(x.kmPerL, 'fuel efficiency in km per litre', 0.1, 100);
    const fuelPrice = number(x.fuelPrice, 'fuel price per litre', 0, 100);
    const other = number(x.otherMonthly, 'other shared monthly costs');
    const leaseExtra = number(x.leaseExtraMonthly, 'lease-specific extra monthly costs');
    const buyExtra = number(x.buyExtraMonthly, 'buy-specific extra monthly costs');
    const sharedAnnual = parking * 12 + distance / efficiency * fuelPrice + other * 12;
    const buyAnnual = insurance + tax + maintenance + sharedAnnual + buyExtra * 12;
    const buyRunning = buyAnnual * years;
    const buyTotal = price - exit + financeCost + fees + buyRunning;
    const exitEquity = exit - settlement;
    const buyUpfront = down + fees;
    const buyNetCash = buyUpfront + instalments + buyRunning - exitEquity;

    const rental = number(x.leaseMonthly, 'monthly lease fee');
    const upfrontFee = number(x.leaseUpfront, 'nonrefundable lease setup fees');
    const endFee = number(x.leaseEndFees, 'lease return or termination charges');
    const deposit = number(x.leaseDeposit, 'lease security deposit');
    const leaseAnnual = sharedAnnual + leaseExtra * 12
      + (included(x.leaseIncludesInsurance, 'insurance') ? 0 : insurance)
      + (included(x.leaseIncludesRoadTax, 'road tax') ? 0 : tax)
      + (included(x.leaseIncludesMaint, 'maintenance') ? 0 : maintenance);
    const leaseRunning = leaseAnnual * years;
    const leasePayments = rental * horizon;
    const leaseTotal = leasePayments + upfrontFee + endFee + leaseRunning;
    const leaseUpfront = upfrontFee + deposit;
    const leaseExitCash = deposit - endFee;
    const leaseNetCash = leaseUpfront + leasePayments + leaseRunning - leaseExitCash;
    const difference = buyTotal - leaseTotal;
    const winner = Math.abs(difference) < 0.005 ? 'Tie' : difference > 0 ? 'Lease' : 'Buy';
    return {
      horizon, years, difference, winner,
      leaseBreakEvenMonthly: (buyTotal - upfrontFee - endFee - leaseRunning) / horizon,
      buy: {price, exit, down, principal, loanMonths, paidMonths, payment, settlement, instalments,
        financeCost, fees, running:buyRunning, total:buyTotal, monthly:buyTotal / horizon,
        upfront:buyUpfront, activeMonthly:payment + buyAnnual / 12, exitEquity, netCash:buyNetCash},
      lease: {rental, upfrontFee, endFee, deposit, payments:leasePayments, running:leaseRunning,
        total:leaseTotal, monthly:leaseTotal / horizon, upfront:leaseUpfront,
        activeMonthly:rental + leaseAnnual / 12, exitCash:leaseExitCash, netCash:leaseNetCash}
    };
  }
  return {compare};
});
