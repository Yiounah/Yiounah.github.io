(function () {
  function unbindSmoothScroll() {
    if (!window.jQuery) return;
    try {
      window.jQuery("a").off("click.smoothscroll");
      window.jQuery.fn.smoothScroll = function () { return this; };
    } catch (err) {}
  }

  function jump(hash) {
    var id = String(hash || "").replace(/^#/, "");
    if (!id) return false;
    var target = document.getElementById(id);
    if (!target) return false;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", "#" + id);
    return true;
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("#site-nav a[href^='#']");
    if (!link) return;
    if (jump(link.getAttribute("href"))) {
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    }
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", unbindSmoothScroll);
  } else {
    unbindSmoothScroll();
  }
  window.addEventListener("load", function () {
    unbindSmoothScroll();
    if (location.hash) jump(location.hash);
  });
})();
