"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { mockCars } from "@/lib/data";
import { formatCurrencyVND } from "@/lib/utils";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineSearch } from "react-icons/hi";

export default function CarManagement() {
  const [cars, setCars] = useState(mockCars);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight underline decoration-[#18A14D]/40 decoration-4 underline-offset-4">Quản lý Xe</h1>
          <p className="text-gray-500 text-sm">Quản lý danh mục xe cho thuê và thông tin chi tiết.</p>
        </div>
        <button className="bg-[#18A14D] hover:bg-[#158c41] text-white font-black px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#18A14D]/20 active:scale-95">
          <HiOutlinePlus size={20} />
          THÊM XE MỚI
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#18A14D] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Tìm kiếm xe..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#18A14D]/50 focus:bg-white/10 transition"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-[#18A14D]/50">
            <option>Tất cả loại xe</option>
            <option>Xe điện</option>
            <option>Xe xăng</option>
          </select>
          <select className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-[#18A14D]/50">
            <option>Sắp xếp theo giá</option>
            <option>Tên xe (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Car List Table */}
      <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-gray-500 text-xs font-black uppercase tracking-widest">
                <th className="px-8 py-5">Ảnh</th>
                <th className="px-8 py-5">Tên Xe</th>
                <th className="px-8 py-5">Phân Loại</th>
                <th className="px-8 py-5">Giá / Ngày</th>
                <th className="px-8 py-5">Trạng Thái</th>
                <th className="px-8 py-5">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredCars.map((car) => (
                <tr key={car.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="w-16 h-12 rounded-xl bg-gray-800 overflow-hidden relative">
                      <img src={car.images[0]} alt={car.name} className="object-cover w-full h-full" />
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="font-bold text-white tracking-tight">{car.name}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-0.5">{car.slug}</div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      car.specs.fuel === 'Electric' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {car.specs.fuel}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-black text-white">
                    {formatCurrencyVND(car.price_per_day)}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${car.available ? 'bg-green-500' : 'bg-red-500'}`} />
                       <span className="font-bold text-xs text-gray-400">{car.available ? 'Còn xe' : 'Hết xe'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex gap-2">
                      <button className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-[#18A14D] hover:bg-[#18A14D]/5 transition-all">
                        <HiOutlinePencil size={18} />
                      </button>
                      <button className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-500/5 transition-all">
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
