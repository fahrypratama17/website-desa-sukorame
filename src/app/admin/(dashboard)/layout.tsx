import { auth } from '../../../auth';
import AdminLayoutWrapper from '../../../feature/admin/components/AdminLayoutWrapper';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <AdminLayoutWrapper userName={session?.user?.name || 'Administrator'}>
        {children}
      </AdminLayoutWrapper>
    </div>
  );
}
