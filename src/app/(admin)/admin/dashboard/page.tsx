"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { formatCurrencyVND } from "@/lib/utils";
import {
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineTruck,
  HiOutlineTrendingUp,
  HiOutlineCash,
  HiOutlineClock
} from "react-icons/hi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

const data = [
  { name: "01/04", bookings: 4, revenue: 2400000 },
  { name: "02/04", bookings: 3, revenue: 1800000 },
  { name: "03/04", bookings: 5, revenue: 3200000 },
  { name: "04/04", bookings: 8, revenue: 5600000 },
  { name: "05/04", bookings: 6, revenue: 4100000 },
  { name: "06/04", bookings: 12, revenue: 8400000 },
  { name: "07/04", bookings: 9, revenue: 6300000 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 124,
    totalRevenue: 85400000,
    totalCustomers: 42,
    activeCars: 12,
  });

  const [recentBookings, setRecentBookings] = useState([
    { id: "BK001", customer: "Nguyễn Văn A", car: "VinFast VF3", date: "2026-04-06", status: "confirmed", amount: 500000 },
    { id: "BK002", customer: "Trần Thị B", car: "VinFast VF5 Plus", date: "2026-04-06", status: "pending", amount: 750000 },
    { id: "BK003", customer: "Lê Văn C", car: "Mitsubishi Xpander", date: "2026-04-05", status: "completed", amount: 1800000 },
    { id: "BK004", customer: "Phạm Minh D", car: "VinFast VF3", date: "2026-04-05", status: "cancelled", amount: 500000 },
    { id: "BK005", customer: "Hoàng Văn E", car: "Limo Green", date: "2026-04-04", status: "completed", amount: 2400000 },
  ]);

  const statCards = [
    { label: "Tổng Đơn Đặt", value: stats.totalBookings, color: "text-blue-500", bg: "bg-blue-500/10", icon: HiOutlineCalendar },
    { label: "Doanh Thu", value: formatCurrencyVND(stats.totalRevenue), color: "text-green-500", bg: "bg-green-500/10", icon: HiOutlineCash },
    { label: "Khách Hàng", value: stats.totalCustomers, color: "text-purple-500", bg: "bg-purple-500/10", icon: HiOutlineUsers },
    { label: "Xe Đang Chạy", value: stats.activeCars, color: "text-orange-500", bg: "bg-orange-500/10", icon: HiOutlineTruck },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Chào buổi sáng, Admin</h1>
          <p className="text-gray-500 text-sm">Đây là tóm tắt hoạt động kinh doanh hôm nay.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-gray-400">
          <HiOutlineClock className="text-gray-500" />
          <span>Cập nhật mới nhất: 22:20 - 06/04/2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-[32px] p-6 shadow-sm hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center ${card.color}`}>
                <card.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
                <HiOutlineTrendingUp />
                <span>+12.5%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">{card.label}</p>
              <h3 className="text-2xl font-black text-white tracking-tighter">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[40px] p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-white tracking-tight">Biểu đồ Doanh thu & Booking</h2>
            <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-[#18A14D]/50">
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
              <option>Năm nay</option>
            </select>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18A14D" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#18A14D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a2030', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#18A14D" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white/5 border border-white/10 rounded-[40px] p-8">
          <h2 className="text-xl font-black text-white tracking-tight mb-8">Trạng thái xe</h2>
          <div className="space-y-6">
            {[
              { label: "Sẵn sàng", count: 8, total: 12, color: "bg-green-500", width: "w-[66%]" },
              { label: "Đang cho thuê", count: 3, total: 12, color: "bg-blue-500", width: "w-[25%]" },
              { label: "Đang bảo trì", count: 1, total: 12, color: "bg-red-500", width: "w-[8%]" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400 font-bold">{item.label}</span>
                  <span className="text-white font-black">{item.count}/{item.total}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} ${item.width} rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)]`} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-[#18A14D]/5 border border-[#18A14D]/10 rounded-3xl">
            <h4 className="text-sm font-black text-[#18A14D] mb-2 uppercase tracking-widest">Ghi chú nhanh</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              3 xe VinFast VF3 dự kiến sẽ được trả vào chiều nay lúc 17:00. Hãy kiểm tra tình trạng xe trước khi nhận bàn giao lại.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-black text-white tracking-tight">Đặt xe gần đây</h2>
          <button className="text-[#18A14D] hover:text-white transition font-black text-sm uppercase tracking-widest">
            Xem tất cả
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-gray-500 text-xs font-black uppercase tracking-widest">
                <th className="px-8 py-5">Mã Đơn</th>
                <th className="px-8 py-5">Khách Hàng</th>
                <th className="px-8 py-5">Dòng Xe</th>
                <th className="px-8 py-5">Ngày Nhận</th>
                <th className="px-8 py-5">Trạng Thái</th>
                <th className="px-8 py-5">Tổng Tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                  <td className="px-8 py-5 font-black text-gray-400 group-hover:text-white transition">#{booking.id}</td>
                  <td className="px-8 py-5">
                    <div className="font-bold text-white tracking-tight">{booking.customer}</div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-medium text-gray-400 group-hover:text-gray-200 transition">{booking.car}</span>
                  </td>
                  <td className="px-8 py-5 text-gray-400">
                    {booking.date}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      booking.status === 'confirmed' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                      booking.status === 'pending' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                      booking.status === 'completed' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                      'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                      {booking.status === 'confirmed' ? 'Đã xác nhận' :
                       booking.status === 'pending' ? 'Chờ duyệt' :
                       booking.status === 'completed' ? 'Hoàn thành' :
                       'Đã hủy'}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-black text-white">
                    {formatCurrencyVND(booking.amount)}
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
