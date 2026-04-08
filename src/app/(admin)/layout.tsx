import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../globals.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ["vietnamese", "latin"],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: "%s | Admin - VF5 Tự Lái",
    default: "Admin Dashboard - VF5 Tự Lái",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${roboto.variable} font-sans bg-gray-50 text-gray-900`}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
