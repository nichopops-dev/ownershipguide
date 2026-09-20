import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { normalize, matches, initDirectory } = require('../scripts/guide-directory.js');

function element(props = {}) {
  const listeners = {};
  return { hidden:false, value:'', textContent:'', ...props,
    addEventListener(type, fn) { listeners[type] = fn; },
    fire(type, event = {}) { listeners[type]?.(event); },
    focus() { this.focused = true; }
  };
}
function fixture({ query = '', topicValue = '', hash = '' } = {}) {
  const queryInput = element({ value:query });
  const topic = element({ value:topicValue });
  const controls = element({ hidden:true });
  const clear = element(); const status = element(); const empty = element({ hidden:true });
  function group(id, texts) {
    const items = texts.map(textContent => element({ textContent, getAttribute:() => '' }));
    const count = element();
    return element({ id:id+'-comparisons', open:true, items, count,
      getAttribute:() => id, querySelector:() => count, querySelectorAll:() => items });
  }
  const groups = [group('transport',['Car versus ride-hailing','T-bills delivery van']),
    group('investing',['T-Bills vs Singapore Savings Bonds','SRS vs CPF retirement top-ups'])];
  const map = { '[data-directory-controls]':controls, '[data-directory-query]':queryInput,
    '[data-directory-topic]':topic, '[data-directory-clear]':clear,
    '[data-directory-status]':status, '[data-directory-empty]':empty };
  const root = { querySelector:s => map[s], querySelectorAll:() => groups };
  const view = element({ location:{ hash } });
  initDirectory(root, view);
  return { root, view, groups, controls, queryInput, topic, clear, status, empty };
}

test('directory search handles case, punctuation, accents and multiple words in any order', () => {
  assert.equal(normalize('  T‑BILLS / CPF  '), 't bills cpf');
  assert.ok(matches('Éducation Fund vs SRS', 'SRS education'));
  assert.ok(matches('T-Bills versus Savings Bonds', 'bonds t bills'));
  assert.ok(!matches('Savings Bonds', 'bonds cpf'));
  assert.ok(matches('Any guide', '  / — '));
});
test('topic and query combine, counts reconcile and empty groups disappear', () => {
  const f = fixture();
  f.queryInput.value = 't bills'; f.queryInput.fire('input');
  assert.equal(f.status.textContent,'2 of 4 links shown');
  f.topic.value = 'investing'; f.topic.fire('change');
  assert.equal(f.status.textContent,'1 of 4 links shown');
  assert.equal(f.groups[0].hidden,true);
  assert.equal(f.groups[1].open,true);
  assert.equal(f.groups[1].count.textContent,'1');
  assert.equal(f.groups[1].items[1].hidden,true);
});
test('no results offers recovery and clear restores previous expanded groups and focus', () => {
  const f = fixture(); f.groups[0].open = true;
  f.queryInput.value = 'not-a-real-topic'; f.queryInput.fire('input');
  assert.equal(f.status.textContent,'0 of 4 links shown');
  assert.equal(f.empty.hidden,false);
  f.clear.fire('click');
  assert.equal(f.status.textContent,'4 of 4 links shown');
  assert.equal(f.empty.hidden,true);
  assert.equal(f.groups[0].open,true);
  assert.equal(f.groups[1].open,false);
  assert.equal(f.queryInput.focused,true);
});
test('restored form values and pageshow apply the filter without waiting for typing', () => {
  const f = fixture({ query:'CPF',topicValue:'investing' });
  assert.equal(f.status.textContent,'1 of 4 links shown');
  f.queryInput.value = 'ride hailing'; f.topic.value = '';
  f.view.fire('pageshow');
  assert.equal(f.groups[0].hidden,false);
  assert.equal(f.groups[1].hidden,true);
});
test('existing deep links open their directory and recover a hidden target after filtering', () => {
  const f = fixture({ hash:'#investing-comparisons' });
  assert.equal(f.groups[1].open,true);
  f.topic.value = 'transport'; f.topic.fire('change');
  assert.equal(f.groups[1].hidden,true);
  f.view.fire('hashchange');
  assert.equal(f.topic.value,'');
  assert.equal(f.groups[1].open,true);
  assert.equal(f.groups[1].hidden,false);
});
test('Enter does not submit search text or navigate away', () => {
  const f = fixture(); let prevented = false;
  f.controls.fire('submit',{preventDefault(){prevented=true;}});
  assert.equal(prevented,true);
});
test('incomplete markup leaves the directory untouched', () => {
  assert.doesNotThrow(() => initDirectory({querySelector:() => null,querySelectorAll:() => []}, {}));
});
test('static directory links remain usable without JavaScript and controls have labels', () => {
  for (const path of ['start-here/index.html','comparisons/index.html','calculators/index.html']) {
    const html = readFileSync(new URL('../'+path, import.meta.url),'utf8');
    assert.match(html, /data-directory-controls hidden/);
    const groups = [...html.matchAll(/<details\b([^>]*data-directory-group[^>]*)>/g)];
    assert.ok(groups.length >= 5);
    assert.ok(groups.every(group => /\bopen\b/.test(group[1])));
    const items = [...html.matchAll(/<li data-directory-item[^>]*>(.*?)<\/li>/g)];
    assert.ok(items.length > 40);
    assert.ok(items.every(item => /<a href="\/[^"#]+"/.test(item[1]) && !/\bhidden\b/.test(item[0])));
    for (const field of html.matchAll(/<(?:input|select) id="([^"]+)" data-directory-/g)) {
      assert.ok(html.includes('for="'+field[1]+'"'));
    }
    assert.match(html, /data-directory-status role="status" aria-live="polite"/);
  }
});
