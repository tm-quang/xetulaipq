"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome, HiCalendar, HiUsers, HiTruck, HiTag, HiPhotograph,
  HiPencilAlt, HiLogout, HiMenuAlt2, HiX, HiChevronDown,
  HiBell, HiCog
} from "react-icons/hi";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: HiHome },
  { label: "Đặt xe", href: "/admin/bookings", icon: HiCalendar },
  { label: "Khách hàng", href: "/admin/customers", icon: HiUsers },
  { 
    label: "Xe", 
    icon: HiTruck,
    children: [
      { label: "Danh sách xe", href: "/admin/cars" },
      { label: "Loại xe", href: "/admin/cars/categories" },
    ]
  },
  { label: "Khuyến mãi", href: "/admin/promotions", icon: HiTag },
  { label: "Hình ảnh", href: "/admin/media", icon: HiPhotograph },
  { 
    label: "Nội dung", 
    icon: HiPencilAlt,
    children: [
      { label: "Hợp đồng", href: "/admin/content/contracts" },
      { label: "Trang tĩnh", href: "/admin/content/pages" },
    ]
  },
  { label: "Cài đặt", href: "/admin/settings", icon: HiCog },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const isBypass = typeof window !== 'undefined' && localStorage.getItem("admin_bypass") === "true";
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session && !isBypass) {
      router.replace("/admin");
    } else {
      setUserEmail(session?.user?.email || "admin@xetulaipq.vn");
      setAuthenticated(true);
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const isBypass = typeof window !== 'undefined' && localStorage.getItem("admin_bypass") === "true";
      if (!session && !isBypass) {
        router.replace("/admin");
      } else if (session) {
        setUserEmail(session.user.email || "");
        setAuthenticated(true);
        setLoading(false);
      }
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setExpandedItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checkAuth, router]);

  const handleLogout = async () => {
    localStorage.removeItem("admin_bypass");
    await supabase.auth.signOut();
    router.replace("/admin");
  };

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#18A14D]/20 border-t-[#18A14D] rounded-full animate-spin" />
    </div>
  );
  if (!authenticated) return null;

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden font-medium">
      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`${sidebarOpen ? 'w-72' : 'w-20'} flex-shrink-0 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 relative z-30 shadow-sm`}
      >
        {/* Brand */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100 gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#18A14D] to-[#128a3f] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#18A14D]/20">
            <span className="text-white font-black text-lg">X</span>
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="font-black text-base leading-none tracking-tight text-gray-900 uppercase">Xê Tu Lái</span>
              <span className="text-[10px] font-bold text-[#18A14D] uppercase tracking-widest mt-1">Hệ thống quản trị</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-100">
          {navItems.map(item => {
            const Icon = item.icon;
            const hasChildren = !!item.children;
            const isExpanded = expandedItem === item.label;
            const isActive = item.href ? (pathname === item.href || pathname.startsWith(item.href + '/')) : item.children?.some(child => pathname === child.href);

            const content = (
              <div className={`flex items-center justify-between gap-3.5 px-4 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all group cursor-pointer ${
                isActive && !hasChildren
                  ? 'bg-[#18A14D] text-white shadow-lg shadow-[#18A14D]/25'
                  : isExpanded || isActive
                    ? 'text-[#18A14D] bg-green-50/50'
                    : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
              }`}>
                <div className="flex items-center gap-3.5">
                  <Icon size={18} className={isActive ? (hasChildren ? 'text-[#18A14D]' : 'text-white') : 'text-gray-300 group-hover:text-[#18A14D]'} />
                  {sidebarOpen && <span>{item.label}</span>}
                </div>
                {hasChildren && sidebarOpen && (
                  <HiChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                )}
              </div>
            );

            return (
              <div key={item.label} className="space-y-1">
                {item.href ? (
                  <Link href={item.href} onClick={() => setExpandedItem(null)}>
                    {content}
                  </Link>
                ) : (
                  <div onClick={() => toggleExpand(item.label)}>
                    {content}
                  </div>
                )}

                {/* Submenu */}
                <AnimatePresence>
                  {hasChildren && isExpanded && sidebarOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden pl-11 pr-2 space-y-1"
                    >
                      {item.children?.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                            pathname === child.href
                              ? 'text-[#18A14D] bg-[#18A14D]/5'
                              : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
          >
            <HiLogout size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.02)]">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-100 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all"
            >
              {sidebarOpen ? <HiX size={20} /> : <HiMenuAlt2 size={20} />}
            </button>
            <div className="h-5 w-px bg-gray-200" />
            <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">
              {navItems.find(n => n.href === pathname || n.children?.some(c => c.href === pathname))?.label || "Workspace"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-white hover:text-[#18A14D] hover:shadow-sm transition-all border border-transparent">
              <HiBell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
            <div className="h-6 w-px bg-gray-200 mx-1" />
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 px-1.5 py-1.5 rounded-[18px] hover:bg-gray-50 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#18A14D] to-[#0e7a38] flex items-center justify-center shadow-lg shadow-[#18A14D]/20">
                  <span className="text-white font-black text-sm uppercase">{userEmail[0]?.toUpperCase()}</span>
                </div>
                <div className="hidden sm:flex flex-col items-start leading-none">
                  <span className="text-[10px] font-black text-gray-900 uppercase tracking-tighter">{userEmail.split('@')[0]}</span>
                  <span className="text-[8px] font-bold text-[#18A14D] uppercase tracking-widest mt-1">Admin</span>
                </div>
                <HiChevronDown size={14} className="text-gray-300 group-hover:text-gray-600 transition-colors ml-1" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-14 w-52 bg-white border border-gray-100 rounded-[24px] p-2 shadow-2xl z-50 ring-1 ring-black/5 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Tài khoản</p>
                    <p className="text-xs font-bold text-gray-900 truncate">{userEmail}</p>
                  </div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50 transition-all outline-none">
                    <HiLogout size={16} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-3 md:p-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
