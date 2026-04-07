"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { mockPromotions } from "@/lib/data";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineSearch, HiOutlineTicket } from "react-icons/hi";

export default function PromotionManagement() {
  const [promotions, setPromotions] = useState(mockPromotions);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPromotions = promotions.filter(promo => 
    promo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight underline decoration-[#18A14D]/40 decoration-4 underline-offset-4">Chương trình Khuyến mãi</h1>
          <p className="text-gray-500 text-sm font-medium">Quản lý mã giảm giá, voucher và các chương trình ưu đãi định kỳ.</p>
        </div>
        <button className="bg-[#18A14D] hover:bg-[#158c41] text-white font-black px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#18A14D]/20 active:scale-95 text-sm">
          <HiOutlinePlus size={20} />
          TẠO KHUYẾN MÃI
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#18A14D] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Tìm theo tên chương trình..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#18A14D]/50 focus:bg-white/10 transition"
          />
        </div>
      </div>

      {/* Promotions List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPromotions.map((promo) => (
          <div key={promo.id} className="bg-white/5 border border-white/10 rounded-[40px] p-8 flex flex-col md:flex-row gap-8 hover:border-white/20 transition-all group overflow-hidden relative shadow-2xl">
              <div className="w-full md:w-32 h-32 rounded-3xl bg-gray-800 overflow-hidden relative shrink-0">
                  <img src={promo.image} alt={promo.title} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm text-[#18A14D]">
                        <HiOutlineTicket size={24} />
                     </div>
                  </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-[#18A14D]/10 text-[#18A14D] text-[10px] font-black uppercase tracking-widest rounded-lg">ACTIVE</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Hạn: {promo.valid_until}</span>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight mb-2">{promo.title}</h3>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed mb-4">{promo.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="text-lg font-black text-[#18A14D] uppercase tracking-tighter shadow-sm">Giảm {promo.discount_percentage}%</div>
                      <div className="flex gap-2">
                        <button className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                            <HiOutlinePencil size={18} />
                        </button>
                        <button className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all">
                            <HiOutlineTrash size={18} />
                        </button>
                      </div>
                  </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
