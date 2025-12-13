import axios from 'axios';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dictionary, Language } from '../../../utils/translations';

// Interface definitions
interface ProjectAction {
  id: number;
  documentId: string;
  Action_Name: string;
  Description: any[]; 
}

interface StrategicAxis {
  id: number;
  documentId: string;
  Title: string; 
  ShortDescription: any[]; 
  DetailedObjective: any[]; 
  projectstatus: 'planned' | 'active' | 'completed'; 
  project_actions: ProjectAction[];
}

interface StrapiResponse {
  data: StrategicAxis;
  meta: any;
}

// Helper to render Rich Text
const renderBlockText = (blocks: any[]) => {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks.map((block, index) => {
    if (block.type === 'paragraph' || block.type === 'heading') {
      return (
        <p key={index} className="mb-2">
          {block.children.map((child: any) => child.text).join('')}
        </p>
      );
    }
    if (block.type === 'list') {
      return (
        <ul key={index} className="list-disc pl-5 mb-2">
          {block.children.map((item: any, itemIndex: number) => (
            <li key={itemIndex}>
              {item.children.map((child: any) => child.text).join('')}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  });
};

async function getAxis(documentId: string, locale: string) {
  try {
    // Hardcoded URL for stability on Vercel
    const apiUrl = 'https://asdl-backend-production.up.railway.app';
    const response = await axios.get<StrapiResponse>(`${apiUrl}/api/strategic-axes/${documentId}?locale=${locale}&populate=*`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching Axis:", error);
    return null;
  }
}

export default async function AxisDetail({ 
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
  
  const axis = await getAxis(documentId, lang);

  if (!axis) {
    return notFound();
  }

  const getStatusLabel = (status: string) => {
    return t.status[status as keyof typeof t.status] || status;
  };

  return (
    <main className="min-h-screen bg-stone-50 font-sans">
      {/* HEADER SECTION - GREEN THEME */}
      <div className="relative bg-senegal-900 text-white py-20 px-4 overflow-hidden">
        {/* Background Pattern/Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-senegal-900 to-senegal-800 opacity-90 z-0"></div>
        <div 
            className="absolute inset-0 z-0 opacity-20"
            style={{
                backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
                backgroundSize: 'auto',
            }}
        ></div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <Link href={`/?lang=${lang}`} className="text-senegal-200 hover:text-white text-sm mb-6 inline-flex items-center gap-2 transition-colors font-medium uppercase tracking-wide">
            &larr; {t.backHome}
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-md">{axis.Title}</h1>
          
          <div className="mt-6 text-senegal-50 text-lg max-w-3xl leading-relaxed border-l-4 border-yellow-500 pl-6">
             {renderBlockText(axis.ShortDescription)}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          
          {/* Status Badge */}
          {axis.projectstatus && (
            <div className="mb-8 flex items-center justify-between">
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm
                ${axis.projectstatus === 'active' ? 'bg-green-100 text-green-800 border border-green-200' : 
                  axis.projectstatus === 'completed' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 
                  'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>
                <span className={`w-2 h-2 rounded-full mr-2 ${axis.projectstatus === 'active' ? 'bg-green-500' : axis.projectstatus === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'}`}></span>
                {t.statusLabel}: {getStatusLabel(axis.projectstatus)}
              </span>
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                {t.detailedObjective}
            </h2>
            {axis.DetailedObjective ? renderBlockText(axis.DetailedObjective) : (
              <p className="text-gray-400 italic">No detailed objective provided.</p>
            )}
          </div>

          {/* Related Projects Section */}
          {axis.project_actions && axis.project_actions.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-senegal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {lang === 'en' ? 'Related Projects' : 'Projets Associés'}
              </h3>
              <div className="grid gap-6">
                {axis.project_actions.map((project) => (
                  <div key={project.id} className="bg-senegal-50 p-6 rounded-xl border border-senegal-100 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-senegal-900 text-lg mb-2">{project.Action_Name}</h4>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {renderBlockText(project.Description)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-stone-50 p-8 rounded-2xl border border-stone-200 text-center">
             <h3 className="text-lg font-bold text-gray-900 mb-2">{t.supportCauseTitle}</h3>
             <p className="text-gray-600 mb-6 max-w-lg mx-auto">
               {t.supportCauseText} <strong>{axis.Title}</strong>.
             </p>
             <Link 
                href={`/contact?lang=${lang}#form`}
                className="inline-block bg-senegal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-senegal-700 transition-colors shadow-lg"
             >
               {t.contactUs}
             </Link>
          </div>
        </div>
      </div>
    </main>
  );
}