import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { Tension } from "@/components/site/Tension";
import { Familiar } from "@/components/site/Familiar";
import { Thoughts } from "@/components/site/Thoughts";
import { OnStage } from "@/components/site/OnStage";
import { Method } from "@/components/site/Method";
import { About } from "@/components/site/About";
import { ForOrganisations } from "@/components/site/ForOrganisations";
import { Closing } from "@/components/site/Closing";
import { CatCameo } from "@/components/site/CatCameo";
import { ContactFooter } from "@/components/site/ContactFooter";

const TITLE = "CriticalThinking.hu — Tiszta gondolkodás. Saját döntés.";
const DESCRIPTION =
  "Az emberi ítélőképesség a kockázat, az információ és a technológia világában. Cikkek, előadások és gyakorlati módszerek Kemenes Andrea Sophie-tól.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground antialiased">
      <Toaster position="top-center" richColors />
      <SiteHeader />
      <Hero />
      <Tension />
      <Familiar />
      <Thoughts />
      <OnStage />
      <Method />
      <About />
      <ForOrganisations />
      <Closing />
      <ContactFooter />
      <CatCameo />
    </main>
  );
}
