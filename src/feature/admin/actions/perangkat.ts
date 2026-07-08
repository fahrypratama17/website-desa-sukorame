'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function deletePerangkat(id: number) {
  try {
    await prisma.perangkat.delete({ where: { id } });
    revalidatePath('/admin/perangkat');
    revalidatePath('/profil/pemerintah-desa');
  } catch (error) {
    console.error("Failed to delete perangkat:", error);
    throw new Error("Gagal menghapus perangkat");
  }
}

export async function savePerangkat(formData: FormData, id?: number) {
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const email = formData.get('email') as string;
  const image = formData.get('image') as string;
  const quote = formData.get('quote') as string;

  if (!name || !role || !email) {
    throw new Error("Nama, Jabatan, dan Email wajib diisi");
  }

  const data = {
    name,
    role,
    email,
    image: image || null,
    quote: quote || null,
  };

  if (id) {
    await prisma.perangkat.update({
      where: { id },
      data,
    });
  } else {
    await prisma.perangkat.create({
      data,
    });
  }

  revalidatePath('/admin/perangkat');
  revalidatePath('/profil/pemerintah-desa');
}
