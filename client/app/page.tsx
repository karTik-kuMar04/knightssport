"use client";

import Footer from "@/components/Footer";
import TopAssetsGrid from "@/components/TopGrid";
import HeroSection from "@/components/HeroSection";
import BlueprintStats from "@/components/BlueprintState";
import RegistrationDivisions from "@/components/RegistrationDivisions";
import PlayerPerks from "@/components/PlayerPerks";
import OrganizerCredentials from "@/components/OrganizerCredentials";

export default function Home() {
  return (
    <>
      <main className="flex-1 bg-background selection:bg-accent selection:text-white">
        <TopAssetsGrid />
        <HeroSection />
        <BlueprintStats />
        <RegistrationDivisions />
        <PlayerPerks />
        <OrganizerCredentials />
      </main>
      <Footer />
    </>
  );
}