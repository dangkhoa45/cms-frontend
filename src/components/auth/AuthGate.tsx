"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/feedback/Loading";

interface AuthGateProps {
  children: React.ReactNode;
}

/**
 * AuthGate - Client component for authentication protection
 *
 * CRITICAL RULES:
 * 1. This is a CLIENT component - never import in server components
 * 2. Skip auth check for /admin/login to prevent unnecessary API calls
 * 3. Always call useAuth() unconditionally - use skip parameter instead
 * 4. Redirect to login if not authenticated
 */
export function AuthGate({ children }: AuthGateProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine if we should skip auth check (login page)
  const isLoginRoute = pathname === "/admin/login";

  // CRITICAL: Always call useAuth with same hook order
  // Pass skip=true for login route to prevent /auth/me call
  const { isAuthenticated, isLoading, user } = useAuth({ skip: isLoginRoute });

  // Redirect to login if not authenticated (but not on login page)
  useEffect(() => {
    if (!isLoginRoute && !isLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isLoginRoute, isAuthenticated, isLoading, router]);

  // Don't check auth on login page
  if (isLoginRoute) {
    return <>{children}</>;
  }

  // Show loading while checking auth
  if (isLoading) {
    return <Loading fullScreen message="Đang kiểm tra xác thực..." />;
  }

  // Don't render if not authenticated (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  // Render children for authenticated users
  return <>{children}</>;
}
