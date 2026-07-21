import PageHeader from "@/components/common/PageHeader";

import CompanyStory from "@/components/about/CompanyStory";
import VisionMission from "@/components/about/VisionMission";
import Values from "@/components/about/Values";
import WorkProcess from "@/components/about/WorkProcess";
import Coverage from "@/components/about/Coverage";
import CTA from "@/components/about/CTA";

export const metadata = {
  title: "Tentang Kami | Darsiti Gorden",
  description:
    "Mengenal lebih dekat Darsiti Gorden sebagai penyedia gorden custom berkualitas untuk rumah, kantor, hotel, apartemen, dan berbagai proyek interior di Purwokerto.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Tentang Darsiti Gorden"
        description="Mengenal lebih dekat Darsiti Gorden sebagai penyedia gorden custom berkualitas untuk rumah, kantor, hotel, apartemen, dan berbagai proyek interior di Purwokerto."
        breadcrumb={[
          {
            label: "Tentang Kami",
          },
        ]}
      />

      <CompanyStory />

      <VisionMission />

      <Values />

      <WorkProcess />

      <Coverage />

      <CTA />
    </>
  );
}