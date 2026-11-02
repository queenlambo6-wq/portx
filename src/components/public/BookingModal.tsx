import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  X,
  Package,
  Ship,
  CheckCircle2,
  Calendar,
  DollarSign,
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
  initialMode = 'ocean_fcl',
  prefillData
}) => {
  const { ports, submitInquiry, t } = useShipping();

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [origin, setOrigin] = useState(prefillData?.origin || 'Port of Rotterdam (NLRTM)');
  const [destination, setDestination] = useState(prefillData?.destination || 'Port of Singapore (SGSIN)');
  const [mode, setMode] = useState<TransportMode>(prefillData?.mode || initialMode);
  const [containerType, setContainerType] = useState(prefillData?.containerType || '40ft High Cube Container');
  const [weightKg, setWeightKg] = useState(prefillData?.weightKg || 18500);
  const [volumeCbm, setVolumeCbm] = useState(prefillData?.volumeCbm || 55);
  const [declaredValueUsd, setDeclaredValueUsd] = useState(120000);
  const [incoterm, setIncoterm] = useState<'FOB' | 'CIF' | 'EXW' | 'DDP' | 'DAP'>('CIF');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [submittedInquiry, setSubmittedInquiry] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const estimatedCost = prefillData?.totalCostUsd || (mode === 'air_freight' ? 9500 : 3800);

    const created = submitInquiry({
      fullName,
      companyName: companyName || 'Independent Shipper',
      email,
      phone: phone || '+34602493512',
      origin,
      destination,
      mode,
      containerOrPackageType: containerType,
      weightKg,
      volumeCbm,
      estimatedCostUsd: estimatedCost,
      declaredValueUsd,
      incoterm,
      requestedDate: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().split('T')[0],
      specialInstructions: specialInstructions || undefined
    });

    setSubmittedInquiry(created);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#232331]/70 backdrop-blur-xs">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
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
                <Package className="w-6 h-6" />
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
              {/* Shipper Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#232331] font-bold mb-1">{t.contactNameLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#232331] font-bold mb-1">{t.companyNameLabel}</label>
                  <input
                    type="text"
                    placeholder="e.g. Vance Logistics Corp"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#232331] font-bold mb-1">{t.emailLabel}</label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@vance.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#232331] font-bold mb-1">{t.phoneLabel}</label>
                  <input
                    type="tel"
                    placeholder="+34602493512"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Mode & Route */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#232331] font-bold mb-1">{t.selectModeLabel}</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as TransportMode)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none font-medium"
                  >
                    <option value="ocean_fcl">Ocean FCL</option>
                    <option value="ocean_lcl">Ocean LCL</option>
                    <option value="air_freight">Air Freight Express</option>
                    <option value="rail_freight">Rail Cargo</option>
                    <option value="road_transport">Road Transport</option>
                    <option value="cold_chain">Cold Chain / Reefer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#232331] font-bold mb-1">{t.originTerminalLabel}</label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                  >
                    {ports.map((p) => (
                      <option key={p.id} value={`${p.name} (${p.code})`}>
                        {p.name} ({p.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#232331] font-bold mb-1">{t.destinationTerminalLabel}</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                  >
                    {ports.map((p) => (
                      <option key={p.id} value={`${p.name} (${p.code})`}>
                        {p.name} ({p.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cargo Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[#232331] font-bold mb-1">{t.containerUnitLabel}</label>
                  <input
                    type="text"
                    value={containerType}
                    onChange={(e) => setContainerType(e.target.value)}
                    placeholder="e.g. 40ft High Cube Container"
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#232331] font-bold mb-1">{t.grossWeightLabel} (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[#232331] font-bold mb-1">Incoterm</label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value as any)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none font-bold"
                  >
                    <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                    <option value="FOB">FOB (Free on Board)</option>
                    <option value="EXW">EXW (Ex Works)</option>
                    <option value="DDP">DDP (Delivered Duty Paid)</option>
                    <option value="DAP">DAP (Delivered at Place)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#232331] font-bold mb-1">{t.specialHandlingLabel}</label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Temperature range requirements, fragile crating, crane heavy-lift requirements..."
                  className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-[#f8f5f1] hover:bg-stone-200 text-[#232331] font-bold text-xs cursor-pointer"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{t.submitBookingBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-[#232331] font-heading">
              {t.bookingConfirmedTitle}
            </h3>
            <p className="text-xs text-[#767676] mt-1 max-w-md mx-auto">
              {t.bookingConfirmedSubtitle}
            </p>

            <div className="my-6 p-4 rounded-xl bg-orange-50 border border-orange-200 inline-block text-left max-w-md w-full">
              <div className="flex justify-between items-center pb-2 border-b border-orange-200 text-xs">
                <span className="text-[#767676] font-medium">{t.quoteRefLabel}</span>
                <span className="font-mono font-bold text-orange-700">{submittedInquiry.quoteRef}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-orange-200 text-xs">
                <span className="text-[#767676] font-medium">{t.routeLabel}</span>
                <span className="text-[#232331] font-semibold">{submittedInquiry.origin.split(' ')[0]} → {submittedInquiry.destination.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between items-center pt-2 text-xs">
                <span className="text-[#767676] font-medium">{t.statusOperationsLabel}</span>
                <span className="text-amber-700 font-bold">PortX Central Dispatch</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md cursor-pointer"
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
