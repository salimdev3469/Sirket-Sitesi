import Image from 'next/image';
import Link from 'next/link';

import type { HeroContent } from '@/types/site-content';

type HeroSectionProps = {
  hero: HeroContent;
};

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="site-container relative grid grid-cols-1 items-center gap-gutter overflow-hidden pt-36 pb-16 lg:grid-cols-2 lg:pb-section">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative w-[72%] min-w-[280px] max-w-[840px] -translate-x-[14%] md:-translate-x-[20%]">
          <Image
            src="/images/logo-aka.png"
            alt=""
            width={800}
            height={800}
            className="h-auto w-full origin-left object-contain opacity-[0.09] transform-gpu drop-shadow-[0_18px_36px_rgba(13,40,71,0.16)] [transform:perspective(1600px)_rotateY(18deg)_rotateX(3deg)_scale(1.02)]"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        <h1 className="reveal-soft max-w-xl text-headline-xl text-primary">{hero.headline}</h1>
        <p className="reveal-soft-delay-1 max-w-2xl text-body-lg text-muted">{hero.description}</p>
        <div className="reveal-soft-delay-2 flex flex-col gap-4 sm:flex-row">
          <Link href="/#contact" className="primary-button px-8 py-4">
            {hero.primaryCtaLabel}
          </Link>
          <Link href="/#expertise" className="secondary-button px-8 py-4">
            {hero.secondaryCtaLabel}
          </Link>
        </div>
      </div>

      <div className="reveal-soft-delay-3 card-shell relative z-10 flex h-[320px] items-center justify-center bg-light p-8 sm:h-[400px]">
        <Image
          src={hero.imageSrc}
          alt={hero.imageAlt}
          width={640}
          height={315}
          priority
          className="h-auto w-full max-w-[620px] object-contain"
        />
      </div>
    </section>
  );
}
