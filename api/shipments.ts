import fs from 'fs';
import path from 'path';

// Seeded shipments fallback for serverless cold-starts
const DEFAULT_SHIPMENTS = [
  {
    id: 'sh-douala-vy61242379-100',
    trackingNumber: 'VY61242379-100',
    bookingRef: 'BK-612423',
    bolNumber: 'VY 61242379',
    mode: 'road_transport',
    status: 'booked',
    statusLabel: 'Pickup / Recogido en origen',
    departureTimeFormatted: 'Nov 7',
    arrivalTimeFormatted: 'Nov 8',
    clientNotice: 'Jaula de Transporte Electrónica Para Mascotas IPATA Pendiente',
    yellowStickyNote: 'Cuidado prioritario para traslado de mascota. Mantener en furgoneta climatizada a 21°C.',
    sender: {
      name: 'Herbas Tejrina Shirley Laura',
      company: 'Herbas Tejrina Shirley Laura',
      address: 'douala, España',
      city: 'Douala',
      country: 'España',
      phone: '+34602493512',
      email: 'remitente@portx.com'
    },
    consignee: {
      name: 'Encarnación Maria Camino López',
      company: 'Encarnación Maria Camino López',
      address: 'mankon, España',
      city: 'Mankon',
      country: 'España',
      phone: '+34602493512',
      email: 'cliente@gmail.com'
    },
    origin: {
      portName: 'douala, España',
      portCode: 'ESMAD',
      city: 'Douala',
      country: 'España',
      lat: 4.0511,
      lng: 9.7679
    },
    destination: {
      portName: 'mankon, España',
      portCode: 'ESBCN',
      city: 'Mankon',
      country: 'España',
      lat: 5.9597,
      lng: 10.1460
    },
    currentLocation: {
      name: 'Douala',
      lat: 4.0511,
      lng: 9.7679,
      updatedAt: 'Nov 7',
      weather: 'Climatizado 21°C'
    },
    carrier: {
      name: 'PortX Global Logistics',
      vesselOrFlightName: 'Furgoneta Puerta a Puerta PortX',
      voyageOrFlightNumber: 'VY61242379-100'
    },
    containerNumber: 'VY61242379-100',
    sealNumber: 'SEAL-6124',
    cargo: {
      description: 'Transporte de Mascotas',
      pieces: 1,
      weightKg: 1.1,
      dimensions: 'L: 0 × W: 0 × H: 0 cm',
      volumeCbm: 0.05
    },
    petInfo: {
      petName: 'Rocky',
      species: 'dog',
      speciesLabel: 'Perro (Canino)',
      breed: 'Cachorro',
      age: '3 meses',
      gender: 'Macho',
      microchipNumber: '981098107482910',
      healthPassportNumber: 'ES-VET-2026-9041',
      rabiesVaccinationValid: true,
      vetClearanceApproved: true,
      crateModel: 'Jaula Homologada PortX IPATA',
      feedingInstructions: 'Hidratación cada 2 horas',
      specialCareNotes: 'Cuidado especial en cabina climatizada',
      lastHydrationTime: '10:30 CET',
      companionHandlerName: 'Despacho Asignado PortX'
    },
    doorstepDelivery: {
      isDoorstepDelivery: true,
      doorstepStatus: 'in_local_van',
      receiverDoorAddress: 'mankon, España',
      receiverCity: 'Mankon',
      receiverProvince: 'España',
      receiverContactPerson: 'Encarnación Maria Camino López',
      receiverPhone: '+34602493512',
      estimatedDoorArrivalTime: 'Nov 8',
      courierHandlerName: 'Despacho Asignado PortX',
      courierHandlerPhone: '+34602493512',
      vanVehiclePlate: 'VAN-PTX-01'
    },
    milestones: [
      {
        id: 'm-vy6124-1',
        timestamp: 'Nov 7, 08:30',
        location: 'Douala',
        status: 'booked',
        description: 'Recepción e inspección en Douala. Documentación y jaula IPATA verificadas.',
        isCompleted: true,
        isCurrent: true,
        operator: 'Despacho PortX'
      }
    ],
    progressPercent: 20
  }
];

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'shipments.json');
    let shipments = DEFAULT_SHIPMENTS;
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, 'utf-8');
      shipments = JSON.parse(raw);
    }

    if (req.method === 'GET') {
      const { code } = req.query || {};
      if (code) {
        const clean = String(code).trim().toUpperCase();
        const found = shipments.find((s: any) => s.trackingNumber?.toUpperCase() === clean);
        if (found) return res.status(200).json(found);
        return res.status(404).json({ error: 'Shipment not found' });
      }
      return res.status(200).json(shipments);
    }

    if (req.method === 'POST') {
      const newShipment = req.body;
      if (!newShipment?.trackingNumber) {
        return res.status(400).json({ error: 'trackingNumber is required' });
      }
      return res.status(201).json(newShipment);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
