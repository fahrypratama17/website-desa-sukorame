"use server";

import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return { error: "File tidak ditemukan." };
    }

    if (!file.type.startsWith("image/")) {
      return { error: "File harus berupa gambar." };
    }

    // Check if Supabase env vars are configured
    if (!process.env.SUPABASE_URL || (!process.env.SUPABASE_ANON_KEY && !process.env.SUPABASE_SERVICE_ROLE_KEY)) {
      return { error: "Konfigurasi Supabase (SUPABASE_URL, SUPABASE_ANON_KEY/SERVICE_ROLE_KEY) belum diatur di .env." };
    }

    const fileBuffer = await file.arrayBuffer();
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Asumsi nama bucket adalah "desa-storage"
    const bucketName = "desa-storage";
    const folder = (formData.get("folder") as string) || "umum";

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`${folder}/${fileName}`, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Supabase Upload Error:", error);
      return { error: `Gagal mengunggah gambar: ${error.message}` };
    }

    // Ambil Public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(`${folder}/${fileName}`);

    return { url: publicUrlData.publicUrl };
  } catch (error) {
    console.error("Upload Error:", error);
    return { error: "Terjadi kesalahan internal saat mengunggah gambar." };
  }
}
