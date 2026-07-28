import KontakContainer from "@/feature/kontak/container/KontakContainer";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kontak Kami | Desa Sukorame",
  description: "Hubungi Pemerintah Desa Sukorame melalui telepon, email, atau datang langsung ke kantor desa.",
};

export default async function Kontak() {
  const settings = await prisma.setting.findMany();
  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const locations = await prisma.location.findMany({
    where: { deletedAt: null },
  });

  return <KontakContainer settings={settingsMap} locations={locations} />;
}
