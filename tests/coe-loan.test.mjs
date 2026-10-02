import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const {calculate} = require('../scripts/coe-loan-model.js');
const html = readFileSync(new URL('../coe-loan-calculator-singapore.html',import.meta.url),'utf8');
const guide = readFileSync(new URL('../car-loan-rates-singapore.html',import.meta.url),'utf8');
const defaults = Object.fromEntries([...html.matchAll(/<input\b[^>]*name="([^"]+)"[^>]*value="([^"]+)"/g)].map(m=>[m[1],Number(m[2])]));
for (const m of html.matchAll(/<select\b[^>]*name="([^"]+)"[^>]*>([\s\S]*?)<\/select>/g)) {
  defaults[m[1]]=m[2].match(/<option\b[^>]*value="([^"]+)"[^>]*selected[^>]*>/)[1];
}
const near = (a,b,tolerance=0.005) => assert.ok(Math.abs(a-b)<tolerance,a+' != '+b);
// Sum each discounted payment independently of the shared annuity helper.
const discounted = r => Array.from({length:r.months},(_,i)=>r.monthly / (1+r.eir/100)**((i+1)/12)).reduce((a,b)=>a+b,0);

test('COE loan published defaults reconcile debt, initial cash and full funding',()=>{
  const r=calculate(defaults);
  near(r.principal,80000); near(r.down,20000); near(r.monthly,1525.333333);
  near(r.interest,11520); near(r.repayments,91520); near(r.loanTotal,92020);
  near(r.fullFunding,112020); near(r.initialCash,20500); near(r.financingCost,12020);
  near(r.eir,5.83529678,1e-6); assert.equal(r.months,60); assert.equal(r.beyondCoe,false);
  for (const amount of ['11,520.00','1,525.33','92,020.00','112,020.00','20,500.00','5.84%']) assert.ok(html.includes(amount),amount);
});
test('upfront fees increase EIR and cost without changing contractual repayments',()=>{
  const r=calculate(defaults), higher=calculate({...defaults,fees:1500}), free=calculate({...defaults,fees:0});
  near(higher.monthly,r.monthly); near(higher.interest,r.interest);
  near(higher.fullFunding-r.fullFunding,1000); near(higher.initialCash-r.initialCash,1000);
  assert.ok(higher.eir>r.eir && r.eir>free.eir);
});
test('fee-inclusive EIR discounts monthly cash flows to net loan funding',()=>{
  for (const change of [{},{fees:0},{fees:1500},{tenureYears:1.5},{rateType:'effective',ratePct:8},{rateType:'nominal',ratePct:8}]) {
    const r=calculate({...defaults,...change}); near(discounted(r),r.principal-r.fees,1e-6);
    near(r.fullFunding,r.amount+r.financingCost); near(r.fullFunding,r.initialCash+r.repayments);
  }
});
test('nominal monthly-rest repayments reconcile an independent balance schedule',()=>{
  const r=calculate({...defaults,rateType:'nominal',ratePct:6,fees:0});
  let balance=r.principal,interest=0;
  for(let i=0;i<r.months;i++){const charge=balance*0.06/12;interest+=charge;balance+=charge-r.monthly;}
  near(balance,0,1e-6); near(r.interest,interest,1e-6); near(r.eir,((1+0.06/12)**12-1)*100,1e-8);
});
test('annual effective and nominal annual inputs use distinct rate conventions',()=>{
  const eff=calculate({...defaults,rateType:'effective',ratePct:6,fees:0});
  const nominal=calculate({...defaults,rateType:'nominal',ratePct:6,fees:0});
  near(eff.eir,6,1e-8); assert.ok(nominal.monthly>eff.monthly);
  const equivalent=calculate({...defaults,rateType:'nominal',ratePct:((1.06)**(1/12)-1)*1200,fees:0});
  near(eff.monthly,equivalent.monthly,1e-6);
});
test('zero and near-zero rates remain stable; a zero-rate fee is still borrowing cost',()=>{
  for (const rateType of ['flat','effective','nominal']) {
    for (const ratePct of [0,1e-18]) {
      const r=calculate({...defaults,rateType,ratePct,fees:0});
      near(r.monthly,80000/60,1e-8); near(r.interest,0,1e-8); near(r.eir,0,1e-8);
    }
    const fee=calculate({...defaults,rateType,ratePct:0});
    near(fee.financingCost,500); assert.ok(fee.eir>0); near(discounted(fee),79500,1e-6);
  }
});
test('cash funding and zero amount have no repayments, fees or implied rate',()=>{
  for (const change of [{downPct:100},{coeAmount:0}]) {
    const r=calculate({...defaults,...change,fees:0});
    near(r.principal,0); near(r.monthly,0); near(r.financingCost,0);
    near(r.fullFunding,r.amount); assert.equal(r.eir,null); assert.equal(r.beyondCoe,false);
    assert.throws(()=>calculate({...defaults,...change}),/zero when no loan/);
  }
});
test('cash contribution reduces interest and whole-month terms reconcile',()=>{
  const base=calculate({...defaults,fees:0}),r=calculate({...defaults,downPct:40,tenureYears:1.5,fees:0});
  assert.equal(r.months,18); near(r.principal,60000); near(r.interest,60000*0.0288*1.5);
  near(r.fullFunding,100000+r.interest); assert.ok(r.interest<base.interest);
  assert.equal(calculate({...defaults,tenureYears:1/12}).months,1);
});
test('published matched offers and term example compare dollars alongside EIR',()=>{
  const x={...defaults,coeAmount:100000,downPct:0,rateType:'flat',tenureYears:5};
  const a=calculate({...x,ratePct:2.28,fees:0}),b=calculate({...x,ratePct:2.18,fees:1000});
  near(a.monthly,1856.666667); near(b.monthly,1848.333333);
  near(a.loanTotal,111400); near(b.loanTotal,111900); near(b.loanTotal-a.loanTotal,500);
  near(a.eir,4.418922704,1e-6); near(b.eir,4.655878561,1e-6); assert.ok(b.eir>a.eir);
  const longer=calculate({...x,ratePct:2.28,fees:0,tenureYears:7});
  near(longer.monthly,1380.476190); near(longer.interest-a.interest,4560);
  near(longer.eir,4.37999518,1e-6); assert.ok(longer.eir<a.eir);
  for(const amount of ['1,856.67','1,848.33','111,400','111,900','4.42%','4.66%','1,380.48','15,960','115,960','4.38%']) assert.ok(guide.includes(amount),amount);
});
test('term beyond COE is flagged without silently shortening or repricing the loan',()=>{
  const base=calculate(defaults),r=calculate({...defaults,coeYears:3});
  assert.equal(r.beyondCoe,true); assert.equal(r.coeMonths,36); assert.equal(r.months,60);
  near(r.monthly,base.monthly); near(r.fullFunding,base.fullFunding);
  assert.equal(calculate({...defaults,coeYears:5}).beyondCoe,false);
});
test('blank, negative, nonfinite and incompatible input values are rejected',()=>{
  for(const key of Object.keys(defaults).filter(k=>typeof defaults[k]==='number')) {
    for(const value of ['', ' ',null,undefined,NaN,Infinity,-1]) assert.throws(()=>calculate({...defaults,[key]:value}),key);
  }
  for(const change of [{downPct:101},{ratePct:101},{rateType:'APR'},{tenureYears:0},{coeYears:0},{tenureYears:10.1},{coeYears:10.1},{tenureYears:3.1},{coeYears:3.1},{fees:80000},{fees:90000},{coeAmount:1e10}]) assert.throws(()=>calculate({...defaults,...change}));
});
test('COE UI hides stale results, renders timing and cash cases, and restores defaults',()=>{
  const nodes=new Map();
  for(const m of html.matchAll(/\bid="([^"]+)"/g)) nodes.set(m[1],{textContent:'',innerHTML:'',hidden:false});
  const fields=Object.entries(defaults).map(([name,value])=>({name,value:String(value)})),handlers={};
  const form={querySelectorAll:()=>fields,addEventListener:(type,fn)=>{handlers[type]=fn;}};
  new vm.Script(readFileSync(new URL('../scripts/coe-loan-calculator.js',import.meta.url),'utf8')).runInNewContext({
    document:{querySelector:()=>form,getElementById:id=>{assert.ok(nodes.has(id),id);return nodes.get(id);}},
    window:{OGCoeLoan:{calculate}},Intl,setTimeout:fn=>fn()
  });
  const change=(name,value)=>{fields.find(f=>f.name===name).value=String(value);handlers.input();};
  assert.match(nodes.get('full-funding').textContent,/112,020\.00/);
  change('fees',1500); assert.match(nodes.get('kpiTotal').textContent,/93,020\.00/);
  change('coeYears',3); assert.match(nodes.get('coe-period-note').textContent,/exceeds/);
  change('coeAmount',''); assert.equal(nodes.get('calculator-results').hidden,true);
  assert.match(nodes.get('calculator-error').textContent,/Enter COE amount/);
  fields.forEach(f=>{f.value=String(defaults[f.name]);}); handlers.reset();
  assert.equal(nodes.get('calculator-results').hidden,false); assert.equal(nodes.get('calculator-error').textContent,'');
  assert.match(nodes.get('eir-out').textContent,/5\.84%/);
  change('fees',0); change('downPct',100); assert.equal(nodes.get('eir-out').textContent,'No loan used');
  assert.match(nodes.get('effectiveNote').textContent,/Cash contribution funds/);
  assert.match(nodes.get('funding-rows').innerHTML,/Full COE funding cash/);
  let prevented=false; handlers.submit({preventDefault:()=>{prevented=true;}}); assert.ok(prevented);
});
