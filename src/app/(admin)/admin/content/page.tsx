"use client";

import { useState } from "react";
import { 
  HiOutlinePencilAlt, 
  HiOutlineSave, 
  HiOutlineEye, 
  HiOutlineGlobe, 
  HiOutlineDesktopComputer, 
  HiOutlineDeviceMobile,
  HiOutlineCalendar
} from "react-icons/hi";

export default function ContentManagement() {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight underline decoration-[#18A14D]/40 decoration-4 underline-offset-4">Quản trị Nội dung</h1>
          <p className="text-gray-500 text-sm font-medium">Chỉnh sửa thông tin giới thiệu, banner, footer và các trang tĩnh khác.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-black px-6 py-3 rounded-2xl flex items-center gap-2 transition-all text-sm">
            <HiOutlineEye size={20} />
            XEM TRƯỚC
          </button>
          <button className="bg-[#18A14D] hover:bg-[#158c41] text-white font-black px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#18A14D]/20 active:scale-95 text-sm">
            <HiOutlineSave size={20} />
            LƯU THAY ĐỔI
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="xl:col-span-3 space-y-4">
           <div className="bg-white/5 border border-white/10 rounded-[40px] p-2">
              {[
                { id: "hero", label: "Hero Banner", icon: HiOutlineGlobe },
                { id: "about", label: "Giới thiệu", icon: HiOutlineDesktopComputer },
                { id: "services", label: "Dịch vụ", icon: HiOutlineCalendar },
                { id: "footer", label: "Thông tin liên hệ", icon: HiOutlineDeviceMobile },
                { id: "seo", label: "Cấu hình SEO", icon: HiOutlineGlobe },
              ].map((section) => (
                <button 
                  key={section.id} 
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-[32px] transition-all text-sm font-bold ${
                    activeSection === section.id ? "bg-[#18A14D] text-white shadow-xl shadow-[#18A14D]/20" : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                   <section.icon size={20} />
                   <span>{section.label}</span>
                </button>
              ))}
           </div>
        </div>

        {/* Content Editor Area */}
        <div className="xl:col-span-9 bg-white/5 border border-white/10 rounded-[40px] p-10 space-y-8 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#18A14D] to-[#15c45e] opacity-20" />
           
           <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
              <div className="w-10 h-10 rounded-xl bg-[#18A14D]/10 flex items-center justify-center text-[#18A14D]">
                 <HiOutlinePencilAlt size={22} />
              </div>
              <h2 className="text-xl font-black text-white tracking-tight uppercase">Chỉnh sửa nội dung</h2>
           </div>

           <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 ml-2">Tiêu đề chính (Heading 1)</label>
                    <input 
                      type="text" 
                      defaultValue="TRẢI NGHIỆM LÁI XANH & ĐẲNG CẤP" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#18A14D]/70 focus:bg-white/10 transition font-bold"
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 ml-2">Highlight text</label>
                    <input 
                      type="text" 
                      defaultValue="XÊ TỰ LÁI" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-[#18A14D] focus:outline-none focus:border-[#18A14D]/70 focus:bg-white/10 transition font-black"
                    />
                 </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 ml-2">Mô tả ngắn (Description)</label>
                <textarea 
                  rows={4}
                  defaultValue="Khám phá phú quốc qua từng vòng bánh xe cùng hệ thống xe điện thông minh 100% tại Xế Tự Lái." 
                  className="w-full bg-white/5 border border-white/10 rounded-[32px] px-6 py-5 text-sm text-gray-300 focus:outline-none focus:border-[#18A14D]/70 focus:bg-white/10 transition leading-relaxed font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative">
                    <label className="block text-[10px] text-gray-500 font-black uppercase tracking-widest mb-4">Slide Image 1</label>
                    <div className="aspect-video bg-gray-900 rounded-xl mb-4 overflow-hidden group border border-white/10">
                        <img src="/images/hero-slide/hero-slide (1).jpg" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                           <button className="text-white font-black text-xs px-4 py-2 bg-[#18A14D] rounded-xl shadow-lg">THAY ĐỔI</button>
                        </div>
                    </div>
                    <input type="text" defaultValue="/images/hero-slide/hero-slide (1).jpg" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[10px] text-gray-500 focus:outline-none focus:border-[#18A14D]" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
