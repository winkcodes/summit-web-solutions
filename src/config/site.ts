export const SITE_CONFIG = {
  title: 'Summit Web Solutions',
  description: 'Professional Web Development & Digital Marketing Services - Elevate your online presence with custom websites, SEO optimization, and digital marketing strategies.',
  url: 'https://summitweb.solutions',
  author: 'Summit Web Solutions',
  keywords: [
    'web development',
    'digital marketing',
    'SEO optimization',
    'responsive design',
    'custom websites',
    'e-commerce',
    'React development',
    'TypeScript',
    'modern web solutions'
  ],
  lang: 'en-US',
  locale: 'en_US',
  image: '/og-image.jpg',
  favicon: '/favicon.svg',
  themeColor: '#0f172a',
  social: {
    twitter: '@summitweb',
    linkedin: 'summit-web-solutions',
    github: 'summit-web-solutions',
    email: 'contact@summitweb.solutions',
  },
  analytics: {
    gtag: process.env.GOOGLE_ANALYTICS_ID || '',
  },
  features: {
    darkMode: true,
    blog: true,
    contact: true,
    portfolio: true,
  },
} as const;

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
] as const;

export const SERVICES = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom websites built with modern technologies and best practices.',
    icon: 'Code',
    features: ['Responsive Design', 'Performance Optimization', 'SEO Ready', 'Modern Stack'],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to grow your online presence.',
    icon: 'TrendingUp',
    features: ['SEO Optimization', 'Content Strategy', 'Social Media', 'Analytics'],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Solutions',
    description: 'Complete e-commerce platforms to sell your products online.',
    icon: 'ShoppingCart',
    features: ['Payment Integration', 'Inventory Management', 'Mobile Optimized', 'Security'],
  },
] as const;