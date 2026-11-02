import React from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  ShieldCheck,
  Globe2,
  Award,
  Building2,
  Leaf,
  HeadphonesIcon
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t } = useShipping();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heritage & Stats */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            {t.aboutBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#232331] font-heading tracking-tight leading-tight">
            {t.aboutHeading}
          </h2>
          <p className="text-sm text-[#767676] leading-relaxed">
            {t.aboutP1}
          </p>
          <p className="text-sm text-[#767676] leading-relaxed">
            {t.aboutP2}
          </p>

          {/* Pillars List */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-orange-600 mb-2" />
              <h4 className="text-sm font-bold text-[#232331] font-heading">{t.pillarAeoTitle}</h4>
              <p className="text-xs text-[#767676] mt-1">{t.pillarAeoDesc}</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
              <Leaf className="w-5 h-5 text-emerald-600 mb-2" />
              <h4 className="text-sm font-bold text-[#232331] font-heading">{t.pillarGreenTitle}</h4>
              <p className="text-xs text-[#767676] mt-1">{t.pillarGreenDesc}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Showcase & Certifications */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xl bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#232331]">
                {t.accreditationsTitle}
              </span>
              <span className="text-xs font-mono font-bold text-orange-600">ISO 9001 / 14001</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3.5 bg-[#f8f5f1] rounded-xl border border-stone-200">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#232331]">IATA Cargo Agent & FIATA Member</h4>
                  <p className="text-xs text-[#767676] mt-0.5">Licensed for air freight charters, hazardous materials (DGR), and negotiable multimodal transport documents.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 bg-[#f8f5f1] rounded-xl border border-stone-200">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#232331]">WCA World Logistics Alliance</h4>
                  <p className="text-xs text-[#767676] mt-0.5">Direct bonded agent coverage across 190+ countries with local terminal clearance.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 bg-[#f8f5f1] rounded-xl border border-stone-200">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <HeadphonesIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#232331]">24/7/365 Central Incident Response</h4>
                  <p className="text-xs text-[#767676] mt-0.5">Real-time incident management desk for rerouting, customs hold escalations, and demurrage mitigation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
