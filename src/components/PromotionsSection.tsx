import Image from "next/image"
import Link from "next/link"
import { mockPromotions } from "@/lib/data"
import { HiOutlineClock, HiArrowRight } from "react-icons/hi"

export default function PromotionsSection() {
  if (!mockPromotions || mockPromotions.length === 0) return null

  return (
    <section className="py-10 md:py-16 pt-8 bg-white relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 mb-2">Chương trình khuyến mãi</h2>
            <p className="text-gray-500 font-medium">Cập nhật ngay các ưu đãi mới nhất đang chờ đón bạn.</p>
          </div>
          <Link href="/promotion" className="text-[#18A14D] font-bold flex items-center gap-2 hover:underline">
            Xem tất cả <HiArrowRight />
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
          {mockPromotions.map((promo) => (
            <div key={promo.id} className="min-w-[85vw] shadow-md sm:min-w-[350px] md:min-w-0 snap-center bg-white rounded-3xl overflow-hidden border border-gray-100 group transition-all hover:-translate-y-1 flex flex-col">
              <div className="relative h-[220px] w-full overflow-hidden">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-sm font-bold text-gray-800 shadow-sm">
                  Tin Mới
                </div>
                {promo.discount_percentage && (
                  <div className="absolute top-4 right-4 bg-[#18A14D] px-3 py-1.5 rounded-lg text-sm font-black text-white shadow-md">
                    -{promo.discount_percentage}%
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight line-clamp-2">{promo.title}</h3>
                <p className="text-gray-600 text-base mb-6 flex-1 line-clamp-2">{promo.description}</p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                    <HiOutlineClock size={16} />
                    <span>HSD: {new Date(promo.valid_until).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <Link
                    href={`/promotion/${promo.slug}`}
                    className="bg-gray-50 hover:bg-[#18A14D] text-gray-800 hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
                  >
                    Chi Tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
