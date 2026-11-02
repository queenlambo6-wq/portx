import React from 'react';
import { useShipping } from '../../context/ShippingContext';
import { X, Printer, Plane, Ship } from 'lucide-react';
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

  const isAir = shipment.mode === 'air_freight';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white border border-slate-200 print:border-none print:bg-white print:text-black rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl my-6">
        
        {/* Floating Print & Close bar (hidden during print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Official Transport Document
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
              <span>Print Waybill (PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Bill of Lading Printable Sheet */}
        <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-xl border border-slate-300 text-xs font-sans">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-900 pb-4 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-orange-600 flex items-center justify-center text-white">
                  {isAir ? <Plane className="w-5 h-5" /> : <Ship className="w-5 h-5" />}
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-950 font-heading">
                    PORTX GLOBAL LOGISTICS
                  </h1>
                  <p className="text-[10px] text-slate-600 font-medium">
                    INTERNATIONAL FREIGHT FORWARDING & LINER OPERATIONS
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">
                PortX Global Logistics · Reg # NL8492019 · FIATA / IATA Accredited · Tel: +34602493512
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-slate-300 sm:pl-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
                {isAir ? 'NON-NEGOTIABLE AIR WAYBILL' : 'NEGOTIABLE COMBINED TRANSPORT BILL OF LADING'}
              </span>
              <div className="text-lg font-black font-mono text-slate-900 mt-0.5">
                {shipment.bolNumber}
              </div>
              <div className="text-[10px] text-slate-600 mt-1 font-mono">
                Tracking Ref: <strong>{shipment.trackingNumber}</strong>
              </div>
              <div className="text-[10px] text-slate-600 font-mono">
                Booking: <strong>{shipment.bookingRef}</strong>
              </div>
            </div>
          </div>

          {/* Party Blocks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-slate-400 mt-2">
            {/* Shipper */}
            <div className="p-3 border-r border-slate-400 sm:border-b-0 border-b">
              <span className="text-[9px] uppercase font-bold text-slate-500 block mb-0.5">
                1. Shipper / Exporter
              </span>
              <div className="font-bold text-slate-950 text-xs">{shipment.sender.company}</div>
              <div className="text-[11px] text-slate-700">{shipment.sender.city}, {shipment.sender.country}</div>
              <div className="text-[10px] text-slate-500 mt-1">Contact: {shipment.sender.name} ({shipment.sender.phone})</div>
            </div>

            {/* Consignee */}
            <div className="p-3">
              <span className="text-[9px] uppercase font-bold text-slate-500 block mb-0.5">
                2. Consignee
              </span>
              <div className="font-bold text-slate-950 text-xs">{shipment.consignee.company}</div>
              <div className="text-[11px] text-slate-700">{shipment.consignee.city}, {shipment.consignee.country}</div>
              <div className="text-[10px] text-slate-500 mt-1">Contact: {shipment.consignee.name} ({shipment.consignee.phone})</div>
            </div>
          </div>

          {/* Vessel & Ports Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-400 text-[10px]">
            <div className="p-2 border-r border-slate-400">
              <span className="font-bold text-slate-500 block">Pre-Carriage By:</span>
              <span className="font-semibold text-slate-800">PortX Intermodal Hub</span>
            </div>
            <div className="p-2 border-r border-slate-400">
              <span className="font-bold text-slate-500 block">Port of Loading (POL):</span>
              <span className="font-semibold text-slate-800">{shipment.origin.portName} ({shipment.origin.portCode})</span>
            </div>
            <div className="p-2 border-r border-slate-400">
              <span className="font-bold text-slate-500 block">{isAir ? 'Flight / Carrier:' : 'Vessel / Voyage:'}</span>
              <span className="font-semibold text-slate-800">{shipment.carrier.vesselOrFlightName} / {shipment.carrier.voyageOrFlightNumber}</span>
            </div>
            <div className="p-2">
              <span className="font-bold text-slate-500 block">Port of Discharge (POD):</span>
              <span className="font-semibold text-slate-800">{shipment.destination.portName} ({shipment.destination.portCode})</span>
            </div>
          </div>

          {/* Cargo Goods Table */}
          <div className="mt-2 border-b border-slate-400">
            <table className="w-full text-left text-[10px]">
              <thead className="bg-slate-100 border-b border-slate-400 font-bold uppercase text-slate-600">
                <tr>
                  <th className="p-2 w-1/4">Container & Seal No.</th>
                  <th className="p-2 w-1/6">Pieces / Packages</th>
                  <th className="p-2 w-1/3">Description of Goods</th>
                  <th className="p-2 w-1/8 text-right">Gross Weight</th>
                  <th className="p-2 w-1/8 text-right">Measurement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2 font-mono align-top">
                    <strong className="text-slate-900 block">{shipment.containerNumber}</strong>
                    <span className="text-slate-500 block">Seal: {shipment.sealNumber}</span>
                    {shipment.temperatureCelsius !== undefined && (
                      <span className="text-cyan-700 font-bold block mt-1">Reefer: {shipment.temperatureCelsius}°C</span>
                    )}
                  </td>
                  <td className="p-2 align-top font-semibold">
                    {shipment.cargo.pieces} Units
                  </td>
                  <td className="p-2 align-top">
                    <div className="font-bold text-slate-900">{shipment.cargo.description}</div>
                    <div className="text-slate-500 text-[9px] mt-0.5">HS Tariff: {shipment.cargo.hsCode || '8479.89'} · Freight Prepaid</div>
                    <div className="text-[9px] text-slate-500 mt-1 italic">Shippers Load, Stow and Count (SLAC)</div>
                  </td>
                  <td className="p-2 align-top text-right font-mono font-bold">
                    {shipment.cargo.weightKg.toLocaleString()} KGS
                  </td>
                  <td className="p-2 align-top text-right font-mono font-bold">
                    {shipment.cargo.volumeCbm} CBM
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Clauses & Signatures */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 text-[9px] text-slate-600">
            <div className="sm:col-span-2 space-y-1">
              <p className="leading-tight">
                RECEIVED by the Carrier the goods in apparent good order and condition unless otherwise stated herein. 
                In accepting this Bill of Lading, the Merchant agrees to be bound by all the stipulations, exceptions, terms, 
                and conditions on the face and back hereof, whether written, typed, stamped or printed.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <span className="font-mono">Declared Value: USD $120,000</span>
                <span>·</span>
                <span className="font-mono">Freight Terms: PREPAID</span>
                <span>·</span>
                <span className="font-mono">Originals Issued: THREE (3)</span>
              </div>
            </div>

            {/* Stamp & Signature Box */}
            <div className="border border-slate-300 p-2.5 rounded text-center flex flex-col justify-between h-24 bg-slate-50">
              <span className="text-[8px] uppercase tracking-wider text-slate-500">
                For and on behalf of PortX Global as Carrier
              </span>
              <div className="text-xs font-serif italic text-blue-900 font-bold">
                J. Visser (Authorized PortX Signatory)
              </div>
              <div className="text-[8px] text-slate-500 font-mono">
                Date: {new Date(shipment.departedAt).toLocaleDateString()} · PortX Operations Terminal
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-4 flex justify-between items-center text-xs text-slate-500 print:hidden">
          <span>Official Carrier Copy · Verification Code: {shipment.trackingNumber}-VERIFIED</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold cursor-pointer"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
