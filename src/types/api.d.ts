import type {
  SiteFooter,
  SiteHeader,
  SiteTheme as SiteThemeConfig,
} from './site';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  details?: unknown;
}

export type UserRole = 'superadmin' | 'admin' | 'editor';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  siteIds: string[];
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  data: {
    accessToken: string;
    user: User;
  };
}

export interface Site {
  id: string;
  slug: string;
  name: string;
  domain?: string;
  template: string;
  theme: SiteThemeConfig;
  config?: {
    header?: SiteHeader;
    footer?: SiteFooter;
    [key: string]: unknown;
  };
  createdAt: string;
  updatedAt: string;
}

export type ProductStatus = 'draft' | 'published';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  status: ProductStatus;
  siteId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  status?: ProductStatus;
  categoryId?: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  images: string[];
  siteId: string;
  status?: ProductStatus;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export type PostStatus = 'draft' | 'published';
export type PostType = 'news' | 'blog';

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  type?: PostType;
  status: PostStatus;
  siteId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostListQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  type?: PostType;
  status?: PostStatus;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  siteId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Header {
  id: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaLink?: string;
  mediaUrl?: string;
  siteId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeoSetting {
  id: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  siteId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactSetting {
  id: string;
  siteId: string;
  email?: string;
  phone?: string;
  address?: string;
  workingHours?: string;
  createdAt: string;
  updatedAt: string;
}

export type ContactMessageStatus = 'new' | 'read' | 'resolved';

export interface ContactMessage {
  id: string;
  siteId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: ContactMessageStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactMessageDto {
  name: string;
  email: string;
  phone?: string;
  message: string;
  status?: ContactMessageStatus;
}
