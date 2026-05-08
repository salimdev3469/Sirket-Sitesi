import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ProjectGridSection } from '@/components/sections/projects/ProjectGridSection';
import { ProjectsIntroSection } from '@/components/sections/projects/ProjectsIntroSection';
import { SuccessStoriesSection } from '@/components/sections/projects/SuccessStoriesSection';
import { getSiteContent } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const content = await getSiteContent();

  return (
    <>
      <SiteHeader currentPage="projects" navigation={content.navigation} />
      <main className="site-container pb-section pt-32">
        <ProjectsIntroSection intro={content.projects.intro} />
        <ProjectGridSection projects={content.projects.projects} />
        <SuccessStoriesSection
          successTitle={content.projects.successTitle}
          successSector={content.projects.successSector}
          successHeadline={content.projects.successHeadline}
          successDescription={content.projects.successDescription}
          successButtonLabel={content.projects.successButtonLabel}
          successImage={content.projects.successImage}
          stats={content.projects.stats}
        />
      </main>
      <SiteFooter footer={content.footer} />
    </>
  );
}
