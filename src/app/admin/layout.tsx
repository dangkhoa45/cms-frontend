import { ThemeProviderWrapper } from "@/themes/ThemeProviderWrapper";
import { AuthGate } from "@/components/auth/AuthGate";
import { AdminLayoutContent } from "@/components/admin/AdminLayoutContent";
import type { ReactNode } from "react";

/**
 * Admin Layout - SERVER COMPONENT
 *
 * CRITICAL RULES:
 * 1. This is a SERVER component - NO "use client" directive
 * 2. NO hooks allowed here (useState, useEffect, useAuth, etc.)
 * 3. AuthGate handles all client-side auth logic
 * 4. AdminLayoutContent handles UI rendering logic
 * 5. This layout wraps ALL admin routes including /admin/login
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProviderWrapper isAdmin={true}>
      <AuthGate>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AuthGate>
    </ThemeProviderWrapper>
  );
}
