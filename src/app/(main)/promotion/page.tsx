import { mockPromotions } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineClock, HiTag, HiArrowRight, HiTicket } from "react-icons/hi";

export const metadata = {
  title: "Chương Trình Khuyến Mãi",
  description: "Cập nhật các chương trình ưu đãi, giảm giá thuê xe điện VinFast mới nhất tại Xế Tự Lái Phú Quốc.",
};

export default function PromotionsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-10 md:py-16 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1470&auto=format&fit=crop"
            alt="Promotion Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 bg-[#18A14D]/20 backdrop-blur-md border border-[#18A14D]/30 px-3 py-1.5 rounded-full text-[#18A14D] font-bold text-xs mb-4 uppercase tracking-widest">
            <HiTag size={14} /> Ưu đãi đặc biệt
          </div>
          <h1 className="text-2xl md:text-5xl font-black text-white mb-3 uppercase tracking-tight">
            Chương Trình <br/> <span className="text-[#18A14D]">Khuyến Mãi</span>
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed opacity-90">
            Đừng bỏ lỡ cơ hội nhận ưu đãi hấp dẫn khi trải nghiệm dịch vụ thuê xe điện xanh. Tiết kiệm hơn, đi xa hơn cùng Xế Tự Lái.
          </p>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPromotions.map((promo) => (
              <Link 
                key={promo.id} 
                href={`/promotion/${promo.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col relative"
              >
                <div className="relative h-[180px] md:h-[200px] w-full overflow-hidden">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {promo.discount_percentage && (
                    <div className="absolute top-4 right-4 bg-gradient-to-br from-[#18A14D] to-[#117637] text-white font-black px-3 py-1.5 rounded-lg text-[13px] shadow-sm transform rotate-2 group-hover:rotate-0 transition-transform">
                      GIẢM {promo.discount_percentage}%
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black text-gray-800 uppercase tracking-widest shadow-sm flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-[#18A14D] animate-pulse"></span>
                     Sắp hết hạn
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 relative z-10 bg-white rounded-t-3xl -mt-5 border-t border-gray-50">
                  <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight leading-snug group-hover:text-[#18A14D] transition-colors flex items-start gap-1.5">
                    <HiTicket className="flex-shrink-0 text-[#18A14D] mt-1" size={18} />
                    {promo.title}
                  </h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed mb-5 flex-1 line-clamp-2">
                    {promo.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 text-gray-400 font-black text-[10px] uppercase tracking-widest bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                      <HiOutlineClock size={14} className="text-[#18A14D]" />
                      <span>HSD: {new Date(promo.valid_until).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div 
                      className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#18A14D] group-hover:text-white transition-all shadow-sm border border-gray-100 group-hover:border-[#18A14D]"
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

      {/* Newsletter / Call to Action */}
      <section className="py-12 container mx-auto px-4 mb-16">
        <div className="bg-[#18A14D] rounded-3xl p-8 md:p-12 relative overflow-hidden text-center text-white shadow-xl shadow-[#18A14D]/20">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full border-[10px] border-white"></div>
             <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full border-[10px] border-white"></div>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-black mb-3 uppercase tracking-tight relative z-10 drop-shadow-sm">
            Nhận Thông Báo <br/> <span className="text-white/80">Ưu Đãi Sớm Nhất</span>
          </h2>
          <p className="text-[#E8F5E9] max-w-lg mx-auto font-medium text-sm md:text-base mb-8 opacity-90 relative z-10">
            Đăng ký bản tin để nhận các mã giảm giá bí mật dành riêng cho cộng đồng Xế Tự Lái.
          </p>
          
          <div className="max-w-md mx-auto flex flex-col md:flex-row gap-3 relative z-10">
            <input 
              type="email" 
              placeholder="Nhập email của bạn..." 
              className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-5 py-3 text-sm text-white placeholder:text-white/70 outline-none focus:ring-2 ring-white/50 transition-all font-medium"
            />
            <button className="bg-white text-[#18A14D] font-black px-6 py-3 rounded-xl hover:bg-gray-50 transition-all shadow-md uppercase tracking-widest text-xs">
              Đăng ký ngay
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
