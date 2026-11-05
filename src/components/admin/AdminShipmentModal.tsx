import React, { useState, useEffect } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  X,
  Save,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
  RotateCw,
  Copy,
  Check,
  User,
  Package,
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react';
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
  const {
    createShipment,
    updateShipment,
    ports,
    setCurrentTrackingQuery,
    setActiveView,
    setIsAdminMode
  } = useShipping();

  const isEditing = !!shipmentToEdit;
  const [createdSuccessNumber, setCreatedSuccessNumber] = useState<string | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Core Tracking Identifiers
  const [trackingNumber, setTrackingNumber] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [bolNumber, setBolNumber] = useState('');
  const [status, setStatus] = useState<ShipmentStatus>('in_transit');
  const [mode, setMode] = useState<TransportMode>('road_transport');

  // Dates & Formatted Schedule (as displayed on Gradlyn Tracking Page)
  const [departureTimeFormatted, setDepartureTimeFormatted] = useState('Sep 15');
  const [arrivalTimeFormatted, setArrivalTimeFormatted] = useState('Sep 15');
  const [departedAt, setDepartedAt] = useState('');
  const [estimatedArrival, setEstimatedArrival] = useState('');

  // Prominent Client Notice Banner & Yellow Sticky Note
  const [clientNotice, setClientNotice] = useState('Jaula de Transporte Electrónica Para Mascotas IPATA Pendiente');

  // Origin & Destination Info
  const [originCity, setOriginCity] = useState('Cantabria');
  const [originCountry, setOriginCountry] = useState('España');
  const [originPortCode, setOriginPortCode] = useState('ESBIO');
  const [destCity, setDestCity] = useState('Huelva');
  const [destCountry, setDestCountry] = useState('España');
  const [destPortCode, setDestPortCode] = useState('ESSEV');
  const [currentLocationName, setCurrentLocationName] = useState('Ribamontan Al Mar, Cantabria');

  // Consignee (Destination Address Card)
  const [consigneeName, setConsigneeName] = useState('Encarnación Maria Camino López');
  const [receiverDoorAddress, setReceiverDoorAddress] = useState('Pl. de la Romera, 5, 6b');
  const [receiverPostalCode, setReceiverPostalCode] = useState('21006');
  const [consigneePhone, setConsigneePhone] = useState('+34602493512');
  const [consigneeEmail, setConsigneeEmail] = useState('cliente@gmail.com');

  // Sender (Origin Address Card)
  const [shipperName, setShipperName] = useState('Herbas Tejrina Shirley Laura');
  const [shipperAddress, setShipperAddress] = useState('Ribamontan Al Mar | Cantabria | 39150');
  const [shipperPhone, setShipperPhone] = useState('+34602493512');
  const [shipperEmail, setShipperEmail] = useState('remitente@portx.com');

  // Package & Cargo Details
  const [weightKg, setWeightKg] = useState(1.1);
  const [dimensions, setDimensions] = useState('L: 0 × W: 0 × H: 0 cm');
  const [packageType, setPackageType] = useState('Transporte de Mascotas');
  const [referenceNumber, setReferenceNumber] = useState('VY 1591');

  // Pet Details (Optional / Specific)
  const [petName, setPetName] = useState('Rocky');
  const [species, setSpecies] = useState<'dog' | 'cat' | 'bird' | 'other'>('dog');
  const [breed, setBreed] = useState('Cachorro');
  const [microchipNumber, setMicrochipNumber] = useState('981098107482910');
  const [healthPassportNumber, setHealthPassportNumber] = useState('ES-VET-2026-9041');

  // Handler & Internal Notes
  const [courierHandlerName, setCourierHandlerName] = useState('Despacho Asignado PortX');
  const [notes, setNotes] = useState('Seguimiento activo con telemetría en tiempo real.');

  const generateRandomCode = () => {
    const letters = 'VY';
    const num = Math.floor(10000000 + Math.random() * 90000000);
    const newCode = `${letters}${num}`;
    setTrackingNumber(newCode);
    setBookingRef(`BK-${num.toString().substring(0, 4)}`);
    setBolNumber(`VY ${num.toString().substring(0, 4)}`);
    setReferenceNumber(`VY ${num.toString().substring(0, 4)}`);
  };

  useEffect(() => {
    if (shipmentToEdit) {
      setTrackingNumber(shipmentToEdit.trackingNumber);
      setBookingRef(shipmentToEdit.bookingRef || '');
      setBolNumber(shipmentToEdit.bolNumber || '');
      setStatus(shipmentToEdit.status);
      setMode(shipmentToEdit.mode || 'road_transport');

      setDepartureTimeFormatted(shipmentToEdit.departureTimeFormatted || 'Sep 15');
      setArrivalTimeFormatted(shipmentToEdit.arrivalTimeFormatted || 'Sep 15');
      setDepartedAt(shipmentToEdit.departedAt ? shipmentToEdit.departedAt.split('T')[0] : '');
      setEstimatedArrival(shipmentToEdit.estimatedArrival ? shipmentToEdit.estimatedArrival.split('T')[0] : '');
      setClientNotice(shipmentToEdit.clientNotice || 'Jaula de Transporte Electrónica Para Mascotas IPATA Pendiente');

      setOriginCity(shipmentToEdit.origin.city);
      setOriginCountry(shipmentToEdit.origin.country || 'España');
      setOriginPortCode(shipmentToEdit.origin.portCode || 'ESBIO');
      setDestCity(shipmentToEdit.destination.city);
      setDestCountry(shipmentToEdit.destination.country || 'España');
      setDestPortCode(shipmentToEdit.destination.portCode || 'ESSEV');
      setCurrentLocationName(shipmentToEdit.currentLocation.name || `${shipmentToEdit.origin.city}, España`);

      setConsigneeName(shipmentToEdit.consignee.name);
      setReceiverDoorAddress(shipmentToEdit.doorstepDelivery?.receiverDoorAddress || shipmentToEdit.consignee.address || 'Pl. de la Romera, 5, 6b');
      setReceiverPostalCode(shipmentToEdit.doorstepDelivery?.receiverPostalCode || '21006');
      setConsigneePhone(shipmentToEdit.consignee.phone || '+34602493512');
      setConsigneeEmail(shipmentToEdit.consignee.email || '');

      setShipperName(shipmentToEdit.sender.name);
      setShipperAddress(shipmentToEdit.sender.address || `${shipmentToEdit.origin.city} | España | 39150`);
      setShipperPhone(shipmentToEdit.sender.phone || '+34602493512');
      setShipperEmail(shipmentToEdit.sender.email || '');

      setWeightKg(shipmentToEdit.cargo.weightKg || 1.1);
      setDimensions(shipmentToEdit.cargo.dimensions || 'L: 0 × W: 0 × H: 0 cm');
      setPackageType(shipmentToEdit.cargo.description || 'Transporte de Mascotas');
      setReferenceNumber(shipmentToEdit.bookingRef || shipmentToEdit.bolNumber || 'VY 1591');

      if (shipmentToEdit.petInfo) {
        setPetName(shipmentToEdit.petInfo.petName || 'Rocky');
        setSpecies(shipmentToEdit.petInfo.species || 'dog');
        setBreed(shipmentToEdit.petInfo.breed || 'Cachorro');
        setMicrochipNumber(shipmentToEdit.petInfo.microchipNumber || '981098107482910');
        setHealthPassportNumber(shipmentToEdit.petInfo.healthPassportNumber || 'ES-VET-2026-9041');
      }

      setNotes(shipmentToEdit.notes || '');
    } else {
      // Default initial state matching Gradlyn Global sample (VY22261591)
      const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
      setTrackingNumber(`VY${randomSuffix}`);
      setBookingRef(`BK-${randomSuffix.toString().substring(0, 4)}`);
      setBolNumber(`VY ${randomSuffix.toString().substring(0, 4)}`);
      setReferenceNumber(`VY ${randomSuffix.toString().substring(0, 4)}`);
      setStatus('in_transit');
      setMode('road_transport');

      const today = new Date();
      const monthShort = today.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = today.getDate();
      setDepartureTimeFormatted(`${monthShort} ${dayNum}`);
      setArrivalTimeFormatted(`${monthShort} ${dayNum}`);
      setDepartedAt(today.toISOString().split('T')[0]);
      setEstimatedArrival(new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0]);

      setClientNotice('Jaula de Transporte Electrónica Para Mascotas IPATA Pendiente');

      setOriginCity('Cantabria');
      setOriginCountry('España');
      setDestCity('Huelva');
      setDestCountry('España');
      setCurrentLocationName('Ribamontan Al Mar, Cantabria');

      setConsigneeName('Encarnación Maria Camino López');
      setReceiverDoorAddress('Pl. de la Romera, 5, 6b');
      setReceiverPostalCode('21006');
      setConsigneePhone('+34602493512');
      setConsigneeEmail('cliente@gmail.com');

      setShipperName('Herbas Tejrina Shirley Laura');
      setShipperAddress('Ribamontan Al Mar | Cantabria | 39150');
      setShipperPhone('+34602493512');

      setWeightKg(1.1);
      setDimensions('L: 0 × W: 0 × H: 0 cm');
      setPackageType('Transporte de Mascotas');
      setNotes('Seguimiento activo en tiempo real conforme a la normativa PortX Global.');
    }
    setCreatedSuccessNumber(null);
  }, [shipmentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const originPort = ports.find((p) => p.code === originPortCode) || ports[0];
    const destPort = ports.find((p) => p.code === destPortCode) || ports[1];

    const petInfoData = {
      petName,
      species,
      speciesLabel: species === 'dog' ? 'Perro (Canino)' : species === 'cat' ? 'Gato (Felino)' : 'Animal de Compañía',
      breed,
      age: '1 año',
      gender: 'Macho' as const,
      microchipNumber,
      healthPassportNumber,
      rabiesVaccinationValid: true,
      vetClearanceApproved: true,
      crateModel: 'IATA Sky Kennel Oficial',
      feedingInstructions: 'Agua fresca e hidratación pautada',
      specialCareNotes: notes,
      lastHydrationTime: 'Hace 20 min',
      companionHandlerName: courierHandlerName
    };

    const doorstepData = {
      isDoorstepDelivery: true,
      doorstepStatus: (status === 'delivered' ? 'delivered_at_doorstep' : status === 'out_for_delivery' ? 'arriving_at_door' : 'in_local_van') as any,
      receiverDoorAddress,
      receiverCity: destCity,
      receiverProvince: destCountry,
      receiverPostalCode,
      receiverContactPerson: consigneeName,
      receiverPhone: consigneePhone || '+34602493512',
      estimatedDoorArrivalTime: arrivalTimeFormatted,
      courierHandlerName,
      courierHandlerPhone: '+34602493512',
      vanVehiclePlate: 'VAN-PTX-01',
      handoverProof: {
        deliveredAt: status === 'delivered' ? 'Entregado con éxito' : 'En proceso',
        signedBy: status === 'delivered' ? consigneeName : 'Pendiente',
        signatureVerified: status === 'delivered',
        photoAtDoorTaken: status === 'delivered',
        petWelfareRating: 'Excelente - Verificado'
      }
    };

    if (isEditing && shipmentToEdit) {
      updateShipment(shipmentToEdit.id, {
        trackingNumber: trackingNumber.trim(),
        bookingRef,
        bolNumber,
        mode,
        status,
        sender: {
          company: shipperName,
          name: shipperName,
          address: shipperAddress,
          city: originCity,
          country: originCountry,
          email: shipperEmail,
          phone: shipperPhone
        },
        consignee: {
          company: consigneeName,
          name: consigneeName,
          address: receiverDoorAddress,
          city: destCity,
          country: destCountry,
          email: consigneeEmail,
          phone: consigneePhone
        },
        origin: {
          portName: `${originCity}, ${originCountry}`,
          portCode: originPortCode,
          city: originCity,
          country: originCountry,
          lat: originPort.lat,
          lng: originPort.lng
        },
        destination: {
          portName: `${receiverDoorAddress}, ${destCity}`,
          portCode: destPortCode,
          city: destCity,
          country: destCountry,
          lat: destPort.lat,
          lng: destPort.lng
        },
        currentLocation: {
          name: currentLocationName,
          lat: destPort.lat,
          lng: destPort.lng,
          updatedAt: 'Ahora mismo',
          weather: 'Despejado'
        },
        carrier: {
          name: 'PortX Global Logistics',
          vesselOrFlightName: courierHandlerName,
          voyageOrFlightNumber: referenceNumber
        },
        containerNumber: referenceNumber,
        sealNumber: microchipNumber,
        cargo: {
          description: packageType,
          pieces: 1,
          weightKg,
          dimensions,
          volumeCbm: 0.1
        },
        departedAt: departedAt ? new Date(departedAt).toISOString() : new Date().toISOString(),
        estimatedArrival: estimatedArrival ? new Date(estimatedArrival).toISOString() : new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
        departureTimeFormatted: departureTimeFormatted || 'Sep 15',
        arrivalTimeFormatted: arrivalTimeFormatted || 'Sep 15',
        notes,
        clientNotice,
        petInfo: petInfoData,
        doorstepDelivery: doorstepData
      });
      onClose();
    } else {
      const created = createShipment({
        trackingNumber: trackingNumber.trim(),
        bookingRef,
        bolNumber,
        mode,
        status,
        statusLabel: status === 'in_transit' ? 'In Transit' : status === 'delivered' ? 'Delivered' : 'En Reparto',
        sender: {
          company: shipperName,
          name: shipperName,
          address: shipperAddress,
          city: originCity,
          country: originCountry,
          email: shipperEmail,
          phone: shipperPhone
        },
        consignee: {
          company: consigneeName,
          name: consigneeName,
          address: receiverDoorAddress,
          city: destCity,
          country: destCountry,
          email: consigneeEmail,
          phone: consigneePhone
        },
        origin: {
          portName: `${originCity}, ${originCountry}`,
          portCode: originPortCode,
          city: originCity,
          country: originCountry,
          lat: originPort.lat,
          lng: originPort.lng
        },
        destination: {
          portName: `${receiverDoorAddress}, ${destCity}`,
          portCode: destPortCode,
          city: destCity,
          country: destCountry,
          lat: destPort.lat,
          lng: destPort.lng
        },
        currentLocation: {
          name: currentLocationName,
          lat: destPort.lat,
          lng: destPort.lng,
          updatedAt: 'Ahora mismo',
          weather: 'Despejado'
        },
        carrier: {
          name: 'PortX Global Logistics',
          vesselOrFlightName: courierHandlerName,
          voyageOrFlightNumber: referenceNumber
        },
        containerNumber: referenceNumber,
        sealNumber: microchipNumber,
        cargo: {
          description: packageType,
          pieces: 1,
          weightKg,
          dimensions,
          volumeCbm: 0.1
        },
        departedAt: departedAt ? new Date(departedAt).toISOString() : new Date().toISOString(),
        estimatedArrival: estimatedArrival ? new Date(estimatedArrival).toISOString() : new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
        departureTimeFormatted: departureTimeFormatted || 'Sep 15',
        arrivalTimeFormatted: arrivalTimeFormatted || 'Sep 15',
        temperatureCelsius: 21.0,
        customsCleared: true,
        notes,
        clientNotice,
        petInfo: petInfoData,
        doorstepDelivery: doorstepData
      });

      setCreatedSuccessNumber(created.trackingNumber);
    }
  };

  const handleCopySuccessCode = () => {
    if (createdSuccessNumber) {
      navigator.clipboard?.writeText(createdSuccessNumber);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2000);
    }
  };

  // SUCCESS CONFIRMATION MODAL
  if (createdSuccessNumber) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 sm:p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto border border-red-200 shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <h3 className="text-xl font-black text-[#18181b] font-heading">
              ¡Envío Registrado con Éxito!
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              El nuevo código de seguimiento ha sido generado y activado en la red global PortX.
            </p>
          </div>

          {/* Tracking Code Display with Copy Button */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-2">
            <span className="font-mono font-black text-xl text-red-600 tracking-wider">
              {createdSuccessNumber}
            </span>
            <button
              onClick={handleCopySuccessCode}
              className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              {copiedSuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSuccess ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          <div className="p-3 bg-red-50/60 rounded-xl border border-red-100 text-left text-[11px] text-stone-600 space-y-1">
            <p><strong>Destinatario:</strong> {consigneeName} ({destCity})</p>
            <p><strong>Aviso al Cliente:</strong> {clientNotice}</p>
            <p><strong>Estado:</strong> {status.toUpperCase()} · Entrega: {arrivalTimeFormatted}</p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={() => {
                setCurrentTrackingQuery(createdSuccessNumber);
                setIsAdminMode(false);
                setActiveView('track');
                setCreatedSuccessNumber(null);
                onClose();
              }}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Ver Rastreo del Cliente Ahora</span>
            </button>
            <button
              onClick={() => {
                setCreatedSuccessNumber(null);
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl cursor-pointer transition-all"
            >
              Volver a la Lista de Envíos
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN SHIPMENT MODAL FORM
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-4xl w-full p-4 sm:p-8 relative shadow-2xl my-4 sm:my-8 max-h-[94vh] overflow-y-auto text-[#18181b]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-[#18181b] p-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-red-600" />
            {isEditing ? 'Gestión de Envío PortX Global' : 'Crear Nuevo Envío y Código de Seguimiento'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#18181b] font-heading mt-0.5">
            {isEditing ? `Editar Envío: ${trackingNumber}` : 'Nuevo Registro de Seguimiento para el Cliente'}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Los datos introducidos aquí se reflejarán exactamente en la pantalla de rastreo del cliente (mapa, aviso, fechas, remitente y destinatario).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          {/* CARD 1: TRACKING NUMBER & MAIN STATUS */}
          <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="font-bold text-[#18181b] text-xs uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span>1. Código de Seguimiento y Estado Principal</span>
              </span>
              <button
                type="button"
                onClick={generateRandomCode}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Generar Código Automático</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-stone-700 font-bold mb-1">
                  Número de Seguimiento (Tracking Code) *
                </label>
                <input
                  type="text"
                  required
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                  placeholder="Ej: VY22261591 o PTX-84920"
                  className="w-full bg-white text-red-600 p-2.5 rounded-xl border border-red-300 font-mono font-black text-base focus:border-red-600 focus:outline-none shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Estado de Progreso (5 Pasos)</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
                  className="w-full bg-white text-[#18181b] p-2.5 rounded-xl border border-stone-300 font-bold focus:border-red-600 focus:outline-none"
                >
                  <option value="booked">1. Pickup (Recogido)</option>
                  <option value="in_transit">2. Shipped / In Transit (En Tránsito)</option>
                  <option value="customs_hold">2. In Transit (Control / Revisión)</option>
                  <option value="out_for_delivery">3. Out for Delivery (En Reparto)</option>
                  <option value="delivered">4. Delivered (Entregado con Éxito)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Tipo de Transporte</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as TransportMode)}
                  className="w-full bg-white text-[#18181b] p-2.5 rounded-xl border border-stone-300 font-medium focus:border-red-600 focus:outline-none"
                >
                  <option value="road_transport">Furgoneta Puerta a Puerta (Road)</option>
                  <option value="air_freight">Vuelo y Nanny Aéreo (Air)</option>
                  <option value="ocean_fcl">Contenedor Marítimo (Sea)</option>
                  <option value="cold_chain">Cadena Fría / Temperatura Controlada</option>
                </select>
              </div>
            </div>

            {/* Dates row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-stone-700 font-bold mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-red-600" />
                  <span>Fecha de Salida (Shipped) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={departureTimeFormatted}
                  onChange={(e) => setDepartureTimeFormatted(e.target.value)}
                  placeholder="Ej: Sep 15 o Hoy 08:30 CET"
                  className="w-full bg-white text-[#18181b] p-2 rounded-xl border border-stone-300 font-medium focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-600" />
                  <span>Fecha de Entrega (DELIVERY BY) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={arrivalTimeFormatted}
                  onChange={(e) => setArrivalTimeFormatted(e.target.value)}
                  placeholder="Ej: Sep 15 o Hoy 14:30 CET"
                  className="w-full bg-white text-[#18181b] p-2 rounded-xl border border-stone-300 font-medium focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* CARD 2: HIGHLIGHT NOTICE BANNER & STICKY NOTE (CRITICAL FEATURE) */}
          <div className="p-5 bg-red-50/70 rounded-2xl border-2 border-red-300 space-y-3">
            <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>2. Aviso Destacado para el Cliente (Banner Azul/Rojo y Nota Amarilla)</span>
            </div>
            <p className="text-xs text-red-800 leading-relaxed">
              Este texto aparece en el <strong>banner principal</strong> y en la <strong>nota amarilla</strong> de la pantalla de seguimiento del cliente.
            </p>
            <input
              type="text"
              required
              value={clientNotice}
              onChange={(e) => setClientNotice(e.target.value)}
              placeholder="Ej: Jaula de Transporte Electrónica Para Mascotas IPATA Pendiente"
              className="w-full bg-white text-stone-900 p-3 rounded-xl border border-red-400 font-bold text-sm focus:border-red-600 focus:outline-none shadow-2xs"
            />
          </div>

          {/* CARD 3: ORIGIN & DESTINATION DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Origin Address Card */}
            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <span className="font-bold text-red-600 text-xs uppercase tracking-wider block border-b border-stone-100 pb-2">
                3. Tarjeta de Origen (Origin Address)
              </span>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Nombre del Remitente / Criador *</label>
                <input
                  type="text"
                  required
                  value={shipperName}
                  onChange={(e) => setShipperName(e.target.value)}
                  placeholder="Ej: Herbas Tejrina Shirley Laura"
                  className="w-full bg-stone-50 text-[#18181b] p-2 rounded-xl border border-stone-300 font-medium focus:bg-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Ciudad y Provincia de Origen</label>
                <input
                  type="text"
                  required
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  placeholder="Ej: Cantabria"
                  className="w-full bg-stone-50 text-[#18181b] p-2 rounded-xl border border-stone-300 font-medium focus:bg-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Línea de Dirección Completa</label>
                <input
                  type="text"
                  value={shipperAddress}
                  onChange={(e) => setShipperAddress(e.target.value)}
                  placeholder="Ej: Ribamontan Al Mar | Cantabria | 39150"
                  className="w-full bg-stone-50 text-[#18181b] p-2 rounded-xl border border-stone-300 font-medium focus:bg-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Ubicación Actual en Ruta (Mapa)</label>
                <input
                  type="text"
                  value={currentLocationName}
                  onChange={(e) => setCurrentLocationName(e.target.value)}
                  placeholder="Ej: Ribamontan Al Mar, Cantabria"
                  className="w-full bg-stone-50 text-[#18181b] p-2 rounded-xl border border-stone-300 font-medium focus:bg-white focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Destination Address Card */}
            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <span className="font-bold text-red-600 text-xs uppercase tracking-wider block border-b border-stone-100 pb-2">
                4. Tarjeta de Destino (Destination Address)
              </span>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Nombre del Destinatario / Receptor *</label>
                <input
                  type="text"
                  required
                  value={consigneeName}
                  onChange={(e) => setConsigneeName(e.target.value)}
                  placeholder="Ej: Encarnación Maria Camino López"
                  className="w-full bg-stone-50 text-[#18181b] p-2 rounded-xl border border-stone-300 font-medium focus:bg-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Dirección de la Puerta / Calle *</label>
                <input
                  type="text"
                  required
                  value={receiverDoorAddress}
                  onChange={(e) => setReceiverDoorAddress(e.target.value)}
                  placeholder="Ej: Pl. de la Romera, 5, 6b"
                  className="w-full bg-stone-50 text-[#18181b] p-2 rounded-xl border border-stone-300 font-medium focus:bg-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Ciudad Destino</label>
                  <input
                    type="text"
                    required
                    value={destCity}
                    onChange={(e) => setDestCity(e.target.value)}
                    placeholder="Ej: Huelva"
                    className="w-full bg-stone-50 text-[#18181b] p-2 rounded-xl border border-stone-300 font-medium focus:bg-white focus:border-red-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Código Postal</label>
                  <input
                    type="text"
                    required
                    value={receiverPostalCode}
                    onChange={(e) => setReceiverPostalCode(e.target.value)}
                    placeholder="Ej: 21006"
                    className="w-full bg-stone-50 text-[#18181b] p-2 rounded-xl border border-stone-300 font-mono font-medium focus:bg-white focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Teléfono del Receptor</label>
                <input
                  type="text"
                  value={consigneePhone}
                  onChange={(e) => setConsigneePhone(e.target.value)}
                  placeholder="+34602493512"
                  className="w-full bg-stone-50 text-[#18181b] p-2 rounded-xl border border-stone-300 font-mono focus:bg-white focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>

          </div>

          {/* CARD 4: PACKAGE DETAILS (Weight, Dimensions, Type, Ref Number) */}
          <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
            <span className="font-bold text-[#18181b] text-xs uppercase tracking-wider block pb-2 border-b border-stone-200">
              5. Detalles del Paquete y Mercancía (Package Details)
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Weight (kg) *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                  placeholder="1.1"
                  className="w-full bg-white text-[#18181b] p-2 rounded-xl border border-stone-300 font-mono font-bold focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Dimensions *</label>
                <input
                  type="text"
                  required
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="L: 0 × W: 0 × H: 0 cm"
                  className="w-full bg-white text-[#18181b] p-2 rounded-xl border border-stone-300 font-mono focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Package Type *</label>
                <input
                  type="text"
                  required
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  placeholder="Transporte de Mascotas"
                  className="w-full bg-white text-[#18181b] p-2 rounded-xl border border-stone-300 focus:border-red-600 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Reference Number *</label>
                <input
                  type="text"
                  required
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="VY 1591"
                  className="w-full bg-white text-[#18181b] p-2 rounded-xl border border-stone-300 font-mono font-bold focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* CARD 5: MASCOTA Y CUIDADOS INTERNOS */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3">
            <span className="font-bold text-stone-600 text-xs uppercase tracking-wider block">
              6. Datos Opcionales de la Mascota y Notas Internas
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-stone-600 font-bold mb-1">Nombre Mascota</label>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="w-full bg-stone-50 text-[#18181b] p-2 rounded-xl border border-stone-200 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-stone-600 font-bold mb-1">Raza</label>
                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="w-full bg-stone-50 text-[#18181b] p-2 rounded-xl border border-stone-200 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-stone-600 font-bold mb-1">Nº Microchip</label>
                <input
                  type="text"
                  value={microchipNumber}
                  onChange={(e) => setMicrochipNumber(e.target.value)}
                  className="w-full bg-stone-50 text-[#18181b] p-2 rounded-xl border border-stone-200 font-mono focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-600 font-bold mb-1">Notas Internas del Despachador</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Instrucciones para conductores o despacho..."
                className="w-full bg-stone-50 text-[#18181b] p-2 rounded-xl border border-stone-200 focus:bg-white focus:outline-none text-xs"
              ></textarea>
            </div>
          </div>

          {/* ACTIONS ROW */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-stone-600 hover:text-[#18181b] font-bold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-7 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-red-600/25 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Guardar Cambios' : 'Crear Envío y Generar Seguimiento'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
