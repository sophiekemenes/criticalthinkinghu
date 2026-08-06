import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { Intro } from "@/components/site/Intro";
import { MentalFirewalls } from "@/components/site/MentalFirewalls";
import { Andrea } from "@/components/site/Andrea";
import { ComingSoon } from "@/components/site/ComingSoon";
import { FactsCarousel } from "@/components/site/FactsCarousel";
import { ContactFooter } from "@/components/site/ContactFooter";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground antialiased">
      <Toaster position="top-center" richColors />
      <SiteHeader />
      <Hero />
      <Intro />
      <MentalFirewalls />
      <Andrea />
      <ComingSoon />
      <FactsCarousel />
      <ContactFooter />
    </main>
  );
}
