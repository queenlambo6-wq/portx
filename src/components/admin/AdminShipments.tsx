import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Package,
  Search,
  Plus,
  Printer,
  Edit3,
  Trash2,
  ExternalLink,
  MapPin,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Home,
  Copy,
  Check
} from 'lucide-react';
import { Shipment, ShipmentStatus, TransportMode } from '../../types';

interface AdminShipmentsProps {
  onOpenCreateModal: () => void;
  onOpenEditModal: (shipment: Shipment) => void;
  onOpenMilestoneModal: (shipmentId: string) => void;
}

export const AdminShipments: React.FC<AdminShipmentsProps> = ({
  onOpenCreateModal,
  onOpenEditModal,
  onOpenMilestoneModal
}) => {
  const {
    shipments,
    deleteShipment,
    setSelectedShipmentForPrint,
    setCurrentTrackingQuery,
    setIsAdminMode,
    setActiveView,
    t,
    language
  } = useShipping();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [modeFilter, setModeFilter] = useState<string>('all');
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    try {
      navigator.clipboard?.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const filteredShipments = shipments.filter((s) => {
    const term = searchTerm.toLowerCase();
    const petNameMatch = s.petInfo?.petName.toLowerCase().includes(term);
    const petBreedMatch = s.petInfo?.breed.toLowerCase().includes(term);
    const chipMatch = s.petInfo?.microchipNumber.toLowerCase().includes(term);
    const doorstepMatch = s.doorstepDelivery?.receiverDoorAddress.toLowerCase().includes(term);

    const matchesSearch =
      s.trackingNumber.toLowerCase().includes(term) ||
      s.containerNumber.toLowerCase().includes(term) ||
      s.bolNumber.toLowerCase().includes(term) ||
      s.sender.company.toLowerCase().includes(term) ||
      s.consignee.name.toLowerCase().includes(term) ||
      s.origin.city.toLowerCase().includes(term) ||
      s.destination.city.toLowerCase().includes(term) ||
      !!petNameMatch ||
      !!petBreedMatch ||
      !!chipMatch ||
      !!doorstepMatch;

    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesMode = modeFilter === 'all' || s.mode === modeFilter;

    return matchesSearch && matchesStatus && matchesMode;
  });

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case 'delivered':
        return <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-200">{language === 'es' ? 'Entregado en Puerta' : language === 'de' ? 'Zugestellt' : 'Delivered at Door'}</span>;
      case 'in_transit':
        return <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded border border-blue-200">{language === 'es' ? 'En Tránsito 21°C' : language === 'de' ? 'In Transit' : 'In Transit 21°C'}</span>;
      case 'customs_hold':
        return <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-200">{language === 'es' ? 'Revisión Veterinaria' : language === 'de' ? 'Zollprüfung' : 'Vet Check'}</span>;
      case 'out_for_delivery':
        return <span className="text-[10px] font-bold text-orange-900 bg-orange-100 px-2.5 py-0.5 rounded border border-orange-300 shadow-2xs">{language === 'es' ? 'En Furgoneta a Domicilio' : language === 'de' ? 'In Haustür-Zustellung' : 'Van to Doorstep'}</span>;
      case 'exception':
        return <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded border border-rose-200">{language === 'es' ? 'Atención Especial' : language === 'de' ? 'Ausnahme' : 'Care Alert'}</span>;
      default:
        return <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">{language === 'es' ? 'Registrado' : language === 'de' ? 'Gebucht' : 'Booked'}</span>;
    }
  };

  const confirmDelete = (id: string) => {
    deleteShipment(id);
    setPendingDeleteId(null);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#232331] font-heading tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 fill-orange-600 text-orange-600" />
            <span>{language === 'es' ? 'Gestión de Mascotas en Ruta y Reparto a Domicilio' : language === 'de' ? 'Haustier-Transporte & Hauszustellung' : 'Pet Transport & Doorstep Dispatch'}</span>
          </h1>
          <p className="text-xs text-[#767676] mt-0.5">
            {language === 'es' ? 'Control de furgonetas climatizadas, microchips, cartillas veterinarias y entregas en mano en la puerta del receptor.' : language === 'de' ? 'Verwaltung von Tiertransporten, Mikrochips und Haustür-Übergaben.' : 'Manage climate-controlled vans, microchips, veterinary clearances, and doorstep handovers.'}
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-orange-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.newShipmentBtn}</span>
        </button>
      </div>

      {/* Delete confirmation banner */}
      {pendingDeleteId && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-rose-800 font-bold">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>{language === 'es' ? '¿Confirmar eliminación permanente de este registro de mascota?' : language === 'de' ? 'Möchten Sie diesen Eintrag wirklich löschen?' : 'Confirm permanent deletion of this pet transport record?'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPendingDeleteId(null)}
              className="px-3 py-1 bg-white border border-stone-300 rounded text-stone-700 font-semibold"
            >
              {t.cancelBtn}
            </button>
            <button
              onClick={() => confirmDelete(pendingDeleteId)}
              className="px-3 py-1 bg-rose-600 text-white rounded font-bold hover:bg-rose-700"
            >
              {language === 'es' ? 'Eliminar' : language === 'de' ? 'Löschen' : 'Delete'}
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex items-center bg-[#f8f5f1] px-3.5 py-2.5 rounded-xl border border-stone-300 focus-within:border-orange-500 focus-within:bg-white focus-within:ring-1 focus-within:ring-orange-500">
            <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder={language === 'es' ? 'Buscar por Nombre de Mascota, Raza, Microchip, Dirección de Puerta...' : language === 'de' ? 'Suche nach Tiername, Rasse, Chip, Haustüradresse...' : 'Search by Pet Name, Breed, Microchip, Doorstep Address...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs text-[#232331] placeholder-stone-400 focus:outline-none w-full font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#f8f5f1] text-[#232331] text-xs font-semibold rounded-xl border border-stone-300 px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
            >
              <option value="all">{language === 'es' ? 'Todos los Estados' : language === 'de' ? 'Alle Status' : 'All Statuses'}</option>
              <option value="booked">{language === 'es' ? 'Registrado' : language === 'de' ? 'Gebucht' : 'Booked'}</option>
              <option value="in_transit">{language === 'es' ? 'En Tránsito 21°C' : language === 'de' ? 'In Transit' : 'In Transit'}</option>
              <option value="customs_hold">{language === 'es' ? 'Revisión Médica' : language === 'de' ? 'Zollprüfung' : 'Vet Check'}</option>
              <option value="out_for_delivery">{language === 'es' ? 'En Furgoneta a Domicilio' : language === 'de' ? 'In Haustür-Zustellung' : 'Van to Doorstep'}</option>
              <option value="delivered">{language === 'es' ? 'Entregado en Puerta' : language === 'de' ? 'Zugestellt' : 'Delivered'}</option>
            </select>

            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="bg-[#f8f5f1] text-[#232331] text-xs font-semibold rounded-xl border border-stone-300 px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
            >
              <option value="all">{language === 'es' ? 'Todas las Modalidades' : language === 'de' ? 'Alle Modi' : 'All Modes'}</option>
              <option value="road_transport">Furgoneta Puerta a Puerta</option>
              <option value="air_freight">Pet Nanny Aéreo</option>
              <option value="cold_chain">Cachorros / Adopciones</option>
              <option value="ocean_fcl">Reubicación Internacional</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Card List (Visible on Phone Screens < 640px) */}
      <div className="block sm:hidden space-y-3">
        {filteredShipments.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm space-y-3">
            {/* Header: Pet Name & Status */}
            <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-[#232331]">
                  <Heart className="w-3.5 h-3.5 fill-orange-600 text-orange-600 shrink-0" />
                  <span>{s.petInfo?.petName || 'Mascota'}</span>
                  {s.petInfo && (
                    <span className="text-[11px] font-normal text-stone-500">
                      ({s.petInfo.breed})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    {s.trackingNumber}
                  </span>
                  <button
                    onClick={() => handleCopyCode(s.trackingNumber, s.id)}
                    className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                    title="Copiar código"
                  >
                    {copiedId === s.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div>{getStatusBadge(s.status)}</div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>Ruta:</span>
                <strong className="text-[#232331]">{s.origin.city} → {s.destination.city}</strong>
              </div>
              <div className="flex items-start justify-between text-stone-600">
                <span className="shrink-0 flex items-center gap-1">
                  <Home className="w-3 h-3 text-orange-600" />
                  <span>Puerta:</span>
                </span>
                <span className="text-right text-orange-950 font-medium truncate max-w-[200px]">
                  {s.doorstepDelivery?.receiverDoorAddress || s.destination.portName}
                </span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Destinatario:</span>
                <strong className="text-[#232331]">{s.consignee.name} ({s.consignee.phone || '+34602493512'})</strong>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Cabina / Temp:</span>
                <span className="font-mono text-orange-700 font-bold">{s.temperatureCelsius || 21.5}°C</span>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-2.5 border-t border-stone-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => onOpenMilestoneModal(s.id)}
                className="py-2 px-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold text-center shadow-xs"
              >
                Actualizar Hito
              </button>
              <button
                onClick={() => {
                  setCurrentTrackingQuery(s.trackingNumber);
                  setIsAdminMode(false);
                  setActiveView('track');
                }}
                className="py-2 px-3 bg-[#f8f5f1] hover:bg-stone-200 text-[#232331] rounded-xl text-xs font-bold border border-stone-200 flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-orange-600" />
                <span>Ver Rastreo</span>
              </button>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1 text-[11px]">
              <button
                onClick={() => onOpenEditModal(s)}
                className="text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>Editar</span>
              </button>
              <button
                onClick={() => setSelectedShipmentForPrint(s)}
                className="text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1"
              >
                <Printer className="w-3 h-3" />
                <span>Certificado</span>
              </button>
              <button
                onClick={() => setPendingDeleteId(s.id)}
                className="text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        ))}

        {filteredShipments.length === 0 && (
          <div className="text-center py-8 bg-white rounded-2xl border border-stone-200 p-4 text-stone-500 text-xs">
            {language === 'es' ? 'No hay mascotas que coincidan con la búsqueda.' : 'No pet shipments found.'}
          </div>
        )}
      </div>

      {/* Manifests Desktop Table (Visible on Tablets and Desktops sm+) */}
      <div className="hidden sm:block bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8f5f1] text-[#232331] uppercase font-bold text-[10px] tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4">Código / Mascota</th>
                <th className="py-3.5 px-4">Destinatario & Dirección Puerta</th>
                <th className="py-3.5 px-4">Ruta y Ciudad</th>
                <th className="py-3.5 px-4">Raza / Microchip / Cabina</th>
                <th className="py-3.5 px-4">Estado en Puerta</th>
                <th className="py-3.5 px-4 text-right">{t.actionsCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-[#232331]">
              {filteredShipments.map((s) => (
                <tr key={s.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono">
                    <div className="font-bold text-xs text-[#232331] flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 fill-orange-600 text-orange-600 shrink-0" />
                      <span>{s.petInfo?.petName || s.trackingNumber}</span>
                    </div>
                    <div className="text-[10px] text-stone-500 font-mono mt-0.5">{s.trackingNumber}</div>
                    <span className="inline-block mt-1 text-[10px] px-1.5 py-0.2 rounded bg-orange-50 text-orange-700 border border-orange-200 font-bold uppercase">
                      {s.mode === 'road_transport' ? 'Furgoneta Puerta a Puerta' : s.mode.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#232331]">
                      {s.consignee.name}
                    </div>
                    <div className="text-[11px] text-orange-900 font-medium truncate max-w-[210px] mt-0.5 flex items-center gap-1">
                      <Home className="w-3 h-3 text-orange-600 shrink-0" />
                      <span>{s.doorstepDelivery?.receiverDoorAddress || s.destination.portName}</span>
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5">
                      Tel: {s.consignee.phone || '+34602493512'}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#232331]">
                      {s.origin.city} → {s.destination.city}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5 truncate max-w-[160px]">
                      {s.currentLocation.name}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-xs text-stone-900">
                      {s.petInfo ? `${s.petInfo.breed} (${s.petInfo.age})` : s.cargo.description}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5 font-mono">
                      Chip: {s.petInfo?.microchipNumber || s.sealNumber}
                    </div>
                    <span className="text-[10px] text-orange-700 font-mono font-bold block mt-0.5">
                      Cabina: {s.temperatureCelsius || 21.5}°C
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {getStatusBadge(s.status)}
                    <div className="w-24 h-2 bg-stone-100 rounded-full mt-2 overflow-hidden border border-stone-200">
                      <div
                        className="h-full bg-orange-600 rounded-full"
                        style={{ width: `${s.progressPercent}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-0.5">
                      {s.doorstepDelivery?.doorstepStatus === 'delivered_at_doorstep'
                        ? 'Firma en puerta confirmada'
                        : s.doorstepDelivery?.doorstepStatus === 'in_local_van'
                        ? 'En furgoneta hacia la puerta'
                        : 'Llegando al domicilio'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenMilestoneModal(s.id)}
                        className="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded text-xs font-bold border border-orange-200 transition-colors cursor-pointer"
                        title="Actualizar estado de cuidado o entrega"
                      >
                        Actualizar
                      </button>

                      <button
                        onClick={() => onOpenEditModal(s)}
                        className="p-1.5 text-stone-500 hover:text-[#232331] rounded hover:bg-stone-100 cursor-pointer"
                        title="Editar ficha de la mascota"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setSelectedShipmentForPrint(s)}
                        className="p-1.5 text-stone-500 hover:text-[#232331] rounded hover:bg-stone-100 cursor-pointer"
                        title="Imprimir certificado de viaje"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          setCurrentTrackingQuery(s.trackingNumber);
                          setIsAdminMode(false);
                          setActiveView('track');
                        }}
                        className="p-1.5 text-stone-500 hover:text-[#232331] rounded hover:bg-stone-100 cursor-pointer"
                        title="Ver seguimiento de cliente"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setPendingDeleteId(s.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded hover:bg-stone-100 cursor-pointer"
                        title="Eliminar registro"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredShipments.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-stone-500">
                    {language === 'es' ? 'No hay mascotas que coincidan con la búsqueda.' : language === 'de' ? 'Keine Tiere gefunden.' : 'No pet shipments match the current filters or search query.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
