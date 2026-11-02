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
  AlertTriangle
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

  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.bolNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.sender.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.consignee.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.origin.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.destination.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesMode = modeFilter === 'all' || s.mode === modeFilter;

    return matchesSearch && matchesStatus && matchesMode;
  });

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case 'delivered':
        return <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-200">{language === 'es' ? 'Entregado' : language === 'de' ? 'Zugestellt' : 'Delivered'}</span>;
      case 'in_transit':
        return <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded border border-blue-200">{language === 'es' ? 'En Tránsito' : language === 'de' ? 'In Transit' : 'In Transit'}</span>;
      case 'customs_hold':
        return <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-200">{language === 'es' ? 'Retención Aduana' : language === 'de' ? 'Zollprüfung' : 'Customs Hold'}</span>;
      case 'out_for_delivery':
        return <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded border border-purple-200">{language === 'es' ? 'En Reparto' : language === 'de' ? 'In Zustellung' : 'Out for Delivery'}</span>;
      case 'exception':
        return <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded border border-rose-200">{language === 'es' ? 'Excepción' : language === 'de' ? 'Ausnahme' : 'Exception'}</span>;
      default:
        return <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">{language === 'es' ? 'Reservado' : language === 'de' ? 'Gebucht' : 'Booked'}</span>;
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
          <h1 className="text-2xl font-black text-[#232331] font-heading tracking-tight">
            {language === 'es' ? 'Directorio de Envíos y Manifiestos' : language === 'de' ? 'Frachtsendungen & Manifeste' : 'Shipment Directory & Fleet Manifests'}
          </h1>
          <p className="text-xs text-[#767676] mt-0.5">
            {language === 'es' ? 'Gestión comercial de conocimientos de embarque, estados de carga y precintos.' : language === 'de' ? 'Verwaltung von Frachtbriefen, Containern und Meilensteinen.' : 'Manage commercial waybills, cargo status transitions, and container seals.'}
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
            <span>{language === 'es' ? '¿Confirmar eliminación permanente de este envío?' : language === 'de' ? 'Möchten Sie diese Frachtsendung wirklich löschen?' : 'Confirm permanent deletion of this shipment?'}</span>
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
              placeholder={language === 'es' ? 'Buscar por Tracking #, B/L, Contenedor, Remitente...' : language === 'de' ? 'Suche nach B/L, Tracking-Nr., Container, Versender...' : 'Search by Tracking #, B/L, Container ID, Shipper, Destination...'}
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
              <option value="booked">{language === 'es' ? 'Reservado' : language === 'de' ? 'Gebucht' : 'Booked'}</option>
              <option value="in_transit">{language === 'es' ? 'En Tránsito' : language === 'de' ? 'In Transit' : 'In Transit'}</option>
              <option value="customs_hold">{language === 'es' ? 'Retención Aduana' : language === 'de' ? 'Zollprüfung' : 'Customs Hold'}</option>
              <option value="out_for_delivery">{language === 'es' ? 'En Reparto' : language === 'de' ? 'In Zustellung' : 'Out for Delivery'}</option>
              <option value="delivered">{language === 'es' ? 'Entregado' : language === 'de' ? 'Zugestellt' : 'Delivered'}</option>
              <option value="exception">{language === 'es' ? 'Excepción' : language === 'de' ? 'Ausnahme' : 'Exception'}</option>
            </select>

            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="bg-[#f8f5f1] text-[#232331] text-xs font-semibold rounded-xl border border-stone-300 px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
            >
              <option value="all">{language === 'es' ? 'Todos los Modos' : language === 'de' ? 'Alle Modi' : 'All Modes'}</option>
              <option value="ocean_fcl">Ocean FCL</option>
              <option value="ocean_lcl">Ocean LCL</option>
              <option value="air_freight">Air Freight</option>
              <option value="rail_freight">Rail Cargo</option>
              <option value="road_transport">Road Transport</option>
              <option value="cold_chain">Cold Chain</option>
            </select>
          </div>
        </div>
      </div>

      {/* Manifests Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8f5f1] text-[#232331] uppercase font-bold text-[10px] tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4">{t.trackingCodeCol}</th>
                <th className="py-3.5 px-4">{t.shipperConsigneeCol}</th>
                <th className="py-3.5 px-4">{t.routingCol}</th>
                <th className="py-3.5 px-4">{t.containerSpecsCol}</th>
                <th className="py-3.5 px-4">{t.statusProgressCol}</th>
                <th className="py-3.5 px-4 text-right">{t.actionsCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-[#232331]">
              {filteredShipments.map((s) => (
                <tr key={s.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono">
                    <div className="font-bold text-xs text-[#232331]">{s.trackingNumber}</div>
                    <div className="text-[10px] text-stone-500">B/L: {s.bolNumber}</div>
                    <span className="inline-block mt-1 text-[10px] px-1.5 py-0.2 rounded bg-orange-50 text-orange-700 border border-orange-200 font-bold uppercase">
                      {s.mode.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#232331] truncate max-w-[170px]">
                      {s.sender.company}
                    </div>
                    <div className="text-[10px] text-stone-500 truncate max-w-[170px] mt-0.5 font-medium">
                      To: {s.consignee.company}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#232331]">
                      {s.origin.city} → {s.destination.city}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5 truncate max-w-[160px]">
                      Loc: {s.currentLocation.name}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-mono text-xs text-orange-700 font-bold">
                      {s.containerNumber}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5">
                      {s.cargo.weightKg.toLocaleString()} kg · {s.cargo.volumeCbm} CBM
                    </div>
                    {s.temperatureCelsius !== undefined && (
                      <span className="text-[10px] text-cyan-700 font-mono font-bold block mt-0.5">
                        ❄ {s.temperatureCelsius}°C
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    {getStatusBadge(s.status)}
                    <div className="w-24 h-2 bg-stone-100 rounded-full mt-2 overflow-hidden border border-stone-200">
                      <div
                        className="h-full bg-orange-600 rounded-full"
                        style={{ width: `${s.progressPercent}%` }}
                      ></div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenMilestoneModal(s.id)}
                        className="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded text-xs font-bold border border-orange-200 transition-colors cursor-pointer"
                        title="Update status & milestone"
                      >
                        Dispatch
                      </button>

                      <button
                        onClick={() => onOpenEditModal(s)}
                        className="p-1.5 text-stone-500 hover:text-[#232331] rounded hover:bg-stone-100 cursor-pointer"
                        title="Edit shipment details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setSelectedShipmentForPrint(s)}
                        className="p-1.5 text-stone-500 hover:text-[#232331] rounded hover:bg-stone-100 cursor-pointer"
                        title="Print Bill of Lading"
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
                        title="View customer tracking"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setPendingDeleteId(s.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded hover:bg-stone-100 cursor-pointer"
                        title="Delete shipment"
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
                    {language === 'es' ? 'No hay envíos que coincidan con la búsqueda.' : language === 'de' ? 'Keine Sendungen gefunden.' : 'No shipments match the current filters or search query.'}
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
