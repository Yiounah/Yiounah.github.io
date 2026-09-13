(function () {
  var HEADER_OFFSET = 82;

  function normalizePath(pathname) {
    var path = (pathname || "/").replace(/\/index\.html$/, "/");
    if (path !== "/" ) {
      path = path.replace(/\/$/, "");
    }
    return path;
  }

  function targetFromHash(hash) {
    if (!hash || hash === "#") return null;
    var id = decodeURIComponent(hash.replace(/^#/, ""));
    return document.getElementById(id) || document.getElementById("-" + id);
  }

  function scrollToTarget(target, updateHash) {
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    if (updateHash && target.id) {
      history.pushState(null, "", "#" + target.id);
    }
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href]");
    if (!link) return;

    var href = link.getAttribute("href");
    if (!href || href.indexOf("#") === -1) return;
    if (/^(https?:|mailto:|tel:)/i.test(href) && href.indexOf(location.origin) !== 0) return;

    var url;
    try {
      url = new URL(href, location.href);
    } catch (err) {
      return;
    }
    if (normalizePath(url.pathname) !== normalizePath(location.pathname)) return;

    var target = targetFromHash(url.hash);
    if (!target) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    scrollToTarget(target, true);
  }, true);

  window.addEventListener("load", function () {
    var target = targetFromHash(location.hash);
    if (target) {
      setTimeout(function () {
        scrollToTarget(target, false);
      }, 50);
    }
  });
})();
