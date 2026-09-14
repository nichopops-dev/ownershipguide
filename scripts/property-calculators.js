/* Calculator UI. All arithmetic is in property-models.js; inputs stay in this page. */
(function () {
  'use strict';
  const form = document.querySelector('[data-property-calculator]');
  if (!form) return;
  const kind = form.dataset.propertyCalculator;
  const error = document.getElementById('calculator-error');
  const result = document.getElementById('calculator-results');
  const money = n => new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  const put = (id, value) => { document.getElementById(id).textContent = value; };
  const cell = value => '<td>' + value + '</td>';
  const row = values => '<tr>' + values.map(cell).join('') + '</tr>';
  let lastSchedule = null;
  function schedule() {
    const target = document.getElementById('schedule-body');
    if (!target || !lastSchedule) return;
    const monthly = document.getElementById('showMonthly').checked;
    put('schedule-period', monthly ? 'Month' : 'Year (months covered)');
    target.innerHTML = (monthly ? lastSchedule.monthly : lastSchedule.yearly).map(r => row([
      monthly ? r.month : r.year + ' (' + r.months + ')', money(r.interest), money(r.principal), money(r.balance)
    ])).join('');
  }
  function update() {
    const x = {};
    for (const field of form.querySelectorAll('input, select')) x[field.name] = field.value;
    if (x.horizon === 'custom') x.horizon = x.customHorizon;
    if (form.elements.customHorizon) {
      document.getElementById('custom-horizon').hidden = form.elements.horizon.value !== 'custom';
      form.elements.customHorizon.disabled = form.elements.horizon.value !== 'custom';
    }
    try {
      const r = window.OGProperty[kind](x);
      error.textContent = ''; result.hidden = false;
      if (kind === 'stamp') {
        for (const key of ['bsd', 'absd', 'total']) put(key + '-out', money(r[key]));
        put('rate-out', r.rate + '% before any remission');
        document.getElementById('tier-body').innerHTML = r.rows.map(t => row([money(t.base), t.rate + '%', money(t.duty)])).join('');
      } else if (kind === 'cpf') {
        for (const key of ['principal', 'interest', 'refund']) put(key + '-out', money(r[key]));
      } else if (kind === 'mortgage') {
        for (const key of ['basePayment', 'scheduledPayment', 'totalInterest', 'totalPaid']) put(key + '-out', money(r[key]));
        put('months-out', r.months + ' months');
        put('finalPayment-out', money(r.monthly.at(-1).payment));
        lastSchedule = r; schedule();
      } else {
        put('paymentA-out', money(r.a.basePayment)); put('paymentB-out', money(r.b.basePayment));
        for (const key of ['monthlySaving', 'netSaved', 'cashAfterFees', 'balanceAdvantage']) put(key + '-out', money(r[key]));
        put('economicBreakEven-out', r.economicBreakEven === null ? 'Not reached within ' + r.horizon + ' months' : r.economicBreakEven === 0 ? 'No extra upfront fees to recover' : 'Month ' + r.economicBreakEven);
        put('cashRecovery-out', r.cashRecovery === null ? 'No recovery from lower payments' : r.cashRecovery === 0 ? 'No extra upfront fees' : r.cashRecovery + ' months' + (r.cashRecovery > r.horizon ? ' (beyond this horizon)' : ''));
        put('horizon-out', r.horizon + ' months');
        put('comparison-out', Math.abs(r.netSaved) < 0.005 ? 'Equal interest and fee cost under these assumptions.' : (r.netSaved > 0 ? (kind === 'hdb' ? 'Bank' : 'New') : (kind === 'hdb' ? 'HDB' : 'Current')) + ' option has lower interest and fee cost over this horizon.');
        document.getElementById('comparison-body').innerHTML = [
          ['Interest paid', r.endA.totalInterest, r.endB.totalInterest],
          ['Principal repaid', r.a.principal - r.endA.balance, r.b.principal - r.endB.balance],
          ['Balance at horizon', r.endA.balance, r.endB.balance],
          ['Upfront fees', r.feesA, r.feesB],
          ['Interest + fees', r.costA, r.costB]
        ].map(values => row([values[0], money(values[1]), money(values[2])])).join('');
      }
    } catch (e) {
      result.hidden = true; lastSchedule = null;
      error.textContent = e.message;
    }
  }
  if (kind === 'cpf') {
    const params = new URLSearchParams(window.location.search);
    for (const [key, name] of [['cpfUsed', 'initial'], ['years', 'years'], ['rate', 'rate']]) {
      if (params.has(key)) form.elements[name].value = params.get(key);
    }
    if (params.has('cpfUsed')) form.elements.monthly.value = '0';
  }
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', event => { event.preventDefault(); update(); });
  form.addEventListener('reset', () => { setTimeout(() => { const toggle = document.getElementById('showMonthly'); if (toggle) toggle.checked = false; update(); }, 0); });
  const toggle = document.getElementById('showMonthly');
  if (toggle) toggle.addEventListener('change', schedule);
  update();
})();
