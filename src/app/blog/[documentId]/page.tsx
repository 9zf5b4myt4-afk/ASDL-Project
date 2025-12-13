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

const renderBlockText = (blocks: any[]) => {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks.map((block, index) => {
    if (block.type === 'paragraph' || block.type === 'heading') {
      return (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {block.children.map((child: any) => child.text).join('')}
        </p>
      );
    }
    if (block.type === 'list') {
      return (
        <ul key={index} className="list-disc pl-5 mb-4 space-y-2">
          {block.children.map((item: any, itemIndex: number) => (
            <li key={itemIndex}>
              {item.children.map((child: any) => child.text).join('')}
            </li>
          ))}
        </ul>
      );
    }
    // Simple quote handling if needed
    if (block.type === 'quote') {
       return (
         <blockquote key={index} className="border-l-4 border-senegal-500 pl-4 italic my-6 text-gray-600">
           {block.children.map((child: any) => child.text).join('')}
         </blockquote>
       )
    }
    return null;
  });
};

async function getPost(documentId: string, locale: string) {
  try {
    const apiUrl = 'https://asdl-backend-production.up.railway.app';
    const response = await axios.get<StrapiResponse>(`${apiUrl}/api/blog-posts/${documentId}?locale=${locale}`);
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
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="container mx-auto max-w-3xl px-4">
           <Link href={`/blog?lang=${lang}`} className="text-senegal-600 hover:text-senegal-800 text-sm font-bold uppercase tracking-wide flex items-center gap-2 mb-4">
             &larr; {t.blog.backToBlog}
           </Link>
           <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
             {post.Title}
           </h1>
           <p className="text-gray-500 text-sm">
             {t.blog.publishedOn} {new Date(post.publishedAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', { dateStyle: 'long' })}
           </p>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="prose prose-lg max-w-none prose-green">
            {renderBlockText(post.Content)}
          </div>
        </div>
      </div>
    </main>
  );
}