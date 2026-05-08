import { redirect } from 'next/navigation';

import { AdminPanel } from '@/components/admin/AdminPanel';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getContactSubmissions } from '@/lib/contact-submissions';
import { getSiteContent } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  const content = await getSiteContent();
  const contactMessages = await getContactSubmissions();

  return <AdminPanel initialContent={content} initialMessages={contactMessages} />;
}
