'use client'; 

import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { dictionary, Language } from '../utils/translations';
import AsdlLogo from './Logo'; 

// Helper Component for Desktop Dropdown Items
const NavDropdown = ({ title, path, description, lang }: { title: string, path: string, description: string, lang: string }) => (
  <div className="relative group h-full flex items-center">
    <Link href={path} className="flex items-center gap-1 text-gray-600 hover:text-senegal-700 font-medium transition-colors py-4">
      {title}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 mt-0.5 transition-transform group-hover:rotate-180">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </Link>
    
    {/* The Fancy Dropdown Panel */}
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto">
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-4">
        <Link href={path} className="block group/item">
          <div className="text-senegal-700 font-bold mb-1 group-hover/item:text-senegal-500 transition-colors">
            {title} &rarr;
          </div>
          <p className="text-sm text-gray-500 leading-snug">
            {description}
          </p>
        </Link>
      </div>
    </div>
  </div>
);

const DonateDropdown = ({ label, donateLabel, donateDesc, contactLabel, contactDesc, lang }: any) => (
  <div className="relative group h-full flex items-center">
    <button className="flex items-center gap-1 px-5 py-2.5 bg-senegal-700 text-white rounded-lg font-medium hover:bg-senegal-800 transition-colors shadow-sm">
      {label}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 mt-0.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
    
    <div className="absolute top-full right-0 w-80 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto">
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-2">
        <Link href={`/contact?lang=${lang}#donate`} className="block p-3 rounded-lg hover:bg-senegal-50 transition-colors group/item">
          <div className="text-senegal-700 font-bold mb-1 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-senegal-100 flex items-center justify-center text-xs">💝</span>
            {donateLabel}
          </div>
          <p className="text-xs text-gray-500">{donateDesc}</p>
        </Link>
        <Link href={`/contact?lang=${lang}#form`} className="block p-3 rounded-lg hover:bg-stone-50 transition-colors group/item mt-1">
          <div className="text-gray-700 font-bold mb-1 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">📩</span>
            {contactLabel}
          </div>
          <p className="text-xs text-gray-500">{contactDesc}</p>
        </Link>
      </div>
    </div>
  </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const lang = (searchParams.get('lang') as Language) || 'fr';
  const t = dictionary[lang]; 

  const getLink = (path: string) => `${path}?lang=${lang}`;
  const getSwitchLink = (targetLang: string) => `${pathname}?lang=${targetLang}`;
  
  const closeMenu = () => {
    setIsOpen(false);
    setActiveMobileMenu(null);
  };

  const toggleMobileSubmenu = (menuName: string) => {
    setActiveMobileMenu(activeMobileMenu === menuName ? null : menuName);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        <Link href={getLink('/')} onClick={closeMenu} className="flex items-center gap-2">
          <AsdlLogo className="h-10 w-auto md:h-12" />
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex items-center gap-8 h-full">
          <Link href={getLink('/')} className="text-gray-600 hover:text-senegal-700 font-medium transition-colors">
            {t?.nav?.home}
          </Link>
          
          <NavDropdown 
            title={t.nav.about} 
            path={getLink('/about')} 
            description={t.nav.aboutDesc} 
            lang={lang}
          />

          <NavDropdown 
            title={t.nav.projects} 
            path={getLink('/projects')} 
            description={t.nav.projectsDesc} 
            lang={lang}
          />

          {/* NEW: Blog Dropdown */}
          <NavDropdown 
            title={t.nav.blog} 
            path={getLink('/blog')} 
            description={t.nav.blogDesc} 
            lang={lang}
          />
          
          <div className="flex items-center border rounded-lg overflow-hidden border-gray-200 ml-4">
            <Link href={getSwitchLink('fr')} className={`px-3 py-1 text-sm font-medium transition-colors ${lang === 'fr' ? 'bg-senegal-100 text-senegal-800' : 'text-gray-500 hover:bg-gray-50'}`}>FR</Link>
            <Link href={getSwitchLink('en')} className={`px-3 py-1 text-sm font-medium transition-colors ${lang === 'en' ? 'bg-senegal-100 text-senegal-800' : 'text-gray-500 hover:bg-gray-50'}`}>EN</Link>
          </div>

          <DonateDropdown 
            label={t.nav.donateContact} 
            donateLabel={t.nav.donate} 
            donateDesc={t.nav.donateDesc}
            contactLabel={t.nav.contact}
            contactDesc={t.nav.contactDesc}
            lang={lang}
          />
        </div>

        {/* --- MOBILE HAMBURGER --- */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-senegal-700 focus:outline-none"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl overflow-y-auto max-h-[80vh]">
          <div className="flex flex-col">
            <Link href={getLink('/')} onClick={closeMenu} className="px-6 py-4 border-b border-gray-50 font-bold text-gray-800">
              {t.nav.home}
            </Link>

            {/* About Accordion */}
            <div className="border-b border-gray-50">
              <button 
                onClick={() => toggleMobileSubmenu('about')}
                className="w-full flex justify-between items-center px-6 py-4 font-bold text-gray-800"
              >
                {t.nav.about}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${activeMobileMenu === 'about' ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {activeMobileMenu === 'about' && (
                <div className="bg-stone-50 px-6 py-4 text-sm text-gray-600">
                  <p className="mb-3">{t.nav.aboutDesc}</p>
                  <Link href={getLink('/about')} onClick={closeMenu} className="text-senegal-700 font-bold uppercase text-xs tracking-wide">
                    {lang === 'en' ? 'Go to Page' : 'Aller à la page'} &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Projects Accordion */}
            <div className="border-b border-gray-50">
              <button 
                onClick={() => toggleMobileSubmenu('projects')}
                className="w-full flex justify-between items-center px-6 py-4 font-bold text-gray-800"
              >
                {t.nav.projects}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${activeMobileMenu === 'projects' ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {activeMobileMenu === 'projects' && (
                <div className="bg-stone-50 px-6 py-4 text-sm text-gray-600">
                  <p className="mb-3">{t.nav.projectsDesc}</p>
                  <Link href={getLink('/projects')} onClick={closeMenu} className="text-senegal-700 font-bold uppercase text-xs tracking-wide">
                    {lang === 'en' ? 'View All Projects' : 'Voir tous les projets'} &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* NEW: Blog Accordion */}
            <div className="border-b border-gray-50">
              <button 
                onClick={() => toggleMobileSubmenu('blog')}
                className="w-full flex justify-between items-center px-6 py-4 font-bold text-gray-800"
              >
                {t.nav.blog}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${activeMobileMenu === 'blog' ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {activeMobileMenu === 'blog' && (
                <div className="bg-stone-50 px-6 py-4 text-sm text-gray-600">
                  <p className="mb-3">{t.nav.blogDesc}</p>
                  <Link href={getLink('/blog')} onClick={closeMenu} className="text-senegal-700 font-bold uppercase text-xs tracking-wide">
                    {lang === 'en' ? 'Read Blog' : 'Lire le Blog'} &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Donate/Contact Accordion */}
            <div className="border-b border-gray-50">
              <button 
                onClick={() => toggleMobileSubmenu('donate')}
                className="w-full flex justify-between items-center px-6 py-4 font-bold text-senegal-700"
              >
                {t.nav.donateContact}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${activeMobileMenu === 'donate' ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {activeMobileMenu === 'donate' && (
                <div className="bg-senegal-50 px-6 py-4 flex flex-col gap-3">
                  <Link href={`/contact?lang=${lang}#donate`} onClick={closeMenu} className="block p-3 bg-white rounded-lg border border-senegal-100 shadow-sm">
                    <div className="font-bold text-senegal-800 mb-1">💝 {t.nav.donate}</div>
                    <div className="text-xs text-senegal-600">{t.nav.donateDesc}</div>
                  </Link>
                  <Link href={`/contact?lang=${lang}#form`} onClick={closeMenu} className="block p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <div className="font-bold text-gray-800 mb-1">📩 {t.nav.contact}</div>
                    <div className="text-xs text-gray-500">{t.nav.contactDesc}</div>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Language Switcher Mobile */}
            <div className="flex justify-center gap-4 py-6 bg-gray-50">
               <Link href={getSwitchLink('fr')} onClick={closeMenu} className={`px-6 py-2 rounded-full font-bold shadow-sm ${lang === 'fr' ? 'bg-senegal-600 text-white' : 'bg-white text-gray-600'}`}>Français</Link>
               <Link href={getSwitchLink('en')} onClick={closeMenu} className={`px-6 py-2 rounded-full font-bold shadow-sm ${lang === 'en' ? 'bg-senegal-600 text-white' : 'bg-white text-gray-600'}`}>English</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}