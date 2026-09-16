"""Shared, attribute-order-independent HTML metadata for the static site tools."""

from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path
import json
import re

CLUSTERS = ('transport', 'property', 'family', 'protection', 'investing')


class SitePage(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.meta = {}
        self.canonicals = []
        self.links = []
        self.ids = []
        self.scripts = []
        self.schemas = []
        self.schema_errors = []
        self.title = ''
        self.text = []
        self.h1_count = 0
        self._title = False
        self._script = None
        self._style = False
        self.feed(source)
        self.close()
        for attrs, script, line in self.scripts:
            if attrs.get('type') == 'application/ld+json':
                try:
                    data = json.loads(script)
                    self.schemas.extend(data if isinstance(data, list) else [data])
                except (ValueError, TypeError) as error:
                    self.schema_errors.append((line, str(error)))

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if attrs.get('id'):
            self.ids.append(attrs['id'])
        if tag == 'meta':
            self.meta[attrs.get('name', attrs.get('property', ''))] = attrs.get('content', '')
        if tag == 'link' and 'canonical' in (attrs.get('rel') or '').split():
            self.canonicals.append(attrs.get('href', ''))
        attribute = 'href' if tag in ('a', 'link') else 'src'
        if tag in ('a', 'link', 'script', 'img', 'source') and attrs.get(attribute):
            self.links.append((tag, attrs[attribute], self.getpos()[0]))
        if tag == 'title':
            self._title = True
        if tag == 'h1':
            self.h1_count += 1
        if tag == 'script':
            self._script = [attrs, '', self.getpos()[0]]
            self.scripts.append(self._script)
        if tag == 'style':
            self._style = True

    def handle_endtag(self, tag):
        if tag == 'title':
            self._title = False
        if tag == 'script':
            self._script = None
        if tag == 'style':
            self._style = False

    def handle_data(self, data):
        if self._script is not None:
            self._script[1] += data
        elif not self._style:
            self.text.append(data)
        if self._title:
            self.title += data

    def date(self, field='dateModified'):
        # Visible review dates take precedence; never use the generator run date.
        if field == 'dateModified':
            matches = re.findall(r'Last\s+updated:\s*(\d{1,2}\s+\w+\s+\d{4})',
                                 ' '.join(self.text), flags=re.I)
            for value in reversed(matches):
                try:
                    return datetime.strptime(value, '%d %b %Y').date().isoformat()
                except ValueError:
                    continue
        for schema in self.schemas:
            value = schema.get(field) if isinstance(schema, dict) else None
            if value:
                try:
                    return datetime.fromisoformat(value.replace('Z', '+00:00')).date().isoformat()
                except ValueError:
                    continue
        return None


def read_page(path):
    return SitePage(Path(path).read_text(encoding='utf-8'))


def page_url(relative_path):
    path = str(relative_path).replace('\\', '/')
    if path == 'index.html':
        return '/'
    if path.endswith('/index.html'):
        return '/' + path[:-len('index.html')]
    if path.endswith('.html'):
        path = path[:-len('.html')]
    return '/' + path


def excerpt(text, limit):
    text = ' '.join(text.split())
    if len(text) <= limit:
        return text
    prefix = text[:limit - 1]
    return prefix.rsplit(' ', 1)[0].rstrip(' ,;:-') + '…'


def atomic_write(path, text):
    path = Path(path)
    if not text.strip():
        raise ValueError('Refusing to write an empty file: ' + str(path))
    temporary = path.with_suffix(path.suffix + '.tmp')
    temporary.write_text(text, encoding='utf-8')
    temporary.replace(path)
