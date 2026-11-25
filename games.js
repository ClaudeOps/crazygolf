// The game list. To add a game: copy a page in games/, edit it, then add a line here.
// Order doesn't matter: the site sorts by date and opens the latest one by default.
window.GAMES = [
  { date: "2026-11-23", label: "Monday, Nov 23",    course: "Cross Creek", summary: "Own ball front, shamble back",      path: "games/2026-11-23.html" },
  { date: "2026-11-25", label: "Wednesday, Nov 25", course: "Cross Creek", summary: "Alternate shot, shamble, scramble", path: "games/2026-11-25.html" }
];
window.GAMES.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
