import axios from 'axios';
import Link from 'next/link';
import { dictionary, Language } from '../../utils/translations';

interface BlogPost {
  id: number;
  documentId: string;
  Title: string;
  Content: any[]; 
  publishedAt: string;
  // Included Featured_Image for the card display
  Featured_Image?: {
    url: string;
    alternativeText?: string;
  };
}

interface StrapiResponse {
  data: BlogPost[];
  meta: any;
}

const STRAPI_URL = 'https://asdl-backend-production.up.railway.app';

const getPreviewText = (blocks: any[]) => {
  if (!blocks || !Array.isArray(blocks)) return "";
  const firstBlock = blocks.find(b => b.type === 'paragraph');
  if (!firstBlock || !firstBlock.children) return "";
  const text = firstBlock.children.map((child: any) => child.text).join("");
  return text.length > 150 ? text.substring(0, 150) + "..." : text;
};

async function getPosts(locale: string) {
  try {
    // populate=* is required to fetch the images
    const response = await axios.get<StrapiResponse>(`${STRAPI_URL}/api/blog-posts?locale=${locale}&sort=publishedAt:desc&populate=*`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Blog Posts:", error);
    return null;
  }
}

export default async function BlogPage({ searchParams }: { searchParams: { lang?: string } }) {
  const sp = await searchParams;
  const lang = (sp?.lang as Language) || 'fr';
  const t = dictionary[lang];

  const strapiData = await getPosts(lang);
  const posts = strapiData?.data || [];

  return (
    <main className="min-h-screen bg-stone-50 font-sans">
      {/* Hero Section */}
      <section className="relative bg-senegal-900 text-white py-32 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-senegal-900/80 to-senegal-800/90 z-0"></div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
            {t.blog.heroTitle}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto font-light">
            {t.blog.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                // Handle Image URL logic
                let imageUrl = null;
                if (post.Featured_Image?.url) {
                   imageUrl = post.Featured_Image.url.startsWith('http') 
                     ? post.Featured_Image.url 
                     : `${STRAPI_URL}${post.Featured_Image.url}`;
                }

                return (
                  <div key={post.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                    {/* Render Real Image or Fallback */}
                    <div className="h-48 bg-stone-200 flex items-center justify-center overflow-hidden">
                      {imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt={post.Featured_Image?.alternativeText || post.Title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl">📰</span>
                      )}
                    </div>
                    
                    <div className="p-6 flex-grow">
                      <div className="text-xs text-senegal-600 font-bold uppercase mb-2">
                          {new Date(post.publishedAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR')}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-senegal-700 line-clamp-2">
                        {post.Title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4 text-sm line-clamp-3">
                        {getPreviewText(post.Content)}
                      </p>
                    </div>
                    <div className="px-6 py-4 bg-stone-50 border-t border-gray-100 mt-auto">
                      <Link href={`/blog/${post.documentId}?lang=${lang}`} className="text-senegal-700 font-bold hover:text-senegal-900 transition-colors uppercase text-xs tracking-wide">
                        {t.blog.readMore} &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {t.blog.noPosts}
              </h3>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}