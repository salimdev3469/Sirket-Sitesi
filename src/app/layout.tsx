import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: 'AKA Yazılım | Yazılım Mühendisliğinde Hassasiyet',
    template: '%s | AKA Yazılım'
  },
  description:
    'AKA Yazılım, güvenilir ve üretim odaklı bir mühendislik yaklaşımıyla web, mobil ve kurumsal yazılım çözümleri geliştirir.',
  keywords: ['AKA Yazılım', 'yazılım geliştirme', 'web geliştirme', 'mobil uygulama', 'kurumsal yazılım']
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
