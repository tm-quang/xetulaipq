"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { mockUsers, mockBookings } from "@/lib/data";
import { HiOutlineSearch, HiOutlineMail, HiOutlinePhone, HiOutlineCalendar, HiOutlinePlus } from "react-icons/hi";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const getCustomerBookingsCount = (userId: string) => {
    return mockBookings.filter(b => b.user_id === userId).length;
  };

  const getCustomerTotalSpend = (userId: string) => {
    return mockBookings
      .filter(b => b.user_id === userId)
      .reduce((sum, b) => sum + b.total_price, 0);
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight underline decoration-[#18A14D]/40 decoration-4 underline-offset-4">Quản lý Khách hàng</h1>
          <p className="text-gray-500 text-sm font-medium">Danh sách khách hàng đã từng đặt xe tại hệ thống.</p>
        </div>
        <button className="bg-[#18A14D] hover:bg-[#158c41] text-white font-black px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#18A14D]/20 active:scale-95 text-sm">
          <HiOutlinePlus size={20} />
          THÊM KHÁCH HÀNG
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#18A14D] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Tìm theo tên, email, số điện thoại..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#18A14D]/50 focus:bg-white/10 transition"
          />
        </div>
        <select className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-sm text-gray-400 focus:outline-none focus:border-[#18A14D]/50">
            <option>Tất cả nhóm</option>
            <option>Khách quen (Vip)</option>
            <option>Khách hàng mới</option>
          </select>
      </div>

      {/* Customer List Grid/Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white/5 border border-white/10 rounded-[32px] p-8 hover:border-white/20 transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#18A14D]/5 rounded-bl-[60px] translate-x-8 translate-y-[-8px] transition group-hover:scale-125" />
             <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#18A14D] to-[#0e7a38] flex items-center justify-center font-black text-white text-xl shadow-lg shadow-[#18A14D]/20">
                    {customer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                   <h3 className="text-lg font-black text-white tracking-tight">{customer.name}</h3>
                   <div className="px-2 py-0.5 bg-white/5 rounded-lg text-[9px] font-black text-gray-500 uppercase tracking-widest inline-block mt-0.5">Mã KH: {customer.id}</div>
                </div>
             </div>

             <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-200 transition-colors">
                   <HiOutlineMail className="text-[#18A14D]" size={16} />
                   <span className="text-sm font-medium">{customer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-200 transition-colors">
                   <HiOutlinePhone className="text-[#18A14D]" size={16} />
                   <span className="text-sm font-medium">{customer.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-200 transition-colors">
                   <HiOutlineCalendar className="text-[#18A14D]" size={16} />
                   <span className="text-sm font-medium">Hợp tác từ: 2023-11-12</span>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div className="text-center">
                   <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Số đơn hàng</div>
                   <div className="text-xl font-black text-white">{getCustomerBookingsCount(customer.id)}</div>
                </div>
                <div className="text-center">
                   <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Tổng chi tiêu</div>
                   <div className="text-xl font-black text-[#18A14D]">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getCustomerTotalSpend(customer.id)/1000000).replace('₫', '')}M
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
