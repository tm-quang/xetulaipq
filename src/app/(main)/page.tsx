"use client";

import HeroBookingForm from "@/components/HeroBookingForm";
import dynamic from "next/dynamic";
import Link from "next/link";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles, HiCheckCircle, HiLightningBolt } from "react-icons/hi";

const PromotionsSection = dynamic(() => import("@/components/PromotionsSection"));

type Slide = {
  image: string;
  title: string;
  highlight: string;
  desc?: string;
};

const slides: Slide[] = [
  {
    image: "/images/vf5/vf5-1.png",
    title: "TRẢI NGHIỆM LÁI",
    highlight: "XANH & ĐẲNG CẤP",
    // desc: "Khám phá Rạch Giá qua từng vòng bánh xe cùng hệ thống xe điện thông minh 100% tại VF5 Tự Lái."
  },
  {
    image: "/images/vf5/vf5.png",
    title: "DỊCH VỤ THUÊ XE",
    highlight: "THÔNG MINH & TIẾT KIỆM",
    // desc: "Đa dạng các loại xe VinFast đời mới, thủ tục nhanh gọn, giao xe tận nơi cho mọi hành trình."
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="relative bg-gray-900 text-white min-h-[550px] md:min-h-[750px] flex items-center overflow-hidden">
        {/* Slider Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt="Hero Background"
              fill
              className="object-cover object-center opacity-100"
              priority
            />
            {/* Lớp phủ đen tĩnh để chữ dễ đọc, không dùng gradient glow */}
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center md:items-start text-center md:text-left pt-16 pb-36 md:pt-0 md:pb-32">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight uppercase leading-[1.2] md:leading-[1]">
              {slides[currentSlide].title} <br />
              <span className="text-primary text-balance">{slides[currentSlide].highlight}</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-medium md:font-semibold mb-8 max-w-2xl text-gray-200 opacity-90 mx-auto md:mx-0">
              {slides[currentSlide].desc}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl font-black text-base shadow-2xl shadow-primary/30 transition-all active:scale-95 uppercase">
                Đặt Xe Ngay
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-gray-900 text-white px-8 py-3.5 rounded-xl font-black text-base shadow-2xl transition-all active:scale-95 uppercase">
                Khám Phá Xe
              </button>
            </div>
          </motion.div>
        </div>

        {/* Carousel indicators */}
        {/* <div className="absolute bottom-48 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${currentSlide === i ? "w-8 bg-primary" : "w-2 bg-white/40"}`}
            />
          ))}
        </div> */}
      </section>

      {/* Floating Booking Form overlapping hero */}
      <section className="container mx-auto px-4 -mt-32 relative z-30 mb-8">
        <HeroBookingForm />
      </section>

      {/* Promotions Section */}
      <PromotionsSection />

      {/* Featured Cars */}
      <section className="py-12 md:py-16 bg-white relative z-10 w-full">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-md">
                  <HiSparkles size={20} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-gray-900 drop-shadow-sm">Thông số chi tiết</h2>
              </div>
              <p className="text-gray-500 font-medium text-sm md:text-base pl-1">Khám phá sức mạnh và công nghệ của <span className="text-primary font-bold">VinFast VF5 Plus</span></p>
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden mt-6 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-center relative">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-xl text-sm font-bold w-fit mb-6">
                  <HiLightningBolt size={18} /> 100% Thuần Điện
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter">VinFast VF5 Plus</h3>
                <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                  Mẫu SUV điện cỡ nhỏ hoàn hảo cho nhu cầu di chuyển nội tỉnh. Thiết kế thời thượng, vận hành siêu êm ái cùng loạt trang bị an toàn vượt trội.
                </p>

                <div className="relative h-48 md:h-64 w-full mb-8">
                  <Image
                    src="/images/vf5/vf5.png"
                    alt="VinFast VF5 Plus"
                    fill
                    className="object-cover rounded-3xl shadow-2xl drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Giá thuê từ</p>
                    <p className="text-3xl font-black text-primary">700.000₫<span className="text-sm font-bold text-gray-500 ml-1">/ ngày</span></p>
                  </div>
                </div>
              </div>

              <div className="lg:w-3/5 p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <div>
                    <h4 className="text-lg font-black text-gray-900 mb-5 relative inline-block">
                      Tổng quan
                      <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full" />
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2"><span className="text-gray-500 font-medium">Phân khúc</span><span className="font-bold text-gray-900">A-SUV điện</span></li>
                      <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2"><span className="text-gray-500 font-medium">Số chỗ</span><span className="font-bold text-gray-900">5 chỗ</span></li>
                      <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2"><span className="text-gray-500 font-medium">Hệ dẫn động</span><span className="font-bold text-gray-900 flex-1 text-right ml-2 line-clamp-1">Cầu trước (FWD)</span></li>
                      <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2"><span className="text-gray-500 font-medium">Công suất</span><span className="font-bold text-gray-900 flex-1 text-right ml-2 line-clamp-1">~100 kW (~134 HP)</span></li>
                      <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2"><span className="text-gray-500 font-medium">Mô-men xoắn</span><span className="font-bold text-gray-900">~135 Nm</span></li>
                      <li className="flex justify-between items-center pb-2"><span className="text-gray-500 font-medium">Chế độ lái</span><span className="font-bold text-gray-900">Eco / Sport</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-gray-900 mb-5 relative inline-block">
                      Pin & Sạc
                      <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full" />
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2"><span className="text-gray-500 font-medium">Lưu trữ</span><span className="font-bold text-gray-900">37.23 kWh</span></li>
                      <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2"><span className="text-gray-500 font-medium">Loại pin</span><span className="font-bold text-gray-900">Lithium (LFP)</span></li>
                      <li className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2"><span className="text-gray-500 font-medium">Quãng đường</span><span className="font-bold text-gray-900 flex-1 text-right ml-2 line-clamp-1">300-326 km/lần</span></li>
                      <li className="flex flex-col border-b border-dashed border-gray-100 pb-2">
                        <span className="text-gray-500 font-medium mb-1 flex justify-between">Sạc nhanh <span>~30 phút</span></span>
                        <div className="w-full bg-gray-100 rounded-full h-2 mt-1"><div className="bg-primary h-2 rounded-full w-[60%]"></div></div>
                        <span className="font-bold text-gray-400 text-xs text-center mt-1">10% - 70%</span>
                      </li>
                    </ul>
                  </div>

                  <div className="md:col-span-2">
                    <h4 className="text-lg font-black text-gray-900 mb-5 relative inline-block">
                      Không gian & Tiện Ích
                      <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full" />
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-2xl flex items-start gap-4 hover:bg-gray-100/80 transition-colors">
                        <HiCheckCircle size={24} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-900 mb-1">Khoang hành lý 260L</p>
                          <p className="text-sm font-medium text-gray-500">Lên đến ~900L tối đa khi gập phẳng hàng ghế sau.</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl flex items-start gap-4 hover:bg-gray-100/80 transition-colors">
                        <HiCheckCircle size={24} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-900 mb-1">Giải trí thông minh</p>
                          <p className="text-sm font-medium text-gray-500">Màn hình trung tâm 8&quot; cảm ứng. Hỗ trợ trợ lý ảo. Apple Carplay & Android Auto.</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl flex items-start gap-4 hover:bg-gray-100/80 transition-colors">
                        <HiCheckCircle size={24} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-900 mb-1">Bảo vệ với 6 túi khí</p>
                          <p className="text-sm font-medium text-gray-500">An toàn cho bạn và gia đình.</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl flex items-start gap-4 hover:bg-gray-100/80 transition-colors">
                        <HiCheckCircle size={24} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-900 mb-1">Cảnh báo an toàn</p>
                          <p className="text-sm font-medium text-gray-500">Cảnh báo điểm mù, phương tiện cắt ngang và hỗ trợ đỗ xe.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Tại sao chọn <span className="text-primary">VF5 Tự Lái?</span></h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl">1</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Thủ tục nhanh gọn</h3>
                    <p className="text-gray-600 text-sm">Chỉ cần CCCD và giấy phép lái xe hợp lệ. Không giữ giấy tờ góc, đặt cọc linh hoạt.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl">2</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Xe mới 100%</h3>
                    <p className="text-gray-600 text-sm">Toàn bộ xe VinFast đời mới, sạch sẽ, bảo dưỡng định kỳ, điều hòa mát lạnh.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl">3</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Giao xe tận nơi</h3>
                    <p className="text-gray-600 text-sm">Hỗ trợ giao nhận xe miễn phí tận khách sạn, sân bay hoặc trung tâm thành phố.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/vf5/vf5-1.png"
                alt="Tại sao chọn"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Banner */}
      <section className="py-12 relative overflow-hidden bg-primary my-12">
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-3xl font-black mb-4 drop-shadow">NHẬN ƯU ĐÃI ĐẾN 20%</h2>
          <p className="text-xl mb-8 opacity-90">Giảm giá mạnh cho khách hàng đặt xe trước 7 ngày, hoặc thuê trên 3 ngày.</p>
          <Link href="/cars" className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg inline-block text-lg">
            Khám phá xe ngay
          </Link>
        </div>
      </section>
    </>
  );
}
