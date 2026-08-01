// Google Analytics 4, loaded once the page is idle.
//
// gtag.js is ~164 KB and mostly unused at first paint. Requesting it up front
// made it compete for bandwidth with the CSS, fonts and video the intro needs.
// Deferring it costs nothing in measurement — the page_view still fires — and
// takes the weight off the critical path.

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-KQYZYE96XT', {
  anonymize_ip: true,
  cookie_flags: 'SameSite=Strict;Secure',
});

function loadGtag() {
  if (document.getElementById('ga4-script')) return;
  var s = document.createElement('script');
  s.id = 'ga4-script';
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-KQYZYE96XT';
  document.head.appendChild(s);
}

// Idle if the browser supports it, otherwise shortly after load. The timeout
// guarantees it still runs on a page that never goes idle.
function scheduleGtag() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadGtag, { timeout: 4000 });
  } else {
    setTimeout(loadGtag, 2000);
  }
}

if (document.readyState === 'complete') {
  scheduleGtag();
} else {
  window.addEventListener('load', scheduleGtag);
}
