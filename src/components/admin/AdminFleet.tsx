import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Ship,
  Plane,
  Truck,
  Train,
  Anchor,
  Edit2,
  Compass,
  Gauge,
  UserCheck
} from 'lucide-react';
import { FleetVehicle } from '../../types';

export const AdminFleet: React.FC = () => {
  const { fleet, updateFleetStatus, language } = useShipping();
  const [editingVehicle, setEditingVehicle] = useState<FleetVehicle | null>(null);
  const [newStatus, setNewStatus] = useState<FleetVehicle['status']>('at_sea');
  const [newLocation, setNewLocation] = useState('');

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;

    updateFleetStatus(editingVehicle.id, newStatus, newLocation || undefined);
    setEditingVehicle(null);
  };

  const getVehicleIcon = (type: FleetVehicle['type']) => {
    switch (type) {
      case 'vessel':
        return <Ship className="w-6 h-6 text-orange-600" />;
      case 'aircraft':
        return <Plane className="w-6 h-6 text-blue-600" />;
      case 'truck':
        return <Truck className="w-6 h-6 text-emerald-600" />;
      case 'train':
        return <Train className="w-6 h-6 text-amber-600" />;
    }
  };

  const getStatusBadge = (status: FleetVehicle['status']) => {
    switch (status) {
      case 'at_sea':
        return <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded border border-sky-200">{language === 'es' ? 'En Navegación (Alta Mar)' : language === 'de' ? 'Auf See (In Fahrt)' : 'At Sea (Underway)'}</span>;
      case 'in_flight':
        return <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded border border-indigo-200">{language === 'es' ? 'En Vuelo de Carga' : language === 'de' ? 'Im Frachtflug' : 'In Flight'}</span>;
      case 'docked':
        return <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-200">{language === 'es' ? 'Atracado / Operaciones' : language === 'de' ? 'Am Kai / Beladung' : 'Berthed / Loading'}</span>;
      case 'transit_road':
        return <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-200">{language === 'es' ? 'Tránsito Terrestre' : language === 'de' ? 'Straßentransport' : 'Overland Transit'}</span>;
      case 'maintenance':
        return <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded border border-rose-200">{language === 'es' ? 'En Dique Seco / Mantenimiento' : language === 'de' ? 'Werft / Wartung' : 'Drydock / Maint.'}</span>;
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#232331] font-heading tracking-tight">
            {language === 'es' ? 'Radar de Flota y Telemetría de Buques' : language === 'de' ? 'Flottenradar & Schiffs-Telemetrie' : 'Fleet Radar & Vessel Telemetry'}
          </h1>
          <p className="text-xs text-[#767676] mt-0.5">
            {language === 'es' ? 'Monitoreo de portacontenedores gigantes, aviones cargueros, convoyes ferroviarios y camiones de arrastre.' : language === 'de' ? 'Überwachung von Großcontainerschiffen, Frachtflugzeugen und Lkw.' : 'Monitor container mega-ships, air cargo freighters, rail consists, and drayage trucks.'}
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          {fleet.filter(f => f.status !== 'maintenance').length} / {fleet.length} {language === 'es' ? 'Unidades Operativas' : language === 'de' ? 'Einheiten im Einsatz' : 'Units Operational'}
        </span>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fleet.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-orange-300 transition-all shadow-2xs hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#f8f5f1] border border-stone-200 flex items-center justify-center">
                  {getVehicleIcon(vehicle.type)}
                </div>
                {getStatusBadge(vehicle.status)}
              </div>

              <div className="text-xs font-mono text-stone-400 uppercase font-bold">{vehicle.code}</div>
              <h3 className="text-lg font-bold text-[#232331] font-heading mt-0.5">{vehicle.name}</h3>
              <p className="text-xs text-orange-700 font-bold mt-1">{vehicle.currentRoute}</p>

              <div className="mt-5 pt-4 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#767676] flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-stone-400" />
                    {language === 'es' ? 'Posición:' : language === 'de' ? 'Position:' : 'Position:'}
                  </span>
                  <span className="font-semibold text-[#232331] text-right">{vehicle.currentLocation}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#767676] flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-stone-400" />
                    {language === 'es' ? 'Velocidad de Crucero:' : language === 'de' ? 'Geschwindigkeit:' : 'Cruising Speed:'}
                  </span>
                  <span className="font-bold text-[#232331] font-mono">{vehicle.speedKnotsOrKmh}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#767676] flex items-center gap-1">
                    <Anchor className="w-3.5 h-3.5 text-stone-400" />
                    {language === 'es' ? 'Capacidad de Carga:' : language === 'de' ? 'Ladekapazität:' : 'Payload Capacity:'}
                  </span>
                  <span className="font-bold text-[#232331] font-mono">{vehicle.capacity}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#767676] flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-stone-400" />
                    {language === 'es' ? 'Capitán / Comandante:' : language === 'de' ? 'Kapitän / Pilot:' : 'Commander / Lead:'}
                  </span>
                  <span className="font-semibold text-[#232331]">{vehicle.captainOrPilot}</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-stone-100">
                  <span className="text-[#767676] font-medium">ETA:</span>
                  <span className="font-bold text-emerald-700 font-mono">{vehicle.eta}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => {
                  setEditingVehicle(vehicle);
                  setNewStatus(vehicle.status);
                  setNewLocation(vehicle.currentLocation);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#f8f5f1] hover:bg-stone-200 text-[#232331] text-xs font-bold border border-stone-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Actualizar Telemetría' : language === 'de' ? 'Telemetrie anpassen' : 'Update Telemetry'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Vehicle Modal */}
      {editingVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#232331]/70 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-base font-bold text-[#232331] font-heading mb-1">
              {language === 'es' ? `Actualizar Estado de ${editingVehicle.name}` : `Update Status: ${editingVehicle.name}`}
            </h3>
            <p className="text-xs text-[#767676] mb-4">
              Código de Flota: {editingVehicle.code}
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#232331] font-bold mb-1">{language === 'es' ? 'Estado Operativo' : 'Status'}</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none font-bold"
                >
                  <option value="at_sea">At Sea (Bajo Waypoint Activo)</option>
                  <option value="in_flight">In Flight (En Vuelo Comercial)</option>
                  <option value="docked">Docked / Berthed (Atracado en Muelle)</option>
                  <option value="transit_road">Transit Road (En Carretera / Autovía)</option>
                  <option value="maintenance">Maintenance (En Revisión Técnica)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#232331] font-bold mb-1">{language === 'es' ? 'Ubicación Geográfica Actual' : 'Location'}</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingVehicle(null)}
                  className="px-4 py-2 rounded-xl bg-[#f8f5f1] hover:bg-stone-200 text-[#232331] font-bold cursor-pointer"
                >
                  {language === 'es' ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold cursor-pointer"
                >
                  {language === 'es' ? 'Guardar Telemetría' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
