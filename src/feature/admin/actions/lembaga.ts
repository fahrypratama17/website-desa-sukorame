'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function deleteLembaga(id: number) {
  try {
    await prisma.lembaga.delete({ where: { id } });
    revalidatePath('/admin/lembaga');
    revalidatePath('/lembaga'); // Jika ada halaman publik lembaga
  } catch (error) {
    console.error("Failed to delete lembaga:", error);
    throw new Error("Gagal menghapus lembaga");
  }
}

export async function saveLembaga(formData: FormData, id?: number) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const logo = formData.get('logo') as string;

  if (!name || !description) {
    throw new Error("Nama dan Deskripsi wajib diisi");
  }

  const data = {
    name,
    description,
    logo: logo || null,
  };

  if (id) {
    await prisma.lembaga.update({
      where: { id },
      data,
    });
  } else {
    await prisma.lembaga.create({
      data,
    });
  }

  revalidatePath('/admin/lembaga');
  revalidatePath('/lembaga');
}
