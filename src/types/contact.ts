export type ContactFormInput = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
};

export type ContactSubmission = ContactFormInput & {
  createdAt: string;
  source: 'website';
};

export type ContactInboxItem = ContactSubmission & {
  id: string;
  receivedAt?: string | null;
};
