import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Search,
  Ship,
  Plane,
  Truck,
  ArrowRight
} from 'lucide-react';

import vetPuppyImg from '../../assets/images/vet_puppy_crate_1793874325899.jpg';
import containerTerminalImg from '../../assets/images/ocean_container_terminal_1793874343116.jpg';
import heroPetCourierImg from '../../assets/images/hero_pet_courier_1793874202496.jpg';
import freightTruckImg from '../../assets/images/freight_truck_1793874379519.jpg';

export const Hero: React.FC = () => {
  const {
    setCurrentTrackingQuery,
    setActiveView,
    setIsAdminMode
  } = useShipping();

  const [activeSlide, setActiveSlide] = useState<'sea' | 'air' | 'road'>('air');
  const [activeTab, setActiveTab] = useState<'track' | 'login' | 'contact'>('track');
  const [trackingCode, setTrackingCode] = useState('');

  const slides = {
    sea: {
      id: 'sea',
      label: '01 / Sea',
      image: containerTerminalImg,
      subtitle: 'From ocean freight to specialized pet relocation, PortX Global delivers end-to-end supply chain solutions across 170+ countries.'
    },
    air: {
      id: 'air',
      label: '02 / Air',
      image: vetPuppyImg,
      subtitle: 'From ocean freight to pet relocation, PortX Global delivers end-to-end supply chain solutions across 170+ countries.'
    },
    road: {
      id: 'road',
      label: '03 / Road',
      image: heroPetCourierImg,
      subtitle: 'Climate-controlled local van transport and certified door-to-door domestic logistics across all provinces of Spain.'
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = trackingCode.trim();
    if (query) {
      setCurrentTrackingQuery(query);
      setIsAdminMode(false);
      setActiveView('track');
    }
  };

  const currentSlideData = slides[activeSlide];

  return (
    <div className="relative w-full min-h-[620px] lg:min-h-[720px] bg-slate-900 overflow-hidden flex flex-col justify-between text-white">
      {/* High-Resolution Photographic Hero Background matching Gradlyn Global */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentSlideData.image}
          alt="PortX Global Logistics"
          className="w-full h-full object-cover object-center transition-all duration-700 brightness-75 scale-100"
        />
        {/* Subtle Dark Gradient Overlay for optimal typographic contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/60 pointer-events-none"></div>
      </div>

      {/* Slide Navigation Switcher on Right Edge (01 / Sea, 02 / Air, 03 / Road) */}
      <div className="absolute right-4 sm:right-8 top-28 sm:top-36 z-20 flex flex-col gap-2.5">
        {(['sea', 'air', 'road'] as const).map((sKey) => {
          const s = slides[sKey];
          const isActive = activeSlide === sKey;
          return (
            <button
              key={sKey}
              onClick={() => setActiveSlide(sKey)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap text-right ${
                isActive
                  ? 'bg-white text-slate-900 shadow-lg scale-105'
                  : 'bg-white/80 hover:bg-white text-slate-800 backdrop-blur-xs'
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Top Left Content: Mission statement, Mode icons, and Floating News pill */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 w-full">
        <div className="max-w-xl space-y-4">
          {/* Subtitle description */}
          <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed drop-shadow-sm">
            {currentSlideData.subtitle}
          </p>

          {/* Transport Mode Icon Badges */}
          <div className="flex items-center gap-2.5 pt-1">
            <button
              onClick={() => setActiveSlide('sea')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeSlide === 'sea' ? 'bg-red-600 text-white shadow-md' : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md'
              }`}
              title="Sea Freight"
            >
              <Ship className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveSlide('air')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeSlide === 'air' ? 'bg-red-600 text-white shadow-md' : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md'
              }`}
              title="Air & Pet Flight Relocation"
            >
              <Plane className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveSlide('road')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeSlide === 'road' ? 'bg-red-600 text-white shadow-md' : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md'
              }`}
              title="Door-to-Door Road Transit"
            >
              <Truck className="w-5 h-5" />
            </button>
          </div>

          {/* Floating News / Insight Pill Card */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 transition-all cursor-pointer shadow-lg group">
              <img
                src={freightTruckImg}
                alt="Corridor capacity"
                className="w-12 h-9 rounded-lg object-cover shrink-0"
              />
              <span className="text-xs text-slate-100 font-medium leading-tight max-w-xs group-hover:text-white">
                Ocean freight rates stabilize as PortX Global expands Asia-Europe corridor capacity for...
              </span>
              <ArrowRight className="w-4 h-4 text-white opacity-80 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Area: Massive Headline (Left) & Floating Track & Trace Widget (Right) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Big Bold Headline matching Gradlyn Global */}
          <div className="lg:col-span-7 relative">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-heading uppercase leading-[1.08] drop-shadow-md">
              MOVING THE WORLD'S <br className="hidden sm:inline" />
              MOST IMPORTANT CARGO
            </h1>

            {/* Floating Round Badge "Contacts 0" / "24/7 Ops" */}
            <div className="hidden sm:flex absolute -right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 text-slate-900 border-2 border-white shadow-xl flex-col items-center justify-center text-center p-1 backdrop-blur-xs select-none">
              <span className="text-[10px] font-black leading-none uppercase">Contacts</span>
              <span className="text-xs font-black text-red-600 leading-tight">24/7</span>
            </div>
          </div>

          {/* Floating Track & Trace Card matching Gradlyn Global */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#f8f9fa] rounded-2xl p-5 sm:p-6 shadow-2xl border border-stone-200 text-[#18181b]">
              
              {/* Tab Header Row: Track & Trace | Client Login | Contact Us */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-4 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab('track')}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'track'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  Track & Trace
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setIsAdminMode(true);
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  Client Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('contact');
                    setActiveView('contact');
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'contact'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  Contact Us
                </button>
              </div>

              {/* Track Input Form */}
              <form onSubmit={handleTrackSubmit} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    placeholder="Enter code (example: ABC123456)"
                    className="w-full bg-white text-[#18181b] placeholder-stone-400 px-4 py-3 rounded-xl border border-stone-300 focus:border-red-600 focus:outline-none text-sm font-mono font-medium shadow-2xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-12 h-11 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center justify-center transition-all shadow-md shadow-red-600/25 shrink-0 cursor-pointer"
                  title="Search tracking code"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                <span>Direct real-time GPS telemetry lookup</span>
                <span className="text-stone-400">24/7 Global Dispatch</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
