const DEFAULT_API_URL = "http://localhost:8080";

const explicitApiUrl =
  process.env.NEXT_PUBLIC_API_URL?.trim() || process.env.API_URL?.trim() || "";

const candidateApiUrl = explicitApiUrl || DEFAULT_API_URL;

let resolvedBaseUrl: string;
try {
  const parsed = new URL(candidateApiUrl);
  resolvedBaseUrl = parsed.origin;
} catch (error) {
  throw new Error(
    `[config] Invalid API URL "${candidateApiUrl}". Please set NEXT_PUBLIC_API_URL in .env.local to a valid URL.`
  );
}

if (!explicitApiUrl) {
  console.warn(
    "[config] NEXT_PUBLIC_API_URL is not defined. Falling back to default API URL for development. Set NEXT_PUBLIC_API_URL in .env.local to silence this warning."
  );
}

const timeoutFromEnv =
  Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? process.env.API_TIMEOUT) ||
  15000;

export const apiConfig = {
  baseUrl: resolvedBaseUrl.replace(/\/$/, ""),
  timeoutMs: Number.isFinite(timeoutFromEnv) ? timeoutFromEnv : 15000,
  testCredentials: {
    email: process.env.API_TEST_EMAIL?.trim() || "",
    password: process.env.API_TEST_PASSWORD?.trim() || "",
  },
};

const withAdminPrefix = (path: string) => `/api/admin/${path}`;
const withPublicPrefix = (path: string) => `/api/public/${path}`;

export const apiRoutes = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  admin: {
    users: {
      list: withAdminPrefix("users"),
      detail: (id: string) => withAdminPrefix(`users/${id}`),
    },
    sites: {
      list: withAdminPrefix("sites"),
      detail: (id: string) => withAdminPrefix(`sites/${id}`),
    },
    headers: {
      list: withAdminPrefix("headers"),
      detail: (id: string) => withAdminPrefix(`headers/${id}`),
    },
    seo: {
      list: withAdminPrefix("seo"),
      detail: (id: string) => withAdminPrefix(`seo/${id}`),
    },
    products: {
      list: withAdminPrefix("products"),
      detail: (id: string) => withAdminPrefix(`products/${id}`),
    },
    services: {
      list: withAdminPrefix("services"),
      detail: (id: string) => withAdminPrefix(`services/${id}`),
    },
    posts: {
      list: withAdminPrefix("posts"),
      detail: (id: string) => withAdminPrefix(`posts/${id}`),
    },
    contactSettings: {
      list: withAdminPrefix("contact-settings"),
      detail: (id: string) => withAdminPrefix(`contact-settings/${id}`),
    },
    contactMessages: {
      list: withAdminPrefix("contact-messages"),
      detail: (id: string) => withAdminPrefix(`contact-messages/${id}`),
    },
  },
  public: {
    headers: (siteId: string) => withPublicPrefix(`sites/${siteId}/headers`),
    seo: (siteId: string) => withPublicPrefix(`sites/${siteId}/seo`),
    products: (siteId: string) => withPublicPrefix(`sites/${siteId}/products`),
    productDetail: (siteId: string, productId: string) =>
      withPublicPrefix(`sites/${siteId}/products/${productId}`),
    services: (siteId: string) => withPublicPrefix(`sites/${siteId}/services`),
    serviceDetail: (siteId: string, serviceId: string) =>
      withPublicPrefix(`sites/${siteId}/services/${serviceId}`),
    posts: (siteId: string) => withPublicPrefix(`sites/${siteId}/posts`),
    postDetail: (siteId: string, postId: string) =>
      withPublicPrefix(`sites/${siteId}/posts/${postId}`),
    contactSettings: (siteId: string) =>
      withPublicPrefix(`sites/${siteId}/contact-settings`),
    contactMessages: (siteId: string) =>
      withPublicPrefix(`sites/${siteId}/contact-messages`),
  },
  sites: {
    bySlug: (slug: string) => `/api/sites/slug/${slug}`,
  },
} as const;

export type QueryParamValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryParamValue | QueryParamValue[]>;

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${apiConfig.baseUrl}${normalizedPath}`;
}

export function ensureTestCredentials() {
  const { email, password } = apiConfig.testCredentials;

  if (!email || !password) {
    throw new Error(
      "Missing API test credentials. Please set API_TEST_EMAIL and API_TEST_PASSWORD in .env.local."
    );
  }

  return { email, password };
}

export function resolveCookieHeader(rawCookie?: string | null) {
  return rawCookie?.trim() || undefined;
}
