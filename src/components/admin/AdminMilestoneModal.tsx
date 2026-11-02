import React, { useState, useEffect } from 'react';
import { useShipping } from '../../context/ShippingContext';
import { X, Send } from 'lucide-react';
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
  const [operator, setOperator] = useState('Senior Dispatcher (J. Visser)');

  useEffect(() => {
    if (preselectedShipmentId) {
      setShipmentId(preselectedShipmentId);
      const target = shipments.find((s) => s.id === preselectedShipmentId);
      if (target) setStatus(target.status);
    } else if (shipments.length > 0) {
      setShipmentId(shipments[0].id);
      setStatus(shipments[0].status);
    }
  }, [preselectedShipmentId, isOpen, shipments]);

  if (!isOpen) return null;

  const currentShipment = shipments.find((s) => s.id === shipmentId) || shipments[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentShipment || !locationName.trim() || !description.trim()) return;

    updateShipmentStatus(currentShipment.id, status, locationName.trim(), description.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 sm:p-7 relative shadow-2xl text-slate-800">
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
