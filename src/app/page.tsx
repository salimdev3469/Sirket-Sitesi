import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { AboutSection } from '@/components/sections/home/AboutSection';
import { ContactSection } from '@/components/sections/home/ContactSection';
import { ExpertiseSection } from '@/components/sections/home/ExpertiseSection';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { InsightsSection } from '@/components/sections/home/InsightsSection';
import { getSiteContent } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <>
      <SiteHeader currentPage="home" navigation={content.navigation} />
      <main>
        <HeroSection hero={content.hero} />
        <ExpertiseSection expertise={content.expertise} />
        <AboutSection about={content.about} />
        <InsightsSection insights={content.insights} />
        <ContactSection contact={content.contact} />
      </main>
      <SiteFooter footer={content.footer} />
    </>
  );
}
