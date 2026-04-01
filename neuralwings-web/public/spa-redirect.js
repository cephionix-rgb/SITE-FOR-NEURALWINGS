(function() {
  var p = window.location.search && decodeURIComponent(window.location.search.slice(3));
  if (p && p.startsWith('/')) {
    window.history.replaceState(null, null, p + window.location.hash);
  }
})();
