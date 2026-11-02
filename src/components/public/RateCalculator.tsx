import React, { useState, useMemo } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Calculator,
  Truck,
  Plane,
  Heart,
  Home,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award
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

  const [origin, setOrigin] = useState<string>('Frankfurt Animal Lounge & European Vet Hub (DEFRA)');
  const [destination, setDestination] = useState<string>('Centro de Tránsito y Cuidado de Mascotas Madrid (ESMAD)');
  const [mode, setMode] = useState<TransportMode>('road_transport');
  const [petType, setPetType] = useState<string>('Perro Mediano (8 - 25 kg)');
  const [weightKg, setWeightKg] = useState<number>(18);
  const [doorstepAddress, setDoorstepAddress] = useState<string>('Calle Velázquez 64, Madrid');
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);
  const [includeVetPassport, setIncludeVetPassport] = useState<boolean>(true);
  const [includePetNanny, setIncludePetNanny] = useState<boolean>(false);

  // Dynamic Pet Freight Calculation
  const quoteCalculation = useMemo(() => {
    let baseRate = 320;
    let hoursOrDays = '24-48 horas';

    switch (mode) {
      case 'road_transport':
        baseRate = petType.includes('Pequeño') ? 290 : petType.includes('Grande') ? 420 : 350;
        hoursOrDays = '24-48 horas';
        break;
      case 'air_freight':
        baseRate = 650;
        hoursOrDays = 'Mismo día (12-24 h)';
        break;
      case 'cold_chain': // Puppies
        baseRate = 380;
        hoursOrDays = '24 horas prioritario';
        break;
      case 'ocean_fcl': // International
        baseRate = 780;
        hoursOrDays = '3 a 5 días';
        break;
      default:
        baseRate = 340;
        break;
    }

    const nannyFee = includePetNanny ? 150 : 0;
    const passportFee = includeVetPassport ? 60 : 0;
    const insuranceFee = includeInsurance ? 45 : 0;
    const total = Math.round(baseRate + nannyFee + passportFee + insuranceFee);

    return {
      baseRate,
      nannyFee,
      passportFee,
      insuranceFee,
      total,
      transitEstimate: hoursOrDays
    };
  }, [mode, petType, weightKg, includeInsurance, includeVetPassport, includePetNanny]);

  const handleBookNow = () => {
    onBookRate({
      origin,
      destination: `${destination} (Entrega en Puerta: ${doorstepAddress})`,
      mode,
      containerType: petType,
      weightKg,
      volumeCbm: 0.25,
      totalCostUsd: quoteCalculation.total
    });
  };

  const getModeLabels = () => {
    if (language === 'de') {
      return [
        { id: 'road_transport', label: 'Haustür-Transporter (21°C)', icon: <Home className="w-4 h-4" /> },
        { id: 'air_freight', label: 'Pet Nanny Flugbegleitung', icon: <Plane className="w-4 h-4" /> },
        { id: 'cold_chain', label: 'Welpen / Züchter-Express', icon: <Heart className="w-4 h-4" /> },
        { id: 'ocean_fcl', label: 'Internationale Umsiedlung', icon: <Award className="w-4 h-4" /> },
      ];
    }
    if (language === 'en') {
      return [
        { id: 'road_transport', label: 'Climate Doorstep Van', icon: <Home className="w-4 h-4" /> },
        { id: 'air_freight', label: 'In-Cabin Pet Nanny', icon: <Plane className="w-4 h-4" /> },
        { id: 'cold_chain', label: 'Puppy & Adoption Care', icon: <Heart className="w-4 h-4" /> },
        { id: 'ocean_fcl', label: 'International Relocation', icon: <Award className="w-4 h-4" /> },
      ];
    }
    // Spanish
    return [
      { id: 'road_transport', label: 'Furgoneta Puerta a Puerta', icon: <Home className="w-4 h-4" /> },
      { id: 'air_freight', label: 'Pet Nanny Aéreo Cabina', icon: <Plane className="w-4 h-4" /> },
      { id: 'cold_chain', label: 'Cachorros / Adopciones', icon: <Heart className="w-4 h-4" /> },
      { id: 'ocean_fcl', label: 'Reubicación Internacional', icon: <Award className="w-4 h-4" /> },
    ];
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-wider mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>{t.calcBadge}</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {getModeLabels().map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id as TransportMode)}
                  className={`flex items-center gap-2.5 p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
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
                <optgroup label="🇪🇸 Bases y Ciudades de España">
                  {ports
                    .filter((p) => p.country === 'España')
                    .map((p) => (
                      <option key={p.id} value={`${p.city} - ${p.name} (${p.code})`}>
                        {p.city} · {p.name} ({p.code})
                      </option>
                    ))}
                </optgroup>
                <optgroup label="🇪🇺 Conexiones Internacionales Europa">
                  {ports
                    .filter((p) => p.country !== 'España')
                    .map((p) => (
                      <option key={p.id} value={`${p.city} (${p.country}) - ${p.name} (${p.code})`}>
                        {p.city} ({p.country}) · {p.name} ({p.code})
                      </option>
                    ))}
                </optgroup>
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
                <optgroup label="🇪🇸 Ciudades de Destino en España (Entrega en Puerta)">
                  {ports
                    .filter((p) => p.country === 'España')
                    .map((p) => (
                      <option key={p.id} value={`${p.city} - ${p.name} (${p.code})`}>
                        {p.city} · {p.name} ({p.code})
                      </option>
                    ))}
                </optgroup>
                <optgroup label="🇪🇺 Destinos Internacionales Europa">
                  {ports
                    .filter((p) => p.country !== 'España')
                    .map((p) => (
                      <option key={p.id} value={`${p.city} (${p.country}) - ${p.name} (${p.code})`}>
                        {p.city} ({p.country}) · {p.name} ({p.code})
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Doorstep Delivery Address Input */}
          <div className="p-4 bg-orange-50/70 rounded-xl border border-orange-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-orange-950 mb-1 flex items-center gap-1.5">
              <Home className="w-4 h-4 text-orange-600" />
              <span>Dirección Exacta de la Puerta del Receptor en Destino</span>
            </label>
            <input
              type="text"
              value={doorstepAddress}
              onChange={(e) => setDoorstepAddress(e.target.value)}
              placeholder="Ej: Calle Velázquez 64, 4º Izq, 28001 Madrid"
              className="w-full bg-white text-[#232331] text-xs sm:text-sm font-medium rounded-xl border border-orange-300 p-2.5 focus:border-orange-500 focus:outline-none"
            />
            <span className="text-[11px] text-orange-800 mt-1 block font-medium">
              ✓ Entrega directa en mano: el conductor sube al domicilio y verifica la identidad y microchip.
            </span>
          </div>

          {/* Pet Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#232331] mb-1.5">
                {t.containerUnitLabel}
              </label>
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                className="w-full bg-[#f8f5f1] text-[#232331] text-xs sm:text-sm font-medium rounded-xl border border-stone-300 p-3 focus:border-orange-500 focus:bg-white focus:outline-none"
              >
                <option value="Perro Pequeño / Toy (< 8 kg)">Perro Pequeño / Toy (&lt; 8 kg) - Box IATA S</option>
                <option value="Perro Mediano (8 - 25 kg)">Perro Mediano (8 - 25 kg) - Box IATA M/L</option>
                <option value="Perro Grande (> 25 kg)">Perro Grande (&gt; 25 kg) - Box IATA XL</option>
                <option value="Gato / Felino Doméstico">Gato / Felino Doméstico - Pod Aislado</option>
                <option value="Cachorro de Adopción / Criador">Cachorro de Adopción / Criador (8+ semanas)</option>
                <option value="Ave o Mascota Exótica">Ave o Mascota Exótica</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#232331] mb-1.5">
                {t.grossWeightCalcLabel}
              </label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value)))}
                className="w-full bg-[#f8f5f1] text-[#232331] text-xs sm:text-sm font-medium rounded-xl border border-stone-300 p-3 focus:border-orange-500 focus:bg-white focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Additional Welfare Options */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#232331] mb-3">
              {t.optionsHeading}
            </label>
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-[#f8f5f1] hover:bg-stone-100 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={includeInsurance}
                  onChange={(e) => setIncludeInsurance(e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded border-stone-300 focus:ring-orange-500"
                />
                <div className="flex-1">
                  <span className="font-bold text-[#232331] block">{t.optInsurance}</span>
                  <span className="text-[11px] text-[#767676]">Cobertura médica veterinaria completa durante todo el trayecto (+45 EUR)</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-[#f8f5f1] hover:bg-stone-100 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={includeVetPassport}
                  onChange={(e) => setIncludeVetPassport(e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded border-stone-300 focus:ring-orange-500"
                />
                <div className="flex-1">
                  <span className="font-bold text-[#232331] block">{t.optCustoms}</span>
                  <span className="text-[11px] text-[#767676]">Verificación oficial de cartilla, microchip y pasaporte sanitario (+60 EUR)</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-[#f8f5f1] hover:bg-stone-100 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={includePetNanny}
                  onChange={(e) => setIncludePetNanny(e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded border-stone-300 focus:ring-orange-500"
                />
                <div className="flex-1">
                  <span className="font-bold text-[#232331] block">{t.optTerminalHandling}</span>
                  <span className="text-[11px] text-[#767676]">Cuidador veterinario exclusivo con atención individualizada 1:1 (+150 EUR)</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Quote Summary Box (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-orange-200 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 block">
                {t.guaranteedRateBadge}
              </span>
              <h3 className="text-xl font-black text-[#232331] font-heading mt-0.5">
                {t.estimatedQuoteTitle}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-500 font-bold block">{t.transitDaysEstimate}</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" />
                {quoteCalculation.transitEstimate}
              </span>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-3 text-xs border-b border-stone-100 pb-5">
            <div className="flex justify-between text-stone-600">
              <span>{t.baseFreightLabel}</span>
              <span className="font-mono font-bold text-[#232331]">{quoteCalculation.baseRate} EUR</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Climatización Cabina (21°C) y Paseos</span>
              <span className="font-mono font-bold text-[#232331]">Incluido</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Entrega Directa en la Puerta del Receptor</span>
              <span className="font-mono font-bold text-emerald-700">Incluido (0 EUR)</span>
            </div>
            {includeVetPassport && (
              <div className="flex justify-between text-stone-600">
                <span>{t.customsEntryLabel}</span>
                <span className="font-mono font-bold text-[#232331]">{quoteCalculation.passportFee} EUR</span>
              </div>
            )}
            {includeInsurance && (
              <div className="flex justify-between text-stone-600">
                <span>{t.insuranceUnderwritingLabel}</span>
                <span className="font-mono font-bold text-[#232331]">{quoteCalculation.insuranceFee} EUR</span>
              </div>
            )}
            {includePetNanny && (
              <div className="flex justify-between text-stone-600">
                <span>Pet Nanny 1:1 Exclusivo</span>
                <span className="font-mono font-bold text-[#232331]">{quoteCalculation.nannyFee} EUR</span>
              </div>
            )}
          </div>

          {/* Total Cost Display */}
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-orange-950 block">{t.totalCostLabel}</span>
              <span className="text-[11px] text-orange-800">Tarifa fija sin cargos sorpresa</span>
            </div>
            <div className="text-3xl font-black text-orange-600 font-heading">
              {quoteCalculation.total} €
            </div>
          </div>

          <p className="text-[11px] text-stone-500 leading-relaxed">
            {t.quoteFootnote}
          </p>

          <button
            type="button"
            onClick={handleBookNow}
            className="w-full py-3.5 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.bookConsignmentBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
