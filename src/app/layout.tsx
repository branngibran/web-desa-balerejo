import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import PageTransitionBar from "@/components/PageTransitionBar";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Desa Balerejo | Kec. Kawedanan, Kab. Magetan",
  description: "Website Resmi Pemerintah Desa Balerejo, Kecamatan Kawedanan, Kabupaten Magetan - Layanan Informasi Publik, Administrasi Persuratan & UMKM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-50 min-h-screen flex flex-col antialiased text-slate-800`}>
        <AuthProvider>
          <Suspense fallback={null}>
            <PageTransitionBar />
          </Suspense>
          <Navbar />
          <div className="flex-grow animate-in fade-in duration-200">
            {children}
          </div>
          <Footer />
          <MobileNav />
        </AuthProvider>
      </body>
    </html>
  );
}