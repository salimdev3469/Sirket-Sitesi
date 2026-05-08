import Link from 'next/link';

import type { FooterContent } from '@/types/site-content';

type SiteFooterProps = {
  footer: FooterContent;
};

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <footer className="section-border bg-white py-section">
      <div className="site-container grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <p className="text-headline-md font-bold text-primary">AKA Yazılım</p>
          <p className="max-w-sm text-body-md text-muted">{footer.description}</p>
          <p className="mt-2 text-body-md text-muted">{footer.copyright}</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-label-md font-semibold uppercase tracking-wide text-primary">{footer.legalTitle}</p>
          {footer.legalLinks.map((item) => (
            <Link key={item.label} href={item.href} className="text-body-md text-muted hover:text-primary">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-label-md font-semibold uppercase tracking-wide text-primary">{footer.navigationTitle}</p>
          {footer.navigationLinks.map((item) => (
            <Link key={item.label} href={item.href} className="text-body-md text-muted hover:text-primary">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="lg:col-span-2 flex flex-col gap-3">
          <p className="text-label-md font-semibold uppercase tracking-wide text-primary">{footer.officeTitle}</p>
          <p className="text-body-md text-muted">
            {footer.officeLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < footer.officeLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
