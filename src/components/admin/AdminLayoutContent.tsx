"use client";

import { Box, Toolbar } from "@mui/material";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import type { ReactNode } from "react";

interface AdminLayoutContentProps {
  children: ReactNode;
}

/**
 * AdminLayoutContent - Client component for admin UI layout
 *
 * RULES:
 * 1. Only renders admin UI (sidebar, topbar) for non-login routes
 * 2. Passes user data to child components
 * 3. Called from server layout after AuthGate
 */
export function AdminLayoutContent({ children }: AdminLayoutContentProps) {
  const pathname = usePathname();
  const isLoginRoute = pathname === "/admin/login";

  // Get user data - safe to call here because AuthGate ensures we're authenticated
  const { user } = useAuth({ skip: isLoginRoute });

  // Login page: just render children without admin chrome
  if (isLoginRoute) {
    return <>{children}</>;
  }

  // Admin pages: render with sidebar and topbar
  return (
    <Box sx={{ display: "flex" }}>
      <AdminTopbar user={user} />
      <AdminSidebar user={user} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 260px)` },
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
