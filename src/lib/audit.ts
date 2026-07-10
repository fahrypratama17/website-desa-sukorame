import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-guard';

type AuditAction = 'CREATE' | 'UPDATE' | 'SOFT_DELETE' | 'RESTORE' | 'HARD_DELETE';

export async function logActivity(action: AuditAction, entity: string, entityName: string) {
  try {
    const session = await requireAuth();
    
    let userId = null;
    let userName = 'Sistem';

    if (session?.user?.email) {
      const user = await prisma.user.findUnique({ where: { email: session.user.email } });
      if (user) {
        userId = user.id;
        userName = user.name || 'Admin';
      }
    }

    await prisma.auditLog.create({
      data: {
        userId,
        userName,
        action,
        entity,
        entityName,
      },
    });
  } catch (error) {
    // We don't want audit log failures to crash the main application flow
    console.error('Failed to write audit log:', error);
  }
}
