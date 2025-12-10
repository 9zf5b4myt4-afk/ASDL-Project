// src/app/page.tsx
import axios from 'axios';
import Link from 'next/link';
import { dictionary, Language } from '../utils/translations';

// Interface matching YOUR Strapi screenshot
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

// Helper to get simple text from Rich Text
const getPlainText = (blocks: any[]) => {
  if (!blocks || !Array.isArray(blocks)) return "";
  const firstBlock = blocks.find(b => b.type === 'paragraph');
  if (!firstBlock || !firstBlock.children) return "";
  return firstBlock.children.map((child: any) => child.text).join("");
};

// UPDATED FUNCTION: Accepts 'locale' to fetch the right language
async function getStrategicAxes(locale: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    // We append ?locale= to the API URL
    const response = await axios.get<StrapiResponse>(`${apiUrl}/api/strategic-axes?locale=${locale}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Strategic Axes:", error);
    return null;
  }
}

export default async function Home({ searchParams }: { searchParams: { lang?: string } }) {
  // 1. Determine Language (Default to 'fr' based on your request)
  // We await searchParams for compatibility with Next.js 15+ logic
  const sp = await searchParams;
  const lang = (sp?.lang as Language) || 'fr';
  
  // 2. Load the correct Dictionary Text
  const t = dictionary[lang];

  // 3. Fetch data from Strapi in the correct language
  const strapiData = await getStrategicAxes(lang);
  const axes = strapiData?.data || [];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <section className="bg-blue-900 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          {/* Dynamic Welcome Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6">{t.welcomeTitle}</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            {t.welcomeSubtitle}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.strategicAxesTitle}</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
            <p className="mt-4 text-gray-600">{t.strategicAxesSubtitle}</p>
          </div>

          {axes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {axes.map((axis) => (
                <div key={axis.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
                  <div className="p-8 flex-grow">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-gray-800">
                      {axis.Title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {getPlainText(axis.ShortDescription)}
                    </p>
                  </div>
                  
                  <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
                     {/* Pass the current language to the detail page link */}
                     <Link href={`/axis/${axis.documentId}?lang=${lang}`}>
                       <span className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                         {t.learnMore} &rarr;
                       </span>
                     </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-red-500">{t.unableToLoad}</h3>
              <p className="text-gray-500 mt-2">
                {lang === 'en' 
                  ? "No English content found. Did you publish the English translations in Strapi?" 
                  : "Aucun contenu trouvé. Avez-vous publié le contenu dans Strapi ?"}
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} ASDL NGO. All rights reserved.</p>
      </footer>
    </main>
  );
}