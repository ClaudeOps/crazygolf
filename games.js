// The game list. To add a game: copy a page in games/, edit it, then add a line here.
// Order doesn't matter: the site sorts by date and opens the latest one by default.
window.GAMES = [
  { date: "2026-11-16", label: "Monday, Nov 16",    course: "Cross Creek", summary: "Stableford, 3 scores per hole",     path: "games/2026-11-16.html" },
  { date: "2026-11-18", label: "Wednesday, Nov 18", course: "Cross Creek", summary: "Score Forty: own ball front, shamble back", path: "games/2026-11-18.html" },
  { date: "2026-11-23", label: "Monday, Nov 23",    course: "Cross Creek", summary: "Own ball front, shamble back",      path: "games/2026-11-23.html" },
  { date: "2026-11-25", label: "Wednesday, Nov 25", course: "Cross Creek", summary: "Alternate shot, shamble, scramble", path: "games/2026-11-25.html" }
];
window.GAMES.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
