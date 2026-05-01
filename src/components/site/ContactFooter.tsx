import { useState } from "react";
import { Crown, Mail, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { FadeUp } from "./FadeUp";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Add meg a neved (legalább 2 karakter)." })
    .max(80, { message: "A név túl hosszú." }),
  email: z
    .string()
    .trim()
    .email({ message: "Érvényes email címet adj meg." })
    .max(160),
  subject: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, { message: "Néhány mondatot írj a megkeresésről." })
    .max(2000, { message: "A szöveg túl hosszú (max 2000 karakter)." }),
});

const RECIPIENT = "hello@criticalthinking.hu";

export function ContactFooter() {
  const [busy, setBusy] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Hibás adat.");
      return;
    }
    setBusy(true);
    const { name, email, subject, message } = parsed.data;
    const body = `Név: ${name}\nEmail: ${email}\n\n${message}`;
    const subj = subject && subject.length > 0 ? subject : "Megkeresés — CriticalThinking.hu";
    const url = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setTimeout(() => setBusy(false), 1500);
    toast.success("Email kliens megnyitva — küldd el az üzenetet!");
  };

  return (
    <footer id="kapcsolat" className="bg-ink text-cream pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-14 pb-20">
          {/* Left side */}
          <div className="lg:col-span-5">
            <FadeUp>
              <div className="flex items-center gap-2 mb-6">
                <Crown className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-[0.25em] text-gold">Beszéljünk</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] mb-6 text-balance">
                Vegyük fel a{" "}
                <span className="italic text-gold-soft">kapcsolatot.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-cream/70 leading-relaxed mb-10">
                Vállalati képzés, AI adoption vagy NIS2 stratégia? Írj néhány sort a
                kihívásról — 2 munkanapon belül válaszolok.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <a
                href={`mailto:${RECIPIENT}`}
                className="inline-flex items-center gap-3 text-cream hover:text-gold transition-colors group"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
                <span className="font-serif italic text-lg group-hover:underline underline-offset-4">
                  {RECIPIENT}
                </span>
              </a>
            </FadeUp>
          </div>

          {/* Form */}
          <FadeUp delay={0.2} className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="bg-cream/[0.04] border border-cream/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Név" name="name" autoComplete="name" required />
                <Field label="Email" name="email" type="email" autoComplete="email" required />
              </div>
              <Field label="Tárgy (opcionális)" name="subject" />
              <FieldArea label="Üzenet" name="message" required rows={5} />

              <div className="flex items-center justify-between gap-4 pt-2">
                <p className="text-xs text-cream/50 leading-relaxed">
                  A „Küldés” gombbal megnyílik az email kliensed az előre kitöltött üzenettel.
                </p>
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-sunset text-cream font-medium hover:opacity-90 transition-opacity disabled:opacity-60 shadow-elegant whitespace-nowrap"
                >
                  Küldés
                  <Send className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </form>
          </FadeUp>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/50">
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <span className="font-serif text-cream/80">
              Critical<span className="italic text-gold">Thinking</span>.hu
            </span>
          </div>
          <p>© {new Date().getFullYear()} Kemenes Andrea Sophie · Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-cream/60 mb-2 block">
        {label}
        {required && <span className="text-terracotta-soft ml-1">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-transparent border-b border-cream/20 focus:border-gold outline-none py-2.5 text-cream placeholder:text-cream/30 transition-colors"
      />
    </label>
  );
}

function FieldArea({
  label,
  name,
  rows = 4,
  required,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-cream/60 mb-2 block">
        {label}
        {required && <span className="text-terracotta-soft ml-1">*</span>}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        className="w-full bg-transparent border border-cream/15 rounded-xl focus:border-gold outline-none p-4 text-cream placeholder:text-cream/30 transition-colors resize-none"
      />
    </label>
  );
}
