import Image from "next/image";
import { HiCheckCircle, HiLightBulb, HiShieldCheck, HiStar, HiHeart } from "react-icons/hi";

export const metadata = {
   title: "Về Chúng Tôi",
   description: "Tìm hiểu về sứ mệnh, tầm nhìn và các giá trị cốt lõi của VF5 Tự Lái Rạch Giá - Đơn vị tiên phong cung cấp dịch vụ thuê xe điện VinFast VF5 tự lái chất lượng.",
};

export default function AboutUsPage() {
   return (
      <div className="bg-white min-h-screen">
         {/* Hero Section */}
         <section className="relative py-20 md:py-40 bg-gray-900 overflow-hidden">
            <div className="absolute inset-0 opacity-50">
               <Image
                  src="/images/vf5/vf5-1.png"
                  alt="About Us Background"
                  fill
                  className="object-cover"
               />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
               <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 bg-[#18A14D]/20 backdrop-blur-md border border-[#18A14D]/30 px-5 py-2.5 rounded-full text-[#18A14D] font-black text-sm mb-8 uppercase tracking-widest">
                     <HiHeart /> Hành trình xanh
                  </div>
                  <h1 className="text-2xl md:text-7xl font-black text-white mb-6 leading-[0.95] uppercase tracking-tight">
                     Tiên phong <br /> <span className="text-[#18A14D]">Giao thông xanh</span> <br /> Tại Rạch Giá
                  </h1>
                  <p className="text-gray-300 font-bold text-xl leading-relaxed opacity-90 drop-shadow-lg">
                     VF5 Tự Lái không chỉ là một dịch vụ cho thuê xe. Chúng tôi là giải pháp di chuyển thông minh, thân thiện và trách nhiệm tại Rạch Giá.
                  </p>
               </div>
            </div>
         </section>

         {/* Intro Mission Section */}
         <section className="py-24 relative">
            <div className="container mx-auto px-4 max-w-6xl">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div className="relative">
                     <div className="relative h-[500px] w-full rounded-[48px] overflow-hidden shadow-2xl z-20">
                        <Image
                           src="/images/Logo/Logo.png"
                           alt="Mission"
                           fill
                           className="object-cover"
                        />
                     </div>
                  </div>

                  <div>
                     <h2 className="text-2xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight leading-tight">
                        Sứ mệnh mang lại sự <br /> <span className="text-[#18A14D]">Bền vững</span>
                     </h2>
                     <div className="space-y-8">
                        <div className="flex gap-6 items-start group">
                           <div className="w-14 h-14 shrink-0 rounded-2xl bg-gray-50 flex items-center justify-center text-[#18A14D] group-hover:bg-[#18A14D] group-hover:text-white transition-all shadow-sm">
                              <HiCheckCircle size={28} />
                           </div>
                           <div>
                              <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Bảo vệ môi trường</h3>
                              <p className="text-gray-500 font-medium leading-relaxed">
                                 Mỗi chuyến hành trình bằng xe điện giúp giảm thiểu khí thải CO2, giữ cho bầu không khí Rạch Giá luôn trong lành và cân bằng.
                              </p>
                           </div>
                        </div>

                        <div className="flex gap-6 items-start group">
                           <div className="w-14 h-14 shrink-0 rounded-2xl bg-gray-50 flex items-center justify-center text-[#18A14D] group-hover:bg-[#18A14D] group-hover:text-white transition-all shadow-sm">
                              <HiShieldCheck size={28} />
                           </div>
                           <div>
                              <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">An toàn tuyệt đối</h3>
                              <p className="text-gray-500 font-medium leading-relaxed">
                                 Xe được kiểm tra kỹ thuật định kỳ nghiêm ngặt. Hệ thống xe thông minh VinFast tích hợp nhiều tính năng an toàn vượt trội.
                              </p>
                           </div>
                        </div>

                        <div className="flex gap-6 items-start group">
                           <div className="w-14 h-14 shrink-0 rounded-2xl bg-gray-50 flex items-center justify-center text-[#18A14D] group-hover:bg-[#18A14D] group-hover:text-white transition-all shadow-sm">
                              <HiLightBulb size={28} />
                           </div>
                           <div>
                              <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Tiện lợi & Tiết kiệm</h3>
                              <p className="text-gray-500 font-medium leading-relaxed">
                                 Tiết kiệm tối đa chi phí nhiên liệu. Đặt xe dễ dàng qua hệ thống trực tuyến, giao xe miễn phí tận tay khách hàng.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Core Values Section */}
         <section className="py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
               <div className="text-center mb-10 md:mb-20">
                  <h2 className="text-2xl md:text-5xl font-black text-gray-900 mb-4 md:mb-6 uppercase tracking-tight">Giá trị cốt lõi</h2>
                  <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm opacity-60">Xây dựng niềm tin từ sự trách nhiệm</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                     { icon: <HiStar />, title: 'Chất lượng', desc: 'Đảm bảo tiêu chuẩn xe đời mới và sạch sẽ 100%.' },
                     { icon: <HiHeart />, title: 'Khách hàng', desc: 'Lắng nghe và giải quyết mọi nhu cầu của bạn ngay lập tức.' },
                     { icon: <HiCheckCircle />, title: 'Minh bạch', desc: 'Hợp đồng rõ ràng, không phí ẩn hay phát sinh vô lý.' },
                     { icon: <HiShieldCheck />, title: 'Trách nhiệm', desc: 'Gắn liền sự phát triển của công ty với cộng đồng.' },
                  ].map((value, i) => (
                     <div key={i} className="bg-white p-6 md:p-10 rounded-[32px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-[#18A14D]/10 text-[#18A14D] flex items-center justify-center text-3xl mx-auto mb-6 transition-transform rotate-3 group-hover:rotate-0">
                           {value.icon}
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tighter">{value.title}</h3>
                        <p className="text-gray-500 font-medium text-sm leading-relaxed">{value.desc}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Background text decoration */}
            <div className="absolute top-1/2 left-0 w-full text-[150px] font-black text-gray-100/90 pointer-events-none -translate-y-1/2 select-none uppercase tracking-widest flex items-center justify-between px-20">
               <span>GREEN</span>
               <span>POWER</span>
            </div>
         </section>

         {/* Call To Action */}
         <section className="py-24 container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto bg-white rounded-[48px] p-12 md:p-24 border border-gray-100 shadow-[0_30px_100px_rgba(0,0,0,0.1)] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-[#18A14D]/5 rounded-bl-[100px] -z-10"></div>

               <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 uppercase tracking-tight leading-tight">
                  Tham gia hành trình <br /> <span className="text-[#18A14D]">Tương lai cùng chúng tôi</span>
               </h2>
               <p className="text-gray-500 font-bold mb-12 text-lg max-w-2xl mx-auto leading-relaxed">
                  Khám phá Rạch Giá trọn vẹn và văn minh nhất bằng việc lựa chọn xe điện xanh làm người bạn đồng hành.
               </p>

               <div className="flex flex-wrap justify-center gap-6">
                  <button className="bg-[#18A14D] hover:bg-[#158c42] text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-[#18A14D]/30 uppercase tracking-widest active:scale-95">
                     Đặt xe ngay
                  </button>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl uppercase tracking-widest active:scale-95">
                     Xem bảng giá
                  </button>
               </div>
            </div>
         </section>
      </div>
   );
}
