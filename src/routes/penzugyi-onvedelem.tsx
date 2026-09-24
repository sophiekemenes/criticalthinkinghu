import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarPlus, Check, Loader2, X } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ContactFooter } from "@/components/site/ContactFooter";
import { FadeUp } from "@/components/site/FadeUp";

// Jelentkezés + fizetés a Make "CT workshop - jelentkezés API + fizetés
// feldolgozás" scenarión keresztül (id 7576567). Ugyanez az URL kapja a
// Stripe checkout.session.completed eseményt is. Az oldal statikus (GH Pages),
// ezért a szabad helyeket futásidőben kérdezzük le, a fizetést pedig egy
// Make által létrehozott Stripe Checkout Session-re irányítva indítjuk.
// Az ár (early bird / normál / páros) a szerveren dől el, nem itt.
const API_URL = "https://hook.eu1.make.com/8lhxjxetams1bcky1bqxo1pgqyl0mj8o";

const PAGE_TITLE = "Online Pénzügyi Önvédelem · kiscsoportos workshop · criticalthinking.hu";
const PAGE_DESCRIPTION =
  "Négyórás gyakorlati műhely legfeljebb hét emberrel Székesfehérváron: a 3 Mentális Tűzfal mentén, a saját telefonodon építjük fel a pénzügyi védelmedet. Neked, a gyerekeidnek és a szüleidnek.";

export const Route = createFileRoute("/penzugyi-onvedelem")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: "Online Pénzügyi Önvédelem · max. 7 fő, saját telefonnal" },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { name: "twitter:title", content: "Online Pénzügyi Önvédelem · max. 7 fő, saját telefonnal" },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
  }),
  component: WorkshopPage,
});

type DateSlot = { id: string; label: string; left: number; open: boolean };
type Availability = { earlyBird: boolean; dates: DateSlot[] };

// Tartalék, ha az élő lekérdezés nem érkezik meg: az időpontok megjelennek,
// a szabad helyek száma nem.
const FALLBACK_DATES: DateSlot[] = [
  { id: "okt03", label: "október 3., szombat, 11:00-15:00", left: -1, open: true },
  { id: "okt04", label: "október 4., vasárnap, 11:00-15:00", left: -1, open: true },
  { id: "okt0708", label: "október 7-8., szerda + csütörtök, 18:00-20:00", left: -1, open: true },
];

const EARLY_BIRD_DEADLINE = "szeptember 30.";

const firewalls = [
  {
    n: "01",
    title: "Figyelmi tűzfal",
    body: "Hogyan szerzik meg a figyelmedet, mielőtt bármit kérnének. Banki SMS, csomagküldős link, Marketplace-üzenet, egy nagyon nyugodt hang a telefonban. Nem azt kérdezzük, hogy „ez adathalászat-e”, hanem hogy mi lenne a következő mozdulatod.",
  },
  {
    n: "02",
    title: "Értelmezési tűzfal",
    body: "A csaló nem információt küld, hanem történetet mesél. Szétszedünk néhány valódi esetet: mit állít, mitől kellene félnem, mi benne a sürgős, és mit tudnék ellenőrizni egy másik csatornán.",
  },
  {
    n: "03",
    title: "Döntési tűzfal",
    body: "Az egyetlen szabály, amit mindenki hazavisz: PÉNZ + FÉLELEM + SÜRGETÉS = ÁLLJ MEG. Lehet, hogy tényleg a bankod keres. Ettől még nem kell most döntened.",
  },
];

const takeaways = [
  "A saját telefonodon átállított banki értesítések, limitek és kétlépcsős azonosítás",
  "Egy rétegzett pénzügyi felállás terve, hogy egy rossz kattintás ne nyisson ki minden ajtót",
  "Vészkártya: az első öt lépés arra az esetre, ha mégis megtörtént",
  "„A saját 3 tűzfalam” lap, rajta a három dologgal, amit még aznap megcsinálsz",
];

function WorkshopPage() {
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [status, setStatus] = useState<"siker" | "megszakitva" | null>(null);
  const [bookedDate, setBookedDate] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const f = params.get("fizetes");
    if (f === "siker" || f === "megszakitva") setStatus(f);
    const d = params.get("idopont");
    if (d && d in CALENDAR_EVENTS) setBookedDate(d);

    fetch(`${API_URL}?action=availability`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Availability | null) => {
        if (data && Array.isArray(data.dates)) setAvailability(data);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="bg-background text-foreground antialiased">
      <SiteHeader />

      {status && <StatusBanner status={status} dateId={bookedDate} onClose={() => setStatus(null)} />}

      {/* Hero */}
      <section className="pt-36 pb-20 md:pb-28 px-6">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">
              Kiscsoportos workshop · Székesfehérvár · október
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6 text-balance">
              Online Pénzügyi Önvédelem.{" "}
              <span className="accent-mark">Ne a csaló diktálja a tempódat.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg md:text-xl text-ink-soft leading-relaxed mb-10 max-w-2xl">
              Négyórás gyakorlati műhely legfeljebb hét emberrel, ahol a saját telefonodon építjük fel
              a saját pénzügyi védelmedet. Neked, a gyerekeidnek és a szüleidnek.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#jelentkezes"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral text-cream font-medium hover:bg-coral-deep transition-colors"
              >
                Jelentkezem <ArrowRight className="h-4 w-4" />
              </a>
              <span className="text-sm text-ink-soft">
                Max. 7 fő alkalmanként · saját telefonnal dolgozunk · early bird {EARLY_BIRD_DEADLINE}-ig
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Miért */}
      <section className="py-20 md:py-28 px-6 bg-ink text-cream">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed">
          <FadeUp>
            <p className="font-display text-3xl md:text-4xl leading-tight text-cream mb-4">
              A csalás nem intelligenciateszt.
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="text-cream/80">
              Két mondat, amit a biztonsági szakma évtizedek óta ismétel: ne kattints, állj meg. Annyira
              elcsépelt, hogy a legtöbben csak biccentünk rá, aztán kedd délelőtt felhív a „bank biztonsági
              osztálya”, pontosan tudja a nevünket, azt is, melyik bankban vagyunk, és a hangja olyan
              nyugodt és segítőkész, hogy mire leesik, mi történik, már az SMS-kódot olvassuk fel.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-cream/80">
              A csaló nem azt keresi, aki buta. Azt keresi, aki épp fáradt. Siet. Aggódik a gyerekéért.
              Segíteni akar. Ezért nem az a kérdés, hogy elég okos vagy-e. Az a kérdés, van-e olyan
              rendszered, ami akkor is megfog, amikor épp nem vagy résen.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 3 tűzfal */}
      <section className="py-20 md:py-28 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">A műhely íve</p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-12 max-w-2xl">
              A 3 Mentális Tűzfal, pénzügyi helyzetekre fordítva.
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {firewalls.map((f, i) => (
              <FadeUp key={f.n} delay={0.05 * i}>
                <div className="h-full rounded-xl border border-border/60 bg-card p-7">
                  <p className="font-display text-coral text-sm mb-3">{f.n}</p>
                  <h3 className="font-display text-xl mb-3">{f.title}</h3>
                  <p className="text-ink-soft leading-relaxed">{f.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.1}>
            <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="font-display text-2xl md:text-3xl leading-tight mb-5">
                  Aztán jön a fő rész: előveszed a telefonodat.
                </h3>
                <p className="text-ink-soft leading-relaxed mb-4">
                  Végigmegyünk a banki értesítéseken, a limiteken, a kétlépcsős azonosításon, a virtuális
                  kártyákon, és azon, hogyan lehet úgy rétegezni a pénzügyeidet, hogy egy hiba ára korlátozott
                  legyen. Hét emberrel ez tényleg megy: aki elakad, ahhoz odaülök.
                </p>
                <p className="text-ink-soft leading-relaxed">
                  (A telefonodhoz nem nyúlok, te kattintasz. Jelszót, PIN-t senki nem mond ki. Ez is a
                  tananyag része.)
                </p>
              </div>
              <div className="rounded-xl bg-cream border border-border/60 p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-coral-deep mb-4">Amit hazaviszel</p>
                <ul className="space-y-3">
                  {takeaways.map((t) => (
                    <li key={t} className="flex gap-3 leading-relaxed">
                      <Check className="h-5 w-5 text-coral shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Kinek / ki */}
      <section className="py-20 md:py-28 px-6 bg-cream border-y border-border/50">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-4">Kinek szól</p>
            <p className="text-lg leading-relaxed">
              Annak, aki egyszerre három irányba aggódik: a saját pénzéért, a gyerekeiért, akik már az első
              bankkártyájukat nyomkodják, és a szüleiért, akiket a „bank biztonsági osztálya” hív fel. Aki a
              családban „érti a telefont”, és akit felhívnak, ha baj van. Csak neki senki nem mutatta meg
              rendesen.
            </p>
            <p className="text-ink-soft leading-relaxed mt-4">
              Nem kell hozzá informatikusnak lenned. És nem kell szégyellned, ha veled vagy a családodban már
              megtörtént. Sőt, arról is fogunk beszélni.
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-4">Ki tartja</p>
            <p className="font-display text-2xl mb-3">Kemenes Andrea Sophie</p>
            <p className="text-lg leading-relaxed">
              Hét évig voltam Information & Cyber Security Engagement Lead egy norvég multinál, közel
              harmincezer ember biztonsági döntéseiért feleltem. Előtte 15 évig tréner voltam. A 3 Mentális
              Tűzfal ebből a két világból született.
            </p>
          </FadeUp>
        </div>
      </section>

      <RegistrationSection availability={availability} />

      {/* Gyakorlati infók */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <FadeUp>
            <h2 className="font-display text-2xl md:text-3xl mb-2">Gyakorlati tudnivalók</h2>
          </FadeUp>
          <FadeUp delay={0.05}>
            <dl className="grid sm:grid-cols-[180px_1fr] gap-x-6 gap-y-5 leading-relaxed">
              <dt className="font-medium">Helyszín</dt>
              <dd className="text-ink-soft">
                Roomli, 8000 Székesfehérvár, Károly János u. 1. Egy kicsi, utcáról nyíló szoba.
              </dd>
              <dt className="font-medium">Mit hozz</dt>
              <dd className="text-ink-soft">
                Feltöltött telefont, és hogy be tudj lépni a banki appodba. A belépési adatokat fejben hozd,
                ne papíron.
              </dd>
              <dt className="font-medium">Macskák</dt>
              <dd className="text-ink-soft">
                A Roomliban két macska lakik, szabadon járnak-kelnek. Ha allergiás vagy, jelezd a
                megjegyzésben.
              </dd>
              <dt className="font-medium">Október 7-8.</dt>
              <dd className="text-ink-soft">
                Ez egy csoport, két esti alkalommal (szerda és csütörtök, 18:00-20:00). Ugyanaz a tartalom,
                mint a hétvégi időpontokon, csak két részletben.
              </dd>
              <dt className="font-medium">Számla</dt>
              <dd className="text-ink-soft">
                A fizetéskor megadott számlázási adatokra állítom ki, emailben küldöm.
              </dd>
              <dt className="font-medium">Ha közbejön valami</dt>
              <dd className="text-ink-soft">
                Az időpontod átfoglalható egy másik alkalomra. Írj az{" "}
                <a className="underline hover:text-coral" href="mailto:info@criticalthinking.hu">
                  info@criticalthinking.hu
                </a>{" "}
                címre, és egyeztetünk.
              </dd>
              <dt className="font-medium">Keretek</dt>
              <dd className="text-ink-soft">
                Nem banki, befektetési vagy jogi tanácsadás. Szolgáltatót nem reklámozunk, a gondolkodásmódot
                tanuljuk meg.
              </dd>
            </dl>
          </FadeUp>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}

// Naptárba tétel a köszönőoldalon (a success_url `idopont` paraméteréből).
// Időpontok UTC-ben: október elején Budapest = UTC+2.
const CALENDAR_LOCATION = "Roomli, 8000 Székesfehérvár, Károly János u. 1.";
const CALENDAR_DETAILS =
  "Online Pénzügyi Önvédelem workshop (criticalthinking.hu). Hozz feltöltött telefont, és hogy be tudj lépni a banki appodba (a belépési adatokat fejben, ne papíron). Ha közbejön valami: info@criticalthinking.hu";
const CALENDAR_EVENTS: Record<string, { title: string; start: string; end: string }[]> = {
  okt03: [{ title: "Online Pénzügyi Önvédelem workshop", start: "20261003T090000Z", end: "20261003T130000Z" }],
  okt04: [{ title: "Online Pénzügyi Önvédelem workshop", start: "20261004T090000Z", end: "20261004T130000Z" }],
  okt0708: [
    { title: "Online Pénzügyi Önvédelem workshop (1/2)", start: "20261007T160000Z", end: "20261007T180000Z" },
    { title: "Online Pénzügyi Önvédelem workshop (2/2)", start: "20261008T160000Z", end: "20261008T180000Z" },
  ],
};

function googleCalendarUrl(e: { title: string; start: string; end: string }) {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${e.start}/${e.end}`,
    details: CALENDAR_DETAILS,
    location: CALENDAR_LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

function icsEscape(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

function downloadIcs(dateId: string) {
  const events = CALENDAR_EVENTS[dateId] ?? [];
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//criticalthinking.hu//workshop//HU", "CALSCALE:GREGORIAN"];
  for (const e of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${dateId}-${e.start}@criticalthinking.hu`,
      `DTSTAMP:${e.start}`,
      `DTSTART:${e.start}`,
      `DTEND:${e.end}`,
      `SUMMARY:${icsEscape(e.title)}`,
      `LOCATION:${icsEscape(CALENDAR_LOCATION)}`,
      `DESCRIPTION:${icsEscape(CALENDAR_DETAILS)}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "penzugyi-onvedelem-workshop.ics";
  a.click();
  URL.revokeObjectURL(url);
}

function StatusBanner({
  status,
  dateId,
  onClose,
}: {
  status: "siker" | "megszakitva";
  dateId: string | null;
  onClose: () => void;
}) {
  const ok = status === "siker";
  const events = dateId ? CALENDAR_EVENTS[dateId] : undefined;
  return (
    <div className="fixed top-16 inset-x-0 z-40 px-6 pt-4">
      <div
        className={`relative mx-auto max-w-3xl rounded-xl pl-6 pr-12 py-4 shadow-lg border ${
          ok ? "bg-ink text-cream border-ink" : "bg-card text-foreground border-border"
        }`}
        role="status"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Bezárás"
          className="absolute top-3 right-3 rounded-full p-1.5 opacity-70 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
        {ok ? (
          <div className="space-y-3">
            <p className="leading-relaxed">
              <strong className="font-display">Megvan a helyed, köszönöm!</strong> A nyugtát az időponttal
              emailben is megkapod. Ha nem látod, nézd meg a Promóciók vagy a Spam mappát is.
            </p>
            {events && (
              <div className="flex flex-wrap gap-2">
                {events.map((e, i) => (
                  <a
                    key={e.start}
                    href={googleCalendarUrl(e)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-coral px-4 py-2 text-sm font-medium text-cream hover:bg-coral-deep transition-colors"
                  >
                    <CalendarPlus className="h-4 w-4" />
                    {events.length > 1 ? `Google Naptárba (${i + 1}. alkalom)` : "Google Naptárba"}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => dateId && downloadIcs(dateId)}
                  className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-4 py-2 text-sm font-medium text-cream hover:border-cream transition-colors"
                >
                  <CalendarPlus className="h-4 w-4" />
                  Apple / Outlook naptár (.ics)
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="leading-relaxed">
            A fizetés megszakadt, nem terheltünk semmit. Ha közben elbizonytalanodtál valamiben, írj az{" "}
            <a className="underline" href="mailto:info@criticalthinking.hu">
              info@criticalthinking.hu
            </a>{" "}
            címre.
          </p>
        )}
      </div>
    </div>
  );
}

function priceLabel(earlyBird: boolean | undefined) {
  if (earlyBird === false) return { single: "14 900 Ft", note: "Normál jegy" };
  return { single: "11 900 Ft", note: `Early bird ${EARLY_BIRD_DEADLINE}-ig (utána 14 900 Ft)` };
}

function RegistrationSection({ availability }: { availability: Availability | null }) {
  const dates = availability?.dates ?? FALLBACK_DATES;
  const price = priceLabel(availability?.earlyBird);

  const [date, setDate] = useState<string>("");
  const [ticket, setTicket] = useState<"egy" | "paros">("egy");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const seatsNeeded = ticket === "paros" ? 2 : 1;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    if (!date) {
      setError("Válassz időpontot.");
      return;
    }
    const body = new URLSearchParams();
    body.set("action", "checkout");
    body.set("date", date);
    body.set("ticket", ticket === "paros" ? "paros" : "normal");
    for (const key of ["name", "email", "phone", "partner_name", "partner_email", "bank", "phone_os", "note"]) {
      body.set(key, String(form.get(key) ?? ""));
    }

    setSubmitting(true);
    try {
      // urlencoded body: "simple" CORS kérés, nincs preflight a Make webhook felé.
      const res = await fetch(API_URL, { method: "POST", body });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.url) {
        window.location.href = data.url;
        return;
      }
      if (res.status === 409) {
        setError(
          "Erre az időpontra már nincs elég szabad hely (vagy hiányzik egy kötelező adat). Válassz másik időpontot, vagy írj az info@criticalthinking.hu címre.",
        );
      } else {
        setError("Most nem sikerült elindítani a fizetést. Próbáld újra pár perc múlva, vagy írj az info@criticalthinking.hu címre.");
      }
    } catch {
      setError("Most nem sikerült elindítani a fizetést. Próbáld újra pár perc múlva, vagy írj az info@criticalthinking.hu címre.");
    }
    setSubmitting(false);
  }

  const inputClass =
    "w-full rounded-lg border border-input bg-card px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral";

  return (
    <section id="jelentkezes" className="py-20 md:py-28 px-6 scroll-mt-16">
      <div className="mx-auto max-w-3xl">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">Jelentkezés</p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-4">
            Válassz időpontot. <span className="accent-mark">Mindegyik ugyanaz a tartalom.</span>
          </h2>
          <p className="text-ink-soft leading-relaxed mb-10">
            Alkalmanként legfeljebb 7 fő. A helyed a fizetéssel lesz biztos, utána azonnal jön a visszaigazolás
            és a naptármeghívó.
          </p>
        </FadeUp>

        <form onSubmit={onSubmit} className="space-y-10">
          <fieldset>
            <legend className="font-display text-lg mb-4">1. Időpont</legend>
            <div className="grid gap-3">
              {dates.map((d) => {
                const full = !d.open || (d.left >= 0 && d.left < seatsNeeded);
                const selected = date === d.id;
                return (
                  <label
                    key={d.id}
                    className={`flex items-center justify-between gap-4 rounded-xl border px-5 py-4 transition-colors ${
                      full
                        ? "opacity-50 cursor-not-allowed border-border/60"
                        : selected
                          ? "border-coral bg-coral-soft/40 cursor-pointer"
                          : "border-border/60 bg-card hover:border-coral cursor-pointer"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="date"
                        value={d.id}
                        disabled={full}
                        checked={selected}
                        onChange={() => setDate(d.id)}
                        className="accent-[var(--coral)] h-4 w-4"
                      />
                      <span className="font-medium">{d.label}</span>
                    </span>
                    <span className="text-sm text-ink-soft whitespace-nowrap">
                      {d.left < 0 ? "" : full ? "Betelt" : `${d.left} szabad hely`}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-display text-lg mb-4">2. Jegy</legend>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: "egy" as const, title: `1 fő · ${price.single}`, sub: price.note },
                {
                  id: "paros" as const,
                  title: "Páros jegy · 24 900 Ft",
                  sub: "2 fő. Hozd el anyukádat, apukádat, a párodat vagy a nagykamasz gyerekedet.",
                },
              ].map((t) => (
                <label
                  key={t.id}
                  className={`rounded-xl border px-5 py-4 cursor-pointer transition-colors ${
                    ticket === t.id ? "border-coral bg-coral-soft/40" : "border-border/60 bg-card hover:border-coral"
                  }`}
                >
                  <span className="flex items-center gap-3 mb-1">
                    <input
                      type="radio"
                      name="ticket"
                      value={t.id}
                      checked={ticket === t.id}
                      onChange={() => setTicket(t.id)}
                      className="accent-[var(--coral)] h-4 w-4"
                    />
                    <span className="font-medium">{t.title}</span>
                  </span>
                  <span className="block text-sm text-ink-soft pl-7">{t.sub}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-display text-lg mb-4">3. Adataid</legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm mb-1.5">Név *</span>
                <input name="name" required autoComplete="name" className={inputClass} />
              </label>
              <label className="block">
                <span className="block text-sm mb-1.5">Email *</span>
                <input name="email" type="email" required autoComplete="email" className={inputClass} />
              </label>
              <label className="block">
                <span className="block text-sm mb-1.5">Telefonszám *</span>
                <input name="phone" type="tel" required autoComplete="tel" className={inputClass} />
              </label>
              <label className="block">
                <span className="block text-sm mb-1.5">Milyen telefonod van?</span>
                <select name="phone_os" className={inputClass} defaultValue="">
                  <option value="">Válassz</option>
                  <option>iPhone</option>
                  <option>Android</option>
                  <option>Nem tudom</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="block text-sm mb-1.5">Melyik bank(ok) appját használod?</span>
                <input name="bank" placeholder="pl. OTP, Revolut" className={inputClass} />
                <span className="block text-xs text-ink-soft mt-1.5">
                  Csak azért kérdezem, hogy előre felkészüljek a beállításokból. Semmilyen belépési adatot nem kérek.
                </span>
              </label>
            </div>

            {ticket === "paros" && (
              <div className="grid sm:grid-cols-2 gap-4 rounded-xl bg-cream border border-border/60 p-5">
                <label className="block">
                  <span className="block text-sm mb-1.5">A társad neve *</span>
                  <input name="partner_name" required className={inputClass} />
                </label>
                <label className="block">
                  <span className="block text-sm mb-1.5">A társad emailje (ha van)</span>
                  <input name="partner_email" type="email" className={inputClass} />
                </label>
              </div>
            )}

            <label className="block">
              <span className="block text-sm mb-1.5">Megjegyzés (allergia, kérdés, egy eset, ami motoszkál benned)</span>
              <textarea name="note" rows={3} className={inputClass} />
            </label>

            <label className="flex items-start gap-3 text-sm text-ink-soft leading-relaxed">
              <input type="checkbox" required className="accent-[var(--coral)] h-4 w-4 mt-1" />
              <span>
                Hozzájárulok, hogy a megadott adataimat Kemenes Andrea Sophie a workshop szervezéséhez és a számla
                kiállításához kezelje. Harmadik félnek nem adja tovább, a fizetést a Stripe bonyolítja. *
              </span>
            </label>
          </fieldset>

          {error && (
            <p role="alert" className="rounded-lg border border-coral/50 bg-coral-soft/40 px-4 py-3 text-sm">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-coral text-cream font-medium hover:bg-coral-deep transition-colors disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Tovább a fizetéshez
              {!submitting && <ArrowRight className="h-4 w-4" />}
            </button>
            <span className="text-sm text-ink-soft">Biztonságos bankkártyás fizetés a Stripe-on keresztül.</span>
          </div>
        </form>
      </div>
    </section>
  );
}
