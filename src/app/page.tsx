import HomeContainer from "@/feature/home/container/HomeContainer";
import { getGlobalSettings } from "@/lib/settings";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const settings = await getGlobalSettings();
  const latestBerita = await prisma.berita.findMany({
    where: { status: 'PUBLISHED', deletedAt: null },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });
  const latestPotensi = await prisma.potensi.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  return <HomeContainer settings={settings} latestBerita={latestBerita} latestPotensi={latestPotensi} />;
}
