"use client";

import { useState } from "react";
import { format } from "date-fns";
import { HiCalendar, HiUser, HiPhone, HiPaperAirplane, HiChevronDown } from "react-icons/hi";
import { FaCar } from "react-icons/fa";
import { LuCircleUserRound } from "react-icons/lu";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const DateTimePickerModal = dynamic(() => import("./DateTimePickerModal"), { ssr: false });

export default function HeroBookingForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"self-drive" | "with-driver">("self-drive");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dateTime, setDateTime] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    startTime: "14:00",
    endTime: "12:00",
  });

  const [contact, setContact] = useState({
    name: "",
    phone: "",
  });

  const handleConfirmDateTime = (data: typeof dateTime) => {
    setDateTime(data);
    setIsModalOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/cars');
  };

  return (
    <div className="mx-auto max-w-6xl relative z-20 px-3 md:px-0">
      <div className="max-w-[420px] md:max-w-none mx-auto flex flex-col md:items-center">
        {/* Tabs */}
        <div className="flex md:inline-flex w-full md:w-auto bg-white rounded-t-[20px] md:rounded-t-[24px] overflow-hidden shadow-[0_-10px_20px_rgba(0,0,0,0.03)] relative z-20 -mb-[1px]">
          <button
            onClick={() => setActiveTab("self-drive")}
            className={`flex-1 md:flex-none px-2 sm:px-4 md:px-12 py-5 md:py-5 font-extrabold text-sm sm:text-xs md:text-base transition-all flex items-center justify-center gap-1.5 md:gap-2 uppercase tracking-wider
              ${activeTab === "self-drive" ? "bg-[#18A14D] text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
          >
            <LuCircleUserRound size={18} className={activeTab === "self-drive" ? "text-white" : "text-gray-500"} />
            Xe tự lái
          </button>
          <button
            onClick={() => setActiveTab("with-driver")}
            className={`flex-1 md:flex-none px-2 sm:px-4 md:px-12 py-5 md:py-5 font-extrabold text-sm sm:text-xs md:text-base transition-all flex items-center justify-center gap-1.5 md:gap-2 uppercase tracking-wider
              ${activeTab === "with-driver" ? "bg-[#18A14D] text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
          >
            <FaCar size={18} className={activeTab === "with-driver" ? "text-white" : "text-gray-500"} />
            Thuê dài hạn
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] rounded-t-none md:rounded-t-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-5 md:p-8 flex flex-col md:flex-row items-end gap-4 md:gap-5 relative z-10 w-full border-t border-gray-50 md:border-[1px]">
          <div className="flex-1 w-full flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-5">
            {/* DateTime Selection */}
            <div className="space-y-2">
              <label className="block text-sm md:text-md font-black text-gray-500 uppercase tracking-widest pl-1">
                Thời gian thuê
              </label>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center gap-3 bg-white hover:bg-gray-50/50 border border-gray-100 p-2.5 md:p-3 rounded-2xl transition-all cursor-pointer group text-left h-[64px] md:h-[70px] focus:ring-2 ring-[#18A14D]/20 focus:border-[#18A14D]/40 shadow-sm"
              >
                <div className="bg-gray-100 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#18A14D] transition-colors border border-gray-100/50 flex-shrink-0">
                  <HiCalendar size={20} />
                </div>
                <div className="flex-1 overflow-hidden min-w-0 pr-2">
                  <p className="font-bold text-gray-800 text-[13px] md:text-sm truncate mb-0.5 whitespace-nowrap">
                    {format(dateTime.startDate, "dd/MM/yyyy")} - {format(dateTime.endDate, "dd/MM/yyyy")}
                  </p>
                  <p className="text-sm md:text-md text-gray-500 truncate">
                    {dateTime.startTime} Nhận - {dateTime.endTime} Trả
                  </p>
                </div>
                <HiChevronDown className="text-gray-300 ml-auto flex-shrink-0 group-hover:text-gray-500" size={16} />
              </button>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm md:text-md font-black text-gray-500 uppercase tracking-widest pl-1">
                Họ tên
              </label>
              <div className="flex items-center gap-2 bg-white hover:bg-gray-50/50 border border-gray-100 p-2 md:p-3 rounded-2xl transition-all group h-[64px] md:h-[70px] focus-within:ring-2 ring-[#18A14D]/20 focus-within:border-[#18A14D]/40 shadow-sm">
                <div className="bg-gray-100 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-gray-400 group-focus-within:text-[#18A14D] transition-colors border border-gray-100/50 flex-shrink-0">
                  <HiUser size={20} />
                </div>
                <input
                  type="text"
                  placeholder="..."
                  className="flex-1 bg-transparent border-0 border-transparent p-0 m-0 text-gray-800 text-lg md:text-md focus:ring-0 focus:border-transparent focus:outline-none outline-none shadow-none placeholder:text-gray-300 pl-1 w-full h-full"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="block text-sm md:text-md font-black text-gray-500 uppercase tracking-widest pl-1">
                Số điện thoại
              </label>
              <div className="flex items-center gap-2 bg-white hover:bg-gray-50/50 border border-gray-100 p-2 md:p-3 rounded-2xl transition-all group h-[64px] md:h-[70px] focus-within:ring-2 ring-[#18A14D]/20 focus-within:border-[#18A14D]/40 shadow-sm">
                <div className="bg-gray-100 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-gray-400 group-focus-within:text-[#18A14D] transition-colors border border-gray-100/50 flex-shrink-0">
                  <HiPhone size={20} />
                </div>
                <input
                  type="tel"
                  placeholder="..."
                  className="flex-1 bg-transparent border-0 border-transparent p-0 m-0 text-gray-800 text-lg md:text-md focus:ring-0 focus:border-transparent focus:outline-none outline-none shadow-none placeholder:text-gray-300 pl-1 w-full h-full"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="w-full md:w-[180px] mt-1 md:mt-0 pt-2 md:pt-0">
            <button
              onClick={handleSearch}
              className="w-full h-[56px] md:h-[70px] bg-[#18A14D] hover:bg-[#158c42] text-white font-extrabold px-4 rounded-xl md:rounded-2xl shadow-[0_10px_20px_rgba(24,161,77,0.2)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap uppercase tracking-widest text-md md:text-md"
            >
              <HiPaperAirplane className="rotate-45" size={18} />
              Gửi Yêu Cầu
            </button>
          </div>
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
