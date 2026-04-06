import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ZaloFloat from "@/components/ZaloFloat";

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700', '900'],
  subsets: ["vietnamese", "latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: "%s | Xê Tu Lái - Thuê Xe Tự Lái",
    default: "Xê Tu Lái - Thuê Xe Tự Lái Giá Rẻ, Đặt Xe Nhanh Chóng",
  },
  description: "Dịch vụ cho thuê xe điện VinFast tự lái chất lượng, giá ưu đãi. Đặt xe nhanh chóng, thủ tục đơn giản. Trải nghiệm xe VF3, VF5, Limo Green ngay hôm nay.",
  keywords: ["thuê xe điện", "thuê xe tự lái", "thuê xe vinfast", "thuê xe vf3", "thuê xe vf5", "giá thuê xe"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://xetulaipq.com/",
    title: "Xê Tu Lái - Thuê Xe Tự Lái Giá Rẻ",
    description: "Cho thuê xe điện VinFast tự lái chất lượng, giá ưu đãi.",
    siteName: "Xê Tu Lái",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={roboto.className}>
        <Header />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
        
        {/* Zalo CTA Float */}
        <ZaloFloat />
      </body>
    </html>
  );
}
