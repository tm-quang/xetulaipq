"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineChevronRight } from "react-icons/hi";
import { BsCheckCircleFill, BsClockHistory, BsXCircleFill } from "react-icons/bs";

// Giả lập dữ liệu chuyến đi
const mockTrips = [
  {
    id: "TRP-84920",
    carName: "VinFast VF5 Plus",
    image: "/images/vf5/vf5.png",
    startDate: "2026-04-15",
    endDate: "2026-04-18",
    status: "upcoming", // upcoming, ongoing, completed, cancelled
    totalPrice: 1950000,
    bookingDate: "2026-04-01",
  },
  {
    id: "TRP-61230",
    carName: "VinFast VF3",
    image: "/images/vf3/vf3.jpg",
    startDate: "2026-03-10",
    endDate: "2026-03-12",
    status: "completed",
    totalPrice: 700000,
    bookingDate: "2026-03-05",
  },
  {
    id: "TRP-10924",
    carName: "VinFast Limo Green",
    image: "/images/mpv7/mpv7.jpg",
    startDate: "2026-02-25",
    endDate: "2026-02-26",
    status: "cancelled",
    totalPrice: 800000,
    bookingDate: "2026-02-20",
  }
];

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-1.5"><BsClockHistory /> Sắp tới</span>;
      case "ongoing":
        return <span className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span> Đang diễn ra</span>;
      case "completed":
        return <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-1.5"><BsCheckCircleFill /> Đã hoàn thành</span>;
      case "cancelled":
        return <span className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-1.5"><BsXCircleFill /> Đã hủy</span>;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const filteredTrips = activeTab === "all" ? mockTrips : mockTrips.filter(t => t.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter mb-2">Chuyến Đi Của Tôi</h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">Quản lý lịch trình và xem lại lịch sử thuê xe của bạn.</p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            { id: "all", label: "Tất cả" },
            { id: "upcoming", label: "Sắp tới" },
            { id: "ongoing", label: "Đang diễn ra" },
            { id: "completed", label: "Đã hoàn thành" },
            { id: "cancelled", label: "Đã hủy" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-bold text-sm transition-all snap-center ${
                activeTab === tab.id 
                  ? "bg-[#18A14D] text-white shadow-md shadow-[#18A14D]/20" 
                  : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Trips List */}
        <div className="flex flex-col gap-5">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <div key={trip.id} className="bg-white border border-gray-100 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row gap-6 md:items-center group">
                
                {/* Car Image */}
                <div className="relative w-full md:w-48 h-32 md:h-28 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image 
                    src={trip.image} 
                    alt={trip.carName} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest py-1">{trip.id}</span>
                    {getStatusBadge(trip.status)}
                  </div>
                  
                  <h3 className="text-xl font-black text-gray-900 mb-3">{trip.carName}</h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                      <HiOutlineCalendar className="text-[#18A14D]" size={18} />
                      <span>{new Date(trip.startDate).toLocaleDateString('vi-VN')} - {new Date(trip.endDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineLocationMarker className="text-[#18A14D]" size={18} />
                      <span>Phú Quốc</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                  <div className="text-left md:text-right mb-0 md:mb-4">
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Tổng cộng</div>
                    <div className="text-xl font-black text-[#18A14D]">{formatCurrency(trip.totalPrice)}</div>
                  </div>
                  <Link 
                    href={`/trips/${trip.id}`}
                    className="bg-gray-50 hover:bg-[#18A14D] text-gray-500 hover:text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all border border-gray-100 hover:border-[#18A14D] flex items-center gap-2 active:scale-95"
                  >
                    Chi Tiết <HiOutlineChevronRight size={16} />
                  </Link>
                </div>

              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 flex flex-col items-center justify-center">
               <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                 <HiOutlineCalendar size={40} className="text-gray-300" />
               </div>
               <h3 className="text-xl font-black text-gray-900 mb-2">Chưa có chuyến đi nào</h3>
               <p className="text-gray-500 font-medium mb-6">Bạn chưa có chuyến đi nào trong danh mục này.</p>
               <Link href="/cars" className="bg-[#18A14D] text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#138840] transition-colors shadow-lg shadow-[#18A14D]/30 active:scale-95">
                 Đặt xe ngay
               </Link>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
