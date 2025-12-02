import { buildApiUrl } from '@/config/api';

/**
 * Client-side fetcher for SWR
 * Handles authentication and error formatting
 */

export interface FetcherError extends Error {
  status: number;
  info?: unknown;
}

function resolveEndpoint(endpoint: string) {
  if (endpoint.startsWith('http')) {
    return endpoint;
  }

  return buildApiUrl(endpoint);
}

async function parseJsonSafe(response: Response) {
  const text = await response.text();
  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

/**
 * SWR fetcher function
 * Automatically includes cookies and handles errors
 */
export async function fetcher<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = resolveEndpoint(endpoint);

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = new Error(
      `Failed to fetch: ${response.status} ${response.statusText}`
    ) as FetcherError;
    error.status = response.status;
    error.info = await parseJsonSafe(response);
    throw error;
  }

  const payload = await parseJsonSafe(response);
  return payload as T;
}

export async function postFetcher<T = unknown>(
  endpoint: string,
  data: unknown,
  options: RequestInit = {}
): Promise<T> {
  return fetcher<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function putFetcher<T = unknown>(
  endpoint: string,
  data: unknown,
  options: RequestInit = {}
): Promise<T> {
  return fetcher<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteFetcher<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  return fetcher<T>(endpoint, {
    ...options,
    method: 'DELETE',
  });
}

