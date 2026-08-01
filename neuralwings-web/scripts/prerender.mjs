/**
 * Post-build step: give every route a real HTML file.
 *
 * GitHub Pages only serves dist/index.html at "/". Every other path fell
 * through to 404.html — so Googlebot received HTTP 404 for /aire, /about,
 * /privacy and the rest, and would not index them. Writing dist/<route>/index.html
 * makes each URL return 200 with its own title, description and canonical,
 * before any JavaScript runs.
 *
 * The sitemap is generated from the same source so the two cannot drift.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const { origin, routes } = JSON.parse(readFileSync(join(root, 'seo-routes.json'), 'utf8'));

const shell = readFileSync(join(dist, 'index.html'), 'utf8');
const today = new Date().toISOString().slice(0, 10);

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Canonical URLs carry a trailing slash: each route is a directory, and Pages
 * 301s /aire to /aire/. Advertising the pre-redirect form would point Google at
 * a URL that immediately bounces.
 */
const canonicalUrl = (path) => (path === '/' ? `${origin}/` : `${origin}${path}/`);

/** Replaces the content of a meta/link tag matched by `attr="value"`. */
function setTagContent(html, matchAttr, contentAttr, value) {
  const pattern = new RegExp(`(<(?:meta|link)[^>]*${matchAttr}[^>]*${contentAttr}=")[^"]*(")`, 'i');
  if (!pattern.test(html)) {
    console.warn(`  ! no tag matched ${matchAttr} — check index.html`);
    return html;
  }
  return html.replace(pattern, `$1${escapeHtml(value)}$2`);
}

/**
 * A plain-HTML version of the page for crawlers that do not run JavaScript.
 * It mirrors what the rendered page says; React replaces it on load.
 */
function noscriptBlock(route) {
  const links = routes
    .filter((r) => r.path !== route.path)
    .map((r) => `<li><a href="${r.path}">${escapeHtml(r.title.split('|')[0].trim())}</a></li>`)
    .join('');

  return (
    '<noscript>' +
    '<div style="max-width:720px;margin:0 auto;padding:32px 24px;font-family:Arial,Helvetica,sans-serif;color:#18181b">' +
    `<h1>${escapeHtml(route.h1)}</h1>` +
    `<p>${escapeHtml(route.summary)}</p>` +
    '<p>This site needs JavaScript for the interactive dashboards. ' +
    `Contact us at <a href="mailto:hello@neuralwings.org">hello@neuralwings.org</a>.</p>` +
    `<nav><ul>${links}</ul></nav>` +
    '</div>' +
    '</noscript>'
  );
}

let written = 0;

for (const route of routes) {
  const url = canonicalUrl(route.path);

  let html = shell;
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  html = setTagContent(html, 'name="description"', 'content', route.description);
  html = setTagContent(html, 'rel="canonical"', 'href', url);
  html = setTagContent(html, 'property="og:url"', 'content', url);
  html = setTagContent(html, 'property="og:title"', 'content', route.title);
  html = setTagContent(html, 'property="og:description"', 'content', route.description);
  html = setTagContent(html, 'name="twitter:url"', 'content', url);
  html = setTagContent(html, 'name="twitter:title"', 'content', route.title);
  html = setTagContent(html, 'name="twitter:description"', 'content', route.description);
  html = html.replace('</body>', `${noscriptBlock(route)}</body>`);

  const outDir = route.path === '/' ? dist : join(dist, route.path);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);

  console.log(`  ✓ ${route.path === '/' ? '/' : route.path + '/'}index.html — ${route.title}`);
  written += 1;
}

// Sitemap, from the same source of truth.
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes
    .map((route) => {
      const url = canonicalUrl(route.path);
      return (
        '\n  <url>\n' +
        `    <loc>${url}</loc>\n` +
        `    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>${route.changefreq}</changefreq>\n` +
        `    <priority>${route.priority}</priority>\n` +
        '  </url>\n'
      );
    })
    .join('') +
  '\n</urlset>\n';

writeFileSync(join(dist, 'sitemap.xml'), sitemap);

console.log(`\nPrerendered ${written} routes and rewrote sitemap.xml (lastmod ${today}).`);
