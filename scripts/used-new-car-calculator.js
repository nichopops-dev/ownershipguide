(function () {
  'use strict';
  const form = document.querySelector('[data-used-new-car-calculator]');
  if (!form) return;
  const error = document.getElementById('calculator-error');
  const results = document.getElementById('calculator-results');
  const money = value => 'S$' + new Intl.NumberFormat('en-SG', { minimumFractionDigits:2, maximumFractionDigits:2 }).format(value);
  const put = (id, value) => { document.getElementById(id).textContent = value; };

  function update() {
    const x = {};
    for (const field of form.querySelectorAll('input,select')) x[field.name] = field.value;
    try {
      const r = window.OGUsedNewCar.compare(x);
      error.textContent = '';
      results.hidden = false;
      put('usedMonthly', money(r.used.monthly));
      put('newMonthly', money(r.new.monthly));
      put('winner', r.winner === 'Tie' ? 'Similar modelled cost' : r.winner + ' has lower modelled cost');
      put('deltaSub', r.winner === 'Tie' ? 'The total costs are equal within one cent.' : money(Math.abs(r.difference)) + ' difference over ' + r.horizon + ' months.');
      put('headroom', r.difference > 0
        ? 'The used car could absorb ' + money(r.usedAnnualHeadroom) + ' more cost a year before its advantage disappears, with other inputs unchanged.'
        : r.difference < 0
          ? 'The used car would need ' + money(-r.usedAnnualHeadroom) + ' less cost a year to tie, with other inputs unchanged.'
          : 'Any additional cost would change the result.');

      for (const side of ['used','new']) {
        const o = r[side];
        put(side + 'Upfront', money(o.upfront));
        put(side + 'ActiveMonthly', money(o.activeMonthly));
        put(side + 'ExitEquity', money(o.exitEquity));
        put(side + 'NetCash', money(o.netCash));
        put(side + 'Payments', String(o.payments));
      }

      const rows = [
        ['Purchase price', r.used.price, r.new.price],
        ['Gross exit value (subtract)', -r.used.exit, -r.new.exit],
        ['Financing cost through exit', r.used.financeCost, r.new.financeCost],
        ['Upfront fees', r.used.fees, r.new.fees],
        ['One-off costs', r.used.oneOff, r.new.oneOff],
        ['Running costs', r.used.running, r.new.running],
        ['Total ownership cost', r.used.total, r.new.total]
      ];
      document.getElementById('tbody').innerHTML = rows.map(row => '<tr><th scope="row">' + row[0] + '</th><td>' + money(row[1]) + '</td><td>' + money(row[2]) + '</td></tr>').join('');
    } catch (e) {
      results.hidden = true;
      error.textContent = e.message;
    }
  }

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', event => { event.preventDefault(); update(); });
  form.addEventListener('reset', () => setTimeout(update, 0));
  update();
})();
