"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiX, HiInformationCircle, HiClock, HiUserAdd, HiLogin } from "react-icons/hi";
import { FaCar } from "react-icons/fa";
import { LuHouse, LuGift, LuMap } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const menuItems = [
    { name: "Trang chủ", href: "/", icon: LuHouse },
    { name: "Tìm xe", href: "/cars", icon: FaCar },
    { name: "Khuyến mãi", href: "/promotion", icon: LuGift },
    { name: "Về chúng tôi", href: "/about", icon: HiInformationCircle },
    { name: "Chuyến đi", href: "/trips", icon: LuMap },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-gray-200 shadow-sm"
            : "bg-white border-transparent"
        )}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left Toggle (Mobile only) */}
          <button
            className="md:hidden p-2 text-gray-700 -ml-2 hover:bg-gray-100 rounded-full transition"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <HiMenu size={26} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tighter md:ml-0">
            <span className="text-gray-900">XẾ</span>
            <span className="bg-primary text-white px-2 py-0.5 rounded-lg text-md">TỰ LÁI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-base">
            {menuItems.slice(1, 4).map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-600 hover:text-primary transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/trips"
              className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <HiClock size={19} className="text-gray-400" />
              Chuyến đi
            </Link>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-3">
              <Link
                href="/register"
                className="text-sm font-bold text-gray-800 hover:text-primary transition-colors"
              >
                Đăng ký
              </Link>
              <Link
                href="/login"
                className="bg-primary text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-primary/90 shadow-md shadow-primary/10 transition active:scale-95"
              >
                Đăng nhập
              </Link>
            </div>
          </div>

          {/* Placeholder to balance mobile header */}
          <div className="w-8 md:hidden" />
        </div>
      </header>

      {/* Mobile Sidebar & Backdrop OUTSIDE OF HEADER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[9999] shadow-2xl flex flex-col"
            >
              <div className="p-5 flex items-center justify-between border-b bg-white">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tighter">
                  <span className="text-gray-900">XẾ</span>
                  <span className="bg-primary text-white px-2 py-0.5 rounded-lg text-md">TỰ LÁI</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <HiX size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-white relative">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 p-3.5 rounded-xl font-bold text-gray-700 hover:bg-primary/5 hover:text-primary transition-all group active:scale-[0.98]"
                  >
                    <div className="w-10 h-10 rounded-3xl bg-primary flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-colors border border-transparent group-hover:border-primary/20">
                      <item.icon size={22} />
                    </div>
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="p-4 border-t bg-gray-50/50 space-y-3 relative z-10">
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  href="/register"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold border border-primary bg-white shadow-sm text-gray-700 active:scale-[0.98] transition"
                >
                  <HiUserAdd size={20} className="text-gray-400" />
                  Đăng ký
                </Link>
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/20 active:scale-[0.98] transition"
                >
                  <HiLogin size={20} />
                  Đăng nhập
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
