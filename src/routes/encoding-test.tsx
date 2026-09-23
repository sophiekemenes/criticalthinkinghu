import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/encoding-test")({
  head: () => ({
    meta: [
      { title: "encoding test — criticalthinking.hu" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EncodingTest,
});

function EncodingTest() {
  return (
    <main className="bg-background text-foreground antialiased">
      <div className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="font-display text-3xl mb-4">Kódolás-teszt oldal</h1>
        <p>Teszt szöveg ékezetekkel: áéíóöőúüű, ÁÉÍÓÖŐÚÜŰ.</p>
        <p>Kincsestérkép, Bemutatkozás, Újratervezés.</p>
        <p>Már majdnem ott vagy. Add meg az email címed, és irány a biztonságos fizetőoldal.</p>
        <p>Mégsem.</p>
      </div>
    </main>
  );
}
