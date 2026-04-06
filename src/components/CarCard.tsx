import { Car } from "@/types";
import { formatCurrencyVND } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { MdEventSeat, MdOutlineSettingsSuggest } from "react-icons/md";
import { BsEvFront } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi";

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 group transition-all duration-300 hover:-translate-y-2 flex flex-col relative h-full">
      <Link href={`/cars/${car.category}/${car.slug}`} className="relative h-[200px] md:h-[220px] w-full block overflow-hidden">
        <Image
          src={car.images[0]}
          alt={car.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {car.is_new && (
            <span className="bg-gradient-to-br from-[#18A14D] to-[#117637] text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-sm">Mới</span>
          )}
          {car.is_hot && (
            <span className="bg-gradient-to-br from-orange-500 to-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-sm flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse"></span>
              Hot
            </span>
          )}
          {!car.available && (
            <span className="bg-gray-900/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-sm">Hết xe</span>
          )}
        </div>

        {car.discount_price && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-red-500 text-[11px] font-black px-3 py-1.5 rounded-xl shadow-md border border-red-50 transform rotate-2 group-hover:rotate-0 transition-transform">
            Tiết kiệm {Math.round(((car.price_per_day - car.discount_price) / car.price_per_day) * 100)}%
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1 relative z-10 bg-white rounded-t-3xl -mt-5 shadow-sm border-t border-gray-50/50">
        <Link href={`/cars/${car.category}/${car.slug}`}>
          <h3 className="font-black text-lg text-gray-900 group-hover:text-[#18A14D] transition-colors line-clamp-1 mb-1.5 tracking-tight leading-snug">
            {car.name}
          </h3>
        </Link>

        <p className="text-gray-500 text-[13px] font-medium line-clamp-2 mb-4 leading-relaxed flex-1">
          {car.description || "Dòng xe hiện đại, đầy đủ tiện nghi, phù hợp cho mọi nẻo đường tại Phú Quốc."}
        </p>

        <div className="flex gap-2.5 mb-5 text-gray-400 font-bold text-[10px] uppercase tracking-widest bg-gray-50/80 px-3 py-2 rounded-xl border border-gray-100 items-center justify-between">
          <div className="flex items-center gap-1 xl:gap-1.5"><BsEvFront size={14} className="text-[#18A14D]" /> <span className="truncate">{car.specs.fuel}</span></div>
          <div className="flex items-center gap-1 xl:gap-1.5"><MdEventSeat size={14} className="text-[#18A14D]" /> <span>{car.specs.seats}c</span></div>
          <div className="flex items-center gap-1 xl:gap-1.5"><MdOutlineSettingsSuggest size={14} className="text-[#18A14D]" /> <span className="truncate">{car.specs.transmission}</span></div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            {car.discount_price ? (
              <>
                <div className="text-[11px] text-gray-400 line-through font-bold mb-0.5 leading-none">
                  {formatCurrencyVND(car.price_per_day)}
                </div>
                <div className="font-black text-lg md:text-xl text-[#18A14D] leading-none">
                  {formatCurrencyVND(car.discount_price)}<span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">/ngày</span>
                </div>
              </>
            ) : (
              <div className="font-black text-lg md:text-xl text-[#18A14D] leading-none mt-1">
                {formatCurrencyVND(car.price_per_day)}<span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">/ngày</span>
              </div>
            )}
          </div>

          <Link
            href={`/cars/${car.category}/${car.slug}`}
            className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-[#18A14D] text-gray-400 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm border border-gray-100 group-hover:border-[#18A14D] active:scale-95"
          >
            <HiArrowRight size={18} className="group-hover:-rotate-45 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
