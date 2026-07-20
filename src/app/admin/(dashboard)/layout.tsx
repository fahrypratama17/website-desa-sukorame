import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminLayoutWrapper from '@/feature/admin/components/AdminLayoutWrapper';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/login');
  }

  return (
    <AdminLayoutWrapper userName={session.user.name || 'Admin'}>
      {children}
    </AdminLayoutWrapper>
  );
}
