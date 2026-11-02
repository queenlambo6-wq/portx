import React, { useState, useEffect } from 'react';
import { useShipping } from '../../context/ShippingContext';
import { X, Save, Heart, Home, ShieldCheck, MapPin } from 'lucide-react';
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
  const [mode, setMode] = useState<TransportMode>('road_transport');
  const [status, setStatus] = useState<ShipmentStatus>('in_transit');

  // Pet Info
  const [petName, setPetName] = useState('Bella');
  const [species, setSpecies] = useState<'dog' | 'cat' | 'bird' | 'other'>('dog');
  const [breed, setBreed] = useState('Golden Retriever');
  const [age, setAge] = useState('2 años');
  const [gender, setGender] = useState<'Macho' | 'Hembra'>('Hembra');
  const [microchipNumber, setMicrochipNumber] = useState('981098107482910');
  const [healthPassportNumber, setHealthPassportNumber] = useState('ES-VET-2026-9041');
  const [crateModel, setCrateModel] = useState('IATA Sky Kennel Serie 400');
  const [feedingInstructions, setFeedingInstructions] = useState('Pienso pautado y agua fresca');

  // Doorstep Delivery
  const [receiverDoorAddress, setReceiverDoorAddress] = useState('Calle Velázquez 64, 4º Izq, 28001 Madrid');
  const [courierHandlerName, setCourierHandlerName] = useState('Carlos Méndez (Cuidador Certificado)');
  const [estimatedDoorArrivalTime, setEstimatedDoorArrivalTime] = useState('Hoy a las 11:45 CET');
  const [doorstepStatus, setDoorstepStatus] = useState<'preparing_dispatch' | 'in_local_van' | 'arriving_at_door' | 'delivered_at_doorstep'>('in_local_van');

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
  const [originPortCode, setOriginPortCode] = useState('DEFRA');
  const [destPortCode, setDestPortCode] = useState('ESMAD');

  // Vehicle / Van
  const [carrierName, setCarrierName] = useState('PortX Pet Relocation');
  const [vesselName, setVesselName] = useState('Furgoneta Puerta a Puerta #01');

  // Cargo / Pet Weight
  const [cargoDesc, setCargoDesc] = useState('');
  const [weightKg, setWeightKg] = useState(24);
  const [temperatureCelsius, setTemperatureCelsius] = useState<number | undefined>(21.5);
  const [estimatedArrival, setEstimatedArrival] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (shipmentToEdit) {
      setTrackingNumber(shipmentToEdit.trackingNumber);
      setBookingRef(shipmentToEdit.bookingRef);
      setBolNumber(shipmentToEdit.bolNumber);
      setMode(shipmentToEdit.mode);
      setStatus(shipmentToEdit.status);

      if (shipmentToEdit.petInfo) {
        setPetName(shipmentToEdit.petInfo.petName);
        setSpecies(shipmentToEdit.petInfo.species);
        setBreed(shipmentToEdit.petInfo.breed);
        setAge(shipmentToEdit.petInfo.age);
        setGender((shipmentToEdit.petInfo.gender as any) || 'Hembra');
        setMicrochipNumber(shipmentToEdit.petInfo.microchipNumber);
        setHealthPassportNumber(shipmentToEdit.petInfo.healthPassportNumber);
        setCrateModel(shipmentToEdit.petInfo.crateModel);
        setFeedingInstructions(shipmentToEdit.petInfo.feedingInstructions);
      }

      if (shipmentToEdit.doorstepDelivery) {
        setReceiverDoorAddress(shipmentToEdit.doorstepDelivery.receiverDoorAddress);
        setCourierHandlerName(shipmentToEdit.doorstepDelivery.courierHandlerName);
        setEstimatedDoorArrivalTime(shipmentToEdit.doorstepDelivery.estimatedDoorArrivalTime);
        setDoorstepStatus(shipmentToEdit.doorstepDelivery.doorstepStatus);
      }

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

      setCargoDesc(shipmentToEdit.cargo.description);
      setWeightKg(shipmentToEdit.cargo.weightKg);
      setTemperatureCelsius(shipmentToEdit.temperatureCelsius);
      setEstimatedArrival(shipmentToEdit.estimatedArrival.split('T')[0]);
      setNotes(shipmentToEdit.notes || '');
    } else {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setTrackingNumber(`PET-MAD-${randomCode}`);
      setBookingRef(`BK-PET-2026-${randomCode}`);
      setBolNumber(`AWB-VET-${randomCode}`);
      setMode('road_transport');
      setStatus('in_transit');

      setPetName('Rocky');
      setSpecies('dog');
      setBreed('Pastor Alemán');
      setAge('1 año y medio');
      setGender('Macho');
      setMicrochipNumber(`9810000${randomCode}910`);
      setHealthPassportNumber(`ES-VET-${randomCode}`);
      setCrateModel('Transportín IATA Sky Kennel L');
      setFeedingInstructions('Ración ligera cada 4 horas con agua mineral');

      setReceiverDoorAddress('Calle Serrano 42, 2º B, Madrid');
      setCourierHandlerName('Carlos Méndez (Cuidador Asignado)');
      setEstimatedDoorArrivalTime('Hoy entre 12:00 y 13:00 h');
      setDoorstepStatus('in_local_van');

      setShipperCompany('Criador Homologado / Familia de Origen');
      setShipperName('Juan Carlos Gómez');
      setShipperCity('Frankfurt');
      setShipperCountry('Alemania');
      setShipperEmail('origen@petcare.com');
      setShipperPhone('+49 89 636 00');

      setConsigneeCompany('Destinatario Particular (Receptor en Puerta)');
      setConsigneeName('Elena Morales');
      setConsigneeCity('Madrid');
      setConsigneeCountry('España');
      setConsigneeEmail('elena.morales@gmail.com');
      setConsigneePhone('+34602493512');

      setOriginPortCode('DEFRA');
      setDestPortCode('ESMAD');
      setCarrierName('PortX Pet Relocation & Doorstep Express');
      setVesselName('Furgoneta Puerta a Puerta #01');

      setCargoDesc('Pastor Alemán joven con cartilla sanitaria y chip');
      setWeightKg(22);
      setTemperatureCelsius(21.5);
      setEstimatedArrival(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
      setNotes('Mascota muy noble y tranquila. El conductor subirá directamente a la puerta para entrega en mano.');
    }
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
      age,
      gender,
      microchipNumber,
      healthPassportNumber,
      rabiesVaccinationValid: true,
      vetClearanceApproved: true,
      crateModel,
      feedingInstructions,
      specialCareNotes: notes,
      lastHydrationTime: 'Hace 30 minutos',
      companionHandlerName: courierHandlerName,
      avatarUrl: species === 'cat'
        ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80'
    };

    const doorstepData = {
      isDoorstepDelivery: true,
      doorstepStatus,
      receiverDoorAddress,
      receiverCity: consigneeCity || destPort.city,
      receiverProvince: destPort.country,
      receiverContactPerson: consigneeName,
      receiverPhone: consigneePhone || '+34602493512',
      estimatedDoorArrivalTime,
      courierHandlerName,
      courierHandlerPhone: '+34602493512',
      vanVehiclePlate: 'VAN-PX-01',
      handoverProof: {
        deliveredAt: doorstepStatus === 'delivered_at_doorstep' ? 'Entregado con éxito' : 'En proceso',
        signedBy: doorstepStatus === 'delivered_at_doorstep' ? consigneeName : 'Pendiente de entrega en puerta',
        signatureVerified: doorstepStatus === 'delivered_at_doorstep',
        photoAtDoorTaken: doorstepStatus === 'delivered_at_doorstep',
        petWelfareRating: 'Excelente - Saludable y Feliz'
      }
    };

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
          address: receiverDoorAddress,
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
          portName: `${receiverDoorAddress}, ${destPort.city}`,
          portCode: destPort.code,
          city: destPort.city,
          country: destPort.country,
          lat: destPort.lat,
          lng: destPort.lng
        },
        carrier: {
          name: carrierName,
          vesselOrFlightName: vesselName,
          voyageOrFlightNumber: 'VAN-PX-01'
        },
        containerNumber: crateModel,
        sealNumber: microchipNumber,
        cargo: {
          description: `${petName} (${breed}) - ${cargoDesc}`,
          pieces: 1,
          weightKg,
          volumeCbm: 0.3
        },
        temperatureCelsius,
        estimatedArrival: new Date(estimatedArrival).toISOString(),
        notes,
        petInfo: petInfoData,
        doorstepDelivery: doorstepData
      });
    } else {
      createShipment({
        trackingNumber,
        bookingRef,
        bolNumber,
        mode,
        status,
        statusLabel: status === 'in_transit' ? 'En Tránsito Climatizado' : 'En Reparto a Domicilio',
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
          address: receiverDoorAddress,
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
          portName: `${receiverDoorAddress}, ${destPort.city}`,
          portCode: destPort.code,
          city: destPort.city,
          country: destPort.country,
          lat: destPort.lat,
          lng: destPort.lng
        },
        currentLocation: {
          name: `En furgoneta hacia ${destPort.city}`,
          lat: destPort.lat,
          lng: destPort.lng,
          updatedAt: 'Ahora mismo',
          weather: 'Soleado · 21°C'
        },
        carrier: {
          name: carrierName,
          vesselOrFlightName: vesselName,
          voyageOrFlightNumber: 'VAN-PX-01'
        },
        containerNumber: crateModel,
        sealNumber: microchipNumber,
        cargo: {
          description: `${petName} (${breed}) - ${cargoDesc}`,
          pieces: 1,
          weightKg,
          volumeCbm: 0.3
        },
        departedAt: new Date().toISOString(),
        estimatedArrival: new Date(estimatedArrival || Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        temperatureCelsius,
        customsCleared: true,
        notes,
        petInfo: petInfoData,
        doorstepDelivery: doorstepData
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl my-8 max-h-[92vh] overflow-y-auto text-[#232331]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-[#232331] p-2 rounded-lg bg-stone-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-orange-600" />
            {isEditing ? 'Mantenimiento de Mascota en Ruta' : 'Registro de Nuevo Traslado de Mascota'}
          </span>
          <h2 className="text-xl font-bold text-[#232331] font-heading mt-0.5">
            {isEditing ? `Editar Mascota: ${petName} (${trackingNumber})` : 'Registrar Mascota para Entrega en Puerta'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* PET DETAILS SECTION */}
          <div className="p-4 bg-orange-50/80 rounded-xl border border-orange-200 space-y-3">
            <div className="flex items-center gap-2 text-orange-900 font-bold text-xs uppercase tracking-wider pb-2 border-b border-orange-200">
              <Heart className="w-4 h-4 fill-orange-600 text-orange-600" />
              <span>Ficha de la Mascota</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Nombre de la Mascota *</label>
                <input
                  type="text"
                  required
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="w-full bg-white text-[#232331] p-2 rounded-lg border border-orange-300 font-bold focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Especie</label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value as any)}
                  className="w-full bg-white text-[#232331] p-2 rounded-lg border border-orange-300 focus:outline-none"
                >
                  <option value="dog">Perro (Canino)</option>
                  <option value="cat">Gato (Felino)</option>
                  <option value="bird">Ave / Psitácida</option>
                  <option value="other">Otro / Exótico</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Raza *</label>
                <input
                  type="text"
                  required
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="w-full bg-white text-[#232331] p-2 rounded-lg border border-orange-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Edad y Sexo</label>
                <div className="grid grid-cols-2 gap-1">
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-white text-[#232331] p-2 rounded-lg border border-orange-300 focus:outline-none text-xs"
                    placeholder="2 años"
                  />
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="bg-white text-[#232331] p-2 rounded-lg border border-orange-300 focus:outline-none text-xs"
                  >
                    <option value="Hembra">Hembra</option>
                    <option value="Macho">Macho</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Nº Microchip Oficial</label>
                <input
                  type="text"
                  value={microchipNumber}
                  onChange={(e) => setMicrochipNumber(e.target.value)}
                  className="w-full bg-white text-[#232331] p-2 rounded-lg border border-orange-300 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Pasaporte Veterinario UE</label>
                <input
                  type="text"
                  value={healthPassportNumber}
                  onChange={(e) => setHealthPassportNumber(e.target.value)}
                  className="w-full bg-white text-[#232331] p-2 rounded-lg border border-orange-300 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Peso Mascota (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full bg-white text-[#232331] p-2 rounded-lg border border-orange-300 font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* DOORSTEP LOCAL DELIVERY SECTION */}
          <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs uppercase tracking-wider pb-2 border-b border-emerald-200">
              <Home className="w-4 h-4 text-emerald-600" />
              <span>Entrega Local en la Puerta del Destinatario (Doorstep)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-stone-700 font-bold mb-1">
                  Dirección Exacta de la Puerta del Receptor (Piso, Puerta, Código Postal) *
                </label>
                <input
                  type="text"
                  required
                  value={receiverDoorAddress}
                  onChange={(e) => setReceiverDoorAddress(e.target.value)}
                  placeholder="Ej: Calle Velázquez 64, Planta 4ª, Puerta Izquierda, 28001 Madrid"
                  className="w-full bg-white text-[#232331] p-2.5 rounded-lg border border-emerald-300 font-medium focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Cuidador / Conductor Asignado</label>
                <input
                  type="text"
                  value={courierHandlerName}
                  onChange={(e) => setCourierHandlerName(e.target.value)}
                  className="w-full bg-white text-[#232331] p-2 rounded-lg border border-emerald-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Estado de la Entrega en Puerta</label>
                <select
                  value={doorstepStatus}
                  onChange={(e) => setDoorstepStatus(e.target.value as any)}
                  className="w-full bg-white text-emerald-800 p-2 rounded-lg border border-emerald-300 font-bold focus:outline-none"
                >
                  <option value="preparing_dispatch">En centro de tránsito / Preparando furgoneta</option>
                  <option value="in_local_van">En furgoneta hacia el domicilio</option>
                  <option value="arriving_at_door">Llegando al portal / Subiendo a la puerta</option>
                  <option value="delivered_at_doorstep">Entregado en mano en la puerta con firma</option>
                </select>
              </div>
            </div>
          </div>

          {/* Identifiers & Transport Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-[#f8f5f1] rounded-xl border border-stone-200">
            <div>
              <label className="block text-stone-600 font-bold mb-1">Nº Rastreo *</label>
              <input
                type="text"
                required
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full bg-white text-[#232331] p-2 rounded-lg border border-stone-300 font-mono font-bold focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-600 font-bold mb-1">Guía Sanitaria AWB</label>
              <input
                type="text"
                value={bolNumber}
                onChange={(e) => setBolNumber(e.target.value)}
                className="w-full bg-white text-[#232331] p-2 rounded-lg border border-stone-300 font-mono focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-600 font-bold mb-1">Modalidad</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as TransportMode)}
                className="w-full bg-white text-[#232331] p-2 rounded-lg border border-stone-300 focus:border-orange-500 focus:outline-none font-medium"
              >
                <option value="road_transport">Furgoneta Puerta a Puerta</option>
                <option value="air_freight">Pet Nanny Aéreo Cabina</option>
                <option value="cold_chain">Traslado Cachorros Especial</option>
                <option value="ocean_fcl">Reubicación Internacional</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-600 font-bold mb-1">Estado General</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
                className="w-full bg-white text-orange-600 p-2 rounded-lg border border-stone-300 focus:border-orange-500 focus:outline-none font-bold"
              >
                <option value="booked">Reserva Registrada</option>
                <option value="in_transit">En Tránsito Climatizado</option>
                <option value="customs_hold">Revisión Veterinaria</option>
                <option value="out_for_delivery">En Reparto a Domicilio</option>
                <option value="delivered">Entregado en Mano en Puerta</option>
              </select>
            </div>
          </div>

          {/* RUTA: CIUDADES Y BASES EN ESPAÑA */}
          <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-200 space-y-3">
            <div className="flex items-center gap-2 text-orange-950 font-bold text-xs uppercase tracking-wider pb-2 border-b border-orange-200">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>Ruta de Transporte (Ciudades y Bases en España)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Ciudad / Base de Origen
                </label>
                <select
                  value={originPortCode}
                  onChange={(e) => {
                    setOriginPortCode(e.target.value);
                    const found = ports.find((p) => p.code === e.target.value);
                    if (found && !shipperCity) {
                      setShipperCity(found.city);
                      setShipperCountry(found.country);
                    }
                  }}
                  className="w-full bg-white text-[#232331] p-2 rounded-lg border border-orange-300 font-medium focus:border-orange-500 focus:outline-none"
                >
                  <optgroup label="🇪🇸 Principales Ciudades y Provincias de España">
                    {ports
                      .filter((p) => p.country === 'España')
                      .map((p) => (
                        <option key={p.id} value={p.code}>
                          {p.city} - {p.name} ({p.code})
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="🇪🇺 Enlaces Europeos Internacionales">
                    {ports
                      .filter((p) => p.country !== 'España')
                      .map((p) => (
                        <option key={p.id} value={p.code}>
                          {p.city} ({p.country}) - {p.name} ({p.code})
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Ciudad de Destino en España (Para Reparto en Puerta) *
                </label>
                <select
                  value={destPortCode}
                  onChange={(e) => {
                    setDestPortCode(e.target.value);
                    const found = ports.find((p) => p.code === e.target.value);
                    if (found) {
                      setConsigneeCity(found.city);
                      setConsigneeCountry(found.country);
                    }
                  }}
                  className="w-full bg-white text-[#232331] p-2 rounded-lg border border-orange-300 font-medium focus:border-orange-500 focus:outline-none"
                >
                  <optgroup label="🇪🇸 Ciudades y Provincias de Destino en España">
                    {ports
                      .filter((p) => p.country === 'España')
                      .map((p) => (
                        <option key={p.id} value={p.code}>
                          {p.city} - {p.name} ({p.code})
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="🇪🇺 Otros Destinos Internacionales">
                    {ports
                      .filter((p) => p.country !== 'España')
                      .map((p) => (
                        <option key={p.id} value={p.code}>
                          {p.city} ({p.country}) - {p.name} ({p.code})
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Vehículo / Furgoneta Asignada</label>
                <input
                  type="text"
                  value={vesselName}
                  onChange={(e) => setVesselName(e.target.value)}
                  placeholder="Furgoneta Puerta a Puerta #01 Climatizada"
                  className="w-full bg-white text-[#232331] p-2 rounded-lg border border-stone-300 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Llegada Estimada</label>
                  <input
                    type="date"
                    value={estimatedArrival}
                    onChange={(e) => setEstimatedArrival(e.target.value)}
                    className="w-full bg-white text-[#232331] p-2 rounded-lg border border-stone-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Temp. Cabina (°C)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={temperatureCelsius || 21.0}
                    onChange={(e) => setTemperatureCelsius(parseFloat(e.target.value))}
                    className="w-full bg-white text-[#232331] p-2 rounded-lg border border-stone-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Shipper & Consignee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#f8f5f1] rounded-xl border border-stone-200 space-y-2">
              <span className="font-bold text-stone-800 block text-[11px] uppercase tracking-wider">
                Remitente / Criador
              </span>
              <input
                type="text"
                required
                placeholder="Nombre o Criadero"
                value={shipperName}
                onChange={(e) => setShipperName(e.target.value)}
                className="w-full bg-white text-[#232331] p-2 rounded-lg border border-stone-300 focus:outline-none font-medium"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Ciudad Origen"
                  value={shipperCity}
                  onChange={(e) => setShipperCity(e.target.value)}
                  className="bg-white text-[#232331] p-2 rounded-lg border border-stone-300 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="País"
                  value={shipperCountry}
                  onChange={(e) => setShipperCountry(e.target.value)}
                  className="bg-white text-[#232331] p-2 rounded-lg border border-stone-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-[#f8f5f1] rounded-xl border border-stone-200 space-y-2">
              <span className="font-bold text-stone-800 block text-[11px] uppercase tracking-wider">
                Destinatario en Puerta
              </span>
              <input
                type="text"
                required
                placeholder="Nombre del Receptor"
                value={consigneeName}
                onChange={(e) => setConsigneeName(e.target.value)}
                className="w-full bg-white text-[#232331] p-2 rounded-lg border border-stone-300 focus:outline-none font-medium"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Ciudad Destino (ej. Madrid)"
                  value={consigneeCity}
                  onChange={(e) => setConsigneeCity(e.target.value)}
                  className="bg-white text-[#232331] p-2 rounded-lg border border-stone-300 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Teléfono (+34602493512)"
                  value={consigneePhone}
                  onChange={(e) => setConsigneePhone(e.target.value)}
                  className="bg-white text-[#232331] p-2 rounded-lg border border-stone-300 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-stone-600 font-bold mb-1">Notas de Cuidado y Bienestar</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Instrucciones de alimentación, paseos, contacto al llegar al portal..."
              className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:bg-white focus:outline-none"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-600 hover:text-stone-900 font-bold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Guardar Cambios' : 'Registrar Mascota'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
