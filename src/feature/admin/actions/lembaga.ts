'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-guard';
import { LembagaSchema } from '@/lib/validations';

export async function deleteLembaga(id: number) {
  await requireAuth();

  try {
    await prisma.lembaga.update({ where: { id }, data: { deletedAt: new Date() } });
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
  } else {
    await prisma.lembaga.create({ data });
  }

  revalidatePath('/admin/lembaga');
  revalidatePath('/lembaga');
}
