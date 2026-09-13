(function () {
  var HEADER_OFFSET = 88;

  function findTarget(hash) {
    if (!hash || hash === "#") return null;
    var id = decodeURIComponent(String(hash).replace(/^#/, ""));
    return document.getElementById(id) ||
      document.getElementById("-" + id) ||
      document.querySelector('[id="' + id + '"]');
  }

  function scrollToTarget(target) {
    var top = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  function handleNavClick(event) {
    var link = event.target.closest("a[href]");
    if (!link || !link.closest("#site-nav")) return;

    var href = link.getAttribute("href") || "";
    var hash = href.indexOf("#") >= 0 ? href.slice(href.indexOf("#")) : "";
    var target = findTarget(hash);
    if (!target) return;

    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    scrollToTarget(target);
    if (history.replaceState) {
      history.replaceState(null, "", hash);
    }
  }

  document.addEventListener("click", handleNavClick, true);

  function disableSmoothScrollOnNav() {
    if (!window.jQuery) return;
    window.jQuery("#site-nav a").off("click.smoothscroll click");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", disableSmoothScrollOnNav);
  } else {
    disableSmoothScrollOnNav();
  }
  window.addEventListener("load", disableSmoothScrollOnNav);

  window.addEventListener("load", function () {
    var target = findTarget(location.hash);
    if (target) {
      setTimeout(function () { scrollToTarget(target); }, 80);
    }
  });
})();
