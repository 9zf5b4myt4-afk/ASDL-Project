'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { dictionary, Language } from '../utils/translations';
import AsdlLogo from './Logo';

export default function Footer() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') as Language) || 'fr';
  const t = dictionary[lang];

  return (
    <footer className="bg-senegal-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              {/* White Text Logo without box */}
              <AsdlLogo className="h-12 w-auto" textColor="white" />
            </div>
            <p className="text-senegal-100 leading-relaxed max-w-sm">
              {lang === 'en' 
                ? "Senegalese Association for Local Development. Dedicated to empowering communities through sustainable action."
                : "Association Sénégalaise pour le Développement Local. Dédiée à l'autonomisation des communautés par l'action durable."}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">{lang === 'en' ? 'Quick Links' : 'Liens Rapides'}</h4>
            <ul className="space-y-2 text-senegal-100">
              <li><Link href={`/?lang=${lang}`} className="hover:text-white transition-colors">{t.nav.home}</Link></li>
              <li><Link href={`/about?lang=${lang}`} className="hover:text-white transition-colors">{t.nav.about}</Link></li>
              <li><Link href={`/projects?lang=${lang}`} className="hover:text-white transition-colors">{t.nav.projects}</Link></li>
              <li><Link href={`/contact?lang=${lang}`} className="hover:text-white transition-colors">{t.nav.donate}</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-senegal-100">
              <li>Dakar, Senegal</li>
              <li>asdl.contact.sn@gmail.com</li>
              <li>+221 33 *** 00 00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-senegal-800 pt-8 text-center text-senegal-300 text-sm">
          {/* Dynamic Copyright */}
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}