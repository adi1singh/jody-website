// Topographic contour lines for Backdrop kind="topo", generated when the
// site builds and served as /textures/topo.svg. Used as a CSS
// mask, so any colour can be poured through it. Change SEED for a new
// landscape. Marching squares over a smooth height field of a few hills.
import type { APIRoute } from "astro";

const W = 1200;
const H = 800;
const COLS = 96;
const ROWS = 64;
const LEVELS = 16;
const SEED = 7;

function rand(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
const r = rand(SEED);
const hills = Array.from({ length: 6 }, () => ({ x: r() * W, y: r() * H, h: 0.6 + r() * 0.8, s: 140 + r() * 260 }));
const height = (x: number, y: number) =>
  hills.reduce((sum, k) => sum + k.h * Math.exp(-((x - k.x) ** 2 + (y - k.y) ** 2) / (2 * k.s * k.s)), 0) +
  0.08 * Math.sin(x / 90 + y / 140) +
  0.06 * Math.cos(y / 70 - x / 210);

export const GET: APIRoute = () => {
  const dx = W / COLS;
  const dy = H / ROWS;
  const grid: number[][] = [];
  let min = Infinity;
  let max = -Infinity;
  for (let j = 0; j <= ROWS; j++) {
    grid[j] = [];
    for (let i = 0; i <= COLS; i++) {
      const v = height(i * dx, j * dy);
      grid[j][i] = v;
      min = Math.min(min, v);
      max = Math.max(max, v);
    }
  }
  const paths: string[] = [];
  const f = (n: number) => n.toFixed(1);
  for (let l = 1; l <= LEVELS; l++) {
    const t = min + ((max - min) * l) / (LEVELS + 1);
    let d = "";
    for (let j = 0; j < ROWS; j++) {
      for (let i = 0; i < COLS; i++) {
        const a = grid[j][i], b = grid[j][i + 1], c = grid[j + 1][i + 1], e = grid[j + 1][i];
        const x = i * dx, y = j * dy;
        // Where the contour crosses each edge of the cell (top, right, bottom, left).
        const top = [x + ((t - a) / (b - a)) * dx, y];
        const right = [x + dx, y + ((t - b) / (c - b)) * dy];
        const bottom = [x + ((t - e) / (c - e)) * dx, y + dy];
        const left = [x, y + ((t - a) / (e - a)) * dy];
        const k = (a > t ? 8 : 0) | (b > t ? 4 : 0) | (c > t ? 2 : 0) | (e > t ? 1 : 0);
        const seg = (p: number[], q: number[]) => (d += `M${f(p[0])} ${f(p[1])}L${f(q[0])} ${f(q[1])}`);
        switch (k) {
          case 1: case 14: seg(left, bottom); break;
          case 2: case 13: seg(bottom, right); break;
          case 3: case 12: seg(left, right); break;
          case 4: case 11: seg(top, right); break;
          case 5: seg(left, top); seg(bottom, right); break;
          case 6: case 9: seg(top, bottom); break;
          case 7: case 8: seg(left, top); break;
          case 10: seg(top, right); seg(left, bottom); break;
        }
      }
    }
    // Every fourth line is an index contour, drawn a little heavier.
    paths.push(`<path d="${d}" stroke-width="${l % 4 === 0 ? 2.2 : 1.1}"/>`);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#000" stroke-linecap="round">${paths.join("")}</g></svg>`;
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
};
