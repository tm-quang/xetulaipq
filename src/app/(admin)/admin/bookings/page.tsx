"use client";

import { useState } from "react";
import { mockBookings, mockCars, mockUsers } from "@/lib/data";
import { formatCurrencyVND } from "@/lib/utils";
import { format } from "date-fns";
import { AdminCard, AdminTable, AdminBadge, AdminButton } from "@/components/admin/UI";
import { AdminModal } from "@/components/admin/Modal";
import { 
  HiOutlineSearch, 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight, 
  HiOutlineFilter,
  HiOutlineEye,
  HiOutlineDownload,
  HiOutlineRefresh,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineTruck,
  HiOutlineLocationMarker
} from "react-icons/hi";
import toast from "react-hot-toast";
import { Booking } from "@/types";

export default function BookingManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [bookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

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

  const handleView = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const handleUpdateStatus = (status: string) => {
    if (selectedBooking) {
      toast.success(`Đã cập nhật trạng thái đơn #${selectedBooking.id} thành ${status}`);
      setIsViewModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase leading-none mb-3">Quản lý đặt xe</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">Theo dõi lộ trình và trạng thái các đơn đặt xe</p>
        </div>
        <div className="flex gap-3">
          <AdminButton variant="outline">
            <HiOutlineDownload size={20} />
            XUẤT EXCEL
          </AdminButton>
          <AdminButton variant="secondary" size="icon" onClick={() => toast.success("Đang làm mới dữ liệu...")}>
            <HiOutlineRefresh size={20} />
          </AdminButton>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-center">
        <div className="flex bg-white border border-gray-100 p-1.5 rounded-[22px] overflow-x-auto shadow-sm w-full xl:w-auto">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? "bg-[#18A14D] text-white shadow-lg shadow-[#18A14D]/20 active:scale-95" 
                  : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex-1 flex gap-3 w-full">
          <div className="relative group flex-1">
             <HiOutlineSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#18A14D] transition-colors" size={20} />
             <input 
              type="text" 
              placeholder="Tìm theo mã đơn, khách hàng..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#18A14D]/50 transition shadow-sm"
            />
          </div>
          <AdminButton variant="outline" size="icon" className="w-14 h-14">
             <HiOutlineFilter size={22} />
          </AdminButton>
        </div>
      </div>

      <AdminCard title={`Danh sách đặt xe (${filteredBookings.length})`} subtitle="Lịch trình di chuyển của khách hàng">
        <AdminTable headers={["Mã Đơn", "Khách Hàng", "Xe & Lộ Trình", "Thời Gian", "Trạng Thái", "Tổng Tiền", ""]}>
          {filteredBookings.map((b) => {
            const user = mockUsers.find(u => u.id === b.user_id);
            const car = mockCars.find(c => c.id === b.car_id);
            return (
              <tr key={b.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer" onClick={() => handleView(b)}>
                <td className="px-6 py-4">
                  <div className="font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-tighter transition-colors">#{b.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-black text-gray-900 uppercase tracking-tight mb-1">{user?.name || "N/A"}</div>
                  <div className="text-[10px] text-gray-400 font-black tracking-widest">{user?.phone || ""}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-900 font-bold mb-1 line-clamp-1">{b.pickup_location}</div>
                  <div className="text-[10px] text-[#18A14D] font-black tracking-widest uppercase truncate">{car?.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-900 font-black text-xs leading-none">{format(new Date(b.start_date), "dd/MM/yyyy")}</div>
                  <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">đến {format(new Date(b.end_date), "dd/MM/yyyy")}</div>
                </td>
                <td className="px-6 py-4">
                  <AdminBadge variant={
                    b.status === 'pending' ? 'warning' :
                    b.status === 'confirmed' ? 'info' :
                    b.status === 'completed' ? 'success' :
                    'danger'
                  }>
                    {b.status === 'pending' ? 'Chờ duyệt' :
                     b.status === 'confirmed' ? 'Đã xác nhận' :
                     b.status === 'completed' ? 'Hoàn thành' :
                     'Đã hủy'}
                  </AdminBadge>
                </td>
                <td className="px-6 py-4 font-black text-gray-900 text-base tabular-nums">
                  {formatCurrencyVND(b.total_price)}
                </td>
                <td className="px-6 py-4 text-right">
                   <AdminButton variant="ghost" size="icon" className="w-9 h-9 text-gray-400 group-hover:text-[#18A14D]">
                      <HiOutlineEye size={20} />
                   </AdminButton>
                </td>
              </tr>
            );
          })}
        </AdminTable>
      </AdminCard>

      <div className="flex items-center justify-between pb-10">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Hiển thị 1 - {filteredBookings.length} của {bookings.length} bản ghi</span>
        <div className="flex gap-2">
           <AdminButton variant="outline" size="icon" disabled>
              <HiOutlineChevronLeft size={18} />
           </AdminButton>
           <AdminButton size="icon" className="w-10 h-10 shadow-md">1</AdminButton>
           <AdminButton variant="outline" size="icon">
              <HiOutlineChevronRight size={18} />
           </AdminButton>
        </div>
      </div>

      <AdminModal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        title="Chi tiết đơn đặt xe"
        size="lg"
        footer={
          <div className="flex justify-between w-full">
            <div className="flex gap-2">
              {selectedBooking?.status === 'pending' && (
                <>
                  <AdminButton variant="danger" onClick={() => handleUpdateStatus('cancelled')}>Từ chối</AdminButton>
                  <AdminButton onClick={() => handleUpdateStatus('confirmed')}>Xác nhận</AdminButton>
                </>
              )}
            </div>
            <AdminButton variant="ghost" onClick={() => setIsViewModalOpen(false)}>Đóng</AdminButton>
          </div>
        }
      >
        {selectedBooking && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="pb-4 border-b border-gray-50">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Thông tin khách hàng</h4>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500">
                    <HiOutlineUser size={24} />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 uppercase truncate">Nguyễn Văn A</p>
                    <p className="text-xs font-bold text-gray-400 uppercase">0123 456 789</p>
                  </div>
                </div>
              </div>
              <div className="pb-4 border-b border-gray-50">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Thông tin xe</h4>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500">
                    <HiOutlineTruck size={24} />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 uppercase truncate">VinFast VF3</p>
                    <p className="text-xs font-bold text-[#18A14D] uppercase">Xe điện thông minh</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="pb-4 border-b border-gray-50">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Lộ trình & Thời gian</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <HiOutlineLocationMarker className="mt-1 text-red-500" />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Điểm nhận</p>
                      <p className="text-xs font-bold text-gray-700 leading-tight">{selectedBooking.pickup_location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <HiOutlineCalendar className="mt-1 text-blue-500" />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Thời gian thuê</p>
                      <p className="text-xs font-bold text-gray-700 leading-tight">
                        {format(new Date(selectedBooking.start_date), "dd/MM/yyyy")} - {format(new Date(selectedBooking.end_date), "dd/MM/yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-[28px] border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Tổng tiền thanh toán</p>
                <p className="text-3xl font-black text-[#18A14D] tracking-tighter">{formatCurrencyVND(selectedBooking.total_price)}</p>
              </div>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
