import { mockPromotions } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { HiOutlineClock, HiTag, HiCheckCircle } from "react-icons/hi";
import PromotionForm from "./PromotionForm";

// TODO: Lấy dữ liệu từ Supabase thay bằng mock data sau khi có backend.
async function getPromotionBySlug(slug: string) {
  // Demo code Supabase:
  // const { data, error } = await supabase.from('promotions').select('*').eq('slug', slug).single();
  // if (error) return null;
  // return data;
  
  const promo = mockPromotions.find((p) => p.slug === slug);
  return promo || null;
}

export default async function PromotionDetailPage({ params }: { params: { slug: string } }) {
  const promotion = await getPromotionBySlug(params.slug);

  if (!promotion) {
    return notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header Khuyến Mãi */}
      <section className="relative h-[300px] md:h-[400px] w-full bg-gray-900 overflow-hidden">
        <Image
          src={promotion.image}
          alt={promotion.title}
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#18A14D]/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-white font-black text-[10px] uppercase tracking-widest w-max mb-3 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Đang diễn ra
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2 drop-shadow-md">
            {promotion.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300 font-bold text-sm uppercase tracking-widest">
            <HiOutlineClock size={16} className="text-[#18A14D]" />
            <span>Hạn áp dụng: {new Date(promotion.valid_until).toLocaleDateString("vi-VN")}</span>
          </div>
        </div>
      </section>

      {/* Nội dung Khuyến mãi & Form Đăng ký */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
            
            {/* Cột Nội dung chi tiết (Bên trái) */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 tracking-tight">Thông tin ưu đãi</h2>
              
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="font-medium text-lg text-gray-700 leading-relaxed mb-6">
                  {promotion.description}
                </p>
                
                <p>
                  Thuê xe VinFast tại Phú Quốc chưa bao giờ tiết kiệm đến thế! Chương trình áp dụng cho tất cả khách hàng đăng ký sớm nhất trong khoảng thời gian diễn ra sự kiện. 
                </p>

                <h3 className="text-xl font-black text-gray-900 mt-8 mb-4">Thể lệ chương trình:</h3>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <HiCheckCircle size={24} className="text-[#18A14D] flex-shrink-0 mt-0.5" />
                    <span>Áp dụng cho mọi đối tượng khách hàng (cũ và mới).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle size={24} className="text-[#18A14D] flex-shrink-0 mt-0.5" />
                    <span>Khách hàng phải thanh toán hoặc đặt cọc trước thời hạn của chương trình.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle size={24} className="text-[#18A14D] flex-shrink-0 mt-0.5" />
                    <span>Không có giá trị quy đổi thành tiền mặt.</span>
                  </li>
                  {promotion.discount_percentage && (
                    <li className="flex items-start gap-3">
                      <HiCheckCircle size={24} className="text-[#18A14D] flex-shrink-0 mt-0.5" />
                      <span>Giảm trực tiếp <strong>{promotion.discount_percentage}%</strong> vào hóa đơn thuê xe.</span>
                    </li>
                  )}
                </ul>

                <div className="mt-10 bg-orange-50/50 border border-orange-100 rounded-2xl p-5 border-l-4 border-l-orange-500">
                  <h4 className="font-black text-orange-800 mb-2 mt-0">Lưu ý quan trọng:</h4>
                  <p className="text-orange-900/80 text-sm mb-0">Số lượng mã ưu đãi có hạn, chương trình có thể kết thúc sớm hơn dự kiến nếu như hết ngân sách khuyến mãi. Vui lòng đăng ký sớm để được hưởng quyền lợi.</p>
                </div>
              </div>
            </div>

            {/* Cột Form Đăng ký (Bên phải - Sticky) */}
            <div className="lg:col-span-1 sticky top-32">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-[#18A14D]/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#18A14D]/5 rounded-bl-[100px] -z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <HiTag className="text-[#18A14D]" size={24} />
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Nhận Ưu Đãi Này</h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 font-medium">Để lại thông tin, nhân viên tư vấn sẽ liên hệ chốt xe sớm nhất cho bạn nhé.</p>
                  
                  {/* Form Client Component */}
                  <PromotionForm promotionTitle={promotion.title} />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
