"use client";

import Link from "next/link";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Supabase Auth Login
    setTimeout(() => {
      setIsLoading(false);
      alert("Tính năng Đăng nhập đang được cập nhật!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#18A14D]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#117637]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1000px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 border border-gray-100">

        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-auto hidden md:block">
          <Image
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1470&auto=format&fit=crop"
            alt="Login Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex flex-col justify-end p-12">
            <h2 className="text-4xl font-black text-white mb-4 leading-tight uppercase tracking-tight">Chào mừng <br /><span className="text-[#18A14D]">Trở lại!</span></h2>
            <p className="text-gray-300 font-medium">Bắt đầu hành trình di chuyển xanh và thông minh cùng Xế Tự Lái Phú Quốc.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Đăng Nhập</h1>
            <p className="text-gray-500 font-medium text-sm">Vui lòng điền thông tin để tiếp tục.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineMail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#18A14D]/50 focus:border-[#18A14D] transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest">Mật khẩu</label>
                <Link href="/forgot-password" className="text-xs font-bold text-[#18A14D] hover:underline">Quên mật khẩu?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineLockClosed size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#18A14D]/50 focus:border-[#18A14D] transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#18A14D] text-white font-black py-4 rounded-2xl uppercase tracking-widest text-sm hover:bg-[#138840] transition-colors shadow-lg shadow-[#18A14D]/30 active:scale-95 disabled:opacity-70 mt-2"
            >
              {isLoading ? "Đang xử lý..." : "Đăng Nhập"}
            </button>
          </form>

          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <div className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Hoặc</div>
          </div>

          <button className="mt-8 w-full bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95 text-sm">
            <FcGoogle size={22} />
            Đăng nhập với Google
          </button>

          <p className="mt-10 text-center text-sm font-medium text-gray-500">
            Bạn chưa có tài khoản?{" "}
            <Link href="/register" className="text-[#18A14D] font-black hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
