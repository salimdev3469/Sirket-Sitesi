import type { ProjectsIntroContent } from '@/types/site-content';

type ProjectsIntroSectionProps = {
  intro: ProjectsIntroContent;
};

export function ProjectsIntroSection({ intro }: ProjectsIntroSectionProps) {
  return (
    <section className="mb-16 text-center">
      <h1 className="text-headline-xl text-primary">{intro.title}</h1>
      <p className="mx-auto mt-5 max-w-3xl text-body-lg text-muted">{intro.description}</p>

      <div className="mt-16 flex flex-wrap justify-center gap-3">
        <button type="button" className="rounded border border-primary bg-primary px-6 py-2 text-label-md text-white">
          {intro.allLabel}
        </button>
        <button type="button" className="rounded border border-primary/35 px-6 py-2 text-label-md text-muted hover:bg-light">
          {intro.webLabel}
        </button>
        <button type="button" className="rounded border border-primary/35 px-6 py-2 text-label-md text-muted hover:bg-light">
          {intro.mobileLabel}
        </button>
        <button type="button" className="rounded border border-primary/35 px-6 py-2 text-label-md text-muted hover:bg-light">
          {intro.enterpriseLabel}
        </button>
      </div>
    </section>
  );
}
