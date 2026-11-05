import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  X,
  Heart,
  Home,
  CheckCircle2,
  Calendar,
  Phone,
  ArrowRight
} from 'lucide-react';
import { TransportMode } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: TransportMode;
  prefillData?: {
    origin: string;
    destination: string;
    mode: TransportMode;
    containerType: string;
    weightKg: number;
    volumeCbm: number;
    totalCostUsd: number;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'road_transport',
  prefillData
}) => {
  const { ports, submitInquiry, t } = useShipping();

  const [fullName, setFullName] = useState('');
  const [petNameAndBreed, setPetNameAndBreed] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+34602493512');
  const [origin, setOrigin] = useState(prefillData?.origin || 'Frankfurt Animal Lounge & European Vet Hub (DEFRA)');
  const [destination, setDestination] = useState(prefillData?.destination || 'Centro de Tránsito y Cuidado de Mascotas Madrid (ESMAD)');
  const [mode, setMode] = useState<TransportMode>(prefillData?.mode || initialMode);
  const [petSize, setPetSize] = useState(prefillData?.containerType || 'Perro Mediano (8 - 25 kg)');
  const [doorstepAddress, setDoorstepAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [submittedInquiry, setSubmittedInquiry] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const estimatedCost = prefillData?.totalCostUsd || 450;

    const created = submitInquiry({
      fullName,
      companyName: petNameAndBreed || 'Mascota Particular',
      email,
      phone: phone || '+34602493512',
      origin,
      destination: `${destination} - Entrega en Puerta: ${doorstepAddress}`,
      mode,
      containerOrPackageType: petSize,
      weightKg: 15,
      volumeCbm: 0.25,
      estimatedCostUsd: estimatedCost,
      declaredValueUsd: 1000,
      incoterm: 'DDP',
      requestedDate: new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString().split('T')[0],
      specialInstructions: `Dirección de Puerta: ${doorstepAddress}. Cuidados: ${specialInstructions}`
    });

    setSubmittedInquiry(created);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#232331]/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-2xl w-full max-h-[94vh] overflow-y-auto p-4 sm:p-8 relative shadow-2xl my-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-[#232331] p-2 rounded-lg bg-[#f8f5f1] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedInquiry ? (
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
              <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Heart className="w-6 h-6 fill-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#232331] font-heading">
                  {t.bookingModalTitle}
                </h3>
                <p className="text-xs text-[#767676]">
                  {t.bookingModalSubtitle}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Client & Pet Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#232331] font-bold mb-1">Tu Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Ana Fernández"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#232331] font-bold mb-1">Nombre y Raza de tu Mascota *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Bella - Golden Retriever"
                    value={petNameAndBreed}
                    onChange={(e) => setPetNameAndBreed(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#232331] font-bold mb-1">{t.emailLabel} *</label>
                  <input
                    type="email"
                    required
                    placeholder="ana.fernandez@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#232331] font-bold mb-1">Teléfono Móvil (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+34602493512"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Mode & Cities */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#232331] font-bold mb-1">Modalidad de Traslado</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as TransportMode)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none font-medium"
                  >
                    <option value="road_transport">Furgoneta Puerta a Puerta</option>
                    <option value="air_freight">Pet Nanny Aéreo Cabina</option>
                    <option value="cold_chain">Cachorros / Adopciones</option>
                    <option value="ocean_fcl">Reubicación Internacional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#232331] font-bold mb-1">Ciudad / Base de Origen</label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                  >
                    <optgroup label="🇪🇸 Ciudades y Provincias en España">
                      {ports
                        .filter((p) => p.country === 'España')
                        .map((p) => (
                          <option key={p.id} value={`${p.city} - ${p.name} (${p.code})`}>
                            {p.city} - {p.name} ({p.code})
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="🇪🇺 Enlaces Internacionales Europa">
                      {ports
                        .filter((p) => p.country !== 'España')
                        .map((p) => (
                          <option key={p.id} value={`${p.city} (${p.country}) - ${p.name} (${p.code})`}>
                            {p.city} ({p.country}) - {p.name} ({p.code})
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label className="block text-[#232331] font-bold mb-1">Ciudad Destino (Entrega en Puerta)</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                  >
                    <optgroup label="🇪🇸 Ciudades y Provincias de España">
                      {ports
                        .filter((p) => p.country === 'España')
                        .map((p) => (
                          <option key={p.id} value={`${p.city} - ${p.name} (${p.code})`}>
                            {p.city} - {p.name} ({p.code})
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="🇪🇺 Otros Destinos Europeos">
                      {ports
                        .filter((p) => p.country !== 'España')
                        .map((p) => (
                          <option key={p.id} value={`${p.city} (${p.country}) - ${p.name} (${p.code})`}>
                            {p.city} ({p.country}) - {p.name} ({p.code})
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Exact Doorstep Address */}
              <div className="p-3.5 bg-orange-50 rounded-xl border border-orange-200">
                <label className="block text-orange-950 font-bold mb-1 flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-orange-600" />
                  <span>Dirección Exacta de Entrega en Puerta (Calle, Número, Piso, Código Postal) *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Calle Gran Vía 32, Planta 3ª, Puerta B, Madrid"
                  value={doorstepAddress}
                  onChange={(e) => setDoorstepAddress(e.target.value)}
                  className="w-full bg-white text-[#232331] p-2.5 rounded-lg border border-orange-300 focus:border-orange-500 focus:outline-none font-medium"
                />
                <span className="text-[11px] text-orange-800 mt-1 block">
                  El conductor de la furgoneta subirá directamente a esta puerta para realizar la entrega en mano.
                </span>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-[#232331] font-bold mb-1">Cuidados Especiales / Alimentación / Medicación</label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Alimentación pautada, mantas familiares, necesidades de paseo..."
                  className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.submitBookingBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-[#232331] font-heading">
              {t.bookingConfirmedTitle}
            </h3>
            <p className="text-xs text-[#767676] max-w-md mx-auto leading-relaxed">
              {t.bookingConfirmedSubtitle}
            </p>

            <div className="bg-[#f8f5f1] p-4 rounded-xl border border-stone-200 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#767676] font-medium">{t.quoteRefLabel}</span>
                <span className="font-bold text-orange-600 font-mono">{submittedInquiry.quoteRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#767676] font-medium">Mascota:</span>
                <span className="font-bold text-[#232331]">{submittedInquiry.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#767676] font-medium">Entrega en Puerta:</span>
                <span className="font-bold text-[#232331] text-right truncate max-w-[200px]">
                  {doorstepAddress || 'Dirección acordada'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#767676] font-medium">Tarifa Estimada:</span>
                <span className="font-bold text-emerald-700 font-mono">{submittedInquiry.estimatedCostUsd} EUR</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                {t.doneBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
