#!/usr/bin/env python3
"""
generate-sitemap.py — Ownership Guide
Run from repo root: python3 generate-sitemap.py
Regenerates sitemap.xml from all .html files in the repo.
Claude runs this each session before packaging the output zip.
"""

import os
from site_metadata import atomic_write, page_url, read_page

BASE_URL = 'https://ownershipguide.com'
REPO_ROOT = os.path.dirname(os.path.abspath(__file__))
OUTPUT = os.path.join(REPO_ROOT, 'sitemap.xml')

# Files never in sitemap
EXCLUDE = {
    '404.html', 'footer.html', 'header.html',
    'about.html', 'contact.html',
}

# Directories never in sitemap
EXCLUDE_DIRS = {'node_modules', '.git', 'artifacts', 'tests'}

def get_priority(path):
    fn = os.path.basename(path)
    if fn == 'index.html': return '0.9'
    if 'calculator' in fn: return '0.8'
    if fn in ('car-ownership-cost.html', 'property-ownership-cost-singapore.html',
              'car-vs-ride-hailing-cost.html', 'rent-vs-buy-property-singapore.html',
              'how-much-does-it-cost-to-raise-a-child-singapore.html',
              'how-much-life-insurance-do-you-need-singapore.html',
              'how-much-emergency-fund-do-you-need-singapore.html'):
        return '0.9'
    return '0.7'

def get_changefreq(path):
    fn = os.path.basename(path)
    if fn == 'index.html': return 'weekly'
    if 'calculator' in fn: return 'monthly'
    return 'monthly'

def get_lastmod(filepath):
    return read_page(filepath).date()

urls = []
for dirpath, dirnames, filenames in os.walk(REPO_ROOT):
    # Skip excluded dirs
    dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS and not d.startswith('.')]
    
    for fn in sorted(filenames):
        if not fn.endswith('.html'): continue
        if fn in EXCLUDE: continue
        if fn.startswith('_'): continue
        
        filepath = os.path.join(dirpath, fn)
        rel = os.path.relpath(filepath, REPO_ROOT).replace('\\', '/')
        
        url = BASE_URL + page_url(rel)
        
        urls.append({
            'url': url,
            'lastmod': get_lastmod(filepath),
            'changefreq': get_changefreq(rel),
            'priority': get_priority(rel),
        })

# Sort: index first, then hubs, then content
def sort_key(u):
    url = u['url']
    if url == BASE_URL + '/': return (0, url)
    if url.endswith('/'): return (1, url)
    return (2, url)

urls.sort(key=sort_key)

# Write sitemap
lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for u in urls:
    lines.append('  <url>')
    lines.append(f'    <loc>{u["url"]}</loc>')
    if u['lastmod']:
        lines.append(f'    <lastmod>{u["lastmod"]}</lastmod>')
    lines.append(f'    <changefreq>{u["changefreq"]}</changefreq>')
    lines.append(f'    <priority>{u["priority"]}</priority>')
    lines.append('  </url>')
lines.append('</urlset>')

atomic_write(OUTPUT, '\n'.join(lines) + '\n')

print(f'sitemap.xml written: {len(urls)} URLs')
