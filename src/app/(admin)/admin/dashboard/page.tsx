"use client";

import { useState } from "react";
import { formatCurrencyVND } from "@/lib/utils";
import { AdminCard, AdminTable, AdminBadge, AdminButton } from "@/components/admin/UI";
import {
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineTruck,
  HiOutlineTrendingUp,
  HiOutlineCash,
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineEye
} from "react-icons/hi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
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
  const [stats] = useState({
    totalBookings: 124,
    totalRevenue: 85400000,
    totalCustomers: 42,
    activeCars: 12,
  });

  const [recentBookings] = useState([
    { id: "BK001", customer: "Nguyễn Văn A", car: "VinFast VF3", date: "2026-04-06", status: "confirmed", amount: 500000 },
    { id: "BK002", customer: "Trần Thị B", car: "VinFast VF5 Plus", date: "2026-04-06", status: "pending", amount: 750000 },
    { id: "BK003", customer: "Lê Văn C", car: "Mitsubishi Xpander", date: "2026-04-05", status: "completed", amount: 1800000 },
    { id: "BK004", customer: "Phạm Minh D", car: "VinFast VF3", date: "2026-04-05", status: "cancelled", amount: 500000 },
    { id: "BK005", customer: "Hoàng Văn E", car: "Limo Green", date: "2026-04-04", status: "completed", amount: 2400000 },
  ]);

  const statCards = [
    { label: "Tổng Đơn Đặt", value: stats.totalBookings, color: "text-[#18A14D]", bg: "bg-[#18A14D]/10", icon: HiOutlineCalendar, trend: "+12.5%" },
    { label: "Doanh Thu", value: formatCurrencyVND(stats.totalRevenue), color: "text-blue-600", bg: "bg-blue-600/10", icon: HiOutlineCash, trend: "+8.2%" },
    { label: "Khách Hàng", value: stats.totalCustomers, color: "text-purple-600", bg: "bg-purple-600/10", icon: HiOutlineUsers, trend: "+15.3%" },
    { label: "Xe Đang Chạy", value: stats.activeCars, color: "text-orange-600", bg: "bg-orange-600/10", icon: HiOutlineTruck, trend: "+2.5%" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase leading-none mb-3">Tổng quan hệ thống</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">Cập nhật lúc: 22:20 - 06/04/2026</p>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-[#18A14D] shadow-sm">
          <HiOutlineClock size={16} />
          Hoạt động hôm nay
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:border-[#18A14D]/20 transition-all group active:scale-[0.98]">
            <div className="flex items-center justify-between mb-6">
              <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center ${card.color} shadow-sm group-hover:scale-110 transition-transform`}>
                <card.icon size={28} />
              </div>
              <div className="flex items-center gap-1.5 text-[#18A14D] text-[11px] font-black uppercase tracking-widest">
                <HiOutlineTrendingUp size={16} />
                <span>{card.trend}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-2 leading-none">{card.label}</p>
              <h3 className="text-2xl font-black text-gray-900 tracking-tighter leading-none group-hover:text-[#18A14D] transition-colors">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <AdminCard 
            title="Biểu đồ Doanh thu & Booking" 
            subtitle="Thống kê hiệu suất kinh doanh 7 ngày qua"
            extra={
              <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 focus:outline-none focus:border-[#18A14D] transition cursor-pointer">
                <option>7 ngày qua</option>
                <option>30 ngày qua</option>
                <option>Năm nay</option>
              </select>
            }
          >
            <div className="p-8 h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#18A14D" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#18A14D" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(0,0,0,0.3)', fontSize: 11, fontWeight: 'bold' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(0,0,0,0.3)', fontSize: 11, fontWeight: 'bold' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #f3f4f6', borderRadius: '20px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    itemStyle={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}
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
          </AdminCard>
        </div>

        {/* Status Distribution */}
        <div>
          <AdminCard title="Trạng thái đội xe" subtitle="Tình trạng khả dụng hiện tại">
            <div className="p-8 space-y-8">
              {[
                { label: "Sẵn sàng", count: 8, total: 12, color: "bg-[#18A14D]", width: "w-[66%]", labelColor: "text-green-600" },
                { label: "Đang cho thuê", count: 3, total: 12, color: "bg-blue-600", width: "w-[25%]", labelColor: "text-blue-600" },
                { label: "Đang bảo trì", count: 1, total: 12, color: "bg-red-600", width: "w-[8%]", labelColor: "text-red-600" },
              ].map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none group-hover:text-gray-900 transition-colors">{item.label}</span>
                    <span className={`text-sm font-black tracking-tighter leading-none ${item.labelColor}`}>{item.count}/{item.total}</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-0.5">
                    <div className={`h-full ${item.color} ${item.width} rounded-full shadow-sm shadow-black/10 transition-all duration-1000`} />
                  </div>
                </div>
              ))}

              <div className="mt-12 p-6 bg-[#18A14D]/5 border border-[#18A14D]/10 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#18A14D]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <h4 className="text-[10px] font-black text-[#18A14D] mb-3 uppercase tracking-widest relative z-10">Lưu ý hôm nay</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-bold relative z-10">
                  3 xe <span className="text-[#18A14D]">VinFast VF3</span> dự kiến sẽ được trả vào chiều nay lúc <span className="text-gray-900">17:00</span>.
                </p>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <AdminCard 
        title="Đặt xe gần đây" 
        subtitle="Danh sách các đơn đặt mới nhất trong hệ thống"
        extra={
          <AdminButton variant="outline" size="sm">
            Tất cả đơn đặt <HiOutlineArrowRight className="ml-2" />
          </AdminButton>
        }
      >
        <AdminTable headers={["Mã Đơn", "Khách Hàng", "Dòng Xe", "Ngày Nhận", "Trạng Thái", "Tổng Tiền", "Thao Tác"]}>
          {recentBookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
              <td className="px-6 py-4 text-gray-900">#{booking.id}</td>
              <td className="px-6 py-4">
                <div className="text-gray-900 uppercase tracking-tight">{booking.customer}</div>
              </td>
              <td className="px-6 py-4">
                <span className="text-gray-400 group-hover:text-gray-900 transition-colors">{booking.car}</span>
              </td>
              <td className="px-6 py-4 text-gray-400 font-medium">
                {booking.date}
              </td>
              <td className="px-6 py-4">
                <AdminBadge variant={
                  booking.status === 'confirmed' ? 'info' :
                  booking.status === 'pending' ? 'warning' :
                  booking.status === 'completed' ? 'success' :
                  'danger'
                }>
                  {booking.status === 'confirmed' ? 'Đã xác nhận' :
                   booking.status === 'pending' ? 'Chờ duyệt' :
                   booking.status === 'completed' ? 'Hoàn thành' :
                   'Đã hủy'}
                </AdminBadge>
              </td>
              <td className="px-6 py-4 font-black text-gray-900">
                {formatCurrencyVND(booking.amount)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <AdminButton variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-gray-400 hover:text-[#18A14D] transition-all">
                    <HiOutlineEye size={16} />
                  </AdminButton>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
    </div>
  );
}
