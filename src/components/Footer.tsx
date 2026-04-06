import Link from "next/link";
import { HiLocationMarker, HiPhone, HiMail, HiArrowRight } from "react-icons/hi";
import { BsFacebook, BsYoutube, BsTiktok } from "react-icons/bs";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-8 pb-24 md:pb-8 text-sm text-gray-600 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-[#18A14D]/5 to-transparent -z-10 rounded-bl-[100px]" />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Brand & Contact Info */}
          <div className="lg:col-span-4 pr-0 lg:pr-6">
            <Link href="/" className="flex items-center gap-2 text-[#18A14D] font-black text-3xl tracking-tighter mb-6 inline-block">
              <span>XẾ</span>
              <span className="bg-[#18A14D] text-white px-3 py-1.5 rounded-xl text-2xl shadow-sm">TU LÁI</span>
            </Link>
            <p className="mb-8 text-gray-500 font-medium leading-relaxed">
              Trải nghiệm dịch vụ cho thuê xe điện VinFast tự lái số 1 tại Phú Quốc. Xe đời mới 100%, thủ tục nhanh gọn, giao xe tận nơi. Hành trình xanh, trọn niềm vui!
            </p>
            <div className="space-y-4">
              <a href="tel:09xx" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="w-10 h-10 rounded-full bg-[#18A14D]/10 text-[#18A14D] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <HiPhone size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Hotline Đặt Xe</p>
                  <p className="font-black text-gray-900 text-lg group-hover:text-[#18A14D] transition-colors">0123 456 789</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
                  <HiLocationMarker size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Trụ sở</p>
                  <p className="font-bold text-gray-800 leading-snug">Số 123 Đường Điện Biên Phủ, Phường Dương Đông, Phú Quốc, Kiên Giang</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
                  <HiMail size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Hỗ trợ</p>
                  <p className="font-bold text-gray-800">support@xetulaipq.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-black text-gray-900 mb-6 uppercase text-sm tracking-widest relative inline-block">
              Chi Tiết Dịch Vụ
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#18A14D] rounded-full"></span>
            </h3>
            <ul className="space-y-4 font-bold text-gray-600">
              <li><Link href="/cars" className="hover:text-[#18A14D] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#18A14D] transition-colors"></span> Thuê xe tự lái</Link></li>
              <li><Link href="/cars-driver" className="hover:text-[#18A14D] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#18A14D] transition-colors"></span> Thuê xe có tài xế</Link></li>
              <li><Link href="/promotion" className="hover:text-[#18A14D] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#18A14D] transition-colors"></span> Ưu đãi khuyến mãi</Link></li>
              <li><Link href="/about" className="hover:text-[#18A14D] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#18A14D] transition-colors"></span> Về chúng tôi</Link></li>
              <li><Link href="/blog" className="hover:text-[#18A14D] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#18A14D] transition-colors"></span> Cẩm nang du lịch</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-black text-gray-900 mb-6 uppercase text-sm tracking-widest relative inline-block">
              Chính Sách
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#18A14D] rounded-full"></span>
            </h3>
            <ul className="space-y-4 font-bold text-gray-600">
              <li><Link href="/policy" className="hover:text-[#18A14D] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#18A14D] transition-colors"></span> Điều khoản thuê xe</Link></li>
              <li><Link href="/privacy" className="hover:text-[#18A14D] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#18A14D] transition-colors"></span> Bảo mật thông tin</Link></li>
              <li><Link href="/payment-policy" className="hover:text-[#18A14D] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#18A14D] transition-colors"></span> Chính sách thanh toán</Link></li>
              <li><Link href="/faq" className="hover:text-[#18A14D] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#18A14D] transition-colors"></span> Câu hỏi thường gặp</Link></li>
              <li><Link href="/contact" className="hover:text-[#18A14D] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#18A14D] transition-colors"></span> Liên hệ hỗ trợ</Link></li>
            </ul>
          </div>

          {/* Socials & Newsletter */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 border border-gray-100 rounded-[28px] p-6 lg:p-8 relative">
              <h3 className="font-black text-gray-900 mb-3 uppercase text-sm tracking-widest">
                Đăng ký nhận ưu đãi
              </h3>
              <p className="text-gray-500 text-sm mb-5 font-medium leading-relaxed">
                Nhập email để nhận mã giảm giá lên đến 20% cho chuyến đi đầu tiên và các ưu đãi hấp dẫn khác.
              </p>

              <div className="flex bg-white rounded-2xl p-1.5 border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-[#18A14D]/20 focus-within:border-[#18A14D]/50 transition-all mb-8">
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  className="flex-1 bg-transparent border-none px-4 outline-none text-sm font-medium placeholder:text-gray-400"
                />
                <button className="bg-[#18A14D] hover:bg-[#158c42] text-white w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-md">
                  <HiArrowRight size={20} />
                </button>
              </div>

              <h3 className="font-black text-gray-900 mb-4 uppercase text-sm tracking-widest">
                Kết Nối Với Chúng Tôi
              </h3>
              <div className="flex gap-3">
                <a href="#" aria-label="Facebook" className="w-12 h-12 rounded-2xl bg-white border border-gray-200 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-lg hover:-translate-y-1 transition-all">
                  <BsFacebook size={20} />
                </a>
                <a href="#" aria-label="Youtube" className="w-12 h-12 rounded-2xl bg-white border border-gray-200 text-[#FF0000] flex items-center justify-center hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:shadow-lg hover:-translate-y-1 transition-all">
                  <BsYoutube size={22} />
                </a>
                <a href="#" aria-label="Tiktok" className="w-12 h-12 rounded-2xl bg-white border border-gray-200 text-gray-900 flex items-center justify-center hover:bg-black hover:text-white hover:border-black hover:shadow-lg hover:-translate-y-1 transition-all">
                  <BsTiktok size={18} />
                </a>
                {/* Zalo custom icon */}
                <a href="#" aria-label="Zalo" className="w-12 h-12 rounded-2xl bg-white border border-gray-200 text-[#0068FF] font-black text-[11px] uppercase flex items-center justify-center hover:bg-[#0068FF] hover:text-white hover:border-[#0068FF] hover:shadow-lg hover:-translate-y-1 transition-all">
                  Zalo
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="font-bold text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} CÔNG TY TNHH XÊ TU LÁI PHÚ QUỐC.
            </p>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <p className="font-medium text-gray-500 text-xs">
              Mã số thuế: 0123456789 do Sở Kế hoạch và Đầu tư Tỉnh Kiên Giang cấp.
            </p>
          </div>
          <div className="flex gap-4">
            {/* Payment Methods placeholders */}
            <div className="h-8 w-12 bg-gray-100 rounded-md flex items-center justify-center text-[10px] font-bold text-gray-400 border">VISA</div>
            <div className="h-8 w-12 bg-gray-100 rounded-md flex items-center justify-center text-[10px] font-bold text-gray-400 border">MASTER</div>
            <div className="h-8 w-12 bg-gray-100 rounded-md flex items-center justify-center text-[10px] font-bold text-gray-400 border">MOMO</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
