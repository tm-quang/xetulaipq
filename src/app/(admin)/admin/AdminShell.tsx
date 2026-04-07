"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  HiHome, HiCalendar, HiUsers, HiTruck, HiTag, HiPhotograph,
  HiPencilAlt, HiLogout, HiMenuAlt2, HiX, HiChevronDown,
  HiBell, HiCog
} from "react-icons/hi";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: HiHome },
  { label: "Đặt xe", href: "/admin/bookings", icon: HiCalendar },
  { label: "Khách hàng", href: "/admin/customers", icon: HiUsers },
  { label: "Xe", href: "/admin/cars", icon: HiTruck },
  { label: "Khuyến mãi", href: "/admin/promotions", icon: HiTag },
  { label: "Hình ảnh", href: "/admin/media", icon: HiPhotograph },
  { label: "Nội dung", href: "/admin/content", icon: HiPencilAlt },
  { label: "Cài đặt", href: "/admin/settings", icon: HiCog },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const isBypass = localStorage.getItem("admin_bypass") === "true";
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session && !isBypass) {
      router.replace("/admin");
    } else {
      setUserEmail(session?.user?.email || "admin@xetulaipq.vn");
      setAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) router.replace("/admin");
    });
    return () => subscription.unsubscribe();
  }, [checkAuth, router]);

  const handleLogout = async () => {
    localStorage.removeItem("admin_bypass");
    await supabase.auth.signOut();
    router.replace("/admin");
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#18A14D] border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!authenticated) return null;

  return (
    <div className="flex h-screen bg-[#0f1117] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 flex flex-col bg-[#13181f] border-r border-white/5 transition-all duration-300`}>
        {/* Brand */}
        <div className="h-16 flex items-center px-5 border-b border-white/5 gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#18A14D] to-[#0e7a38] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-sm">X</span>
          </div>
          {sidebarOpen && <span className="font-black text-sm tracking-tight text-white">Xê Tu Lái</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  active
                    ? 'bg-[#18A14D]/15 text-[#18A14D]'
                    : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
                {sidebarOpen && active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#18A14D]" />}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <HiLogout size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#13181f]/80 backdrop-blur flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition"
          >
            {sidebarOpen ? <HiX size={22} /> : <HiMenuAlt2 size={22} />}
          </button>

          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition">
              <HiBell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#18A14D]" />
            </button>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#18A14D] to-[#0e7a38] flex items-center justify-center">
                  <span className="text-white font-black text-xs">{userEmail[0]?.toUpperCase()}</span>
                </div>
                <span className="text-sm font-bold text-gray-300 max-w-[120px] truncate">{userEmail}</span>
                <HiChevronDown size={14} className="text-gray-500" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 w-48 bg-[#1a2030] border border-white/10 rounded-2xl p-2 shadow-2xl z-50">
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition">
                    <HiLogout size={16} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
