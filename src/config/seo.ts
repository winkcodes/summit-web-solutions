import { SITE_CONFIG } from './site';

export interface SEOConfig {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  type?: 'website' | 'article' | 'product';
  schema?: Record<string, any>;
}

export function generateSEO(config: SEOConfig = {}) {
  const {
    title = SITE_CONFIG.title,
    description = SITE_CONFIG.description,
    image = SITE_CONFIG.url + SITE_CONFIG.image,
    canonical = SITE_CONFIG.url,
    noindex = false,
    nofollow = false,
    type = 'website',
    schema = {},
  } = config;

  const fullTitle = title === SITE_CONFIG.title ? title : `${title} | ${SITE_CONFIG.title}`;

  return {
    title: fullTitle,
    description,
    canonical,
    image,
    noindex,
    nofollow,
    openGraph: {
      title: fullTitle,
      description,
      type,
      image,
      url: canonical,
      siteName: SITE_CONFIG.title,
      locale: SITE_CONFIG.locale,
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.social.twitter,
      creator: SITE_CONFIG.social.twitter,
      title: fullTitle,
      description,
      image,
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': type === 'website' ? 'WebSite' : 'Article',
      name: fullTitle,
      description,
      url: canonical,
      image,
      author: {
        '@type': 'Organization',
        name: SITE_CONFIG.author,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_CONFIG.author,
        logo: {
          '@type': 'ImageObject',
          url: SITE_CONFIG.url + '/logo.png',
        },
      },
      ...schema,
    },
  };
}

export const DEFAULT_SEO = generateSEO();