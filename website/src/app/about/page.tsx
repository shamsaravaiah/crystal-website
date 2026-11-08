import SiteShell from "@/components/SiteShell";
import AboutContent from "@/components/AboutContent";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutContent />
    </SiteShell>
  );
}
