#!/usr/bin/env python3
"""
generate-sitemap.py — Ownership Guide
Run from repo root: python3 generate-sitemap.py
Regenerates sitemap.xml from all .html files in the repo.
Claude runs this each session before packaging the output zip.
"""

import os, re
from datetime import datetime

BASE_URL = 'https://ownershipguide.com'
REPO_ROOT = os.path.dirname(os.path.abspath(__file__))
OUTPUT = os.path.join(REPO_ROOT, 'sitemap.xml')

# Files never in sitemap
EXCLUDE = {
    '404.html', 'footer.html', 'header.html',
    'about.html', 'contact.html',
}

# Directories never in sitemap
EXCLUDE_DIRS = {'node_modules', '.git'}

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
    try:
        content = open(filepath).read()
        m = re.search(r'<strong>Last updated:</strong>\s*(\d{1,2}\s+\w+\s+\d{4})', content)
        if m:
            d = datetime.strptime(m.group(1).strip(), '%d %b %Y')
            return d.strftime('%Y-%m-%d')
    except:
        pass
    return datetime.now().strftime('%Y-%m-%d')

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
        
        # Build URL
        if rel == 'index.html':
            url = BASE_URL + '/'
        elif rel.endswith('/index.html'):
            url = BASE_URL + '/' + rel[:-len('index.html')]
        else:
            url = BASE_URL + '/' + rel
        
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
    if url.endswith('/index.html'): return (1, url)
    return (2, url)

urls.sort(key=sort_key)

# Write sitemap
lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for u in urls:
    lines.append('  <url>')
    lines.append(f'    <loc>{u["url"]}</loc>')
    lines.append(f'    <lastmod>{u["lastmod"]}</lastmod>')
    lines.append(f'    <changefreq>{u["changefreq"]}</changefreq>')
    lines.append(f'    <priority>{u["priority"]}</priority>')
    lines.append('  </url>')
lines.append('</urlset>')

with open(OUTPUT, 'w') as f:
    f.write('\n'.join(lines) + '\n')

print(f'sitemap.xml written: {len(urls)} URLs')
