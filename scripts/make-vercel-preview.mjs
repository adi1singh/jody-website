// Builds vercel-preview/: a static snapshot of the site for Vercel, which can't
// run the Cloudflare Worker. Requires `npm run build` and `npm run start`
// (serving http://127.0.0.1:8787). Usage: node scripts/make-vercel-preview.mjs
// Forms have no server here, so /api/leads is answered in the page with a
// plain "not connected yet" message instead of failing silently.
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";

const origin = process.env.PREVIEW_ORIGIN ?? "http://127.0.0.1:8787";
const pages = ["/", "/privacy", "/sessions", "/hypnosis", "/life-coaching", "/equestrian", "/live-sexy-now", "/listen", "/book-a-session"];
const out = new URL("../vercel-preview/", import.meta.url);
const shim = `<script>(function(){var f=window.fetch;window.fetch=function(i,o){var u=typeof i==="string"?i:(i&&i.url)||"";if(u.indexOf("/api/leads")!==-1){return Promise.resolve(new Response(JSON.stringify({ok:false,error:"Online enquiries aren\\u2019t connected yet. To reach Jody now, email jannpockran@gmail.com."}),{status:503,headers:{"content-type":"application/json"}}));}return f.apply(this,arguments);};})();</script>`;

rmSync(out, { recursive: true, force: true });
cpSync(new URL("../dist/client/", import.meta.url), out, { recursive: true });
for (const f of [".vite", ".assetsignore", "_headers", "vinext-client-entry-manifest.json"]) rmSync(new URL(f, out), { recursive: true, force: true });
for (const page of pages) {
  const res = await fetch(origin + page);
  if (!res.ok) throw new Error(`${page}: ${res.status}`);
  const html = (await res.text()).replace("<head>", "<head>" + shim);
  const dir = new URL("." + (page === "/" ? "/" : page + "/"), out);
  mkdirSync(dir, { recursive: true });
  writeFileSync(new URL("index.html", dir), html);
  console.log("saved", page);
}
