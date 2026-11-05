import React, { useState, useEffect } from 'react';
import { useShipping } from '../../context/ShippingContext';
import { X, Send, AlertTriangle } from 'lucide-react';
import { ShipmentStatus } from '../../types';

interface AdminMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedShipmentId?: string;
}

export const AdminMilestoneModal: React.FC<AdminMilestoneModalProps> = ({
  isOpen,
  onClose,
  preselectedShipmentId
}) => {
  const { shipments, updateShipmentStatus } = useShipping();

  const [shipmentId, setShipmentId] = useState<string>('');
  const [status, setStatus] = useState<ShipmentStatus>('in_transit');
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [clientNotice, setClientNotice] = useState('');
  const [operator, setOperator] = useState('Senior Dispatcher (J. Visser)');

  useEffect(() => {
    if (preselectedShipmentId) {
      setShipmentId(preselectedShipmentId);
      const target = shipments.find((s) => s.id === preselectedShipmentId);
      if (target) {
        setStatus(target.status);
        setClientNotice(target.clientNotice || '');
      }
    } else if (shipments.length > 0) {
      setShipmentId(shipments[0].id);
      setStatus(shipments[0].status);
      setClientNotice(shipments[0].clientNotice || '');
    }
  }, [preselectedShipmentId, isOpen, shipments]);

  if (!isOpen) return null;

  const currentShipment = shipments.find((s) => s.id === shipmentId) || shipments[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentShipment || !locationName.trim() || !description.trim()) return;

    updateShipmentStatus(currentShipment.id, status, locationName.trim(), description.trim(), clientNotice.trim() || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-4 sm:p-7 relative shadow-2xl text-slate-800 my-auto max-h-[94vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-2 rounded-lg bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 font-semibold">
            Telemetría de Bienestar y Ruta en Tiempo Real
          </span>
          <h2 className="text-xl font-bold text-slate-900 font-heading mt-0.5">
            Registrar Hito de Ruta / Parada de Bienestar
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Publica un punto de control auditado visible para la familia en el portal de rastreo público (paseo, revisión veterinaria, reparto a puerta).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Mascota / Envío Seleccionado *</label>
            <select
              value={shipmentId}
              onChange={(e) => {
                setShipmentId(e.target.value);
                const s = shipments.find((item) => item.id === e.target.value);
                if (s) setStatus(s.status);
              }}
              className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:bg-white focus:outline-none font-mono font-bold"
            >
              {shipments.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.trackingNumber} - {s.petInfo ? `${s.petInfo.petName} (${s.petInfo.breed})` : s.cargo.description} | {s.origin.city} → {s.destination.city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Estado de la Mascota / Envío</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
              className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:bg-white focus:outline-none font-bold text-orange-700"
            >
              <option value="in_transit">En Tránsito Climatizado (21°C)</option>
              <option value="customs_hold">Revisión Sanitaria / Control Veterinario</option>
              <option value="out_for_delivery">En Reparto Local a Puerta del Receptor</option>
              <option value="delivered">Entregado en Mano en Puerta con Firma</option>
              <option value="booked">Reserva Registrada / Esperando Recogida</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Ubicación / Punto de Control / Ciudad *</label>
            <input
              type="text"
              required
              placeholder="Ej. Área de Descanso A-2 km 140 (Paseo e Hidratación) o Portal Calle Serrano 42"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Descripción del Estado y Bienestar *</label>
            <textarea
              rows={3}
              required
              placeholder="Ej. Parada de paseo e hidratación completada con éxito. La mascota se encuentra muy tranquila, alegre y descansada. Furgoneta a 21.5°C constante."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:bg-white focus:outline-none"
            ></textarea>
          </div>

          {/* Urgent Note or Client Advisory */}
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px] uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Aviso Urgente para el Cliente (Visible en Rastreo Público)</span>
            </div>
            <textarea
              rows={2}
              value={clientNotice}
              onChange={(e) => setClientNotice(e.target.value)}
              placeholder="Opcional: Indicar incidencia de tráfico, parada adicional, o aviso previo a la entrega en portal..."
              className="w-full bg-white text-stone-900 p-2 rounded-lg border border-amber-300 focus:border-amber-600 focus:outline-none text-xs"
            ></textarea>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Cuidador / Conductor Asignado</label>
            <input
              type="text"
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              placeholder="Carlos Méndez (Cuidador Certificado)"
              className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publicar Hito de Bienestar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
