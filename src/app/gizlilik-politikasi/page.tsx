import type { Metadata } from 'next';

import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { getSiteContent } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'AKA Yazılım web sitesi için gizlilik, kişisel veri işleme ve fikri mülkiyet bilgileri.'
};

export default async function PrivacyPolicyPage() {
  const content = await getSiteContent();

  return (
    <>
      <SiteHeader currentPage="home" navigation={content.navigation} />

      <main className="site-container pb-section pt-36">
        <section className="mx-auto max-w-4xl">
          <div className="mb-10 border-b border-border pb-6">
            <p className="text-label-md uppercase text-subtle">Gizlilik Politikası</p>
            <h1 className="mt-3 text-headline-xl text-primary">AKA Yazılım Gizlilik ve Haklar Politikası</h1>
            <p className="mt-4 text-body-lg text-muted">
              Bu metin, web sitesi üzerinden toplanan kişisel verilerin nasıl işlendiğini, hangi durumlarda saklandığını
              ve hangi haklara sahip olduğunu açıklar. Ayrıca AKA Yazılım&apos;a ait marka, tasarım, görsel ve içerik
              unsurlarının korunmasına ilişkin temel kuralları da belirtir.
            </p>
          </div>

          <div className="grid gap-8">
            <section className="card-shell p-6">
              <h2 className="text-headline-md text-primary">1. Veri Sorumlusu ve Kapsam</h2>
              <p className="mt-4 text-body-md leading-7 text-muted">
                Bu web sitesinde kişisel verilerin işlenmesine ilişkin veri sorumlusu AKA Yazılım&apos;dır. Politika,
                web sitesi, iletişim formu, teklif talepleri ve site üzerinden yürütülen temel etkileşimler için
                geçerlidir.
              </p>
            </section>

            <section className="card-shell p-6">
              <h2 className="text-headline-md text-primary">2. Toplanan Veriler</h2>
              <p className="mt-4 text-body-md leading-7 text-muted">
                Site üzerinden yalnızca iletişim ve teklif süreçleri için gerekli olan bilgiler toplanır. Bunlar ad
                soyad, e-posta, telefon, firma adı ve mesaj içeriği olabilir. Zorunlu olmayan alanları boş bırakabilirsin.
              </p>
            </section>

            <section className="card-shell p-6">
              <h2 className="text-headline-md text-primary">3. Verilerin Kullanım Amacı</h2>
              <p className="mt-4 text-body-md leading-7 text-muted">
                Kişisel veriler; teklif vermek, geri dönüş sağlamak, proje değerlendirmesi yapmak, müşteri iletişimini
                yürütmek ve hizmet kalitesini iyileştirmek amacıyla işlenir. KVKK aydınlatma yükümlülüğü kapsamında
                kullanıcıya veri sorumlusu, amaç, hukuki sebep ve haklar hakkında bilgi verilir.
              </p>
            </section>

            <section className="card-shell p-6">
              <h2 className="text-headline-md text-primary">4. Saklama ve Paylaşım</h2>
              <p className="mt-4 text-body-md leading-7 text-muted">
                Veriler, yalnızca gerekli olduğu süre boyunca saklanır. Teknik hizmet sağlayıcıları dışında üçüncü
                taraflarla paylaşım yapılmaz; zorunlu hallerde ise yalnızca yasal yükümlülükler ölçüsünde işlem yapılır.
              </p>
            </section>

            <section className="card-shell p-6">
              <h2 className="text-headline-md text-primary">5. Güvenlik</h2>
              <p className="mt-4 text-body-md leading-7 text-muted">
                AKA Yazılım, verileri yetkisiz erişim, kayıp, değiştirme ve kötüye kullanıma karşı korumak için makul
                teknik ve idari tedbirler uygular. Erişimler yetki bazlı sınırlandırılır ve düzenli olarak gözden geçirilir.
              </p>
            </section>

            <section className="card-shell p-6">
              <h2 className="text-headline-md text-primary">6. İlgili Kişi Hakları</h2>
              <p className="mt-4 text-body-md leading-7 text-muted">
                KVKK kapsamında kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep
                etme, düzeltme isteme, silinmesini veya yok edilmesini talep etme ve kanuna aykırı işlemlere karşı
                başvuru hakkın bulunur.
              </p>
            </section>

            <section className="card-shell p-6">
              <h2 className="text-headline-md text-primary">7. Fikri Mülkiyet ve Marka Hakları</h2>
              <p className="mt-4 text-body-md leading-7 text-muted">
                Bu sitedeki logo, marka adı, tasarım, metinler, görseller, kod yapısı ve özel üretim içerikler AKA
                Yazılım&apos;a aittir. Yazılı izin olmadan kopyalanamaz, çoğaltılamaz, yeniden dağıtılamaz veya ticari
                amaçla kullanılamaz. Marka itibarını zedeleyen, taklit eden veya yanıltıcı kullanım şekilleri açıkça
                yasaktır. İhlal halinde AKA Yazılım, ihtar, erişimin sınırlandırılması, telif ve marka hakkı temelli
                başvurular dahil olmak üzere gerekli hukuki yollara başvurabilir.
              </p>
            </section>

            <section className="card-shell p-6">
              <h2 className="text-headline-md text-primary">8. Çerezler ve Teknik Kayıtlar</h2>
              <p className="mt-4 text-body-md leading-7 text-muted">
                Site güvenliği, performans ve temel işlevsellik için zorunlu teknik çerezler veya benzeri kayıtlar
                kullanılabilir. Bu kayıtlar, hizmetin çalışması ve güvenliğinin sağlanması için sınırlı ölçüde tutulur.
              </p>
            </section>

            <section className="card-shell p-6">
              <h2 className="text-headline-md text-primary">9. Değişiklikler</h2>
              <p className="mt-4 text-body-md leading-7 text-muted">
                Bu sayfa, yasal gereklilikler veya hizmet yapısı değiştikçe güncellenebilir. En güncel sürüm her zaman
                bu sayfada yayımlanır.
              </p>
            </section>
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <p className="text-body-md leading-7 text-muted">
              İletişim veya veri talepleri için site üzerinden bizimle iletişime geçebilirsin. Bu metin teknik bir
              şablondur; nihai kullanım öncesinde hukuki kontrol önerilir.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter footer={content.footer} />
    </>
  );
}
