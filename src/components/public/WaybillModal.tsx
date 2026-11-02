import React from 'react';
import { useShipping } from '../../context/ShippingContext';
import { X, Printer, Heart, Home, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Shipment } from '../../types';

interface WaybillModalProps {
  shipment: Shipment | null;
  onClose: () => void;
}

export const WaybillModal: React.FC<WaybillModalProps> = ({ shipment, onClose }) => {
  if (!shipment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white border border-slate-200 print:border-none print:bg-white print:text-black rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl my-6">
        
        {/* Floating Print & Close bar (hidden during print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-orange-600" />
              Certificado Oficial de Transporte Animal & Entrega en Puerta
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-800 font-mono font-bold">{shipment.trackingNumber}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>Imprimir Certificado (PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Pet Waybill Printable Sheet */}
        <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-xl border border-slate-300 text-xs font-sans">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-900 pb-4 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded bg-orange-600 flex items-center justify-center text-white">
                  <Heart className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-950 font-heading">
                    PORTX PET RELOCATION & DOORSTEP CARGO
                  </h1>
                  <p className="text-[10px] text-slate-600 font-medium">
                    TRANSPORTE ESPECIALIZADO DE ANIMALES VIVOS (IATA LAR) · ENTREGA DIRECTA EN MANO A DOMICILIO
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">
                PortX Live Animals Division · Homologación Sanitaria UE #ES-VET-9021 · Tel: +34602493512
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-slate-300 sm:pl-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-orange-600 block">
                GUÍA DE TRANSPORTE Y ENTREGA EN PUERTA
              </span>
              <div className="text-lg font-black font-mono text-slate-900 mt-0.5">
                {shipment.bolNumber}
              </div>
              <div className="text-[10px] text-slate-600 mt-1 font-mono">
                Tracking: <strong>{shipment.trackingNumber}</strong>
              </div>
              <div className="text-[10px] text-slate-600 font-mono">
                Microchip: <strong>{shipment.petInfo?.microchipNumber || shipment.sealNumber}</strong>
              </div>
            </div>
          </div>

          {/* Party Blocks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-slate-400 mt-2">
            {/* Shipper */}
            <div className="p-3 border-r border-slate-400 sm:border-b-0 border-b">
              <span className="text-[9px] uppercase font-bold text-slate-500 block mb-0.5">
                1. Remitente / Criador / Centro de Origen
              </span>
              <div className="font-bold text-slate-950 text-xs">{shipment.sender.name}</div>
              <div className="text-[11px] text-slate-700">{shipment.sender.company}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{shipment.sender.city}, {shipment.sender.country}</div>
              <div className="text-[10px] text-slate-500 mt-1">Tel: {shipment.sender.phone}</div>
            </div>

            {/* Consignee & Doorstep Address */}
            <div className="p-3 bg-orange-50/50">
              <span className="text-[9px] uppercase font-bold text-orange-700 block mb-0.5 flex items-center gap-1">
                <Home className="w-3 h-3 text-orange-600" />
                <span>2. Destinatario y Dirección Exacta de Entrega en Puerta</span>
              </span>
              <div className="font-bold text-slate-950 text-xs">{shipment.consignee.name}</div>
              <div className="text-[11px] text-orange-950 font-bold mt-0.5">
                {shipment.doorstepDelivery?.receiverDoorAddress || shipment.destination.portName}
              </div>
              <div className="text-[10px] text-slate-600 mt-0.5">
                {shipment.destination.city}, {shipment.destination.country} · Tel: {shipment.consignee.phone || '+34602493512'}
              </div>
              <div className="text-[9px] text-emerald-700 font-semibold mt-1">
                ✓ Entrega programada en mano en el domicilio del destinatario.
              </div>
            </div>
          </div>

          {/* Vehicle & Care Handler Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-400 text-[10px]">
            <div className="p-2 border-r border-slate-400">
              <span className="font-bold text-slate-500 block">Vehículo / Furgoneta:</span>
              <span className="font-semibold text-slate-800">{shipment.carrier.vesselOrFlightName}</span>
            </div>
            <div className="p-2 border-r border-slate-400">
              <span className="font-bold text-slate-500 block">Cuidador Asignado:</span>
              <span className="font-semibold text-slate-800">{shipment.doorstepDelivery?.courierHandlerName || 'Cuidador Certificado'}</span>
            </div>
            <div className="p-2 border-r border-slate-400">
              <span className="font-bold text-slate-500 block">Climatización de Cabina:</span>
              <span className="font-semibold text-orange-700 font-mono">{shipment.temperatureCelsius || 21.5}°C Constante</span>
            </div>
            <div className="p-2">
              <span className="font-bold text-slate-500 block">Hora Estimada en Puerta:</span>
              <span className="font-semibold text-emerald-700">{shipment.doorstepDelivery?.estimatedDoorArrivalTime || 'En ventana acordada'}</span>
            </div>
          </div>

          {/* Pet Details Table */}
          <div className="mt-2 border-b border-slate-400">
            <table className="w-full text-left text-[10px]">
              <thead className="bg-slate-100 border-b border-slate-400 font-bold uppercase text-slate-600">
                <tr>
                  <th className="p-2 w-1/4">Nombre & Especie</th>
                  <th className="p-2 w-1/5">Raza & Edad</th>
                  <th className="p-2 w-1/4">Nº Microchip & Pasaporte</th>
                  <th className="p-2 w-1/6">Transportín IATA</th>
                  <th className="p-2 w-1/8 text-right">Peso (kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2 font-mono align-top">
                    <strong className="text-slate-900 text-xs block">
                      {shipment.petInfo?.petName || 'Mascota'}
                    </strong>
                    <span className="text-slate-500 block">
                      {shipment.petInfo?.speciesLabel || 'Animal de Compañía'}
                    </span>
                  </td>
                  <td className="p-2 align-top font-semibold">
                    <div>{shipment.petInfo?.breed || shipment.cargo.description}</div>
                    <div className="text-slate-500 text-[9px]">{shipment.petInfo?.age} · {shipment.petInfo?.gender || 'Certificado'}</div>
                  </td>
                  <td className="p-2 align-top font-mono">
                    <div className="font-bold text-slate-900">
                      Chip: {shipment.petInfo?.microchipNumber || shipment.sealNumber}
                    </div>
                    <div className="text-slate-500 text-[9px] mt-0.5">
                      Pasaporte: {shipment.petInfo?.healthPassportNumber || shipment.bolNumber}
                    </div>
                  </td>
                  <td className="p-2 align-top text-slate-700">
                    {shipment.petInfo?.crateModel || 'IATA Homologado'}
                  </td>
                  <td className="p-2 align-top text-right font-mono font-bold">
                    {shipment.cargo.weightKg} KGS
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Handover & Signatures at Doorstep */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-[9px] text-slate-600">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block text-[10px] uppercase">
                Declaración de Bienestar y Cuidados del Transportista
              </span>
              <p className="leading-tight">
                Se certifica que el animal ha sido transportado bajo la normativa IATA Live Animals Regulations (LAR), 
                con monitoreo continuo de temperatura a 21°C, bebederos con agua fresca renovada y paradas regulares 
                de esparcimiento.
              </p>
              <div className="mt-3 pt-2 border-t border-slate-300 flex justify-between items-center text-[10px]">
                <span>Firma del Cuidador / Conductor:</span>
                <span className="font-serif italic font-bold text-slate-800">PortX Care Transport Signed</span>
              </div>
            </div>

            <div className="p-3 bg-orange-50/60 rounded-lg border border-orange-200 space-y-1">
              <span className="font-bold text-orange-950 block text-[10px] uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Recepción y Firma en Mano en la Puerta del Destinatario</span>
              </span>
              <p className="text-orange-900 leading-tight">
                El receptor confirma la entrega en mano en la puerta de su domicilio, habiendo comprobado el microchip 
                y el estado saludable, alegre y tranquilo de la mascota.
              </p>
              <div className="mt-3 pt-2 border-t border-orange-300 flex justify-between items-center text-[10px]">
                <span>Firma del Receptor en Puerta:</span>
                <span className="font-mono text-emerald-800 font-bold">
                  {shipment.doorstepDelivery?.handoverProof?.signedBy || 'Firma Digital en Puerta'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
