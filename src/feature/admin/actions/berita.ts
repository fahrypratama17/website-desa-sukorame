'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-guard';
import { BeritaSchema } from '@/lib/validations';
import { KategoriBerita } from '@prisma/client';

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function createBerita(formData: FormData) {
  const session = await requireAuth();
  
  let authorId = null;
  let authorName = 'Admin Desa';
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (user) {
      authorId = user.id;
      authorName = user.name || 'Admin Desa';
    }
  }

  const parsed = BeritaSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    kategori: formData.get('kategori'),
    thumbnail: formData.get('thumbnail') || null,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    return { error: firstError || 'Validasi gagal' };
  }

  const { title, content, kategori, thumbnail } = parsed.data;

  let slug = generateSlug(title);
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    const existing = await prisma.berita.findUnique({ where: { slug } });
    if (existing) {
      slug = `${generateSlug(title)}-${counter}`;
      counter++;
    } else {
      isUnique = true;
    }
  }

  await prisma.berita.create({
    data: {
      title,
      slug,
      content,
      thumbnail: thumbnail || null,
      kategori: kategori as KategoriBerita,
      status: 'PUBLISHED',
      publishedAt: new Date(),
      authorId,
      authorName,
    },
  });

  revalidatePath('/admin/berita');
  revalidatePath('/berita');
  revalidatePath('/');
  redirect('/admin/berita');
}

export async function updateBerita(id: number, formData: FormData) {
  await requireAuth();

  const parsed = BeritaSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    kategori: formData.get('kategori'),
    thumbnail: formData.get('thumbnail') || null,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    return { error: firstError || 'Validasi gagal' };
  }

  const { title, content, kategori, thumbnail } = parsed.data;

  const berita = await prisma.berita.findUnique({ where: { id } });
  if (!berita) return { error: 'Berita not found' };

  let slug = berita.slug;
  if (title !== berita.title) {
    slug = generateSlug(title);
    let counter = 1;
    let isUnique = false;

    while (!isUnique) {
      const existing = await prisma.berita.findFirst({
        where: { slug, id: { not: id } },
      });
      if (existing) {
        slug = `${generateSlug(title)}-${counter}`;
        counter++;
      } else {
        isUnique = true;
      }
    }
  }

  await prisma.berita.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      thumbnail: thumbnail || null,
      kategori: kategori as KategoriBerita,
    },
  });

  revalidatePath('/admin/berita');
  revalidatePath('/berita');
  revalidatePath('/');
  redirect('/admin/berita');
}

export async function deleteBerita(id: number) {
  await requireAuth();

  try {
    await prisma.berita.update({ where: { id }, data: { deletedAt: new Date() } });
    revalidatePath('/admin/berita');
    revalidatePath('/berita');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting berita:', error);
    return { success: false, error: 'Gagal menghapus berita' };
  }
}
