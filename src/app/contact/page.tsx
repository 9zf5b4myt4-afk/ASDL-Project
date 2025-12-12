import { dictionary, Language } from '../../utils/translations';
import ContactForm from '../../components/ContactForm'; // Import the new component

export default async function ContactPage({ searchParams }: { searchParams: { lang?: string } }) {
  const sp = await searchParams;
  const lang = (sp?.lang as Language) || 'fr';
  const t = dictionary[lang];

  return (
    <main className="min-h-screen bg-stone-50 font-sans">
      {/* Hero Section */}
      <section className="relative bg-senegal-900 text-white py-32 px-4 overflow-hidden">
        {/* Image: Nurturing/Support */}
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-senegal-900/80 to-senegal-800/90 z-0"></div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">
            {t.contact.heroTitle}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto font-light">
            {t.contact.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* LEFT: Contact Form Component */}
            <div id="form" className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.formTitle}</h2>
              {/* Pass the translated labels to the client component */}
              <ContactForm labels={t.contact.form} />
            </div>

            {/* RIGHT: Info & Donation */}
            <div id="donate" className="flex flex-col gap-8">
              
              {/* Contact Info Card */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.contact.infoTitle}</h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 text-senegal-600 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <p>{t.contact.address}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 text-senegal-600 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <p>asdl.contact.sn@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Donation Card */}
              <div className="bg-senegal-50 p-8 rounded-xl border border-senegal-100 flex-grow">
                <h3 className="text-xl font-bold text-senegal-900 mb-2">{t.contact.donateTitle}</h3>
                <p className="text-senegal-800 mb-6 text-sm">{t.contact.donateText}</p>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-senegal-100">
                    <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-1">{t.contact.bankDetails}</h4>
                    <p className="text-gray-500 text-sm">BANK Senegal</p>
                    <p className="font-mono text-gray-800">S***2 0**34 000*****000 00</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-senegal-100">
                    <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-1">{t.contact.mobileMoney}</h4>
                    <div className="flex gap-4">
                      <div>
                        <span className="text-xs text-orange-500 font-bold">Orange</span>
                        <p className="font-mono text-gray-800">+221 76 162 57 27</p>
                      </div>
                      <div>
                        <span className="text-xs text-blue-400 font-bold">Wave</span>
                        <p className="font-mono text-gray-800">+221 76 162 57 27</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}