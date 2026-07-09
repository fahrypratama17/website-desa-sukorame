import "@/index.css";
import PublicLayoutWrapper from "@/shared/components/PublicLayoutWrapper";
import { getGlobalSettings } from "@/lib/settings";

export const metadata = {
  title: "Website Desa Sukorame",
  description: "Pusat informasi dan pelayanan digital terpadu untuk masyarakat Desa Sukorame.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getGlobalSettings();

  return (
    <html lang="id">
      <body className="font-inter bg-[#FAF9F6] antialiased">
        <div className="relative flex flex-col min-h-screen">
          <PublicLayoutWrapper settings={settings}>
            {children}
          </PublicLayoutWrapper>
        </div>
      </body>
    </html>
  );
}
