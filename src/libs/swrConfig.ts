/**
 * SWR global configuration
 */
import { SWRConfiguration } from 'swr';
import { fetcher } from './fetcher';

export const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  shouldRetryOnError: true,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  dedupingInterval: 2000,
};

