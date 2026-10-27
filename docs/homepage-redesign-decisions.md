# Főoldal-újratervezés: rögzített döntések

Munkadokumentum a criticalthinking.hu főoldal újratervezéséhez. Forrás: a Slack #criticalthinking-hu csatorna átadása és a ChatGPT-s gondolkodási beszélgetés, majd a Claude-dal közös munka (2026. október). Ami itt szerepel, az eldöntött; a többit nem kérdezzük újra. Utolsó frissítés: 2026-10-26.

## Pozicionálás
- Főcím (H1) marad: **Tiszta gondolkodás. Saját döntés.**
- A főoldal gondolati platform, nem szolgáltatói oldal és nem a 3 Mentális Tűzfal bemutatója.
- A három tűzfal kanonikus neve: Figyelmi tűzfal · Értelmezési tűzfal · Döntési tűzfal (nem „Érzelmi").
- A.I.D.: Attention, Interpretation, Decision (Notice → Examine → Choose). Gyakorlati keret, nem validált módszer, nem ígér teljes védelmet.
- Dramaturgia: probléma → gondolat → bizonyíték → módszer → személy → teendő.
- A „Human Engagement Architect" cím **marad** (LinkedIn-titulus, így szerepel a konferenciákon is).

## Hang
- „Nem mindig komoly hangon beszél. De mindig komolyan veszi, amiről beszél."
- Szakmai alap + Szofi-féle önirónia és finom szemtelenség. A humor felismerést hordoz, nem dekoráció.
- Forrás nélküli állítás nem kerül ki (nincs kitalált hivatkozás, statisztika, esemény, idézet). Kutatási eredmény, szerzői értelmezés és hipotézis külön jelölve.
- Nem „kutatom", hanem „vizsgálom" / „írok és beszélek róla": Sophie nem végez saját kutatást, kutatásokra épít.
- Nincs emoji az oldalon.

## A főoldal jelenlegi szerkezete (fentről lefelé)
1. **Hero:** H1 + egy bekezdés („A figyelemről, az ítélőképességről és a döntéseinkről írok és beszélek… A kockázatokat vizsgálom az információs, digitális és kibertérben, és legújabban a generatív AI-okkal való interakciók során."). Két gomb: „Az A.I.D. keretrendszer" (→ Módszer) és „Előadások és témák". Kis margójegyzet alatta. Az „Az AI válaszol. Az internet véleményt mond…" bekezdés kikerült.
2. **Feszültség:** „Az AI gyorsabbá teszi a gondolkodást. De mit kezdünk azzal, amit közben kiszervezünk belőle?"
3. **Ismerős?:** négy kártya, mindegyik mögött kész cikk. Alatta gomb: „Az összes gondolat egy helyen" → `/cikkek`.
4. **Módszertan** („saját pedagógiai keretrendszer"): A.I.D. és a három tűzfal; a munkafüzet „fejlesztés alatt". Alatta szürke, nem kattintható gomb: „Részletes keretrendszer · hamarosan" (a külön aloldal még nincs; ha kész, a gomb élesre kapcsol).
6. **Rólam:** „Az emberi tényező nem egy lábjegyzet."
7. **Előadások:** csak az „Előadások" felirat, alatta négy téma + korábbi és következő szereplések. A „A képernyőn túl is van mondanivaló." cím és bevezető bekezdése kikerült (Sophie kérése, 2026-10-27).
8. **Szervezeteknek:** Human Risk Services kártya (link az aloldalra).
9. **„A.I.D. módszertan a gyakorlatban"** (`YourTurn.tsx`, felirat: „Most te jössz"): az A.I.D. a látogatón fut végig, három egymás melletti kártyában, mint a Módszertan (mobilon egymás alatt). Bevezető: „Elég hogy csak itt jártál, és máris belekóstolhatsz a saját tűzfalaid működésébe:". **A** = macskás kártya („Láttad a macskát?", link: A figyelmed kiskutya), **I** = „Egy állítás, amit érdemes megkérdőjelezni" (tény / értelmezés / hipotézis; alatta link: A torzítás-térkép), **D** = „Innentől rajtad a döntés." + Sophie szövege + „Beszéljünk" gomb. Ezek a szekciók máshol már nincsenek (átköltöztek, nem másolódtak).
10. **Három út** (`Closing.tsx`, sötét sáv a „Beszéljünk" fölött, szürke keretes kártyákkal): olvasóknak (link: `/cikkek`), rendezvényszervezőknek, szakmai partnereknek. Csak az olvasói kártyán van link, a másik kettő a lábléc elérhetőségére épít. A „Beszéljünk" lábléc a főoldalon (`<ContactFooter tight />`) ugyanabban az oszlopban indul, mint a többi szekció (max-w-6xl), kisebb képpel és kevesebb felső térrel; a többi oldalon a lábléc változatlan.
11. **„Beszéljünk" lábléc.**

Menü: Gondolatok · Módszertan · Rólam · Előadások · Szervezeteknek · Kapcsolat.

## Elvetve / kikerült
- „Tudtad?" blokk (forrás nélküli számok miatt).
- Hat tématerület a főoldalon (5 cikknél üres polcok lennének).
- Főoldali Gondolatok szekció (kiemelt cikk + kártyák): helyette gomb az Ismerős? alatt.
- A nagy záró cím („A kérdés nem az, hogy gondolkodik-e helyettünk az AI…").
- „Amin dolgozom" / „Jelenlegi fókusz" külön szekció (a Human Risk Services és a workbook úgyis a jelenlegi fókusz).
- Pénzügyi Önvédelem: nem központi útvonal a főoldalon.

## Gondolatok oldal
A `/cikkek` átnevezve „Gondolatok"-ra (menü, cím, H1, meta). A cikkoldalak „Vissza a cikkekhez" linkje maradt.

## Előadások: megerősített szereplések (Sophie, 2026-10-26)
Korábbi: WITSEC szakmai nap (2025) · AI Business konferencia (2025. november) · Future IT (2025. november) · ICT Global Enterprise (2026).
Következő: WITSEC szakmai nap (2026) · Future IT (2026) · Debreceni Business Fest (2026).
A lista „napra kész". Előadáscím és szerep nincs kiírva; csak megerősítéssel kerülhet ide.

## Human Risk Services a főoldalon
- Vállalt, kész ajánlat, ezért nem „mesterséges kirakat". A főoldalon a Szervezeteknek szekcióban rövid kártya, részletek és ár csak az aloldalon (`/human-risk-services`). A menüben is szerepel.
- A Human Risk Care platformfüggetlen: Hoxhunt, Microsoft Defender és más phishing-szimulációs / awareness platform mellé is vehető (azonos havidíj, 150 000 Ft + áfa).

## Interakciók (szerény, `prefers-reduced-motion` tiszteletben tartva)
- Megvan: a macska egyszer átfut görgetéskor (csökkentett mozgásnál nem jelenik meg); az A.I.D.-lépések egymás után bekapcsolnak; a tény/értelmezés/hipotézis kérdés; hero margójegyzet; kártyák margójegyzete.
- Macska: a rajz önálló SVG-ként `src/assets/illustrations/macska-fekete.svg` és `macska-vilagos.svg`, újrafelhasználható.
- Nincs még: növény (felülről érkezik), A.I.D. mikroséta, „Ezt honnan tudjuk?" forráskapu.

## A Slack-átadáshoz képest pontosítva
- Hero nyitás és gombok: az „Az AI válaszol…" nyitás kikerült; a gombok az A.I.D. keretrendszer és az Előadások és témák (nem az „Olvass bele a gondolataimba").
- Cikkek láthatósága: nem főoldali szekció, hanem az Ismerős? kártyák (mind cikkre mutat) és a gomb a Gondolatok oldalra.
- „Ne találj ki szolgáltatáslistát": a Human Risk Services vállalt ajánlat, ezért szerepel; más szolgáltatáslista nincs.
- „Human Engagement Architect hasznossága": eldőlt, marad.
- Az „Egy kérdés útravalónak" és a munkafüzet: a címe és neve nem szerepel az oldalon, amíg a védjegy- és névellenőrzés nincs meg.
- Cikkszámok: 5 magyar és 5 angol cikk van (az átadás 5 + 4-et írt).
- Az A.I.D. mikroszekció egyelőre a Módszer részben van; a külön interaktív mikroséta későbbi etap.

## Kész: sitemap és robots
- `public/robots.txt`: mindent engedélyez, kivéve `/encoding-test/`, és hivatkozik a sitemapre.
- `sitemap.xml`: a prerender script generálja build közben a route-listából (új cikk automatikusan bekerül, cikkeknél `lastmod` a cikk dátuma). Az `/encoding-test` kimarad.
- Javasolt utólagos lépés: a sitemap beküldése a Google Search Console-ban.

## Következő lépés
- Sophie dönt a későbbi etap sorrendjéről.

## Későbbi etap
- Mobilos átnézés az új sorrendre.
- A három tűzfal külön oldala (a Módszer „bővebben" célja).
- További interakciók: növény, A.I.D. mikroséta, „Ezt honnan tudjuk?" forráskapu.
- Fotók keresése: valódi, dokumentarista képek (előadás-, portré-, gondolkodási helyzetek); az Előadások és a Rólam szekcióba. Kerülendő: világító agy, robotkéz, absztrakt AI-háló, stock corporate.
- Szövegek átnézése szekciónként (Feszültség, Ismerős? margójegyzetek, előadási témák, Szervezeteknek).
- Főoldali meta / megosztási kép (og:image).
- Angol oldal.

## Nyitott
- Kutatási forrásindex (`sources - article ideas.md`): tartalma nem érkezett meg. Kutatásra támaszkodó új állítás addig nem kerül ki.
- Az értesítések okozta figyelmi lassulásról szóló „2026-os vizsgálat": forrás nélkül nem szerepel; forrással „mit találtak / mit olvasok ki belőle" bontásban jöhet.
- Külön macskás cikk (a macskás kártya most a „A figyelmed kiskutya" cikkre mutat).
- Védjegy- és névellenőrzés (A.I.D., 3 Mentális Tűzfal, munkafüzet címe).

## Munkamód
Lassan, kis lépésekben: egyszerre egy lépés és egy döntés. Előbb vázlat, a jóváhagyás után kód.
