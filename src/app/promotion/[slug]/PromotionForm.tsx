"use client";

import { useState } from "react";

export default function PromotionForm({ promotionTitle }: { promotionTitle: string }) {
  const [formData, setFormData] = useState({ name: "", phone: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Giả lập thời gian Submit (sau này thay bằng API gọi sang Supabase Insert)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // const { error } = await supabase.from('promotion_requests').insert({ ...formData, promotion_title: promotionTitle });

    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset form
    setFormData({ name: "", phone: "", notes: "" });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSuccess && (
        <div className="bg-[#18A14D]/10 text-[#18A14D] px-4 py-3 rounded-xl text-sm font-bold border border-[#18A14D]/20">
          🎉 Đăng ký thành công! Chúng tôi sẽ liên hệ sớm.
        </div>
      )}
      
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
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5 ml-1">Ghi chú (Tùy chọn)</label>
        <textarea 
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Bạn muốn thuê xe vào ngày nào?" 
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#18A14D]/50 focus:border-[#18A14D] transition-all resize-none"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-[#18A14D] text-white font-black py-3.5 rounded-xl uppercase tracking-widest text-[13px] hover:bg-[#138840] transition-colors shadow-lg shadow-[#18A14D]/30 active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex justify-center mt-2"
      >
        {isSubmitting ? "Đang xử lý..." : "Đăng ký ngay"}
      </button>
    </form>
  );
}
