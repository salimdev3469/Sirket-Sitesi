import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/components/ui/Icon';
import type { ProjectItem } from '@/types/site-content';

type ProjectGridSectionProps = {
  projects: ProjectItem[];
};

export function ProjectGridSection({ projects }: ProjectGridSectionProps) {
  return (
    <section className="mb-section">
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.title} className="card-shell group flex flex-col overflow-hidden">
            <div className="relative h-48 w-full bg-light">
              <Image src={project.image} alt={project.title} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="mb-2 font-code text-code tracking-wide text-subtle">{project.sector}</p>
              <h3 className="mb-3 text-headline-md text-primary">{project.title}</h3>
              <p className="mb-5 flex-1 text-body-md text-muted">{project.description}</p>
              <Link href="#" className="inline-flex items-center gap-2 text-label-md text-primary hover:underline">
                Detayları Gör
                <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
