(function () {
  'use strict';
  const form = document.querySelector('[data-coe-loan-calculator]');
  if (!form) return;
  const result = document.getElementById('calculator-results');
  const error = document.getElementById('calculator-error');
  const money = value => 'S$' + new Intl.NumberFormat('en-SG',{minimumFractionDigits:2,maximumFractionDigits:2}).format(value);
  const put = (id,text) => {document.getElementById(id).textContent = text;};
  function update() {
    const input = Object.fromEntries([...form.querySelectorAll('input,select')].map(field => [field.name,field.value]));
    try {
      const r = window.OGCoeLoan.calculate(input);
      error.textContent = '';
      result.hidden = false;
      for (const [id,key] of [['kpiPrincipal','principal'],['kpiMonthly','monthly'],['kpiInterest','interest'],
        ['kpiTotal','loanTotal'],['full-funding','fullFunding'],['initial-cash','initialCash'],['finance-cost','financingCost']]) put(id,money(r[key]));
      put('eir-out',r.eir === null ? 'No loan used' : r.eir.toFixed(2) + '% / year');
      put('effectiveNote',r.eir === null ? 'Cash contribution funds the full COE amount. There are no repayments or loan fees.'
        : 'Fee-inclusive annual effective rate: ' + r.eir.toFixed(2) + '%. Net loan funding for this rate calculation is '
          + money(r.principal - r.fees) + ', followed by ' + r.months + ' equal monthly repayments starting after one month.');
      put('coe-period-note',r.beyondCoe ? 'The loan term exceeds the entered COE period. Price settlement at expiry or earlier sale with the lender; do not assume another renewal or a COE rebate clears the debt.'
        : 'The loan term fits within the entered COE period. Confirm the actual expiry date and lender terms before committing.');
      const rows = [['Cash contribution',r.down],['Loan principal repaid',r.principal],
        ['Full-term interest',r.interest],['Upfront loan fees',r.fees],['Full COE funding cash',r.fullFunding]];
      document.getElementById('funding-rows').innerHTML = rows.map(([label,amount]) =>
        '<tr><th scope="row">' + label + '</th><td>' + money(amount) + '</td></tr>').join('');
    } catch (e) {
      result.hidden = true;
      error.textContent = e.message;
    }
  }
  form.addEventListener('input',update);
  form.addEventListener('change',update);
  form.addEventListener('submit',event => {event.preventDefault(); update();});
  form.addEventListener('reset',() => setTimeout(update,0));
  update();
})();
