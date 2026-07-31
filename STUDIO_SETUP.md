# Zorko Darwha — /studio setup

This repo now serves two things from one Vercel deploy:

- `/`         → the static order-hub site (`index.html`, unchanged)
- `/studio`   → an embedded Sanity Studio to edit the menu, no terminal needed

The Studio is built by Vercel from the `studio/` folder and copied to
`public/studio` (see `package.json` → `build`, and `vercel.json`).

## One-time setup (do these once)

### 1. Allow the site to talk to Sanity (CORS)
Go to https://www.sanity.io/manage → project **aghzsrff** → **API** → **CORS origins**
→ **Add CORS origin**, and add each URL you'll open the Studio from, with
**Allow credentials = ON**:

- `https://zorkodarwha.vercel.app`
- your Vercel **preview** URL (optional but handy while testing)
- your custom domain, if you add one later

### 2. Deploy & verify (use a preview first — don't test on live main)
1. In GitHub Desktop, create a branch (e.g. `feature/studio`).
2. Commit these new files: `studio/`, `package.json`, `vercel.json`,
   `.gitignore`, `STUDIO_SETUP.md`.
3. Push the branch → Vercel builds a **Preview** deployment automatically.
4. Open the preview URL, then visit `…/studio`. Log in with the Sanity account
   that owns project `aghzsrff`. Confirm you can see/edit menu items and that
   the main site still loads its menu.
5. If it all works, merge the branch into `main` to go live at
   `https://zorkodarwha.vercel.app/studio`.

> Why a preview first: adding `package.json` + `vercel.json` turns this from a
> "no-build" static deploy into a built one. If the build ever fails, Vercel
> keeps your previous live deploy — the site won't go down — but it's cleanest
> to confirm on a preview before merging to main.

## Editing the menu (day to day)
Open `https://zorkodarwha.vercel.app/studio`, log in, edit a Menu Item, hit
**Publish**. The site reads published items on next load.

The schema (`studio/schemaTypes/menuItem.ts`) matches what the site reads:
name, category, price, description, image, isBestSeller, subtitle, order.

## Run the Studio locally (optional)
```bash
cd studio
npm install
npm run dev        # opens http://localhost:3333
```

## Alternative: Sanity-hosted Studio (no domain change)
If you'd rather not build the Studio through Vercel, you can host it free on
Sanity instead:
```bash
cd studio
npm install
npx sanity login
npx sanity deploy   # gives you https://<name>.sanity.studio
```
That doesn't live at yourdomain/studio, but needs zero Vercel changes.
