"use client";

import { useState } from "react";
import { HiOutlineUpload, HiOutlineTrash, HiOutlineSearch, HiOutlineFolder, HiOutlinePhotograph, HiOutlineStar } from "react-icons/hi";

export default function MediaManagement() {
  const [media, setMedia] = useState([
    { id: 1, name: "vf3-phu-quoc.jpg", type: "image", size: "1.2 MB", date: "2026-04-06", url: "/images/vf3/vf3.jpg", category: "Xe" },
    { id: 2, name: "vf5-blue.png", type: "image", size: "2.4 MB", date: "2026-04-05", url: "/images/vf5/vf5.png", category: "Xe" },
    { id: 3, name: "hero-slide-1.jpg", type: "image", size: "3.1 MB", date: "2026-04-06", url: "/images/hero-slide/hero-slide (1).jpg", category: "Banner" },
    { id: 4, name: "mpv7-exterior.jpg", type: "image", size: "1.8 MB", date: "2026-04-04", url: "/images/mpv7/mpv7.jpg", category: "Xe" },
    { id: 5, name: "booking-success.svg", type: "vector", size: "0.2 MB", date: "2026-04-03", url: "/images/mpv7/mpv7-1.jpg", category: "UI" },
  ]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight underline decoration-[#18A14D]/40 decoration-4 underline-offset-4">Quản lý Media</h1>
          <p className="text-gray-500 text-sm font-medium">Tải lên và quản trị toàn bộ tài nguyên hình ảnh, video của website.</p>
        </div>
        <button className="bg-[#18A14D] hover:bg-[#158c41] text-white font-black px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#18A14D]/20 active:scale-95 text-sm">
          <HiOutlineUpload size={20} />
          TẢI LÊN FILE
        </button>
      </div>

      {/* Media Browser Interface */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Sidebar Browser */}
        <div className="xl:col-span-1 space-y-6">
           <div className="bg-white/5 border border-white/10 rounded-[32px] p-6">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Thư mục</h3>
              <div className="space-y-2">
                 {[
                   { label: "Tất cả", count: 42, icon: HiOutlineFolder, active: true },
                   { label: "Hình ảnh xe", count: 18, icon: HiOutlinePhotograph },
                   { label: "Banner & Slide", count: 5, icon: HiOutlineStar },
                   { label: "Blog & Feedback", count: 12, icon: HiOutlineFolder },
                   { label: "UI Assets", count: 7, icon: HiOutlineFolder },
                 ].map((folder, idx) => (
                   <button key={idx} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                     folder.active ? "bg-[#18A14D]/15 text-[#18A14D]" : "text-gray-400 hover:bg-white/5 hover:text-white"
                   }`}>
                      <div className="flex items-center gap-3">
                         <folder.icon size={18} />
                         <span className="text-sm font-bold">{folder.label}</span>
                      </div>
                      <span className="text-[10px] font-black opacity-50">{folder.count}</span>
                   </button>
                 ))}
              </div>
           </div>
           
           <div className="bg-[#18A14D]/5 border border-[#18A14D]/10 rounded-[32px] p-6">
              <h3 className="text-sm font-black text-[#18A14D] uppercase tracking-widest mb-2">Bộ nhớ</h3>
              <div className="flex justify-between text-xs mb-2">
                 <span className="text-gray-400 font-bold">124.5 MB / 500 MB</span>
                 <span className="text-[#18A14D] font-black">25%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-[#18A14D] w-[25%] rounded-full" />
              </div>
           </div>
        </div>

        {/* Media Grid */}
        <div className="xl:col-span-3 space-y-6">
           <div className="bg-white/5 border border-white/10 rounded-[32px] p-4 flex gap-4">
              <div className="relative flex-1 group">
                 <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#18A14D] transition-colors" size={20} />
                 <input 
                  type="text" 
                  placeholder="Tìm theo tên file..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#18A14D]/50 focus:bg-white/10 transition"
                />
              </div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {media.map((file) => (
                <div key={file.id} className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden group hover:border-[#18A14D]/40 transition-all relative">
                   <div className="aspect-square relative bg-gray-900 border-b border-white/5">
                      <img src={file.url} alt={file.name} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition duration-500 group-hover:scale-110" />
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition transition-delay-75">
                         <button className="p-2 rounded-lg bg-red-500/80 text-white backdrop-blur-sm hover:bg-red-500 shadow-xl">
                            <HiOutlineTrash size={14} />
                         </button>
                      </div>
                   </div>
                   <div className="p-4">
                      <h4 className="text-[11px] font-black text-white truncate uppercase tracking-widest">{file.name}</h4>
                      <div className="flex justify-between items-center mt-1 text-[10px] text-gray-500 font-bold">
                         <span>{file.size}</span>
                         <span className="px-2 py-0.5 bg-white/5 rounded-md">{file.category}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
