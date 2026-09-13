# Ownership Guide

Static HTML, CSS and JavaScript for ownershipguide.com. There is no npm install or application compilation step. GitHub main is the source for the existing Cloudflare Pages deployment.

## Preview locally

Serve the project root over HTTP so shared header, footer and featured-data requests work:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`. After editing, reload the page; if an older script remains cached, use a fresh preview port. Stop the server with Ctrl-C when finished.

## Check a change

Requires Python 3.9+ and Node.js 18+. No third-party packages are required.

Run from the project root:

```sh
python3 generate-featured.py
python3 generate-sitemap.py
python3 audit-site.py
node --test tests/*.test.mjs
python3 -m unittest discover -s tests -p 'test_*.py'
```

If Node is not on PATH, set `NODE` to its executable for `audit-site.py`, and use that same executable in place of `node` for the tests.

GitHub Actions runs the `site-checks` job on pull requests and pushes to main. Open a pull request, let this job pass, and merge only after source and browser review. The required-check setting for main must also be enabled in GitHub to enforce this before Cloudflare receives a production change; a workflow alone does not block deployment.

The generated-data check reruns both generators and rejects uncommitted differences. A no-op featured-data rebuild preserves its original generation date, so tomorrow’s unchanged checkout still passes.

The audit checks local links and anchors, missing assets, canonical URLs, headings and descriptions, duplicate IDs/titles, JSON-LD parsing, JavaScript syntax, static inbound links, featured-page coverage and sitemap dates. It exits with a nonzero status on failure. Regression tests execute the actual repaired calculator scripts and the shared financial models, exercise shared related-link/search behavior and test metadata generation.

Also preview changed interactions in a browser. Syntax checks alone do not catch undefined variables or incorrect arithmetic. Check calculator defaults, changed inputs, blanks, zero income, crossover points and mobile layout where relevant.

Passing these checks does not verify every external source, every calculator model or every factual claim in the article library. Substantive edits need their own source and arithmetic review.

## Editing rules

- Make small edits to `includes.js`; preserve its six SITE clusters, search scoring and service settings. Never regenerate it wholesale.
- Use real HTML attributes for metadata. Both `name`/`property` and either attribute order are supported by `site_metadata.py`.
- Update visible review dates and `dateModified` for substantive content/model changes. Link repairs and generator runs do not make an article newly reviewed.
- Preserve `page_registry.first_seen` and the cluster-keyed `pinned` dictionary in `featured.json`. Do not invent future dates to promote a page. Newly discovered older pages use their documented publication date when available.
- Do not pad articles to a word count. Explain the decision, inputs, assumptions and worked arithmetic as clearly as needed. Label examples and quotations accurately.
- Run both generators after changing content or metadata, then run the checks above. Undated pages omit sitemap `lastmod` rather than acquiring the build date.

## Release files

The website consists of the HTML pages and shared assets, including `header.html`, `footer.html`, `includes.js`, `styles.css`, `featured.json`, `sitemap.xml`, images, `robots.txt`, `ads.txt` and the intentional blank `.nojekyll` marker. Preserve existing files when applying a changed-files package; it is not a complete site backup.

Python tools, tests and this README are maintenance sources. Keep `_project-brief.md`, `_email-capture-setup.md`, local backups and `artifacts/` out of the public site/repository. The ignore rules prevent accidentally adding these local files; they do not remove files already tracked elsewhere.

Local checks do not deploy the site. After a separately authorized deployment, verify representative production pages, shared assets and calculator interactions again.

## Reviewed financial models (v0352)

The four reviewed tools load `scripts/finance-models.js` and `scripts/priority-calculators.js`. Keep model arithmetic in the first file and UI rendering in the second. `tests/finance-models.test.mjs` reads page defaults and verifies the published worked examples, assessment floors, LTV, fees, inflation and cashflow reconciliation. The audit discovers and syntax-checks local script assets linked by pages.

The ten core guides were substantively reviewed on 14 September 2026. Their references identify the relevant official rules. Other guides retain their earlier review dates and still require a separate factual review.
