"use client";

import { cn } from "@/lib/utils";

export function AdminCard({ children, className, title, subtitle, extra }: { 
  children: React.ReactNode; 
  className?: string;
  title?: string;
  subtitle?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className={cn("bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-300", className)}>
      {(title || extra) && (
        <div className="px-7 py-5 border-b border-gray-50/80 flex items-center justify-between gap-4 bg-gray-50/30">
          <div>
            {title && <h2 className="text-[19px] font-black text-gray-900 uppercase tracking-tight leading-none">{title}</h2>}
            {subtitle && <p className="text-[11px] font-black text-gray-400 mt-2.5 uppercase tracking-widest leading-none">{subtitle}</p>}
          </div>
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div className="p-0">
        {children}
      </div>
    </div>
  );
}

export function AdminTable({ headers, children, loading }: {
  headers: string[];
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#18A14D]/5 text-[#18A14D] text-[11px] font-black uppercase tracking-[0.15em] border-b border-[#18A14D]/10">
            {headers.map((header, idx) => (
              <th key={idx} className="px-7 py-5 whitespace-nowrap">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-[13px] font-bold text-gray-700 relative">
          {loading ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-[#18A14D]/20 border-t-[#18A14D] rounded-full animate-spin shadow-lg" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Đang tải dữ liệu...</span>
                </div>
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}

export function AdminButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#18A14D] to-[#128a3f] text-white shadow-xl shadow-[#18A14D]/25 hover:shadow-2xl hover:shadow-[#18A14D]/30 border border-[#18A14D]/50 hover:-translate-y-0.5',
    secondary: 'bg-white text-gray-700 shadow-md shadow-black/5 hover:shadow-lg border border-gray-200 hover:-translate-y-0.5',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-xl shadow-red-500/25 hover:shadow-2xl hover:shadow-red-500/30 border border-red-500/50 hover:-translate-y-0.5',
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900',
    outline: 'bg-white border-2 border-gray-200 text-gray-600 hover:border-[#18A14D] hover:text-[#18A14D] hover:shadow-lg shadow-sm hover:-translate-y-0.5'
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-[10px]',
    md: 'px-7 py-3.5 text-[12px]',
    lg: 'px-10 py-4 text-[13px]',
    icon: 'w-11 h-11 flex items-center justify-center p-0'
  };

  return (
    <button 
      className={cn(
        "rounded-[18px] font-black uppercase tracking-[0.15em] transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 leading-none inline-flex items-center justify-center gap-2.5",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminInput({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
  return (
    <div className="space-y-2.5">
      {label && <label className="block text-[11px] font-black text-gray-500 uppercase tracking-[0.15em] leading-none ml-1">{label}</label>}
      <input 
        className={cn(
          "w-full bg-white border border-gray-200 shadow-sm rounded-2xl px-5 py-4 text-[14px] font-black text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#18A14D] focus:ring-4 focus:ring-[#18A14D]/10 transition-all",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/10"
        )}
        {...props}
      />
      {error && <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-widest">{error}</p>}
    </div>
  );
}

export function AdminSelect({ label, error, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }) {
  return (
    <div className="space-y-2.5">
      {label && <label className="block text-[11px] font-black text-gray-500 uppercase tracking-[0.15em] leading-none ml-1">{label}</label>}
      <select 
        className={cn(
          "w-full bg-white border border-gray-200 shadow-sm rounded-2xl px-5 py-4 text-[14px] font-black text-gray-900 focus:outline-none focus:border-[#18A14D] focus:ring-4 focus:ring-[#18A14D]/10 transition-all appearance-none cursor-pointer",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/10"
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-widest">{error}</p>}
    </div>
  );
}

export function AdminTextarea({ label, error, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }) {
  return (
    <div className="space-y-2.5">
      {label && <label className="block text-[11px] font-black text-gray-500 uppercase tracking-[0.15em] leading-none ml-1">{label}</label>}
      <textarea 
        className={cn(
          "w-full bg-white border border-gray-200 shadow-sm rounded-2xl px-5 py-4 text-[14px] font-black text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#18A14D] focus:ring-4 focus:ring-[#18A14D]/10 transition-all min-h-[140px]",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/10"
        )}
        {...props}
      />
      {error && <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-widest">{error}</p>}
    </div>
  );
}

export function AdminBadge({ children, variant = 'info' }: { 
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}) {
  const variants = {
    success: 'bg-[#18A14D]/10 text-[#18A14D] border-[#18A14D]/20',
    warning: 'bg-amber-50 text-amber-600 border-amber-200/50',
    danger: 'bg-red-50 text-red-600 border-red-200/50',
    info: 'bg-blue-50 text-blue-600 border-blue-200/50',
    neutral: 'bg-gray-100 text-gray-600 border-gray-200'
  };

  return (
    <span className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border inline-flex items-center justify-center", variants[variant])}>
      {children}
    </span>
  );
}
