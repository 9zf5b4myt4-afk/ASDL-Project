import Link from 'next/link';
import { dictionary, Language } from '../../utils/translations';

export default async function AboutPage({ searchParams }: { searchParams: { lang?: string } }) {
  const sp = await searchParams;
  const lang = (sp?.lang as Language) || 'fr';
  const t = dictionary[lang];

  return (
    <main className="min-h-screen bg-stone-50 font-sans">
      {/* 1. Hero Section with Background Image */}
      <section className="relative bg-senegal-900 text-white py-32 px-4 overflow-hidden">
        {/* Image: Unity/Teamwork */}
        <div 
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-senegal-900/80 to-senegal-800/95 z-0"></div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-sm">
            {t.about.heroTitle}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto font-light leading-relaxed">
            {t.about.heroSubtitle}
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission Card */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border-t-4 border-senegal-500">
              <div className="w-14 h-14 bg-senegal-100 text-senegal-600 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.854 1.5-2.296m-4.5 0c.842.442 1.5 1.313 1.5 2.296v.192" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-senegal-900 mb-4">{t.about.missionTitle}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t.about.missionText}
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-senegal-50 p-10 rounded-2xl border border-senegal-100">
              <div className="w-14 h-14 bg-senegal-600 text-white rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-senegal-900 mb-4">{t.about.visionTitle}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.about.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">{t.about.valuesTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.values(t.about.values).map((value, index) => (
              <div key={index} className="p-6 rounded-xl bg-stone-50 border border-stone-100 text-center hover:bg-senegal-50 hover:border-senegal-100 transition-colors duration-300">
                <div className="text-xl font-bold text-senegal-800">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Team Placeholder */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.about.teamTitle}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">{t.about.teamSubtitle}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-60">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl border border-dashed border-gray-300">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/3 mx-auto"></div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-sm text-gray-500 italic">
            {lang === 'en' ? '* Detailed team profiles to be updated soon.' : '* Profils détaillés de l\'équipe à venir.'}
          </div>
        </div>
      </section>
    </main>
  );
}