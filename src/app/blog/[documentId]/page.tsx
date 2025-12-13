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

const STRAPI_URL = 'https://asdl-backend-production.up.railway.app';

// 1. New Helper: Render individual child nodes (Text, Bold, Links)
const renderChildren = (children: any[]) => {
  return children.map((child: any, index: number) => {
    // Handle Text with Bold/Italic/Underline
    if (child.type === 'text') {
      let text = <>{child.text}</>;
      if (child.bold) text = <strong>{text}</strong>;
      if (child.italic) text = <em>{text}</em>;
      if (child.underline) text = <u>{text}</u>;
      if (child.strikethrough) text = <s>{text}</s>;
      return <span key={index}>{text}</span>;
    }
    
    // Handle Links
    if (child.type === 'link') {
      return (
        <a 
          key={index} 
          href={child.url} 
          className="text-senegal-600 hover:text-senegal-800 underline font-medium"
          target="_blank" 
          rel="noopener noreferrer"
        >
          {renderChildren(child.children)}
        </a>
      );
    }
    return null;
  });
};

// 2. Main Block Renderer
const renderBlockText = (blocks: any[]) => {
  if (!blocks || !Array.isArray(blocks)) return "";
  
  return blocks.map((block, index) => {
    
    // --- SPECIAL FEATURE: AUTO-DETECT IMAGE LINKS ---
    if (block.type === 'paragraph' && block.children.length === 1) {
      const child = block.children[0];
      const text = child.text || child.url; 
      if (text && (text.includes('.jpg') || text.includes('.png') || text.includes('.jpeg') || text.includes('.webp'))) {
         const imageUrl = child.url || child.text; 
         return (
            <div key={index} className="my-10">
              <img 
                src={imageUrl} 
                alt="Article Image" 
                className="w-full h-auto rounded-xl shadow-md border border-gray-100 object-cover"
              />
            </div>
         );
      }
    }

    // 1. STANDARD PARAGRAPHS
    if (block.type === 'paragraph') {
      return (
        <div key={index} className="mb-6 text-gray-700 leading-relaxed text-lg">
          {renderChildren(block.children)}
        </div>
      );
    }
    
    // 2. HEADINGS - FIXED TYPESCRIPT ERROR HERE
    if (block.type === 'heading') {
      // Cast to 'any' to bypass strict JSX element type checking
      const HeadingTag = `h${block.level}` as any;
      const sizeClass = block.level === 1 ? 'text-3xl' : block.level === 2 ? 'text-2xl' : 'text-xl';
      return (
        <HeadingTag key={index} className={`${sizeClass} font-bold text-gray-900 mt-10 mb-4`}>
          {renderChildren(block.children)}
        </HeadingTag>
      );
    }

    // 3. LISTS
    if (block.type === 'list') {
      const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
      return (
        <ListTag key={index} className={`list-outside ml-5 mb-6 space-y-2 ${block.format === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
          {block.children.map((item: any, itemIndex: number) => (
            <li key={itemIndex} className="text-gray-700 pl-2">
              {renderChildren(item.children)}
            </li>
          ))}
        </ListTag>
      );
    }

    // 4. QUOTES
    if (block.type === 'quote') {
       return (
         <blockquote key={index} className="border-l-4 border-senegal-500 pl-6 italic my-8 text-gray-600 bg-gray-50 py-6 pr-6 rounded-r-lg">
           {renderChildren(block.children)}
         </blockquote>
       )
    }

    // 5. NATIVE IMAGE BLOCKS
    if (block.type === 'image') {
      const image = block.image;
      const imageUrl = image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
      return (
        <div key={index} className="my-10">
          <img 
            src={imageUrl} 
            alt={image.alternativeText || "Blog Image"} 
            className="w-full h-auto rounded-xl shadow-md border border-gray-100 object-cover"
          />
          {image.caption && <p className="text-center text-sm text-gray-500 mt-2 italic">{image.caption}</p>}
        </div>
      );
    }

    return null;
  });
};

async function getPost(documentId: string, locale: string) {
  try {
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
          {/* Renders everything nicely */}
          <div className="prose prose-lg max-w-none prose-green prose-img:rounded-xl">
            {renderBlockText(post.Content)}
          </div>
        </div>
      </div>
    </main>
  );
}