"use client";

import { mockCars } from "@/lib/data";
import { formatCurrencyVND } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, redirect } from "next/navigation";
import { MdCheckCircle, MdArrowBack } from "react-icons/md";
import { format, differenceInDays, parseISO } from "date-fns";
import { useMemo, Suspense, useState, useEffect } from "react";
import { HiLocationMarker, HiX } from "react-icons/hi";

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

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    zalo: "",
    email: "",
    location: searchParams.get('location') || ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [voucher, setVoucher] = useState(searchParams.get('voucher') || "");
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; type: 'fixed' | 'percent' | 'freeship'; value: number } | null>(null);
  const [voucherError, setVoucherError] = useState("");

  const locations = [
    "Sân bay Phú Quốc",
    "Cảng Bãi Vòng",
    "Cảng An Thới",
    "Vinpearl / Grand World",
    "Thị trấn Dương Đông",
    "Bãi Ông Lang"
  ];

  const handleApplyVoucher = (codeStr?: string) => {
    setVoucherError("");
    const code = (codeStr || voucher).trim().toUpperCase();
    if (!code) return;

    if (code === "PQ50") {
      setAppliedVoucher({ code, type: 'fixed', value: 50000 });
    } else if (code === "GET10") {
      setAppliedVoucher({ code, type: 'percent', value: 10 });
    } else if (code === "FREESHIP") {
      setAppliedVoucher({ code, type: 'freeship', value: 0 });
    } else {
      setVoucherError("Mã voucher không hợp lệ");
      setAppliedVoucher(null);
    }
  };

  useEffect(() => {
    if (searchParams.get('voucher')) {
      handleApplyVoucher(searchParams.get('voucher') || "");
    }
  }, [searchParams]);

  const { discountAmount, finalTotal } = useMemo(() => {
    const baseTotal = days * (car.discount_price || car.price_per_day);
    let discount = 0;
    if (appliedVoucher) {
      if (appliedVoucher.type === 'fixed') discount = appliedVoucher.value;
      else if (appliedVoucher.type === 'percent') discount = (baseTotal * appliedVoucher.value) / 100;
    }
    return { discountAmount: discount, finalTotal: Math.max(0, baseTotal - discount) };
  }, [days, car.discount_price, car.price_per_day, appliedVoucher]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Giả lập gửi yêu cầu
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

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
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2.5">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.15em] ml-1">Họ và tên *</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="09xxxx..." 
                    className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#18A14D]/10 focus:bg-white font-bold text-gray-800 placeholder:text-gray-300 transition-all h-16" 
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.15em] ml-1">Zalo (tuỳ chọn)</label>
                  <input 
                    type="tel" 
                    value={formData.zalo}
                    onChange={(e) => setFormData({...formData, zalo: e.target.value})}
                    placeholder="Số Zalo" 
                    className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#18A14D]/10 focus:bg-white font-bold text-gray-800 placeholder:text-gray-300 transition-all h-16" 
                  />
                </div>
              </div>
              
              <div className="space-y-2.5">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.15em] ml-1">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@example.com" 
                  className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#18A14D]/10 focus:bg-white font-bold text-gray-800 placeholder:text-gray-300 transition-all h-16" 
                />
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.15em] ml-1">Địa điểm nhận (giao) xe *</label>
                <div className="relative group">
                  <input 
                    required
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Ví dụ: Sân bay, Khách sạn Seashell..." 
                    className="w-full p-6 pl-14 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#18A14D]/10 focus:bg-white font-bold text-gray-800 placeholder:text-gray-300 transition-all h-16"
                  />
                  <HiLocationMarker className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#18A14D] transition-colors" size={24} />
                </div>
                <div className="flex flex-wrap gap-2 ml-1">
                  {locations.map(loc => (
                    <button 
                      key={loc}
                      type="button"
                      onClick={() => setFormData({...formData, location: loc})}
                      className={`text-[10px] font-bold px-4 py-2 rounded-xl border transition-all ${formData.location === loc ? 'bg-[#18A14D] border-[#18A14D] text-white shadow-md' : 'bg-white border-gray-100 text-gray-500 hover:border-[#18A14D]/30'}`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-50 space-y-4">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.15em] ml-1">Mã Voucher (Nếu có)</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={voucher}
                      onChange={(e) => setVoucher(e.target.value)}
                      placeholder="Nhập mã giảm giá..." 
                      className="flex-1 p-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#18A14D]/10 focus:bg-white font-bold text-gray-800 placeholder:text-gray-300 transition-all h-16"
                    />
                    <button 
                      type="button"
                      onClick={() => handleApplyVoucher()}
                      className="px-8 bg-gray-100 hover:bg-gray-200 text-gray-600 font-black rounded-2xl transition-all h-16 uppercase tracking-widest text-xs"
                    >
                      Áp dụng
                    </button>
                  </div>
                  {voucherError && <p className="text-xs text-red-500 font-bold ml-1">{voucherError}</p>}
                  {appliedVoucher && (
                    <div className="flex items-center justify-between bg-[#18A14D]/10 border border-[#18A14D]/20 rounded-2xl p-4">
                      <span className="font-black text-[#18A14D] uppercase tracking-widest text-xs">Voucher {appliedVoucher.code} đã được áp dụng</span>
                      <button type="button" onClick={() => setAppliedVoucher(null)} className="text-[#18A14D]"><HiX size={20} /></button>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#18A14D] hover:bg-[#158c42] disabled:opacity-70 text-white font-black py-6 rounded-[24px] shadow-[0_15px_35px_rgba(24,161,77,0.3)] transition-all active:scale-[0.98] uppercase tracking-widest text-lg flex justify-center items-center gap-3"
                >
                  {isSubmitting ? "ĐANG XỬ LÝ..." : <><MdCheckCircle size={26} /> GỬI YÊU CẦU ĐẶT XE</>}
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
                {appliedVoucher && (
                  <div className="flex justify-between text-[#18A14D] font-bold uppercase text-[11px] tracking-widest bg-[#18A14D]/5 p-3 rounded-xl border border-[#18A14D]/10">
                    <span>Voucher ({appliedVoucher.code})</span>
                    <span className="font-black">-{formatCurrencyVND(discountAmount)}</span>
                  </div>
                )}
                <div className="h-px bg-gray-50 my-6" />
                <div className="flex justify-between items-baseline pt-2">
                  <span className="font-black text-[10px] md:text-sm text-gray-900 uppercase tracking-[0.2em]">Tổng tiền</span>
                  <span className="font-black text-2xl md:text-4xl text-gray-900 tracking-tighter">{formatCurrencyVND(finalTotal)}</span>
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

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white rounded-[40px] p-10 md:p-16 max-w-lg w-full text-center shadow-2xl scale-in-center animate-in zoom-in-95 duration-300">
              <div className="w-24 h-24 bg-[#18A14D] rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg shadow-[#18A14D]/30">
                 <MdCheckCircle className="text-white" size={60} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">Yêu cầu đã gửi!</h2>
              <p className="text-gray-500 font-bold leading-relaxed mb-10">
                Cảm ơn <span className="text-gray-900 border-b-2 border-[#18A14D]/20">{formData.name || "bạn"}</span>! Chúng tôi đã tiếp nhận yêu cầu đặt xe cho chuyến đi tại Phú Quốc. Nhân viên sẽ liên hệ xác nhận sớm nhất qua số điện thoại <span className="text-gray-900">{formData.phone}</span>.
              </p>
              <div className="space-y-4">
                <Link href="/" className="block w-full bg-[#18A14D] hover:bg-[#158c42] text-white font-black py-5 rounded-2xl transition-all shadow-lg shadow-[#18A14D]/20 uppercase tracking-widest text-sm">
                  Về trang chủ
                </Link>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="block w-full bg-gray-50 hover:bg-gray-100 text-gray-400 font-black py-5 rounded-2xl transition-all uppercase tracking-widest text-sm"
                >
                  Đóng thông báo
                </button>
              </div>
           </div>
        </div>
      )}
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
