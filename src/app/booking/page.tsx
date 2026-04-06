"use client";

import { mockCars } from "@/lib/data";
import { formatCurrencyVND } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, redirect } from "next/navigation";
import { MdCheckCircle, MdArrowBack } from "react-icons/md";
import { format, differenceInDays, parseISO } from "date-fns";
import { useMemo, Suspense } from "react";

function BookingContent() {
  const searchParams = useSearchParams();
  const car_id = searchParams.get('car_id');
  const startStr = searchParams.get('start');
  const endStr = searchParams.get('end');

  const car = useMemo(() => mockCars.find(c => c.id === car_id), [car_id]);

  const { startDate, endDate, days } = useMemo(() => {
    try {
      const start = startStr ? parseISO(startStr) : null;
      const end = endStr ? parseISO(endStr) : null;
      const d = (start && end) ? Math.max(1, differenceInDays(end, start)) : 0;
      return { startDate: start, endDate: end, days: d };
    } catch {
      return { startDate: null, endDate: null, days: 0 };
    }
  }, [startStr, endStr]);

  if (!car) {
    return redirect('/cars');
  }

  const totalPrice = days * (car.discount_price || car.price_per_day);

  return (
    <div className="bg-white min-h-screen py-10 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header with back button */}
        <div className="flex items-center gap-3 mb-8">
           <Link href={`/cars/thue-xe/${car.slug}`} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
              <MdArrowBack size={20} />
           </Link>
           <div className="bg-[#18A14D]/5 px-4 py-2 rounded-xl border border-[#18A14D]/10">
              <h1 className="text-lg md:text-3xl font-black uppercase tracking-tight text-[#18A14D] leading-none">XÁC NHẬN ĐẶT XE</h1>
           </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Customer Form - 7 cols */}
          <div className="lg:col-span-7 bg-white rounded-[32px] p-6 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-50">
            <h2 className="text-base font-black mb-8 text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-4">Thông tin liên hệ</h2>
            
            <form className="space-y-8">
              <div className="space-y-2.5">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.15em] ml-1">Họ và tên *</label>
                <input 
                  required 
                  type="text" 
                  placeholder="Nhập họ và tên" 
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#18A14D]/10 focus:bg-white font-bold text-gray-800 placeholder:text-gray-300 transition-all h-14 md:h-16" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.15em] ml-1">Số điện thoại *</label>
                  <input 
                    required 
                    type="tel" 
                    placeholder="09xxxx..." 
                    className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#18A14D]/10 focus:bg-white font-bold text-gray-800 placeholder:text-gray-300 transition-all h-16" 
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.15em] ml-1">Zalo (tuỳ chọn)</label>
                  <input 
                    type="tel" 
                    placeholder="Số Zalo" 
                    className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#18A14D]/10 focus:bg-white font-bold text-gray-800 placeholder:text-gray-300 transition-all h-16" 
                  />
                </div>
              </div>
              
              <div className="space-y-2.5">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.15em] ml-1">Email</label>
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#18A14D]/10 focus:bg-white font-bold text-gray-800 placeholder:text-gray-300 transition-all h-16" 
                />
              </div>

              <div className="space-y-2.5">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.15em] ml-1">Địa chỉ giao xe chi tiết</label>
                <textarea 
                  rows={4} 
                  placeholder="Ví dụ: Khách sạn Seashell, Thị trấn Dương Đông..." 
                  className="w-full p-6 bg-gray-50 border-none rounded-3xl focus:ring-4 focus:ring-[#18A14D]/10 focus:bg-white font-bold text-gray-800 placeholder:text-gray-300 transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-6">
                <button 
                  type="button" 
                  className="w-full bg-[#18A14D] hover:bg-[#158c42] text-white font-black py-6 rounded-[24px] shadow-[0_15px_35px_rgba(24,161,77,0.3)] transition-all active:scale-[0.98] uppercase tracking-widest text-lg flex justify-center items-center gap-3"
                >
                  <MdCheckCircle size={26} /> GỬI YÊU CẦU ĐẶT XE
                </button>
                <p className="text-center text-xs text-gray-400 mt-6 font-bold uppercase tracking-tighter">
                  Bằng việc đặt xe, bạn đồng ý với các <Link href="/policy" className="text-[#18A14D] underline underline-offset-4">điều khoản dịch vụ</Link> của chúng tôi.
                </p>
              </div>
            </form>
          </div>

          {/* Booking Summary - 5 cols */}
          <div className="lg:col-span-5 space-y-8 sticky top-24">
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.08)] border border-gray-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#18A14D]"></div>
              <h2 className="text-xl font-black mb-8 text-gray-900 border-b border-gray-50 pb-6 uppercase tracking-widest">Tóm tắt chuyến đi</h2>
              
              <div className="flex gap-6 mb-10 p-5 bg-gray-50 border border-gray-100 rounded-3xl group">
                <div className="relative w-28 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Image src={car.images[0]} alt={car.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-black text-xl text-gray-900 leading-tight mb-1">{car.name}</h3>
                  <p className="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-2">5 chỗ • Auto • Electric</p>
                  <p className="font-black text-[#18A14D] text-lg leading-none">
                    {formatCurrencyVND(car.discount_price || car.price_per_day)}
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-tighter ml-1"> /ngày</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between p-5 bg-gray-50/50 rounded-2xl border border-gray-50">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Ngày nhận:</span>
                  <span className="font-black text-gray-800 text-sm">{startDate ? format(startDate, "dd/MM/yyyy") : "Chưa chọn"}</span>
                </div>
                <div className="flex justify-between p-5 bg-gray-50/50 rounded-2xl border border-gray-50">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Ngày trả:</span>
                  <span className="font-black text-gray-800 text-sm">{endDate ? format(endDate, "dd/MM/yyyy") : "Chưa chọn"}</span>
                </div>
              </div>

              <div className="space-y-4 pt-10 border-t border-gray-100">
                <div className="flex justify-between text-gray-500 font-bold uppercase text-[11px] tracking-widest">
                  <span>Tiền thuê xe ({days} ngày)</span>
                  <span className="text-gray-900 font-black text-sm">{formatCurrencyVND(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-bold uppercase text-[11px] tracking-widest">
                  <span>Phí giao nhận</span>
                  <span className="text-[#18A14D] font-black text-sm">Miễn phí</span>
                </div>
                <div className="h-px bg-gray-50 my-6" />
                <div className="flex justify-between items-baseline pt-2">
                  <span className="font-black text-[10px] md:text-sm text-gray-900 uppercase tracking-[0.2em]">Tổng tiền</span>
                  <span className="font-black text-2xl md:text-4xl text-gray-900 tracking-tighter">{formatCurrencyVND(totalPrice)}</span>
                </div>
              </div>
            </div>
            
            {/* Trust Signals */}
            <div className="bg-[#E8F5E9]/50 backdrop-blur-sm text-[#18A14D] p-8 rounded-[40px] border border-[#18A14D]/10">
              <h4 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-[#18A14D] text-white flex items-center justify-center">
                    <MdCheckCircle size={18} /> 
                 </div>
                 Cam kết từ Xế Tự Lái
              </h4>
              <ul className="space-y-4 font-bold text-sm text-gray-600 pl-2">
                <li className="flex items-start gap-3"><span className="text-[#18A14D]">•</span> Xe luôn sạch sẽ, bảo dưỡng định kỳ trước khi giao.</li>
                <li className="flex items-start gap-3"><span className="text-[#18A14D]">•</span> Hỗ trợ sự cố kỹ thuật 24/7 toàn đảo Phú Quốc.</li>
                <li className="flex items-start gap-3"><span className="text-[#18A14D]">•</span> Đổi xe miễn phí nếu xe gặp lỗi do nhà sản xuất.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải biểu mẫu đặt xe...</div>}>
      <BookingContent />
    </Suspense>
  );
}
