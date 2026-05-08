export type TextLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  headline: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  imageSrc: string;
  imageAlt: string;
};

export type ExpertiseItem = {
  title: string;
  description: string;
  icon: 'code' | 'network' | 'cloud';
};

export type ExpertiseContent = {
  sectionTitle: string;
  sectionDescription: string;
  items: ExpertiseItem[];
};

export type AboutStat = {
  value: string;
  label: string;
};

export type AboutContent = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  stats: AboutStat[];
};

export type InsightContent = {
  sectionTitle: string;
  ctaLabel: string;
  featuredLabel: string;
  featuredTitle: string;
  featuredDescription: string;
  blogLabel: string;
  blogTitle: string;
  blogDate: string;
  reportTitle: string;
  reportCtaLabel: string;
  caseStudyLabel: string;
  caseStudyTitle: string;
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  successMessage: string;
  submitLabel: string;
  sendingLabel: string;
  nameLabel: string;
  emailLabel: string;
  companyLabel: string;
  phoneLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  companyPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
};

export type ProjectItem = {
  sector: string;
  title: string;
  description: string;
  image: string;
};

export type ProjectsIntroContent = {
  title: string;
  description: string;
  allLabel: string;
  webLabel: string;
  mobileLabel: string;
  enterpriseLabel: string;
};

export type ProjectsContent = {
  intro: ProjectsIntroContent;
  projects: ProjectItem[];
  successTitle: string;
  successSector: string;
  successHeadline: string;
  successDescription: string;
  successButtonLabel: string;
  successImage: string;
  stats: AboutStat[];
};

export type FooterContent = {
  description: string;
  copyright: string;
  legalTitle: string;
  legalLinks: TextLink[];
  navigationTitle: string;
  navigationLinks: TextLink[];
  officeTitle: string;
  officeLines: string[];
};

export type SiteContent = {
  navigation: {
    items: TextLink[];
    ctaLabel: string;
  };
  hero: HeroContent;
  expertise: ExpertiseContent;
  about: AboutContent;
  insights: InsightContent;
  contact: ContactContent;
  projects: ProjectsContent;
  footer: FooterContent;
};
