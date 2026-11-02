import React, { useState, useMemo } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Calculator,
  Ship,
  Plane,
  Truck,
  Train,
  Thermometer,
  Layers,
  Clock,
  ArrowRight
} from 'lucide-react';
import { TransportMode } from '../../types';

interface RateCalculatorProps {
  onBookRate: (quoteData: {
    origin: string;
    destination: string;
    mode: TransportMode;
    containerType: string;
    weightKg: number;
    volumeCbm: number;
    totalCostUsd: number;
  }) => void;
}

export const RateCalculator: React.FC<RateCalculatorProps> = ({ onBookRate }) => {
  const { ports, t, language } = useShipping();

  const [origin, setOrigin] = useState<string>('Port of Rotterdam (NLRTM)');
  const [destination, setDestination] = useState<string>('Port of Singapore (SGSIN)');
  const [mode, setMode] = useState<TransportMode>('ocean_fcl');
  const [containerType, setContainerType] = useState<string>('40ft High Cube Container');
  const [weightKg, setWeightKg] = useState<number>(18500);
  const [volumeCbm, setVolumeCbm] = useState<number>(55);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);
  const [includeCustoms, setIncludeCustoms] = useState<boolean>(true);
  const [includePortHandling, setIncludePortHandling] = useState<boolean>(true);

  // Dynamic Freight Calculation
  const quoteCalculation = useMemo(() => {
    let baseRate = 2200;
    let days = 22;

    switch (mode) {
      case 'ocean_fcl':
        baseRate = containerType.includes('20ft') ? 1850 : 2650;
        days = 22;
        break;
      case 'ocean_lcl':
        baseRate = volumeCbm * 75 + weightKg * 0.04;
        days = 28;
        break;
      case 'air_freight':
        baseRate = Math.max(weightKg, volumeCbm * 167) * 3.8;
        days = 3;
        break;
      case 'rail_freight':
        baseRate = 3400;
        days = 16;
        break;
      case 'road_transport':
        baseRate = 1950;
        days = 5;
        break;
      case 'cold_chain':
        baseRate = 4200;
        days = 20;
        break;
    }

    const bunkerFuelFee = Math.round(baseRate * 0.12);
    const terminalHandling = includePortHandling ? (mode === 'air_freight' ? 280 : 350) : 0;
    const customsFee = includeCustoms ? 190 : 0;
    const insuranceFee = includeInsurance ? Math.round(baseRate * 0.035 + 85) : 0;
    const total = Math.round(baseRate + bunkerFuelFee + terminalHandling + customsFee + insuranceFee);

    return {
      baseRate: Math.round(baseRate),
      bunkerFuelFee,
      terminalHandling,
      customsFee,
      insuranceFee,
      total,
      transitDays: days
    };
  }, [origin, destination, mode, containerType, weightKg, volumeCbm, includeInsurance, includeCustoms, includePortHandling]);

  const handleBookNow = () => {
    onBookRate({
      origin,
      destination,
      mode,
      containerType,
      weightKg,
      volumeCbm,
      totalCostUsd: quoteCalculation.total
    });
  };

  const getModeLabels = () => {
    if (language === 'de') {
      return [
        { id: 'ocean_fcl', label: 'See FCL', icon: <Ship className="w-4 h-4" /> },
        { id: 'ocean_lcl', label: 'See LCL (Sammel)', icon: <Layers className="w-4 h-4" /> },
        { id: 'air_freight', label: 'Luftfracht', icon: <Plane className="w-4 h-4" /> },
        { id: 'rail_freight', label: 'Bahnfracht', icon: <Train className="w-4 h-4" /> },
        { id: 'road_transport', label: 'Lkw-Transport', icon: <Truck className="w-4 h-4" /> },
        { id: 'cold_chain', label: 'Kühlcontainer', icon: <Thermometer className="w-4 h-4" /> },
      ];
    }
    if (language === 'en') {
      return [
        { id: 'ocean_fcl', label: 'Ocean FCL', icon: <Ship className="w-4 h-4" /> },
        { id: 'ocean_lcl', label: 'Ocean LCL', icon: <Layers className="w-4 h-4" /> },
        { id: 'air_freight', label: 'Air Express', icon: <Plane className="w-4 h-4" /> },
        { id: 'rail_freight', label: 'Rail Cargo', icon: <Train className="w-4 h-4" /> },
        { id: 'road_transport', label: 'Road Drayage', icon: <Truck className="w-4 h-4" /> },
        { id: 'cold_chain', label: 'Cold Reefer', icon: <Thermometer className="w-4 h-4" /> },
      ];
    }
    // Spanish
    return [
      { id: 'ocean_fcl', label: 'Marítimo FCL', icon: <Ship className="w-4 h-4" /> },
      { id: 'ocean_lcl', label: 'Marítimo LCL', icon: <Layers className="w-4 h-4" /> },
      { id: 'air_freight', label: 'Aéreo Exprés', icon: <Plane className="w-4 h-4" /> },
      { id: 'rail_freight', label: 'Ferrocarril', icon: <Train className="w-4 h-4" /> },
      { id: 'road_transport', label: 'Carretera FTL', icon: <Truck className="w-4 h-4" /> },
      { id: 'cold_chain', label: 'Frigorífico', icon: <Thermometer className="w-4 h-4" /> },
    ];
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-wider mb-2">
          <Calculator className="w-3.5 h-3.5" />
          {t.calcBadge}
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#232331] font-heading tracking-tight">
          {t.calcHeading}
        </h2>
        <p className="mt-2 text-sm text-[#767676]">
          {t.calcSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#232331] mb-2">
              {t.selectModeLabel}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {getModeLabels().map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id as TransportMode)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    mode === m.id
                      ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20'
                      : 'bg-[#f8f5f1] text-[#232331] border-stone-200 hover:bg-stone-200/60'
                  }`}
                >
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Origin & Destination Ports */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#232331] mb-1.5">
                {t.originTerminalLabel}
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-[#f8f5f1] text-[#232331] text-xs sm:text-sm font-medium rounded-xl border border-stone-300 p-3 focus:border-orange-500 focus:bg-white focus:outline-none"
              >
                {ports.map((p) => (
                  <option key={p.id} value={`${p.name} (${p.code})`}>
                    {p.name} ({p.code}) - {p.country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#232331] mb-1.5">
                {t.destinationTerminalLabel}
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#f8f5f1] text-[#232331] text-xs sm:text-sm font-medium rounded-xl border border-stone-300 p-3 focus:border-orange-500 focus:bg-white focus:outline-none"
              >
                {ports.map((p) => (
                  <option key={p.id} value={`${p.name} (${p.code})`}>
                    {p.name} ({p.code}) - {p.country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cargo Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#232331] mb-1.5">
                {t.containerUnitLabel}
              </label>
              <select
                value={containerType}
                onChange={(e) => setContainerType(e.target.value)}
                className="w-full bg-[#f8f5f1] text-[#232331] text-xs font-medium rounded-xl border border-stone-300 p-3 focus:border-orange-500 focus:bg-white focus:outline-none"
              >
                <option value="20ft Standard Dry Container">20ft Dry Container</option>
                <option value="40ft High Cube Container">40ft High Cube</option>
                <option value="45ft Pallet-Wide Container">45ft Pallet-Wide</option>
                <option value="40ft Active Reefer (-20°C)">40ft Reefer (-20°C)</option>
                <option value="Air Freight ULD Pallet">Air Freight ULD Pallet</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#232331] mb-1.5">
                {t.grossWeightKgLabel}
              </label>
              <input
                type="number"
                min={100}
                max={40000}
                step={100}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full bg-[#f8f5f1] text-[#232331] text-xs sm:text-sm font-mono font-bold rounded-xl border border-stone-300 p-3 focus:border-orange-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#232331] mb-1.5">
                {t.volumeCbmLabel}
              </label>
              <input
                type="number"
                min={1}
                max={120}
                value={volumeCbm}
                onChange={(e) => setVolumeCbm(Number(e.target.value))}
                className="w-full bg-[#f8f5f1] text-[#232331] text-xs sm:text-sm font-mono font-bold rounded-xl border border-stone-300 p-3 focus:border-orange-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Value Added Services */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#232331] mb-2">
              {t.valueAddedOptions}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2.5 p-3 bg-[#f8f5f1] rounded-xl border border-stone-200 cursor-pointer hover:border-orange-400">
                <input
                  type="checkbox"
                  checked={includePortHandling}
                  onChange={(e) => setIncludePortHandling(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <span className="text-xs text-[#232331] font-semibold">{t.optTerminalHandling}</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 bg-[#f8f5f1] rounded-xl border border-stone-200 cursor-pointer hover:border-orange-400">
                <input
                  type="checkbox"
                  checked={includeCustoms}
                  onChange={(e) => setIncludeCustoms(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <span className="text-xs text-[#232331] font-semibold">{t.optCustomsBrokerage}</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 bg-[#f8f5f1] rounded-xl border border-stone-200 cursor-pointer hover:border-orange-400">
                <input
                  type="checkbox"
                  checked={includeInsurance}
                  onChange={(e) => setIncludeInsurance(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <span className="text-xs text-[#232331] font-semibold">{t.optCargoInsurance}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Output Quote Summary Box (5 Cols) - PortX Signature Orange Accent Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-orange-500 p-6 sm:p-8 shadow-xl relative">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider">
                {t.quoteResultTitle}
              </span>
              <h3 className="text-lg font-bold text-[#232331] font-heading">
                PortX Freight Quotation
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1 font-bold">
                <Clock className="w-3.5 h-3.5" />
                ~{quoteCalculation.transitDays} {t.daysTransit}
              </span>
            </div>
          </div>

          {/* Total Cost Highlight */}
          <div className="my-6 p-5 rounded-xl bg-orange-50/70 border border-orange-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#767676] font-semibold block">{t.totalEstimatedCost}</span>
              <div className="text-3xl font-black text-[#232331] font-mono mt-0.5">
                ${quoteCalculation.total.toLocaleString()}
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-white text-orange-700 border border-orange-200 shadow-2xs">
              {t.guaranteedRatePill}
            </span>
          </div>

          {/* Itemized Breakdown */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-stone-100 text-[#232331]">
              <span className="text-[#767676]">{t.baseFreightCharge}:</span>
              <span className="font-mono font-bold text-[#232331]">${quoteCalculation.baseRate.toLocaleString()}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-stone-100 text-[#232331]">
              <span className="text-[#767676]">{t.bunkerSurcharge}:</span>
              <span className="font-mono font-bold text-[#232331]">${quoteCalculation.bunkerFuelFee.toLocaleString()}</span>
            </div>

            {quoteCalculation.terminalHandling > 0 && (
              <div className="flex justify-between py-1 border-b border-stone-100 text-[#232331]">
                <span className="text-[#767676]">{t.terminalHandlingFee}:</span>
                <span className="font-mono font-bold text-[#232331]">${quoteCalculation.terminalHandling.toLocaleString()}</span>
              </div>
            )}

            {quoteCalculation.customsFee > 0 && (
              <div className="flex justify-between py-1 border-b border-stone-100 text-[#232331]">
                <span className="text-[#767676]">{t.customsEntryFee}:</span>
                <span className="font-mono font-bold text-[#232331]">${quoteCalculation.customsFee.toLocaleString()}</span>
              </div>
            )}

            {quoteCalculation.insuranceFee > 0 && (
              <div className="flex justify-between py-1 border-b border-stone-100 text-[#232331]">
                <span className="text-[#767676]">{t.insuranceUnderwritingFee}:</span>
                <span className="font-mono font-bold text-[#232331]">${quoteCalculation.insuranceFee.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Booking Button */}
          <div className="mt-8 space-y-3">
            <button
              onClick={handleBookNow}
              className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-orange-600/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.bookAtThisRateBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-[#767676] text-center font-medium">
              {t.rateIncludesFooter}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
