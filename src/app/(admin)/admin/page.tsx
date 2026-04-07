"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { HiLockClosed, HiMail, HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@xetulaipq.vn");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/admin/dashboard");
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Temporary bypass for requested admin credentials
    if (email === "admin@xetulaipq.vn" && password === "03053991") {
      localStorage.setItem("admin_bypass", "true");
      router.replace("/admin/dashboard");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email hoặc mật khẩu không đúng.");
    } else {
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f1117] via-[#161b27] to-[#0f1117] flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#18A14D]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#18A14D] to-[#0e7a38] shadow-2xl shadow-[#18A14D]/30 mb-4">
            <span className="text-white font-black text-2xl">X</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Xê Tu Lái</h1>
          <p className="text-gray-500 text-sm mt-1">Admin Dashboard</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-xl font-black text-white mb-6">Đăng nhập quản trị</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Email</label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@xetulaipq.vn"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#18A14D]/50 focus:ring-2 focus:ring-[#18A14D]/10 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Mật khẩu</label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl pl-11 pr-12 py-3.5 text-sm focus:outline-none focus:border-[#18A14D]/50 focus:ring-2 focus:ring-[#18A14D]/10 transition"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#18A14D] to-[#15c45e] text-white font-black py-4 rounded-xl shadow-lg shadow-[#18A14D]/25 hover:shadow-[#18A14D]/40 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-600 text-xs font-bold">HOẶC</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3.5 rounded-xl transition-all text-sm"
          >
            <FcGoogle size={20} />
            Đăng nhập với Google
          </button>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          © 2026 Xê Tu Lái · Hệ thống quản trị nội bộ
        </p>
      </div>
    </div>
  );
}
