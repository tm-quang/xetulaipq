"use client";

import { AdminCard, AdminButton } from "@/components/admin/UI";
import { HiOutlineSearch, HiOutlineUpload, HiOutlineTrash, HiOutlinePhotograph, HiOutlineEye } from "react-icons/hi";
import toast from "react-hot-toast";

export default function MediaManagement() {
  const images = [
    { id: 1, url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1470&auto=format&fit=crop", name: "banner-hero-1.jpg", size: "1.2 MB", date: "01/04/2026" },
    { id: 2, url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1470&auto=format&fit=crop", name: "car-vf3-red.png", size: "850 KB", date: "02/04/2026" },
    { id: 3, url: "https://images.unsplash.com/photo-1660634629768-4ad01ba0379c?q=80&w=1470&auto=format&fit=crop", name: "gallery-1.jpg", size: "2.4 MB", date: "03/04/2026" },
    { id: 4, url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bd?q=80&w=1470&auto=format&fit=crop", name: "profile-placeholder.jpg", size: "120 KB", date: "04/04/2026" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase leading-none mb-3">Thư viện truyền thông</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">Quản lý hình ảnh và tập tin của website</p>
        </div>
        <AdminButton onClick={() => toast.success("Đang mở trình tải lên tập tin...")}>
          <HiOutlineUpload size={20} />
          TẢI TẬP TIN LÊN
        </AdminButton>
      </div>

      <AdminCard className="p-4 overflow-visible">
        <div className="relative group w-full">
           <HiOutlineSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#18A14D] transition-colors" size={20} />
           <input 
            type="text" 
            placeholder="Tìm kiếm theo tên tập tin..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#18A14D]/50 transition shadow-sm"
          />
        </div>
      </AdminCard>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-white border border-gray-100 rounded-[32px] overflow-hidden group shadow-sm hover:shadow-2xl hover:border-[#18A14D]/20 transition-all hover:-translate-y-2 relative">
            <div className="aspect-square bg-gray-50 overflow-hidden relative">
              <img src={img.url} alt={img.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 scale-90 group-hover:scale-100 transition-transform">
                <AdminButton variant="secondary" size="icon" className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-[#18A14D] border-none">
                  <HiOutlineEye size={20} />
                </AdminButton>
                <AdminButton variant="danger" size="icon" className="w-10 h-10 rounded-xl bg-red-500 text-white hover:bg-red-600 border-none shadow-xl shadow-red-500/30" onClick={() => toast.success("Đã xóa tập tin khỏi thư viện")}>
                  <HiOutlineTrash size={20} />
                </AdminButton>
              </div>
            </div>
            <div className="p-5">
              <p className="text-[11px] font-black text-gray-900 truncate uppercase tracking-tight mb-2 leading-none">{img.name}</p>
              <div className="flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">
                <span>{img.size}</span>
                <span>{img.date}</span>
              </div>
            </div>
          </div>
        ))}

        <button className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center gap-3 text-gray-300 hover:border-[#18A14D] hover:bg-green-50 hover:text-[#18A14D] transition-all group">
          <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
            <HiOutlinePhotograph size={32} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Thả tập tin tại đây</span>
        </button>
      </div>
    </div>
  );
}
