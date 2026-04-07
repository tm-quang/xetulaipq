"use client";

import { usePathname } from "next/navigation";
import AdminShell from "./AdminShell";

export default function RootAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't wrap the login page in the AdminShell
  if (pathname === "/admin" || pathname === "/admin/") {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}
