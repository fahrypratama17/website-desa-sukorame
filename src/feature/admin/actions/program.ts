'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function deleteProgram(id: number) {
  try {
    await prisma.program.delete({ where: { id } });
    revalidatePath('/admin/program');
    revalidatePath('/program');
  } catch (error) {
    console.error("Failed to delete program:", error);
    throw new Error("Gagal menghapus program");
  }
}

export async function createProgram(formData: FormData) {
  const title = formData.get('title') as string;
  const kategori = formData.get('kategori') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as string;

  if (!title || !kategori || !description) {
    throw new Error("Semua field wajib diisi");
  }

  await prisma.program.create({
    data: {
      title,
      kategori,
      description,
      image: image || null,
    },
  });

  revalidatePath('/admin/program');
  revalidatePath('/program');
  redirect('/admin/program');
}

export async function updateProgram(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const kategori = formData.get('kategori') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as string;

  if (!title || !kategori || !description) {
    throw new Error("Semua field wajib diisi");
  }

  await prisma.program.update({
    where: { id },
    data: {
      title,
      kategori,
      description,
      image: image || null,
    },
  });

  revalidatePath('/admin/program');
  revalidatePath('/program');
  redirect('/admin/program');
}
