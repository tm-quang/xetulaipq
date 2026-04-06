import { Car } from "@/types";
import { formatCurrencyVND } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { MdEventSeat, MdOutlineSettingsSuggest } from "react-icons/md";
import { BsEvFront } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi";

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden transition-all duration-500 group flex flex-col relative">
      <Link href={`/cars/${car.category}/${car.slug}`} className="relative h-60 w-full block overflow-hidden">
        <Image
          src={car.images[0]}
          alt={car.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {car.is_new && (
            <span className="bg-[#18A14D] text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg">Mới</span>
          )}
          {car.is_hot && (
            <span className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg">Hot</span>
          )}
          {!car.available && (
            <span className="bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg">Hết xe</span>
          )}
        </div>

        {car.discount_price && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-red-500 text-[11px] font-black px-3 py-1.5 rounded-xl shadow-md border border-red-100">
            Tiết kiệm {Math.round(((car.price_per_day - car.discount_price) / car.price_per_day) * 100)}%
          </div>
        )}
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/cars/${car.category}/${car.slug}`}>
          <h3 className="font-black text-xl text-gray-900 group-hover:text-[#18A14D] transition-colors line-clamp-1 mb-2 tracking-tight">
            {car.name}
          </h3>
        </Link>

        <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-5 h-10 leading-relaxed">
          {car.description || "Dòng xe hiện đại, đầy đủ tiện nghi, phù hợp cho mọi nẻo đường tại Phú Quốc."}
        </p>

        <div className="flex gap-4 mb-6 text-gray-400 font-bold text-xs uppercase tracking-widest bg-gray-50/50 p-3 rounded-2xl border border-gray-50">
          <div className="flex items-center gap-1.5"><BsEvFront size={16} className="text-[#18A14D]" /> {car.specs.fuel}</div>
          <div className="flex items-center gap-1.5"><MdEventSeat size={16} className="text-[#18A14D]" /> {car.specs.seats} ghế</div>
          <div className="flex items-center gap-1.5"><MdOutlineSettingsSuggest size={16} className="text-[#18A14D]" /> {car.specs.transmission}</div>
        </div>

        <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
          <div>
            {car.discount_price ? (
              <>
                <div className="text-xs text-gray-400 line-through font-bold mb-0.5">
                  {formatCurrencyVND(car.price_per_day)}
                </div>
                <div className="font-black text-2xl text-[#18A14D] leading-none">
                  {formatCurrencyVND(car.discount_price)}<span className="text-[11px] font-black text-gray-400 uppercase tracking-tighter ml-1">/ngày</span>
                </div>
              </>
            ) : (
              <div className="font-black text-2xl text-[#18A14D] leading-none">
                {formatCurrencyVND(car.price_per_day)}<span className="text-[11px] font-black text-gray-400 uppercase tracking-tighter ml-1">/ngày</span>
              </div>
            )}
          </div>

          <Link
            href={`/cars/${car.category}/${car.slug}`}
            className="bg-gray-900 hover:bg-[#18A14D] text-white p-3 rounded-2xl transition-all shadow-xl hover:shadow-[#18A14D]/30 group/btn active:scale-95"
          >
            <HiArrowRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
