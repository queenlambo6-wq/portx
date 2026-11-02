import React, { useState } from 'react';
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
  FileText,
  Printer,
  Thermometer,
  ShieldCheck,
  Heart,
  Home,
  Phone,
  Sparkles,
  UserCheck,
  Award
} from 'lucide-react';
import { TransportMode, ShipmentStatus } from '../../types';

export const TrackingSection: React.FC = () => {
  const {
    t,
    language,
    shipments,
    currentTrackingQuery,
    setCurrentTrackingQuery,
    getShipmentByTrackingNumber,
    setSelectedShipmentForPrint,
    setIsAdminMode,
    setAdminSubView
  } = useShipping();

  const [searchInput, setSearchInput] = useState(currentTrackingQuery);
  const currentShipment = getShipmentByTrackingNumber(currentTrackingQuery) || shipments[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCurrentTrackingQuery(searchInput.trim());
    }
  };

  const getModeIcon = (mode: TransportMode) => {
    switch (mode) {
      case 'air_freight':
        return <Plane className="w-4 h-4 text-blue-600" />;
      case 'road_transport':
      default:
        return <Truck className="w-4 h-4 text-orange-600" />;
    }
  };

  const getStatusBadge = (status: ShipmentStatus) => {
    const statusLabels: Record<string, Record<ShipmentStatus, string>> = {
      es: {
        booked: 'Reserva Confirmada',
        in_transit: 'En Tránsito Climatizado',
        customs_hold: 'Revisión Veterinaria',
        out_for_delivery: 'En Furgoneta hacia tu Puerta',
        delivered: 'Entregado en Mano en Puerta',
        exception: 'Atención Especial'
      },
      en: {
        booked: 'Booking Confirmed',
        in_transit: 'In Climate Transit (21°C)',
        customs_hold: 'Veterinary Check',
        out_for_delivery: 'In Van to Receiver Doorstep',
        delivered: 'Safely Handed at Doorstep',
        exception: 'Special Care Required'
      },
      de: {
        booked: 'Buchung Bestätigt',
        in_transit: 'Im klimatisierten Transit',
        customs_hold: 'Tierarztprüfung',
        out_for_delivery: 'In Zustellung an die Haustür',
        delivered: 'An der Haustür Übergeben',
        exception: 'Besondere Betreuung'
      }
    };

    const currentMap = statusLabels[language] || statusLabels.es;
    const label = currentMap[status] || status;

    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {label}
          </span>
        );
      case 'in_transit':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
            {label}
          </span>
        );
      case 'customs_hold':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            {label}
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-900 border border-orange-300 shadow-2xs">
            <Home className="w-3.5 h-3.5 text-orange-600 animate-bounce" />
            {label}
          </span>
        );
      case 'exception':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            {label}
          </span>
        );
      case 'booked':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-stone-100 text-stone-700 border border-stone-300">
            <Clock className="w-3.5 h-3.5" />
            {label}
          </span>
        );
    }
  };

  return (
    <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title & Search Bar */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-wider mb-3">
          <Heart className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
          <span>{t.trackingHeaderBadge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#232331] font-heading tracking-tight">
          {t.trackingHeading}
        </h1>
        <p className="mt-2 text-sm text-[#767676]">
          {t.trackingSubheading}
        </p>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row items-center gap-2 bg-white p-2 rounded-2xl border-2 border-orange-300 shadow-lg">
          <div className="flex items-center flex-1 w-full px-3">
            <Search className="w-5 h-5 text-orange-600 mr-3 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t.trackInputPlaceholder}
              className="w-full bg-transparent text-sm sm:text-base text-[#232331] placeholder-stone-400 focus:outline-none font-medium"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-orange-600/20 whitespace-nowrap cursor-pointer"
          >
            {t.trackButton}
          </button>
        </form>

        {/* Quick Sample Tracking Numbers */}
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs text-[#767676]">
          <span className="font-semibold text-stone-500">{t.quickTestLabel}</span>
          {shipments.slice(0, 5).map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSearchInput(s.trackingNumber);
                setCurrentTrackingQuery(s.trackingNumber);
              }}
              className={`px-2.5 py-1 rounded text-xs transition-colors font-mono font-bold cursor-pointer flex items-center gap-1 ${
                currentShipment?.trackingNumber === s.trackingNumber
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white hover:bg-orange-50 text-stone-700 border border-stone-200'
              }`}
            >
              <span>{s.trackingNumber}</span>
              {s.petInfo && <span className="opacity-80 font-sans">({s.petInfo.petName})</span>}
            </button>
          ))}
        </div>
      </div>

      {currentShipment ? (
        <div className="space-y-8">
          {/* Main Status & Pet Banner Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
              
              {/* Pet Identity & Avatar */}
              <div className="flex items-start sm:items-center gap-4">
                {currentShipment.petInfo?.avatarUrl ? (
                  <img
                    src={currentShipment.petInfo.avatarUrl}
                    alt={currentShipment.petInfo.petName}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-orange-400 shadow-md shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center border-2 border-orange-200 shrink-0">
                    <Heart className="w-8 h-8 fill-orange-600" />
                  </div>
                )}

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl sm:text-3xl font-black text-[#232331] font-heading tracking-tight">
                      {currentShipment.petInfo ? currentShipment.petInfo.petName : currentShipment.trackingNumber}
                    </h2>
                    {currentShipment.petInfo && (
                      <span className="px-3 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                        {currentShipment.petInfo.breed} · {currentShipment.petInfo.age}
                      </span>
                    )}
                    {getStatusBadge(currentShipment.status)}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#767676] mt-2">
                    <span className="font-mono bg-[#f8f5f1] px-2 py-0.5 rounded border border-stone-200 text-[#232331] font-bold">
                      {currentShipment.trackingNumber}
                    </span>
                    <span>·</span>
                    <span>Microchip: <strong className="text-[#232331] font-mono">{currentShipment.petInfo?.microchipNumber || currentShipment.containerNumber}</strong></span>
                    <span>·</span>
                    <span>Pasaporte UE: <strong className="text-[#232331] font-mono">{currentShipment.petInfo?.healthPassportNumber || currentShipment.bolNumber}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedShipmentForPrint(currentShipment)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#f8f5f1] hover:bg-stone-200/80 text-[#232331] text-xs font-bold rounded-xl border border-stone-300 transition-colors shadow-2xs cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-orange-600" />
                  <span>{t.printWaybillBtn}</span>
                </button>
                <button
                  onClick={() => {
                    setIsAdminMode(true);
                    setAdminSubView('milestones');
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold rounded-xl border border-orange-200 transition-colors cursor-pointer"
                  title="Actualizar estado en panel de control"
                >
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span>{t.dispatchUpdateBtn}</span>
                </button>
              </div>
            </div>

            {/* HIGH-VISIBILITY LOCAL DOORSTEP DELIVERY BANNER */}
            <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div className="space-y-1.5 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-xs">
                    <Home className="w-3.5 h-3.5" />
                    <span>{t.doorstepDeliveryBadge}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black font-heading leading-tight">
                    {t.doorstepDeliveryHeadline}
                  </h3>
                  <p className="text-xs sm:text-sm text-orange-50 leading-relaxed">
                    {currentShipment.doorstepDelivery?.receiverDoorAddress
                      ? `Destino: ${currentShipment.doorstepDelivery.receiverDoorAddress}, ${currentShipment.destination.city}`
                      : currentShipment.destination.portName}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
                  <a
                    href="tel:+34602493512"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-black text-xs transition-colors shadow-md cursor-pointer whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 fill-orange-600 text-orange-600" />
                    <span>{t.callCourierBtn}</span>
                  </a>
                </div>
              </div>

              {/* Doorstep Progress Tracker */}
              <div className="mt-6 pt-5 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-orange-200 uppercase font-bold block mb-1">Cuidador / Conductor:</span>
                  <span className="font-bold flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-orange-200" />
                    {currentShipment.doorstepDelivery?.courierHandlerName || 'Cuidador PortX Asignado'}
                  </span>
                </div>

                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-orange-200 uppercase font-bold block mb-1">Hora Estimada en Puerta:</span>
                  <span className="font-bold flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-orange-200" />
                    {currentShipment.doorstepDelivery?.estimatedDoorArrivalTime || 'Hoy en ventana coordinada'}
                  </span>
                </div>

                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-orange-200 uppercase font-bold block mb-1">Cabina Climatizada:</span>
                  <span className="font-bold flex items-center gap-1.5 font-mono">
                    <Thermometer className="w-3.5 h-3.5 text-orange-200" />
                    {currentShipment.temperatureCelsius || 21.5}°C Constante
                  </span>
                </div>

                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-orange-200 uppercase font-bold block mb-1">Firma en Puerta:</span>
                  <span className="font-bold flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-orange-200" />
                    {currentShipment.doorstepDelivery?.handoverProof?.signatureVerified
                      ? 'Verificada y Firmada'
                      : 'Recepción en Mano'}
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Route Journey Bar */}
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Origin */}
                <div className="bg-[#f8f5f1] p-4 rounded-xl border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                    {t.portOfLoading}
                  </span>
                  <div className="text-lg font-bold text-[#232331] mt-1">
                    {currentShipment.origin.city}, {currentShipment.origin.country}
                  </div>
                  <p className="text-xs text-[#767676] mt-0.5">{currentShipment.origin.portName}</p>
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-3 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-orange-600" />
                    <span>{t.departedDate}: {new Date(currentShipment.departedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Current Location & Progress */}
                <div className="text-center px-4 flex flex-col items-center">
                  <div className="text-xs font-bold text-orange-600 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 animate-bounce" />
                    <span>{t.currentCheckpoint}</span>
                  </div>
                  <div className="text-sm font-bold text-[#232331] mt-1 max-w-xs">
                    {currentShipment.currentLocation.name}
                  </div>
                  {currentShipment.currentLocation.weather && (
                    <span className="text-[11px] text-[#767676] mt-1">
                      {currentShipment.currentLocation.weather}
                    </span>
                  )}

                  {/* Progress Line */}
                  <div className="w-full mt-4">
                    <div className="flex justify-between text-[11px] text-[#767676] font-mono mb-1 font-semibold">
                      <span>{t.transitProgress}</span>
                      <span className="text-orange-600 font-bold">{currentShipment.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-600 rounded-full transition-all duration-1000"
                        style={{ width: `${currentShipment.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Destination / Receiver Doorstep */}
                <div className="bg-[#f8f5f1] p-4 rounded-xl border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider flex items-center gap-1">
                    <Home className="w-3 h-3" />
                    {t.portOfDischarge}
                  </span>
                  <div className="text-lg font-bold text-[#232331] mt-1">
                    {currentShipment.destination.city}, {currentShipment.destination.country}
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5 font-medium">
                    {currentShipment.doorstepDelivery?.receiverDoorAddress || currentShipment.destination.portName}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 mt-3 font-bold">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.estimatedArrival}: {currentShipment.doorstepDelivery?.estimatedDoorArrivalTime || new Date(currentShipment.estimatedArrival).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid: Left Milestones / Right Pet Welfare Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Milestone Timeline */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
                <div>
                  <h3 className="text-lg font-bold text-[#232331] font-heading">
                    {t.milestonesTitle}
                  </h3>
                  <p className="text-xs text-[#767676]">
                    {t.milestonesSubtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>IATA LAR Animal Welfare Standard</span>
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="relative pl-6 space-y-7 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200">
                {currentShipment.milestones.map((m) => (
                  <div key={m.id} className="relative group">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        m.isCurrent
                          ? 'bg-orange-600 border-white ring-4 ring-orange-100'
                          : m.isCompleted
                          ? 'bg-emerald-600 border-white'
                          : 'bg-stone-100 border-stone-300'
                      }`}
                    >
                      {m.isCompleted && !m.isCurrent && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      )}
                      {m.isCurrent && (
                        <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                      )}
                    </div>

                    <div className={`p-4 rounded-xl border transition-all ${
                      m.isCurrent
                        ? 'bg-orange-50/70 border-orange-200 shadow-2xs'
                        : 'bg-[#f8f5f1] border-stone-200 hover:bg-stone-100/60'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-sm text-[#232331] flex items-center gap-2">
                          {m.location}
                          {m.isCurrent && (
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-orange-600 text-white uppercase tracking-wider">
                              {t.currentCheckpoint}
                            </span>
                          )}
                        </span>
                        <span className="text-xs font-mono text-[#767676] font-medium">{m.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#767676] leading-relaxed">{m.description}</p>
                      {m.operator && (
                        <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
                          <span className="font-medium text-stone-400">Cuidador / Oficial:</span>
                          <span className="font-semibold text-stone-700">{m.operator}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Pet Specifications & Welfare Dossier */}
            <div className="space-y-6">
              {/* Pet Info Card */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#232331] font-heading mb-4 flex items-center gap-2 pb-3 border-b border-stone-100">
                  <Heart className="w-4 h-4 text-orange-600 fill-orange-600" />
                  {t.cargoSpecsTitle}
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-[#767676] font-medium">Nombre de la Mascota</span>
                    <span className="font-bold text-orange-600 text-sm">
                      {currentShipment.petInfo?.petName || 'Mascota en Custodia'}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-[#767676] font-medium">Raza y Especie</span>
                    <span className="font-bold text-[#232331] text-right">
                      {currentShipment.petInfo ? `${currentShipment.petInfo.breed} (${currentShipment.petInfo.speciesLabel})` : currentShipment.cargo.description}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-[#767676] font-medium">Nº Microchip Oficial</span>
                    <span className="font-bold text-[#232331] font-mono">
                      {currentShipment.petInfo?.microchipNumber || currentShipment.containerNumber}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-[#767676] font-medium">Pasaporte Sanitario</span>
                    <span className="font-bold text-[#232331] font-mono">
                      {currentShipment.petInfo?.healthPassportNumber || currentShipment.sealNumber}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-[#767676] font-medium">{t.grossWeightLabel}</span>
                    <span className="font-bold text-[#232331] font-mono">
                      {currentShipment.cargo.weightKg} kg
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-[#767676] font-medium">Modelo de Transportín</span>
                    <span className="font-bold text-[#232331] text-right max-w-[170px]">
                      {currentShipment.petInfo?.crateModel || currentShipment.cargo.dimensions || 'IATA Homologado'}
                    </span>
                  </div>

                  {/* Temperature badge */}
                  <div className="flex justify-between items-center py-2 px-3 bg-orange-50 rounded-lg border border-orange-200 text-orange-900">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Thermometer className="w-4 h-4 text-orange-600" />
                      <span>{t.comfortTempLabel}</span>
                    </span>
                    <span className="font-bold font-mono text-sm">{currentShipment.temperatureCelsius || 21.5}°C</span>
                  </div>

                  {/* Hydration log */}
                  {currentShipment.petInfo?.lastHydrationTime && (
                    <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-200 text-blue-900">
                      <span className="text-[10px] font-bold uppercase tracking-wider block text-blue-700">
                        {t.hydrationLogLabel}
                      </span>
                      <span className="text-xs font-semibold">{currentShipment.petInfo.lastHydrationTime}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-1.5">
                    <span className="text-[#767676] font-medium">{t.customsClearanceLabel}</span>
                    <span className={`font-bold ${currentShipment.customsCleared ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {currentShipment.customsCleared ? 'Certificado Veterinario Aprobado' : 'Revisión Veterinaria'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sender & Receiver (Doorstep Consignee) Box */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#232331] font-heading mb-4 flex items-center gap-2 pb-3 border-b border-stone-100">
                  <Home className="w-4 h-4 text-orange-600" />
                  <span>Entrega en Domicilio</span>
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="p-3 bg-[#f8f5f1] rounded-xl border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-0.5">
                      {t.shipperLabel}
                    </span>
                    <div className="font-bold text-[#232331] text-sm">{currentShipment.sender.name}</div>
                    <div className="text-[#767676] mt-0.5">{currentShipment.sender.company} · {currentShipment.sender.city}</div>
                  </div>

                  <div className="p-3 bg-orange-50/70 rounded-xl border border-orange-200">
                    <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                      <Home className="w-3 h-3 text-orange-600" />
                      <span>{t.consigneeLabel}</span>
                    </span>
                    <div className="font-bold text-[#232331] text-sm">{currentShipment.consignee.name}</div>
                    <div className="text-orange-900 font-medium mt-0.5">
                      {currentShipment.doorstepDelivery?.receiverDoorAddress || 'Entrega directa a domicilio'}
                    </div>
                    <div className="text-stone-500 mt-0.5">
                      {currentShipment.destination.city}, {currentShipment.destination.country}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-[#232331]">{t.noShipmentFoundTitle}</h3>
          <p className="text-[#767676] text-sm mt-1 max-w-md mx-auto">
            {t.noShipmentFoundText} "{currentTrackingQuery}".
          </p>
        </div>
      )}
    </div>
  );
};
