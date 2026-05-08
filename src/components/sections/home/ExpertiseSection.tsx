import { Icon } from '@/components/ui/Icon';
import type { ExpertiseContent } from '@/types/site-content';

type ExpertiseSectionProps = {
  expertise: ExpertiseContent;
};

export function ExpertiseSection({ expertise }: ExpertiseSectionProps) {
  return (
    <section id="expertise" className="section-border section-spacer bg-white">
      <div className="site-container">
        <div className="reveal-soft mb-12 text-center">
          <h2 className="text-headline-lg text-primary">{expertise.sectionTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-body-md text-muted">{expertise.sectionDescription}</p>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {expertise.items.map((item, index) => (
            <article
              key={item.title}
              className={`card-shell p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft ${
                index === 0 ? 'reveal-soft-delay-1' : index === 1 ? 'reveal-soft-delay-2' : 'reveal-soft-delay-3'
              }`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded bg-primary text-white">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-headline-md text-primary">{item.title}</h3>
              <p className="text-body-md text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
