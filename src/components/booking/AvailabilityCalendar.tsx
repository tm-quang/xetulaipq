"use client";

import { useState, useMemo } from "react";
import { 
  format, 
  addMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isPast, 
  isToday,
  isWithinInterval,
  parseISO
} from "date-fns";
import { vi } from "date-fns/locale";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { mockBookings, mockCarUnits } from "@/lib/data";

interface Props {
  carId: string;
}

export default function AvailabilityCalendar({ carId }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const carUnits = useMemo(() => 
    mockCarUnits.filter(u => u.car_id === carId && u.status === 'available'), 
  [carId]);

  const carBookings = useMemo(() => 
    mockBookings.filter(b => b.car_id === carId && b.status !== 'cancelled'), 
  [carId]);

  const months = useMemo(() => [
    currentMonth,
    addMonths(currentMonth, 1),
    addMonths(currentMonth, 2),
  ], [currentMonth]);

  const getDayAvailability = (day: Date) => {
    if (isPast(day) && !isToday(day)) return { status: 'past', units: [] };

    const bookedUnits = carBookings
      .filter(b => {
        const start = parseISO(b.start_date);
        const end = parseISO(b.end_date);
        return isWithinInterval(day, { start, end });
      })
      .map(b => b.unit_id);

    const availableUnits = carUnits.filter(u => !bookedUnits.includes(u.id));

    if (availableUnits.length === 0) return { status: 'full', units: [] };
    if (availableUnits.length < carUnits.length) return { status: 'partial', units: availableUnits };
    return { status: 'available', units: availableUnits };
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
          Lịch trống xe 3 tháng tới
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
            className="p-3 hover:bg-gray-100 rounded-xl transition-all text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100"
          >
            <HiChevronLeft size={24} />
          </button>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-3 hover:bg-gray-100 rounded-xl transition-all text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100"
          >
            <HiChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {months.map((month, mIdx) => {
          const monthStart = startOfMonth(month);
          const monthEnd = endOfMonth(month);
          const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
          const startDayOfWeek = monthStart.getDay(); // 0 is Sunday

          return (
            <div key={mIdx} className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-all">
              <div className="text-center mb-6">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-[#18A14D]">
                  {format(month, 'MMMM yyyy', { locale: vi })}
                </span>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => (
                  <div key={d} className="text-[10px] font-black text-gray-300 text-center uppercase tracking-widest">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {days.map(day => {
                  const { status, units } = getDayAvailability(day);
                  return (
                    <div 
                      key={day.toString()} 
                      className={`
                        aspect-square rounded-xl flex flex-col items-center justify-center relative group transition-all text-[11px] font-bold
                        ${status === 'past' ? 'text-gray-200 cursor-not-allowed' : ''}
                        ${status === 'full' ? 'bg-red-50 text-red-300 cursor-not-allowed' : ''}
                        ${status === 'partial' ? 'bg-orange-50 text-orange-600 hover:shadow-md cursor-pointer' : ''}
                        ${status === 'available' ? 'bg-green-50 text-green-600 hover:bg-[#18A14D] hover:text-white hover:shadow-lg cursor-pointer' : ''}
                      `}
                    >
                      <span>{format(day, 'd')}</span>
                      
                      {/* Tooltip or indicator for available colors */}
                      {units.length > 0 && (
                        <div className="flex gap-0.5 mt-1">
                          {units.map(u => (
                            <div 
                              key={u.id} 
                              className="w-1 h-1 rounded-full border border-white/50" 
                              style={{ backgroundColor: u.color_code }}
                              title={u.color}
                            />
                          ))}
                        </div>
                      )}

                      {/* Detail Popover on hover */}
                      {status !== 'past' && status !== 'full' && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-gray-900 text-white text-[9px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl">
                          <p className="font-black uppercase tracking-widest mb-1 border-b border-white/10 pb-1">Trống {units.length} xe</p>
                          <div className="space-y-1 mt-1">
                            {units.map(u => (
                              <div key={u.id} className="flex items-center gap-1.5 font-bold">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: u.color_code }} />
                                <span>Màu {u.color}</span>
                              </div>
                            ))}
                          </div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-8 p-6 bg-gray-50 rounded-[32px] border border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-lg bg-green-50 border border-green-100" />
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Sẵn sàng (Tất cả xe)</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-lg bg-orange-50 border border-orange-100" />
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Còn ít xe (Xem màu chi tiết)</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-lg bg-red-50 border border-red-100 text-red-200" />
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Hết xe</span>
        </div>
      </div>
    </div>
  );
}
