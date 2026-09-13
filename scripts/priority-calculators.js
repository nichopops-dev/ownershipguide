/* DOM adapter: all arithmetic lives in finance-models.js. No data is submitted. */
(function () {
  'use strict';
  const form = document.querySelector('[data-finance-calculator]');
  if (!form) return;
  const error = document.getElementById('calculator-error');
  const results = document.getElementById('calculator-results');
  const money = (n, decimals = 0) => new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD', minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);
  const percent = n => n.toFixed(2) + '%';
  const put = (id, value) => { document.getElementById(id).textContent = value; };
  function update() {
    const x = {};
    for (const input of form.querySelectorAll('input, select')) x[input.name] = input.type === 'checkbox' ? input.checked : input.value;
    const type = form.dataset.financeCalculator;
    if (type === 'carBudget') {
      const components = x.mode === 'components';
      document.getElementById('components').hidden = !components;
      document.getElementById('direct-fields').hidden = components;
      form.elements.stressRate.disabled = !components;
      if (!components) { form.elements.stressRate.checked = false; x.stressRate = false; }
    }
    try {
      const r = window.OGFinance[type](x);
      error.textContent = ''; results.hidden = false;
      if (type === 'carLoan') {
        for (const key of ['principal', 'monthly', 'interest', 'total']) put(key + '-out', money(r[key], 2));
        put('eir-out', percent(r.eir));
        put('limit-out', r.overCap ? 'Loan exceeds the ' + money(r.cap) + ' modelled MAS financing cap.' : 'Within the modelled financing cap. Lender approval and vehicle eligibility still apply.');
      } else if (type === 'carBudget') {
        for (const key of ['monthlyCash', 'remaining', 'economic', 'upfront', 'exitEquity']) put(key + '-out', r[key] === null ? 'Not calculated in direct mode' : money(r[key]));
        put('ratio-out', r.ratio === null ? 'Not defined without income' : percent(r.ratio * 100));
        put('status-out', r.status);
      } else if (type === 'property') {
        for (const key of ['instalment', 'assessedInstalment', 'stressInstalment', 'incomeCap', 'ltvCap', 'maxLoan', 'minCash', 'upfront']) put(key + '-out', money(r[key]));
        put('assessment-out', percent(r.assessRate) + ' assessment rate; ' + percent(r.ltv * 100) + ' LTV ceiling');
        put('status-out', r.status + ' (' + r.gate + ')');
      } else if (type === 'life') {
        for (const key of ['annualGap', 'incomeNeed', 'obligations', 'available', 'gap']) put(key + '-out', money(r[key]));
      }
    } catch (e) {
      results.hidden = true;
      error.textContent = e.message;
    }
  }
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', event => { event.preventDefault(); update(); });
  update();
})();
