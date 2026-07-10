'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-guard';
import { LembagaSchema } from '@/lib/validations';
import { logActivity } from '@/lib/audit';

export async function deleteLembaga(id: number) {
  await requireAuth();

  try {
    const lembaga = await prisma.lembaga.findUnique({ where: { id } });
    if (!lembaga) throw new Error('Lembaga not found');

    await prisma.lembaga.update({ where: { id }, data: { deletedAt: new Date() } });
    await logActivity('SOFT_DELETE', 'Lembaga', lembaga.name);

    revalidatePath('/admin/lembaga');
    revalidatePath('/lembaga');
  } catch (error) {
    console.error('Failed to delete lembaga:', error);
    throw new Error('Gagal menghapus lembaga');
  }
}

export async function saveLembaga(formData: FormData, id?: number) {
  await requireAuth();

  const parsed = LembagaSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    logo: formData.get('logo') || null,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    throw new Error(firstError || 'Validasi gagal');
  }

  const data = {
    name: parsed.data.name,
    description: parsed.data.description,
    logo: parsed.data.logo || null,
  };

  if (id) {
    await prisma.lembaga.update({ where: { id }, data });
    await logActivity('UPDATE', 'Lembaga', data.name);
  } else {
    await prisma.lembaga.create({ data });
    await logActivity('CREATE', 'Lembaga', data.name);
  }

  revalidatePath('/admin/lembaga');
  revalidatePath('/lembaga');
}

export async function restoreLembaga(id: number) {
  await requireAuth();

  try {
    const lembaga = await prisma.lembaga.findUnique({ where: { id } });
    if (!lembaga) throw new Error('Lembaga not found');

    await prisma.lembaga.update({ where: { id }, data: { deletedAt: null } });
    await logActivity('RESTORE', 'Lembaga', lembaga.name);

    revalidatePath('/admin/lembaga');
    revalidatePath('/admin/lembaga/trash');
    revalidatePath('/lembaga');
    return { success: true };
  } catch (error) {
    console.error('Failed to restore lembaga:', error);
    return { error: 'Gagal memulihkan lembaga' };
  }
}

export async function hardDeleteLembaga(id: number) {
  await requireAuth();

  try {
    const lembaga = await prisma.lembaga.findUnique({ where: { id } });
    if (!lembaga) throw new Error('Lembaga not found');

    await prisma.lembaga.delete({ where: { id } });
    await logActivity('HARD_DELETE', 'Lembaga', lembaga.name);

    revalidatePath('/admin/lembaga/trash');
    return { success: true };
  } catch (error) {
    console.error('Failed to hard delete lembaga:', error);
    return { error: 'Gagal menghapus lembaga permanen' };
  }
}
