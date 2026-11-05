import React, { useState, useEffect } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Search,
  Truck,
  Plane,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ShieldCheck,
  User,
  Scale,
  Box,
  Package,
  Hash,
  Plus,
  Minus,
  Copy,
  Check,
  MessageCircle
} from 'lucide-react';
import { ShipmentStatus } from '../../types';

export const TrackingSection: React.FC = () => {
  const {
    t,
    currentTrackingQuery,
    setCurrentTrackingQuery,
    getShipmentByTrackingNumber,
    setSelectedShipmentForPrint
  } = useShipping();

  const [searchInput, setSearchInput] = useState(currentTrackingQuery);
  const [copied, setCopied] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  // Sync search input when query changes
  useEffect(() => {
    setSearchInput(currentTrackingQuery);
  }, [currentTrackingQuery]);

  const searchedShipment = getShipmentByTrackingNumber(currentTrackingQuery);
  const hasQuery = currentTrackingQuery.trim().length > 0;
  // User only sees the shipment they have the tracking number for
  const currentShipment = searchedShipment;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCurrentTrackingQuery(searchInput.trim());
    }
  };

  const handleCopyCode = (code: string) => {
    try {
      navigator.clipboard?.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  // 5 Progress Steps matching Gradlyn Global: Pickup -> Shipped -> In Transit -> Out for Delivery -> Delivered
  const getStepStatus = (status: ShipmentStatus, stepIndex: number) => {
    // 0: Pickup, 1: Shipped, 2: In Transit, 3: Out for Delivery, 4: Delivered
    let activeLevel = 0;
    if (status === 'booked') activeLevel = 0;
    else if (status === 'in_transit') activeLevel = 2;
    else if (status === 'customs_hold') activeLevel = 2;
    else if (status === 'out_for_delivery') activeLevel = 3;
    else if (status === 'delivered') activeLevel = 4;

    const isCompleted = stepIndex < activeLevel;
    const isCurrent = stepIndex === activeLevel;
    return { isCompleted, isCurrent, isReached: stepIndex <= activeLevel };
  };

  const departureFormatted = currentShipment?.departureTimeFormatted || (currentShipment?.departedAt ? new Date(currentShipment.departedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Sep 15');
  const arrivalFormatted = currentShipment?.arrivalTimeFormatted || (currentShipment?.estimatedArrival ? new Date(currentShipment.estimatedArrival).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Sep 15');
  const currentDateFormatted = new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-[#f8f5f1] min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Search Bar */}
        <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-sm max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center flex-1 w-full px-3">
              <Search className="w-5 h-5 text-orange-600 mr-3 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Introduce tu código de seguimiento (ej. VY22261591 o PET-MAD-8492)..."
                className="w-full bg-transparent text-sm sm:text-base text-[#232331] placeholder-stone-400 focus:outline-none font-medium font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-orange-600/20 whitespace-nowrap cursor-pointer"
            >
              Rastrear Envío
            </button>
          </form>
        </div>

        {currentShipment ? (
          /* EXACT GRADLYN GLOBAL 2-COLUMN ARRANGEMENT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: Main Tracking Card + Combined History & Map Card (8 COLS) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* CARD 1: Main Status & Stepper Card */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-7 shadow-sm space-y-6">
                
                {/* Header Row: Tracking Number Pill (Left) and Shipped / Delivery By Badge (Right) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-4 py-1.5 rounded-lg bg-sky-50 text-sky-700 font-black font-mono text-base tracking-wider border border-sky-100 shadow-2xs">
                      {currentShipment.trackingNumber}
                    </span>
                    <button
                      onClick={() => handleCopyCode(currentShipment.trackingNumber)}
                      className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100 transition-colors"
                      title="Copiar código"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-stone-600 font-medium">
                      Shipped: <strong className="text-stone-900 font-bold">{departureFormatted}</strong>
                    </span>
                    <span className="px-3.5 py-1.5 rounded-md bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-xs">
                      DELIVERY BY: {arrivalFormatted}
                    </span>
                  </div>
                </div>

                {/* 2x2 Origin / Destination / Location / Date Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 pt-2">
                  {/* Origin */}
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-semibold text-sky-700/80 uppercase tracking-wider block">
                        Origin
                      </span>
                      <span className="text-sm font-bold text-[#232331]">
                        {currentShipment.origin.city}, {currentShipment.origin.country}
                      </span>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-semibold text-sky-700/80 uppercase tracking-wider block">
                        Destination
                      </span>
                      <span className="text-sm font-bold text-[#232331]">
                        {currentShipment.destination.city}, {currentShipment.destination.country}
                      </span>
                    </div>
                  </div>

                  {/* Current Location */}
                  <div className="flex items-start gap-2.5">
                    <Truck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-semibold text-sky-700/80 uppercase tracking-wider block">
                        Current Location
                      </span>
                      <span className="text-sm font-bold text-[#232331]">
                        {currentShipment.currentLocation.name}
                      </span>
                    </div>
                  </div>

                  {/* Current Date */}
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-semibold text-sky-700/80 uppercase tracking-wider block">
                        Current Date
                      </span>
                      <span className="text-sm font-bold text-[#232331]">
                        {currentDateFormatted}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Full-Width Highlight Banner */}
                <div className="w-full bg-orange-600 text-white py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm text-center shadow-xs tracking-wide">
                  {currentShipment.clientNotice || 'Jaula de Transporte Electrónica Para Mascotas IPATA Pendiente'}
                </div>

                {/* 5-Step Stepper Progress Bar (Pickup -> Shipped -> In Transit -> Out for Delivery -> Delivered) */}
                <div className="pt-4 pb-2">
                  <div className="relative">
                    {/* Background Track Line */}
                    <div className="absolute top-4 left-6 right-6 h-0.5 bg-stone-200 -translate-y-1/2"></div>
                    
                    {/* Active Track Line */}
                    <div
                      className="absolute top-4 left-6 h-0.5 bg-orange-600 -translate-y-1/2 transition-all duration-700"
                      style={{
                        width: `${
                          currentShipment.status === 'delivered' ? 100 :
                          currentShipment.status === 'out_for_delivery' ? 75 :
                          currentShipment.status === 'in_transit' || currentShipment.status === 'customs_hold' ? 50 :
                          25
                        }%`
                      }}
                    ></div>

                    {/* Nodes */}
                    <div className="relative flex justify-between items-center text-center">
                      {[
                        { label: 'Pickup', index: 0 },
                        { label: 'Shipped', index: 1 },
                        { label: 'In Transit', index: 2 },
                        { label: 'Out for Delivery', index: 3 },
                        { label: 'Delivered', index: 4 }
                      ].map((step) => {
                        const { isCompleted, isCurrent, isReached } = getStepStatus(currentShipment.status, step.index);
                        return (
                          <div key={step.label} className="flex flex-col items-center group">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                isCurrent
                                  ? 'bg-orange-600 text-white ring-4 ring-orange-100 shadow-sm'
                                  : isReached
                                  ? 'bg-orange-600 text-white'
                                  : 'bg-stone-100 border-2 border-stone-200 text-stone-400'
                              }`}
                            >
                              {isCurrent ? (
                                <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                              ) : isReached ? (
                                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                              )}
                            </div>
                            <span
                              className={`text-[11px] sm:text-xs font-semibold mt-2.5 block ${
                                isCurrent
                                  ? 'text-orange-600 font-bold'
                                  : isReached
                                  ? 'text-[#232331]'
                                  : 'text-stone-400'
                              }`}
                            >
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>

              {/* CARD 2: Split Card - Tracking History (Left) + Live GIS Map (Right) */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
                
                {/* Left Side: Tracking History & Yellow Sticky Note */}
                <div className="md:col-span-5 p-6 border-b md:border-b-0 md:border-r border-stone-200 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-[#232331] font-heading leading-tight">
                      Tracking History
                    </h3>
                    <div className="text-xs font-mono text-stone-500 font-bold mt-0.5">
                      {currentShipment.trackingNumber}
                    </div>

                    {/* Yellow Sticky Note / Important Client Notice */}
                    <div className="mt-4 bg-[#fff3cd] text-[#856404] border border-[#ffeeba] p-3 rounded-xl text-xs font-bold leading-relaxed shadow-2xs">
                      {currentShipment.clientNotice || 'Jaula de Transporte Electrónica Para Mascotas IPATA Pendiente'}
                    </div>

                    {/* Timeline List */}
                    <div className="mt-6 space-y-4">
                      {currentShipment.milestones && currentShipment.milestones.length > 0 ? (
                        currentShipment.milestones.map((m) => (
                          <div key={m.id} className="flex items-start gap-2.5 text-xs">
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0 mt-1"></div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-[#232331] truncate">
                                  {m.location}
                                </span>
                                <span className="text-[10px] text-stone-400 font-mono shrink-0">
                                  {m.timestamp}
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                                {m.description}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-start gap-2.5 text-xs">
                          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0 mt-1"></div>
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-[#232331]">Pedido de Envío Recibido</span>
                              <span className="text-[10px] text-stone-400 font-mono">{departureFormatted}</span>
                            </div>
                            <p className="text-[11px] text-stone-500 mt-0.5">
                              {currentShipment.origin.city}, {currentShipment.origin.country}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 mt-6">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      IPATA / LAR Certificado
                    </span>
                    <button
                      onClick={() => setSelectedShipmentForPrint(currentShipment)}
                      className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Imprimir Albarán</span>
                    </button>
                  </div>
                </div>

                {/* Right Side: Map Canvas matching Carto Basemap with Zoom & Live Marker */}
                <div className="md:col-span-7 bg-[#f1f5f9] relative overflow-hidden flex items-center justify-center min-h-[300px]">
                  
                  {/* Subtle Carto Watermark & API Key graphic as in screenshot */}
                  <div className="absolute top-4 right-4 text-[11px] font-mono font-bold text-stone-400/50 uppercase select-none pointer-events-none rotate-[-35deg]">
                    API KEY · carto.com/basemaps
                  </div>
                  <div className="absolute bottom-4 left-4 text-[10px] font-mono text-stone-400/60 select-none pointer-events-none">
                    Leaflet | © OpenStreetMap contributors © CARTO
                  </div>

                  {/* Zoom Controls (+ / -) in Upper Left */}
                  <div className="absolute top-4 left-4 flex flex-col bg-white rounded-lg border border-stone-300 shadow-sm z-10 overflow-hidden">
                    <button
                      onClick={() => setMapZoom((prev) => Math.min(prev + 0.2, 1.8))}
                      className="p-1.5 text-stone-700 hover:bg-stone-100 border-b border-stone-200 cursor-pointer"
                      title="Zoom in"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setMapZoom((prev) => Math.max(prev - 0.2, 0.8))}
                      className="p-1.5 text-stone-700 hover:bg-stone-100 cursor-pointer"
                      title="Zoom out"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* SVG Geographic Map & Route Line Canvas */}
                  <div
                    className="w-full h-full p-4 flex items-center justify-center transition-transform duration-300"
                    style={{ transform: `scale(${mapZoom})` }}
                  >
                    <svg className="w-full h-full max-h-[360px]" viewBox="0 0 500 320" fill="none">
                      {/* Stylized background terrain contours */}
                      <path d="M40 80 Q 120 40 200 90 T 360 80 T 480 120" stroke="#e2e8f0" strokeWidth="3" fill="none" />
                      <path d="M20 180 Q 140 160 220 220 T 420 200" stroke="#e2e8f0" strokeWidth="2.5" fill="none" />
                      <path d="M80 260 Q 220 280 320 240 T 460 270" stroke="#e2e8f0" strokeWidth="2" fill="none" />

                      {/* Route Arc from Origin (Bottom Left) to Destination (Top Right) */}
                      <path
                        d="M 90 240 Q 220 180 340 90"
                        stroke="#60a5fa"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Origin Node */}
                      <circle cx="90" cy="240" r="6" fill="#3b82f6" />
                      <circle cx="90" cy="240" r="12" fill="#3b82f6" fillOpacity="0.2" />
                      <text x="90" y="265" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">
                        {currentShipment.origin.city}
                      </text>

                      {/* Destination Node */}
                      <circle cx="340" cy="90" r="6" fill="#10b981" />
                      <circle cx="340" cy="90" r="12" fill="#10b981" fillOpacity="0.2" />
                      <text x="340" y="70" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">
                        {currentShipment.destination.city}
                      </text>

                      {/* Moving Marker on the Arc (Calculated near middle-right matching screenshot) */}
                      <g transform="translate(265, 128)">
                        {/* Radar Pulse Rings */}
                        <circle cx="0" cy="0" r="18" fill="#38bdf8" fillOpacity="0.3" className="animate-ping" />
                        <circle cx="0" cy="0" r="12" fill="#0284c7" />
                        {/* Transport Plane / Vehicle Icon */}
                        <path
                          d="M -5 -2 L 0 -7 L 5 -2 L 7 2 L 2 2 L 0 6 L -2 2 L -7 2 Z"
                          fill="white"
                          transform="rotate(45)"
                        />
                      </g>
                    </svg>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: 3 Exact Gradlyn Sidebar Cards (4 COLS) */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* CARD 1: Destination Address */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                    Destination Address
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    {currentShipment.destination.country || 'España'}
                  </span>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <User className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-[#232331] text-base leading-snug">
                      {currentShipment.consignee.name}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {currentShipment.doorstepDelivery?.receiverDoorAddress || currentShipment.consignee.address || 'Pl. de la Romera, 5, 6b'}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mt-2.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>| {currentShipment.destination.city} | {currentShipment.doorstepDelivery?.receiverPostalCode || '21006'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: Origin Address */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="px-2.5 py-0.5 rounded bg-orange-50 text-orange-700 text-xs font-bold border border-orange-100">
                    Origin Address
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    {currentShipment.origin.country || 'España'}
                  </span>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <User className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-[#232331] text-base leading-snug">
                      {currentShipment.sender.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-orange-800 font-semibold mt-2">
                      <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>{currentShipment.origin.city} | {currentShipment.origin.country} | 39150</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 3: Package Details */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
                <div className="pb-2 border-b border-stone-100">
                  <span className="px-2.5 py-0.5 rounded bg-sky-50 text-sky-700 text-xs font-bold border border-sky-100">
                    Package Details
                  </span>
                </div>

                {/* 2x2 Grid of Specs with Icons */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  {/* Weight */}
                  <div className="flex items-start gap-2">
                    <Scale className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] text-stone-500 font-medium block">Weight</span>
                      <span className="text-sm font-bold text-[#232331] font-mono">
                        {currentShipment.cargo.weightKg} kg
                      </span>
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="flex items-start gap-2">
                    <Box className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] text-stone-500 font-medium block">Dimensions</span>
                      <span className="text-xs font-bold text-[#232331] font-mono">
                        {currentShipment.cargo.dimensions || 'L: 0 × W: 0 × H: 0 cm'}
                      </span>
                    </div>
                  </div>

                  {/* Package Type */}
                  <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] text-stone-500 font-medium block">Package Type</span>
                      <span className="text-xs font-bold text-[#232331] line-clamp-2">
                        {currentShipment.petInfo ? `${currentShipment.petInfo.breed} (${currentShipment.petInfo.speciesLabel || 'Mascota'})` : 'Transporte de Mascotas'}
                      </span>
                    </div>
                  </div>

                  {/* Reference Number */}
                  <div className="flex items-start gap-2">
                    <Hash className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] text-stone-500 font-medium block">Reference Number</span>
                      <span className="text-xs font-bold text-[#232331] font-mono">
                        {currentShipment.bookingRef || currentShipment.bolNumber || currentShipment.trackingNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Help */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <a
                    href={`https://wa.me/34602493512?text=${encodeURIComponent(`Hola, solicito asistencia sobre el envío: ${currentShipment.trackingNumber}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Despacho (+34602493512)</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        ) : hasQuery ? (
          /* Searched code but not found - NO OTHER TRACKING NUMBERS */
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-600">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#232331] font-heading">
              {t.noShipmentFoundTitle}
            </h3>
            <p className="text-[#767676] text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
              No se ha encontrado ningún envío con el código <strong className="text-[#232331] font-mono">"{currentTrackingQuery}"</strong>. Comprueba si hay errores en el código o ponte en contacto con nuestro equipo de despacho para verificar tu número.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setCurrentTrackingQuery('');
                  setSearchInput('');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 cursor-pointer"
              >
                Probar con Otro Código
              </button>
              <a
                href={`https://wa.me/34602493512?text=${encodeURIComponent(`Hola, tengo una consulta sobre mi código de seguimiento: ${currentTrackingQuery}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Contactar Despacho (+34602493512)</span>
              </a>
            </div>
          </div>
        ) : (
          /* Empty State: Private Tracking Gateway */
          <div className="text-center py-14 bg-white rounded-2xl border border-stone-200 p-6 sm:p-12 shadow-sm max-w-2xl mx-auto">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl border border-orange-200 flex items-center justify-center mx-auto mb-4 text-orange-600">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#232331] font-heading">
              Portal Privado de Seguimiento
            </h3>
            <p className="text-[#767676] text-xs sm:text-sm mt-2.5 max-w-md mx-auto leading-relaxed">
              Por estrictas razones de privacidad y protección de datos, cada traslado es confidencial. Introduce en la casilla superior el número de seguimiento único emitido para tu mascota para acceder a su telemetría, horarios y estado.
            </p>

            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Acceso Exclusivo y Confidencial
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-orange-600" />
                Despacho 24/7 (+34602493512)
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
