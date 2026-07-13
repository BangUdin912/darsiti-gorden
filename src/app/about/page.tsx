import Hero from "src/components/about/Hero";
import CompanyStory from "src/components/about/CompanyStory";

import VisionMission from "src/components/about/VisionMission";
import Values from "src/components/about/Values";
import WorkProcess from "src/components/about/WorkProcess";
import Coverage from "src/components/about/Coverage";

import CTA from "src/components/about/CTA";

export default function AboutPage() {
  return (
    <>
      <Hero />
      <CompanyStory />

      <VisionMission />
      <Values />
      <WorkProcess />
      <Coverage />

      <CTA />
    </>
  );
}