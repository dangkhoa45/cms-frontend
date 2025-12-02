import { apiRoutes, buildApiUrl, QueryParams } from "@/config/api";
import type {
  ApiResponse,
  PaginatedResponse,
  Product,
  ProductListQuery,
  Post,
  PostListQuery,
  Site,
  User,
  LoginDto,
  LoginResponseDto,
  CreateProductDto,
  UpdateProductDto,
  Service,
  Header,
  SeoSetting,
  ContactSetting,
  ContactMessage,
} from "@/types/api";

export class BackendApiError extends Error {
  status: number;
  payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

interface BackendRequestOptions extends Omit<RequestInit, "body"> {
  body?: RequestInit["body"] | Record<string, unknown> | unknown;
  cookies?: string;
  query?: QueryParams;
  skipJsonParsing?: boolean;
}

function buildUrlWithQuery(path: string, query?: QueryParams) {
  const url = new URL(buildApiUrl(path));

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }

      const appendValue = (val: string | number | boolean) => {
        url.searchParams.append(key, String(val));
      };

      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item !== undefined && item !== null) {
            appendValue(item);
          }
        });
      } else {
        appendValue(value);
      }
    });
  }

  return url.toString();
}

function prepareBody(body?: BodyInit | null | unknown) {
  if (!body || body instanceof FormData || body instanceof Blob) {
    return body as BodyInit | null | undefined;
  }

  if (typeof body === "string") {
    return body;
  }

  return JSON.stringify(body);
}

async function parseResponse<T>(
  response: Response,
  skipJsonParsing?: boolean
): Promise<T> {
  if (skipJsonParsing || response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

export async function backendRequest<T>(
  path: string,
  options: BackendRequestOptions = {}
): Promise<T> {
  const { cookies, query, headers, body, skipJsonParsing, ...rest } = options;
  const url = buildUrlWithQuery(path, query);

  const nextHeaders = new Headers({
    Accept: "application/json",
    ...headers,
  });

  const preparedBody = prepareBody(body);

  if (
    preparedBody &&
    !(preparedBody instanceof FormData) &&
    !nextHeaders.has("Content-Type")
  ) {
    nextHeaders.set("Content-Type", "application/json");
  }

  if (cookies) {
    nextHeaders.set("Cookie", cookies);
  }

  const response = await fetch(url, {
    ...rest,
    body: preparedBody,
    headers: nextHeaders,
    credentials: "include",
    cache: rest.cache ?? "no-store",
  });

  if (!response.ok) {
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      payload = undefined;
    }

    const message =
      (payload as ApiResponse<unknown>)?.message ||
      response.statusText ||
      "API request failed";

    throw new BackendApiError(message, response.status, payload);
  }

  return parseResponse<T>(response, skipJsonParsing);
}

export const backendApi = {
  auth: {
    login: (payload: LoginDto) =>
      backendRequest<LoginResponseDto>(apiRoutes.auth.login, {
        method: "POST",
        body: payload,
      }),
    me: (cookies?: string) =>
      backendRequest<User>(apiRoutes.auth.me, {
        method: "GET",
        cookies,
      }),
    logout: (cookies?: string) =>
      backendRequest<void>(apiRoutes.auth.logout, {
        method: "POST",
        cookies,
        skipJsonParsing: true,
      }),
  },
  admin: {
    products: {
      list: (query?: ProductListQuery, cookies?: string) =>
        backendRequest<PaginatedResponse<Product>>(
          apiRoutes.admin.products.list,
          {
            method: "GET",
            query: query as QueryParams | undefined,
            cookies,
          }
        ),
      detail: (id: string, cookies?: string) =>
        backendRequest<Product>(apiRoutes.admin.products.detail(id), {
          method: "GET",
          cookies,
        }),
      create: (payload: CreateProductDto, cookies?: string) =>
        backendRequest<ApiResponse<Product>>(apiRoutes.admin.products.list, {
          method: "POST",
          body: payload,
          cookies,
        }),
      update: (id: string, payload: UpdateProductDto, cookies?: string) =>
        backendRequest<ApiResponse<Product>>(
          apiRoutes.admin.products.detail(id),
          {
            method: "PATCH",
            body: payload,
            cookies,
          }
        ),
      remove: (id: string, cookies?: string) =>
        backendRequest<void>(apiRoutes.admin.products.detail(id), {
          method: "DELETE",
          cookies,
          skipJsonParsing: true,
        }),
    },
    posts: {
      list: (query?: PostListQuery, cookies?: string) =>
        backendRequest<PaginatedResponse<Post>>(apiRoutes.admin.posts.list, {
          method: "GET",
          query: query as QueryParams | undefined,
          cookies,
        }),
      detail: (id: string, cookies?: string) =>
        backendRequest<Post>(apiRoutes.admin.posts.detail(id), {
          method: "GET",
          cookies,
        }),
      create: (payload: any, cookies?: string) =>
        backendRequest<ApiResponse<Post>>(apiRoutes.admin.posts.list, {
          method: "POST",
          body: payload,
          cookies,
        }),
      update: (id: string, payload: any, cookies?: string) =>
        backendRequest<ApiResponse<Post>>(apiRoutes.admin.posts.detail(id), {
          method: "PATCH",
          body: payload,
          cookies,
        }),
      remove: (id: string, cookies?: string) =>
        backendRequest<void>(apiRoutes.admin.posts.detail(id), {
          method: "DELETE",
          cookies,
          skipJsonParsing: true,
        }),
    },
    services: {
      list: (query?: any, cookies?: string) =>
        backendRequest<PaginatedResponse<Service>>(
          apiRoutes.admin.services.list,
          {
            method: "GET",
            query: query as QueryParams | undefined,
            cookies,
          }
        ),
      detail: (id: string, cookies?: string) =>
        backendRequest<Service>(apiRoutes.admin.services.detail(id), {
          method: "GET",
          cookies,
        }),
      create: (payload: any, cookies?: string) =>
        backendRequest<ApiResponse<Service>>(apiRoutes.admin.services.list, {
          method: "POST",
          body: payload,
          cookies,
        }),
      update: (id: string, payload: any, cookies?: string) =>
        backendRequest<ApiResponse<Service>>(
          apiRoutes.admin.services.detail(id),
          {
            method: "PATCH",
            body: payload,
            cookies,
          }
        ),
      remove: (id: string, cookies?: string) =>
        backendRequest<void>(apiRoutes.admin.services.detail(id), {
          method: "DELETE",
          cookies,
          skipJsonParsing: true,
        }),
    },
    headers: {
      list: (query?: any, cookies?: string) =>
        backendRequest<PaginatedResponse<Header>>(
          apiRoutes.admin.headers.list,
          {
            method: "GET",
            query: query as QueryParams | undefined,
            cookies,
          }
        ),
      detail: (id: string, cookies?: string) =>
        backendRequest<Header>(apiRoutes.admin.headers.detail(id), {
          method: "GET",
          cookies,
        }),
      create: (payload: any, cookies?: string) =>
        backendRequest<ApiResponse<Header>>(apiRoutes.admin.headers.list, {
          method: "POST",
          body: payload,
          cookies,
        }),
      update: (id: string, payload: any, cookies?: string) =>
        backendRequest<ApiResponse<Header>>(
          apiRoutes.admin.headers.detail(id),
          {
            method: "PATCH",
            body: payload,
            cookies,
          }
        ),
      remove: (id: string, cookies?: string) =>
        backendRequest<void>(apiRoutes.admin.headers.detail(id), {
          method: "DELETE",
          cookies,
          skipJsonParsing: true,
        }),
    },
    seo: {
      list: (query?: any, cookies?: string) =>
        backendRequest<PaginatedResponse<SeoSetting>>(
          apiRoutes.admin.seo.list,
          {
            method: "GET",
            query: query as QueryParams | undefined,
            cookies,
          }
        ),
      detail: (id: string, cookies?: string) =>
        backendRequest<SeoSetting>(apiRoutes.admin.seo.detail(id), {
          method: "GET",
          cookies,
        }),
      create: (payload: any, cookies?: string) =>
        backendRequest<ApiResponse<SeoSetting>>(apiRoutes.admin.seo.list, {
          method: "POST",
          body: payload,
          cookies,
        }),
      update: (id: string, payload: any, cookies?: string) =>
        backendRequest<ApiResponse<SeoSetting>>(
          apiRoutes.admin.seo.detail(id),
          {
            method: "PATCH",
            body: payload,
            cookies,
          }
        ),
      remove: (id: string, cookies?: string) =>
        backendRequest<void>(apiRoutes.admin.seo.detail(id), {
          method: "DELETE",
          cookies,
          skipJsonParsing: true,
        }),
    },
    contactSettings: {
      list: (query?: any, cookies?: string) =>
        backendRequest<PaginatedResponse<ContactSetting>>(
          apiRoutes.admin.contactSettings.list,
          {
            method: "GET",
            query: query as QueryParams | undefined,
            cookies,
          }
        ),
      detail: (id: string, cookies?: string) =>
        backendRequest<ContactSetting>(
          apiRoutes.admin.contactSettings.detail(id),
          {
            method: "GET",
            cookies,
          }
        ),
      create: (payload: any, cookies?: string) =>
        backendRequest<ApiResponse<ContactSetting>>(
          apiRoutes.admin.contactSettings.list,
          {
            method: "POST",
            body: payload,
            cookies,
          }
        ),
      update: (id: string, payload: any, cookies?: string) =>
        backendRequest<ApiResponse<ContactSetting>>(
          apiRoutes.admin.contactSettings.detail(id),
          {
            method: "PATCH",
            body: payload,
            cookies,
          }
        ),
      remove: (id: string, cookies?: string) =>
        backendRequest<void>(apiRoutes.admin.contactSettings.detail(id), {
          method: "DELETE",
          cookies,
          skipJsonParsing: true,
        }),
    },
    contactMessages: {
      list: (query?: any, cookies?: string) =>
        backendRequest<PaginatedResponse<ContactMessage>>(
          apiRoutes.admin.contactMessages.list,
          {
            method: "GET",
            query: query as QueryParams | undefined,
            cookies,
          }
        ),
      detail: (id: string, cookies?: string) =>
        backendRequest<ContactMessage>(
          apiRoutes.admin.contactMessages.detail(id),
          {
            method: "GET",
            cookies,
          }
        ),
      create: (payload: any, cookies?: string) =>
        backendRequest<ApiResponse<ContactMessage>>(
          apiRoutes.admin.contactMessages.list,
          {
            method: "POST",
            body: payload,
            cookies,
          }
        ),
      update: (id: string, payload: any, cookies?: string) =>
        backendRequest<ApiResponse<ContactMessage>>(
          apiRoutes.admin.contactMessages.detail(id),
          {
            method: "PATCH",
            body: payload,
            cookies,
          }
        ),
      remove: (id: string, cookies?: string) =>
        backendRequest<void>(apiRoutes.admin.contactMessages.detail(id), {
          method: "DELETE",
          cookies,
          skipJsonParsing: true,
        }),
    },
    sites: {
      list: (cookies?: string) =>
        backendRequest<ApiResponse<Site[]>>(apiRoutes.admin.sites.list, {
          method: "GET",
          cookies,
        }),
      detail: (id: string, cookies?: string) =>
        backendRequest<Site>(apiRoutes.admin.sites.detail(id), {
          method: "GET",
          cookies,
        }),
      create: (payload: any, cookies?: string) =>
        backendRequest<ApiResponse<Site>>(apiRoutes.admin.sites.list, {
          method: "POST",
          body: payload,
          cookies,
        }),
      update: (id: string, payload: any, cookies?: string) =>
        backendRequest<ApiResponse<Site>>(apiRoutes.admin.sites.detail(id), {
          method: "PATCH",
          body: payload,
          cookies,
        }),
      remove: (id: string, cookies?: string) =>
        backendRequest<void>(apiRoutes.admin.sites.detail(id), {
          method: "DELETE",
          cookies,
          skipJsonParsing: true,
        }),
    },
  },
  public: {
    products: {
      list: (siteId: string, query?: ProductListQuery, cookies?: string) =>
        backendRequest<PaginatedResponse<Product>>(
          apiRoutes.public.products(siteId),
          {
            method: "GET",
            query: query as QueryParams | undefined,
            cookies,
          }
        ),
      detail: (siteId: string, productId: string, cookies?: string) =>
        backendRequest<Product>(
          apiRoutes.public.productDetail(siteId, productId),
          {
            method: "GET",
            cookies,
          }
        ),
    },
    posts: {
      list: (siteId: string, query?: PostListQuery, cookies?: string) =>
        backendRequest<PaginatedResponse<Post>>(
          apiRoutes.public.posts(siteId),
          {
            method: "GET",
            query: query as QueryParams | undefined,
            cookies,
          }
        ),
      detail: (siteId: string, postId: string, cookies?: string) =>
        backendRequest<Post>(apiRoutes.public.postDetail(siteId, postId), {
          method: "GET",
          cookies,
        }),
    },
    services: {
      list: (siteId: string, query?: any, cookies?: string) =>
        backendRequest<PaginatedResponse<Service>>(
          apiRoutes.public.services(siteId),
          {
            method: "GET",
            query: query as QueryParams | undefined,
            cookies,
          }
        ),
      detail: (siteId: string, serviceId: string, cookies?: string) =>
        backendRequest<Service>(
          apiRoutes.public.serviceDetail(siteId, serviceId),
          {
            method: "GET",
            cookies,
          }
        ),
    },
    headers: {
      list: (siteId: string, cookies?: string) =>
        backendRequest<Header[]>(apiRoutes.public.headers(siteId), {
          method: "GET",
          cookies,
        }),
    },
    seo: {
      get: (siteId: string, cookies?: string) =>
        backendRequest<SeoSetting>(apiRoutes.public.seo(siteId), {
          method: "GET",
          cookies,
        }),
    },
    contactSettings: {
      get: (siteId: string, cookies?: string) =>
        backendRequest<ContactSetting>(
          apiRoutes.public.contactSettings(siteId),
          {
            method: "GET",
            cookies,
          }
        ),
    },
    contactMessages: {
      list: (siteId: string, query?: any, cookies?: string) =>
        backendRequest<PaginatedResponse<ContactMessage>>(
          apiRoutes.public.contactMessages(siteId),
          {
            method: "GET",
            query: query as QueryParams | undefined,
            cookies,
          }
        ),
      create: (siteId: string, payload: any, cookies?: string) =>
        backendRequest<ApiResponse<ContactMessage>>(
          apiRoutes.public.contactMessages(siteId),
          {
            method: "POST",
            body: payload,
            cookies,
          }
        ),
    },
  },
};

export async function getSiteBySlug(
  slug: string,
  cookies?: string
): Promise<Site> {
  return backendRequest<Site>(apiRoutes.sites.bySlug(slug), {
    method: "GET",
    cookies,
  });
}

export async function getCurrentUser(cookies?: string): Promise<User | null> {
  try {
    return await backendApi.auth.me(cookies);
  } catch {
    return null;
  }
}
