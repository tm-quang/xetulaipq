"use client";

import { motion } from "framer-motion";

export default function ZaloFloat() {
  return (
    <motion.a
      href="https://zalo.me/0123456789"
      target="_blank"
      rel="noopener noreferrer"
      drag
      dragMomentum={false}
      // Dùng framer-motion drag để kéo thả, không lưu trạng thái (F5 tự động reset)
      className="fixed bottom-24 right-4 z-[100] bg-blue-500 text-white p-3 rounded-full shadow-xl shadow-blue-500/30 hover:scale-105 transition-transform flex items-center justify-center w-[60px] h-[60px] cursor-grab active:cursor-grabbing touch-none"
      aria-label="Liên hệ Zalo"
    >
      <span className="font-extrabold text-lg pointer-events-none select-none">Zalo</span>
    </motion.a>
  );
}
