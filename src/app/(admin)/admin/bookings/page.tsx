"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { mockBookings, mockCars, mockUsers } from "@/lib/data";
import { formatCurrencyVND } from "@/lib/utils";
import { format } from "date-fns";
import { 
  HiOutlineSearch, 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight, 
  HiOutlineFilter,
  HiOutlineEye,
  HiOutlineDownload,
  HiOutlineRefresh
} from "react-icons/hi";

export default function BookingManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [bookings, setBookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ duyệt';
      case 'confirmed': return 'Đã xác nhận';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-500/10 border-orange-500/20 text-orange-400';
      case 'confirmed': return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      case 'completed': return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/10 border-red-500/20 text-red-400';
      default: return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
    }
  };

  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "pending", label: "Chờ duyệt" },
    { id: "confirmed", label: "Đã xác nhận" },
    { id: "completed", label: "Hoàn thành" },
    { id: "cancelled", label: "Đã hủy" },
  ];

  const filteredBookings = bookings.filter(b => {
    const user = mockUsers.find(u => u.id === b.user_id);
    const matchesSearch = user?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || b.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight underline decoration-[#18A14D]/40 decoration-4 underline-offset-4">Đặt xe (Bookings)</h1>
          <p className="text-gray-500 text-sm font-medium">Quản lý các yêu cầu đặt xe và lộ trình di chuyển.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-black px-4 py-3 rounded-2xl flex items-center gap-2 transition-all">
            <HiOutlineDownload size={20} />
            XUẤT EXCEL
          </button>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-black px-4 py-3 rounded-2xl transition-all">
            <HiOutlineRefresh size={20} />
          </button>
        </div>
      </div>

      {/* Filters & Tabs */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl overflow-x-auto hide-scrollbar whitespace-nowrap">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? "bg-[#18A14D] text-white shadow-lg shadow-[#18A14D]/20 active:scale-95" 
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex-1 flex gap-3">
          <div className="relative group flex-1">
             <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#18A14D] transition-colors" size={20} />
             <input 
              type="text" 
              placeholder="Tìm theo mã đơn, tên khách hàng..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#18A14D]/50 focus:bg-white/10 transition"
            />
          </div>
          <button className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl text-gray-400">
             <HiOutlineFilter size={20} />
          </button>
        </div>
      </div>

      {/* Booking List Table */}
      <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                <th className="px-8 py-6">Mã Đơn</th>
                <th className="px-8 py-6">Khách Hàng</th>
                <th className="px-8 py-6">Lộ Trình / Xe</th>
                <th className="px-8 py-6">Thời Gian</th>
                <th className="px-8 py-6 text-center">Trạng Thái</th>
                <th className="px-8 py-6 text-right">Tổng Tiền</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => {
                  const user = mockUsers.find(u => u.id === b.user_id);
                  const car = mockCars.find(c => c.id === b.car_id);
                  return (
                    <tr key={b.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="px-8 py-6">
                        <div className="font-black text-gray-400 group-hover:text-white uppercase tracking-tighter">#{b.id}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-bold text-white tracking-tight leading-none mb-1">{user?.name || "N/A"}</div>
                        <div className="text-[10px] text-gray-500 font-bold">{user?.phone || ""}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-white text-xs font-bold mb-1">{b.pickup_location}</div>
                        <div className="text-[10px] text-gray-500 font-black tracking-widest leading-none uppercase">{car?.name}</div>
                      </td>
                      <td className="px-8 py-6 text-gray-400 text-xs">
                        <div className="font-bold text-gray-300">{format(new Date(b.start_date), "dd/MM/yyyy")}</div>
                        <div className="opacity-50">{format(new Date(b.end_date), "dd/MM/yyyy")}</div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(b.status)} inline-block min-w-[120px]`}>
                          {getStatusLabel(b.status)}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right font-black text-white text-base">
                        {formatCurrencyVND(b.total_price)}
                      </td>
                      <td className="px-8 py-6 text-right">
                         <button className="text-[#18A14D] hover:text-white p-2 rounded-xl bg-[#18A14D]/5 hover:bg-[#18A14D] transition-all">
                            <HiOutlineEye size={18} />
                         </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                   <td colSpan={7} className="px-8 py-20 text-center text-gray-500 font-bold italic">
                      Không tìm thấy bản ghi nào khớp với điều kiện tìm kiếm.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between font-bold text-gray-500 text-xs px-2 translate-y-[-10px]">
        <span>Hiển thị 1 - {filteredBookings.length} của {bookings.length} bản ghi</span>
        <div className="flex gap-2">
           <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all opacity-50 cursor-not-allowed">
              <HiOutlineChevronLeft size={18} />
           </button>
           <button className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">1</button>
           <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
              <HiOutlineChevronRight size={18} />
           </button>
        </div>
      </div>
    </div>
  );
}
