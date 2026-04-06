"use client";

import Link from "next/link";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlinePhone } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Supabase Auth Register
    setTimeout(() => {
      setIsLoading(false);
      alert("Tính năng Đăng ký đang được cập nhật!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#18A14D]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#117637]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1000px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse relative z-10 border border-gray-100">
        
        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-auto hidden md:block">
          <Image 
             src="https://images.unsplash.com/photo-1660634629768-4ad01ba0379c?q=80&w=1470&auto=format&fit=crop"
            alt="Register Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex flex-col justify-end p-12">
            <h2 className="text-4xl font-black text-white mb-4 leading-tight uppercase tracking-tight">Cộng Đồng <br/><span className="text-[#18A14D]">Tự Lái</span></h2>
            <p className="text-gray-300 font-medium">Đăng ký thành viên để nhận hàng ngàn ưu đãi thuê xe đặc quyền ngay hôm nay.</p>
          </div>
        </div>

        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Tạo Tài Khoản</h1>
            <p className="text-gray-500 font-medium text-sm">Điền đầy đủ thông tin bên dưới để đăng ký.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-1.5 ml-1">Họ và Tên</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineUser size={18} />
                </div>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nguyễn Văn A" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#18A14D]/50 focus:border-[#18A14D] transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-1.5 ml-1">Số điện thoại</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <HiOutlinePhone size={18} />
                </div>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="09xx xxx xxx" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#18A14D]/50 focus:border-[#18A14D] transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-1.5 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineMail size={18} />
                </div>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="name@example.com" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#18A14D]/50 focus:border-[#18A14D] transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-1.5 ml-1">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineLockClosed size={18} />
                </div>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#18A14D]/50 focus:border-[#18A14D] transition-all font-medium"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#18A14D] text-white font-black py-3.5 rounded-xl uppercase tracking-widest text-[13px] hover:bg-[#138840] transition-colors shadow-lg shadow-[#18A14D]/30 active:scale-95 disabled:opacity-70 mt-2"
            >
              {isLoading ? "Đang xử lý..." : "Đăng Ký Tài Khoản"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-gray-500">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-[#18A14D] font-black hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
