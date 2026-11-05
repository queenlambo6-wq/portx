import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Search,
  Truck,
  Plane,
  Heart,
  ArrowRight,
  Calculator,
  ChevronRight,
  ShieldCheck,
  Thermometer,
  Home,
  MapPin
} from 'lucide-react';

export const Hero: React.FC = () => {
  const {
    t,
    setCurrentTrackingQuery,
    setActiveView,
    setIsAdminMode,
    shipments
  } = useShipping();

  const [trackingCode, setTrackingCode] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = trackingCode.trim();
    setCurrentTrackingQuery(query);
    setIsAdminMode(false);
    setActiveView('track');
  };

  return (
    <div className="relative bg-[#f8f5f1] border-b border-stone-200/80 pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Background Subtle Motif */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e0d8_1px,transparent_1px),linear-gradient(to_bottom,#e5e0d8_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Track Widget */}
          <div className="lg:col-span-7">
            {/* Top Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-stone-200 text-orange-600 text-xs font-bold uppercase tracking-wider mb-5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
              <Heart className="w-3.5 h-3.5 fill-orange-600" />
              <span>{t.heroBadge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#232331] tracking-tight font-heading leading-tight">
              {t.heroTitleLine1} <br />
              <span className="text-orange-600">
                {t.heroTitleHighlight}
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#767676] leading-relaxed max-w-xl">
              {t.heroDescription}
            </p>

            {/* Local Doorstep Delivery Guarantee Pill */}
            <div className="mt-5 inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-950 text-xs font-semibold shadow-2xs">
              <Home className="w-4 h-4 text-orange-600 shrink-0" />
              <span>
                <strong>Compromiso Puerta a Puerta:</strong> La furgoneta local entrega a tu mascota directamente en la puerta del receptor con aviso previo.
              </span>
            </div>

            {/* Tracking Search Card - Clean White with Orange Button */}
            <div className="mt-7 bg-white border-2 border-orange-200 rounded-2xl p-5 sm:p-6 shadow-xl relative z-10">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold uppercase tracking-wider text-[#232331] flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-orange-600" />
                  {t.trackBoxTitle}
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded text-[11px] font-bold border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {t.liveAisStatus}
                </span>
              </div>

              <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    placeholder={t.trackInputPlaceholder}
                    className="w-full bg-[#f8f5f1] text-[#232331] placeholder-stone-400 px-4 py-3.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm font-mono font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-orange-600/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.trackButton}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Confidentiality & Security Assurance */}
              <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Rastreo Privado y Confidencial
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-[11px] text-[#767676]">
                  Introduce el código único de seguimiento emitido por el criador o transportista.
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setActiveView('calculator');
                  setIsAdminMode(false);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-600/20 transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                {t.calculateRatesBtn}
              </button>

              <button
                onClick={() => {
                  setActiveView('network');
                  setIsAdminMode(false);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-[#232331] text-xs font-bold border border-stone-200 transition-colors cursor-pointer shadow-2xs"
              >
                <MapPin className="w-4 h-4 text-orange-600" />
                {t.explorePortsBtn}
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>
          </div>

          {/* Right Column: Fleet Live Status Box & Commercial Metrics */}
          <div className="lg:col-span-5 space-y-5">
            {/* Live Operational Status Box in Clean White */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#232331] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-orange-600" />
                  {t.liveFleetFeedTitle}
                </span>
                <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  GPS Puerta Activo
                </span>
              </div>

              <div className="space-y-3 mt-4">
                <div className="p-3.5 bg-[#f8f5f1] rounded-xl border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#232331]">Furgoneta Puerta a Puerta #01</div>
                      <div className="text-[11px] text-[#767676]">Bella (Golden) · Domicilio Madrid · 21.5°C</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded border border-orange-200">
                    En ruta a puerta
                  </span>
                </div>

                <div className="p-3.5 bg-[#f8f5f1] rounded-xl border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#232331]">Pet Air Nanny Shuttle</div>
                      <div className="text-[11px] text-[#767676]">Frankfurt → Madrid Barajas · En cabina</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
                    {t.inFlightBadge}
                  </span>
                </div>

                <div className="p-3.5 bg-[#f8f5f1] rounded-xl border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#232331]">Furgoneta Puerta a Puerta #03</div>
                      <div className="text-[11px] text-[#767676]">Luna (Teckel) · Valencia · Entregada en mano</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                    Entregado en puerta
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Grid with PortX Colors */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs text-center">
                <div className="text-3xl font-black text-orange-600 font-heading">{t.statOnTime}</div>
                <div className="text-xs font-semibold text-[#767676] mt-0.5">{t.statOnTimeLabel}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs text-center">
                <div className="text-3xl font-black text-[#232331] font-heading">{t.statPorts}</div>
                <div className="text-xs font-semibold text-[#767676] mt-0.5">{t.statPortsLabel}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs text-center">
                <div className="text-3xl font-black text-[#232331] font-heading">{t.statTeu}</div>
                <div className="text-xs font-semibold text-[#767676] mt-0.5">{t.statTeuLabel}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs text-center">
                <div className="text-3xl font-black text-emerald-600 font-heading">{t.statResponse}</div>
                <div className="text-xs font-semibold text-[#767676] mt-0.5">{t.statResponseLabel}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
