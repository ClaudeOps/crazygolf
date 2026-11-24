// Course facts shared by the game pages.
// Tee boxes are numbered 1 (longest) to 4 (shortest).
window.COURSES = {
  "Cross Creek": {
    type: "Executive",
    par: [3,3,3,3,3,3,4,3,4,  4,3,3,3,3,3,4,4,4], // holes 1–18; front 29, back 31, total 60
    // Hole handicaps, holes 1–18 (1 = hardest). Hardest-first order: 18, 3, 15, 5, 13, 9, 10, 7, 14, 4, 11, 1, 16, 6, 17, 2, 12, 8
    hcp: [12,16,2,10,4,14,8,18,6,  7,11,17,5,9,3,13,15,1],
    tees: { longest: 1, shortest: 4 }
  }
};
