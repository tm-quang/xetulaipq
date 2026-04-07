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
    <div className={cn("bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all", className)}>
      {(title || extra) && (
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between gap-4">
          <div>
            {title && <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight leading-none">{title}</h2>}
            {subtitle && <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest leading-none">{subtitle}</p>}
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
    <div className="overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4 whitespace-nowrap">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-[13px] font-bold text-gray-600 relative">
          {loading ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-[#18A14D]/20 border-t-[#18A14D] rounded-full animate-spin" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Đang tải dữ liệu...</span>
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
    primary: 'bg-[#18A14D] text-white shadow-lg shadow-[#18A14D]/20 hover:bg-[#158c42] hover:shadow-[#18A14D]/30',
    secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    danger: 'bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600',
    ghost: 'bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-900',
    outline: 'bg-white border border-gray-200 text-gray-600 hover:border-[#18A14D] hover:text-[#18A14D] hover:shadow-md'
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-[11px]',
    lg: 'px-8 py-4 text-xs',
    icon: 'w-10 h-10 flex items-center justify-center p-0'
  };

  return (
    <button 
      className={cn(
        "rounded-xl font-black uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed leading-none inline-flex items-center justify-center gap-2",
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
    <div className="space-y-2">
      {label && <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none ml-1">{label}</label>}
      <input 
        className={cn(
          "w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#18A14D] focus:bg-white focus:shadow-md transition-all",
          error && "border-red-500 focus:border-red-500"
        )}
        {...props}
      />
      {error && <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-widest">{error}</p>}
    </div>
  );
}

export function AdminSelect({ label, error, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none ml-1">{label}</label>}
      <select 
        className={cn(
          "w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#18A14D] focus:bg-white focus:shadow-md transition-all appearance-none cursor-pointer",
          error && "border-red-500 focus:border-red-500"
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
    <div className="space-y-2">
      {label && <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none ml-1">{label}</label>}
      <textarea 
        className={cn(
          "w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#18A14D] focus:bg-white focus:shadow-md transition-all min-h-[120px]",
          error && "border-red-500 focus:border-red-500"
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
    success: 'bg-green-50 text-green-600 border-green-100',
    warning: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    danger: 'bg-red-50 text-red-600 border-red-100',
    info: 'bg-blue-50 text-blue-600 border-blue-100',
    neutral: 'bg-gray-50 text-gray-600 border-gray-100'
  };

  return (
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border", variants[variant])}>
      {children}
    </span>
  );
}
