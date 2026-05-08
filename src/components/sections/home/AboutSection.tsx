import Image from 'next/image';
import type { AboutContent } from '@/types/site-content';

type AboutSectionProps = {
  about: AboutContent;
};

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="section-border section-spacer bg-white">
      <div className="site-container grid grid-cols-1 items-center gap-gutter lg:grid-cols-12">
        <div className="reveal-soft card-shell overflow-hidden lg:col-span-5">
          <Image
            src={about.imageSrc}
            alt={about.imageAlt}
            width={850}
            height={1100}
            className="h-[500px] w-full object-cover grayscale"
          />
        </div>

        <div className="reveal-soft-delay-1 flex flex-col gap-5 lg:col-span-7 lg:pl-8">
          <h2 className="text-headline-lg text-primary">{about.title}</h2>
          <p className="text-body-lg text-muted">{about.description}</p>

          <div className="mt-3 grid grid-cols-2 gap-4 border-t border-border pt-6">
            {about.stats.map((stat, index) => (
              <div key={stat.label} className={index === 0 ? 'reveal-soft-delay-2' : 'reveal-soft-delay-3'}>
                <p className="text-headline-lg text-primary">{stat.value}</p>
                <p className="mt-2 text-label-md uppercase text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
