import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ZaloFloat from "@/components/ZaloFloat";

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ["vietnamese", "latin"],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: "%s | VF5 Tự Lái Rạch Giá - Cho thuê VF5 tự lái tại Rạch Giá",
    default: "VF5 Tự Lái - Cho thuê VF5 tự lái tại Rạch Giá",
  },
  description: "Dịch vụ cho thuê xe điện VinFast VF5 tự lái chất lượng, giá ưu đãi. Đặt xe nhanh chóng, thủ tục đơn giản tại Rạch Giá.",
  keywords: ["thuê xe điện", "thuê xe tự lái", "thuê xe vinfast", "thuê xe vf5", "rạch giá"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://vf5tulairg.vercel.app",
    title: "VF5 Tự Lái - Cho thuê VF5 tự lái tại Rạch Giá",
    description: "Cho thuê xe điện VinFast VF5 tự lái chất lượng, giá ưu đãi.",
    siteName: "VF5 Tự Lái",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${roboto.variable} font-sans`}>
        <Header />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />

        {/* Zalo CTA Float */}
        <ZaloFloat />
      </body>
    </html>
  );
}
