import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Example of blocking a folder
    },
    sitemap: 'https://www.asdl-senegal.org/sitemap.xml',
  };
}