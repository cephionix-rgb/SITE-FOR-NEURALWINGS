import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import seo from '../../seo-routes.json';

/**
 * Keeps the document head correct during client-side navigation.
 *
 * Each route is also prerendered to its own HTML file at build time
 * (scripts/prerender.mjs) — that is what a crawler reads on first request.
 * This hook covers the in-app navigations that never hit the server.
 */
export function useRouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const route =
      seo.routes.find((r) => r.path === pathname) ??
      seo.routes.find((r) => r.path === aliasTarget(pathname));

    if (!route) return;

    const url = route.path === '/' ? `${seo.origin}/` : `${seo.origin}${route.path}`;

    document.title = route.title;
    setMeta('name', 'description', route.description);
    setMeta('property', 'og:title', route.title);
    setMeta('property', 'og:description', route.description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', route.title);
    setMeta('name', 'twitter:description', route.description);
    setMeta('name', 'twitter:url', url);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [pathname]);
}

/** Alias paths share the canonical route's metadata. */
function aliasTarget(pathname: string): string {
  const aliases: Record<string, string> = {
    '/privacy-policy': '/privacy',
    '/terms-of-service': '/terms',
    '/ip': '/copyright',
    '/intellectual-property': '/copyright',
    '/careers': '/about',
  };
  return aliases[pathname] ?? pathname;
}

function setMeta(keyAttr: 'name' | 'property', key: string, value: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${keyAttr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(keyAttr, key);
    document.head.appendChild(tag);
  }
  tag.content = value;
}
