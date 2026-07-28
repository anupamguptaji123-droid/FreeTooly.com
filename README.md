# FreeTooly

A free, no-signup online tools website built with Next.js (App Router) + Tailwind CSS.
20 working tools are included, all running fully client-side in the browser (no backend, no database, no API keys needed).

## Tools included

Word Counter, Case Converter, JSON Formatter, Text Reverser, Remove Extra Spaces,
Remove Duplicate Lines, Remove Punctuation, UUID Generator, Random Password Generator,
MD5 Hash Generator, SHA-256 Hash Generator, Base64 Encode/Decode, URL Encode/Decode,
Text/Binary/Hex Converter, Length Converter, kg to lbs Converter, Random Team Generator,
Add Line Numbers, Sort Text Lines, CSS Beautifier.

Adding a new tool takes 3 steps:
1. Add an entry to `lib/tools-registry.js` (slug, name, category, description).
2. Create the component in `components/tools/YourTool.js`.
3. Register it in `components/ToolRenderer.js`.

## Run locally

Requires Node.js 18.18+ (Node 20/22 recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build (test before deploying)

```bash
npm run build
npm start
```

---

## Deploying to Hostinger

Which steps apply depends on which Hostinger plan you're on.

### Option A — Hostinger VPS (recommended, full features)

Since every tool here is client-side only, you could technically get away with a static
export — but running the real Next.js server keeps things simple if you add server-backed
tools later (like the AI humanizer or NPI lookup we discussed). Steps:

1. **SSH into your VPS** and install Node.js (20.x) if not already present:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   node -v
   ```

2. **Upload the project.** Unzip this project on your local machine, then upload it
   (via `scp`, SFTP, or `git clone` if you push it to a repo) to somewhere like
   `/home/youruser/freetooly` on the VPS.

3. **Install deps and build on the server:**
   ```bash
   cd /home/youruser/freetooly
   npm install
   npm run build
   ```

4. **Run it with PM2** (keeps it alive, restarts on crash/reboot — you likely already
   have PM2 set up for n8n on this VPS):
   ```bash
   npm install -g pm2
   pm2 start npm --name freetooly -- start
   pm2 save
   pm2 startup
   ```
   This runs the app on port 3000 by default (see `package.json`'s `start` script).

5. **Point Nginx at it.** Add a server block (or reuse your existing Nginx setup
   alongside n8n) so your domain proxies to port 3000:
   ```nginx
   server {
       listen 80;
       server_name freetooly.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   Then get a free SSL cert with Certbot:
   ```bash
   sudo certbot --nginx -d freetooly.yourdomain.com
   ```

### Option B — Hostinger shared hosting (no Node.js process)

If your plan is regular shared hosting (not VPS) and can't run a persistent Node
process, export the site as static HTML instead — every tool here works fine
static since there's no backend:

1. In `next.config.js`, add:
   ```js
   const nextConfig = {
     output: "export",
   };
   ```
2. Build:
   ```bash
   npm run build
   ```
   This produces a static site in the `out/` folder.
3. Upload the contents of `out/` to `public_html` via Hostinger's File Manager or FTP.

Note: if you later add a tool that needs a server call (like an AI text humanizer),
static export won't support it — you'd need the VPS route (Option A) for that tool,
or host just that one API route elsewhere (e.g. a free Vercel deployment) and call
it from your statically-hosted site.

---

## Notes

- All hashing (MD5/SHA-256), encoding, and text processing runs in the browser —
  nothing is sent to a server, so there's no backend cost and no data leaves the
  visitor's device.
- Tailwind is used for styling; adjust colors in `tailwind.config.js` under `theme.extend.colors.brand`.
- SEO metadata (title/description) per tool page is generated automatically from
  `lib/tools-registry.js` — keep descriptions accurate and unique per tool for best results.
