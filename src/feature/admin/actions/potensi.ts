'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-guard';
import { PotensiSchema } from '@/lib/validations';
import { logActivity } from '@/lib/audit';

export async function deletePotensi(id: number) {
  await requireAuth();

  try {
    const potensi = await prisma.potensi.findUnique({ where: { id } });
    if (!potensi) throw new Error('Potensi not found');

    await prisma.potensi.update({ where: { id }, data: { deletedAt: new Date() } });
    await logActivity('SOFT_DELETE', 'Potensi', potensi.title);

    revalidatePath('/admin/potensi');
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to delete potensi:', error);
    throw new Error('Gagal menghapus potensi');
  }
}

export async function createPotensi(formData: FormData) {
  await requireAuth();

  const parsed = PotensiSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    image: formData.get('image') || null,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    throw new Error(firstError || 'Validasi gagal');
  }

  await prisma.potensi.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      image: parsed.data.image || null,
    },
  });

  await logActivity('CREATE', 'Potensi', parsed.data.title);

  revalidatePath('/admin/potensi');
  revalidatePath('/');
  redirect('/admin/potensi');
}

export async function updatePotensi(id: number, formData: FormData) {
  await requireAuth();

  const parsed = PotensiSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    image: formData.get('image') || null,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    throw new Error(firstError || 'Validasi gagal');
  }

  await prisma.potensi.update({
    where: { id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      image: parsed.data.image || null,
    },
  });

  await logActivity('UPDATE', 'Potensi', parsed.data.title);

  revalidatePath('/admin/potensi');
  revalidatePath('/');
  redirect('/admin/potensi');
}

export async function restorePotensi(id: number) {
  await requireAuth();

  try {
    const potensi = await prisma.potensi.findUnique({ where: { id } });
    if (!potensi) throw new Error('Potensi not found');

    await prisma.potensi.update({ where: { id }, data: { deletedAt: null } });
    await logActivity('RESTORE', 'Potensi', potensi.title);

    revalidatePath('/admin/potensi');
    revalidatePath('/admin/potensi/trash');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to restore potensi:', error);
    return { error: 'Gagal memulihkan potensi' };
  }
}

export async function hardDeletePotensi(id: number) {
  await requireAuth();

  try {
    const potensi = await prisma.potensi.findUnique({ where: { id } });
    if (!potensi) throw new Error('Potensi not found');

    await prisma.potensi.delete({ where: { id } });
    await logActivity('HARD_DELETE', 'Potensi', potensi.title);

    revalidatePath('/admin/potensi/trash');
    return { success: true };
  } catch (error) {
    console.error('Failed to hard delete potensi:', error);
    return { error: 'Gagal menghapus potensi permanen' };
  }
}
