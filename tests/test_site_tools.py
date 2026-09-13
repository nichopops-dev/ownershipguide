import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

from site_metadata import SitePage, excerpt

ROOT = Path(__file__).resolve().parents[1]


class SiteToolsTests(unittest.TestCase):
    def test_metadata_attribute_order_and_entities(self):
        for tag in ['<meta name="og:cluster" content="family">',
                    "<meta content='family' name='og:cluster'>"]:
            page = SitePage(tag + '<title>A &amp; B</title>')
            self.assertEqual(page.meta['og:cluster'], 'family')
            self.assertEqual(page.title, 'A & B')

    def test_missing_review_date_is_not_today(self):
        self.assertIsNone(SitePage('<p>No documented review.</p>').date())

    def test_date_with_inline_markup(self):
        page = SitePage('<p><strong>Last updated:</strong> <time>14 Apr 2026</time></p>')
        self.assertEqual(page.date(), '2026-04-14')

    def test_excerpt_ends_at_a_word(self):
        self.assertEqual(excerpt('A useful childcare comparison', 15), 'A useful…')

    def test_generators_preserve_history_and_accept_both_attribute_orders(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for name in ['site_metadata.py', 'generate-featured.py', 'generate-sitemap.py']:
                shutil.copy2(ROOT / name, root / name)
            for name, meta in [('one.html', '<meta content="family" name="og:cluster">'),
                               ('two.html', '<meta name="og:cluster" content="family">')]:
                (root / name).write_text(meta + '<title>A &amp; B</title>'
                                        '<meta content="A useful description" name="description">'
                                        '<p><strong>Last updated:</strong> 14 Apr 2026</p>')
            (root / 'undated.html').write_text('<title>No review date</title>')
            pinned = {'family': [{'url': '/one.html', 'title': 'Pinned'}]}
            registry = {'one.html': {'first_seen': '2026-03-01'}}
            (root / 'featured.json').write_text(json.dumps({'pinned': pinned, 'page_registry': registry}))
            for command in ['generate-featured.py', 'generate-sitemap.py']:
                subprocess.run(['python3', str(root / command)], check=True, capture_output=True)
            data = json.loads((root / 'featured.json').read_text())
            self.assertEqual(len(data['cluster_pages']['family']), 2)
            self.assertEqual(data['pinned'], pinned)
            self.assertEqual(data['page_registry']['one.html']['first_seen'], '2026-03-01')
            self.assertEqual(data['page_registry']['two.html']['first_seen'], '2026-04-14')
            self.assertEqual(data['cluster_pages']['family'][0]['desc'], 'A useful description')
            # A stale generation timestamp alone must not dirty an unchanged site.
            data['generated'] = '2001-01-01'
            (root / 'featured.json').write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')
            first = (root / 'featured.json').read_bytes()
            subprocess.run(['python3', str(root / 'generate-featured.py')], check=True, capture_output=True)
            self.assertEqual((root / 'featured.json').read_bytes(), first)
            import xml.etree.ElementTree as ET
            ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
            for entry in ET.parse(root / 'sitemap.xml').getroot():
                if entry.findtext('s:loc', namespaces=ns).endswith('/undated.html'):
                    self.assertIsNone(entry.find('s:lastmod', ns))


if __name__ == '__main__':
    unittest.main()
