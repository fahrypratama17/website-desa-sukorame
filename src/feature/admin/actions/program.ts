'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-guard';
import { ProgramSchema } from '@/lib/validations';
import { logActivity } from '@/lib/audit';

export async function deleteProgram(id: number) {
  await requireAuth();

  try {
    const program = await prisma.program.findUnique({ where: { id } });
    if (!program) throw new Error('Program not found');

    await prisma.program.update({ where: { id }, data: { deletedAt: new Date() } });
    await logActivity('SOFT_DELETE', 'Program', program.title);

    revalidatePath('/admin/program');
    revalidatePath('/program');
  } catch (error) {
    console.error('Failed to delete program:', error);
    throw new Error('Gagal menghapus program');
  }
}

export async function createProgram(formData: FormData) {
  await requireAuth();

  const parsed = ProgramSchema.safeParse({
    title: formData.get('title'),
    kategori: formData.get('kategori'),
    description: formData.get('description'),
    image: formData.get('image') || null,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    throw new Error(firstError || 'Validasi gagal');
  }

  await prisma.program.create({
    data: {
      title: parsed.data.title,
      kategori: parsed.data.kategori,
      description: parsed.data.description,
      image: parsed.data.image || null,
    },
  });

  await logActivity('CREATE', 'Program', parsed.data.title);

  revalidatePath('/admin/program');
  revalidatePath('/program');
  redirect('/admin/program');
}

export async function updateProgram(id: number, formData: FormData) {
  await requireAuth();

  const parsed = ProgramSchema.safeParse({
    title: formData.get('title'),
    kategori: formData.get('kategori'),
    description: formData.get('description'),
    image: formData.get('image') || null,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    throw new Error(firstError || 'Validasi gagal');
  }

  await prisma.program.update({
    where: { id },
    data: {
      title: parsed.data.title,
      kategori: parsed.data.kategori,
      description: parsed.data.description,
      image: parsed.data.image || null,
    },
  });

  await logActivity('UPDATE', 'Program', parsed.data.title);

  revalidatePath('/admin/program');
  revalidatePath('/program');
  redirect('/admin/program');
}

export async function restoreProgram(id: number) {
  await requireAuth();

  try {
    const program = await prisma.program.findUnique({ where: { id } });
    if (!program) throw new Error('Program not found');

    await prisma.program.update({ where: { id }, data: { deletedAt: null } });
    await logActivity('RESTORE', 'Program', program.title);

    revalidatePath('/admin/program');
    revalidatePath('/admin/program/trash');
    revalidatePath('/program');
    return { success: true };
  } catch (error) {
    console.error('Failed to restore program:', error);
    return { error: 'Gagal memulihkan program' };
  }
}

export async function hardDeleteProgram(id: number) {
  await requireAuth();

  try {
    const program = await prisma.program.findUnique({ where: { id } });
    if (!program) throw new Error('Program not found');

    await prisma.program.delete({ where: { id } });
    await logActivity('HARD_DELETE', 'Program', program.title);

    revalidatePath('/admin/program/trash');
    return { success: true };
  } catch (error) {
    console.error('Failed to hard delete program:', error);
    return { error: 'Gagal menghapus program permanen' };
  }
}
