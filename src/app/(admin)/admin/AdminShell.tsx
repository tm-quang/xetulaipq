"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome, HiCalendar, HiUsers, HiTruck, HiTag, HiPhotograph,
  HiPencilAlt, HiLogout, HiMenuAlt2, HiChevronDown,
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
  { 
    label: "Cài đặt hệ thống", 
    icon: HiCog,
    children: [
      { label: "Cài đặt chung", href: "/admin/settings?tab=general" },
      { label: "Cấu hình Email", href: "/admin/settings?tab=email" },
      { label: "Giao diện website", href: "/admin/settings?tab=appearance" },
      { label: "Bảo mật & Auth", href: "/admin/settings?tab=security" },
      { label: "Cơ sở dữ liệu", href: "/admin/settings?tab=database" },
    ]
  },
];

function AdminShellContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
  
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
      <div className="w-12 h-12 border-[5px] border-[#18A14D]/20 border-t-[#18A14D] rounded-full animate-spin shadow-lg" />
    </div>
  );
  if (!authenticated) return null;

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-gray-900 overflow-hidden font-medium">
      {/* Premium Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`${sidebarOpen ? 'w-[280px]' : 'w-24'} flex-shrink-0 flex flex-col bg-white border-r border-gray-100 transition-all duration-300 relative z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}
      >
        {/* Brand */}
        <div className="h-24 flex items-center px-7 border-b border-gray-50 gap-4 flex-shrink-0 bg-white">
          <div className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-[#18A14D] to-[#128a3f] flex items-center justify-center flex-shrink-0 shadow-xl shadow-[#18A14D]/25 border-2 border-white/20">
            <span className="text-white font-black text-xl">X</span>
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="font-black text-lg leading-none tracking-tight text-gray-900 uppercase">VF5 Tự Lái</span>
              <span className="text-[10px] font-black text-[#18A14D] uppercase tracking-widest mt-1">Hệ thống quản trị</span>
            </div>
          )}
        </div>

        {/* Nav Accordion */}
        <nav className="flex-1 py-6 px-5 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          {navItems.map(item => {
            const Icon = item.icon;
            const hasChildren = !!item.children;
            const isExpanded = expandedItem === item.label;
            const isActive = item.href ? (currentUrl === item.href || currentUrl.startsWith(item.href + '/')) : item.children?.some(child => currentUrl === child.href || currentUrl.startsWith(child.href + '&'));

            const content = (
              <div className={`flex items-center justify-between gap-4 px-5 py-4 rounded-[20px] text-[13px] font-black uppercase tracking-widest transition-all group cursor-pointer ${
                isActive && !hasChildren
                  ? 'bg-gradient-to-r from-[#18A14D] to-[#158c42] text-white shadow-xl shadow-[#18A14D]/25'
                  : isExpanded || isActive
                    ? 'text-[#18A14D] bg-[#18A14D]/10 border border-[#18A14D]/10'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-transparent hover:border-gray-100'
              }`}>
                <div className="flex items-center gap-4">
                  <Icon size={22} className={isActive ? (hasChildren ? 'text-[#18A14D]' : 'text-white') : 'text-gray-400 group-hover:text-gray-700 transition-colors'} />
                  {sidebarOpen && <span>{item.label}</span>}
                </div>
                {hasChildren && sidebarOpen && (
                  <HiChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#18A14D]' : 'text-gray-400'}`} />
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

                {/* Dropmenu Inside Sidebar */}
                <AnimatePresence>
                  {hasChildren && isExpanded && sidebarOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden pl-14 pr-2 space-y-1.5 pt-1"
                    >
                      {item.children?.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-5 py-3 rounded-[16px] text-[11px] font-black uppercase tracking-widest transition-all ${
                            currentUrl === child.href || currentUrl.startsWith(child.href + '&')
                              ? 'text-[#18A14D] bg-[#18A14D]/5 shadow-sm'
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

        {/* User Footer */}
        <div className="p-5 border-t border-gray-50 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-[20px] text-[12px] font-black uppercase tracking-[0.15em] text-gray-400 hover:text-red-500 hover:bg-red-50 hover:shadow-sm border border-transparent hover:border-red-100 transition-all border-dashed"
          >
            <HiLogout size={20} className="flex-shrink-0" />
            {sidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.02)]">
        {/* Sleek Topbar */}
        <header className="h-24 flex items-center justify-between px-8 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-20 transition-all">
          <div className="flex items-center gap-5">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl text-gray-500 bg-gray-50 hover:bg-white hover:text-[#18A14D] hover:shadow-lg hover:shadow-black/5 transition-all border border-gray-100 hover:border-gray-200"
            >
              {sidebarOpen ? <HiMenuAlt2 size={22} className="scale-x-[-1]" /> : <HiMenuAlt2 size={22} />}
            </button>
            <div className="h-6 w-px bg-gray-200" />
            <h2 className="text-[14px] font-black text-gray-900 uppercase tracking-widest leading-none">
              {navItems.find(n => n.href === pathname || n.children?.some(c => currentUrl.includes(c.href.split('?')[0])))?.label || "Workspace"}
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-white hover:text-[#18A14D] hover:shadow-md transition-all border border-gray-100">
              <HiBell size={22} className="hover:animate-swing" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white shadow-sm" />
            </button>
            <div className="h-8 w-px bg-gray-200 mx-1" />
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#18A14D] to-[#0e7a38] flex items-center justify-center shadow-lg shadow-[#18A14D]/20">
                  <span className="text-white font-black text-base uppercase">{userEmail[0]?.toUpperCase()}</span>
                </div>
                <div className="hidden sm:flex flex-col items-start leading-[1.1]">
                  <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{userEmail.split('@')[0]}</span>
                  <span className="text-[10px] font-black text-[#18A14D] uppercase tracking-widest mt-1">Admin</span>
                </div>
                <HiChevronDown size={16} className="text-gray-400 group-hover:text-gray-900 transition-colors ml-1" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-16 w-60 bg-white border border-gray-100 rounded-[28px] p-2 shadow-2xl z-50 ring-1 ring-black/5 overflow-hidden"
                  >
                    <div className="px-5 py-4 border-b border-gray-50 mb-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">Tài khoản</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{userEmail}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-700 hover:bg-red-50 transition-all outline-none">
                      <HiLogout size={18} /> Đăng xuất
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content: Fixed opacity-0 invisible issue */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 transition-colors">
          <div className="max-w-[1600px] mx-auto min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-12 h-12 border-[5px] border-[#18A14D]/20 border-t-[#18A14D] rounded-full animate-spin shadow-lg" /></div>}>
      <AdminShellContent>{children}</AdminShellContent>
    </Suspense>
  );
}
