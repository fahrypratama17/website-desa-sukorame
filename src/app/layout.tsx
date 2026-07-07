import "../index.css";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";

export const metadata = {
  title: "Website Desa Sukorame",
  description: "Pusat informasi dan pelayanan digital terpadu untuk masyarakat Desa Sukorame.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-inter bg-[#FAF9F6] antialiased">
        <div className="relative flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
