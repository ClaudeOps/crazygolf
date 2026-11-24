# It's Not Rocket Science (It's Harder)

A static website for a loose group of golfers who play together weekly. This is **not** the NNGL league. Each round has its own complicated rules sheet from the organizer. This site turns each sheet into a mobile-friendly page that players open on their phones at the course. Hosted on Vercel.

## Course knowledge

**Cross Creek** is an executive course, par 60.

| Hole | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | Out |
|---|---|---|---|---|---|---|---|---|---|---|
| Par | 3 | 3 | 3 | 3 | 3 | 3 | 4 | 3 | 4 | 29 |
| Hcp | 12 | 16 | 2 | 10 | 4 | 14 | 8 | 18 | 6 | |

| Hole | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | In |
|---|---|---|---|---|---|---|---|---|---|---|
| Par | 4 | 3 | 3 | 3 | 3 | 3 | 4 | 4 | 4 | 31 |
| Hcp | 7 | 11 | 17 | 5 | 9 | 3 | 13 | 15 | 1 | |

- Hole handicaps: 1 is the hardest. Hardest first: 18, 3, 15, 5, 13, 9, 10, 7, 14, 4, 11, 1, 16, 6, 17, 2, 12, 8.
- Par 4s: holes 7, 9, 10, 16, 17 and 18. Every other hole is a par 3.
- **Tee boxes are numbered 1 (longest) to 4 (shortest).** A lower number is a longer tee. "Moving back" means a lower number, and "moving up/forward" means a higher number.
- **Moving-tee games (fall back / fall forward):**
  - Par or better: move back one tee (lower number). Bogey or worse, including double bogey: move up one tee.
  - The whole foursome moves together, based on the best score of the two pairs.
  - The 1s and 4s are hard limits. A bogey from the 4s keeps you on the 4s, and a par from the 1s keeps you on the 1s. This is background for Claude only. The user doesn't want it stated on the site.
- The usual pattern: closest-to-the-pin holes are par 3s, and second-shot-closest holes are par 4s. Use it to sanity-check a new rules sheet.
- These facts live in `courses.js` (`window.COURSES["Cross Creek"]`: `par`, `hcp`, `tees`). Game pages read them from there and don't hard-code them.

## Structure

```
index.html      Redirects to the game with the latest date (from games.js). Has a hand-written fallback link list for no-JS.
games.js        window.GAMES = [{ date, label, course, summary, path }]. Sorted newest-first on load.
courses.js      window.COURSES: pars and tee numbering per course.
site.js         Injects the sticky site bar + hamburger "Game archive" menu into every game page.
style.css       Shared styles for all pages.
games/          One self-contained page per game, named YYYY-MM-DD.html.
```

- No framework, no build step, no dependencies. Keep it that way unless asked.
- Plain HTML/CSS and small vanilla JS (ES5-style `var`/`function`, so it runs everywhere).
- Fonts: Inter (body) and Space Grotesk (headings) from Google Fonts.
- `site.js` resolves links from its own URL (`document.currentScript.src`). That makes the site work both from `file://` and on Vercel.
- Game pages load `../courses.js`, then `../games.js`, then `../site.js`, then their own inline script, all at the end of `<body>`.

## Adding a new game

1. Copy the existing page whose format is closest:
   - `games/2026-11-23.html`: fixed tees by hole, with both age groups side by side, Stableford, own ball front / shamble back.
   - `games/2026-11-25.html`: rotating formats (alternate shot, shamble, scramble), partner rotation, moving tees.
2. Name it `games/YYYY-MM-DD.html` and update the `<title>`, the hero (eyebrow date, course, subtitle) and the sections.
3. Add an entry to `games.js`.
4. Add a link to the fallback `<ul>` in `index.html`.
5. For a new course, add it to `courses.js` first.
6. Deploy: `npx vercel --prod` from this folder.

## Scoring conventions

- Lowest team score wins, unless a sheet says otherwise (Monday Nov 23 was Stableford, where the highest score wins).
- Ties: compare the best score on the hardest hole (handicap 1), then the next hardest, and so on.
- Wednesday Nov 25: the team score is the best 2 (alternate shot), best 3 (shamble) and best 2 (scramble) scores per hole.

## Content rules (important)

- **No player names and no tee times** on the site.
- **Show both age groups side by side** (74 and younger / 75 and older). No toggle or switch.
- **Stick to the organizer's wording.** Don't present interpretations as rules. If something on the sheet is ambiguous, list it as a question for the user, and keep it off the page until they answer.
- **Pairs and teams:** in 2-person formats, the two pairs in a foursome are *not* opponents. All four players build one team score. Never use "vs." Write "A + B and C + D".
- **Prize money:** show the amounts as the sheet states them.
- **Pin-game tags:** orange `CTP` (`.tag.ctp`) for team closest to the pin, blue `2ND` (`.tag.nd`) for second shot closest.
- **Tee colors:** dark green `.tee.long` for the *longer* of a group's two tees (the lower number), pale `.tee.short` for the shorter one.
- **Format colors:** `.fpill.alt` / `.fpill.sham` / `.fpill.scr`, with `.fmt` cards using `--c`.
- Show the par next to each hole in hole tables (`td.par`).

## Design

- Mobile-first, max content width 760px.
- Accessible: real `<button>`s, `aria-expanded` on the menu, visible focus, text contrast of at least 4.5:1, touch targets of at least 44px.
- Green palette set in `:root` in `style.css`. Reuse the existing classes before adding new ones.

## Open questions (Wed Nov 25 game, not yet answered by the organizer)

- The 22-inch rule is shown as written ("putt in or within 22 inches"). The likely meaning is a gimme: pick up and add one stroke. It's not confirmed.

## Related

- There is also a printable landscape quarter-fold card (letter size, 5.5 × 4.25 in panels) for the Nov 23 game, made as a Claude design artifact, not part of this repo. It colors the 3s as the darker tee, which reads as "longer" even though the 2s are longer. Treat it as a one-off.
