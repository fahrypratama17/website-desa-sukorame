'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-guard';
import { PerangkatSchema } from '@/lib/validations';

export async function deletePerangkat(id: number) {
  await requireAuth();

  try {
    await prisma.perangkat.update({ where: { id }, data: { deletedAt: new Date() } });
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
  } else {
    await prisma.perangkat.create({ data });
  }

  revalidatePath('/admin/perangkat');
  revalidatePath('/perangkat');
}
