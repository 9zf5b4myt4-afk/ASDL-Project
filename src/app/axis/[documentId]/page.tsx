import axios from 'axios';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dictionary, Language } from '../../../utils/translations';

// 1. Updated Interface: Description is now 'any[]' because it is Rich Text
interface ProjectAction {
  id: number;
  documentId: string;
  Action_Name: string;
  Description: any[]; // <--- CHANGED FROM string TO any[]
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
    const apiUrl = 'https://asdl-backend-production.up.railway.app';
    // Fetch data + Populate related projects
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
    <main className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-blue-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href={`/?lang=${lang}`} className="text-blue-200 hover:text-white text-sm mb-4 inline-block transition-colors">
            &larr; {t.backHome}
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold">{axis.Title}</h1>
          
          <div className="mt-4 text-blue-100 text-lg max-w-2xl">
             {renderBlockText(axis.ShortDescription)}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 md:p-12">
          
          {axis.projectstatus && (
            <div className="mb-6">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                ${axis.projectstatus === 'active' ? 'bg-green-100 text-green-800' : 
                  axis.projectstatus === 'completed' ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'}`}>
                {t.statusLabel} : {getStatusLabel(axis.projectstatus)}
              </span>
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.detailedObjective}</h2>
            {axis.DetailedObjective ? renderBlockText(axis.DetailedObjective) : (
              <p className="text-gray-400 italic">No detailed objective provided.</p>
            )}
          </div>

          {/* Related Projects Section */}
          {axis.project_actions && axis.project_actions.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {lang === 'en' ? 'Related Projects' : 'Projets Associés'}
              </h3>
              <div className="grid gap-4">
                {axis.project_actions.map((project) => (
                  <div key={project.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-blue-900 text-lg mb-2">{project.Action_Name}</h4>
                    <div className="text-sm text-gray-600">
                      {/* 2. FIX: Use renderBlockText instead of direct display */}
                      {renderBlockText(project.Description)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-gray-100">
             <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.supportCauseTitle}</h3>
             <p className="text-gray-600 mb-6">
               {t.supportCauseText} {axis.Title}.
             </p>
             <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
               {t.contactUs}
             </button>
          </div>
        </div>
      </div>
    </main>
  );
}