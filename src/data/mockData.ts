import { Shipment, PortHub, FleetVehicle, BookingInquiry, PortCallSchedule } from '../types';

export const INITIAL_PORTS: PortHub[] = [
  {
    id: 'port-1',
    code: 'NLRTM',
    name: 'Port of Rotterdam',
    city: 'Rotterdam',
    country: 'Netherlands',
    type: 'seaport',
    lat: 51.9054,
    lng: 4.4666,
    congestionStatus: 'normal',
    avgTurnaroundHours: 18,
    berthsAvailable: 14,
    activePortxVessels: 4
  },
  {
    id: 'port-2',
    code: 'SGSIN',
    name: 'Port of Singapore',
    city: 'Singapore',
    country: 'Singapore',
    type: 'seaport',
    lat: 1.2644,
    lng: 103.8229,
    congestionStatus: 'normal',
    avgTurnaroundHours: 14,
    berthsAvailable: 22,
    activePortxVessels: 6
  },
  {
    id: 'port-3',
    code: 'CNSHA',
    name: 'Port of Shanghai',
    city: 'Shanghai',
    country: 'China',
    type: 'seaport',
    lat: 31.2304,
    lng: 121.4737,
    congestionStatus: 'moderate',
    avgTurnaroundHours: 24,
    berthsAvailable: 8,
    activePortxVessels: 5
  },
  {
    id: 'port-4',
    code: 'USLAX',
    name: 'Port of Los Angeles',
    city: 'Los Angeles',
    country: 'United States',
    type: 'seaport',
    lat: 33.7432,
    lng: -118.2673,
    congestionStatus: 'congested',
    avgTurnaroundHours: 36,
    berthsAvailable: 3,
    activePortxVessels: 3
  },
  {
    id: 'port-5',
    code: 'AEDXB',
    name: 'Jebel Ali Port / Dubai Cargo Village',
    city: 'Dubai',
    country: 'United Arab Emirates',
    type: 'seaport',
    lat: 25.0116,
    lng: 55.0617,
    congestionStatus: 'normal',
    avgTurnaroundHours: 12,
    berthsAvailable: 16,
    activePortxVessels: 3
  },
  {
    id: 'port-6',
    code: 'DEHAM',
    name: 'Port of Hamburg',
    city: 'Hamburg',
    country: 'Germany',
    type: 'seaport',
    lat: 53.5353,
    lng: 9.9872,
    congestionStatus: 'normal',
    avgTurnaroundHours: 20,
    berthsAvailable: 11,
    activePortxVessels: 2
  },
  {
    id: 'port-7',
    code: 'DEFRAL',
    name: 'Frankfurt Airport CargoCity',
    city: 'Frankfurt',
    country: 'Germany',
    type: 'airport',
    lat: 50.0379,
    lng: 8.5622,
    congestionStatus: 'normal',
    avgTurnaroundHours: 4,
    berthsAvailable: 18,
    activePortxVessels: 2
  },
  {
    id: 'port-8',
    code: 'USORD',
    name: "Chicago O'Hare International Air Cargo Center",
    city: 'Chicago',
    country: 'United States',
    type: 'airport',
    lat: 41.9742,
    lng: -87.9073,
    congestionStatus: 'normal',
    avgTurnaroundHours: 5,
    berthsAvailable: 12,
    activePortxVessels: 1
  }
];

export const INITIAL_FLEET: FleetVehicle[] = [
  {
    id: 'flt-1',
    name: 'PortX Explorer IV',
    code: 'IMO-9824102',
    type: 'vessel',
    mode: 'ocean_fcl',
    capacity: '18,500 TEU',
    currentLocation: 'Malacca Strait (Eastbound)',
    status: 'at_sea',
    currentRoute: 'Rotterdam (NLRTM) → Singapore (SGSIN)',
    speedKnotsOrKmh: '19.4 knots',
    fuelEfficiency: 'LNG Dual-Fuel / 94.2%',
    captainOrPilot: 'Capt. Henrik Van Dijk',
    eta: 'Nov 05, 2026 14:00'
  },
  {
    id: 'flt-2',
    name: 'PortX Pacific Titan',
    code: 'IMO-9410984',
    type: 'vessel',
    mode: 'ocean_fcl',
    capacity: '21,000 TEU',
    currentLocation: 'Mid-Pacific Ocean (Eastbound)',
    status: 'at_sea',
    currentRoute: 'Shanghai (CNSHA) → Los Angeles (USLAX)',
    speedKnotsOrKmh: '18.1 knots',
    fuelEfficiency: 'Bio-Bunker / 91.8%',
    captainOrPilot: 'Capt. Zhang Wei',
    eta: 'Nov 09, 2026 08:30'
  },
  {
    id: 'flt-3',
    name: 'PortX SkyFreighter 777F',
    code: 'REG-N892PX',
    type: 'aircraft',
    mode: 'air_freight',
    capacity: '102 Metric Tons Payload',
    currentLocation: 'FL340 / Over Greenland',
    status: 'in_flight',
    currentRoute: 'Frankfurt (FRA) → Chicago (ORD)',
    speedKnotsOrKmh: '490 knots (890 km/h)',
    fuelEfficiency: 'SAF 30% Blend / 96.0%',
    captainOrPilot: 'Cmdr. Elena Rostova',
    eta: 'Nov 02, 2026 19:45'
  },
  {
    id: 'flt-4',
    name: 'PortX Trans-Alps Express 04',
    code: 'TRUCK-NL-84-PX',
    type: 'truck',
    mode: 'road_transport',
    capacity: '24 Tons / Heavy Payload',
    currentLocation: 'Brenner Pass, Austria',
    status: 'transit_road',
    currentRoute: 'Munich (DE) → Milan Intermodal Hub (IT)',
    speedKnotsOrKmh: '78 km/h',
    fuelEfficiency: 'Euro 6e Hydrogen-Hybrid',
    captainOrPilot: 'Lead Driver Marco Rossi',
    eta: 'Nov 02, 2026 17:15'
  },
  {
    id: 'flt-5',
    name: 'PortX Eurasia Iron Rail 12',
    code: 'RAIL-EUR-773',
    type: 'train',
    mode: 'rail_freight',
    capacity: '82 x 40ft High-Cube Containers',
    currentLocation: 'Duisburg Intermodal Terminal',
    status: 'docked',
    currentRoute: 'Chongqing (CN) → Duisburg (DE)',
    speedKnotsOrKmh: '0 km/h (Unloading)',
    fuelEfficiency: 'Electric 15kV / 100% Hydro-Powered',
    captainOrPilot: 'Inspector Klaus Lindemann',
    eta: 'Arrived / Processing'
  }
];

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'sh-1',
    trackingNumber: 'PTX-849201',
    bookingRef: 'BK-2026-9041',
    bolNumber: 'BL-NLRTM-SGSIN-8492',
    mode: 'ocean_fcl',
    status: 'in_transit',
    statusLabel: 'In Transit - Indian Ocean',
    sender: {
      name: 'Siemens Precision Logistics',
      company: 'Siemens AG Industrial Systems',
      address: '',
      city: 'Munich',
      country: 'Germany',
      phone: '+49 89 636 00',
      email: 'cargo.dispatch@siemens-logistics.de'
    },
    consignee: {
      name: 'SingaTech Robotics Pte Ltd',
      company: 'SingaTech Automation Systems',
      address: '',
      city: 'Singapore',
      country: 'Singapore',
      phone: '+65 6790 1200',
      email: 'import@singatech-robotics.sg'
    },
    origin: {
      portName: 'Port of Rotterdam (ECT Delta Terminal)',
      portCode: 'NLRTM',
      city: 'Rotterdam',
      country: 'Netherlands',
      lat: 51.9054,
      lng: 4.4666
    },
    destination: {
      portName: 'Port of Singapore (Tanjong Pagar)',
      portCode: 'SGSIN',
      city: 'Singapore',
      country: 'Singapore',
      lat: 1.2644,
      lng: 103.8229
    },
    currentLocation: {
      name: 'Malacca Strait Approach (Coordinates: 5.84N, 95.31E)',
      lat: 5.8421,
      lng: 95.3192,
      updatedAt: '2 hours ago',
      weather: 'Calm Seas · 29°C · Wind 8 kts'
    },
    carrier: {
      name: 'PortX Ocean Lines',
      vesselOrFlightName: 'PortX Explorer IV',
      voyageOrFlightNumber: 'VOY-PX-409E',
      imoNumber: 'IMO-9824102'
    },
    containerNumber: 'PXLU-849204-7',
    sealNumber: 'SEAL-NL-902148',
    cargo: {
      description: 'Precision Automated CNC Modules & Industrial Actuators',
      pieces: 18,
      weightKg: 21450,
      volumeCbm: 58.2,
      dimensions: '40ft High Cube Container (12.19m x 2.44m x 2.89m)',
      hsCode: '8479.89',
      hazardous: false
    },
    departedAt: '2026-10-18T08:00:00Z',
    estimatedArrival: '2026-11-05T14:00:00Z',
    temperatureCelsius: 21.5,
    progressPercent: 78,
    customsCleared: true,
    createdAt: '2026-10-14T09:30:00Z',
    notes: 'Temperature logged continuously. Security seal verified unbroken at Suez Canal transit checkpoint.',
    milestones: [
      {
        id: 'm-1',
        timestamp: '2026-10-14 11:20 CET',
        location: 'Rotterdam Dispatch Terminal, Netherlands',
        status: 'booked',
        description: 'Electronic Cargo Manifest verified and Bill of Lading BL-NLRTM-SGSIN-8492 issued.',
        isCompleted: true,
        isCurrent: false,
        operator: 'PortX Dispatch Agent (J. Visser)',
        checkpointType: 'origin_port'
      },
      {
        id: 'm-2',
        timestamp: '2026-10-17 16:45 CET',
        location: 'Port of Rotterdam, Quay 204',
        status: 'in_transit',
        description: 'Container PXLU-849204-7 loaded onto vessel PortX Explorer IV (Bay 14, Tier 04).',
        isCompleted: true,
        isCurrent: false,
        operator: 'ECT Crane Logistics Terminal',
        checkpointType: 'departure'
      },
      {
        id: 'm-3',
        timestamp: '2026-10-18 08:00 CET',
        location: 'Rotterdam Channel',
        status: 'in_transit',
        description: 'Vessel cast off berth. Outbound passage to English Channel and Gibraltar.',
        isCompleted: true,
        isCurrent: false,
        operator: 'Pilot Station Hoek van Holland',
        checkpointType: 'departure'
      },
      {
        id: 'm-4',
        timestamp: '2026-10-24 13:10 UTC',
        location: 'Port Said / Suez Canal Convoy, Egypt',
        status: 'in_transit',
        description: 'Southbound convoy passage cleared. Security seals and satellite telemetry checked.',
        isCompleted: true,
        isCurrent: false,
        operator: 'Suez Canal Authority (SCA)',
        checkpointType: 'in_transit_hub'
      },
      {
        id: 'm-5',
        timestamp: '2026-11-01 22:30 UTC',
        location: 'Malacca Strait Approach',
        status: 'in_transit',
        description: 'Vessel on scheduled speed at 19.4 knots. Pre-arrival customs clearance filed with Singapore MPA.',
        isCompleted: true,
        isCurrent: true,
        operator: 'PortX Maritime Traffic Control',
        checkpointType: 'in_transit_hub'
      },
      {
        id: 'm-6',
        timestamp: '2026-11-05 14:00 SGT (Estimated)',
        location: 'Port of Singapore (Tanjong Pagar Berths)',
        status: 'out_for_delivery',
        description: 'Scheduled docking and unlashing at Berth TP-08.',
        isCompleted: false,
        isCurrent: false,
        checkpointType: 'destination_port'
      },
      {
        id: 'm-7',
        timestamp: '2026-11-06 10:00 SGT (Estimated)',
        location: 'SingaTech Terminal Logistics Hub, Singapore',
        status: 'delivered',
        description: 'Final bonded flatbed drayage and signoff by consignee.',
        isCompleted: false,
        isCurrent: false,
        checkpointType: 'final_delivery'
      }
    ]
  },
  {
    id: 'sh-2',
    trackingNumber: 'PTX-772194',
    bookingRef: 'BK-2026-8812',
    bolNumber: 'BL-CNSHA-USLAX-7721',
    mode: 'ocean_fcl',
    status: 'in_transit',
    statusLabel: 'In Transit - Transpacific Route',
    sender: {
      name: 'Foxconn Global Exports',
      company: 'Hon Hai Precision Industry',
      address: '',
      city: 'Shenzhen',
      country: 'China',
      phone: '+86 755 2812 8888',
      email: 'logistics.global@foxconn.com.cn'
    },
    consignee: {
      name: 'Apex Consumer Electronics LLC',
      company: 'Apex Supply Chain Partners',
      address: '',
      city: 'Long Beach, CA',
      country: 'United States',
      phone: '+1 310 555 0192',
      email: 'warehouse.ca@apexsupply.com'
    },
    origin: {
      portName: 'Port of Shanghai (Yangshan Deepwater Port)',
      portCode: 'CNSHA',
      city: 'Shanghai',
      country: 'China',
      lat: 31.2304,
      lng: 121.4737
    },
    destination: {
      portName: 'Port of Los Angeles (Pier 400)',
      portCode: 'USLAX',
      city: 'Los Angeles',
      country: 'United States',
      lat: 33.7432,
      lng: -118.2673
    },
    currentLocation: {
      name: 'Central North Pacific (Coordinates: 37.12N, 168.45W)',
      lat: 37.1215,
      lng: -168.4512,
      updatedAt: '4 hours ago',
      weather: 'Overcast · 14°C · Swell 2.1m'
    },
    carrier: {
      name: 'PortX Ocean Lines',
      vesselOrFlightName: 'PortX Pacific Titan',
      voyageOrFlightNumber: 'VOY-PX-882W',
      imoNumber: 'IMO-9410984'
    },
    containerNumber: 'PXLU-772194-0',
    sealNumber: 'SEAL-CN-810934',
    cargo: {
      description: 'Consumer Next-Gen Tablet Displays & Lithium-Safe Battery Assemblies',
      pieces: 1200,
      weightKg: 18920,
      volumeCbm: 64.0,
      dimensions: '40ft High Cube Container',
      hsCode: '8528.52',
      hazardous: false
    },
    departedAt: '2026-10-25T14:30:00Z',
    estimatedArrival: '2026-11-09T08:30:00Z',
    progressPercent: 62,
    customsCleared: true,
    createdAt: '2026-10-22T06:15:00Z',
    notes: 'ISF 10+2 security filing submitted and accepted by US Customs and Border Protection.',
    milestones: [
      {
        id: 'm-201',
        timestamp: '2026-10-22 08:30 CST',
        location: 'Shanghai Yangshan Logistics Terminal',
        status: 'booked',
        description: 'Booking confirmed and export customs clearance issued by Shanghai Customs.',
        isCompleted: true,
        isCurrent: false,
        operator: 'PortX Far East Hub'
      },
      {
        id: 'm-202',
        timestamp: '2026-10-25 14:30 CST',
        location: 'Port of Shanghai, Yangshan Berth 03',
        status: 'in_transit',
        description: 'Gantry crane loading finished. Vessel departed for Los Angeles direct route.',
        isCompleted: true,
        isCurrent: false,
        operator: 'Yangshan Harbor Master'
      },
      {
        id: 'm-203',
        timestamp: '2026-11-01 18:00 UTC',
        location: 'North Pacific Ocean Waypoint Alpha',
        status: 'in_transit',
        description: 'Routine satellite position report. Vessel cruising at 18.1 knots.',
        isCompleted: true,
        isCurrent: true,
        operator: 'PortX Transpacific Operations'
      },
      {
        id: 'm-204',
        timestamp: '2026-11-09 08:30 PST (Estimated)',
        location: 'Port of Los Angeles (Pier 400)',
        status: 'customs_hold',
        description: 'Berthing and US CBP terminal container screening.',
        isCompleted: false,
        isCurrent: false
      },
      {
        id: 'm-205',
        timestamp: '2026-11-10 15:00 PST (Estimated)',
        location: 'Apex Distribution Warehouse, Long Beach',
        status: 'delivered',
        description: 'Intermodal drayage delivery to consignee dock.',
        isCompleted: false,
        isCurrent: false
      }
    ]
  },
  {
    id: 'sh-3',
    trackingNumber: 'PTX-481903',
    bookingRef: 'BK-2026-4419',
    bolNumber: 'AWB-020-48190321',
    mode: 'air_freight',
    status: 'in_transit',
    statusLabel: 'Air Freight - In Flight',
    sender: {
      name: 'BioCure Pharma Labs GmbH',
      company: 'BioCure BioPharma International',
      address: '',
      city: 'Frankfurt am Main',
      country: 'Germany',
      phone: '+49 69 305 1200',
      email: 'coldchain@biocure-pharma.de'
    },
    consignee: {
      name: 'Northwestern Healthcare Logistics',
      company: 'Northwestern Medicine Health System',
      address: '',
      city: 'Chicago, IL',
      country: 'United States',
      phone: '+1 312 926 2000',
      email: 'clinical.logistics@nm.org'
    },
    origin: {
      portName: 'Frankfurt Airport CargoCity South (FRA)',
      portCode: 'DEFRAL',
      city: 'Frankfurt',
      country: 'Germany',
      lat: 50.0379,
      lng: 8.5622
    },
    destination: {
      portName: "Chicago O'Hare International Air Cargo Terminal (ORD)",
      portCode: 'USORD',
      city: 'Chicago',
      country: 'United States',
      lat: 41.9742,
      lng: -87.9073
    },
    currentLocation: {
      name: 'Altitude 34,000 ft over Nuuk, Greenland',
      lat: 64.1814,
      lng: -51.6941,
      updatedAt: '35 minutes ago',
      weather: 'Clear Skies · -54°C Outside Air · Cabin Reefer +4.2°C'
    },
    carrier: {
      name: 'PortX Air Cargo Express',
      vesselOrFlightName: 'PortX SkyFreighter 777F',
      voyageOrFlightNumber: 'PX-7729F',
      imoNumber: 'REG-N892PX'
    },
    containerNumber: 'ULD-RKN-92841P7',
    sealNumber: 'PHARMA-SEAL-0914',
    cargo: {
      description: 'Temperature-Sensitive Oncology Biologicals & Vaccine Sera (+2°C to +8°C)',
      pieces: 42,
      weightKg: 3450,
      volumeCbm: 14.8,
      dimensions: '4 x Envirotainer e2 RKN Active Containers',
      hsCode: '3002.20',
      hazardous: false
    },
    departedAt: '2026-11-02T11:15:00Z',
    estimatedArrival: '2026-11-02T19:45:00Z',
    temperatureCelsius: 4.2,
    progressPercent: 55,
    customsCleared: true,
    createdAt: '2026-11-01T14:00:00Z',
    notes: 'Active dry-ice Envirotainer monitored live via PortX IOT Sensor Gateway. Temp maintained strictly at 4.2°C.',
    milestones: [
      {
        id: 'm-301',
        timestamp: '2026-11-01 16:00 CET',
        location: 'BioCure Hoechst Facility, Frankfurt',
        status: 'booked',
        description: 'Pre-conditioned Envirotainer loaded, active sensor telemetry validated.',
        isCompleted: true,
        isCurrent: false,
        operator: 'Pharma Quality Inspector (Dr. Weber)'
      },
      {
        id: 'm-302',
        timestamp: '2026-11-02 08:30 CET',
        location: 'Frankfurt Airport CargoCity South (Perishable Center)',
        status: 'in_transit',
        description: 'EU Customs export security clearance completed. ULD palletized into lower deck hold 2.',
        isCompleted: true,
        isCurrent: false,
        operator: 'Lufthansa Cargo Handling / PortX Air'
      },
      {
        id: 'm-303',
        timestamp: '2026-11-02 11:15 CET',
        location: 'Frankfurt Airport Runway 18 West',
        status: 'in_transit',
        description: 'Flight PX-7729F airborne direct to Chicago O’Hare (ORD).',
        isCompleted: true,
        isCurrent: false,
        operator: 'Fraport Air Traffic Control'
      },
      {
        id: 'm-304',
        timestamp: '2026-11-02 14:10 UTC',
        location: 'Transatlantic Flight Corridor (Over Greenland)',
        status: 'in_transit',
        description: 'Cruising at Mach 0.84. Temperature sensor steady at +4.2°C.',
        isCompleted: true,
        isCurrent: true,
        operator: 'PortX SkyFreighter Flight Crew'
      },
      {
        id: 'm-305',
        timestamp: '2026-11-02 13:45 CST (Estimated)',
        location: "Chicago O'Hare Air Cargo Terminal 5",
        status: 'out_for_delivery',
        description: 'Wheels down, priority offload to climate-controlled pharma transit dock.',
        isCompleted: false,
        isCurrent: false
      },
      {
        id: 'm-306',
        timestamp: '2026-11-02 16:30 CST (Estimated)',
        location: 'Northwestern Healthcare Logistics Dock, Chicago',
        status: 'delivered',
        description: 'Dedicated reefer van delivery with digital temperature log verification signoff.',
        isCompleted: false,
        isCurrent: false
      }
    ]
  },
  {
    id: 'sh-4',
    trackingNumber: 'PTX-620419',
    bookingRef: 'BK-2026-3011',
    bolNumber: 'BL-DEHAM-AEDXB-6204',
    mode: 'ocean_fcl',
    status: 'delivered',
    statusLabel: 'Delivered - Signed & Confirmed',
    sender: {
      name: 'Bavaria Motor Components GmbH',
      company: 'BMW Group Parts Division',
      address: '',
      city: 'Munich',
      country: 'Germany',
      phone: '+49 89 382 0',
      email: 'parts.export@bmwgroup.de'
    },
    consignee: {
      name: 'Al-Naboodah Automotive Group',
      company: 'Al-Naboodah Logistics Hub',
      address: '',
      city: 'Dubai',
      country: 'United Arab Emirates',
      phone: '+971 4 314 7777',
      email: 'spareparts@alnaboodah.ae'
    },
    origin: {
      portName: 'Port of Hamburg (Burchardkai Terminal)',
      portCode: 'DEHAM',
      city: 'Hamburg',
      country: 'Germany',
      lat: 53.5353,
      lng: 9.9872
    },
    destination: {
      portName: 'Jebel Ali Port (Terminal 2)',
      portCode: 'AEDXB',
      city: 'Dubai',
      country: 'United Arab Emirates',
      lat: 25.0116,
      lng: 55.0617
    },
    currentLocation: {
      name: 'Delivered to Al-Naboodah Warehouse Dock 4, Dubai',
      lat: 25.0116,
      lng: 55.0617,
      updatedAt: 'Yesterday 16:15 GST'
    },
    carrier: {
      name: 'PortX Ocean Lines',
      vesselOrFlightName: 'PortX Arabian Gulf Star',
      voyageOrFlightNumber: 'VOY-PX-104M',
      imoNumber: 'IMO-9654128'
    },
    containerNumber: 'PXLU-620419-3',
    sealNumber: 'SEAL-HAM-19482',
    cargo: {
      description: 'OEM Automotive Transmission Units & Electronic Control Modules',
      pieces: 340,
      weightKg: 24600,
      volumeCbm: 61.5,
      dimensions: '40ft Standard Dry Container',
      hsCode: '8708.40',
      hazardous: false
    },
    departedAt: '2026-10-06T10:00:00Z',
    estimatedArrival: '2026-11-01T12:00:00Z',
    actualArrival: '2026-11-01T15:45:00Z',
    progressPercent: 100,
    customsCleared: true,
    createdAt: '2026-10-02T11:00:00Z',
    notes: 'Successfully discharged at Jebel Ali Terminal 2 and delivered with zero damage claim.',
    milestones: [
      {
        id: 'm-401',
        timestamp: '2026-10-03 09:00 CET',
        location: 'Hamburg Burchardkai Terminal',
        status: 'booked',
        description: 'Container received at terminal gate and weighted on certified scale.',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'm-402',
        timestamp: '2026-10-06 10:00 CET',
        location: 'Port of Hamburg, Germany',
        status: 'in_transit',
        description: 'Vessel departed down River Elbe into North Sea.',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'm-403',
        timestamp: '2026-10-29 11:20 GST',
        location: 'Strait of Hormuz',
        status: 'in_transit',
        description: 'Vessel entered Arabian Gulf and initiated pre-arrival berthing protocols.',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'm-404',
        timestamp: '2026-11-01 09:30 GST',
        location: 'Jebel Ali Port, Berth 24',
        status: 'out_for_delivery',
        description: 'Discharged from vessel. Dubai Customs released under Smart Trade Portal.',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'm-405',
        timestamp: '2026-11-01 16:15 GST',
        location: 'Al-Naboodah Distribution Center, Dubai',
        status: 'delivered',
        description: 'Cargo unpacked and verified. Consignee signature collected: Tariq Al-Mansoor.',
        isCompleted: true,
        isCurrent: true,
        operator: 'PortX Gulf Drayage Fleet'
      }
    ]
  },
  {
    id: 'sh-5',
    trackingNumber: 'PTX-338290',
    bookingRef: 'BK-2026-1932',
    bolNumber: 'BL-CHQ-DUI-3382',
    mode: 'rail_freight',
    status: 'customs_hold',
    statusLabel: 'Customs Examination - Malaszewicze Border Hub',
    sender: {
      name: 'Chongqing Solar Photovoltaic Ltd',
      company: 'Chongqing Green Energy Group',
      address: '',
      city: 'Chongqing',
      country: 'China',
      phone: '+86 23 6819 4000',
      email: 'logistics@cq-solar.cn'
    },
    consignee: {
      name: 'Nordic CleanPower Distribution AB',
      company: 'Nordic CleanPower Technologies',
      address: '',
      city: 'Stockholm (via Duisburg Hub)',
      country: 'Sweden',
      phone: '+46 8 505 2000',
      email: 'receiving@nordiccleanpower.se'
    },
    origin: {
      portName: 'Chongqing Tuanjiecun Intermodal Rail Terminal',
      portCode: 'CNTJC',
      city: 'Chongqing',
      country: 'China',
      lat: 29.563,
      lng: 106.5516
    },
    destination: {
      portName: 'Duisburg Intermodal Gateway / Rhine Port',
      portCode: 'DEDUI',
      city: 'Duisburg',
      country: 'Germany',
      lat: 51.4344,
      lng: 6.7623
    },
    currentLocation: {
      name: 'Malaszewicze Rail Customs Terminal, Poland/EU Border',
      lat: 52.0167,
      lng: 23.5333,
      updatedAt: '3 hours ago',
      weather: 'Cloudy · 8°C'
    },
    carrier: {
      name: 'PortX Trans-Eurasian Rail Express',
      vesselOrFlightName: 'PortX Iron Rail 12',
      voyageOrFlightNumber: 'TRAIN-YUXINOU-84',
      imoNumber: 'RAIL-EUR-773'
    },
    containerNumber: 'PXLU-338290-8',
    sealNumber: 'CUSTOMS-SEAL-PL-44',
    cargo: {
      description: 'High-Efficiency Monocrystalline Bifacial Solar Inverters & Panels',
      pieces: 480,
      weightKg: 22100,
      volumeCbm: 68.4,
      dimensions: '40ft High Cube Container',
      hsCode: '8541.40',
      hazardous: false
    },
    departedAt: '2026-10-21T06:00:00Z',
    estimatedArrival: '2026-11-06T18:00:00Z',
    progressPercent: 71,
    customsCleared: false,
    createdAt: '2026-10-18T10:00:00Z',
    notes: 'Random EU border customs verification inspection initiated at Malaszewicze. Expected clearance within 12 hours.',
    milestones: [
      {
        id: 'm-501',
        timestamp: '2026-10-19 14:00 CST',
        location: 'Chongqing Tuanjiecun Station',
        status: 'booked',
        description: 'Consolidated onto Yuxinou Freight Train Express heading westbound.',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'm-502',
        timestamp: '2026-10-25 10:15 UTC',
        location: 'Dostyk / Alashankou Border (Kazakhstan)',
        status: 'in_transit',
        description: 'Track gauge bogie exchange completed from standard 1435mm to broad 1520mm.',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'm-503',
        timestamp: '2026-11-02 04:30 CET',
        location: 'Malaszewicze Customs Terminal, Poland',
        status: 'customs_hold',
        description: 'Train arrived at EU external frontier. Polish Customs tariff classification document audit underway.',
        isCompleted: true,
        isCurrent: true,
        operator: 'Polish Customs Service (KAS)'
      },
      {
        id: 'm-504',
        timestamp: '2026-11-06 18:00 CET (Estimated)',
        location: 'Duisburg Intermodal Terminal, Germany',
        status: 'out_for_delivery',
        description: 'Train arrival and final onward transshipment to Stockholm.',
        isCompleted: false,
        isCurrent: false
      }
    ]
  }
];

export const INITIAL_INQUIRIES: BookingInquiry[] = [
  {
    id: 'inq-101',
    quoteRef: 'QUO-2026-9912',
    fullName: 'Alexander Wright',
    companyName: 'Wright Aerospace Composites',
    email: 'a.wright@wright-aero.co.uk',
    phone: '+44 20 7946 0912',
    origin: 'Port of Rotterdam (NLRTM)',
    destination: 'Port of Houston (USHOU)',
    mode: 'ocean_fcl',
    containerOrPackageType: '2x 40ft High Cube',
    weightKg: 32000,
    volumeCbm: 120,
    declaredValueUsd: 480000,
    incoterm: 'CIF',
    estimatedCostUsd: 6850,
    status: 'pending',
    requestedDate: '2026-11-15',
    createdAt: '2026-11-01 19:40',
    specialInstructions: 'Requires crane tandem lift at Houston terminal. High value carbon-fiber materials.'
  },
  {
    id: 'inq-102',
    quoteRef: 'QUO-2026-9913',
    fullName: 'Miyuki Tanaka',
    companyName: 'NeoTokyo Medical Instruments',
    email: 'tanaka.m@neotokyo-med.jp',
    phone: '+81 3 5555 0144',
    origin: 'Tokyo Haneda Cargo (HND)',
    destination: 'Frankfurt CargoCity (FRA)',
    mode: 'air_freight',
    containerOrPackageType: 'Active Temperature Box (+15 to +25°C)',
    weightKg: 1850,
    volumeCbm: 8.4,
    declaredValueUsd: 320000,
    incoterm: 'DDP',
    estimatedCostUsd: 11400,
    status: 'approved',
    requestedDate: '2026-11-08',
    createdAt: '2026-11-01 22:15',
    specialInstructions: 'Critical diagnostic surgical lasers. Priority air cargo slot requested.'
  },
  {
    id: 'inq-103',
    quoteRef: 'QUO-2026-9914',
    fullName: 'Carlos Mendoza',
    companyName: 'Iberia AgriExport SA',
    email: 'carlos.m@iberia-export.es',
    phone: '+34 91 555 8392',
    origin: 'Port of Valencia (ESVLC)',
    destination: 'Jebel Ali Port, Dubai (AEDXB)',
    mode: 'cold_chain',
    containerOrPackageType: '40ft Reefer (-18°C Controlled)',
    weightKg: 23500,
    volumeCbm: 59,
    declaredValueUsd: 95000,
    incoterm: 'FOB',
    estimatedCostUsd: 5400,
    status: 'pending',
    requestedDate: '2026-11-20',
    createdAt: '2026-11-02 02:20',
    specialInstructions: 'Perishable frozen gourmet products with phytosanitary certificates provided.'
  }
];

export const INITIAL_PORT_CALLS: PortCallSchedule[] = [
  {
    id: 'call-1',
    vesselName: 'PortX Explorer IV',
    portName: 'Port of Singapore',
    portCode: 'SGSIN',
    eta: 'Nov 05, 14:00',
    etd: 'Nov 07, 02:00',
    berth: 'TP-08',
    serviceLine: 'Europe-Asia Express Line (EAE-1)',
    status: 'approaching'
  },
  {
    id: 'call-2',
    vesselName: 'PortX Pacific Titan',
    portName: 'Port of Los Angeles',
    portCode: 'USLAX',
    eta: 'Nov 09, 08:30',
    etd: 'Nov 12, 18:00',
    berth: 'Pier 400 - B12',
    serviceLine: 'Transpacific Fast Shuttle (TPX-9)',
    status: 'scheduled'
  },
  {
    id: 'call-3',
    vesselName: 'PortX North Star',
    portName: 'Port of Rotterdam',
    portCode: 'NLRTM',
    eta: 'Nov 03, 06:00',
    etd: 'Nov 04, 22:00',
    berth: 'ECT Delta Quay 3',
    serviceLine: 'North Atlantic Loop (NAL-2)',
    status: 'berthed'
  },
  {
    id: 'call-4',
    vesselName: 'PortX Arabian Gulf Star',
    portName: 'Jebel Ali Port',
    portCode: 'AEDXB',
    eta: 'Nov 01, 09:30',
    etd: 'Nov 03, 11:00',
    berth: 'Terminal 2, Berth 24',
    serviceLine: 'Middle East - Med Express (MEM-4)',
    status: 'berthed'
  }
];
