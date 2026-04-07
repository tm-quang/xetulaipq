"use client";

import { useState } from "react";
import { HiOutlineCog, HiOutlineLockClosed, HiOutlineBell, HiOutlineDatabase, HiOutlineCloudUpload, HiOutlineKey } from "react-icons/hi";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight underline decoration-[#18A14D]/40 decoration-4 underline-offset-4">Cài đặt Hệ thống</h1>
          <p className="text-gray-500 text-sm font-medium">Bảo trì cơ sở dữ liệu, quản lý quyền truy cập và cấu hình máy chủ.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="xl:col-span-3 space-y-4">
           <div className="bg-white/5 border border-white/10 rounded-[40px] p-2">
              {[
                { id: "general", label: "Cài đặt chung", icon: HiOutlineCog },
                { id: "security", label: "Bảo mật & Quyền", icon: HiOutlineLockClosed },
                { id: "notifications", label: "Thông báo đơn mới", icon: HiOutlineBell },
                { id: "database", label: "Cơ sở dữ liệu", icon: HiOutlineDatabase },
                { id: "api", label: "Tích hợp API", icon: HiOutlineKey },
              ].map((section) => (
                <button 
                  key={section.id} 
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-[32px] transition-all text-sm font-bold ${
                    activeTab === section.id ? "bg-[#18A14D] text-white shadow-xl shadow-[#18A14D]/20" : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                   <section.icon size={20} />
                   <span>{section.label}</span>
                </button>
              ))}
           </div>
        </div>

        {/* Settings Area */}
        <div className="xl:col-span-9 space-y-8">
           <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 space-y-8 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
                 <div className="w-10 h-10 rounded-xl bg-[#18A14D]/10 flex items-center justify-center text-[#18A14D]">
                    <HiOutlineCloudUpload size={22} />
                 </div>
                 <h2 className="text-xl font-black text-white tracking-tight uppercase">Tích hợp Supabase</h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                 <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3 ml-2">Supabase Project URL</label>
                    <input 
                      type="text" 
                      readOnly
                      defaultValue="https://nuyepkddyezqyzfbgwog.supabase.co" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-gray-500 cursor-not-allowed focus:outline-none"
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3 ml-2">Public Anon Key</label>
                    <div className="relative">
                       <input 
                        type="password" 
                        readOnly
                        defaultValue="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-gray-500 cursor-not-allowed focus:outline-none"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] text-green-500 font-black tracking-widest uppercase">CONNECTED ✅</span>
                    </div>
                 </div>
              </div>

              <div className="p-6 bg-[#18A14D]/5 border border-[#18A14D]/10 rounded-[32px] flex items-center justify-between">
                 <div>
                    <h4 className="text-sm font-black text-white mb-1">Đồng bộ hóa dữ liệu</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">Toàn bộ dữ liệu đặt xe, khách hàng và xe sẽ được đồng bộ hóa thời gian thực tới Supabase.</p>
                 </div>
                 <button className="bg-[#18A14D] hover:bg-[#158c41] text-white font-black px-6 py-3 rounded-2xl text-xs flex items-center gap-2 transition shadow-lg shadow-[#18A14D]/20 active:scale-95">
                    <HiOutlineRefresh size={18} />
                    ĐỒNG BỘ NGAY
                 </button>
              </div>
           </div>

           <div className="bg-[#18A14D]/5 border border-[#18A14D]/10 rounded-[40px] p-10 font-bold">
              <h3 className="text-sm font-black text-[#18A14D] uppercase tracking-widest mb-4">Thông tin hệ thống</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 <div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Phiên bản</div>
                    <div className="text-lg text-white font-black">XTL v2.0.4</div>
                 </div>
                 <div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Uptime</div>
                    <div className="text-lg text-white font-black">99.9%</div>
                 </div>
                 <div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">DB Connections</div>
                    <div className="text-lg text-white font-black">ACTIVE</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function HiOutlineRefresh({ size }: { size: number }) {
  return (
    <svg 
      stroke="currentColor" 
      fill="none" 
      strokeWidth="2" 
      viewBox="0 0 24 24" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      height={size} 
      width={size} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  );
}
