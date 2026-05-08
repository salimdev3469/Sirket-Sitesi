import Link from 'next/link';

import { Icon } from '@/components/ui/Icon';
import type { InsightContent } from '@/types/site-content';

type InsightsSectionProps = {
  insights: InsightContent;
};

export function InsightsSection({ insights }: InsightsSectionProps) {
  return (
    <section className="section-border section-spacer bg-light/70">
      <div className="site-container">
        <div className="reveal-soft mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
          <h2 className="text-headline-lg text-primary">{insights.sectionTitle}</h2>
          <Link href="#" className="inline-flex items-center gap-2 text-label-md text-primary hover:underline">
            {insights.ctaLabel}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-1 gap-gutter md:grid-cols-4">
          <article className="reveal-soft-delay-1 card-shell group flex flex-col justify-between p-8 md:col-span-2 md:row-span-2">
            <div>
              <p className="mb-3 text-label-md uppercase text-subtle">{insights.featuredLabel}</p>
              <h3 className="text-headline-lg text-primary transition-colors group-hover:text-primary/80">
                {insights.featuredTitle}
              </h3>
            </div>
            <p className="text-body-md text-muted">{insights.featuredDescription}</p>
          </article>

          <article className="reveal-soft-delay-2 card-shell group flex flex-col justify-between p-8 md:col-span-2">
            <div>
              <p className="mb-3 text-label-md uppercase text-subtle">{insights.blogLabel}</p>
              <h3 className="text-headline-md text-primary transition-colors group-hover:text-primary/80">
                {insights.blogTitle}
              </h3>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 text-label-md text-muted">
              <Icon name="calendar" className="h-4 w-4" />
              {insights.blogDate}
            </p>
          </article>

          <article className="reveal-soft-delay-3 card-shell flex flex-col justify-between border-primary bg-primary p-8 text-white md:col-span-1">
            <h3 className="text-headline-md">{insights.reportTitle}</h3>
            <Link href="#" className="inline-flex items-center gap-2 text-label-md hover:underline">
              {insights.reportCtaLabel}
              <Icon name="download" className="h-4 w-4" />
            </Link>
          </article>

          <article className="reveal-soft-delay-3 card-shell group flex flex-col justify-between p-8 md:col-span-1">
            <div>
              <p className="mb-3 text-label-md uppercase text-subtle">{insights.caseStudyLabel}</p>
              <h3 className="text-headline-md text-primary transition-colors group-hover:text-primary/80">
                {insights.caseStudyTitle}
              </h3>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
