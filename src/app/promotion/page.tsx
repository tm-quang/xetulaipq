import { mockPromotions } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineClock, HiTag, HiArrowRight } from "react-icons/hi";

export const metadata = {
  title: "Chương Trình Khuyến Mãi",
  description: "Cập nhật các chương trình ưu đãi, giảm giá thuê xe điện VinFast mới nhất tại Xế Tự Lái Phú Quốc.",
};

export default function PromotionsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gray-900 overflow-hidden">
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
          <div className="inline-flex items-center gap-2 bg-[#18A14D]/20 backdrop-blur-md border border-[#18A14D]/30 px-4 py-2 rounded-full text-[#18A14D] font-bold text-sm mb-6 uppercase tracking-widest">
            <HiTag /> Ưu đãi đặc biệt
          </div>
          <h1 className="text-3xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
            Chương Trình <br/> <span className="text-[#18A14D]">Khuyến Mãi</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
            Đừng bỏ lỡ cơ hội nhận ưu đãi hấp dẫn khi trải nghiệm dịch vụ thuê xe điện xanh. Tiết kiệm hơn, đi xa hơn cùng Xế Tự Lái.
          </p>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPromotions.map((promo) => (
              <div 
                key={promo.id} 
                className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {promo.discount_percentage && (
                    <div className="absolute top-6 right-6 bg-[#18A14D] text-white font-black px-4 py-2 rounded-2xl shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform">
                      -{promo.discount_percentage}%
                    </div>
                  )}
                  
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-gray-800 uppercase tracking-wider shadow-sm">
                    Sắp hết hạn
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight leading-tight group-hover:text-[#18A14D] transition-colors">{promo.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed mb-8 line-clamp-3">
                    {promo.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
                      <HiOutlineClock size={16} className="text-[#18A14D]" />
                      <span>HSD: {new Date(promo.valid_until).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <Link 
                      href={`/promotion/${promo.slug}`}
                      className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#18A14D] group-hover:text-white transition-all shadow-sm"
                    >
                      <HiArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Call to Action */}
      <section className="py-20 container mx-auto px-4 mb-20">
        <div className="bg-[#18A14D] rounded-[48px] p-10 md:p-20 relative overflow-hidden text-center text-white shadow-2xl shadow-[#18A14D]/30">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             {/* Simple pattern placeholder */}
             <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-8 border-white"></div>
             <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border-8 border-white"></div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight relative z-10 drop-shadow-lg">
            Nhận Thông Báo <br/> <span className="text-black/30">Ưu Đãi Sớm Nhất</span>
          </h2>
          <p className="text-[#E8F5E9] max-w-xl mx-auto font-bold text-lg mb-10 opacity-90 relative z-10">
            Đăng ký bản tin để nhận các mã giảm giá bí mật dành riêng cho cộng đồng Xế Tự Lái.
          </p>
          
          <div className="max-w-md mx-auto flex flex-col md:flex-row gap-4 relative z-10">
            <input 
              type="email" 
              placeholder="Nhập email của bạn..." 
              className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-4 text-white placeholder:text-white/60 outline-none focus:ring-2 ring-white/50 transition-all font-bold"
            />
            <button className="bg-white text-[#18A14D] font-black px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-xl uppercase tracking-widest text-sm">
              Đăng ký ngay
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
