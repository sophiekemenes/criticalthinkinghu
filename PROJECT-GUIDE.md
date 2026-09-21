# CriticalThinking.hu — Technikai guide

Rövid, gyakorlati összefoglaló arról, hogyan épül fel és hol fut ez az oldal. Célközönség: AI asszisztens (pl. Claude) vagy új fejlesztő, aki átveszi a site menedzselését.

---

## 1. Mi ez az oldal

A criticalthinking.hu magja egy hosszú, egyoldalas landing page (one-pager), modulokra (szekciókra) bontva — a navigáció a szekciókhoz görget. **2026. augusztus óta** emellett van egy önálló **blog is** (`/cikkek`, lásd 3. és 8. pont): egy manifest-vezérelt cikk-rendszer, dátum szerint böngészhető listával és kategóriára előkészített adatmodellel — ez a publikálási ritmus (heti/kétheti esszé a 3 Mentális Tűzfal egy-egy aspektusáról) alapja. Nincs bejelentkezés, nincs adatbázis.

Nyelv: a teljes fő oldal **magyar** marad, ez az elsődleges nyelv. **2026. szeptembertől** van egy önálló, minimális **angol ág is** (`/en`, lásd 3. és 8. pont) — egy "coming soon" oldal + a lefordított cikkek, a fejléc jobb szélén lévő nyelvváltó gombbal elérhető. Ez egy teljes angol redesign előkészítése, egyelőre csak a cikkek vannak lefordítva.

Pozicionálás (2026. augusztusi döntés): az oldal **nem** "3 egyenrangú célcsoport" hub-ként kommunikál (vállalat / professional / szülő-tanár), hanem egyetlen gondolkodó/szerző pozícióból, a **3 Mentális Tűzfal** keretrendszer köré épülve — ez a ténylegesen kidolgozott, élő szakmai anyag. A vállalati ág és a JOGSI wishlist-státuszú, ezért csak egy kompakt "Amin dolgozom / Hamarosan" szekcióban jelennek meg (`ComingSoon.tsx`), hogy ne versenyezzenek figyelemért a fő üzenettel.

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

- `src/routes/index.tsx` — a főoldal: itt van felsorolva, milyen szekciók milyen sorrendben jelennek meg (`SiteHeader → Hero → Intro → MentalFirewalls → Andrea → ComingSoon → FactsCarousel → ContactFooter`). Itt van a route `head()`-je is (title, meta description, og/twitter tagek).
- `src/routes/__root.tsx` — a HTML burok: közös `<head>`, betűtípus-linkek, globális providerek, `<Outlet />`.
- **A blog-rendszer** (2026. szeptember óta) manifest-vezérelt, nem egy-fájl-egy-route elven megy:
  - `src/content/articles.json` — **az egyetlen forrás** minden cikk metaadatához (`slug`, `title`, `subtitle?`, `description`, `excerpt`, `date`, `categories`, `custom?`). Ez hajtja a listát, a dinamikus cikkoldalt ÉS a GH Pages prerender route-generálását.
  - `src/content/articles/<slug>.md` — a "sima" (prózai) cikkek nyers markdown törzse.
  - `src/routes/cikkek/index.tsx` — a `/cikkek` lista, dátum szerint csökkenő sorrendben, előkészített év-szűréssel.
  - `src/routes/cikkek/$slug.tsx` — egyetlen dinamikus route, ami minden cikket kiszolgál: a manifest `custom: true` jelölésű bejegyzéseinél (pl. `self-check-ai`) a hozzá tartozó saját komponenst rendereli (lásd lent), egyébként a megfelelő `.md` fájlt tölti be és `react-markdown`-nal jeleníti meg egy közös `ArticleLayout`-ban.
  - **Új (sima, prózai) cikk hozzáadásához**: (1) új `.md` fájl a `src/content/articles/` alá, (2) egy új bejegyzés a `articles.json`-ban. **Ennyi** — nincs több route-fájl, nincs `routeTree.gen.ts` regen, nincs kézi `ROUTES`-bővítés a prerender scriptben (az automatikusan felveszi a manifestből). A főoldali cikk-CTA (`MentalFirewalls.tsx`) és a fejléc-nav is automatikusan a legfrissebb (`date` szerint) cikkre mutat.
  - Ha egy cikknek **egyedi, nem prózai layout** kell (mint a `self-check-ai`-nak — kártyás/ikonos szerkezet): a komponens a `src/components/site/articles/` alá kerül, a manifestben `"custom": true`, és a `$slug.tsx` tetején lévő `customArticleComponents` map-hez hozzá kell adni egy `slug: Komponens` sort — ez rendereli a `.md`-alapú megjelenítés helyett.
- **Az angol ág** (`/en`) a magyar blog-rendszer párja, önálló manifesttel — nem egy `lang` mező ugyanazon a rekordon, mert HU/EN cikkek külön-külön mehetnek élesre, és az angol cikkeknek saját (angol) slug-juk van, nem a magyar transzliterációja:
  - `src/content/articles.en.json` + `src/content/articles.en.ts` — az `articles.json`/`articles.ts` angol párja, ugyanaz a `getAllArticlesEn`/`getArticleEnBySlug` mintázat.
  - `src/content/articles-en/<slug>.md` — a lefordított cikkek törzse.
  - `src/routes/en/index.tsx` — a "coming soon" oldal ("Coming soon. See the articles.").
  - `src/routes/en/articles/index.tsx` + `src/routes/en/articles/$slug.tsx` — a `/cikkek` pár, `EnHeader`/`EnFooter`-rel (lásd lent) és `ArticleLayout lang="en"`-nel.
  - `src/components/site/EnHeader.tsx` / `EnFooter.tsx` — szándékosan **nem** a magyar `SiteHeader`/`ContactFooter` fordítása: minimál fejléc/lábléc (logó + Articles link + nyelvváltó), mert a teljes magyar nav a főoldal szekcióira horgonyoz, amiknek egyelőre nincs angol megfelelője.
  - `src/components/site/LanguageToggle.tsx` — a HU⇄EN gomb; HU oldalról mindig `/en`-re visz, EN oldalról mindig `/`-re — nem próbál oldal-párokat egymáshoz rendelni (a legtöbb magyar oldalnak még nincs angol párja).
  - Új angol cikk hozzáadása: ugyanaz a minta, mint a magyarnál (3. pont), csak az `-en` végződésű fájlokban/mappákban.
  - **A `__root.tsx` `<html lang="...">`-je szándékosan statikus `"hu"`**, minden route-on — kipróbáltuk dinamikussá tenni (`useRouterState`-tel az aktuális route alapján), de ez site-szerte hidratáció-hibát okozott ebben a bypass-elt SSR felállásban (lásd 7. pont) — nem érte meg a kockázatot egy `lang`-attribútum nüánszért.
- `src/components/site/` — minden főoldal-modul egy külön komponens:

| Fájl | Modul |
| --- | --- |
| `SiteHeader.tsx` | fejléc / navigáció |
| `Hero.tsx` | nyitó szekció — brand promise ("Tiszta gondolkodás. Saját döntés.") |
| `Intro.tsx` | bevezető / híd a 3 Tűzfalhoz |
| `MentalFirewalls.tsx` | A 3 Mentális Tűzfal — a fő IP, self-check tartalommal |
| `Andrea.tsx` | Rólam / Andrea szekció |
| `ComingSoon.tsx` | "Amin dolgozom / Hamarosan" — vállalati ág + JOGSI kompakt teaser |
| `FactsCarousel.tsx` | „Tudtad?" tény-körhinta |
| `ContactFooter.tsx` | lábléc + kapcsolat |
| `FadeUp.tsx` | segéd-animációs wrapper (nem tartalom) |

- `src/assets/brand/` — a hivatalos logó SVG-k (`criticalthinking-logo-full-color.svg`, `-black.svg`, `-white-reverse.svg`). `docs/brand/` — a teljes vizuális arculati összefoglaló (PDF), referenciaként.
- `src/styles.css` — design tokenek: színek (**Ink black `#161615` / Stone gray `#8A897F` / Bone white `#F1EFE8` / Signal coral `#D8542A`** — egyetlen akcentszín, lásd `docs/brand`), betűtípusok (**Familjen Grotesk** cím/alcím + Inter body), radius, dark mode változók. **Szín soha ne legyen beégetve** a komponensekbe (`text-white`, `bg-[#...]`) — mindig a szemantikus tokent kell használni. Kiemelés-minta: `.accent-mark` (szín + aláhúzás egy szón/kifejezésen) — **ne** italic, az arculat kifejezetten ezt kéri.

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

### B) GitHub Pages (ez az élő, hivatalos verzió)

- A `CNAME` fájl tartalma: `www.criticalthinking.hu`
- A `.github/workflows/domyindexhtml.yml` workflow **minden `main` branch-re történő push-nál** lefut, és:
  1. futtatja: `npm run build:ghpages`, ami három lépésből áll:
     - `vite build --config vite.config.ghpages.ts` — a `src/spa-entry.tsx` kliens-entryvel megépíti a JS/CSS bundle-t (`dist-ghpages/`)
     - `vite build --config vite.config.ghpages.ssr.ts` — Node-célú SSR build a `src/entry-prerender.tsx`-ből (`dist-ghpages-ssr/`, build-time only)
     - `node scripts/prerender-ghpages.mjs` — a fenti SSR bundle-lel **route-onként valódi, renderelt HTML-t ír** (`renderToString`), és a build-elt `<script>` taget belefűzve minden route-hoz saját `index.html`-t ír (pl. `dist-ghpages/cikkek/self-check-ai/index.html`) — **ez nem pusztán statikus SPA**, a keresőrobotok is valós tartalmat kapnak JS futtatása nélkül.
     - A kliens (`src/spa-entry.tsx`) ezután `hydrateRoot(document, ...)`-tal hidratál erre a markupra (nem egy `#root` divre — a `__root.tsx` shellComponent-je a teljes `<html>` dokumentumot rendereli). Böngészőben a router alapból valódi `createBrowserHistory`-t használ — **ne** írjuk felül `createMemoryHistory`-val, mert az elnémítja az URL-sáv/vissza-gomb szinkront kattintásos navigációnál.
  2. készít `404.html`-t (SPA fallback minden *nem*-prerenderelt deep linkhez), `.nojekyll`-t, és átmásolja a `CNAME`-et
  3. deployol a GitHub Pages-re

### Amit a GitHub Pages NEM tud

Nincs szerver, csak statikus fájlok — build-time prerender van, nem runtime SSR. Tehát: **nincs API, nincs form-küldés, nincs email, nincs adatbázis.** Ezért került ki korábban a működő kapcsolati form a láblécből (a `mailto:` alapú megoldás böngészőnként megbízhatatlan volt).

---

## 5. Parancsok

```bash
npm run dev             # helyi fejlesztés (localhost:8080)
npm run build           # Lovable / SSR build (jelenleg nem használt hosting)
npm run build:ghpages   # GH Pages build: kliens bundle + SSR prerender (dist-ghpages/)
npm run preview:ghpages # a build:ghpages kimenetének kiszolgálása helyben (localhost:4173)
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
- `dist-ghpages/` és `dist-ghpages-ssr/` — build kimenetek, `.gitignore`-olva, felülíródnek.
- `vite.config.ts` plugin-listája — a `@lovable.dev/vite-tanstack-config` már tartalmazza a React, Tailwind, TanStack Start és Cloudflare pluginokat; ezek kézi hozzáadása duplikációval elrontja a buildet.
- `src/styles.css`: távoli `@import url(...)` nem használható (a Tailwind v4 buildere fájlrendszerből oldja fel az importokat). Web font mindig `<link>`-kel, a `src/routes/__root.tsx` `links` tömbjében.
- `index.spa.html` `<head>`-je vestigiális — a `scripts/prerender-ghpages.mjs` teljesen eldobja és a `__root.tsx` `head()`-jéből épített SSR-kimenettel helyettesíti minden route-nál. Csak a benne lévő `<script>` tag forrását (build entry point) használja a script.
- `src/spa-entry.tsx`-ben **ne** vezess be `createMemoryHistory`-t vagy más history-felülírást — lásd 4. pont, ez már okozott egy néma (build hiba nélküli, de éles hibát okozó) regressziót.
- `__root.tsx`-ben **ne** használj `useRouterState`-et (vagy más `useSyncExternalStore`-alapú router-hookot) a `RootShell`-ben (a shellComponent, ami a teljes `<html>`-t rendereli) — ez a bypass-elt SSR felállásban (nem valódi streaming szerver, hanem `renderToString` + kézi `hydrateRoot`) site-szerte hidratáció-hibát okozott, valószínűleg mert a hook szerver-oldali snapshot-viselkedése nem ugyanaz, mint egy valódi TanStack Start szerveren lenne. 2026. szeptemberben ki lett próbálva (dinamikus `<html lang>`), és vissza lett vonva emiatt.
- **Ismert, alkalmankénti hidratáció-flakiness**: nagyon ritkán (elsősorban `npm run dev`-mode/unminified buildeknél figyeltük meg, production buildnél ritkábban) a konzolban felbukkanhat egy "Hydration failed... React error #418" hiba egy `<Suspense>` vs. `<main>` diff-fel, ami *bármelyik* route-on előfordulhat (nem cikk- vagy EN-specifikus — a teljesen üres `/` főoldalon is reprodukálódott egy git-stash-es bisecteléssel, tehát nem ennek a session-nek a változása okozta). A böngésző ilyenkor magától újrarendereli a fát, a felhasználó semmit nem vesz észre — de a gyökérok (feltehetően egy timing race a `router.load()` és a `hydrateRoot()` között a `spa-entry.tsx`-ben) nincs még feltárva. Ha valaki mélyebbre megy ebben: lásd 2026. szeptemberi debug-jegyzeteket (git history), a `window.addEventListener("error", ...)` hook befecskendezéses technikát érdemes újrahasználni a teljes, nem-minifikált hibaüzenethez.

---

## 8. Következő lépések / döntési pontok

1. **Kapcsolatfelvétel.** Jelenleg nincs form; a láblécben szöveg + `mailto:` van. Ha kell működő form, külső szolgáltatás (pl. Formspree) vagy sima email-link kell — a GH Pages döntés miatt nem Lovable hosting felé megyünk (lásd 4. pont).
2. **SEO / crawlelhetőség.** ✅ Megoldva (2026. augusztus): a GH Pages build route-onként valós, prerenderelt HTML-t ad ki (lásd 4.B pont). **2026. szeptembertől** a route-lista is automatikusan generálódik a `src/content/articles.json` manifestből (lásd 3. pont) — új cikkhez nincs több kézi lépés ezen a téren.
3. **Publikálási ritmus.** Három élő cikk van (`self-check-ai`, `ne-kattints-allj-meg-gondolkodj`, `a-figyelmed-kiskutya`), mindegyik angolul is elérhető a `/en/articles` alatt — a `/cikkek` lista dátum szerint böngészhető, kategória szerinti szűrés az adatmodellben elő van készítve (`categories` mező), de UI-ja még nincs bekapcsolva (majd akkor éri meg, ha lesz miből válogatni). Következő lépés: a heti/kétheti esszé-ritmus tartása a 3 Mentális Tűzfal egy-egy aspektusáról. Minden új (prózai) cikkhez mostantól csak 1 `.md` fájl + 1 manifest-bejegyzés kell (lásd 3. pont) — nincs route-fájl, nincs `ROUTES`-bővítés. Fordítás: ugyanez a minta az `-en` fájlokkal.
4. **Hosting egységesítése.** A Lovable hosting jelenleg lezárva (lásd 4. pont blockquote). Ha később mégis kellene valódi backend (form-küldés, adatbázis, AI funkció runtime-ban), azt újra kellene gondolni — a GH Pages build-time prerender nem helyettesít egy futó szervert.
5. **Nincs szociális bizonyíték.** Ügyféllogó, esettanulmány, mérőszám, testimonial egyelőre hiányzik az oldalról (audit-megjegyzés, 2026.08).
6. **Angol oldal újratervezése.** A `/en` jelenleg csak "coming soon" + lefordított cikkek. Amikor a teljes angol (és a hozzá tartozó magyar újradizájn) koncepció kidolgozásra kerül, a `LanguageToggle`/`EnHeader`/`EnFooter` minimál komponenseit valószínűleg le kell cserélni a végleges dizájnra — ezek jelenleg tudatosan egyszerűek, nem a végleges arculatot képviselik.
