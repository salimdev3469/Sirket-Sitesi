'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { ContactInboxItem } from '@/types/contact';
import type { SiteContent } from '@/types/site-content';

type AdminPanelProps = {
  initialContent: SiteContent;
  initialMessages: ContactInboxItem[];
};

function updateArrayItem<T>(items: T[], index: number, patch: Partial<T>) {
  return items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item));
}

export function AdminPanel({ initialContent, initialMessages }: AdminPanelProps) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [messages, setMessages] = useState<ContactInboxItem[]>(initialMessages);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRefreshingMessages, setIsRefreshingMessages] = useState(false);
  const router = useRouter();

  const latestMessageCount = messages.length;

  async function saveContent() {
    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });

      const rawBody = await response.text();
      let data: { ok?: boolean; message?: string } = {};

      if (rawBody) {
        try {
          data = JSON.parse(rawBody) as { ok?: boolean; message?: string };
        } catch {
          data = { message: rawBody };
        }
      }

      setMessage(
        data.message || (response.ok ? 'İçerik güncellendi.' : `Kaydetme başarısız: ${response.status} ${response.statusText}`)
      );
    } catch {
      setMessage('Kaydetme sırasında ağ hatası oluştu.');
    } finally {
      setIsSaving(false);
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  async function uploadImage(file: File, folder: string, applyUrl: (url: string) => void) {
    setIsUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData
      });

      const rawBody = await response.text();
      let data: { ok?: boolean; message?: string; url?: string } = {};

      if (rawBody) {
        try {
          data = JSON.parse(rawBody) as { ok?: boolean; message?: string; url?: string };
        } catch {
          data = { message: rawBody };
        }
      }

      if (!response.ok || !data.url) {
        setMessage(data.message || `Yükleme başarısız: ${response.status} ${response.statusText}`);
        return;
      }

      applyUrl(data.url);
      setMessage(data.message || 'Görsel yüklendi.');
    } catch {
      setMessage('Görsel yüklenirken ağ hatası oluştu.');
    } finally {
      setIsUploading(false);
    }
  }

  async function refreshMessages() {
    setIsRefreshingMessages(true);

    try {
      const response = await fetch('/api/admin/contact-submissions', {
        cache: 'no-store'
      });
      const rawBody = await response.text();
      let data: { ok?: boolean; message?: string; messages?: ContactInboxItem[] } = {};

      if (rawBody) {
        try {
          data = JSON.parse(rawBody) as { ok?: boolean; message?: string; messages?: ContactInboxItem[] };
        } catch {
          data = { message: rawBody };
        }
      }

      if (!response.ok || !Array.isArray(data.messages)) {
        setMessage(data.message || `Mesajlar yenilenemedi: ${response.status} ${response.statusText}`);
        return;
      }

      setMessages(data.messages);
      setMessage(data.message || 'Mesaj kutusu yenilendi.');
    } catch {
      setMessage('Mesajlar yenilenirken ağ hatası oluştu.');
    } finally {
      setIsRefreshingMessages(false);
    }
  }

  return (
    <div className="site-container py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-label-md uppercase text-subtle">Admin Paneli</p>
          <h1 className="text-headline-lg text-primary">Site İçeriği</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="secondary-button px-4 py-2" onClick={refreshMessages} disabled={isRefreshingMessages}>
            {isRefreshingMessages ? 'Mesajlar Yenileniyor...' : `Mesajlar (${latestMessageCount})`}
          </button>
          <button type="button" className="secondary-button px-4 py-2" onClick={logout}>
            Çıkış Yap
          </button>
          <button type="button" className="primary-button px-4 py-2" onClick={saveContent} disabled={isSaving}>
            {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>

      {message ? <p className="mb-6 text-body-md text-muted">{message}</p> : null}

      <div className="grid gap-6">
        <section className="card-shell p-6">
          <h2 className="mb-4 text-headline-md text-primary">Navigasyon</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              CTA Metni
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.navigation.ctaLabel}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    navigation: { ...prev.navigation, ctaLabel: event.target.value }
                  }))
                }
              />
            </label>
            {content.navigation.items.map((item, index) => (
              <div key={`${item.label}-${index}`} className="rounded border border-border p-4">
                <label className="mb-3 flex flex-col gap-2 text-label-md text-primary">
                  Etiket
                  <input
                    className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                    value={item.label}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        navigation: {
                          ...prev.navigation,
                          items: updateArrayItem(prev.navigation.items, index, { label: event.target.value })
                        }
                      }))
                    }
                  />
                </label>
                <label className="flex flex-col gap-2 text-label-md text-primary">
                  Bağlantı
                  <input
                    className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                    value={item.href}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        navigation: {
                          ...prev.navigation,
                          items: updateArrayItem(prev.navigation.items, index, { href: event.target.value })
                        }
                      }))
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="card-shell p-6">
          <h2 className="mb-4 text-headline-md text-primary">Ana Sayfa - Hero</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Başlık
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.hero.headline}
                onChange={(event) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, headline: event.target.value } }))}
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Açıklama
              <textarea
                rows={4}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.hero.description}
                onChange={(event) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, description: event.target.value } }))}
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Birincil Buton
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.hero.primaryCtaLabel}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, hero: { ...prev.hero, primaryCtaLabel: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              İkincil Buton
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.hero.secondaryCtaLabel}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, hero: { ...prev.hero, secondaryCtaLabel: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Görsel URL
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.hero.imageSrc}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, hero: { ...prev.hero, imageSrc: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Dosya Yükle
              <input
                type="file"
                accept="image/*"
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void uploadImage(file, 'site-content/hero', (url) =>
                      setContent((prev) => ({ ...prev, hero: { ...prev.hero, imageSrc: url } }))
                    );
                    event.currentTarget.value = '';
                  }
                }}
                disabled={isUploading}
              />
            </label>
          </div>
        </section>

        <section className="card-shell p-6">
          <h2 className="mb-4 text-headline-md text-primary">Ana Sayfa - Uzmanlık</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Bölüm Başlığı
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.expertise.sectionTitle}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    expertise: { ...prev.expertise, sectionTitle: event.target.value }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Açıklama
              <textarea
                rows={3}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.expertise.sectionDescription}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    expertise: { ...prev.expertise, sectionDescription: event.target.value }
                  }))
                }
              />
            </label>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {content.expertise.items.map((item, index) => (
              <div key={index} className="rounded border border-border p-4">
                <label className="mb-3 flex flex-col gap-2 text-label-md text-primary">
                  Başlık
                  <input
                    className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                    value={item.title}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        expertise: {
                          ...prev.expertise,
                          items: updateArrayItem(prev.expertise.items, index, { title: event.target.value })
                        }
                      }))
                    }
                  />
                </label>
                <label className="mb-3 flex flex-col gap-2 text-label-md text-primary">
                  Açıklama
                  <textarea
                    rows={4}
                    className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                    value={item.description}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        expertise: {
                          ...prev.expertise,
                          items: updateArrayItem(prev.expertise.items, index, { description: event.target.value })
                        }
                      }))
                    }
                  />
                </label>
                <label className="flex flex-col gap-2 text-label-md text-primary">
                  İkon
                  <select
                    className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                    value={item.icon}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        expertise: {
                          ...prev.expertise,
                          items: updateArrayItem(prev.expertise.items, index, {
                            icon: event.target.value as SiteContent['expertise']['items'][number]['icon']
                          })
                        }
                      }))
                    }
                  >
                    <option value="code">code</option>
                    <option value="network">network</option>
                    <option value="cloud">cloud</option>
                  </select>
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="card-shell p-6">
          <h2 className="mb-4 text-headline-md text-primary">Ana Sayfa - Hakkında</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Başlık
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.about.title}
                onChange={(event) => setContent((prev) => ({ ...prev, about: { ...prev.about, title: event.target.value } }))}
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Açıklama
              <textarea
                rows={4}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.about.description}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, about: { ...prev.about, description: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Görsel URL
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.about.imageSrc}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, about: { ...prev.about, imageSrc: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Görsel Alt Metni
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.about.imageAlt}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, about: { ...prev.about, imageAlt: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Dosya Yükle
              <input
                type="file"
                accept="image/*"
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void uploadImage(file, 'site-content/about', (url) =>
                      setContent((prev) => ({ ...prev, about: { ...prev.about, imageSrc: url } }))
                    );
                    event.currentTarget.value = '';
                  }
                }}
                disabled={isUploading}
              />
            </label>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.about.stats.map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="rounded border border-border p-4">
                <label className="mb-3 flex flex-col gap-2 text-label-md text-primary">
                  Değer
                  <input
                    className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                    value={stat.value}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        about: {
                          ...prev.about,
                          stats: updateArrayItem(prev.about.stats, index, { value: event.target.value })
                        }
                      }))
                    }
                  />
                </label>
                <label className="flex flex-col gap-2 text-label-md text-primary">
                  Etiket
                  <input
                    className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                    value={stat.label}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        about: {
                          ...prev.about,
                          stats: updateArrayItem(prev.about.stats, index, { label: event.target.value })
                        }
                      }))
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="card-shell p-6">
          <h2 className="mb-4 text-headline-md text-primary">Ana Sayfa - İçgörüler</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Bölüm Başlığı
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.insights.sectionTitle}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    insights: { ...prev.insights, sectionTitle: event.target.value }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              CTA Metni
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.insights.ctaLabel}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, insights: { ...prev.insights, ctaLabel: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Öne Çıkan Etiket
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.insights.featuredLabel}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, insights: { ...prev.insights, featuredLabel: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Öne Çıkan Başlık
              <textarea
                rows={3}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.insights.featuredTitle}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, insights: { ...prev.insights, featuredTitle: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Blog Başlığı
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.insights.blogTitle}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, insights: { ...prev.insights, blogTitle: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Rapor Başlığı
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.insights.reportTitle}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, insights: { ...prev.insights, reportTitle: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Öne Çıkan Açıklama
              <textarea
                rows={3}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.insights.featuredDescription}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    insights: { ...prev.insights, featuredDescription: event.target.value }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Blog Etiketi
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.insights.blogLabel}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, insights: { ...prev.insights, blogLabel: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Blog Tarihi
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.insights.blogDate}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, insights: { ...prev.insights, blogDate: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Rapor Butonu
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.insights.reportCtaLabel}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, insights: { ...prev.insights, reportCtaLabel: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Vaka Çalışması Etiketi
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.insights.caseStudyLabel}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, insights: { ...prev.insights, caseStudyLabel: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Vaka Çalışması Başlığı
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.insights.caseStudyTitle}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, insights: { ...prev.insights, caseStudyTitle: event.target.value } }))
                }
              />
            </label>
          </div>
        </section>

        <section className="card-shell p-6">
          <h2 className="mb-4 text-headline-md text-primary">Projeler - Giriş</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Başlık
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.projects.intro.title}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, intro: { ...prev.projects.intro, title: event.target.value } }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Tüm Projeler Etiketi
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.projects.intro.allLabel}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, intro: { ...prev.projects.intro, allLabel: event.target.value } }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Web Etiketi
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.projects.intro.webLabel}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, intro: { ...prev.projects.intro, webLabel: event.target.value } }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Mobil Etiketi
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.projects.intro.mobileLabel}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, intro: { ...prev.projects.intro, mobileLabel: event.target.value } }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Kurumsal Etiketi
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.projects.intro.enterpriseLabel}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, intro: { ...prev.projects.intro, enterpriseLabel: event.target.value } }
                  }))
                }
              />
            </label>
          </div>
        </section>

        <section className="card-shell p-6">
          <h2 className="mb-4 text-headline-md text-primary">Projeler - Başarı Hikayeleri</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Başlık
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.projects.successTitle}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, successTitle: event.target.value }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Sektör
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.projects.successSector}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, successSector: event.target.value }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Buton Metni
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.projects.successButtonLabel}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, successButtonLabel: event.target.value }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Başarı Alt Başlık
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.projects.successHeadline}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, successHeadline: event.target.value }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Başarı Açıklama
              <textarea
                rows={3}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.projects.successDescription}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, successDescription: event.target.value }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Başarı Görsel URL
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.projects.successImage}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, successImage: event.target.value }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Dosya Yükle
              <input
                type="file"
                accept="image/*"
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void uploadImage(file, 'site-content/projects/success', (url) =>
                      setContent((prev) => ({
                        ...prev,
                        projects: { ...prev.projects, successImage: url }
                      }))
                    );
                    event.currentTarget.value = '';
                  }
                }}
                disabled={isUploading}
              />
            </label>
          </div>
        </section>

        <section className="card-shell p-6">
          <h2 className="mb-4 text-headline-md text-primary">Ana Sayfa - İletişim</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Başlık
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.title}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, contact: { ...prev.contact, title: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Başlangıç Metni
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.eyebrow}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, contact: { ...prev.contact, eyebrow: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Açıklama
              <textarea
                rows={3}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.description}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, contact: { ...prev.contact, description: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Başarı Mesajı
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.successMessage}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, contact: { ...prev.contact, successMessage: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Gönder Butonu
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.submitLabel}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, contact: { ...prev.contact, submitLabel: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Gönderiliyor Metni
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.sendingLabel}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, contact: { ...prev.contact, sendingLabel: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Ad Soyad Etiketi
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.nameLabel}
                onChange={(event) => setContent((prev) => ({ ...prev, contact: { ...prev.contact, nameLabel: event.target.value } }))}
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Ad Soyad Yer Tutucu
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.namePlaceholder}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, contact: { ...prev.contact, namePlaceholder: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              E-posta Etiketi
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.emailLabel}
                onChange={(event) => setContent((prev) => ({ ...prev, contact: { ...prev.contact, emailLabel: event.target.value } }))}
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              E-posta Yer Tutucu
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.emailPlaceholder}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, contact: { ...prev.contact, emailPlaceholder: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Firma Etiketi
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.companyLabel}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, contact: { ...prev.contact, companyLabel: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Firma Yer Tutucu
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.companyPlaceholder}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, contact: { ...prev.contact, companyPlaceholder: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Telefon Etiketi
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.phoneLabel}
                onChange={(event) => setContent((prev) => ({ ...prev, contact: { ...prev.contact, phoneLabel: event.target.value } }))}
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Telefon Yer Tutucu
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.phonePlaceholder}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, contact: { ...prev.contact, phonePlaceholder: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Mesaj Etiketi
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.messageLabel}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, contact: { ...prev.contact, messageLabel: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Mesaj Yer Tutucu
              <textarea
                rows={3}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.contact.messagePlaceholder}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, contact: { ...prev.contact, messagePlaceholder: event.target.value } }))
                }
              />
            </label>
          </div>
        </section>

        <section className="card-shell p-6">
          <h2 className="mb-4 text-headline-md text-primary">Projeler Sayfası</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Başlık
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.projects.intro.title}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, intro: { ...prev.projects.intro, title: event.target.value } }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Açıklama
              <textarea
                rows={3}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.projects.intro.description}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, intro: { ...prev.projects.intro, description: event.target.value } }
                  }))
                }
              />
            </label>
          </div>

          <div className="mt-6 grid gap-4">
            {content.projects.projects.map((project, index) => (
              <div key={index} className="rounded border border-border p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-label-md text-primary">
                    Sektör
                    <input
                      className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                      value={project.sector}
                      onChange={(event) =>
                        setContent((prev) => ({
                          ...prev,
                          projects: {
                            ...prev.projects,
                            projects: updateArrayItem(prev.projects.projects, index, { sector: event.target.value })
                          }
                        }))
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-label-md text-primary">
                    Başlık
                    <input
                      className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                      value={project.title}
                      onChange={(event) =>
                        setContent((prev) => ({
                          ...prev,
                          projects: {
                            ...prev.projects,
                            projects: updateArrayItem(prev.projects.projects, index, { title: event.target.value })
                          }
                        }))
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
                    Açıklama
                    <textarea
                      rows={3}
                      className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                      value={project.description}
                      onChange={(event) =>
                        setContent((prev) => ({
                          ...prev,
                          projects: {
                            ...prev.projects,
                            projects: updateArrayItem(prev.projects.projects, index, {
                              description: event.target.value
                            })
                          }
                        }))
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
                    Görsel URL
                    <input
                      className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                      value={project.image}
                      onChange={(event) =>
                        setContent((prev) => ({
                          ...prev,
                          projects: {
                            ...prev.projects,
                            projects: updateArrayItem(prev.projects.projects, index, { image: event.target.value })
                          }
                        }))
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
                    Dosya Yükle
                    <input
                      type="file"
                      accept="image/*"
                      className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          void uploadImage(file, `site-content/projects/${index}`, (url) =>
                            setContent((prev) => ({
                              ...prev,
                              projects: {
                                ...prev.projects,
                                projects: updateArrayItem(prev.projects.projects, index, { image: url })
                              }
                            }))
                          );
                          event.currentTarget.value = '';
                        }
                      }}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.projects.stats.map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="rounded border border-border p-4">
                <label className="mb-3 flex flex-col gap-2 text-label-md text-primary">
                  Değer
                  <input
                    className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                    value={stat.value}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        projects: {
                          ...prev.projects,
                          stats: updateArrayItem(prev.projects.stats, index, { value: event.target.value })
                        }
                      }))
                    }
                  />
                </label>
                <label className="flex flex-col gap-2 text-label-md text-primary">
                  Açıklama
                  <textarea
                    rows={3}
                    className="rounded border border-border px-3 py-2 text-body-md outline-none focus:border-primary"
                    value={stat.label}
                    onChange={(event) =>
                      setContent((prev) => ({
                        ...prev,
                        projects: {
                          ...prev.projects,
                          stats: updateArrayItem(prev.projects.stats, index, { label: event.target.value })
                        }
                      }))
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="card-shell p-6">
          <h2 className="mb-4 text-headline-md text-primary">Alt Bilgi</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Açıklama
              <textarea
                rows={3}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.footer.description}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, footer: { ...prev.footer, description: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Yasal Başlık
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.footer.legalTitle}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, footer: { ...prev.footer, legalTitle: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Navigasyon Başlık
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.footer.navigationTitle}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, footer: { ...prev.footer, navigationTitle: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Ofis Başlık
              <input
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.footer.officeTitle}
                onChange={(event) =>
                  setContent((prev) => ({ ...prev, footer: { ...prev.footer, officeTitle: event.target.value } }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Yasal Linkler
              <textarea
                rows={3}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.footer.legalLinks.map((item) => `${item.label}|${item.href}`).join('\n')}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      legalLinks: event.target.value
                        .split('\n')
                        .filter(Boolean)
                        .map((line) => {
                          const [label, href] = line.split('|');
                          return { label: label?.trim() || '', href: href?.trim() || '#' };
                        })
                    }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary">
              Navigasyon Linkler
              <textarea
                rows={3}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.footer.navigationLinks.map((item) => `${item.label}|${item.href}`).join('\n')}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      navigationLinks: event.target.value
                        .split('\n')
                        .filter(Boolean)
                        .map((line) => {
                          const [label, href] = line.split('|');
                          return { label: label?.trim() || '', href: href?.trim() || '#' };
                        })
                    }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Ofis Satırları
              <textarea
                rows={4}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.footer.officeLines.join('\n')}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      officeLines: event.target.value.split('\n').filter(Boolean)
                    }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Yasal Link Satırları
              <textarea
                rows={4}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.footer.legalLinks.map((item) => `${item.label}|${item.href}`).join('\n')}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      legalLinks: event.target.value
                        .split('\n')
                        .filter(Boolean)
                        .map((line) => {
                          const [label, href] = line.split('|');
                          return { label: label?.trim() || '', href: href?.trim() || '#' };
                        })
                    }
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-label-md text-primary md:col-span-2">
              Navigasyon Link Satırları
              <textarea
                rows={4}
                className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
                value={content.footer.navigationLinks.map((item) => `${item.label}|${item.href}`).join('\n')}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      navigationLinks: event.target.value
                        .split('\n')
                        .filter(Boolean)
                        .map((line) => {
                          const [label, href] = line.split('|');
                          return { label: label?.trim() || '', href: href?.trim() || '#' };
                        })
                    }
                  }))
                }
              />
            </label>
          </div>
        </section>

        <section className="card-shell p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-headline-md text-primary">Gelen Mesajlar</h2>
              <p className="mt-1 text-body-md text-muted">
                İletişim formundan gönderilen talepler burada görünür.
              </p>
            </div>
            <button type="button" className="secondary-button px-4 py-2" onClick={refreshMessages} disabled={isRefreshingMessages}>
              {isRefreshingMessages ? 'Yenileniyor...' : 'Yenile'}
            </button>
          </div>

          {messages.length === 0 ? (
            <div className="rounded border border-dashed border-border bg-light/40 p-5">
              <p className="text-body-md text-muted">Henüz bir mesaj yok.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {messages.map((item) => (
                <article key={item.id} className="rounded-xl border border-border bg-white p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-headline-sm text-primary">{item.name}</p>
                      <p className="mt-1 text-body-md text-muted">{item.email}</p>
                    </div>
                    <div className="text-right text-label-md text-subtle">
                      <p>{item.receivedAt ? new Date(item.receivedAt).toLocaleString('tr-TR') : new Date(item.createdAt).toLocaleString('tr-TR')}</p>
                      <p className="mt-1">Kaynak: {item.source}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 text-body-md text-muted sm:grid-cols-2">
                    <p>
                      <span className="font-semibold text-primary">Firma:</span> {item.company || '-'}
                    </p>
                    <p>
                      <span className="font-semibold text-primary">Telefon:</span> {item.phone || '-'}
                    </p>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap rounded-lg bg-light p-4 text-body-md leading-7 text-text">
                    {item.message}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
