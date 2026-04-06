"use client"

import { useState, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { HiX, HiChevronDown } from "react-icons/hi"
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, startOfToday, isWithinInterval, differenceInDays } from "date-fns"
import { vi } from "date-fns/locale"

interface DateTimePickerModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: { startDate: Date; endDate: Date; startTime: string; endTime: string }) => void
  initialStartDate?: Date
  initialEndDate?: Date
}

export default function DateTimePickerModal({ isOpen, onClose, onConfirm, initialStartDate, initialEndDate }: DateTimePickerModalProps) {
  const [tab, setTab] = useState<"day" | "hour">("day")
  const [startDate, setStartDate] = useState<Date>(initialStartDate || addMonths(new Date(), 0))
  const [endDate, setEndDate] = useState<Date>(initialEndDate || addMonths(new Date(), 0))
  const [startTime, setStartTime] = useState("14:00")
  const [endTime, setEndTime] = useState("12:00")

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

  // Generate current and next month references robustly
  const currentMonthDate = new Date();
  currentMonthDate.setDate(1); // Ensure we are at start of month to avoid overflow

  const nextMonthDate = new Date(currentMonthDate);
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

  const currentMonth = startOfMonth(currentMonthDate);
  const nextMonth = startOfMonth(nextMonthDate);

  const renderCalendar = (monthDate: Date) => {
    const days = eachDayOfInterval({
      start: startOfMonth(monthDate),
      end: endOfMonth(monthDate)
    })

    const startDayOfWeek = (days[0].getDay() + 6) % 7 // Convert Sun-Sat (0-6) to Mon-Sun (0-6)
    const emptyDays = Array.from({ length: startDayOfWeek })

    return (
      <div className="flex-none w-full md:w-[calc(50%-1.25rem)] snap-center">
        <h3 className="text-center font-bold text-gray-800 mb-4">
          Tháng {format(monthDate, "M", { locale: vi })}
        </h3>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
            <div key={d} className="text-center text-gray-400 font-medium h-8 flex items-center justify-center">
              {d}
            </div>
          ))}
          {emptyDays.map((_, i) => (
            <div key={`empty-${i}`} className="h-10" />
          ))}
          {days.map((day) => {
            const isSelectedStart = startDate && isSameDay(day, startDate)
            const isSelectedEnd = endDate && isSameDay(day, endDate)
            const isSelectedSingle = isSelectedStart && isSelectedEnd
            const isInRange = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate }) && !isSelectedStart && !isSelectedEnd

            return (
              <div key={day.toString()} className="relative w-full h-10 flex items-center justify-center">
                {/* Range connecting background layer */}
                {(isInRange || (isSelectedStart && !isSelectedSingle) || (isSelectedEnd && !isSelectedSingle)) && (
                  <div
                    className={`absolute inset-y-1.5 bg-[#E8F5E9] z-0
                      ${isSelectedStart && !isSelectedEnd ? 'left-1/2 right-[-2px]' : ''}
                      ${isSelectedEnd && !isSelectedStart ? 'right-1/2 left-[-2px]' : ''}
                      ${isInRange ? 'inset-x-[-2px]' : ''}
                     `}
                  />
                )}

                <button
                  disabled={day < today}
                  onClick={() => {
                    if (!startDate || (startDate && endDate)) {
                      setStartDate(day)
                      setEndDate(undefined as any) // Temporarily reset end
                    } else if (day < startDate) {
                      setStartDate(day)
                      setEndDate(undefined as any)
                    } else {
                      setEndDate(day)
                    }
                  }}
                  className={`
                    w-10 h-10 flex items-center justify-center rounded-full transition-all relative z-10
                    ${day < today ? "text-gray-200 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}
                    ${isSelectedStart || isSelectedEnd ? "bg-[#18A14D] !text-white font-bold" : ""}
                    ${isInRange ? "font-medium text-[#18A14D]" : ""}
                  `}
                >
                  {format(day, "d")}
                  {isToday(day) && !isSelectedStart && !isSelectedEnd && (
                    <div className="absolute bottom-1.5 w-1 h-1 bg-[#18A14D] rounded-full" />
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Sinh options thời gian động
  const availableStartTimes = useMemo(() => {
    const options = [];
    for(let h=0; h<24; h++) {
      for(let m=0; m<60; m+=30) {
        options.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }

    if (startDate && isToday(startDate)) {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 60); // Bỏ qua 60 phút

      const filtered = options.filter(time => {
        const [h, m] = time.split(':').map(Number);
        const optionTime = new Date();
        optionTime.setHours(h, m, 0, 0);
        return optionTime >= now;
      });
      return filtered.length > 0 ? filtered : ["23:30"];
    }
    return options;
  }, [startDate]);

  const availableEndTimes = useMemo(() => {
    const options = [];
    for(let h=0; h<24; h++) {
      for(let m=0; m<60; m+=30) {
        options.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }

    if (startDate && endDate && isSameDay(startDate, endDate)) {
       const filtered = options.filter(time => {
          const [hOptions, mOptions] = time.split(':').map(Number);
          const [hStart, mStart] = startTime.split(':').map(Number);
          return (hOptions * 60 + mOptions) > (hStart * 60 + mStart);
       });
       return filtered.length > 0 ? filtered : ["23:30"];
    }
    return options;
  }, [startDate, endDate, startTime]);

  // Tự động sửa lại nếu giờ đang chọn nằm trong vùng bị ẩn
  useEffect(() => {
    if (availableStartTimes.length > 0 && !availableStartTimes.includes(startTime)) {
      setStartTime(availableStartTimes[0]);
    }
  }, [availableStartTimes, startTime]);

  useEffect(() => {
    if (availableEndTimes.length > 0 && !availableEndTimes.includes(endTime)) {
      setEndTime(availableEndTimes[0]);
    }
  }, [availableEndTimes, endTime]);

  // Tính tổng số ngày (Block 24h)
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
       if(totalDays === 0) totalDays = 1;
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
            {/* Header */}
            <div className="p-4 md:p-6 border-b flex items-center justify-between gap-2">
              <div className="w-8 md:w-10 flex-shrink-0" />
              <h2 className="text-[15px] sm:text-base md:text-xl font-black text-gray-900 uppercase tracking-tight text-center flex-1 leading-snug">
                Chọn thời gian thuê xe
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400 flex-shrink-0">
                <HiX size={24} />
              </button>
            </div>

            {/* Tab */}
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
              {/* Time Selection */}
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

              {/* Calendars */}
              <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-10 pb-4 -mx-6 px-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {renderCalendar(currentMonth)}
                {renderCalendar(nextMonth)}
              </div>
            </div>

            {/* Footer */}
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
                onClick={() => onConfirm({ startDate, endDate, startTime, endTime })}
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-black px-12 py-4 rounded-2xl shadow-xl shadow-primary/25 transition active:scale-[0.98] uppercase"
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
