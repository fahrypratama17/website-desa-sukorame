import HomeContainer from "@/feature/home/container/HomeContainer";
import { getGlobalSettings } from "@/lib/settings";
import prisma from "@/lib/prisma";

export const revalidate = 3600;

export default async function Home() {
  const settings = await getGlobalSettings();
  const latestBerita = await prisma.berita.findMany({
    where: { status: 'PUBLISHED', deletedAt: null },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  return <HomeContainer settings={settings} latestBerita={latestBerita} />;
}
