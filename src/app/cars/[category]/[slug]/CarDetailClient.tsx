"use client";

import { Car } from "@/types";
import { formatCurrencyVND } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { MdEventSeat, MdOutlineSettingsSuggest } from "react-icons/md";
import { BsEvFront } from "react-icons/bs";
import { HiCalendar, HiLocationMarker, HiX } from "react-icons/hi";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { format, differenceInDays, startOfDay } from "date-fns";

export default function CarDetailClient({ car }: { car: Car }) {
  const [mainImage, setMainImage] = useState(car.images[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateTime, setDateTime] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    startTime: "14:00",
    endTime: "12:00",
  });
  const [location, setLocation] = useState("");
  const [voucher, setVoucher] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; type: 'fixed' | 'percent' | 'freeship'; value: number } | null>(null);
  const [voucherError, setVoucherError] = useState("");

  const locations = [
    "Sân bay Phú Quốc",
    "Cảng Bãi Vòng",
    "Cảng An Thới",
    "Vinpearl / Grand World",
    "Thị trấn Dương Đông",
    "Phường An Thới",
    "Bãi Ông Lang"
  ];

  const handleApplyVoucher = () => {
    setVoucherError("");
    const code = voucher.trim().toUpperCase();
    if (!code) return;

    // Mock vouchers
    if (code === "PQ50") {
      setAppliedVoucher({ code, type: 'fixed', value: 50000 });
    } else if (code === "GET10") {
      setAppliedVoucher({ code, type: 'percent', value: 10 });
    } else if (code === "FREESHIP") {
      setAppliedVoucher({ code, type: 'freeship', value: 0 });
    } else {
      setVoucherError("Mã voucher không hợp lệ hoặc đã hết hạn");
      setAppliedVoucher(null);
    }
  };

  // Lock body scroll when zoom modal is open
  useEffect(() => {
    if (isZoomed || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [isZoomed, isModalOpen]);

  const rentalDays = useMemo(() => {
    const start = startOfDay(dateTime.startDate);
    const end = startOfDay(dateTime.endDate);
    const days = differenceInDays(end, start);
    return Math.max(1, days);
  }, [dateTime]);

  const deliveryFee = appliedVoucher?.type === 'freeship' ? 0 : 0; // Currently all are free, but prepared for future

  const { discountAmount, finalTotal } = useMemo(() => {
    const baseTotal = rentalDays * car.price_per_day;
    let discount = 0;
    
    if (appliedVoucher) {
      if (appliedVoucher.type === 'fixed') {
        discount = appliedVoucher.value;
      } else if (appliedVoucher.type === 'percent') {
        discount = (baseTotal * appliedVoucher.value) / 100;
      }
    }
    
    return {
      discountAmount: discount,
      finalTotal: Math.max(0, baseTotal + deliveryFee - discount)
    };
  }, [rentalDays, car.price_per_day, appliedVoucher, deliveryFee]);

  const totalPrice = rentalDays * car.price_per_day;

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-12">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Info - 8 cols */}
          <div className="lg:col-span-8">
            {/* Gallery */}
            <div
              className="relative aspect-[16/9] md:aspect-[4/2.5] rounded-[32px] overflow-hidden mb-6 shadow-md border cursor-zoom-in group"
              onClick={() => setIsZoomed(true)}
            >
              <Image
                src={mainImage}
                alt={car.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>

            {car.images.length > 1 && (
              <div className="flex gap-4 mb-10 overflow-x-auto pb-4 snap-x hide-scrollbar">
                {car.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`relative w-24 h-24 md:w-36 md:h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 cursor-pointer snap-start transition-all ${mainImage === img ? 'border-[#18A14D] shadow-lg ring-4 ring-[#18A14D]/10' : 'border-gray-100 hover:border-gray-300'}`}
                  >
                    <Image src={img} alt={`${car.name} view ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            <h1 className="text-2xl md:text-6xl font-black mb-4 uppercase tracking-tight text-gray-900 leading-none">{car.name}</h1>

            <div className="flex flex-wrap gap-2 mb-8">
              <div className="flex bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl items-center gap-2 font-bold text-gray-600 text-xs">
                <MdOutlineSettingsSuggest size={18} className="text-[#18A14D]" /> {car.specs.transmission}
              </div>
              <div className="flex bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl items-center gap-2 font-bold text-gray-600 text-xs">
                <MdEventSeat size={18} className="text-[#18A14D]" /> {car.specs.seats} Chỗ
              </div>
              <div className="flex bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl items-center gap-2 font-bold text-gray-600 text-xs">
                <BsEvFront size={18} className="text-[#18A14D]" /> {car.specs.fuel}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="content">
                <h2 className="text-xl font-black mb-5 uppercase tracking-widest text-gray-400">Đặc điểm xe</h2>
                <ul className="space-y-4">
                  {[
                    'Xe điện thông minh, không khí thải',
                    'Nội thất bọc da cao cấp, sạch sẽ',
                    'Hỗ trợ đỗ xe tự động, camera 360',
                    'Pin sạc đầy, vận hành êm ái'
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-gray-700 font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#18A14D]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="content">
                <h2 className="text-xl font-black mb-5 uppercase tracking-widest text-gray-400">Điều khoản</h2>
                <ul className="space-y-4">
                  {[
                    'Bảo hiểm vật chất 2 chiều',
                    'Giao nhận tận nơi 24/7',
                    'Hỗ trợ cứu hộ trên toàn đảo',
                    'Thủ tục nhanh gọn, không giữ cọc'
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-gray-700 font-bold">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar Booking Form - 4 cols */}
          <div className="lg:col-span-4 lg:pl-4">
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.1)] sticky top-24">
              <div className="mb-8">
                <span className="bg-[#E8F5E9] text-[#18A14D] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block mb-6">
                  HẾT MỨC KHUYẾN MÃI
                </span>
                <div className="flex items-end gap-1 mb-2">
                  <div className="text-sm text-gray-300 font-bold line-through mb-1.5">{formatCurrencyVND(car.price_per_day * 1.1)}</div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-black text-3xl md:text-5xl text-[#18A14D] tracking-tighter leading-none">{formatCurrencyVND(car.price_per_day).replace(' ₫', '')}</span>
                  <span className="font-black text-xl md:text-2xl text-[#18A14D] mr-1">₫</span>
                  <span className="text-[10px] md:text-sm font-bold text-gray-400">/ngày</span>
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-gray-100 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Ngày nhận xe</label>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full text-left bg-gray-50/80 hover:bg-gray-100 border border-transparent rounded-2xl p-4 font-black text-gray-800 transition flex items-center justify-between group h-14"
                    >
                      <span className="text-sm">{format(dateTime.startDate, "dd/MM/yyyy")}</span>
                      <HiCalendar className="text-gray-300 group-hover:text-[#18A14D]" size={18} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Ngày trả xe</label>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full text-left bg-gray-50/80 hover:bg-gray-100 border border-transparent rounded-2xl p-4 font-black text-gray-800 transition flex items-center justify-between group h-14"
                    >
                      <span className="text-sm">{format(dateTime.endDate, "dd/MM/yyyy")}</span>
                      <HiCalendar className="text-gray-300 group-hover:text-[#18A14D]" size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Địa điểm nhận (giao) xe</label>
                  <div className="relative group mb-3">
                    <input
                      type="text"
                      list="locations-detail"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Chọn nơi nhận xe..."
                      className="w-full border-none rounded-2xl bg-gray-50/80 p-4 pl-12 font-black text-gray-800 text-sm focus:ring-4 focus:ring-[#18A14D]/10 focus:bg-white transition h-14"
                    />
                    <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#18A14D] transition-colors" size={20} />
                    <datalist id="locations-detail">
                      {locations.map(loc => <option key={loc} value={loc} />)}
                    </datalist>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {locations.slice(0, 4).map(loc => (
                      <button 
                        key={loc}
                        type="button"
                        onClick={() => setLocation(loc)}
                        className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${location === loc ? 'bg-[#18A14D] border-[#18A14D] text-white' : 'bg-white border-gray-100 text-gray-500 hover:border-[#18A14D]/30'}`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-50">
                    <label className="block text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Mã Voucher (Nếu có)</label>
                    <div className="flex gap-2">
                       <div className="relative flex-1 group">
                          <input
                            type="text"
                            value={voucher}
                            onChange={(e) => setVoucher(e.target.value)}
                            placeholder="Nhập mã giảm giá..."
                            className="w-full border-none rounded-2xl bg-gray-50/80 p-4 font-black text-gray-800 text-sm focus:ring-4 focus:ring-[#18A14D]/10 focus:bg-white transition h-14"
                          />
                       </div>
                       <button 
                        type="button"
                        onClick={handleApplyVoucher}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-black px-4 rounded-2xl text-xs transition-colors h-14 uppercase tracking-tighter"
                       >
                        Áp dụng
                       </button>
                    </div>
                    {voucherError && <p className="text-[10px] text-red-500 font-bold ml-1">{voucherError}</p>}
                    {appliedVoucher && (
                      <div className="flex items-center justify-between bg-[#18A14D]/5 border border-[#18A14D]/10 rounded-xl px-4 py-2">
                        <span className="text-[10px] font-black text-[#18A14D] uppercase">Đã áp dụng: {appliedVoucher.code}</span>
                        <button onClick={() => setAppliedVoucher(null)} className="text-[#18A14D]">
                          <HiX size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/50 rounded-3xl p-6 mb-8 border border-gray-100/30">
                <div className="flex justify-between font-bold text-gray-500 mb-4 text-xs tracking-tight uppercase">
                  <span>Giá thuê ({rentalDays} ngày)</span>
                  <span className="text-gray-900 font-black">{formatCurrencyVND(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-500 mb-4 text-xs tracking-tight uppercase">
                  <span>Phí giao xe</span>
                  <span className="text-[#18A14D] font-black">{deliveryFee > 0 ? formatCurrencyVND(deliveryFee) : 'Miễn phí'}</span>
                </div>
                {appliedVoucher && (
                  <div className="flex justify-between font-bold text-[#18A14D] mb-4 text-xs tracking-tight uppercase bg-[#18A14D]/5 p-2 rounded-lg border border-[#18A14D]/10">
                    <span>Voucher ({appliedVoucher.code})</span>
                    <span className="font-black">-{formatCurrencyVND(discountAmount)}</span>
                  </div>
                )}
                <div className="h-px bg-gray-100 mb-6" />
                <div className="flex justify-between items-center">
                  <span className="font-black text-sm text-gray-900 uppercase tracking-widest">Tổng cộng</span>
                  <span className="font-black text-2xl text-gray-900 tracking-tighter">{formatCurrencyVND(finalTotal)}</span>
                </div>
              </div>

              <Link
                href={`/booking?car_id=${car.id}&days=${rentalDays}&start=${dateTime.startDate.toISOString()}&end=${dateTime.endDate.toISOString()}&location=${encodeURIComponent(location)}&voucher=${appliedVoucher?.code || ''}`}
                className={car.available ? "block w-full bg-[#18A14D] hover:bg-[#158c42] text-white text-center font-black py-5 rounded-2xl shadow-[0_15px_35px_rgba(24,161,77,0.3)] transition-all active:scale-[0.98] uppercase tracking-widest text-base" : "block w-full bg-gray-200 text-gray-400 text-center font-black py-5 rounded-2xl cursor-not-allowed uppercase tracking-widest text-base pointer-events-none"}
              >
                ĐẶT XE NGAY
              </Link>
            </div>
          </div>
        </div>
      </div>

      <DateTimePickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialStartDate={dateTime.startDate}
        initialEndDate={dateTime.endDate}
        onConfirm={(data) => {
          setDateTime(data);
          setIsModalOpen(false);
        }}
      />

      {/* Fullscreen Image Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition p-2 bg-white/10 rounded-full z-50"
          >
            <HiX size={32} />
          </button>
          <div
            className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={mainImage}
              alt="Zoomed"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
