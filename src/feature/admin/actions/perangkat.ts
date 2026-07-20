'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-guard';
import { PerangkatSchema } from '@/lib/validations';
import { logActivity } from '@/lib/audit';

export async function deletePerangkat(id: number) {
  await requireAuth();

  try {
    const perangkat = await prisma.perangkat.findUnique({ where: { id } });
    if (!perangkat) throw new Error('Perangkat not found');

    await prisma.perangkat.update({ where: { id }, data: { deletedAt: new Date() } });
    await logActivity('SOFT_DELETE', 'Perangkat', perangkat.name);

    revalidatePath('/admin/perangkat');
    revalidatePath('/perangkat');
  } catch (error) {
    console.error('Failed to delete perangkat:', error);
    throw new Error('Gagal menghapus perangkat');
  }
}

export async function savePerangkat(formData: FormData, id?: number) {
  await requireAuth();

  const parsed = PerangkatSchema.safeParse({
    name: formData.get('name'),
    role: formData.get('role'),
    email: formData.get('email'),
    image: formData.get('image') || null,
    quote: formData.get('quote') || null,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    throw new Error(firstError || 'Validasi gagal');
  }

  const data = {
    name: parsed.data.name,
    role: parsed.data.role,
    email: parsed.data.email,
    image: parsed.data.image || null,
    quote: parsed.data.quote || null,
  };

  if (id) {
    await prisma.perangkat.update({ where: { id }, data });
    await logActivity('UPDATE', 'Perangkat', data.name);
  } else {
    await prisma.perangkat.create({ data });
    await logActivity('CREATE', 'Perangkat', data.name);
  }

  revalidatePath('/admin/perangkat');
  revalidatePath('/perangkat');
}

export async function restorePerangkat(id: number) {
  await requireAuth();

  try {
    const perangkat = await prisma.perangkat.findUnique({ where: { id } });
    if (!perangkat) throw new Error('Perangkat not found');

    await prisma.perangkat.update({ where: { id }, data: { deletedAt: null } });
    await logActivity('RESTORE', 'Perangkat', perangkat.name);

    revalidatePath('/admin/perangkat');
    revalidatePath('/admin/perangkat/trash');
    revalidatePath('/perangkat');
    return { success: true };
  } catch (error) {
    console.error('Failed to restore perangkat:', error);
    return { error: 'Gagal memulihkan perangkat' };
  }
}

export async function hardDeletePerangkat(id: number) {
  await requireAuth();

  try {
    const perangkat = await prisma.perangkat.findUnique({ where: { id } });
    if (!perangkat) throw new Error('Perangkat not found');

    await prisma.perangkat.delete({ where: { id } });
    await logActivity('HARD_DELETE', 'Perangkat', perangkat.name);

    revalidatePath('/admin/perangkat/trash');
    return { success: true };
  } catch (error) {
    console.error('Failed to hard delete perangkat:', error);
    return { error: 'Gagal menghapus perangkat permanen' };
  }
}
