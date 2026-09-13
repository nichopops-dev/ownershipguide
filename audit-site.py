#!/usr/bin/env python3
"""Read-only release gate. Run with Python 3 and Node.js (or set NODE)."""

from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import os
import posixpath
import re
import shutil
import subprocess
import sys
import xml.etree.ElementTree as ET

from site_metadata import CLUSTERS, page_url, read_page

ROOT = Path(__file__).resolve().parent
PARTIALS = {'header.html', 'footer.html'}
SITEMAP_SKIP = PARTIALS | {'404.html', 'about.html', 'contact.html'}


def local_target(source, url):
    parsed = urlsplit(url)
    if parsed.scheme and parsed.scheme not in ('https', 'http'):
        return None, ''
    if parsed.netloc and parsed.netloc not in ('ownershipguide.com', 'www.ownershipguide.com'):
        return None, ''
    raw = unquote(parsed.path)
    path = posixpath.normpath(raw.lstrip('/') if raw.startswith('/') else
                             posixpath.join(posixpath.dirname(source), raw)) if raw else source
    if (ROOT / path).is_dir():
        path = posixpath.normpath(posixpath.join(path, 'index.html'))
    return path, unquote(parsed.fragment)


def main():
    pages = {str(path.relative_to(ROOT)): read_page(path) for path in ROOT.rglob('*.html')
             if not any(part.startswith('.') or part in ('node_modules', 'artifacts', 'tests')
                        for part in path.relative_to(ROOT).parts)}
    errors = []
    scripts = []
    inbound = defaultdict(set)
    titles = defaultdict(list)
    for name, page in sorted(pages.items()):
        source = (ROOT / name).read_text(encoding='utf-8')
        if not source.strip():
            errors.append(f'{name}: empty HTML file')
        if re.search(r'[\w:-]+=\s*[“”]', source):
            errors.append(f'{name}: typographic quotes used as HTML attribute delimiters')
        for tag, url, line in page.links:
            target, fragment = local_target(name, url)
            if target is None:
                continue
            if not (ROOT / target).is_file():
                errors.append(f'{name}:{line}: missing target {url}')
            elif tag == 'a':
                if target != name:
                    inbound[target].add(name)
                if fragment and target in pages and fragment not in pages[target].ids:
                    errors.append(f'{name}:{line}: missing anchor {url}')
        for line, message in page.schema_errors:
            errors.append(f'{name}:{line}: invalid JSON-LD: {message}')
        for identifier, count in Counter(page.ids).items():
            if count > 1:
                errors.append(f'{name}: duplicate id {identifier}')
        if name not in PARTIALS | {'404.html'}:
            expected = 'https://ownershipguide.com' + page_url(name)
            if page.canonicals != [expected]:
                errors.append(f'{name}: expected one canonical URL: {expected}')
            if page.h1_count != 1:
                errors.append(f'{name}: expected one h1; found {page.h1_count}')
            if not page.title.strip() or not page.meta.get('description', '').strip():
                errors.append(f'{name}: missing title or description')
            titles[page.title.strip()].append(name)
        for attrs, script, line in page.scripts:
            if not attrs.get('src') and attrs.get('type', '') in ('', 'text/javascript', 'application/javascript', 'module'):
                scripts.append({'name': name, 'line': line, 'code': script})
    for names in titles.values():
        if len(names) > 1:
            errors.append('Duplicate title: ' + ', '.join(names))
    for name in pages:
        if name not in PARTIALS | {'404.html', 'index.html'} and not inbound[name]:
            errors.append(f'{name}: no static inbound links')

    featured = json.loads((ROOT / 'featured.json').read_text())
    expected_pages = {name for name, page in pages.items()
                      if '/' not in name and name != 'index.html' and page.meta.get('og:cluster') in CLUSTERS}
    actual_pages = []
    for cluster, entries in featured['cluster_pages'].items():
        for entry in entries:
            name = entry['url'].lstrip('/')
            actual_pages.append(name)
            if name in pages and pages[name].meta.get('og:cluster') != cluster:
                errors.append(f'featured.json: wrong cluster for {name}')
    for name in sorted(expected_pages - set(actual_pages)):
        errors.append(f'featured.json: missing eligible page {name}')
    if len(actual_pages) != len(set(actual_pages)):
        errors.append('featured.json: duplicate cluster entries')
    if set(actual_pages) - expected_pages:
        errors.append('featured.json: unexpected cluster entries')
    if not isinstance(featured.get('pinned'), dict):
        errors.append('featured.json: pinned must be a dictionary keyed by cluster')
    def check_json_links(value):
        if isinstance(value, dict):
            if isinstance(value.get('url'), str):
                target, _ = local_target('index.html', value['url'])
                if target is not None and not (ROOT / target).is_file():
                    errors.append('featured.json: missing target ' + value['url'])
            for child in value.values():
                check_json_links(child)
        elif isinstance(value, list):
            for child in value:
                check_json_links(child)
    check_json_links(featured)

    sitemap = ET.parse(ROOT / 'sitemap.xml').getroot()
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    actual_urls = [item.findtext('s:loc', namespaces=ns) for item in sitemap]
    expected_urls = {'https://ownershipguide.com' + page_url(name) for name in pages if name not in SITEMAP_SKIP}
    if set(actual_urls) != expected_urls or len(actual_urls) != len(set(actual_urls)):
        errors.append('sitemap.xml: URL inventory differs from publishable HTML pages')
    for item in sitemap:
        target, _ = local_target('index.html', item.findtext('s:loc', namespaces=ns))
        lastmod = item.findtext('s:lastmod', namespaces=ns)
        if target in pages and lastmod != pages[target].date():
            errors.append(f'sitemap.xml: lastmod differs from documented review date for {target}')

    scripts.append({'name': 'includes.js', 'line': 1, 'code': (ROOT / 'includes.js').read_text()})
    node = os.environ.get('NODE') or shutil.which('node')
    if not node:
        errors.append('Node.js is required to check JavaScript. Install Node or set NODE to its executable.')
    else:
        result = subprocess.run([node, str(ROOT / 'scripts/check-javascript.mjs')],
                                input=json.dumps(scripts), text=True, capture_output=True)
        if result.stdout.strip():
            print(result.stdout.strip())
        if result.returncode:
            errors.append(result.stderr.strip() or 'JavaScript check failed')
    print(f'Checked {len(pages)} HTML files, {len(scripts)} scripts, {len(actual_pages)} featured pages and {len(sitemap)} sitemap URLs.')
    if errors:
        for error in errors:
            print('ERROR: ' + error)
        print(f'FAIL: {len(errors)} errors')
        return 1
    print('PASS: links, anchors, metadata, JSON-LD, JavaScript, featured data and sitemap are consistent.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
