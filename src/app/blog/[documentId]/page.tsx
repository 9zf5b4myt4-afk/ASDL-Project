import axios from 'axios';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dictionary, Language } from '../../../utils/translations';

interface BlogPost {
  id: number;
  documentId: string;
  Title: string;
  Content: any[]; // Rich Text
  publishedAt: string;
}

interface StrapiResponse {
  data: BlogPost;
  meta: any;
}

// Hardcoded Railway URL for stability
const STRAPI_URL = 'https://asdl-backend-production.up.railway.app';

const renderBlockText = (blocks: any[]) => {
  if (!blocks || !Array.isArray(blocks)) return "";
  
  return blocks.map((block, index) => {
    // 1. TEXT PARAGRAPHS & HEADINGS
    if (block.type === 'paragraph' || block.type === 'heading') {
      return (
        <p key={index} className="mb-6 text-gray-700 leading-relaxed text-lg">
          {block.children.map((child: any) => child.text).join('')}
        </p>
      );
    }
    
    // 2. LISTS
    if (block.type === 'list') {
      return (
        <ul key={index} className="list-disc pl-5 mb-6 space-y-2">
          {block.children.map((item: any, itemIndex: number) => (
            <li key={itemIndex}>
              {item.children.map((child: any) => child.text).join('')}
            </li>
          ))}
        </ul>
      );
    }

    // 3. QUOTES
    if (block.type === 'quote') {
       return (
         <blockquote key={index} className="border-l-4 border-senegal-500 pl-4 italic my-8 text-gray-600 bg-gray-50 py-4 pr-4 rounded-r-lg">
           {block.children.map((child: any) => child.text).join('')}
         </blockquote>
       )
    }

    // 4. IMAGES (The feature you asked for!)
    if (block.type === 'image') {
      const image = block.image;
      // Handle Strapi relative URLs
      const imageUrl = image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
      
      return (
        <div key={index} className="my-10">
          <img 
            src={imageUrl} 
            alt={image.alternativeText || "ASDL Blog Image"} 
            className="w-full h-auto rounded-xl shadow-md border border-gray-100 object-cover"
          />
          {image.caption && (
            <p className="text-center text-sm text-gray-500 mt-2 italic">
              {image.caption}
            </p>
          )}
        </div>
      );
    }

    return null;
  });
};

async function getPost(documentId: string, locale: string) {
  try {
    // We fetch with populate=* to get the images inside the blocks
    const response = await axios.get<StrapiResponse>(`${STRAPI_URL}/api/blog-posts/${documentId}?locale=${locale}&populate=*`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching Post:", error);
    return null;
  }
}

export default async function BlogPostPage({ 
  params, 
  searchParams 
}: { 
  params: { documentId: string }, 
  searchParams: { lang?: string } 
}) {
  const { documentId } = await params;
  const sp = await searchParams;
  const lang = (sp?.lang as Language) || 'fr';
  const t = dictionary[lang];
  
  const post = await getPost(documentId, lang);

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="container mx-auto max-w-3xl px-4">
           <Link href={`/blog?lang=${lang}`} className="text-senegal-600 hover:text-senegal-800 text-sm font-bold uppercase tracking-wide flex items-center gap-2 mb-6">
             &larr; {t.blog.backToBlog}
           </Link>
           <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
             {post.Title}
           </h1>
           <div className="flex items-center gap-4 text-gray-500 text-sm">
             <span>{t.blog.publishedOn} {new Date(post.publishedAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', { dateStyle: 'long' })}</span>
             <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
             <span className="text-senegal-600 font-medium">ASDL News</span>
           </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
          {/* This renders text -> image -> text -> image exactly as you want */}
          <div className="prose prose-lg max-w-none prose-green prose-img:rounded-xl">
            {renderBlockText(post.Content)}
          </div>
        </div>
      </div>
    </main>
  );
}