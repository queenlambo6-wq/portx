export type TransportMode = 'ocean_fcl' | 'ocean_lcl' | 'air_freight' | 'road_transport' | 'rail_freight' | 'cold_chain';

export type ShipmentStatus = 'booked' | 'in_transit' | 'customs_hold' | 'out_for_delivery' | 'delivered' | 'exception';

export interface Milestone {
  id: string;
  timestamp: string;
  location: string;
  status: ShipmentStatus;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
  operator?: string;
  checkpointType?: 'origin_port' | 'departure' | 'in_transit_hub' | 'customs' | 'destination_port' | 'final_delivery';
}

export interface PetDetails {
  petName: string;
  species: 'dog' | 'cat' | 'bird' | 'other';
  speciesLabel: string;
  breed: string;
  age: string;
  gender?: 'Macho' | 'Hembra' | 'Male' | 'Female';
  microchipNumber: string;
  healthPassportNumber: string;
  rabiesVaccinationValid: boolean;
  vetClearanceApproved: boolean;
  crateModel: string;
  feedingInstructions: string;
  specialCareNotes: string;
  lastHydrationTime: string;
  lastWalkOrRestStop?: string;
  companionHandlerName: string;
  avatarUrl?: string;
}

export interface DoorstepDeliveryInfo {
  isDoorstepDelivery: boolean;
  doorstepStatus: 'preparing_dispatch' | 'in_local_van' | 'arriving_at_door' | 'delivered_at_doorstep';
  receiverDoorAddress: string;
  receiverCity: string;
  receiverProvince: string;
  receiverPostalCode?: string;
  receiverContactPerson: string;
  receiverPhone: string;
  estimatedDoorArrivalTime: string;
  courierHandlerName: string;
  courierHandlerPhone: string;
  vanVehiclePlate: string;
  handoverProof?: {
    deliveredAt: string;
    signedBy: string;
    signatureVerified: boolean;
    photoAtDoorTaken: boolean;
    petWelfareRating: string;
  };
}

export interface CargoItem {
  description: string;
  pieces: number;
  weightKg: number;
  dimensions?: string;
  volumeCbm: number;
  hsCode?: string;
  hazardous?: boolean;
}

export interface Shipment {
  id: string;
  trackingNumber: string; // e.g. PTX-849201
  bookingRef: string;
  bolNumber: string; // Bill of Lading
  mode: TransportMode;
  status: ShipmentStatus;
  statusLabel: string;
  sender: {
    name: string;
    company: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
  };
  consignee: {
    name: string;
    company: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
  };
  origin: {
    portName: string;
    portCode: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  destination: {
    portName: string;
    portCode: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  currentLocation: {
    name: string;
    lat: number;
    lng: number;
    updatedAt: string;
    weather?: string;
  };
  carrier: {
    name: string;
    vesselOrFlightName: string;
    voyageOrFlightNumber: string;
    imoNumber?: string;
  };
  containerNumber: string;
  sealNumber: string;
  cargo: CargoItem;
  departedAt: string;
  estimatedArrival: string;
  actualArrival?: string;
  departureTimeFormatted?: string;
  arrivalTimeFormatted?: string;
  temperatureCelsius?: number; // for reefer / pharma
  progressPercent: number;
  milestones: Milestone[];
  notes?: string;
  clientNotice?: string; // Official advisory for the receiver/client in case of delays or notes
  customsCleared: boolean;
  createdAt: string;
  petInfo?: PetDetails;
  doorstepDelivery?: DoorstepDeliveryInfo;
}

export interface PortHub {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  type: 'seaport' | 'airport' | 'intermodal';
  lat: number;
  lng: number;
  congestionStatus: 'normal' | 'moderate' | 'congested';
  avgTurnaroundHours: number;
  berthsAvailable: number;
  activePortxVessels: number;
}

export interface FleetVehicle {
  id: string;
  name: string;
  code: string;
  type: 'vessel' | 'aircraft' | 'truck' | 'train';
  mode: TransportMode;
  capacity: string;
  currentLocation: string;
  status: 'at_sea' | 'in_flight' | 'docked' | 'transit_road' | 'maintenance';
  currentRoute: string;
  speedKnotsOrKmh: string;
  fuelEfficiency: string;
  captainOrPilot: string;
  eta: string;
}

export interface BookingInquiry {
  id: string;
  quoteRef: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  mode: TransportMode;
  containerOrPackageType: string;
  weightKg: number;
  volumeCbm: number;
  declaredValueUsd: number;
  incoterm: 'FOB' | 'CIF' | 'EXW' | 'DDP' | 'DAP';
  estimatedCostUsd: number;
  status: 'pending' | 'approved' | 'rejected' | 'converted';
  assignedShipmentId?: string;
  requestedDate: string;
  createdAt: string;
  specialInstructions?: string;
}

export interface PortCallSchedule {
  id: string;
  vesselName: string;
  portName: string;
  portCode: string;
  eta: string;
  etd: string;
  berth: string;
  serviceLine: string;
  status: 'scheduled' | 'approaching' | 'berthed' | 'departed';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  clearanceLevel: string;
  station: string;
  badgeNumber: string;
  avatarUrl?: string;
  lastLogin?: string;
}
