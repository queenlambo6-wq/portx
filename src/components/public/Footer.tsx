import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import { Ship, Phone, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setIsAdminMode, t } = useShipping();
  const [footerLogoError, setFooterLogoError] = useState(false);

  return (
    <footer className="bg-white text-[#232331] border-t border-stone-200 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {!footerLogoError ? (
                <img
                  src="/portx-assets/img/logo/logo.png"
                  alt="PortX"
                  className="h-9 w-auto object-contain"
                  onError={() => setFooterLogoError(true)}
                />
              ) : (
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-600 text-white p-2 shadow-xs">
                  <Ship className="w-6 h-6 text-white" />
                </div>
              )}
              <span className="text-xl font-black tracking-tight text-[#232331] font-heading">
                PORT<span className="text-orange-600">X</span>
              </span>
            </div>
            <p className="text-[#767676] leading-relaxed max-w-sm">
              {t.taglineCargo} — Operador logístico internacional especializado en transporte marítimo, aéreo, ferroviario y terrestre con seguimiento satelital.
            </p>

            <div className="space-y-2 text-[#767676] pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-600 shrink-0" />
                <a href="tel:+34602493512" className="hover:text-orange-600 font-semibold transition-colors">
                  {t.dispatchHotline}: +34602493512
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-600 shrink-0" />
                <a href="mailto:dispatch@portx-global.com" className="hover:text-orange-600 transition-colors">
                  dispatch@portx-global.com
                </a>
              </div>
            </div>
          </div>

          {/* Cargo Services */}
          <div>
            <h4 className="text-sm font-bold text-[#232331] font-heading mb-4 uppercase tracking-wider">
              {t.navServices}
            </h4>
            <ul className="space-y-2.5 text-[#767676]">
              <li>
                <button onClick={() => { setActiveView('services'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  Ocean Freight (FCL/LCL)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('services'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  Air Cargo Express
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('services'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  Overland Road Drayage
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('services'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  Trans-Eurasia Rail
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('services'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  Pharma Cold Chain
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('services'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  Customs Brokerage
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[#232331] font-heading mb-4 uppercase tracking-wider">
              {t.networkBadge}
            </h4>
            <ul className="space-y-2.5 text-[#767676]">
              <li>
                <button onClick={() => { setActiveView('track'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  {t.navTrack}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('calculator'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  {t.navCalculator}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('network'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  {t.navNetwork}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('about'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button onClick={() => setIsAdminMode(true)} className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer">
                  <span>{t.adminOperations}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Certifications & Badges */}
          <div>
            <h4 className="text-sm font-bold text-[#232331] font-heading mb-4 uppercase tracking-wider">
              {t.accreditationsTitle}
            </h4>
            <div className="space-y-3 text-[#767676]">
              <div className="p-3 bg-[#f8f5f1] rounded-xl border border-stone-200">
                <div className="text-[#232331] font-bold">FIATA & IATA Certified</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Air & Multimodal Standard</div>
              </div>
              <div className="p-3 bg-[#f8f5f1] rounded-xl border border-stone-200">
                <div className="text-[#232331] font-bold">C-TPAT Tier 3 / AEO-F</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Automated Border Clearance</div>
              </div>
              <div className="p-3 bg-[#f8f5f1] rounded-xl border border-stone-200">
                <div className="text-[#232331] font-bold">ISO 9001 & 14001</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Quality & Environmental Standards</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} PortX Logistics Global NV. Todos los derechos reservados / All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#232331] cursor-pointer">Conditions of Carriage</span>
            <span>·</span>
            <span className="hover:text-[#232331] cursor-pointer">Privacy & Cookie Notice</span>
            <span>·</span>
            <span className="hover:text-[#232331] cursor-pointer">Bill of Lading Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
