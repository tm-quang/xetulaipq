import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../globals.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ["vietnamese", "latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: "%s | Admin - Xê Tu Lái",
    default: "Admin Dashboard - Xê Tu Lái",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${roboto.className} bg-gray-50 text-gray-900`}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
