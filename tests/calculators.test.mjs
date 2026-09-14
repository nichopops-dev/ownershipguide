import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hearing = 'hearing-vision-home-adjustment-cost-calculator-singapore.html';
const moving = 'home-modifications-vs-relocating-cost-calculator-singapore.html';
const walker = 'walker-friendly-home-vs-wheelchair-ready-home-calculator-singapore.html';

// Execute the actual inline scripts with their real input defaults and event
// handlers. DOM stand-ins keep these arithmetic tests independent of a browser.
function loadCalculator(file) {
  const html = readFileSync(path.join(root, file), 'utf8');
  const nodes = new Map();
  const inputs = [];
  const makeNode = () => ({
    value: '', textContent: '', innerHTML: '', style: {}, listeners: {},
    addEventListener(name, listener) { this.listeners[name] = listener; },
    appendChild() {}, scrollIntoView() {}
  });
  for (const match of html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*)>/gi)) {
    const attrs = Object.fromEntries([...match[2].matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
    if (!attrs.id) continue;
    const node = makeNode();
    node.value = attrs.value || '';
    nodes.set(attrs.id, node);
    if (match[1] === 'input') inputs.push(node);
  }
  const document = {
    getElementById(id) { assert.ok(nodes.has(id), `Missing element: ${id}`); return nodes.get(id); },
    querySelectorAll(selector) { assert.equal(selector, 'main input'); return inputs; },
    createElement: makeNode
  };
  const context = vm.createContext({ document, Intl });
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    if (/application\/ld\+json|\bsrc\s*=/.test(match[1])) continue;
    new vm.Script(match[2], { filename: file }).runInContext(context, { timeout: 1000 });
  }
  return {
    text(id) { return nodes.get(id).textContent; },
    number(id) { return Number(this.text(id).replace(/[^0-9.-]/g, '')); },
    set(id, value) {
      const node = nodes.get(id); node.value = String(value);
      node.listeners.input?.();
    },
    click(id) { nodes.get(id).listeners.click(); },
    zero() { for (const node of inputs) node.value = '0'; }
  };
}

for (const [file, routeA, routeB, threshold] of [
  [hearing, 511, 273, 238],
  [moving, 810, 1351, -92],
  [walker, 474, 621, 463]
]) {
  test(`${file}: defaults render actual costs`, () => {
    const calc = loadCalculator(file);
    assert.equal(calc.number('routeAMonthly'), routeA);
    assert.equal(calc.number('routeBMonthly'), routeB);
    assert.equal(calc.number('breakevenMetric'), threshold);
  });
  test(`${file}: zero income is not shown as zero percent`, () => {
    const calc = loadCalculator(file);
    calc.set('householdIncome', 0);
    assert.equal(calc.text('pressureRatio'), '—');
    assert.match(calc.text('resultNote'), /positive household income/);
  });
  test(`${file}: blank inputs do not produce NaN or infinity`, () => {
    const calc = loadCalculator(file);
    calc.zero(); calc.set('spreadMonths', '');
    for (const id of ['routeAMonthly', 'routeBMonthly', 'monthlyGap', 'breakevenMetric']) {
      assert.equal(calc.number(id), 0);
      assert.doesNotMatch(calc.text(id), /NaN|Infinity/);
    }
  });
}

test('hearing support threshold includes the residual support in Route B', () => {
  const calc = loadCalculator(hearing); calc.zero();
  calc.set('spreadMonths', 48); calc.set('lightingBulbs', 35);
  calc.set('hearingVisionDevices', 4800); calc.set('hourlyValue', 20);
  calc.set('familyHoursB', 5);
  // B is 100/month for devices plus 100/month for remaining support.
  // A needs 165/month of prompting on top of its 35 fixed cost to tie.
  assert.equal(calc.number('breakevenMetric'), 165);
  calc.set('familyPromptHours', 8.25);
  assert.equal(calc.number('routeAMonthly'), 200);
  assert.equal(calc.number('routeBMonthly'), 200);
  calc.set('familyPromptHours', 9);
  assert.ok(calc.number('routeAMonthly') > calc.number('routeBMonthly'));
});

test('wheelchair threshold prices Route A workarounds, not Route B headroom', () => {
  const calc = loadCalculator(walker); calc.zero();
  calc.set('spreadMonths', 60); calc.set('railsCost', 6000);
  calc.set('wheelchairWorks', 12000); calc.set('hourlyValue', 20);
  calc.set('familyHoursB', 5);
  assert.equal(calc.number('breakevenMetric'), 200);
  calc.set('nearMissHours', 10);
  assert.equal(calc.number('routeAMonthly'), 300);
  assert.equal(calc.number('routeBMonthly'), 300);
});

test('relocation allows savings and preserves a negative break-even threshold', () => {
  const calc = loadCalculator(moving); calc.zero();
  calc.set('spreadMonths', 60); calc.set('worksCost', 6000);
  calc.set('moveCost', 12000);
  assert.equal(calc.number('breakevenMetric'), -100);
  calc.set('housingDelta', -100);
  assert.equal(calc.number('routeAMonthly'), 100);
  assert.equal(calc.number('routeBMonthly'), 100);
  calc.set('housingDelta', -150);
  assert.equal(calc.number('routeBMonthly'), 50);
});

// BSD now uses the shared property model. Its original tier and second-home
// examples, plus rounding and profile cases, are in property-models.test.mjs.
