"use client";

import { useEffect } from "react";
import useSWR, { SWRConfiguration } from "swr";
import { useRouter } from "next/navigation";
import { fetcher, FetcherError } from "@/libs/fetcher";

/**
 * SWR hook with auth redirect handling
 * Does NOT call useAuth() to avoid duplicate /auth/me calls
 * Relies on 401 response to trigger redirect
 */
export function useSWRWithAuth<T = unknown>(
  endpoint: string | null,
  config?: SWRConfiguration
) {
  const router = useRouter();

  const swr = useSWR<T, FetcherError>(endpoint, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: true,
    ...config,
  });

  // Redirect on 401 Unauthorized
  useEffect(() => {
    if (swr.error?.status === 401) {
      router.replace("/admin/login");
    }
  }, [swr.error, router]);

  return swr;
}
