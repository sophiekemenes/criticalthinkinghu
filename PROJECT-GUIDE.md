# CriticalThinking.hu — Technikai guide

Rövid, gyakorlati összefoglaló arról, hogyan épül fel és hol fut ez az oldal. Célközönség: AI asszisztens (pl. Claude) vagy új fejlesztő, aki átveszi a site menedzselését.

---

## 1. Mi ez az oldal

Egyetlen, hosszú landing page (one-pager) a criticalthinking.hu-hoz. A tartalom modulokra (szekciókra) van bontva, a navigáció a szekciókhoz görget. Nincs több aloldal, nincs bejelentkezés, nincs adatbázis.

Nyelv: a teljes felhasználói tartalom **magyar**. A szövegeket nem szabad angolra fordítani.

---

## 2. Tech stack

| Terület | Amit használunk |
| --- | --- |
| UI | React 19 + TypeScript |
| Routing / keretrendszer | TanStack Start + TanStack Router (fájl-alapú routing a `src/routes/` alatt) |
| Stílus | Tailwind CSS v4 (config nélkül, tokenek a `src/styles.css`-ben) |
| Komponensek | shadcn/ui + Radix UI (`src/components/ui/`) |
| Animáció | Framer Motion |
| Toast | sonner |
| Build | Vite 7 |

Fontos: a routert **nem** cseréljük (nincs react-router-dom). Tailwind v4-ben nincs `tailwind.config.js` — minden a `src/styles.css`-ben van.

---

## 3. Hol van a tartalom (mit hol kell szerkeszteni)

- `src/routes/index.tsx` — a főoldal: itt van felsorolva, milyen szekciók milyen sorrendben jelennek meg. Itt van a route `head()`-je is (title, meta description, og/twitter tagek).
- `src/routes/__root.tsx` — a HTML burok: közös `<head>`, betűtípus-linkek, globális providerek, `<Outlet />`.
- `src/components/site/` — minden modul egy külön komponens:

| Fájl | Modul |
| --- | --- |
| `SiteHeader.tsx` | fejléc / navigáció |
| `Hero.tsx` | nyitó szekció |
| `Intro.tsx` | bevezető |
| `HumanVsAI.tsx` | Ember vs. AI modul |
| `MentalFirewalls.tsx` | A 3 Mentális Tűzfal |
| `Jogsi.tsx` | „jogsi" analógia modul |
| `AudienceSelector.tsx` | célközönség-választó |
| `FactsCarousel.tsx` | „Tudtad?" tény-körhinta |
| `Andrea.tsx` | Rólam / Andrea szekció |
| `ContactFooter.tsx` | lábléc + kapcsolat |
| `FadeUp.tsx` | segéd-animációs wrapper (nem tartalom) |

- `src/styles.css` — design tokenek: színek (terrakotta + arany paletta), betűtípusok (Playfair Display + Inter), radius, dark mode változók. **Szín soha ne legyen beégetve** a komponensekbe (`text-white`, `bg-[#...]`) — mindig a szemantikus tokent kell használni.

---

## 4. Hosting — a legfontosabb rész

Jelenleg **két, egymástól független** deploy-út létezik ebben a projektben. Fontos tudni, melyik szolgálja ki a domaint, mert a lehetőségeik különböznek.

> **2026. augusztusi döntés:** a Lovable hosting út le van zárva — nem használjuk,
> nincs rá előfizetés. A **GitHub Pages az egyetlen hivatalos élő verzió**.
> Ha kell működő kapcsolati form, ingyenes külső szolgáltatást (pl. Formspree)
> kötünk be a statikus oldalba — nem váltunk Lovable hostingra.

### A) Lovable hosting

- URL: `https://criticalthinkinghu.lovable.app`
- A Lovable felület jobb felső **Publish** gombja deployol ide.
- SSR / Cloudflare Worker fut a háttérben → **van szerveroldal**: később működhet igazi kapcsolati form, email küldés, adatbázis, API.
- Frontend változás csak a Publish megnyomása után élesedik.
- Custom domain itt is köthető: Project settings → Domains (A rekord: `185.158.133.1`).

### B) GitHub Pages (jelenleg be van állítva)

- A `CNAME` fájl tartalma: `www.criticalthinking.hu`
- A `.github/workflows/domyindexhtml.yml` workflow **minden `main` branch-re történő push-nál** lefut, és:
  1. futtatja: `npm run build:ghpages`
  2. ez a `vite.config.ghpages.ts` konfiggal, az `index.spa.html` belépőponttal és a `src/spa-entry.tsx` kliens-entryvel egy **tisztán kliensoldali SPA-t** épít a `dist-ghpages/` mappába
  3. átnevezi `index.html`-re, készít `404.html`-t (SPA fallback a deep linkekhez), `.nojekyll`-t, és átmásolja a `CNAME`-et
  4. deployol a GitHub Pages-re

### Melyik az élő? Így lehet eldönteni

1. **DNS:** nézd meg, hova mutat a `criticalthinking.hu` és a `www.criticalthinking.hu` (pl. dnschecker.org).
   - GitHub Pages IP-k (`185.199.108–111.153`) → a GH Pages az élő.
   - `185.158.133.1` → a Lovable hosting az élő.
2. **GitHub:** repó → Settings → Pages: látszik, aktív-e és melyik domainnel.
3. **Lovable:** Project settings → Domains: itt látszik, van-e ide bekötve custom domain.

### Amit a GitHub Pages NEM tud

Nincs szerver, csak statikus fájlok. Tehát: **nincs API, nincs form-küldés, nincs email, nincs adatbázis, nincs SSR.** Ezért került ki korábban a működő kapcsolati form a láblécből (a `mailto:` alapú megoldás böngészőnként megbízhatatlan volt).

---

## 5. Parancsok

```bash
npm run dev            # helyi fejlesztés (localhost:8080)
npm run build          # Lovable / SSR build
npm run build:ghpages  # statikus SPA build a GitHub Pages-hez (dist-ghpages/)
npm run lint
npm run format
```

---

## 6. Két munkafolyamat, egy repó

- **Lovable-ben szerkesztve:** a változás a preview-ban azonnal látszik, és a repóba is bekerül. Élesítés: Publish gomb (Lovable hosting), illetve a `main`-re kerülő commit triggereli a GH Pages workflow-t.
- **GitHubon szerkesztve (kód közvetlenül):** push a `main`-re → GH Pages újraépül. A Lovable oldal ettől nem lesz automatikusan új — ott külön Publish kell.
- Következmény: ha mindkét út aktív, két különböző URL-en két különböző verzió futhat. Érdemes hosszabb távon **egyet választani**.

---

## 7. Amihez ne nyúljunk

- `src/routeTree.gen.ts` — generált fájl, kézzel szerkeszteni tilos.
- `dist-ghpages/` — build kimenet, felülíródik.
- `vite.config.ts` plugin-listája — a `@lovable.dev/vite-tanstack-config` már tartalmazza a React, Tailwind, TanStack Start és Cloudflare pluginokat; ezek kézi hozzáadása duplikációval elrontja a buildet.
- `src/styles.css`: távoli `@import url(...)` nem használható (a Tailwind v4 buildere fájlrendszerből oldja fel az importokat). Web font mindig `<link>`-kel, a `src/routes/__root.tsx` `links` tömbjében.

---

## 8. Következő lépések / döntési pontok

1. **Hosting egységesítése.** Ha kell működő kapcsolati form vagy bármilyen backend (email, adatbázis, AI funkció), a **Lovable hosting** az út — akkor a GH Pages workflow kivezethető. Ha marad a statikus GH Pages, a formhoz külső szolgáltatás (pl. Formspree) vagy sima email-link kell.
2. **Kapcsolatfelvétel.** Jelenleg nincs form; a láblécben szöveg + fotó van. Ha újra kell form, előbb az 1. pontot kell eldönteni.
3. **SEO.** A meta tagek a `src/routes/index.tsx` `head()`-jében vannak. Új szekció vagy aloldal esetén itt kell frissíteni.
