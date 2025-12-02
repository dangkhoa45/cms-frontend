// Site-specific types
export interface SiteConfig {
  id: string;
  slug: string;
  name: string;
  template: string;
  theme: SiteTheme;
  seo?: SiteSEO;
  header?: SiteHeader;
  footer?: SiteFooter;
}

export interface SiteTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor?: string;
  fontFamily?: string;
}

export interface SiteSEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface SiteHeader {
  logo?: string;
  menuItems?: MenuItem[];
  showSearch?: boolean;
}

export interface SiteFooter {
  copyright?: string;
  links?: MenuItem[];
  socialLinks?: SocialLink[];
}

export interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

