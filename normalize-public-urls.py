#!/usr/bin/env python3
"""Normalize same-site public URLs to Cloudflare's extensionless form.

Runs as a dry-run unless --write is supplied. All transformed files are staged
and validated before any source file is replaced.
"""

from argparse import ArgumentParser
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.parse import urlsplit, urlunsplit
import os
import re

from site_metadata import SitePage, atomic_write, page_url


ROOT = Path(__file__).resolve().parent
EXCLUDED_DIRS = {'.git', 'artifacts', 'node_modules', 'tests'}
PARTIALS = {'header.html', 'footer.html'}
SAME_SITE = {'ownershipguide.com', 'www.ownershipguide.com'}
ATTRIBUTE_URL = re.compile(r'(?P<prefix>\bhref\s*=\s*)(?P<quote>["\'])(?P<url>.*?)(?P=quote)', re.I)
ABSOLUTE_URL = re.compile(
    r'(?P<url>https?://(?:www\.)?ownershipguide\.com/[A-Za-z0-9_./~-]+)\.html\b', re.I)
ROOT_STRING_URL = re.compile(
    r'(?P<quote>["\'])(?P<path>/[A-Za-z0-9_./~-]+)\.html(?P<tail>[?#][^"\']*)?(?P=quote)')
OG_URL_TAG = re.compile(r'<meta\b(?=[^>]*\bproperty=["\']og:url["\'])[^>]*>', re.I)
CONTENT_ATTRIBUTE = re.compile(r'(?P<prefix>\bcontent\s*=\s*)(?P<quote>["\']).*?(?P=quote)', re.I)


def extensionless(url):
    parsed = urlsplit(url)
    if parsed.scheme and parsed.netloc not in SAME_SITE:
        return url
    if parsed.path.endswith('.html'):
        parsed = parsed._replace(path=parsed.path[:-len('.html')])
        return urlunsplit(parsed)
    return url


def normalize(text, relative_path=None):
    def normalize_href(match):
        url = extensionless(match.group('url'))
        return match.group('prefix') + match.group('quote') + url + match.group('quote')

    text = ATTRIBUTE_URL.sub(normalize_href, text)
    text = ABSOLUTE_URL.sub(lambda match: match.group('url'), text)
    text = ROOT_STRING_URL.sub(
        lambda match: (match.group('quote') + match.group('path') +
                       (match.group('tail') or '') + match.group('quote')),
        text,
    )
    if relative_path is not None:
        expected = 'https://ownershipguide.com' + page_url(relative_path)
        text = OG_URL_TAG.sub(
            lambda tag: CONTENT_ATTRIBUTE.sub(
                lambda attr: (attr.group('prefix') + attr.group('quote') + expected +
                              attr.group('quote')),
                tag.group(0),
            ),
            text,
        )
    return text


def sources():
    html = [path for path in ROOT.rglob('*.html')
            if not any(part.startswith('.') or part in EXCLUDED_DIRS
                       for part in path.relative_to(ROOT).parts)]
    include = ROOT / 'includes.js'
    return sorted(html) + ([include] if include.exists() else [])


def validate(path, text):
    if not text.strip():
        raise ValueError(f'{path}: transformation produced an empty file')
    if path.suffix == '.html':
        relative = path.relative_to(ROOT)
        if path.name not in PARTIALS:
            if len(text) < 100 or not re.search(r'<html\b', text, re.I):
                raise ValueError(f'{relative}: transformed document is incomplete')
        page = SitePage(text)
        if page.schema_errors:
            raise ValueError(f'{relative}: transformed JSON-LD is invalid: {page.schema_errors[0][1]}')


def main():
    parser = ArgumentParser()
    parser.add_argument('--write', action='store_true', help='replace files after staging and validation')
    args = parser.parse_args()

    changed = {}
    replacements = 0
    for path in sources():
        before = path.read_text(encoding='utf-8')
        relative = path.relative_to(ROOT)
        after = normalize(before, relative if path.suffix == '.html' else None)
        if after != before:
            validate(path, after)
            changed[path] = after
            replacements += before.count('.html') - after.count('.html')

    mode = 'WRITE' if args.write else 'DRY RUN'
    print(f'{mode}: {len(changed)} files would change; {replacements} .html references removed')
    for path in list(changed)[:12]:
        print('  ' + str(path.relative_to(ROOT)))

    if not args.write or not changed:
        return

    with TemporaryDirectory(prefix='.url-normalize-', dir=ROOT) as directory:
        stage = Path(directory)
        for path, text in changed.items():
            staged_path = stage / path.relative_to(ROOT)
            staged_path.parent.mkdir(parents=True, exist_ok=True)
            staged_path.write_text(text, encoding='utf-8')
            validate(path, staged_path.read_text(encoding='utf-8'))
        for path, text in changed.items():
            atomic_write(path, text)
    print(f'Updated {len(changed)} files atomically after staged validation.')


if __name__ == '__main__':
    main()
