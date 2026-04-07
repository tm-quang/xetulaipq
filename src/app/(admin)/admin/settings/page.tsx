"use client";

import { useState } from "react";
import { AdminCard, AdminButton, AdminInput, AdminSelect, AdminTextarea } from "@/components/admin/UI";
import { HiOutlineSave, HiOutlineGlobeAlt, HiOutlineMailOpen, HiOutlineColorSwatch, HiOutlineShieldCheck, HiOutlineDatabase } from "react-icons/hi";
import toast from "react-hot-toast";

export default function AdminSettings() {
  const [activeSettingsTab, setActiveSettingsTab] = useState("general");

  const handleSave = () => {
    toast.success("Cấu hình cài đặt đã được cập nhật thành công!");
  };

  const tabs = [
    { id: "general", label: "Cài đặt chung", icon: HiOutlineGlobeAlt },
    { id: "email", label: "Cấu hình Email", icon: HiOutlineMailOpen },
    { id: "appearance", label: "Giao diện website", icon: HiOutlineColorSwatch },
    { id: "security", label: "Bảo mật & Auth", icon: HiOutlineShieldCheck },
    { id: "database", label: "Cơ sở dữ liệu", icon: HiOutlineDatabase },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase leading-none mb-3">Cài đặt hệ thống</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">Cấu hình tham số và tùy chọn hiển thị</p>
        </div>
        <AdminButton onClick={handleSave}>
          <HiOutlineSave size={20} />
          LƯU TẤT CẢ
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSettingsTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl text-[11px] font-black uppercase tracking-widest transition-all ${
                activeSettingsTab === tab.id
                  ? "bg-[#18A14D] text-white shadow-xl shadow-[#18A14D]/20 -translate-x-2"
                  : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {activeSettingsTab === "general" && (
            <AdminCard title="Cấu hình thông tin cơ bản" subtitle="Địa chỉ, số điện thoại và thông tin liên hệ website">
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <AdminInput label="Tên thương hiệu" placeholder="Xê Tu Lái Phú Quốc" />
                <AdminInput label="Khẩu hiệu (Slogan)" placeholder="Thuê xe xanh, hành trình xanh" />
                <AdminInput label="Số điện thoại Hotline" placeholder="0123 456 789" />
                <AdminInput label="Địa chỉ Email chính" placeholder="support@xetulaipq.com" />
                <div className="md:col-span-2">
                  <AdminTextarea label="Địa chỉ trụ sở chính" placeholder="Nhập địa chỉ đầy đủ hiển thị ở footer..." />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <AdminInput label="Facebook URL" placeholder="https://facebook.com/..." />
                  <AdminInput label="TikTok URL" placeholder="https://tiktok.com/@..." />
                  <AdminInput label="YouTube URL" placeholder="https://youtube.com/c/..." />
                </div>
              </div>
            </AdminCard>
          )}

          {activeSettingsTab === "appearance" && (
            <AdminCard title="Tùy chọn hiển thị" subtitle="Thay đổi màu sắc chủ đạo và logo">
              <div className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AdminSelect label="Màu sắc chủ đạo">
                    <option>Xanh lá (Green - Primary)</option>
                    <option>Xanh dương (Blue)</option>
                    <option>Đỏ (Red)</option>
                  </AdminSelect>
                  <AdminSelect label="Chế độ hiển thị">
                    <option>Luôn luôn Sáng (Light)</option>
                    <option>Luôn luôn Tối (Dark)</option>
                    <option>Tự động theo hệ thống</option>
                  </AdminSelect>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none ml-1 mb-4">Logo Website (Sáng)</label>
                    <div className="aspect-video bg-gray-50 border border-dashed border-gray-200 rounded-3xl flex items-center justify-center relative overflow-hidden group">
                      <div className="flex flex-col items-center gap-3 text-gray-400 font-black uppercase tracking-widest text-[10px]">
                        <HiOutlineColorSwatch size={32} className="text-gray-200" />
                        Tải lên Logo mới
                      </div>
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none ml-1 mb-4">Logo Website (Tối)</label>
                    <div className="aspect-video bg-[#0f1117] border border-dashed border-gray-700 rounded-3xl flex items-center justify-center relative overflow-hidden group">
                      <div className="flex flex-col items-center gap-3 text-gray-600 font-black uppercase tracking-widest text-[10px]">
                        <HiOutlineColorSwatch size={32} className="opacity-20" />
                        Tải lên Logo mới
                      </div>
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </AdminCard>
          )}

          {/* Placeholder for other tabs with the same styling */}
          {activeSettingsTab !== "general" && activeSettingsTab !== "appearance" && (
             <AdminCard title={tabs.find(t => t.id === activeSettingsTab)?.label} subtitle="Tính năng đang được phát triển">
               <div className="p-20 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#18A14D]">
                    <HiOutlineGlobeAlt size={40} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 uppercase">Phân hệ {tabs.find(t => t.id === activeSettingsTab)?.label}</h3>
                  <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Chúng tôi đang cập nhật các cấu hình chuyên sâu này.</p>
               </div>
             </AdminCard>
          )}
        </div>
      </div>
    </div>
  );
}
