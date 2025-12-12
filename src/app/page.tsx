// ... (imports and fetch function remain same) ...
// ... I will provide the full file content below ...

import axios from 'axios';
import Link from 'next/link';
import { dictionary, Language } from '../utils/translations';

interface StrategicAxis {
  id: number;
  documentId: string;
  Title: string;            
  ShortDescription: any[]; 
}

interface StrapiResponse {
  data: StrategicAxis[];
  meta: any;
}

const getPlainText = (blocks: any[]) => {
  if (!blocks || !Array.isArray(blocks)) return "";
  const firstBlock = blocks.find(b => b.type === 'paragraph');
  if (!firstBlock || !firstBlock.children) return "";
  return firstBlock.children.map((child: any) => child.text).join("");
};

async function getStrategicAxes(locale: string) {
  try {
    const apiUrl = 'https://asdl-backend-production.up.railway.app';
    const response = await axios.get<StrapiResponse>(`${apiUrl}/api/strategic-axes?locale=${locale}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Strategic Axes:", error);
    return null;
  }
}

export default async function Home({ searchParams }: { searchParams: { lang?: string } }) {
  const sp = await searchParams;
  const lang = (sp?.lang as Language) || 'fr';
  const t = dictionary[lang];

  const strapiData = await getStrategicAxes(lang);
  const axes = strapiData?.data || [];

  return (
    <main className="min-h-screen bg-stone-50 text-gray-800 font-sans">
      
      {/* HERO SECTION - Responsive Padding Adjustment */}
      <section className="relative bg-senegal-900 text-white py-20 md:py-32 px-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1489712310660-6872655db6c5?auto=format&fit=crop&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-senegal-900/80 to-senegal-800/90 z-0"></div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          {/* Responsive Font Sizes */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-md">
            {t.welcomeTitle}
          </h1>
          <p className="text-lg md:text-2xl text-senegal-50 max-w-3xl mx-auto mb-10 leading-relaxed font-light italic">
            "{t.welcomeSubtitle}"
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href={`/about?lang=${lang}`}
              className="px-8 py-4 bg-yellow-500 text-white font-bold rounded-full hover:bg-yellow-600 transition-colors shadow-lg uppercase tracking-wide text-sm"
            >
              {lang === 'en' ? 'Who We Are' : 'Qui sommes-nous'}
            </Link>
            <Link 
              href={`/projects?lang=${lang}`}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors uppercase tracking-wide text-sm"
            >
              {lang === 'en' ? 'Our Projects' : 'Nos Projets'}
            </Link>
          </div>
        </div>
      </section>

      {/* Strategic Axes Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-senegal-700 font-bold tracking-widest uppercase text-sm mb-2 block">
              {lang === 'en' ? 'Our Focus' : 'Notre Focus'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.strategicAxesTitle}</h2>
            <div className="flex justify-center gap-1 mb-6">
              <div className="w-8 h-1.5 bg-senegal-600 rounded-full"></div>
              <div className="w-8 h-1.5 bg-yellow-500 rounded-full"></div>
              <div className="w-8 h-1.5 bg-red-600 rounded-full"></div>
            </div>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">{t.strategicAxesSubtitle}</p>
          </div>

          {axes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {axes.map((axis) => (
                <div key={axis.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col hover:-translate-y-1">
                  <div className="p-8 flex-grow">
                    <div className="w-14 h-14 bg-senegal-50 text-senegal-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-senegal-600 group-hover:text-white transition-colors duration-300">
                      <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-senegal-700 transition-colors">
                      {axis.Title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                      {getPlainText(axis.ShortDescription)}
                    </p>
                  </div>
                  
                  <div className="px-8 py-5 bg-stone-50 border-t border-gray-100 mt-auto">
                     <Link href={`/axis/${axis.documentId}?lang=${lang}`} className="flex items-center text-senegal-700 font-bold group-hover:gap-2 transition-all">
                         {t.learnMore} <span className="ml-2">&rarr;</span>
                     </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-red-500">{t.unableToLoad}</h3>
              <p className="text-gray-500 mt-2">
                {lang === 'en' ? "No English content found." : "Aucun contenu trouvé."}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}