import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
async function loadShared(document = {}) {
  const source = readFileSync(path.join(root, 'includes.js'), 'utf8');
  const marker = '  if (SETTINGS.enableHeaderFooter) {';
  assert.equal(source.split(marker).length, 2);
  // Stop before network/UI initialization and expose the real functions.
  const instrumented = source.replace(marker,
    '  return { SITE, SETTINGS, normalizePath, pickRelatedLinks, buildRelatedHTML, buildSearchIndex, injectPropertyCTA };\n' + marker);
  return new vm.Script(instrumented).runInNewContext({ document, console: { log() {} } });
}

test('related links render for every cluster, exclude self and respect the cap', async () => {
  const app = await loadShared();
  assert.deepEqual(Object.keys(app.SITE).sort(), ['family','financing','investing','property','protection','transport']);
  for (const [cluster, bucket] of Object.entries(app.SITE)) {
    assert.equal(typeof bucket.label, 'string', `${cluster} is missing its related-links label`);
    assert.ok(bucket.label.trim(), `${cluster} has an empty related-links label`);
    for (const self of [...(bucket.pages || []), ...(bucket.pillars || [])]) {
      const links = app.pickRelatedLinks({ bucket, cluster, subtopic: self.subtopic,
        selfPath: self.url, isHub: false });
      assert.ok(links.length <= app.SETTINGS.relatedMaxLinks);
      const urls = links.map(link => app.normalizePath(link.url));
      assert.equal(new Set(urls).size, urls.length);
      assert.ok(!urls.includes(app.normalizePath(self.url)), self.url);
      const html = app.buildRelatedHTML(bucket.label, links);
      assert.equal(typeof html, 'string');
      assert.doesNotMatch(html, /<h3>undefined<\/h3>/);
    }
  }
});

test('search index links resolve to real files', async () => {
  const app = await loadShared();
  const index = app.buildSearchIndex();
  assert.ok(index.length > 500);
  for (const item of index) {
    const relative = new URL(item.url, 'https://ownershipguide.com').pathname.slice(1);
    assert.ok(existsSync(path.join(root, relative)) || existsSync(path.join(root, relative + '.html')), item.url);
  }
});

test('property prompt finds its content container when there is no related placeholder', async () => {
  const inserted = [];
  const main = { querySelector() { return null; }, appendChild(node) { inserted.push(node); } };
  const document = {
    querySelector(selector) {
      if (selector === '#site-header + .container') return main;
      if (selector.includes('og:cluster')) return { getAttribute() { return 'property'; } };
      if (selector.includes('og:subtopic')) return { getAttribute() { return 'planning'; } };
      return null;
    },
    getElementById() { return null; }, createElement() { return {}; }
  };
  const app = await loadShared(document);
  app.injectPropertyCTA();
  assert.equal(inserted.length, 1);
  assert.match(inserted[0].innerHTML, /property-affordability-calculator-singapore/);
});
