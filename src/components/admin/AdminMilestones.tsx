import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  MapPin,
  CheckCircle2,
  Send,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ShipmentStatus } from '../../types';

export const AdminMilestones: React.FC = () => {
  const { shipments, updateShipmentStatus, language, t } = useShipping();

  const [selectedShipmentId, setSelectedShipmentId] = useState<string>(shipments[0]?.id || '');
  const activeShipment = shipments.find((s) => s.id === selectedShipmentId) || shipments[0];

  const [locationName, setLocationName] = useState('');
  const [status, setStatus] = useState<ShipmentStatus>(activeShipment?.status || 'in_transit');
  const [description, setDescription] = useState('');
  const [operator, setOperator] = useState('Senior Dispatcher (J. Visser)');
  const [successToast, setSuccessToast] = useState(false);

  // Preset quick event templates
  const applyPreset = (presetStatus: ShipmentStatus, loc: string, desc: string) => {
    setStatus(presetStatus);
    setLocationName(loc);
    setDescription(desc);
  };

  const handlePostMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeShipment || !locationName.trim() || !description.trim()) return;

    updateShipmentStatus(activeShipment.id, status, locationName.trim(), description.trim());

    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3500);

    setLocationName('');
    setDescription('');
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#232331] font-heading tracking-tight">
            {language === 'es' ? 'Gestor de Hitos y Checkpoints en Vivo' : language === 'de' ? 'Live Meilenstein- & Kontrollpunkt-Disposition' : 'Live Milestone & Checkpoint Dispatcher'}
          </h1>
          <p className="text-xs text-[#767676] mt-0.5">
            {language === 'es' ? 'Registre llegadas a puerto, waypoints GPS y levantes de aduanas que se sincronizan en tiempo real con el portal público.' : language === 'de' ? 'Erfassen Sie Echtzeit-Hafenankünfte, GPS-Punkte und Zollfreigaben.' : 'Log real-time port arrivals, GPS waypoints, customs inspection releases, and updates.'}
          </p>
        </div>
      </div>

      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{language === 'es' ? `¡Hito registrado correctamente! El portal público para ${activeShipment?.trackingNumber} se ha actualizado en tiempo real.` : language === 'de' ? `Meilenstein erfolgreich verbucht für ${activeShipment?.trackingNumber}.` : `Checkpoint recorded! Public tracking for ${activeShipment?.trackingNumber} updated in real time.`}</span>
          </div>
          <button onClick={() => setSuccessToast(false)} className="text-emerald-700 hover:text-emerald-900 font-bold">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Cols: Form to post milestone */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-2xs space-y-5">
          <div>
            <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider">
              {t.actionsCol}
            </span>
            <h2 className="text-lg font-bold text-[#232331] font-heading mt-0.5">
              {t.recordCheckpointBtn}
            </h2>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              {language === 'es' ? 'Plantillas Rápidas:' : language === 'de' ? 'Schnellvorlagen:' : 'Quick Dispatch Templates:'}
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => applyPreset('in_transit', 'Suez Canal / Port Said Convoy', language === 'es' ? 'Paso por canal completado. Precintos y telemetría satelital verificados.' : 'Southbound convoy passage cleared. Security seals and satellite telemetry checked.')}
                className="px-2.5 py-1 bg-[#f8f5f1] hover:bg-red-50 text-stone-700 hover:text-red-700 rounded-md border border-stone-200 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                ⚓ Suez Canal
              </button>
              <button
                type="button"
                onClick={() => applyPreset('customs_hold', 'Terminal de Inspección Aduanera', language === 'es' ? 'Auditoría e inspección física no intrusiva de escáner en muelle.' : 'Random customs tariff classification and container scan audit underway.')}
                className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-md border border-amber-200 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                ⚠️ Aduana Hold
              </button>
              <button
                type="button"
                onClick={() => applyPreset('in_transit', 'Aduana Fronteriza Levante Concedido', language === 'es' ? 'Levante aduanero total otorgado. Precinto intacto. Reanudando marcha.' : 'Full customs release granted. Bolt seal intact. Resuming onward linehaul passage.')}
                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                ✅ Levante Aduana
              </button>
              <button
                type="button"
                onClick={() => applyPreset('out_for_delivery', `${activeShipment?.destination.city} Terminal Intermodal`, language === 'es' ? 'Descargado de buque. Cargado en camión plataforma para última milla.' : 'Discharged from carrier. Loaded onto bonded flatbed truck for final delivery.')}
                className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-md border border-purple-200 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                🚚 En Reparto
              </button>
              <button
                type="button"
                onClick={() => applyPreset('delivered', `${activeShipment?.consignee.company} Warehouse`, language === 'es' ? 'Carga entregada en perfectas condiciones. Firma digital recogida.' : 'Cargo received in excellent condition. Consignee digital signoff collected.')}
                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                📦 Entregado
              </button>
            </div>
          </div>

          <form onSubmit={handlePostMilestone} className="space-y-4 text-xs pt-2 border-t border-stone-100">
            {/* Target Shipment Selector */}
            <div>
              <label className="block text-[#232331] font-bold mb-1">{language === 'es' ? 'Seleccionar Envío / Contenedor *' : language === 'de' ? 'Sendung auswählen *' : 'Select Consignment *'}</label>
              <select
                value={selectedShipmentId}
                onChange={(e) => {
                  setSelectedShipmentId(e.target.value);
                  const selected = shipments.find((s) => s.id === e.target.value);
                  if (selected) setStatus(selected.status);
                }}
                className="w-full bg-[#f8f5f1] text-[#232331] text-xs rounded-xl border border-stone-300 p-2.5 focus:border-red-500 focus:bg-white focus:outline-none font-mono font-bold"
              >
                {shipments.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.trackingNumber} - {s.origin.city} → {s.destination.city} ({s.cargo.description.substring(0, 25)}...)
                  </option>
                ))}
              </select>
            </div>

            {/* Status Transition */}
            <div>
              <label className="block text-[#232331] font-bold mb-1">{language === 'es' ? 'Nuevo Estado Operativo' : language === 'de' ? 'Neuer Betriebsstatus' : 'New Operational Status'}</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
                className="w-full bg-[#f8f5f1] text-[#232331] text-xs rounded-xl border border-stone-300 p-2.5 focus:border-red-500 focus:bg-white focus:outline-none font-bold text-red-700"
              >
                <option value="in_transit">In Transit (Marítimo / Aéreo / Tren / Carretera)</option>
                <option value="customs_hold">Customs Examination Hold (Inspección Aduanera)</option>
                <option value="out_for_delivery">Out for Delivery (En Reparto Final)</option>
                <option value="delivered">Delivered (Entregado con Firma)</option>
                <option value="exception">Exception (Retraso Meteorológico / Avería)</option>
                <option value="booked">Booked (Recepción en Terminal)</option>
              </select>
            </div>

            {/* Location Name */}
            <div>
              <label className="block text-[#232331] font-bold mb-1">{t.currentCheckpoint} *</label>
              <input
                type="text"
                required
                placeholder="e.g. Suez Canal Southbound Convoy, Port Said"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-red-500 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Remarks & Description */}
            <div>
              <label className="block text-[#232331] font-bold mb-1">{language === 'es' ? 'Descripción de Actividad Operativa *' : language === 'de' ? 'Tätigkeitsbeschreibung *' : 'Operational Activity Description *'}</label>
              <textarea
                rows={3}
                required
                placeholder={language === 'es' ? 'Detalles de atraque, paso de aduanas, verificación de precintos...' : 'Berthing details, customs inspection notes...'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-red-500 focus:bg-white focus:outline-none"
              ></textarea>
            </div>

            {/* Authorized Operator */}
            <div>
              <label className="block text-[#232331] font-bold mb-1">{language === 'es' ? 'Oficial / Operador Autorizado' : language === 'de' ? 'Autorisierter Dispatcher' : 'Authorized Operator'}</label>
              <input
                type="text"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-red-500 focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t.recordCheckpointBtn}</span>
            </button>
          </form>
        </div>

        {/* Right 7 Cols: History & Visual Audit Log */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider">
                Auditoría en Tiempo Real
              </span>
              <h2 className="text-lg font-bold text-[#232331] font-heading mt-0.5">
                {activeShipment?.trackingNumber} — {t.milestonesTitle}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#f8f5f1] text-[#232331] border border-stone-200">
              {activeShipment?.containerNumber}
            </span>
          </div>

          <div className="space-y-4">
            {activeShipment?.milestones.map((m, index) => (
              <div key={m.id} className="p-4 rounded-xl border border-stone-200 bg-[#f8f5f1] flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#232331]">{m.location}</span>
                    <span className="text-[10px] font-mono text-stone-500">{m.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#767676] mt-1">{m.description}</p>
                  {m.operator && (
                    <span className="text-[10px] text-stone-500 block mt-1">Autorizado por: {m.operator}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
