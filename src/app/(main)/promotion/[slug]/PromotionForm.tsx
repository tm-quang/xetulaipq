"use client";

import { useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";

export default function PromotionForm({ promotionTitle }: { promotionTitle: string }) {
  const [formData, setFormData] = useState({ name: "", phone: "", location: "" });
  const [voucher, setVoucher] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; type: string; value: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const locations = ["Sân bay Rạch Giá", "Cảng Bãi Vòng", "Thị trấn Dương Đông", "Vinpearl"];

  const handleApplyVoucher = () => {
    const code = voucher.trim().toUpperCase();
    if (code === "PQ50") setAppliedVoucher({ code, type: 'fixed', value: 50000 });
    else setAppliedVoucher(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Giả lập thời gian Submit (sau này thay bằng API gọi sang Supabase Insert)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // const { error } = await supabase.from('promotion_requests').insert({ ...formData, promotion_title: promotionTitle });

    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset form
    setFormData({ name: "", phone: "", location: "" });
    setVoucher("");
    setAppliedVoucher(null);
    // setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="promotion_title" value={promotionTitle} />
      
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5 ml-1">Họ và tên</label>
        <input 
          type="text" 
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nhập tên của bạn" 
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#18A14D]/50 focus:border-[#18A14D] transition-all"
        />
      </div>
      
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5 ml-1">Số điện thoại</label>
        <input 
          type="tel" 
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="09xx xxx xxx" 
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#18A14D]/50 focus:border-[#18A14D] transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5 ml-1">Địa điểm nhận (giao) xe</label>
        <div className="relative group mb-3">
          <input 
            type="text" 
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Sân bay, khách sạn, hoặc cảng..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#18A14D]/50 focus:border-[#18A14D] transition-all"
          />
          <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#18A14D]" size={20} />
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {locations.map(loc => (
            <button 
              key={loc}
              type="button"
              onClick={() => setFormData({...formData, location: loc})}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${formData.location === loc ? 'bg-[#18A14D] border-[#18A14D] text-white' : 'bg-white border-gray-100 text-gray-500 hover:border-[#18A14D]/30'}`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5 ml-1">Mã Voucher (Nếu có)</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
            placeholder="Mã giảm giá..." 
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#18A14D]/50 transition-all font-bold"
          />
          <button 
            type="button"
            onClick={handleApplyVoucher}
            className="bg-gray-100 px-4 rounded-xl text-[10px] font-black uppercase text-gray-600"
          >
            Áp dụng
          </button>
        </div>
        {appliedVoucher && (
           <div className="mt-2 text-[10px] font-bold text-[#18A14D] flex items-center gap-1 bg-[#18A14D]/5 p-2 rounded-lg border border-[#18A14D]/10">
              <MdCheckCircle /> Đã áp dụng: {appliedVoucher.code}
           </div>
        )}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-[#18A14D] text-white font-black py-4 rounded-xl uppercase tracking-widest text-[13px] hover:bg-[#138840] transition-colors shadow-lg shadow-[#18A14D]/30 active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex justify-center mt-4"
      >
        {isSubmitting ? "Đang xử lý..." : "Gửi yêu cầu ngay"}
      </button>

      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
           <div className="bg-white rounded-[32px] p-8 max-w-sm w-full text-center shadow-2xl scale-in-center">
              <div className="w-16 h-16 bg-[#18A14D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#18A14D]/20">
                 <MdCheckCircle className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tight">Yêu cầu đã gửi!</h2>
              <p className="text-gray-500 text-sm font-bold leading-relaxed mb-8">
                Cảm ơn! Chúng tôi đã tiếp nhận yêu cầu của bạn. Nhân viên sẽ liên hệ lại sớm nhất.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="w-full bg-[#18A14D] hover:bg-[#158c42] text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest text-xs"
              >
                Đóng
              </button>
           </div>
        </div>
      )}
    </form>
  );
}
