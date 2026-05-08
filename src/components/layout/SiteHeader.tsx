'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import type { SiteContent } from '@/types/site-content';

type SiteHeaderProps = {
  currentPage: 'home' | 'projects';
  navigation: SiteContent['navigation'];
};

export function SiteHeader({ currentPage, navigation }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-white">
      <div className="site-container">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center text-primary" aria-label="AKA Yazılım ana sayfa">
            <Image
              src="/images/logo-aka.png"
              alt="AKA Yazılım logosu"
              width={144}
              height={72}
              priority
              className="h-10 w-auto sm:h-11"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.items.map((item) => {
              const isActive = item.href === '/projects' && currentPage === 'projects';

              return (
                <Link key={item.label} href={item.href} className={`nav-link ${isActive ? 'nav-link-active' : ''}`}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link href="/#contact" className="primary-button px-5 py-2.5">
              {navigation.ctaLabel}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded border border-primary/30 px-3 py-2 text-label-md font-semibold text-primary md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Menüyü aç kapa"
          >
            Menü
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-border py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {navigation.items.map((item) => {
                const isActive = item.href === '/projects' && currentPage === 'projects';

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`rounded px-2 py-1 text-body-md ${isActive ? 'bg-light text-primary' : 'text-muted'}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/#contact"
                className="primary-button mt-2"
                onClick={() => setMobileOpen(false)}
              >
                {navigation.ctaLabel}
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
