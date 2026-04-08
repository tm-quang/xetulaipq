"use client";

import CarCard from "@/components/CarCard";
import { mockCars } from "@/lib/data";
import { useState } from "react";
import { HiSearch, HiCalendar, HiAdjustments, HiChevronDown } from "react-icons/hi";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { format } from "date-fns";

import { useSearchParams } from "next/navigation";
import { useMemo, useEffect } from "react";
import { isCarAvailable } from "@/lib/utils";
import { mockBookings, mockCarUnits } from "@/lib/data";
import { parseISO } from "date-fns";

export default function CarsListingPage() {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialDates = useMemo(() => {
    const startStr = searchParams.get('start');
    const endStr = searchParams.get('end');
    const startTime = searchParams.get('start_time') || "14:00";
    const endTime = searchParams.get('end_time') || "12:00";

    return {
      startDate: startStr ? parseISO(startStr) : new Date(),
      endDate: endStr ? parseISO(endStr) : new Date(new Date().setDate(new Date().getDate() + 1)),
      startTime,
      endTime
    };
  }, [searchParams]);

  const [dateTime, setDateTime] = useState(initialDates);

  useEffect(() => {
    setDateTime(initialDates);
  }, [initialDates]);

  const availableCars = useMemo(() => {
    return mockCars.filter(car =>
      isCarAvailable(car, mockCarUnits, mockBookings, dateTime.startDate, dateTime.endDate)
    );
  }, [dateTime]);

  const handleConfirmDateTime = (data: typeof dateTime) => {
    setDateTime(data);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Search & Header Section */}
      <section className="bg-gray-900 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#18A14D]/10 rounded-full blur-3xl -z-0" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-2xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight leading-tight">
              Tìm mẫu xe <br /> <span className="text-[#18A14D]">Lý tưởng cho bạn</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-4 bg-white/5 backdrop-blur-md p-2 rounded-[32px] border border-white/10 shadow-2xl">
              <div className="flex-1 flex items-center gap-4 px-6 py-4 bg-white rounded-[24px] shadow-sm">
                <HiSearch className="text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Bạn muốn tìm xe gì..."
                  className="bg-transparent border-none w-full outline-none font-bold text-gray-800 placeholder:text-gray-400"
                />
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-4 px-6 py-4 bg-white rounded-[24px] shadow-sm hover:bg-gray-50 transition-all text-left"
              >
                <div className="bg-[#18A14D]/10 w-10 h-10 rounded-xl flex items-center justify-center text-[#18A14D]">
                  <HiCalendar size={20} />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Thời gian thuê</p>
                  <p className="font-bold text-gray-800 text-sm">
                    {format(dateTime.startDate, "dd/MM")} - {format(dateTime.endDate, "dd/MM")}
                  </p>
                </div>
                <HiChevronDown className="text-gray-300" />
              </button>

              <button className="bg-[#18A14D] hover:bg-[#158c42] text-white px-10 py-4 rounded-[24px] font-black uppercase tracking-widest text-sm shadow-xl shadow-[#18A14D]/20 transition-all active:scale-95 leading-none">
                Lọc ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-10">
              <div>
                <h3 className="flex items-center gap-2 font-black text-gray-900 uppercase tracking-widest text-sm mb-6">
                  <HiAdjustments className="text-[#18A14D]" /> Bộ lọc nâng cao
                </h3>

                {/* Category Filter */}
                <div className="mb-10">
                  <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-4">Dòng xe điện</h4>
                  <div className="space-y-3">
                    {['VF3', 'VF5'].map((cat) => (
                      <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative flex items-center justify-center">
                          <input type="checkbox" className="peer appearance-none w-5 h-5 rounded-lg border-2 border-gray-200 checked:bg-[#18A14D] checked:border-[#18A14D] transition-all cursor-pointer" />
                          <div className="absolute text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none">
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-tight">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="mb-10">
                  <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-4">Khoảng giá / Ngày</h4>
                  <div className="space-y-3 font-bold text-sm text-gray-600 uppercase tracking-tight">
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="price" className="w-5 h-5 border-2 border-gray-200 text-[#18A14D] focus:ring-[#18A14D]" /> Dưới 500k</label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="price" className="w-5 h-5 border-2 border-gray-200 text-[#18A14D] focus:ring-[#18A14D]" /> 500k - 800k</label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="price" className="w-5 h-5 border-2 border-gray-200 text-[#18A14D] focus:ring-[#18A14D]" /> Trên 800k</label>
                  </div>
                </div>

                {/* Status Filter */}
                <div className="mb-10">
                  <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-4">Trạng thái</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-gray-200 checked:bg-[#18A14D] checked:border-[#18A14D]" /> <span className="text-sm font-bold text-gray-600 uppercase tracking-tight">Xe đang trống</span></label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-gray-200 checked:bg-[#18A14D] checked:border-[#18A14D]" /> <span className="text-sm font-bold text-gray-600 uppercase tracking-tight">Đang có ưu đãi</span></label>
                  </div>
                </div>

                <button className="w-full bg-gray-900 hover:bg-black text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 uppercase tracking-widest text-xs">
                  Xóa tất cả lọc
                </button>
              </div>
            </div>
          </aside>

          {/* Cars Grid */}
          <main className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div>
                <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mb-1">Kết quả tìm kiếm</p>
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Hiển thị <span className="text-[#18A14D]">{availableCars.length}</span> xe phù hợp</h2>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-3 pr-2">Sắp xếp:</span>
                <select className="bg-white border-none rounded-xl text-xs font-black uppercase tracking-widest focus:ring-2 ring-[#18A14D]/20 p-2.5 pr-8 shadow-sm">
                  <option>Phổ biến nhất</option>
                  <option>Giá: Thấp đến Cao</option>
                  <option>Giá: Cao xuống Thấp</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-8">
              {availableCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            {/* Empty State / Pagination placeholder */}
            <div className="mt-20 text-center py-20 border-2 border-dashed border-gray-100 rounded-[48px]">
              <p className="text-gray-400 font-bold mb-4">Bạn không tìm thấy mẫu xe mong muốn?</p>
              <button className="text-[#18A14D] font-black uppercase tracking-widest text-sm hover:underline">Liên hệ tư vấn ngay</button>
            </div>
          </main>
        </div>
      </div>

      <DateTimePickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialStartDate={dateTime.startDate}
        initialEndDate={dateTime.endDate}
        onConfirm={handleConfirmDateTime}
      />
    </div>
  );
}

