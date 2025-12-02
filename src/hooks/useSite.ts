'use client';

import useSWR from 'swr';
import { fetcher } from '@/libs/fetcher';
import type { Site } from '@/types/api';
import { apiRoutes } from '@/config/api';

export function useSite(siteId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Site>(
    siteId ? apiRoutes.admin.sites.detail(siteId) : null,
    fetcher
  );

  return {
    site: data,
    isLoading,
    error,
    mutate,
  };
}

