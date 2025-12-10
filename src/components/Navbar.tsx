// src/components/Navbar.tsx
'use client'; 

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { dictionary, Language } from '../utils/translations';

export default function Navbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Default to French if no lang param is present
  const lang = (searchParams.get('lang') as Language) || 'fr';
  const t = dictionary[lang]; 

  // Helper to create links that preserve the current language
  const getLink = (path: string) => `${path}?lang=${lang}`;

  // Helper to switch language
  const getSwitchLink = (targetLang: string) => `${pathname}?lang=${targetLang}`;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Area */}
        <Link href={getLink('/')} className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <span className="text-xl font-bold text-blue-900 tracking-tight">ASDL</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href={getLink('/')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            {t?.nav?.home || "Home"}
          </Link>
          <Link href={getLink('/about')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            {t?.nav?.about || "About"}
          </Link>
          <Link href={getLink('/projects')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            {t?.nav?.projects || "Projects"}
          </Link>
          
          {/* Language Switcher */}
          <div className="flex items-center border rounded-lg overflow-hidden border-blue-100">
            <Link 
              href={getSwitchLink('fr')} 
              className={`px-3 py-1 text-sm font-medium transition-colors ${lang === 'fr' ? 'bg-blue-100 text-blue-800' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              FR
            </Link>
            <Link 
              href={getSwitchLink('en')} 
              className={`px-3 py-1 text-sm font-medium transition-colors ${lang === 'en' ? 'bg-blue-100 text-blue-800' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              EN
            </Link>
          </div>

          <Link href={getLink('/contact')} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
            {t?.nav?.donate || "Donate"}
          </Link>
        </div>
      </div>
    </nav>
  );
}