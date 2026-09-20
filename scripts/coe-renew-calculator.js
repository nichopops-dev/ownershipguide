(function () {
  'use strict';
  const form = document.querySelector('[data-coe-renew-calculator]');
  if (!form) return;
  const error = document.getElementById('calculator-error');
  const results = document.getElementById('calculator-results');
  const money = value => new Intl.NumberFormat('en-SG', { style:'currency', currency:'SGD', minimumFractionDigits:2, maximumFractionDigits:2 }).format(value);
  const put = (id, value) => { document.getElementById(id).textContent = value; };
  function update() {
    const x = {};
    for (const field of form.querySelectorAll('input,select')) x[field.name] = field.value;
    try {
      const r = window.OGCOERenew.compare(x);
      error.textContent = ''; results.hidden = false;
      put('renewMonthly',money(r.renewMonthly)); put('replaceMonthly',money(r.replaceMonthly));
      put('winner',r.winner === 'Tie' ? 'Similar cost' : r.winner + ' has lower modelled cost');
      put('deltaSub',r.winner === 'Tie' ? 'The total costs are equal within one cent.' : money(Math.abs(r.difference))+' difference over '+r.horizon+' months; this does not assess reliability or eligibility.');
      put('loanMonthly',money(r.finance.payment));
      for (const key of ['renewUpfront','replaceGrossUpfront','replaceNetUpfront','replaceExitNet','renewNetCash','replaceNetCash']) put(key,money(r[key]));
      put('loanBalance',money(r.finance.balance));
      put('headroom',r.difference > 0 ? 'An extra '+money(r.renewalRepairHeadroom)+' a year of renewal costs would remove its advantage, with other inputs unchanged.' : r.difference < 0 ? 'Renewal would need '+money(-r.renewalRepairHeadroom)+' less annual cost to tie, with other inputs unchanged.' : 'Any additional renewal cost would favour replacement in this model.');
      const rows = [
        ['Current car value retained',r.currentValue,0],
        ['Renewal premium / replacement price',r.renewPremium,r.replacePrice],
        ['One-off repairs / upfront fees',r.renewOneOff,r.fees],
        ['Running costs over holding period',r.renewRunning,r.replaceRunning],
        ['Loan interest within holding period',0,r.finance.interest],
        ['Gross exit value (subtract)',-r.renewResale,-r.replaceResale],
        ['Total resource cost',r.renewTotal,r.replaceTotal]
      ];
      document.getElementById('tbody').innerHTML = rows.map(row=>'<tr><th scope="row">'+row[0]+'</th><td>'+money(row[1])+'</td><td>'+money(row[2])+'</td></tr>').join('');
    } catch (e) {
      results.hidden = true; error.textContent = e.message;
    }
  }
  form.addEventListener('input',update);
  form.addEventListener('change',update);
  form.addEventListener('submit',event=>{event.preventDefault();update();});
  form.addEventListener('reset',()=>setTimeout(update,0));
  update();
})();
