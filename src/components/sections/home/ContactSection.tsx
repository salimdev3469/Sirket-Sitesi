'use client';

import { useEffect, useState } from 'react';

import { contactSchema } from '@/lib/validations';
import { submitContactForm } from '@/services/contactService';
import type { ContactContent } from '@/types/site-content';

type FormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

type ContactSectionProps = {
  contact: ContactContent;
};

const initialValues: FormValues = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: ''
};

export function ContactSection({ contact }: ContactSectionProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!snackOpen) {
      return;
    }

    const timer = window.setTimeout(() => setSnackOpen(false), 3500);
    return () => window.clearTimeout(timer);
  }, [snackOpen]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage('');

    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const pathKey = String(issue.path[0] ?? 'form');
        if (!errors[pathKey]) {
          errors[pathKey] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    const response = await submitContactForm(parsed.data);

    if (!response.ok) {
      setStatusMessage(response.message);
      setFieldErrors(response.fieldErrors ?? {});
      setIsSubmitting(false);
      return;
    }

    setStatusMessage(contact.successMessage);
    setSnackOpen(true);
    setValues(initialValues);
    setIsSubmitting(false);
  }

  return (
    <section id="contact" className="section-border section-spacer bg-white">
      <div className="site-container grid grid-cols-1 gap-gutter lg:grid-cols-12">
        <div className="reveal-soft lg:col-span-5">
          <p className="mb-3 text-label-md uppercase text-subtle">{contact.eyebrow}</p>
          <h2 className="text-headline-lg text-primary">{contact.title}</h2>
          <p className="mt-5 max-w-md text-body-md text-muted">{contact.description}</p>
        </div>

        <form onSubmit={onSubmit} className="reveal-soft-delay-1 card-shell space-y-5 p-8 lg:col-span-7" noValidate>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-label-md text-primary">
              {contact.nameLabel}
              <input
                type="text"
                value={values.name}
                onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
                className="rounded border border-primary/25 px-4 py-3 text-body-md text-text outline-none transition-colors focus:border-primary"
                placeholder={contact.namePlaceholder}
                aria-invalid={Boolean(fieldErrors.name)}
              />
              {fieldErrors.name ? <span className="text-label-md text-primary">{fieldErrors.name}</span> : null}
            </label>

            <label className="flex flex-col gap-2 text-label-md text-primary">
              {contact.emailLabel}
              <input
                type="email"
                value={values.email}
                onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
                className="rounded border border-primary/25 px-4 py-3 text-body-md text-text outline-none transition-colors focus:border-primary"
                placeholder={contact.emailPlaceholder}
                aria-invalid={Boolean(fieldErrors.email)}
              />
              {fieldErrors.email ? <span className="text-label-md text-primary">{fieldErrors.email}</span> : null}
            </label>

            <label className="flex flex-col gap-2 text-label-md text-primary">
              {contact.companyLabel}
              <input
                type="text"
                value={values.company}
                onChange={(event) => setValues((prev) => ({ ...prev, company: event.target.value }))}
                className="rounded border border-primary/25 px-4 py-3 text-body-md text-text outline-none transition-colors focus:border-primary"
                placeholder={contact.companyPlaceholder}
              />
            </label>

            <label className="flex flex-col gap-2 text-label-md text-primary">
              {contact.phoneLabel}
              <input
                type="tel"
                value={values.phone}
                onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
                className="rounded border border-primary/25 px-4 py-3 text-body-md text-text outline-none transition-colors focus:border-primary"
                placeholder="+90 5XX XXX XX XX"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-label-md text-primary">
            {contact.messageLabel}
            <textarea
              rows={5}
              value={values.message}
              onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
              className="rounded border border-primary/25 px-4 py-3 text-body-md text-text outline-none transition-colors focus:border-primary"
              placeholder={contact.messagePlaceholder}
              aria-invalid={Boolean(fieldErrors.message)}
            />
            {fieldErrors.message ? <span className="text-label-md text-primary">{fieldErrors.message}</span> : null}
          </label>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" disabled={isSubmitting} className="primary-button disabled:opacity-70">
              {isSubmitting ? contact.sendingLabel : contact.submitLabel}
            </button>
            {statusMessage ? <p className="text-body-md text-muted">{statusMessage}</p> : null}
          </div>
        </form>
      </div>

      {snackOpen ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl border border-primary/15 bg-white px-4 py-4 shadow-[0_16px_48px_rgba(28,55,89,0.18)]"
        >
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
            <div className="min-w-0">
              <p className="text-label-md font-semibold uppercase tracking-wide text-primary">Mesaj gönderildi</p>
              <p className="mt-1 text-body-md leading-6 text-muted">{contact.successMessage}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
