"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { HiLockClosed, HiMail, HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@xetulaipq.vn");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const isBypass = typeof window !== 'undefined' && localStorage.getItem("admin_bypass") === "true";
      if (data.session || isBypass) router.replace("/admin/dashboard");
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Temporary bypass for requested admin credentials
    if (email === "admin@xetulaipq.vn" && password === "03053991") {
      localStorage.setItem("admin_bypass", "true");
      toast.success("Đăng nhập quản trị thành công!");
      router.replace("/admin/dashboard");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error("Email hoặc mật khẩu không chính xác.");
    } else {
      toast.success("Đăng nhập thành công!");
      router.replace("/admin/dashboard");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/admin/dashboard` },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#18A14D]/5 -z-10 rounded-bl-[200px]" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-500/5 -z-10 rounded-tr-[150px]" />

      <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-700">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#18A14D] to-[#128a3f] shadow-2xl shadow-[#18A14D]/30 mb-6 group hover:rotate-12 transition-transform duration-500">
            <span className="text-white font-black text-3xl">X</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">VF5 Tự Lái</h1>
          <p className="text-xs font-black text-[#18A14D] uppercase tracking-[0.3em] mt-2">Hệ thống quản trị</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-xl shadow-black/5 relative">
          <div className="mb-8">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Đăng nhập Quản trị</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none ml-1">Tài khoản Email</label>
              <div className="relative group">
                <HiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#18A14D] transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold focus:outline-none focus:border-[#18A14D]/50 focus:bg-white focus:shadow-md transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none ml-1">Mật khẩu bảo mật</label>
              <div className="relative group">
                <HiLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#18A14D] transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-2xl pl-14 pr-14 py-4 text-sm font-bold focus:outline-none focus:border-[#18A14D]/50 focus:bg-white focus:shadow-md transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#18A14D] to-[#15c45e] text-white font-black py-4 rounded-2xl shadow-xl shadow-[#18A14D]/25 hover:shadow-[#18A14D]/40 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-[0.2em] mt-4"
            >
              {loading ? "Đang xác thực..." : "Xác nhận Đăng nhập"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-gray-300 text-[10px] font-black uppercase tracking-widest">Hoặc</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-100 text-gray-700 font-black py-4 rounded-2xl transition-all text-xs uppercase tracking-widest shadow-sm hover:shadow-md"
          >
            <FcGoogle size={22} />
            Tiếp tục với Google
          </button>
        </div>

        <p className="text-center text-gray-400 text-[10px] font-bold mt-10 uppercase tracking-widest">
          © 2026 Xe Tự Lái Rạch Giá
        </p>
      </div>
    </div>
  );
}
