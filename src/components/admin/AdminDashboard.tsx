import React from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Package,
  Clock,
  MapPin,
  FileText,
  Activity,
  ArrowUpRight,
  ArrowRight,
  ShieldAlert,
  Plus,
  Heart
} from 'lucide-react';
import { ShipmentStatus } from '../../types';

interface AdminDashboardProps {
  onOpenCreateModal: () => void;
  onOpenMilestoneModal: (shipmentId?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onOpenCreateModal,
  onOpenMilestoneModal
}) => {
  const {
    shipments,
    inquiries,
    fleet,
    ports,
    setAdminSubView,
    setSelectedShipmentForPrint,
    setCurrentTrackingQuery,
    setIsAdminMode,
    setActiveView,
    t,
    language
  } = useShipping();

  const totalActive = shipments.filter((s) => s.status !== 'delivered').length;
  const inTransitCount = shipments.filter((s) => s.status === 'in_transit').length;
  const holdsCount = shipments.filter((s) => s.status === 'customs_hold' || s.status === 'exception').length;
  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'pending').length;

  const totalWeightKg = shipments.reduce((acc, curr) => acc + curr.cargo.weightKg, 0);

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

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Top Banner / Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#232331] font-heading tracking-tight">
            {t.adminDashboardTitle}
          </h1>
          <p className="text-xs text-[#767676] mt-1">
            {t.adminDashboardSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenMilestoneModal()}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-[#232331] text-xs font-bold border border-stone-300 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-orange-600" />
            <span>{t.recordCheckpointBtn}</span>
          </button>
          <button
            onClick={onOpenCreateModal}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-orange-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.newShipmentBtn}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards with PortX Colors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-stone-200 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-stone-500 text-[11px] font-bold uppercase tracking-wider block">
              {t.activeShipmentsKpi}
            </span>
            <div className="text-3xl font-black text-[#232331] font-mono mt-1">{totalActive}</div>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {inTransitCount} {language === 'es' ? 'en tránsito activo' : language === 'de' ? 'im aktiven Transit' : 'in active transit'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-stone-200 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-stone-500 text-[11px] font-bold uppercase tracking-wider block">
              {t.customsHoldsKpi}
            </span>
            <div className={`text-3xl font-black font-mono mt-1 ${holdsCount > 0 ? 'text-amber-600' : 'text-[#232331]'}`}>
              {holdsCount}
            </div>
            <span className="text-[11px] text-stone-500 mt-1 font-medium">
              {language === 'es' ? 'Auditoría requerida' : language === 'de' ? 'Prüfung erforderlich' : 'Requires audit'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-stone-200 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-stone-500 text-[11px] font-bold uppercase tracking-wider block">
              {t.inquiriesKpi}
            </span>
            <div className="text-3xl font-black text-[#232331] font-mono mt-1">{inquiries.length}</div>
            <span className="text-[11px] text-orange-700 mt-1 font-bold">
              {pendingInquiriesCount} {language === 'es' ? 'pendientes de cotización' : language === 'de' ? 'Angebote offen' : 'quotes pending'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-stone-200 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-stone-500 text-[11px] font-bold uppercase tracking-wider block">
              {t.weightManifestedKpi}
            </span>
            <div className="text-2xl font-black text-[#232331] font-mono mt-1">
              {(totalWeightKg / 1000).toFixed(1)} MT
            </div>
            <span className="text-[11px] text-stone-500 mt-1 font-medium">
              {fleet.length} {language === 'es' ? 'unidades de flota activas' : language === 'de' ? 'aktive Flotteneinheiten' : 'active fleet units'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Real-time Telemetry AIS Operations Ticker */}
      <div className="bg-orange-50/70 rounded-2xl border border-orange-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-orange-600 text-white font-black text-[10px] uppercase tracking-wider shrink-0 flex items-center gap-1 shadow-2xs">
            <Activity className="w-3.5 h-3.5" />
            {t.recentPingsTitle}
          </span>
          <p className="text-xs text-[#232331] font-mono font-medium">
            Vessel <strong className="text-orange-950 font-bold">PortX Explorer IV</strong> (Voyage 409E) reported waypoint Malacca Strait Approach (Speed 19.4 kts, ETA Nov 05).
          </p>
        </div>
        <button
          onClick={() => setAdminSubView('fleet')}
          className="text-xs font-bold text-orange-700 hover:text-orange-800 shrink-0 flex items-center gap-1 cursor-pointer"
        >
          <span>Fleet Telemetry</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Shipments In Flight Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="text-base font-bold text-[#232331] font-heading">
                {t.activeManifestsTitle}
              </h3>
              <p className="text-xs text-[#767676]">
                Direct control over carrier checkpoints, status transitions, and container tags.
              </p>
            </div>
            <button
              onClick={() => setAdminSubView('shipments')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({shipments.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8f5f1] text-[#232331] uppercase font-bold text-[10px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3 px-3">{t.trackingCodeCol}</th>
                  <th className="py-3 px-3">{t.routingCol}</th>
                  <th className="py-3 px-3">{t.currentCheckpoint}</th>
                  <th className="py-3 px-3">{t.statusProgressCol}</th>
                  <th className="py-3 px-3 text-right">{t.actionsCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-[#232331]">
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-[#232331] text-xs flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-orange-600 text-orange-600" />
                        <span>{shipment.petInfo ? `${shipment.petInfo.petName} (${shipment.trackingNumber})` : shipment.trackingNumber}</span>
                      </div>
                      <div className="text-[10px] text-[#767676] font-mono mt-0.5">
                        {shipment.petInfo?.breed || shipment.containerNumber}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-[#232331] truncate max-w-[200px]">
                        {shipment.origin.city} → {shipment.doorstepDelivery?.receiverCity || shipment.destination.city}
                      </div>
                      <div className="text-[10px] text-orange-800 font-medium truncate max-w-[200px]">
                        Puerta: {shipment.doorstepDelivery?.receiverDoorAddress || shipment.destination.portName}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="text-xs text-[#232331] font-medium max-w-[180px] truncate">
                        {shipment.currentLocation.name}
                      </div>
                      <div className="text-[10px] text-[#767676]">
                        ETA: {new Date(shipment.estimatedArrival).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      {getStatusBadge(shipment.status)}
                    </td>

                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenMilestoneModal(shipment.id)}
                          className="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded text-[11px] font-bold border border-orange-200 transition-colors cursor-pointer"
                          title="Add tracking milestone / change location"
                        >
                          Dispatch
                        </button>
                        <button
                          onClick={() => {
                            setCurrentTrackingQuery(shipment.trackingNumber);
                            setIsAdminMode(false);
                            setActiveView('track');
                          }}
                          className="p-1 text-stone-500 hover:text-[#232331] rounded hover:bg-stone-100 cursor-pointer"
                          title="View on customer tracking page"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setSelectedShipmentForPrint(shipment)}
                          className="p-1 text-stone-500 hover:text-[#232331] rounded hover:bg-stone-100 cursor-pointer"
                          title="Print official Bill of Lading"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4 Cols: Quick Inquiries & Fast Converter */}
        <div className="lg:col-span-4 space-y-6">
          {/* Incoming Customer Quote Inquiries */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-sm font-bold text-[#232331] font-heading">
                  {language === 'es' ? 'Cotizaciones Pendientes' : language === 'de' ? 'Offene Preisanfragen' : 'Pending Cargo Requests'}
                </h3>
                <p className="text-[11px] text-[#767676]">
                  {language === 'es' ? 'Cotizaciones en espera de conversión a envío activo.' : language === 'de' ? 'Warten auf operative Freigabe.' : 'Awaiting conversion to active shipment.'}
                </p>
              </div>
              <button
                onClick={() => setAdminSubView('inquiries')}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
              >
                {language === 'es' ? 'Gestionar' : language === 'de' ? 'Verwalten' : 'Manage'}
              </button>
            </div>

            <div className="space-y-3">
              {inquiries.slice(0, 3).map((inq) => (
                <div key={inq.id} className="p-3 bg-[#f8f5f1] rounded-xl border border-stone-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-orange-700">{inq.quoteRef}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                      inq.status === 'converted'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : inq.status === 'approved'
                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                        : 'bg-amber-100 text-amber-800 border-amber-200'
                    }`}>
                      {inq.status}
                    </span>
                  </div>

                  <div className="font-bold text-[#232331]">{inq.companyName}</div>
                  <div className="text-[11px] text-[#767676]">
                    {inq.origin.split(' ')[0]} → {inq.destination.split(' ')[0]} ({inq.mode.split('_')[0]})
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-stone-200 text-[11px]">
                    <span className="text-stone-500 font-mono font-semibold">${inq.estimatedCostUsd.toLocaleString()}</span>
                    <button
                      onClick={() => setAdminSubView('inquiries')}
                      className="text-orange-600 font-bold hover:underline cursor-pointer"
                    >
                      {language === 'es' ? 'Revisar y Convertir →' : language === 'de' ? 'Prüfen & Freigeben →' : 'Review & Convert →'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hub Status Summary */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#232331] font-heading mb-3">
              {language === 'es' ? 'Congestión y Atraques Portuarios' : language === 'de' ? 'Hafen-Auslastung' : 'Terminal Berthing Congestion'}
            </h3>
            <div className="space-y-2.5 text-xs">
              {ports.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-2.5 bg-[#f8f5f1] rounded-lg border border-stone-200">
                  <div>
                    <span className="font-bold text-[#232331] block">{p.name}</span>
                    <span className="text-[10px] text-stone-500 font-mono">{p.code} · {p.activePortxVessels} vessels docked</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    p.congestionStatus === 'normal'
                      ? 'text-emerald-800 bg-emerald-100'
                      : p.congestionStatus === 'moderate'
                      ? 'text-amber-800 bg-amber-100'
                      : 'text-rose-800 bg-rose-100'
                  }`}>
                    {p.congestionStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
