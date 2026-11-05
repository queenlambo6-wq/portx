import React from 'react';
import { ArrowUpRight, ArrowRight, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import { useShipping } from '../../context/ShippingContext';

import petFlightCareImg from '../../assets/images/pet_flight_care_1793874246347.jpg';
import warehouseRacksImg from '../../assets/images/warehouse_racks_1793874360828.jpg';
import doorstepDeliveryImg from '../../assets/images/doorstep_delivery_1793874225907.jpg';
import freightTruckImg from '../../assets/images/freight_truck_1793874379519.jpg';
import oceanTerminalImg from '../../assets/images/ocean_container_terminal_1793874343116.jpg';
import woodenWorldMapImg from '../../assets/images/wooden_world_map_1793875097474.jpg';

interface GradlynShowcaseProps {
  onOpenBookingModal?: () => void;
}

export const GradlynShowcase: React.FC<GradlynShowcaseProps> = ({ onOpenBookingModal }) => {
  const { setActiveView, setIsAdminMode } = useShipping();

  const expertiseCards = [
    {
      category: 'Service guide',
      title: 'Ocean & air freight: how to choose the right mode for your cargo and live animals',
      image: petFlightCareImg
    },
    {
      category: 'Case study',
      title: 'How PortX Global reduced cross-border transit times by 38% across European corridors',
      image: warehouseRacksImg
    },
    {
      category: 'Report',
      title: 'Supply chain resilience: building temperature-controlled redundancy into live transit',
      image: doorstepDeliveryImg
    },
    {
      category: 'Insight',
      title: 'Container shipping: FCL vs LCL and how to right-size door-to-door deliveries in Spain',
      image: freightTruckImg
    }
  ];

  // Exact reviews customized for PortX Global
  const reviewsRow1 = [
    {
      quote: "“Their visibility platform flagged a port delay before our carrier even told us — and they rerouted automatically. That's the difference between a vendor and a partner.”",
      name: "Priya Nair",
      title: "Logistics Director, Brightline Tech",
      initials: "PN",
      tag: "TECHNOLOGY"
    },
    {
      quote: "“They flew our golden retriever puppy from Texas to London door-to-door. Photo updates at every stop, and he arrived calm and happy. I cried when I saw him.”",
      name: "Hannah Whitfield",
      title: "Founder, Whitfield Kennels",
      initials: "HW",
      tag: "PET RELOCATION"
    },
    {
      quote: "“GDP-compliant, temperature-logged end to end. Our vaccine shipments arrive within 0.3°C of target. Audit after audit, they pass flawlessly.”",
      name: "Dr. Lena Brückner",
      title: "Head of Distribution, BioVance Pharma",
      initials: "DL",
      tag: "PHARMA COLD CHAIN"
    },
    {
      quote: "“High-volume tyre imports handled with zero customs delays. Port clearance within 24h of vessel arrival. Outstanding service.”",
      name: "Henry Caldwell",
      title: "Import Manager, Apex Motors",
      initials: "HC",
      tag: "AUTOMOTIVE"
    }
  ];

  const reviewsRow2 = [
    {
      quote: "“We relocated to Singapore with two dogs and a senior cat. PortX Global handled quarantine, flights and home delivery. Our whole family arrived together.”",
      name: "Aisha Bello",
      title: "Family Client, Singapore Expat",
      initials: "AB",
      tag: "PET RELOCATION"
    },
    {
      quote: "“Store replenishment across 300 outlets, synced to our POS data. Shelves stay full, backrooms stay lean. Exactly what omnichannel needs.”",
      name: "Lucas Romano",
      title: "Head of Retail Logistics, Lumina Brands",
      initials: "LR",
      tag: "CONSUMER & RETAIL"
    },
    {
      quote: "“Our Persian kittens travelled internationally in IATA crates with a dedicated handler. Vet paperwork sorted, customs cleared, families overjoyed.”",
      name: "Amina Yusuf",
      title: "Founder, Little Paws Cattery",
      initials: "AY",
      tag: "PET RELOCATION"
    },
    {
      quote: "“Charter airfreight cleared and delivered inside a critical 6-hour window for our automotive assembly line in Germany. Zero line stoppages.”",
      name: "Markus Weber",
      title: "Supply Director, Weber Precision",
      initials: "MW",
      tag: "MANUFACTURING"
    }
  ];

  const handleOpenBooking = () => {
    if (onOpenBookingModal) {
      onOpenBookingModal();
    } else {
      setActiveView('calculator');
      setIsAdminMode(false);
    }
  };

  const handleOpenTracking = () => {
    setActiveView('track');
    setIsAdminMode(false);
  };

  return (
    <div className="space-y-0 bg-white">
      
      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: Explore our expertise                              */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#18181b] font-heading tracking-tight">
              Explore our expertise
            </h2>
            <button
              onClick={() => {
                setActiveView('services');
                setIsAdminMode(false);
              }}
              className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos los servicios</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseCards.map((card, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveView('services');
                  setIsAdminMode(false);
                }}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
                    <span className="uppercase tracking-wider text-[11px] font-bold text-red-600">
                      {card.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-red-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="text-sm font-bold text-[#18181b] leading-snug group-hover:text-red-600 transition-colors">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: WHY PORTX GLOBAL                                   */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-stone-50/70 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Text & Credibility */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600">
                <span className="w-8 h-0.5 bg-red-600"></span>
                <span>WHY PORTX GLOBAL</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18181b] font-heading tracking-tight leading-[1.12]">
                A supply chain partner built for the complexity of global trade.
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                The logistics market is full of point solutions. PortX Global's strength is integration: one partner across freight modes, temperature-controlled veterinary transit, warehouse operations, and customs clearance across 170+ countries.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-semibold text-stone-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>IATA LAR Animal Standard</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Door-to-Door Local Vans</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>100% Real-Time Telemetry</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Customs & Health Passports</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => {
                    setActiveView('about');
                    setIsAdminMode(false);
                  }}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Conoce Nuestra Red Global</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: High-Bay Warehouse Photography */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 aspect-4/3 sm:aspect-16/10">
                <img
                  src={warehouseRacksImg}
                  alt="High-Bay Distribution Warehouse"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-white/60 shadow-lg flex items-center justify-between text-xs">
                  <span className="font-bold text-[#18181b]">Centro Logístico Central · Hub Intermodal</span>
                  <span className="text-red-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Auditado ISO 9001
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: CORE SERVICE                                       */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading, Copy & Action Button */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600">
                <span className="w-8 h-0.5 bg-red-600"></span>
                <span>CORE SERVICE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18181b] font-heading tracking-tight leading-[1.12]">
                World-class container shipping & pet relocation logistics
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                Move more for less with full-container-load (FCL) and specialized live animal transport services across every major trade lane. From dry boxes to reefer and live animal certified transport, our dedicated teams handle booking, customs, and door-to-door delivery across 170+ countries — with real-time visibility on every consignment.
              </p>

              <div className="pt-3">
                <button
                  onClick={() => {
                    setActiveView('calculator');
                    setIsAdminMode(false);
                  }}
                  className="px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/25 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>EXPLORE CONTAINER SHIPPING & RATES</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Aerial Container Terminal Photograph */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 aspect-4/3 sm:aspect-16/10">
                <img
                  src={oceanTerminalImg}
                  alt="World-class container terminal and maritime port"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-lg">
                  170+ Global Trade Lanes
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: CLIENT STORIES & ANIMATED REVIEWS MARQUEE          */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-stone-50/70 py-16 sm:py-24 overflow-hidden border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600">
              <span className="w-8 h-0.5 bg-red-600"></span>
              <span>CLIENT STORIES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18181b] font-heading tracking-tight leading-[1.15]">
              Trusted across every industry — from full container loads to a single puppy.
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
              Thirty thousand shipments a day, one standard of care. Here's what manufacturers, retailers, families, and first-time shippers say about moving with PortX Global.
            </p>
          </div>

          {/* 4 Stat Cards in a Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 mb-14">
            
            <div className="bg-white rounded-2xl border border-stone-200 border-l-4 border-l-red-600 p-5 sm:p-6 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#18181b] font-heading tracking-tight">
                4.9/5
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 mt-2">
                AVERAGE CLIENT RATING
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 border-l-4 border-l-red-600 p-5 sm:p-6 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#18181b] font-heading tracking-tight">
                98%
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 mt-2">
                ON-TIME DELIVERY
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 border-l-4 border-l-red-600 p-5 sm:p-6 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#18181b] font-heading tracking-tight">
                170+
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 mt-2">
                COUNTRIES SERVED
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 border-l-4 border-l-red-600 p-5 sm:p-6 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#18181b] font-heading tracking-tight">
                30,000+
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 mt-2">
                SHIPMENTS A DAY
              </div>
            </div>

          </div>

        </div>

        {/* ANIMATED REVIEWS MARQUEE (Red & White Theme) */}
        <div className="space-y-6 pt-2">
          
          {/* Row 1: Leftward continuous scroll */}
          <div className="flex overflow-hidden group select-none">
            <div className="animate-marquee-infinite flex gap-6">
              {[...reviewsRow1, ...reviewsRow1].map((review, idx) => (
                <div
                  key={`r1-${idx}`}
                  className="w-[360px] sm:w-[420px] bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between shrink-0"
                >
                  <div>
                    {/* 5 Red Stars */}
                    <div className="flex items-center gap-1 text-red-600 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-red-600 text-red-600" />
                      ))}
                    </div>

                    {/* Review Quote */}
                    <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-medium">
                      {review.quote}
                    </p>
                  </div>

                  {/* Author Meta Row */}
                  <div className="flex items-center justify-between pt-6 mt-4 border-t border-stone-100">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {review.initials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-[#18181b] truncate">
                          {review.name}
                        </h4>
                        <p className="text-xs text-stone-500 truncate">
                          {review.title}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 ml-2 px-2.5 py-1 rounded-md bg-red-50 text-red-700 font-bold text-[10px] sm:text-xs uppercase tracking-wider border border-red-200">
                      {review.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Rightward/Offset continuous scroll */}
          <div className="flex overflow-hidden group select-none">
            <div className="animate-marquee-infinite-reverse flex gap-6">
              {[...reviewsRow2, ...reviewsRow2].map((review, idx) => (
                <div
                  key={`r2-${idx}`}
                  className="w-[360px] sm:w-[420px] bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between shrink-0"
                >
                  <div>
                    {/* 5 Red Stars */}
                    <div className="flex items-center gap-1 text-red-600 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-red-600 text-red-600" />
                      ))}
                    </div>

                    {/* Review Quote */}
                    <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-medium">
                      {review.quote}
                    </p>
                  </div>

                  {/* Author Meta Row */}
                  <div className="flex items-center justify-between pt-6 mt-4 border-t border-stone-100">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {review.initials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-[#18181b] truncate">
                          {review.name}
                        </h4>
                        <p className="text-xs text-stone-500 truncate">
                          {review.title}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 ml-2 px-2.5 py-1 rounded-md bg-red-50 text-red-700 font-bold text-[10px] sm:text-xs uppercase tracking-wider border border-red-200">
                      {review.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: READY TO OPTIMIZE YOUR SUPPLY CHAIN? (CTA CARD)    */}
      {/* Crimson / Red & White styling with wooden world map image     */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 bg-gradient-to-br from-red-700 via-red-800 to-red-950">
            
            {/* Left Content */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6 text-white">
              
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-200">
                <span className="w-8 h-0.5 bg-red-300"></span>
                <span>SUPPLY CHAIN EXCELLENCE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight leading-tight">
                Ready to optimize your supply chain?
              </h2>

              <p className="text-red-100/90 text-sm sm:text-base leading-relaxed font-normal">
                PortX Global delivers end-to-end logistics solutions — from freight management and contract logistics to customs brokerage and 4PL services — connecting your business to markets in 170+ countries.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleOpenBooking}
                  className="px-7 py-3.5 bg-white hover:bg-red-50 text-red-700 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer whitespace-nowrap"
                >
                  GET A QUOTE
                </button>
                <button
                  onClick={handleOpenTracking}
                  className="px-7 py-3.5 bg-red-950/70 hover:bg-red-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-red-400/30 transition-all cursor-pointer whitespace-nowrap"
                >
                  TRACK SHIPMENT
                </button>
              </div>

            </div>

            {/* Right Side: Authentic Wooden World Map */}
            <div className="lg:col-span-6 relative aspect-4/3 lg:aspect-auto min-h-[320px] overflow-hidden">
              <img
                src={woodenWorldMapImg}
                alt="3D Wooden World Map with Global Network Pins"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 via-transparent to-transparent pointer-events-none lg:hidden"></div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
