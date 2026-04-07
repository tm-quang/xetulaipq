"use client"

import { useState, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { HiX, HiChevronDown } from "react-icons/hi"
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, startOfToday, isWithinInterval, parseISO } from "date-fns"
import { vi } from "date-fns/locale"

import { mockBookings, mockCarUnits } from "@/lib/data"

interface DateTimePickerModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: { startDate: Date; endDate: Date; startTime: string; endTime: string }) => void
  initialStartDate?: Date
  initialEndDate?: Date
  carId?: string
}

export default function DateTimePickerModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  initialStartDate, 
  initialEndDate,
  carId 
}: DateTimePickerModalProps) {
  const [tab, setTab] = useState<"day" | "hour">("day")
  const [startDate, setStartDate] = useState<Date | undefined>(initialStartDate)
  const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate)
  const [startTime, setStartTime] = useState("14:00")
  const [endTime, setEndTime] = useState("12:00")

  // Sync state with props when modal opens
  useEffect(() => {
    if (isOpen) {
      setStartDate(initialStartDate);
      setEndDate(initialEndDate);
    }
  }, [isOpen, initialStartDate, initialEndDate]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const today = startOfToday()

  const currentMonthDate = new Date();
  currentMonthDate.setDate(1); 
  const nextMonthDate = new Date(currentMonthDate);
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

  const currentMonth = startOfMonth(currentMonthDate);
  const nextMonth = startOfMonth(nextMonthDate);

  const getDayAvailability = (day: Date) => {
    if (!carId) return { status: 'none', units: [] };
    
    const units = mockCarUnits.filter(u => u.car_id === carId && u.status === 'available');
    const bookings = mockBookings.filter(b => b.car_id === carId && b.status !== 'cancelled');

    const bookedUnits = bookings
      .filter(b => {
        const start = parseISO(b.start_date);
        const end = parseISO(b.end_date);
        return isWithinInterval(day, { start, end });
      })
      .map(b => b.unit_id);

    const availableUnits = units.filter(u => !bookedUnits.includes(u.id));
    return { 
      status: availableUnits.length === 0 ? 'full' : 'available', 
      units: availableUnits 
    };
  };

  const renderCalendar = (monthDate: Date) => {
    const days = eachDayOfInterval({
      start: startOfMonth(monthDate),
      end: endOfMonth(monthDate)
    })

    const startDayOfWeek = (days[0].getDay() + 6) % 7
    const emptyDays = Array.from({ length: startDayOfWeek })

    return (
      <div className="flex-none w-full md:w-[calc(50%-1.25rem)] snap-center">
        <h3 className="text-center font-bold text-gray-800 mb-6 uppercase tracking-widest text-xs opacity-50">
          Tháng {format(monthDate, "MM / yyyy", { locale: vi })}
        </h3>
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-sm">
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
            <div key={d} className="text-center text-gray-400 font-bold h-8 flex items-center justify-center text-[10px]">
              {d}
            </div>
          ))}
          {emptyDays.map((_, i) => (
            <div key={`empty-${i}`} className="h-10 sm:h-12" />
          ))}
          {days.map((day) => {
            const isSelectedStart = startDate && isSameDay(day, startDate)
            const isSelectedEnd = endDate && isSameDay(day, endDate)
            const isInRange = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate }) && !isSelectedStart && !isSelectedEnd
            const { status, units } = getDayAvailability(day);
            const isPastDay = day < today;
            const isFull = status === 'full';

            return (
              <div key={day.toString()} className="relative w-full h-10 sm:h-12 flex items-center justify-center">
                {(isInRange || (isSelectedStart && endDate) || (isSelectedEnd && startDate)) && (
                  <div
                    className={`absolute inset-y-2 bg-[#E8F5E9] z-0
                      ${isSelectedStart ? 'left-1/2 right-[-4px]' : ''}
                      ${isSelectedEnd ? 'right-1/2 left-[-4px]' : ''}
                      ${isInRange ? 'inset-x-[-4px]' : ''}
                     `}
                  />
                )}

                <button
                  disabled={isPastDay || isFull}
                  onClick={() => {
                    if (!startDate || (startDate && endDate)) {
                      setStartDate(day)
                      setEndDate(undefined)
                    } else if (day < startDate) {
                      setStartDate(day)
                      setEndDate(undefined)
                    } else {
                      setEndDate(day)
                    }
                  }}
                  className={`
                    w-10 h-10 sm:w-11 sm:h-11 flex flex-col items-center justify-center rounded-2xl transition-all relative z-10 group
                    ${isPastDay || isFull ? "text-gray-200 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50"}
                    ${isSelectedStart || isSelectedEnd ? "bg-[#18A14D] !text-white font-black shadow-lg shadow-[#18A14D]/30" : ""}
                    ${isInRange ? "font-black text-[#18A14D]" : ""}
                    ${isFull && !isPastDay ? "bg-red-50/50" : ""}
                  `}
                >
                  <span className="text-[13px]">{format(day, "d")}</span>
                  {!isPastDay && units.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {units.map((u: any) => (
                        <div 
                          key={u.id} 
                          className={`w-1 h-1 rounded-full border border-white/20 shadow-sm ${isSelectedStart || isSelectedEnd ? 'bg-white' : ''}`}
                          style={{ backgroundColor: isSelectedStart || isSelectedEnd ? undefined : u.color_code }}
                        />
                      ))}
                    </div>
                  )}
                  {!isPastDay && isFull && (
                     <div className="w-1 h-1 bg-red-400 rounded-full mt-0.5" />
                  )}
                  {!isPastDay && units.length > 0 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 bg-gray-900 text-white text-[8px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none hidden sm:block">
                       <p className="font-black border-b border-white/10 pb-1 mb-1">CÒN {units.length} XE</p>
                       <div className="space-y-1">
                          {units.map((u: any) => (
                            <div key={u.id} className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: u.color_code }} />
                              <span>Màu {u.color}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const availableStartTimes = useMemo(() => {
    const options = [];
    for(let h=0; h<24; h++) {
      for(let m=0; m<60; m+=30) {
        options.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }
    return options;
  }, []);

  const availableEndTimes = useMemo(() => {
    return availableStartTimes;
  }, [availableStartTimes]);

  let totalDays = 1;
  if (startDate && endDate) {
    const startDateTime = new Date(startDate);
    const [startH, startM] = startTime.split(':').map(Number);
    startDateTime.setHours(startH, startM, 0, 0);

    const endDateTime = new Date(endDate);
    const [endH, endM] = endTime.split(':').map(Number);
    endDateTime.setHours(endH, endM, 0, 0);

    const diffHours = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);

    if (diffHours > 0) {
       totalDays = Math.ceil(diffHours / 24);
    }
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-[700px] rounded-[24px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-4 md:p-6 border-b flex items-center justify-between gap-2">
              <div className="w-8 md:w-10 flex-shrink-0" />
              <h2 className="text-[15px] sm:text-base md:text-xl font-black text-gray-900 uppercase tracking-tight text-center flex-1 leading-snug">
                Chọn thời gian thuê xe
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400 flex-shrink-0">
                <HiX size={24} />
              </button>
            </div>

            <div className="flex border-b">
              <button
                onClick={() => setTab("day")}
                className={`flex-1 py-4 text-sm font-bold transition-all relative ${tab === "day" ? "text-primary" : "text-gray-500 hover:text-gray-700"}`}
              >
                Thuê theo ngày
                {tab === "day" && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
              </button>
              <button
                onClick={() => setTab("hour")}
                className={`flex-1 py-4 text-sm font-bold transition-all relative ${tab === "hour" ? "text-primary" : "text-gray-500 hover:text-gray-700"}`}
              >
                Thuê theo giờ
                {tab === "hour" && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Nhận xe</label>
                  <div className="relative">
                    <select
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 font-bold text-gray-800 appearance-none focus:ring-primary focus:border-primary focus:bg-white transition"
                    >
                      {availableStartTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Trả xe</label>
                  <div className="relative">
                    <select
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 font-bold text-gray-800 appearance-none focus:ring-primary focus:border-primary focus:bg-white transition"
                    >
                      {availableEndTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>
              </div>

              <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-10 pb-4 -mx-6 px-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {renderCalendar(currentMonth)}
                {renderCalendar(nextMonth)}
              </div>
            </div>

            <div className="p-4 md:p-6 border-t bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-center md:text-left w-full md:w-auto flex-1">
                <div className="text-[13px] md:text-sm font-bold text-gray-900 leading-relaxed">
                  {startTime}, {startDate ? format(startDate, "dd/MM/yyyy") : '...'} - {endTime}, {endDate ? format(endDate, "dd/MM/yyyy") : '...'}
                </div>
                {startDate && endDate && (
                  <div className="text-[#18A14D] text-[11px] md:text-xs font-black uppercase tracking-wider mt-1">
                    Tổng số ngày thuê: {totalDays} ngày
                  </div>
                )}
              </div>
              <button
                disabled={!startDate || !endDate}
                onClick={() => {
                  if (startDate && endDate) {
                    onConfirm({ startDate, endDate, startTime, endTime })
                  }
                }}
                className={`w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-black px-12 py-4 rounded-2xl shadow-xl shadow-primary/25 transition uppercase ${(!startDate || !endDate) ? "opacity-50 cursor-not-allowed" : "active:scale-[0.98]"}`}
              >
                Tiếp tục
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modalContent, document.body);
}
