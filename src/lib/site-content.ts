import 'server-only';

import { DEFAULT_SITE_CONTENT } from '@/lib/defaultSiteContent';
import { getFirestoreDb } from '@/lib/firebase';
import type { SiteContent } from '@/types/site-content';

const SITE_CONTENT_COLLECTION = 'site_content';
const SITE_CONTENT_DOC = 'main';

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const snapshot = await getFirestoreDb().collection(SITE_CONTENT_COLLECTION).doc(SITE_CONTENT_DOC).get();

    if (!snapshot.exists) {
      return DEFAULT_SITE_CONTENT;
    }

    return mergeSiteContent(DEFAULT_SITE_CONTENT, snapshot.data() as Partial<SiteContent>);
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

export async function saveSiteContent(content: SiteContent) {
  await getFirestoreDb().collection(SITE_CONTENT_COLLECTION).doc(SITE_CONTENT_DOC).set({
    ...content,
    updatedAt: new Date().toISOString()
  });
}

export function mergeSiteContent(base: SiteContent, patch?: Partial<SiteContent> | null): SiteContent {
  if (!patch) {
    return base;
  }

  return {
    navigation: {
      ...base.navigation,
      ...patch.navigation,
      items: patch.navigation?.items?.length ? patch.navigation.items : base.navigation.items
    },
    hero: { ...base.hero, ...patch.hero },
    expertise: {
      ...base.expertise,
      ...patch.expertise,
      items: patch.expertise?.items?.length ? patch.expertise.items : base.expertise.items
    },
    about: {
      ...base.about,
      ...patch.about,
      stats: patch.about?.stats?.length ? patch.about.stats : base.about.stats
    },
    insights: { ...base.insights, ...patch.insights },
    contact: { ...base.contact, ...patch.contact },
    projects: {
      ...base.projects,
      ...patch.projects,
      projects: patch.projects?.projects?.length ? patch.projects.projects : base.projects.projects,
      stats: patch.projects?.stats?.length ? patch.projects.stats : base.projects.stats
    },
    footer: {
      ...base.footer,
      ...patch.footer,
      legalLinks: patch.footer?.legalLinks?.length ? patch.footer.legalLinks : base.footer.legalLinks,
      navigationLinks: patch.footer?.navigationLinks?.length ? patch.footer.navigationLinks : base.footer.navigationLinks,
      officeLines: patch.footer?.officeLines?.length ? patch.footer.officeLines : base.footer.officeLines
    }
  };
}
