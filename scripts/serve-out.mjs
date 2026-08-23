/* Minimal static server mimicking GitHub Pages: serves ./out under /<basePath>. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const BASE = "/bapu-best-namkeen";
const ROOT = path.resolve("out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".json": "application/json",
};

http
  .createServer((req, res) => {
    let url = decodeURIComponent(req.url.split("?")[0]);
    if (!url.startsWith(BASE)) {
      res.writeHead(404);
      return res.end("outside base path");
    }
    url = url.slice(BASE.length) || "/";
    let file = path.join(ROOT, url);
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    if (!fs.existsSync(file)) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end(fs.readFileSync(path.join(ROOT, "404.html")));
    }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(4173, () => console.log(`serving out/ at http://localhost:4173${BASE}/`));
