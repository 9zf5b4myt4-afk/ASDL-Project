import axios from 'axios';
import { dictionary, Language } from '../../utils/translations';

interface ProjectAction {
  id: number;
  documentId: string;
  Action_Name: string;
  Description: any[];
}

interface StrapiResponse {
  data: ProjectAction[];
  meta: any;
}

const getPlainText = (blocks: any[]) => {
  if (!blocks || !Array.isArray(blocks)) return "";
  const firstBlock = blocks.find(b => b.type === 'paragraph');
  if (!firstBlock || !firstBlock.children) return "";
  const text = firstBlock.children.map((child: any) => child.text).join("");
  return text.length > 150 ? text.substring(0, 150) + "..." : text;
};

async function getProjects(locale: string) {
  try {
    const apiUrl = 'https://asdl-backend-production.up.railway.app';
    const response = await axios.get<StrapiResponse>(`${apiUrl}/api/project-actions?locale=${locale}&populate=*`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Projects:", error);
    return null;
  }
}

export default async function ProjectsPage({ searchParams }: { searchParams: { lang?: string } }) {
  const sp = await searchParams;
  const lang = (sp?.lang as Language) || 'fr';
  const t = dictionary[lang];

  const strapiData = await getProjects(lang);
  const projects = strapiData?.data || [];

  return (
    <main className="min-h-screen bg-stone-50 font-sans">
      {/* Header Section with Image */}
      <section className="relative bg-senegal-900 text-white py-32 px-4 overflow-hidden">
        {/* Image: Agriculture/Growth */}
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1628269707923-a28a3979bb95?auto=format&fit=crop&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-senegal-900/70 to-senegal-800/90 z-0"></div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
            {lang === 'en' ? 'Our Projects & Actions' : 'Nos Projets & Actions'}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto font-light">
            {lang === 'en' 
              ? 'Concrete initiatives making a real impact on the ground.' 
              : 'Des initiatives concrètes ayant un impact réel sur le terrain.'}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-senegal-100 text-senegal-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {lang === 'en' ? 'Action' : 'Action'}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-senegal-700">
                      {project.Action_Name}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {getPlainText(project.Description)}
                    </p>
                    
                    <button className="text-senegal-600 font-bold hover:text-senegal-800 transition-colors uppercase text-sm tracking-wide">
                      {lang === 'en' ? 'Read full details &rarr;' : 'Lire les détails &rarr;'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {lang === 'en' ? 'No projects found' : 'Aucun projet trouvé'}
              </h3>
              <p className="text-gray-500 mt-2">
                {lang === 'en' ? 'Check back soon for updates.' : 'Revenez bientôt pour des mises à jour.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}