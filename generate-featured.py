#!/usr/bin/env python3
"""
generate-featured.py — Ownership Guide
Run from repo root: python3 generate-featured.py
Regenerates featured.json from actual page Last updated dates.
Claude runs this each session before packaging the output zip.
"""

import os, re, json
from datetime import datetime

REPO_ROOT = os.path.dirname(os.path.abspath(__file__))
OUTPUT = os.path.join(REPO_ROOT, 'featured.json')

CLUSTERS = ['transport', 'property', 'family', 'protection', 'investing']
CLUSTER_LABEL = {
    'transport': 'Transport', 'property': 'Property',
    'family': 'Family', 'protection': 'Protection', 'investing': 'Investing'
}
SKIP = {'404.html','about.html','contact.html','terms.html','privacy-policy.html',
        'editorial-policy.html','advertising-disclosure.html','corrections.html',
        'footer.html','header.html','index.html'}

# Manually curated popular pages — update rarely, only if cluster balance shifts
POPULAR = [
    {'url': '/how-much-does-it-cost-to-raise-a-child-singapore.html', 
     'title': 'Full Cost of Raising a Child in Singapore', 'cluster': 'family', 'clusterLabel': 'Family'},
    {'url': '/car-ownership-cost.html', 
     'title': '5-Year Car Ownership Cost', 'cluster': 'transport', 'clusterLabel': 'Transport'},
    {'url': '/property-ownership-cost-singapore.html', 
     'title': 'Property Ownership Cost', 'cluster': 'property', 'clusterLabel': 'Property'},
    {'url': '/how-much-life-insurance-do-you-need-singapore.html', 
     'title': 'How Much Life Insurance Do You Need?', 'cluster': 'protection', 'clusterLabel': 'Protection'},
    {'url': '/how-much-emergency-fund-do-you-need-singapore.html', 
     'title': 'How Much Emergency Fund Do You Need?', 'cluster': 'investing', 'clusterLabel': 'Investing'},
    {'url': '/rent-vs-buy-property-singapore.html', 
     'title': 'Rent vs Buy Property', 'cluster': 'property', 'clusterLabel': 'Property'},
]

def get_page_data(filepath):
    try:
        content = open(filepath, encoding='utf-8').read()
    except:
        return None
    cluster_m = re.search(r'og:cluster[^>]+content="([^"]+)"', content)
    title_m = re.search(r'<title>([^<]+)</title>', content)
    date_m = re.search(r'<strong>Last updated:</strong>\s*(\d{1,2}\s+\w+\s+\d{4})', content)
    desc_m = re.search(r'<meta[^>]+name="description"[^>]+content="([^"]+)"', content)
    if not cluster_m or not title_m:
        return None
    cluster = cluster_m.group(1).strip()
    if cluster not in CLUSTERS:
        return None
    title = title_m.group(1).split('|')[0].strip()
    short_title = title.split(':')[0].strip() if ':' in title else title[:65]
    desc = desc_m.group(1)[:100] if desc_m else ''
    date_str = date_m.group(1).strip() if date_m else '1 Mar 2026'
    try:
        d = datetime.strptime(date_str, '%d %b %Y')
        date_iso = d.strftime('%Y-%m-%d')
    except:
        date_iso = '2026-03-01'
    fn = os.path.basename(filepath)
    return {'url': f'/{fn}', 'title': short_title, 'desc': desc,
            'cluster': cluster, 'date': date_iso}

# Collect all pages
pages = []
for fn in sorted(os.listdir(REPO_ROOT)):
    if not fn.endswith('.html') or fn in SKIP:
        continue
    if 'calculator' in fn:
        continue
    data = get_page_data(os.path.join(REPO_ROOT, fn))
    if data:
        pages.append(data)

# Build cluster_pages (sorted newest first)
cluster_pages = {}
for cluster in CLUSTERS:
    cp = sorted([p for p in pages if p['cluster'] == cluster],
                key=lambda x: x['date'], reverse=True)
    cluster_pages[cluster] = [
        {'url': p['url'], 'title': p['title'], 'desc': p['desc'], 'date': p['date']}
        for p in cp
    ]

# Build new[] using page_registry (first_seen dates) to avoid date-bump pollution
# Load existing registry — tracks when each page was first added to the site
existing_registry = {}
if os.path.exists(OUTPUT):
    try:
        existing_data = json.load(open(OUTPUT))
        existing_registry = existing_data.get('page_registry', {})
    except: pass

# Update registry: add new pages with today as first_seen date
today_iso = datetime.now().strftime('%Y-%m-%d')
page_fns = [p['url'].lstrip('/') for p in pages]
for fn in page_fns:
    if fn not in existing_registry:
        existing_registry[fn] = {'first_seen': today_iso}

# Sort by first_seen (not last_updated) — preserves genuine newness across sessions
pages_with_first_seen = []
for p in pages:
    fn = p['url'].lstrip('/')
    first_seen = existing_registry.get(fn, {}).get('first_seen', '2026-01-01')
    pages_with_first_seen.append({**p, 'first_seen': first_seen})

registry_sorted = sorted(pages_with_first_seen, key=lambda x: x['first_seen'], reverse=True)
# Apply diversity cap: max 4 per cluster in new[]
diverse_new = []
cluster_counts_new = {}
for p in registry_sorted:
    cl = p['cluster']
    if cluster_counts_new.get(cl, 0) >= 4:
        continue
    cluster_counts_new[cl] = cluster_counts_new.get(cl, 0) + 1
    diverse_new.append(p)
    if len(diverse_new) >= 10:
        break

new_list = [
    {'url': p['url'], 'title': p['title'], 'desc': p['desc'],
     'cluster': p['cluster'], 'clusterLabel': CLUSTER_LABEL[p['cluster']]}
    for p in diverse_new
]

# Preserve pinned if it exists in current featured.json
# pinned must be a dict keyed by cluster - guard against ChatGPT corrupting it to a list
PINNED_DEFAULT = {
    'transport': [
        {'url': '/car-ownership-cost.html', 'title': 'Cost of Owning a Car in Singapore',
         'desc': 'The 5-year cost model: depreciation, COE, insurance, running costs, and financing.'},
        {'url': '/car-vs-ride-hailing-cost.html', 'title': 'Car vs Ride-Hailing in Singapore',
         'desc': 'When ownership beats ride-hailing and when it does not.'},
        {'url': '/motorcycle-ownership-cost-singapore.html', 'title': 'Motorcycle Ownership Cost in Singapore',
         'desc': 'Full cost model for motorcycle ownership including COE, insurance, and maintenance.'},
    ],
    'property': [
        {'url': '/property-ownership-cost-singapore.html', 'title': 'Property Ownership Cost in Singapore',
         'desc': 'The 5-year total exposure model: loan, duties, maintenance, and exit friction.'},
        {'url': '/rent-vs-buy-property-singapore.html', 'title': 'Rent vs Buy Property in Singapore',
         'desc': 'Framework for deciding when ownership beats renting.'},
    ],
    'family': [
        {'url': '/how-much-does-it-cost-to-raise-a-child-singapore.html',
         'title': 'How Much Does It Cost to Raise a Child in Singapore?',
         'desc': 'Long-horizon planning framework from birth through university.'},
        {'url': '/cost-of-having-a-baby-singapore.html', 'title': 'Cost of Having a Baby in Singapore',
         'desc': 'Pregnancy, delivery, and first-year cost framework.'},
        {'url': '/how-supporting-aging-parents-changes-your-cash-buffer-plan-singapore.html',
         'title': 'How Supporting Aging Parents Changes Your Cash Buffer Plan',
         'desc': 'Reserve design when eldercare obligations change household fragility.'},
    ],
    'protection': [
        {'url': '/how-much-life-insurance-do-you-need-singapore.html',
         'title': 'How Much Life Insurance Do You Need?',
         'desc': 'A protection-gap framework for real household obligations.'},
        {'url': '/how-much-critical-illness-insurance-do-you-need-singapore.html',
         'title': 'How Much Critical Illness Cover Do You Need?',
         'desc': 'Sizing CI insurance based on your household obligations.'},
    ],
    'investing': [
        {'url': '/how-much-emergency-fund-do-you-need-singapore.html',
         'title': 'How Much Emergency Fund Do You Need?',
         'desc': 'A liquidity buffer framework for real household fragility.'},
        {'url': '/when-to-invest-vs-build-your-emergency-fund-first-singapore.html',
         'title': 'When to Invest vs Build Your Emergency Fund First',
         'desc': 'The sequencing decision between investing and liquidity.'},
    ],
}
existing_pinned = PINNED_DEFAULT
if os.path.exists(OUTPUT):
    try:
        existing = json.load(open(OUTPUT))
        loaded_pinned = existing.get('pinned', {})
        # Validate: pinned must be a dict, not a list
        if isinstance(loaded_pinned, dict) and loaded_pinned:
            existing_pinned = loaded_pinned
        # If it's a list (corrupted), fall back to default
    except: pass

output = {
    'generated': datetime.now().strftime('%Y-%m-%d'),
    'cluster_pages': cluster_pages,
    'new': new_list,
    'popular': POPULAR,
    'pinned': existing_pinned,
    'page_registry': existing_registry,
}

with open(OUTPUT, 'w') as f:
    json.dump(output, f, indent=2)

total = sum(len(v) for v in cluster_pages.values())
print(f'featured.json written: {total} pages across {len(CLUSTERS)} clusters')
for cl in CLUSTERS:
    cp = cluster_pages[cl]
    newest = cp[0]['date'] if cp else 'none'
    print(f'  {cl}: {len(cp)} pages, newest: {newest}')
