import React from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Phone,
  Mail,
  ShieldCheck,
  Globe,
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setIsAdminMode } = useShipping();

  return (
    <footer className="bg-[#0f0f12] text-slate-300 text-xs border-t border-stone-800">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Brand Info & Global Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo */}
            <div
              className="flex items-center gap-2.5 cursor-pointer group select-none"
              onClick={() => { setActiveView('home'); setIsAdminMode(false); }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 shadow-2xs group-hover:border-white/40 transition-all shrink-0 p-1">
                <img
                  src="/portx-assets/img/logo/favicon.png"
                  alt="PortX Global"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/portx-assets/img/logo/logo.png';
                  }}
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-black tracking-tight text-white font-heading leading-none">
                  PORT<span className="text-red-600">X</span>
                </span>
                <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-widest mt-1">
                  Global Logistics
                </span>
              </div>
            </div>

            <p className="text-stone-400 leading-relaxed max-w-sm text-xs sm:text-[13px]">
              End-to-end international freight, supply chain management, and specialized live animal relocation across 170+ countries. Delivering containerized cargo, air charters, and veterinary transit with 100% real-time GPS telemetry.
            </p>

            {/* Direct 24/7 Ops Desk */}
            <div className="space-y-2 pt-2 border-t border-stone-800/80">
              <a
                href="tel:+34602493512"
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-red-950/60 border border-red-900/40 flex items-center justify-center text-red-500 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>
                  Operations Desk 24/7: <strong className="text-white font-mono font-bold">+34602493512</strong>
                </span>
              </a>

              <a
                href="mailto:cargo.ops@portx-global.com"
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-red-950/60 border border-red-900/40 flex items-center justify-center text-red-500 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="font-mono text-slate-300 hover:text-white">
                  cargo.ops@portx-global.com
                </span>
              </a>
            </div>
          </div>

          {/* Col 2: Services & Solutions (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Services & Solutions</span>
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button
                  onClick={() => { setActiveView('services'); setIsAdminMode(false); }}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Ocean Freight (FCL & LCL)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('services'); setIsAdminMode(false); }}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Air Freight & Priority Charters
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('services'); setIsAdminMode(false); }}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Specialized Pet & Animal Relocation
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('services'); setIsAdminMode(false); }}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Temperature-Controlled Cold Chain
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('services'); setIsAdminMode(false); }}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Contract Logistics & Warehousing
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('services'); setIsAdminMode(false); }}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Customs Clearance & 4PL Brokerage
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Tools (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button
                  onClick={() => { setActiveView('track'); setIsAdminMode(false); }}
                  className="hover:text-red-400 font-semibold transition-colors text-left cursor-pointer flex items-center gap-1 text-white"
                >
                  <span>Track & Trace</span>
                  <ArrowRight className="w-3 h-3 text-red-500" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('calculator'); setIsAdminMode(false); }}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Freight Rate Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('network'); setIsAdminMode(false); }}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Global Port Network (170+)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('about'); setIsAdminMode(false); }}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  About PortX Global
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('contact'); setIsAdminMode(false); }}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  Contact & Dispatch
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Certifications & Dispatch Access (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>Standards & Compliance</span>
            </h4>
            
            <div className="space-y-2 text-stone-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>IATA Live Animals Regulation (LAR)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>ISO 9001:2015 Quality Management</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>GDP Pharma & Cold Chain Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>AEO Authorized Economic Operator</span>
              </div>
            </div>

            {/* Admin Desk Entry */}
            <div className="pt-2">
              <button
                onClick={() => setIsAdminMode(true)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-stone-900 border border-stone-800 hover:border-red-600/50 text-stone-300 hover:text-white transition-all cursor-pointer text-xs font-medium"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-red-500" />
                  <span>Operations & Admin Portal</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal, Language */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>
            © {new Date().getFullYear()} PortX Global Logistics. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <span className="hover:text-stone-300 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span>·</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">
              Terms of Carriage
            </span>
            <span>·</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">
              Cookie Policy
            </span>
            <span>·</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">
              Security & Telemetry
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-red-500" />
            <span className="text-stone-400 font-semibold">Global Network:</span>
            <span className="text-stone-300 font-medium">170+ Countries</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
