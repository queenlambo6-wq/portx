import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  MessageSquare,
  CheckCircle2,
  DollarSign,
  User,
  Building,
  Mail,
  Phone,
  Sparkles
} from 'lucide-react';
import { BookingInquiry } from '../../types';

export const AdminInquiries: React.FC = () => {
  const {
    inquiries,
    updateInquiryStatus,
    convertInquiryToShipment,
    setAdminSubView,
    language
  } = useShipping();

  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'converted'>('all');
  const [convertedShipmentNotice, setConvertedShipmentNotice] = useState<{
    inqRef: string;
    trackingNumber: string;
  } | null>(null);

  const filtered = inquiries.filter((inq) => {
    if (filter === 'all') return true;
    return inq.status === filter;
  });

  const handleConvert = (inquiryId: string, quoteRef: string) => {
    const created = convertInquiryToShipment(inquiryId);
    if (created) {
      setConvertedShipmentNotice({
        inqRef: quoteRef,
        trackingNumber: created.trackingNumber
      });
      setTimeout(() => setConvertedShipmentNotice(null), 5000);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#232331] font-heading tracking-tight">
            {language === 'es' ? 'Solicitudes Comerciales de Reserva y Cupos' : language === 'de' ? 'Kommerzielle Buchungsanfragen' : 'Commercial Booking Inquiries & Space Requests'}
          </h1>
          <p className="text-xs text-[#767676] mt-0.5">
            {language === 'es' ? 'Revise cotizaciones recibidas de clientes, apruebe cupos y convierta reservas directamente en envíos activos con tracking.' : language === 'de' ? 'Prüfen Sie Frachtanfragen und konvertieren Sie diese in aktive Sendungen.' : 'Review customer quote submissions and convert approved bookings directly into active shipments.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'pending', 'approved', 'converted'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                filter === tab
                  ? 'bg-red-600 text-white shadow-2xs'
                  : 'bg-white text-stone-600 hover:text-[#232331] border border-stone-200'
              }`}
            >
              {tab === 'all' && (language === 'es' ? 'Todos' : language === 'de' ? 'Alle' : 'All')}
              {tab === 'pending' && (language === 'es' ? 'Pendientes' : language === 'de' ? 'Offen' : 'Pending')}
              {tab === 'approved' && (language === 'es' ? 'Aprobados' : language === 'de' ? 'Genehmigt' : 'Approved')}
              {tab === 'converted' && (language === 'es' ? 'Convertidos' : language === 'de' ? 'Aktiviert' : 'Converted')}
              {' '}({inquiries.filter((i) => tab === 'all' || i.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      {convertedShipmentNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div>
              <span className="font-bold">{language === 'es' ? `¡Solicitud ${convertedShipmentNotice.inqRef} convertida a envío activo!` : `Inquiry ${convertedShipmentNotice.inqRef} converted to active shipment!`}</span>
              <span className="block text-stone-600 font-mono mt-0.5 font-medium">
                {language === 'es' ? 'Código de Seguimiento asignado: ' : 'New Tracking Code: '}
                <strong className="text-red-600 font-bold">{convertedShipmentNotice.trackingNumber}</strong>.
              </span>
            </div>
          </div>
          <button
            onClick={() => setAdminSubView('shipments')}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
          >
            {language === 'es' ? 'Ver Envíos' : language === 'de' ? 'Sendungen öffnen' : 'Open Shipments'}
          </button>
        </div>
      )}

      {/* Inquiries Cards */}
      <div className="space-y-4">
        {filtered.map((inq) => (
          <div
            key={inq.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-red-300 transition-all shadow-2xs hover:shadow-md"
          >
            {/* Left Info */}
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono font-bold text-red-600 text-sm">
                  {inq.quoteRef}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded border ${
                    inq.status === 'converted'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : inq.status === 'approved'
                      ? 'bg-blue-100 text-blue-800 border-blue-200'
                      : inq.status === 'rejected'
                      ? 'bg-rose-100 text-rose-800 border-rose-200'
                      : 'bg-amber-100 text-amber-800 border-amber-200'
                  }`}
                >
                  {inq.status}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">{inq.createdAt}</span>
                <span className="text-[11px] font-bold text-stone-700 uppercase px-2.5 py-0.5 rounded bg-[#f8f5f1] border border-stone-200">
                  {inq.mode.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">{language === 'es' ? 'Cliente / Remitente' : 'Client / Shipper'}</span>
                  <div className="font-bold text-[#232331] text-sm">{inq.companyName}</div>
                  <div className="text-stone-600 mt-0.5">{inq.fullName} · {inq.email}</div>
                  <div className="text-stone-500 text-[10px]">{inq.phone}</div>
                </div>

                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">{language === 'es' ? 'Ruta y Fecha' : 'Routing & Date'}</span>
                  <div className="font-bold text-[#232331]">
                    {inq.origin.split(' ')[0]} → {inq.destination.split(' ')[0]}
                  </div>
                  <div className="text-stone-600 text-[11px] mt-0.5">{inq.requestedDate}</div>
                  <div className="text-stone-500 text-[10px]">{inq.containerOrPackageType}</div>
                </div>

                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">{language === 'es' ? 'Presupuesto Estimado' : 'Estimated Quote'}</span>
                  <div className="font-mono font-bold text-lg text-[#232331]">${inq.estimatedCostUsd.toLocaleString()}</div>
                  <div className="text-stone-500 text-[10px]">{inq.weightKg.toLocaleString()} kg · {inq.volumeCbm} CBM</div>
                </div>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-row md:flex-col items-center justify-end gap-2 shrink-0">
              {inq.status !== 'converted' && (
                <button
                  onClick={() => handleConvert(inq.id, inq.quoteRef)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Convertir a Envío Activo' : language === 'de' ? 'In Sendung umwandeln' : 'Convert to Active Shipment'}</span>
                </button>
              )}
              {inq.status === 'converted' && (
                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'En Tránsito Operativo' : language === 'de' ? 'Bereits aktiviert' : 'Live Shipment Active'}</span>
                </span>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 shadow-2xs">
            <MessageSquare className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <h3 className="font-bold text-[#232331] text-sm">{language === 'es' ? 'No hay solicitudes en esta categoría' : 'No inquiries in this category'}</h3>
          </div>
        )}
      </div>
    </div>
  );
};
