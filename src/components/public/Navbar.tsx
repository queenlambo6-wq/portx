import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Ship,
  Search,
  Phone,
  Mail,
  LayoutDashboard,
  Menu,
  X,
  Calculator,
  ChevronRight,
  Globe
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
    setCurrentTrackingQuery,
    shipments,
    inquiries
  } = useShipping();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickTrackInput, setQuickTrackInput] = useState('');
  const [logoImgError, setLogoImgError] = useState(false);

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackInput.trim()) {
      setCurrentTrackingQuery(quickTrackInput.trim());
      setIsAdminMode(false);
      setActiveView('track');
      setQuickTrackInput('');
      setMobileMenuOpen(false);
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

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-stone-200 text-[#232331] shadow-xs">
      {/* Top Advisory Strip - Reverse-engineered PortX warm bar with orange & dark accents */}
      <div className="bg-[#f8f5f1] border-b border-stone-200/80 px-4 py-1.5 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[#767676]">
            <span className="flex items-center gap-1.5 font-semibold text-[#232331]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.advisoryText}
            </span>
            <span className="text-stone-300">|</span>
            <a href="tel:+34602493512" className="flex items-center gap-1.5 hover:text-orange-600 transition-colors">
              <Phone className="w-3.5 h-3.5 text-orange-600" />
              <span>{t.dispatchHotline}:</span> <strong className="text-[#232331] font-semibold">+34602493512</strong>
            </a>
            <span className="text-stone-300">|</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-orange-600" />
              <span>cargo.ops@portx-global.com</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher Selector (ES - Default, EN, DE) */}
            <div className="flex items-center bg-white rounded-md border border-stone-200 p-0.5 shadow-2xs">
              <Globe className="w-3 h-3 text-stone-400 ml-1.5 mr-1" />
              {(['es', 'en', 'de'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded transition-all ${
                    language === lang
                      ? 'bg-orange-600 text-white shadow-2xs'
                      : 'text-stone-600 hover:text-[#232331] hover:bg-stone-100'
                  }`}
                  title={lang === 'es' ? 'Español (Predeterminado)' : lang === 'en' ? 'English' : 'Deutsch'}
                >
                  {lang === 'es' ? '🇪🇸 ES' : lang === 'en' ? '🇬🇧 EN' : '🇩🇪 DE'}
                </button>
              ))}
            </div>

            <span className="text-stone-300">|</span>

            {/* Quick Tracking Fast Jumper */}
            <form onSubmit={handleQuickTrackSubmit} className="flex items-center bg-white rounded-md px-2.5 py-0.5 border border-stone-200 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all shadow-2xs">
              <Search className="w-3 h-3 text-stone-400 mr-1.5" />
              <input
                type="text"
                placeholder={t.quickTrackPlaceholder}
                value={quickTrackInput}
                onChange={(e) => setQuickTrackInput(e.target.value)}
                className="bg-transparent text-xs text-[#232331] placeholder-stone-400 focus:outline-none w-36"
              />
              <button type="submit" className="text-[10px] text-orange-600 hover:text-orange-700 font-bold uppercase px-1">
                {t.quickTrackGo}
              </button>
            </form>

            <span className="text-stone-300">|</span>

            {/* Direct Admin Panel Switcher */}
            <button
              onClick={() => setIsAdminMode(true)}
              className="flex items-center gap-1.5 text-xs px-2.5 py-0.5 bg-[#232331] hover:bg-orange-600 text-white rounded font-semibold transition-all shadow-2xs"
              title="PortX Admin Operations Center"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.adminOperations}</span>
              {pendingInquiriesCount > 0 && (
                <span className="bg-orange-600 text-white font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                  {pendingInquiriesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with PortX authentic visual */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => { setActiveView('home'); setIsAdminMode(false); }}
          >
            {!logoImgError ? (
              <img
                src="/portx-assets/img/logo/logo.png"
                alt="PortX Cargo & Logistics"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-102"
                onError={() => setLogoImgError(true)}
              />
            ) : (
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-orange-600 text-white shadow-md p-2">
                <Ship className="w-6 h-6 text-white" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-[#232331] font-heading">
                  PORT<span className="text-orange-600">X</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 border border-orange-200">
                  Pet & Doorstep
                </span>
              </div>
              <p className="text-[11px] text-[#767676] font-medium">
                {t.taglineCargo}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = !isAdminMode && activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsAdminMode(false);
                  }}
                  className={`px-3.5 py-2 text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-orange-600 font-bold'
                      : 'text-[#232331] hover:text-orange-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-orange-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                setActiveView('calculator');
                setIsAdminMode(false);
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg bg-[#f8f5f1] text-[#232331] hover:bg-stone-200/70 border border-stone-200 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-orange-600" />
              {t.getQuoteBtn}
            </button>

            <button
              onClick={() => setIsAdminMode(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-600/20 transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-white" />
              {t.adminPortalBtn}
            </button>
          </div>

          {/* Mobile Menu & Language Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Quick mobile language pill */}
            <button
              onClick={() => {
                const nextLang = language === 'es' ? 'en' : language === 'en' ? 'de' : 'es';
                setLanguage(nextLang);
              }}
              className="px-2 py-1 text-xs font-bold rounded border border-stone-200 bg-stone-50 text-[#232331]"
            >
              {language === 'es' ? '🇪🇸 ES' : language === 'en' ? '🇬🇧 EN' : '🇩🇪 DE'}
            </button>

            <button
              onClick={() => setIsAdminMode(true)}
              className="px-2.5 py-1.5 text-xs font-bold rounded bg-orange-600 text-white flex items-center gap-1 shadow-xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Admin
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#232331] hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3">
          {/* Mobile Language Switcher Bar */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#f8f5f1] border border-stone-200">
            <span className="text-xs font-semibold text-[#232331] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-orange-600" />
              Idioma / Language:
            </span>
            <div className="flex items-center gap-1">
              {(['es', 'en', 'de'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-xs font-bold px-2 py-1 rounded ${
                    language === lang
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-[#232331] border border-stone-200'
                  }`}
                >
                  {lang === 'es' ? 'ES' : lang === 'en' ? 'EN' : 'DE'}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleQuickTrackSubmit} className="flex items-center bg-[#f8f5f1] rounded-lg p-2 border border-stone-200">
            <Search className="w-4 h-4 text-stone-400 mr-2" />
            <input
              type="text"
              placeholder={t.quickTrackPlaceholder}
              value={quickTrackInput}
              onChange={(e) => setQuickTrackInput(e.target.value)}
              className="bg-transparent text-sm text-[#232331] placeholder-stone-400 focus:outline-none flex-1"
            />
            <button type="submit" className="bg-orange-600 text-white font-bold text-xs px-3 py-1.5 rounded">
              {t.quickTrackGo}
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setIsAdminMode(false);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-2.5 rounded-lg text-left text-sm font-medium ${
                  activeView === item.id && !isAdminMode
                    ? 'bg-orange-50 text-orange-600 font-bold border border-orange-200'
                    : 'text-[#232331] hover:bg-[#f8f5f1]'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsAdminMode(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-orange-600 text-white font-bold text-sm shadow-md"
            >
              <LayoutDashboard className="w-4 h-4" />
              {t.adminPortalBtn} ({shipments.length} {t.activeShipmentsKpi})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
