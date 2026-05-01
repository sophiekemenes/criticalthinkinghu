import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { Intro } from "@/components/site/Intro";
import { AudienceSelector } from "@/components/site/AudienceSelector";
import { HumanVsAI } from "@/components/site/HumanVsAI";
import { MentalFirewalls } from "@/components/site/MentalFirewalls";
import { Jogsi } from "@/components/site/Jogsi";
import { Andrea } from "@/components/site/Andrea";
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
      <AudienceSelector />
      <HumanVsAI />
      <MentalFirewalls />
      <Jogsi />
      <Andrea />
      <FactsCarousel />
      <ContactFooter />
    </main>
  );
}
