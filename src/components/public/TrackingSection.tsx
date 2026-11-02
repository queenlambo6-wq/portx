import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Search,
  Ship,
  Plane,
  Truck,
  Train,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Printer,
  Thermometer,
  ShieldCheck,
  Anchor,
  Sparkles
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
      case 'ocean_fcl':
      case 'ocean_lcl':
        return <Ship className="w-4 h-4 text-orange-600" />;
      case 'air_freight':
        return <Plane className="w-4 h-4 text-blue-600" />;
      case 'road_transport':
        return <Truck className="w-4 h-4 text-emerald-600" />;
      case 'rail_freight':
        return <Train className="w-4 h-4 text-amber-600" />;
      case 'cold_chain':
        return <Thermometer className="w-4 h-4 text-cyan-600" />;
      default:
        return <Ship className="w-4 h-4 text-orange-600" />;
    }
  };

  const getStatusBadge = (status: ShipmentStatus) => {
    const statusLabels: Record<string, Record<ShipmentStatus, string>> = {
      es: {
        booked: 'Reserva Confirmada',
        in_transit: 'En Tránsito Marítimo',
        customs_hold: 'Retención Aduanera',
        out_for_delivery: 'En Reparto Final',
        delivered: 'Entregado en Destino',
        exception: 'Excepción Operativa'
      },
      en: {
        booked: 'Booking Confirmed',
        in_transit: 'In Maritime Transit',
        customs_hold: 'Customs Examination Hold',
        out_for_delivery: 'Out for Final Delivery',
        delivered: 'Delivered to Consignee',
        exception: 'Operational Exception'
      },
      de: {
        booked: 'Buchung Bestätigt',
        in_transit: 'Im Seetransit',
        customs_hold: 'Zollüberprüfung / Halt',
        out_for_delivery: 'In Zustellung',
        delivered: 'Erfolgreich Zugestellt',
        exception: 'Betriebsausnahme'
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
            <Truck className="w-3.5 h-3.5" />
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-wider mb-3">
          <Anchor className="w-3.5 h-3.5" />
          {t.trackingHeaderBadge}
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
              className={`px-2.5 py-1 rounded text-xs transition-colors font-mono font-bold cursor-pointer ${
                currentShipment?.trackingNumber === s.trackingNumber
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white hover:bg-orange-50 text-stone-700 border border-stone-200'
              }`}
            >
              {s.trackingNumber}
            </button>
          ))}
        </div>
      </div>

      {currentShipment ? (
        <div className="space-y-8">
          {/* Main Status & Route Header Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-[#232331] font-mono tracking-tight">
                    {currentShipment.trackingNumber}
                  </h2>
                  {getStatusBadge(currentShipment.status)}
                  <span className="text-xs text-stone-700 flex items-center gap-1.5 bg-[#f8f5f1] px-3 py-1 rounded-md border border-stone-200 font-medium">
                    {getModeIcon(currentShipment.mode)}
                    <span className="capitalize">{currentShipment.mode.replace('_', ' ')}</span>
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#767676] mt-2">
                  <span>B/L: <strong className="text-[#232331] font-mono">{currentShipment.bolNumber}</strong></span>
                  <span>·</span>
                  <span>Container: <strong className="text-[#232331] font-mono">{currentShipment.containerNumber}</strong></span>
                  <span>·</span>
                  <span>Carrier: <strong className="text-[#232331]">{currentShipment.carrier.name} ({currentShipment.carrier.vesselOrFlightName})</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedShipmentForPrint(currentShipment)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#f8f5f1] hover:bg-stone-200/80 text-[#232331] text-xs font-bold rounded-lg border border-stone-300 transition-colors shadow-2xs cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-orange-600" />
                  {t.printWaybillBtn}
                </button>
                <button
                  onClick={() => {
                    setIsAdminMode(true);
                    setAdminSubView('milestones');
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold rounded-lg border border-orange-200 transition-colors cursor-pointer"
                  title="Update this shipment in admin console"
                >
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  {t.dispatchUpdateBtn}
                </button>
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

                {/* Destination */}
                <div className="bg-[#f8f5f1] p-4 rounded-xl border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                    {t.portOfDischarge}
                  </span>
                  <div className="text-lg font-bold text-[#232331] mt-1">
                    {currentShipment.destination.city}, {currentShipment.destination.country}
                  </div>
                  <p className="text-xs text-[#767676] mt-0.5">{currentShipment.destination.portName}</p>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 mt-3 font-bold">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.estimatedArrival}: {new Date(currentShipment.estimatedArrival).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid: Left Milestones / Right Cargo Details */}
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
                  <span>AEO / C-TPAT Certified</span>
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
                        ? 'bg-orange-50/70 border-orange-200'
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
                          <span className="font-medium text-stone-400">Station / Officer:</span>
                          <span className="font-semibold text-stone-700">{m.operator}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Specifications & Manifest Dossier */}
            <div className="space-y-6">
              {/* Manifest Card */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#232331] font-heading mb-4 flex items-center gap-2 pb-3 border-b border-stone-100">
                  <FileText className="w-4 h-4 text-orange-600" />
                  {t.cargoSpecsTitle}
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-[#767676] font-medium">{t.cargoDescriptionLabel}</span>
                    <span className="font-bold text-[#232331] text-right max-w-[180px]">{currentShipment.cargo.description}</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-[#767676] font-medium">{t.grossWeightLabel}</span>
                    <span className="font-bold text-[#232331] font-mono">{currentShipment.cargo.weightKg.toLocaleString()} kg</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-[#767676] font-medium">{t.volumeLabel}</span>
                    <span className="font-bold text-[#232331] font-mono">{currentShipment.cargo.volumeCbm} CBM</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-[#767676] font-medium">{t.piecesLabel}</span>
                    <span className="font-bold text-[#232331]">{currentShipment.cargo.pieces} Units</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-[#767676] font-medium">{t.containerIdLabel}</span>
                    <span className="font-bold text-orange-600 font-mono">{currentShipment.containerNumber}</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-[#767676] font-medium">{t.boltSealLabel}</span>
                    <span className="font-bold text-[#232331] font-mono">{currentShipment.sealNumber}</span>
                  </div>

                  {currentShipment.temperatureCelsius !== undefined && (
                    <div className="flex justify-between items-center py-2 px-3 bg-cyan-50 rounded-lg border border-cyan-200 text-cyan-800">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Thermometer className="w-4 h-4 text-cyan-600" />
                        {t.reeferMonitoringLabel}
                      </span>
                      <span className="font-bold font-mono text-sm">{currentShipment.temperatureCelsius}°C</span>
                    </div>
                  )}

                  <div className="flex justify-between py-1.5">
                    <span className="text-[#767676] font-medium">{t.customsClearanceLabel}</span>
                    <span className={`font-bold ${currentShipment.customsCleared ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {currentShipment.customsCleared ? 'Full Clearance Issued' : 'Customs Review'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shippers & Consignee Box */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#232331] font-heading mb-4 flex items-center gap-2 pb-3 border-b border-stone-100">
                  <Anchor className="w-4 h-4 text-orange-600" />
                  {t.shipperLabel} & {t.consigneeLabel}
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="p-3 bg-[#f8f5f1] rounded-xl border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-0.5">
                      {t.shipperLabel}
                    </span>
                    <div className="font-bold text-[#232331] text-sm">{currentShipment.sender.company}</div>
                    <div className="text-[#767676] mt-0.5">{currentShipment.sender.city}, {currentShipment.sender.country}</div>
                  </div>

                  <div className="p-3 bg-[#f8f5f1] rounded-xl border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-0.5">
                      {t.consigneeLabel}
                    </span>
                    <div className="font-bold text-[#232331] text-sm">{currentShipment.consignee.company}</div>
                    <div className="text-[#767676] mt-0.5">{currentShipment.consignee.city}, {currentShipment.consignee.country}</div>
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
