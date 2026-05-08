import Image from 'next/image';

import { Icon } from '@/components/ui/Icon';
import type { AboutStat } from '@/types/site-content';

type SuccessStoriesSectionProps = {
  successTitle: string;
  successSector: string;
  successHeadline: string;
  successDescription: string;
  successButtonLabel: string;
  successImage: string;
  stats: AboutStat[];
};

export function SuccessStoriesSection({
  successTitle,
  successSector,
  successHeadline,
  successDescription,
  successButtonLabel,
  successImage,
  stats
}: SuccessStoriesSectionProps) {
  return (
    <section>
      <h2 className="mb-6 border-b border-border pb-3 text-headline-lg text-primary">{successTitle}</h2>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
        <article className="relative overflow-hidden rounded border border-primary/20 md:col-span-2">
          <Image
            src={successImage}
            alt={successHeadline}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/85" />

          <div className="relative z-10 flex min-h-[390px] flex-col justify-end p-8 text-white lg:p-10">
            <p className="mb-3 font-mono text-sm tracking-wide text-white/75">{successSector}</p>
            <h3 className="mb-4 text-headline-lg">{successHeadline}</h3>
            <p className="mb-7 max-w-2xl text-body-lg text-white/85">{successDescription}</p>
            <button type="button" className="w-fit rounded border border-white bg-white px-6 py-3 text-label-md text-primary hover:bg-light">
              {successButtonLabel}
            </button>
          </div>
        </article>

        <div className="flex flex-col gap-gutter">
          {stats.map((stat, index) => (
            <article key={stat.label} className="card-shell flex h-full min-h-[185px] flex-col justify-center p-8">
              <Icon name={index === 0 ? 'speed' : 'shield'} className="mb-4 h-10 w-10 text-primary" />
              <p className="text-headline-xl text-primary">{stat.value}</p>
              <p className="mt-3 max-w-xs text-body-md text-muted">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
