import Image from "next/image"
import Link from "next/link"
import { mockPromotions } from "@/lib/data"
import { HiOutlineClock, HiArrowRight, HiGift, HiTicket } from "react-icons/hi"

export default function PromotionsSection() {
  if (!mockPromotions || mockPromotions.length === 0) return null

  return (
    <section className="py-8 md:py-12 bg-white relative z-10 w-full">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-md">
                <HiGift size={20} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-gray-900 drop-shadow-sm">Siêu Khuyến Mãi</h2>
            </div>
            <p className="text-gray-500 font-medium text-sm md:text-base pl-1">Chớp ngay deal hời, vi vu muôn nơi cùng <span className="text-[#18A14D]">VF5 Tự Lái.</span></p>
          </div>
          <Link href="/promotion" className="text-gray-600 bg-white border border-gray-200 shadow-sm font-bold text-sm flex items-center gap-2 hover:border-[#18A14D] hover:text-[#18A14D] px-5 py-2.5 rounded-xl transition-all group active:scale-95">
            XEM TẤT CẢ <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-5 pb-6 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible px-2 md:px-0 -mx-2 md:mx-0">
          {mockPromotions.map((promo) => (
            <Link key={promo.id} href={`/promotion/${promo.slug}`} className="min-w-[80vw] shadow-sm hover:shadow-xl sm:min-w-[320px] md:min-w-0 snap-center bg-white rounded-3xl overflow-hidden border border-gray-100 group transition-all duration-300 hover:-translate-y-2 flex flex-col relative">
              <div className="relative h-[180px] md:h-[200px] w-full overflow-hidden">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black text-gray-800 shadow-sm border border-white/50 flex items-center gap-1.5 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#18A14D] animate-pulse"></span>
                  Nổi bật
                </div>
                {promo.discount_percentage && (
                  <div className="absolute top-3 right-3 bg-gradient-to-br from-[#18A14D] to-[#117637] px-3 py-1.5 rounded-lg text-[13px] font-black text-white shadow-sm border border-[#18A14D]/20 transform rotate-2 group-hover:rotate-0 transition-transform">
                    GIẢM {promo.discount_percentage}%
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1 relative z-10 bg-white rounded-t-3xl -mt-5 shadow-sm border-t border-gray-50/50">
                <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight line-clamp-2 flex items-start gap-1.5 group-hover:text-[#18A14D] transition-colors leading-snug">
                  <HiTicket className="flex-shrink-0 text-[#18A14D] mt-1" size={18} />
                  {promo.title}
                </h3>
                <p className="text-gray-500 text-[13px] mb-5 flex-1 line-clamp-2 leading-relaxed">{promo.description}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-black uppercase tracking-widest bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                    <HiOutlineClock size={14} className="text-gray-500" />
                    <span>HSD: {new Date(promo.valid_until).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div
                    className="bg-gray-50 group-hover:bg-[#18A14D] text-gray-400 group-hover:text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm border border-gray-100 group-hover:border-[#18A14D]"
                  >
                    <HiArrowRight size={16} className="group-hover:-rotate-45 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
