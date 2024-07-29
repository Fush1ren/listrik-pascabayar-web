/**
 * @module RootLayout
 */

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/**
 * Metadata untuk aplikasi Berbasis Website.
 * @type {Object}
 * @property {string} title - Judul aplikasi.
 * @property {string} description - Deskripsi aplikasi.
 */
export const metadata = {
  title: "ElecBill",
  description: "Aplikasi Pembayaran Listrik Pascabayar",
};

/**
 * Komponen RootLayout untuk membungkus seluruh halaman aplikasi.
 * @component
 * @param {Object} props - Properti komponen.
 * @param {React.ReactNode} props.children - Elemen anak yang akan dirender di dalam layout.
 * @returns {JSX.Element} Komponen RootLayout
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
