(function () {
  'use strict';
  const form = document.querySelector('[data-lease-buy-calculator]');
  if (!form) return;
  const error = document.getElementById('calculator-error');
  const results = document.getElementById('calculator-results');
  const money = value => 'S$' + new Intl.NumberFormat('en-SG', {minimumFractionDigits:2, maximumFractionDigits:2}).format(value);
  const put = (id, value) => { document.getElementById(id).textContent = value; };
  function update() {
    const x = {};
    for (const field of form.querySelectorAll('input,select')) x[field.name] = field.value;
    document.getElementById('quote-fields').hidden = x.loanType !== 'quote';
    document.getElementById('estimate-fields').hidden = x.loanType !== 'effective';
    try {
      const r = window.OGLeaseBuy.compare(x);
      error.textContent = '';
      results.hidden = false;
      put('leaseTotal', money(r.lease.total));
      put('leaseMonthlyOut', money(r.lease.monthly) + ' / month averaged over the period');
      put('buyTotal', money(r.buy.total));
      put('buyMonthlyOut', money(r.buy.monthly) + ' / month averaged over the period');
      put('winner', r.winner === 'Tie' ? 'Equal modelled cost' : r.winner === 'Lease' ? 'Leasing costs less' : 'Buying costs less');
      put('delta', money(Math.abs(r.difference)) + ' difference over ' + r.horizon + ' months.');
      put('lease-threshold', r.leaseBreakEvenMonthly < 0
        ? 'No nonnegative monthly rental can tie the buying cost with these other inputs.'
        : 'The monthly rental fee that ties buying is ' + money(r.leaseBreakEvenMonthly) + ', with every other input unchanged.');
      put('buy-upfront', money(r.buy.upfront));
      put('lease-upfront', money(r.lease.upfront));
      put('buy-active', money(r.buy.activeMonthly));
      put('lease-active', money(r.lease.activeMonthly));
      put('buy-exit', money(r.buy.exitEquity));
      put('lease-exit', money(r.lease.exitCash));
      put('buy-net-cash', money(r.buy.netCash));
      put('lease-net-cash', money(r.lease.netCash));
      put('loan-summary', r.buy.paidMonths + ' instalments of ' + money(r.buy.payment)
        + '; settlement at exit ' + money(r.buy.settlement)
        + (x.loanType === 'effective' ? ' (reducing-balance estimate; replace with a lender quote before deciding).' : ' (entered quote).'));
      const rows = [
        ['Rental payments', r.lease.payments, 0],
        ['Purchase less gross sale proceeds', 0, r.buy.price - r.buy.exit],
        ['Financing cost through exit', 0, r.buy.financeCost],
        ['Nonrefundable setup / buying fees', r.lease.upfrontFee, r.buy.fees],
        ['Lease return / termination charges', r.lease.endFee, 0],
        ['Running costs outside the rental', r.lease.running, r.buy.running],
        ['Total cost', r.lease.total, r.buy.total]
      ];
      document.getElementById('rows').innerHTML = rows.map(row =>
        '<tr><th scope="row">' + row[0] + '</th><td>' + money(row[1]) + '</td><td>' + money(row[2]) + '</td></tr>'
      ).join('');
    } catch (e) {
      results.hidden = true;
      error.textContent = e.message;
    }
  }
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', event => {event.preventDefault(); update();});
  form.addEventListener('reset', () => setTimeout(update, 0));
  update();
})();
