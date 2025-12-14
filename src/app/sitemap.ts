import { MetadataRoute } from 'next';
import axios from 'axios';

const BASE_URL = 'https://www.asdl-senegal.org';
const STRAPI_URL = 'https://asdl-backend-production.up.railway.app';

// Helper to fetch IDs from Strapi
async function fetchIds(endpoint: string) {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/${endpoint}?fields[0]=documentId`);
    return response.data.data || [];
  } catch (error) {
    console.error(`Error fetching sitemap data for ${endpoint}:`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Pages
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Fetch Dynamic Data from Strapi
  const [axes, projects, posts] = await Promise.all([
    fetchIds('strategic-axes'),
    fetchIds('project-actions'),
    fetchIds('blog-posts'),
  ]);

  // 3. Build Dynamic Routes
  const axisRoutes = axes.map((item: any) => ({
    url: `${BASE_URL}/axis/${item.documentId}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // (If you eventually make a dedicated detail page for projects, un-comment this)
  // const projectRoutes = projects.map((item: any) => ({
  //   url: `${BASE_URL}/projects/${item.documentId}`,
  //   lastModified: new Date(),
  //   priority: 0.6,
  // }));

  const blogRoutes = posts.map((item: any) => ({
    url: `${BASE_URL}/blog/${item.documentId}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // High priority for news
  }));

  return [...staticRoutes, ...axisRoutes, ...blogRoutes];
}