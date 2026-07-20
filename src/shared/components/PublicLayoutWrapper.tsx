"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayoutWrapper({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: Record<string, string>;
}) {
  const pathname = usePathname();
  // Jika rute diawali dengan /admin, sembunyikan Navbar dan Footer
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
