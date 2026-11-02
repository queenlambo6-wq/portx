import React, { useState, useEffect } from 'react';
import { useShipping } from '../../context/ShippingContext';
import { X, Save } from 'lucide-react';
import { Shipment, TransportMode, ShipmentStatus } from '../../types';

interface AdminShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipmentToEdit?: Shipment | null;
}

export const AdminShipmentModal: React.FC<AdminShipmentModalProps> = ({
  isOpen,
  onClose,
  shipmentToEdit
}) => {
  const { createShipment, updateShipment, ports } = useShipping();

  const isEditing = !!shipmentToEdit;

  const [trackingNumber, setTrackingNumber] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [bolNumber, setBolNumber] = useState('');
  const [mode, setMode] = useState<TransportMode>('ocean_fcl');
  const [status, setStatus] = useState<ShipmentStatus>('in_transit');

  // Shipper
  const [shipperCompany, setShipperCompany] = useState('');
  const [shipperName, setShipperName] = useState('');
  const [shipperCity, setShipperCity] = useState('');
  const [shipperCountry, setShipperCountry] = useState('');
  const [shipperEmail, setShipperEmail] = useState('');
  const [shipperPhone, setShipperPhone] = useState('');

  // Consignee
  const [consigneeCompany, setConsigneeCompany] = useState('');
  const [consigneeName, setConsigneeName] = useState('');
  const [consigneeCity, setConsigneeCity] = useState('');
  const [consigneeCountry, setConsigneeCountry] = useState('');
  const [consigneeEmail, setConsigneeEmail] = useState('');
  const [consigneePhone, setConsigneePhone] = useState('');

  // Origin & Destination
  const [originPortCode, setOriginPortCode] = useState('NLRTM');
  const [destPortCode, setDestPortCode] = useState('SGSIN');

  // Vessel / Carrier
  const [carrierName, setCarrierName] = useState('PortX Ocean Lines');
  const [vesselName, setVesselName] = useState('PortX Explorer IV');
  const [containerNumber, setContainerNumber] = useState('');
  const [sealNumber, setSealNumber] = useState('');

  // Cargo
  const [cargoDesc, setCargoDesc] = useState('');
  const [pieces, setPieces] = useState(100);
  const [weightKg, setWeightKg] = useState(18500);
  const [volumeCbm, setVolumeCbm] = useState(55);
  const [temperatureCelsius, setTemperatureCelsius] = useState<number | undefined>(undefined);
  const [estimatedArrival, setEstimatedArrival] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (shipmentToEdit) {
      setTrackingNumber(shipmentToEdit.trackingNumber);
      setBookingRef(shipmentToEdit.bookingRef);
      setBolNumber(shipmentToEdit.bolNumber);
      setMode(shipmentToEdit.mode);
      setStatus(shipmentToEdit.status);

      setShipperCompany(shipmentToEdit.sender.company);
      setShipperName(shipmentToEdit.sender.name);
      setShipperCity(shipmentToEdit.sender.city);
      setShipperCountry(shipmentToEdit.sender.country);
      setShipperEmail(shipmentToEdit.sender.email);
      setShipperPhone(shipmentToEdit.sender.phone);

      setConsigneeCompany(shipmentToEdit.consignee.company);
      setConsigneeName(shipmentToEdit.consignee.name);
      setConsigneeCity(shipmentToEdit.consignee.city);
      setConsigneeCountry(shipmentToEdit.consignee.country);
      setConsigneeEmail(shipmentToEdit.consignee.email);
      setConsigneePhone(shipmentToEdit.consignee.phone);

      setOriginPortCode(shipmentToEdit.origin.portCode);
      setDestPortCode(shipmentToEdit.destination.portCode);

      setCarrierName(shipmentToEdit.carrier.name);
      setVesselName(shipmentToEdit.carrier.vesselOrFlightName);
      setContainerNumber(shipmentToEdit.containerNumber);
      setSealNumber(shipmentToEdit.sealNumber);

      setCargoDesc(shipmentToEdit.cargo.description);
      setPieces(shipmentToEdit.cargo.pieces);
      setWeightKg(shipmentToEdit.cargo.weightKg);
      setVolumeCbm(shipmentToEdit.cargo.volumeCbm);
      setTemperatureCelsius(shipmentToEdit.temperatureCelsius);
      setEstimatedArrival(shipmentToEdit.estimatedArrival.split('T')[0]);
      setNotes(shipmentToEdit.notes || '');
    } else {
      const randomCode = Math.floor(100000 + Math.random() * 900000);
      setTrackingNumber(`PTX-${randomCode}`);
      setBookingRef(`BK-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      setBolNumber(`BL-PX-${randomCode}`);
      setMode('ocean_fcl');
      setStatus('booked');
      setShipperCompany('Acme Global Exporters');
      setShipperName('Logistics Manager');
      setShipperCity('Rotterdam');
      setShipperCountry('Netherlands');
      setShipperEmail('shipping@acmeglobal.com');
      setShipperPhone('+31 10 555 0192');

      setConsigneeCompany('Pacific Import Hub');
      setConsigneeName('Receiving In-charge');
      setConsigneeCity('Singapore');
      setConsigneeCountry('Singapore');
      setConsigneeEmail('receiving@pacificimport.sg');
      setConsigneePhone('+65 6555 0188');

      setOriginPortCode('NLRTM');
      setDestPortCode('SGSIN');
      setCarrierName('PortX Ocean Lines');
      setVesselName('PortX Explorer IV');
      setContainerNumber(`PXLU-${randomCode}-1`);
      setSealNumber(`SEAL-${Math.floor(10000 + Math.random() * 90000)}`);

      setCargoDesc('Commercial Machinery Components');
      setPieces(50);
      setWeightKg(18200);
      setVolumeCbm(52);
      setEstimatedArrival(new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
      setNotes('');
    }
  }, [shipmentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const originPort = ports.find((p) => p.code === originPortCode) || ports[0];
    const destPort = ports.find((p) => p.code === destPortCode) || ports[1];

    if (isEditing && shipmentToEdit) {
      updateShipment(shipmentToEdit.id, {
        trackingNumber,
        bookingRef,
        bolNumber,
        mode,
        status,
        sender: {
          company: shipperCompany,
          name: shipperName,
          address: '',
          city: shipperCity,
          country: shipperCountry,
          email: shipperEmail,
          phone: shipperPhone
        },
        consignee: {
          company: consigneeCompany,
          name: consigneeName,
          address: '',
          city: consigneeCity,
          country: consigneeCountry,
          email: consigneeEmail,
          phone: consigneePhone
        },
        origin: {
          portName: originPort.name,
          portCode: originPort.code,
          city: originPort.city,
          country: originPort.country,
          lat: originPort.lat,
          lng: originPort.lng
        },
        destination: {
          portName: destPort.name,
          portCode: destPort.code,
          city: destPort.city,
          country: destPort.country,
          lat: destPort.lat,
          lng: destPort.lng
        },
        carrier: {
          name: carrierName,
          vesselOrFlightName: vesselName,
          voyageOrFlightNumber: 'VOY-2026'
        },
        containerNumber,
        sealNumber,
        cargo: {
          description: cargoDesc,
          pieces,
          weightKg,
          volumeCbm
        },
        temperatureCelsius,
        estimatedArrival: new Date(estimatedArrival).toISOString(),
        notes
      });
    } else {
      createShipment({
        trackingNumber,
        bookingRef,
        bolNumber,
        mode,
        status,
        statusLabel: status === 'in_transit' ? 'In Transit' : 'Booking Registered',
        sender: {
          company: shipperCompany,
          name: shipperName,
          address: '',
          city: shipperCity,
          country: shipperCountry,
          email: shipperEmail,
          phone: shipperPhone
        },
        consignee: {
          company: consigneeCompany,
          name: consigneeName,
          address: '',
          city: consigneeCity,
          country: consigneeCountry,
          email: consigneeEmail,
          phone: consigneePhone
        },
        origin: {
          portName: originPort.name,
          portCode: originPort.code,
          city: originPort.city,
          country: originPort.country,
          lat: originPort.lat,
          lng: originPort.lng
        },
        destination: {
          portName: destPort.name,
          portCode: destPort.code,
          city: destPort.city,
          country: destPort.country,
          lat: destPort.lat,
          lng: destPort.lng
        },
        currentLocation: {
          name: `${originPort.name} Gate Terminal`,
          lat: originPort.lat,
          lng: originPort.lng,
          updatedAt: 'Just now'
        },
        carrier: {
          name: carrierName,
          vesselOrFlightName: vesselName,
          voyageOrFlightNumber: 'VOY-PX-409'
        },
        containerNumber,
        sealNumber,
        cargo: {
          description: cargoDesc,
          pieces,
          weightKg,
          volumeCbm
        },
        departedAt: new Date().toISOString(),
        estimatedArrival: new Date(estimatedArrival || Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        temperatureCelsius,
        customsCleared: false,
        notes
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl my-8 max-h-[92vh] overflow-y-auto text-slate-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-2 rounded-lg bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
            {isEditing ? 'Consignment Maintenance' : 'New Cargo Booking Entry'}
          </span>
          <h2 className="text-xl font-bold text-slate-900 font-heading mt-0.5">
            {isEditing ? `Edit Shipment: ${trackingNumber}` : 'Create Commercial Shipment'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Identifiers */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Tracking Number *</label>
              <input
                type="text"
                required
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full bg-white text-slate-900 p-2 rounded-lg border border-slate-300 font-mono font-bold focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Bill of Lading #</label>
              <input
                type="text"
                value={bolNumber}
                onChange={(e) => setBolNumber(e.target.value)}
                className="w-full bg-white text-slate-900 p-2 rounded-lg border border-slate-300 font-mono focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Transport Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as TransportMode)}
                className="w-full bg-white text-slate-900 p-2 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none capitalize font-medium"
              >
                <option value="ocean_fcl">Ocean FCL</option>
                <option value="ocean_lcl">Ocean LCL</option>
                <option value="air_freight">Air Freight</option>
                <option value="rail_freight">Rail Freight</option>
                <option value="road_transport">Road Transport</option>
                <option value="cold_chain">Cold Chain</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Initial Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
                className="w-full bg-white text-orange-600 p-2 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none font-bold"
              >
                <option value="booked">Booked</option>
                <option value="in_transit">In Transit</option>
                <option value="customs_hold">Customs Hold</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="exception">Exception</option>
              </select>
            </div>
          </div>

          {/* Parties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Shipper */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                Shipper (Consignor)
              </span>
              <input
                type="text"
                required
                placeholder="Company Name"
                value={shipperCompany}
                onChange={(e) => setShipperCompany(e.target.value)}
                className="w-full bg-white text-slate-900 p-2 rounded-lg border border-slate-300 focus:outline-none font-medium"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={shipperCity}
                  onChange={(e) => setShipperCity(e.target.value)}
                  className="bg-white text-slate-900 p-2 rounded-lg border border-slate-300 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={shipperCountry}
                  onChange={(e) => setShipperCountry(e.target.value)}
                  className="bg-white text-slate-900 p-2 rounded-lg border border-slate-300 focus:outline-none"
                />
              </div>
              <input
                type="email"
                placeholder="Shipper Email"
                value={shipperEmail}
                onChange={(e) => setShipperEmail(e.target.value)}
                className="w-full bg-white text-slate-900 p-2 rounded-lg border border-slate-300 focus:outline-none"
              />
            </div>

            {/* Consignee */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                Consignee (Delivery Party)
              </span>
              <input
                type="text"
                required
                placeholder="Consignee Company"
                value={consigneeCompany}
                onChange={(e) => setConsigneeCompany(e.target.value)}
                className="w-full bg-white text-slate-900 p-2 rounded-lg border border-slate-300 focus:outline-none font-medium"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={consigneeCity}
                  onChange={(e) => setConsigneeCity(e.target.value)}
                  className="bg-white text-slate-900 p-2 rounded-lg border border-slate-300 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={consigneeCountry}
                  onChange={(e) => setConsigneeCountry(e.target.value)}
                  className="bg-white text-slate-900 p-2 rounded-lg border border-slate-300 focus:outline-none"
                />
              </div>
              <input
                type="email"
                placeholder="Consignee Email"
                value={consigneeEmail}
                onChange={(e) => setConsigneeEmail(e.target.value)}
                className="w-full bg-white text-slate-900 p-2 rounded-lg border border-slate-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Route & Carrier */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Origin Port</label>
              <select
                value={originPortCode}
                onChange={(e) => setOriginPortCode(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:outline-none"
              >
                {ports.map((p) => (
                  <option key={p.id} value={p.code}>
                    {p.name} ({p.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Destination Port</label>
              <select
                value={destPortCode}
                onChange={(e) => setDestPortCode(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:outline-none"
              >
                {ports.map((p) => (
                  <option key={p.id} value={p.code}>
                    {p.name} ({p.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Carrier / Vessel Name</label>
              <input
                type="text"
                value={vesselName}
                onChange={(e) => setVesselName(e.target.value)}
                placeholder="e.g. PortX Explorer IV"
                className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Target Arrival Date</label>
              <input
                type="date"
                value={estimatedArrival}
                onChange={(e) => setEstimatedArrival(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Containers & Cargo */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Container Number *</label>
              <input
                type="text"
                required
                value={containerNumber}
                onChange={(e) => setContainerNumber(e.target.value)}
                placeholder="PXLU-849204-7"
                className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:outline-none font-mono font-bold text-orange-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Bolt Seal Number</label>
              <input
                type="text"
                value={sealNumber}
                onChange={(e) => setSealNumber(e.target.value)}
                placeholder="SEAL-NL-9021"
                className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Gross Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:outline-none font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Reefer Temp (°C)</label>
              <input
                type="number"
                step="0.1"
                value={temperatureCelsius !== undefined ? temperatureCelsius : ''}
                onChange={(e) => setTemperatureCelsius(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Optional (e.g. 4.2)"
                className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Cargo Commodity Description *</label>
            <input
              type="text"
              required
              value={cargoDesc}
              onChange={(e) => setCargoDesc(e.target.value)}
              placeholder="e.g. Precision Automated CNC Modules & Industrial Actuators"
              className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Operational Dispatch Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal instructions or customs handling alerts..."
              className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-300 focus:outline-none"
            ></textarea>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Update Shipment Record' : 'Create & Register Shipment'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
