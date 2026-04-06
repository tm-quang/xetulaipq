"use client";

import HeroBookingForm from "@/components/HeroBookingForm";
import dynamic from "next/dynamic";
import { mockCars } from "@/lib/data";

const CarCard = dynamic(() => import("@/components/CarCard"));
const PromotionsSection = dynamic(() => import("@/components/PromotionsSection"));
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=1470&auto=format&fit=crop",
    title: "TRẢI NGHIỆM LÁI",
    highlight: "XANH & ĐẲNG CẤP",
    desc: "Khám phá phú quốc qua từng vòng bánh xe cùng hệ thống xe điện thông minh 100% tại Xế Tự Lái."
  },
  {
    image: "https://images.unsplash.com/photo-1660634629768-4ad01ba0379c?q=80&w=1470&auto=format&fit=crop",
    title: "DỊCH VỤ THUÊ XE",
    highlight: "THÔNG MINH & TIẾT KIỆM",
    desc: "Đa dạng các loại xe VinFast đời mới, thủ tục nhanh gọn, giao xe tận nơi cho mọi hành trình."
  },
  {
    image: "https://images.unsplash.com/photo-1707217596041-3820fa0cc0c2?q=80&w=1470&auto=format&fit=crop",
    title: "KHÁM PHÁ ĐẢO NGỌC",
    highlight: "THEO CÁCH CỦA BẠN",
    desc: "Chuyến du lịch Phú Quốc sẽ hoàn hảo hơn khi bạn sở hữu sự tự do và riêng tư tuyệt đối."
  }
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
      <section className="relative bg-gray-900 text-white min-h-[600px] md:min-h-[750px] flex items-center overflow-hidden">
        {/* Slider Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt="Hero Background"
              fill
              className="object-cover opacity-50"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent" />
          </motion.div>
        </AnimatePresence>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center md:items-start text-center md:text-left mt-8 mb-40 md:mt-0 md:mb-32">
           <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
           >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight drop-shadow-xl uppercase leading-[1.1] md:leading-[0.95]">
              {slides[currentSlide].title} <br/> 
              <span className="text-primary text-balance">{slides[currentSlide].highlight}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium md:font-semibold mb-8 max-w-2xl text-gray-200 drop-shadow opacity-90 mx-auto md:mx-0">
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
        <div className="absolute bottom-48 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${currentSlide === i ? "w-8 bg-primary" : "w-2 bg-white/40"}`}
            />
          ))}
        </div>
      </section>

      {/* Floating Booking Form overlapping hero */}
      <section className="container mx-auto px-4 -mt-32 relative z-30 mb-8">
        <HeroBookingForm />
      </section>

      {/* Promotions Section */}
      <PromotionsSection />

      {/* Featured Cars */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">Xe nổi bật</h2>
            <p className="text-gray-500 font-medium">Bảng giá ưu đãi nhất cho dòng xe yêu thích của bạn</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link href="/cars" className="bg-white border-2 border-primary text-primary px-8 py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-colors duration-300">
              Xem tất cả xe
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Tại sao chọn <span className="text-primary">Xê Tu Lái?</span></h2>
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
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1470&auto=format&fit=crop"
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
