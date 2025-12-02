"use client";

import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import type { User } from "@/types/api";

interface UseAuthOptions {
  /**
   * Set to true to prevent auto-fetching /auth/me
   * Useful for public pages or login page
   */
  skip?: boolean;
}

export function useAuth(options?: UseAuthOptions) {
  const { skip = false } = options || {};

  const { data, error, isLoading, mutate } = useSWR<User>(
    skip ? null : "/auth/me",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  return {
    user: data ?? null,
    isLoading: skip ? false : isLoading,
    isAuthenticated: skip ? false : !!data && !error,
    error: skip ? null : error,
    mutate,
  };
}
