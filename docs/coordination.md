# Ki mit csinál: munkamegosztás a CriticalThinking.hu projektben

Utolsó frissítés: 2026-10-27. Ez a fájl azért van, hogy egy új session (vagy Sophie, aki nem emlékszik mindenre) gyorsan lássa, ki min dolgozott és mihez ne nyúljon.

Sophie egyszerre mindig egy sessionnel dolgozik. A különböző sessionök viszont egymás után jönnek, ezért kell ez a térkép.

## Szereplők

| Szereplő | Mihez nyúl | Mihez nem |
|---|---|---|
| **Felhő-Claude** (claude.ai/code, PR-ekkel dolgozik) | Főoldal, design, interakciók, Human Risk Services oldal, sitemap és robots, `docs/homepage-redesign-decisions.md` | Cikkek, `/penzugyi-onvedelem` |
| **Helyi Claude** (Sophie gépén) | Cikkek magyarul és angolul (Notion → repó), cikk- és megosztási képek, a helyi `CriticalThinkingHU\` mappa tartalmának behozatala, push Sophie gépéről | Főoldal-redesign, `/penzugyi-onvedelem` |
| **Roomli workshop session** | `/penzugyi-onvedelem` | Ehhez más nem nyúl |
| **ChatGPT** | Stratégia, kutatási kivonat, szövegötletek (Slack-csatornán át). Kódot nem ír. | A repó |
| **Sophie** | Minden jóváhagyás, Google Search Console | |

## Közös szabályok

- Az igazság forrása a GitHub `main`. Minden új munka onnan indul (`git fetch`, majd a friss `main`-re építünk).
- A helyi gépen a `C:\dev\criticalthinkinghu` példányt több session is használja. Egy push kiviheti a másik session még nem élesre szánt commitjait is. Push előtt `git fetch` és ellenőrzés, nyers piszkozatot nem commitolunk.
- A `main`-re kerülő változás azonnal éles (GitHub Pages). PR-ben dolgozunk, Sophie mergel.
- Forrásra épülő új állítás nem kerülhet ki a `sources - article ideas.md` nélkül (lásd lent).

## Cikkekre vonatkozó szabályok

- Sophie szövegét nem javítjuk, az elírást csak jelezzük neki.
- A 04 és 05 cikkben nincs em dash. Az angolban szóközös kötőjel ( - ) van.
- A cikk dátuma látszik az oldalon, és a lista meg a "legújabb cikk" gomb is ez alapján rendez. Két cikknek különböző dátum kell.
- Az `og:image` csak abszolút URL lehet. Relatívat a Facebook és a LinkedIn nem old fel.
- A végleges cikkszövegek forrása a Notion, innen mentve a `CriticalThinkingHU\Articles\final\` mappába (angol: `final\en\`).
- Állapot: 5 magyar és 5 angol cikk van a repóban.

## Átfedési pontok (itt léphetünk egymás lábára)

- `PROJECT-GUIDE.md`: mindkét session szerkeszti. Felhő: szekciósorrend, komponenstábla, sitemap-megjegyzés (a `main`-ben). Helyi: cikkmezők (`image`, `imageAlt`), og:image és dátumszabály, a végleges szövegek helye (helyi commit, felküldésre vár).
- `scripts/prerender-ghpages.mjs`: a route-lista és a sitemap itt épül. Új route felvételekor ide is kell nyúlni.
- A cikkek `lastmod` dátuma a sitemapben a cikkek `date` mezőjéből jön.

## Ami csak a helyi gépen van (nincs a repóban)

- `CriticalThinkingHU\Articles\research\sources - article ideas.md` (14,7 KB, 2026-09-21) és a heti kutatási, cikktéma-összefoglalók (`heti-kutatas-*`, `heti-cikktemak-*`). Felhő-session nem éri el, a helyi session pedig még nem olvasta végig. Amíg nincs a repóban, forrásra támaszkodó állítás nem kerül ki.
- Sophie két valódi fotója: `CriticalThinkingHU\fotok\` (színpadi kép, GBS-es kép). A repó csak az egyiket használja (`src/assets/andrea-stage.png`). A "dokumentarista fotók" munkához innen érdemes kezdeni.

## Nyitott, még nem eldöntött

Lásd részletesen: `docs/homepage-redesign-decisions.md`. Röviden: három tűzfal külön oldal, további interakciók, fotók az Előadásokhoz és a Rólamhoz, szövegek átnézése, főoldali og:image, angol főoldal, név- és védjegyellenőrzés (A.I.D., 3 Mentális Tűzfal, munkafüzet címe).
