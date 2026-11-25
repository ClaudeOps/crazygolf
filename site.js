// Builds the site bar and the hamburger archive menu on every game page.
(function () {
  var root = new URL(".", document.currentScript.src); // site root, wherever the page lives
  var here = location.pathname.replace(/\.html$/, "");
  // If games.js failed to load, still show the site bar (title links home), just without the archive menu.
  var games = window.GAMES || [];
  var hasMenu = games.length > 0;

  var items = games.map(function (g, i) {
    var href = new URL(g.path, root).href;
    var isHere = new URL(href).pathname.replace(/\.html$/, "") === here;
    return '<li><a href="' + href + '"' + (isHere ? ' aria-current="page"' : "") + '>' +
      '<span><span class="g-date">' + g.label + '</span><span class="g-sub">' + g.course + ' · ' + g.summary + '</span></span>' +
      (i === 0 ? '<span class="badge">Latest</span>' : "") + '</a></li>';
  }).join("");

  var bar = document.createElement("header");
  bar.className = "site-bar";
  bar.innerHTML =
    '<div class="inner">' +
      '<a class="site-title" href="' + root.href + '">It’s Not Rocket Science <span>(It’s Harder)</span></a>' +
      (hasMenu ?
      '<button class="menu-btn" type="button" aria-label="Game archive" aria-expanded="false" aria-controls="archive">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
      '</button>' : "") +
    '</div>' +
    (hasMenu ?
    '<nav class="menu-panel" id="archive" aria-label="Game archive" hidden>' +
      '<div class="inner"><h2>Game archive</h2><ul>' + items + '</ul></div>' +
    '</nav>' : "");
  document.body.insertBefore(bar, document.body.firstChild);
  if (!hasMenu) return;

  var btn = bar.querySelector(".menu-btn"), panel = bar.querySelector(".menu-panel");
  function setOpen(open) { panel.hidden = !open; btn.setAttribute("aria-expanded", open ? "true" : "false"); }
  btn.addEventListener("click", function () { setOpen(panel.hidden); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { setOpen(false); btn.focus(); } });
  document.addEventListener("click", function (e) { if (!bar.contains(e.target)) setOpen(false); });
})();
