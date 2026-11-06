import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Menu,
  X,
  ArrowRight,
  Globe,
  Phone,
  Mail,
  Search,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Language } from '../../i18n/translations';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    activeView,
    setActiveView,
    isAdminMode,
    setIsAdminMode,
    currentTrackingQuery,
    setCurrentTrackingQuery,
    shipments,
    inquiries
  } = useShipping();

  const [menuOpen, setMenuOpen] = useState(false);
  const [navTrackInput, setNavTrackInput] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navTrackInput.trim()) {
      setCurrentTrackingQuery(navTrackInput.trim());
      setIsAdminMode(false);
      setActiveView('track');
      setNavTrackInput('');
      setMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'track', label: t.navTrack },
    { id: 'services', label: t.navServices },
    { id: 'calculator', label: t.navCalculator },
    { id: 'network', label: t.navNetwork },
    { id: 'about', label: t.navAbout },
    { id: 'contact', label: t.navContact },
  ];

  return (
    <>
      {/* Sleek, Uncrowded Navigation Bar matching Gradlyn Global */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-stone-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Icon and Company Name - Aligned and Close */}
            <div
              className="flex items-center gap-2.5 cursor-pointer group select-none"
              onClick={() => { setActiveView('home'); setIsAdminMode(false); }}
            >
              <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-red-50 border border-red-200/90 shadow-2xs group-hover:border-red-400 transition-all shrink-0 p-1">
                <img
                  src="/portx-assets/img/logo/favicon.png"
                  alt="PortX Logo Icon"
                  className="w-full h-full object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/portx-assets/img/logo/logo.png';
                  }}
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-2xl sm:text-[26px] font-black tracking-tight text-[#18181b] font-heading leading-none">
                    PORT<span className="text-red-600">X</span>
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-stone-500 font-semibold tracking-wider uppercase leading-none mt-1">
                  Global Logistics
                </p>
              </div>
            </div>

            {/* Right: Exactly 2 Items matching Gradlyn Global - Hamburger + Action Button */}
            <div className="flex items-center gap-4">
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 sm:p-2.5 text-stone-700 hover:text-[#18181b] hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Abrir menú de navegación"
              >
                <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* Action Button: Track Order -> */}
              <button
                onClick={() => {
                  setIsAdminMode(false);
                  setActiveView('track');
                }}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-red-600/25 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Track Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Slide-Over Drawer Navigation Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Drawer Content */}
          <div className="relative w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <img
                  src="/portx-assets/img/logo/favicon.png"
                  alt="PortX"
                  className="w-9 h-9 object-contain"
                />
                <div>
                  <span className="text-xl font-black text-[#18181b] font-heading leading-none">
                    PORT<span className="text-red-600">X</span>
                  </span>
                  <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">
                    Global Logistics
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Track Input inside Drawer */}
            <div className="p-6 pb-2">
              <form onSubmit={handleTrackSubmit} className="flex items-center bg-stone-50 rounded-xl p-2.5 border border-stone-200">
                <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Número de seguimiento..."
                  value={navTrackInput}
                  onChange={(e) => setNavTrackInput(e.target.value)}
                  className="bg-transparent text-xs text-[#18181b] placeholder-stone-400 focus:outline-none flex-1 font-mono font-medium"
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Rastrear
                </button>
              </form>
            </div>

            {/* Nav Links */}
            <div className="p-6 space-y-1.5 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2 px-3">
                Navegación Principal
              </span>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsAdminMode(false);
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left text-sm font-bold transition-all cursor-pointer ${
                    activeView === item.id && !isAdminMode
                      ? 'bg-red-50 text-red-600 border border-red-200 shadow-2xs'
                      : 'text-[#18181b] hover:bg-stone-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </button>
              ))}

              {/* Admin Portal Entry */}
              <div className="pt-4 mt-4 border-t border-stone-100">
                <button
                  onClick={() => {
                    setIsAdminMode(true);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900 text-white hover:bg-red-600 transition-colors text-xs font-bold shadow-md cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-red-400" />
                    <span>Panel de Control & Despacho</span>
                  </div>
                  {inquiries.filter((i) => i.status === 'pending').length > 0 && (
                    <span className="bg-red-600 text-white font-bold px-2 py-0.5 rounded-full text-[10px]">
                      {inquiries.filter((i) => i.status === 'pending').length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Drawer Footer: Language & Contact */}
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4 text-xs">
              {/* Language Switcher */}
              <div className="flex items-center justify-between">
                <span className="text-stone-600 font-semibold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-red-600" />
                  Idioma / Language:
                </span>
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-200 shadow-2xs">
                  {(['es', 'en', 'de'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        language === lang
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'text-stone-600 hover:text-[#18181b]'
                      }`}
                    >
                      {lang === 'es' ? 'ES' : lang === 'en' ? 'EN' : 'DE'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone & Email */}
              <div className="space-y-2 pt-2 border-t border-stone-200 text-stone-600 font-medium">
                <a href="tel:+34602493512" className="flex items-center gap-2 hover:text-red-600 transition-colors">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span>Despacho 24/7: <strong>+34602493512</strong></span>
                </a>
                <a href="mailto:cargo.ops@portx-global.com" className="flex items-center gap-2 hover:text-red-600 transition-colors">
                  <Mail className="w-4 h-4 text-red-600" />
                  <span>cargo.ops@portx-global.com</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
