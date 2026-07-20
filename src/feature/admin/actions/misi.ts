'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-guard';
import { MisiSchema } from '@/lib/validations';

export async function createMisi(formData: FormData) {
  await requireAuth();

  const parsed = MisiSchema.safeParse({
    icon: formData.get('icon') || '',
    title: formData.get('title'),
    description: formData.get('description'),
    order: Number(formData.get('order') || 0),
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    throw new Error(firstError || 'Validasi gagal');
  }

  // Auto-set order jika belum ada
  let order = parsed.data.order;
  if (order === 0) {
    const maxOrder = await prisma.misi.findFirst({ orderBy: { order: 'desc' } });
    order = (maxOrder?.order ?? 0) + 1;
  }

  await prisma.misi.create({
    data: {
      icon: parsed.data.icon || null,
      title: parsed.data.title,
      description: parsed.data.description,
      order,
    },
  });

  revalidatePath('/admin/pengaturan');
  revalidatePath('/profil/visi-misi');
  revalidatePath('/');
}

export async function updateMisi(id: number, formData: FormData) {
  await requireAuth();

  const parsed = MisiSchema.safeParse({
    icon: formData.get('icon') || '',
    title: formData.get('title'),
    description: formData.get('description'),
    order: Number(formData.get('order') || 0),
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    throw new Error(firstError || 'Validasi gagal');
  }

  await prisma.misi.update({
    where: { id },
    data: {
      icon: parsed.data.icon || null,
      title: parsed.data.title,
      description: parsed.data.description,
      order: parsed.data.order,
    },
  });

  revalidatePath('/admin/pengaturan');
  revalidatePath('/profil/visi-misi');
  revalidatePath('/');
}

export async function deleteMisi(id: number) {
  await requireAuth();

  try {
    await prisma.misi.delete({ where: { id } });
    revalidatePath('/admin/pengaturan');
    revalidatePath('/profil/visi-misi');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete misi:', error);
    throw new Error('Gagal menghapus misi');
  }
}

export async function reorderMisi(orderedIds: number[]) {
  await requireAuth();

  const promises = orderedIds.map((id, index) =>
    prisma.misi.update({
      where: { id },
      data: { order: index + 1 },
    })
  );

  await Promise.all(promises);
  revalidatePath('/admin/pengaturan');
  revalidatePath('/profil/visi-misi');
}
