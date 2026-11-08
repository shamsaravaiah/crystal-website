import SiteShell from "@/components/SiteShell";
import ContactContent from "@/components/ContactContent";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactContent />
    </SiteShell>
  );
}
