import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const { compare } = require('../scripts/coe-renew-model.js');
const html = readFileSync(new URL('../coe-renew-vs-replace-calculator-singapore.html',import.meta.url),'utf8');
const defaults = Object.fromEntries([...html.matchAll(/<input\b[^>]*name="([^"]+)"[^>]*value="([^"]+)"/g)].map(m=>[m[1],Number(m[2])]));
defaults.renewYears = Number(html.match(/<select id="renewYears"[^>]*><option value="([^"]+)" selected>/)[1]);
const near = (actual,expected,tolerance=1e-6) => assert.ok(Math.abs(actual-expected)<tolerance, `${actual} != ${expected}`);

test('COE published defaults reconcile resource costs, payments and exit debt', () => {
  const r = compare(defaults);
  near(r.renewTotal,119000); near(r.replaceTotal,95513.75752176635);
  near(r.renewMonthly,1983.3333333333); near(r.replaceMonthly,1591.8959586961);
  near(r.finance.payment,832.4379041241); near(r.finance.balance,19367.4832743209);
  near(r.replaceNetUpfront,16200); near(r.renewUpfront,61000);
  assert.equal(r.winner,'Replace');
  for (const amount of ['119,000','95,513.76','1,983.33','1,591.90','832.44','19,367.48']) assert.ok(html.includes(amount));
});
test('current car value changes renewal opportunity cost and replacement cash once each', () => {
  const a=compare({...defaults,currentValue:0}),b=compare({...defaults,currentValue:20000});
  near(b.renewTotal-a.renewTotal,20000);near(a.replaceTotal,b.replaceTotal);
  near(a.replaceNetUpfront-b.replaceNetUpfront,20000);near(a.renewNetCash,b.renewNetCash);
});
test('shorter holding period does not shorten the loan or charge future interest', () => {
  const a=compare(defaults),b=compare({...defaults,years:2});
  near(a.finance.payment,b.finance.payment);
  assert.equal(b.finance.payments,24);assert.ok(b.finance.interest<a.finance.interest);
  const monthly=0.03/12;
  const expectedBalance=63000*(1+monthly)**24-b.finance.payment*((1+monthly)**24-1)/monthly;
  near(b.finance.balance,expectedBalance);
});
test('loan payments stop at maturity when the car is held longer', () => {
  const r=compare({...defaults,renewYears:10,replacementCOEYears:10,years:10,loanYears:3});
  assert.equal(r.finance.payments,36);near(r.finance.balance,0);
  near(r.finance.interest,r.finance.paid-r.principal);
});
test('cash purchase has no finance cost or balance and reconciles cash to resource cost', () => {
  const r=compare({...defaults,downPct:100});
  near(r.replaceTotal,89200);near(r.finance.payment,0);near(r.finance.interest,0);near(r.finance.balance,0);
  near(r.replaceNetUpfront,79200);
});
test('zero-interest financing preserves principal and remaining balance', () => {
  const r=compare({...defaults,apr:0,years:2,loanYears:7});
  near(r.finance.payment,750);near(r.finance.interest,0);near(r.finance.balance,45000);
});
test('cash reconciliation holds at early exit, maturity and after maturity', () => {
  for (const years of [0.5,2,5,7,10]) {
    const r=compare({...defaults,years,renewYears:10,replacementCOEYears:10});
    near(r.renewTotal-r.currentValue,r.renewNetCash);
    near(r.replaceTotal-r.currentValue,r.replaceNetCash);
    near(r.difference,r.replaceNetCash-r.renewNetCash);
  }
});
test('low exit value exposes negative equity rather than clamping it away', () => {
  const r=compare({...defaults,years:1,replaceResale:1000});
  assert.ok(r.replaceExitNet<0);
  near(r.replaceNetCash,r.replaceTotal-r.currentValue);
});
test('repair threshold ties the costs and additional repairs change the comparison', () => {
  const x={...defaults,replacePrice:180000};const r=compare(x);
  assert.equal(r.winner,'Renew');
  const tie=compare({...x,renewMaintUplift:x.renewMaintUplift+r.renewalRepairHeadroom});
  near(tie.difference,0);assert.equal(tie.winner,'Tie');
  assert.equal(compare({...x,renewMaintUplift:x.renewMaintUplift+r.renewalRepairHeadroom+1}).winner,'Replace');
});
test('blank, nonfinite, negative and impossible horizons produce errors', () => {
  for (const key of Object.keys(defaults)) {
    for (const value of ['',NaN,Infinity,null]) assert.throws(()=>compare({...defaults,[key]:value}));
  }
  for (const [key,value] of [['years',0],['years',5.1],['renewYears',6],['years',6],['replacementCOEYears',4],['loanYears',8],['downPct',101],['downPct',-1],['apr',-1],['renewResale',-1],['replaceMaintDelta',-9001]]) {
    assert.throws(()=>compare({...defaults,[key]:value}),key);
  }
});
test('valid cost savings, zero costs and whole-month fractional years are accepted', () => {
  const r=compare({...defaults,years:0.5,annualRunning:0,replaceMaintDelta:0,renewPremium:0,renewOneOff:0,renewMaintUplift:0,downPct:100,apr:0});
  assert.equal(r.horizon,6);assert.ok(Number.isFinite(r.replaceTotal));
  assert.doesNotThrow(()=>compare({...defaults,replaceMaintDelta:-9000}));
});
test('calculator UI hides invalid stale results, recovers and resets native defaults', () => {
  const nodes=new Map();
  for (const m of html.matchAll(/\bid="([^"]+)"/g)) nodes.set(m[1],{textContent:'',innerHTML:'',hidden:false});
  const fields=Object.entries(defaults).map(([name,value])=>({name,value:String(value)}));
  const handlers={};const form={querySelectorAll:()=>fields,addEventListener:(type,fn)=>{handlers[type]=fn;}};
  new vm.Script(readFileSync(new URL('../scripts/coe-renew-calculator.js',import.meta.url),'utf8')).runInNewContext({
    document:{querySelector:()=>form,getElementById:id=>{assert.ok(nodes.has(id),id);return nodes.get(id);}},
    window:{OGCOERenew:{compare}},Intl,setTimeout:fn=>fn()
  });
  assert.equal(nodes.get('calculator-results').hidden,false);
  fields.find(f=>f.name==='years').value='';handlers.input();
  assert.equal(nodes.get('calculator-results').hidden,true);assert.match(nodes.get('calculator-error').textContent,/Enter holding period/);
  fields.find(f=>f.name==='years').value='3';let prevented=false;
  handlers.submit({preventDefault(){prevented=true;}});
  assert.equal(prevented,true);assert.equal(nodes.get('calculator-results').hidden,false);
  // A native reset restores input values before the deferred reset handler runs.
  fields.forEach(f=>{f.value=String(defaults[f.name]);});handlers.reset();
  assert.equal(nodes.get('calculator-error').textContent,'');
  assert.match(nodes.get('replaceMonthly').textContent,/1,591\.90/);
  assert.match(nodes.get('tbody').innerHTML,/Current car value retained/);
});
