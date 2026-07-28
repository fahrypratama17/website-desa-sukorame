"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLocations() {
  try {
    const locations = await prisma.location.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: locations };
  } catch (error) {
    console.error("Error fetching locations:", error);
    return { success: false, error: "Gagal mengambil data lokasi" };
  }
}

export async function createLocation(data: {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  icon?: string;
  color?: string;
}) {
  try {
    const location = await prisma.location.create({
      data,
    });
    
    // Log
    await prisma.auditLog.create({
      data: {
        action: "CREATE",
        entity: "Location",
        entityName: location.name,
      },
    });
    
    revalidatePath("/admin/lokasi");
    revalidatePath("/kontak");
    return { success: true, data: location };
  } catch (error) {
    console.error("Error creating location:", error);
    return { success: false, error: "Gagal membuat lokasi" };
  }
}

export async function updateLocation(
  id: number,
  data: {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    icon?: string;
    color?: string;
  }
) {
  try {
    const location = await prisma.location.update({
      where: { id },
      data,
    });

    await prisma.auditLog.create({
      data: {
        action: "UPDATE",
        entity: "Location",
        entityName: location.name,
      },
    });

    revalidatePath("/admin/lokasi");
    revalidatePath("/kontak");
    return { success: true, data: location };
  } catch (error) {
    console.error("Error updating location:", error);
    return { success: false, error: "Gagal mengupdate lokasi" };
  }
}

export async function deleteLocation(id: number, hardDelete = false) {
  try {
    const location = await prisma.location.findUnique({ where: { id } });
    if (!location) return { success: false, error: "Lokasi tidak ditemukan" };

    if (hardDelete) {
      await prisma.location.delete({ where: { id } });
      await prisma.auditLog.create({
        data: {
          action: "HARD_DELETE",
          entity: "Location",
          entityName: location.name,
        },
      });
    } else {
      await prisma.location.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      await prisma.auditLog.create({
        data: {
          action: "SOFT_DELETE",
          entity: "Location",
          entityName: location.name,
        },
      });
    }

    revalidatePath("/admin/lokasi");
    revalidatePath("/kontak");
    return { success: true };
  } catch (error) {
    console.error("Error deleting location:", error);
    return { success: false, error: "Gagal menghapus lokasi" };
  }
}

export async function restoreLocation(id: number) {
  try {
    const location = await prisma.location.update({
      where: { id },
      data: { deletedAt: null },
    });

    await prisma.auditLog.create({
      data: {
        action: "RESTORE",
        entity: "Location",
        entityName: location.name,
      },
    });

    revalidatePath("/admin/lokasi");
    revalidatePath("/kontak");
    return { success: true, data: location };
  } catch (error) {
    console.error("Error restoring location:", error);
    return { success: false, error: "Gagal memulihkan lokasi" };
  }
}
