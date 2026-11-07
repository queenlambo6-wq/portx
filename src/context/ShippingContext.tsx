import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Shipment,
  Milestone,
  PortHub,
  FleetVehicle,
  BookingInquiry,
  PortCallSchedule,
  ShipmentStatus,
  TransportMode,
  AdminUser
} from '../types';
import {
  INITIAL_SHIPMENTS,
  INITIAL_PORTS,
  INITIAL_FLEET,
  INITIAL_INQUIRIES,
  INITIAL_PORT_CALLS
} from '../data/mockData';
import { Language, Translations, TRANSLATIONS } from '../i18n/translations';

const DEFAULT_ACCOUNTS = [
  {
    email: 'admin@portx.com',
    password: 'PortX2026!',
    hint: 'Chief Operations Officer (Full Clearance)',
    user: {
      id: 'usr-1',
      name: 'Henrik Van Dijk',
      email: 'admin@portx.com',
      role: 'Chief Operations Officer',
      clearanceLevel: 'Level 3 - Global Administrator',
      station: 'Central Maritime Operations Desk',
      badgeNumber: 'PX-9041-COO',
    }
  },
  {
    email: 'dispatch@portx.com',
    password: 'Dispatch2026!',
    hint: 'Senior Logistics Dispatcher',
    user: {
      id: 'usr-2',
      name: 'Johan Visser',
      email: 'dispatch@portx.com',
      role: 'Senior Maritime Dispatcher',
      clearanceLevel: 'Level 2 - Dispatch & Milestones',
      station: 'North Sea Operations Desk',
      badgeNumber: 'PX-7720-DSP',
    }
  },
  {
    email: 'customs@portx.com',
    password: 'PortXClear#',
    hint: 'Customs & Compliance Officer',
    user: {
      id: 'usr-3',
      name: 'Elena Rostova',
      email: 'customs@portx.com',
      role: 'Trade Compliance & Customs Inspector',
      clearanceLevel: 'Level 2 - Terminal Audits',
      station: 'Port of Rotterdam Intermodal Yard',
      badgeNumber: 'PX-4412-CST',
    }
  }
];

// Purge legacy storage keys to ensure fresh Spanish cities and pet delivery data
if (typeof window !== 'undefined') {
  try {
    [
      'portx_shipments_v1',
      'portx_shipments_v2',
      'portx_shipments_v3',
      'portx_shipments_v4',
      'portx_pet_v5_shipments',
      'portx_ports_v1',
      'portx_ports_v2',
      'portx_ports_v3'
    ].forEach(k => {
      localStorage.removeItem(k);
    });
  } catch (err) {
    // Ignore storage errors in non-browser environments
  }
}

const STORAGE_KEYS = {
  SHIPMENTS: 'portx_pet_v6_shipments',
  INQUIRIES: 'portx_pet_v6_inquiries',
  FLEET: 'portx_pet_v6_fleet',
  PORTS: 'portx_pet_v6_ports',
  AUTH_USER: 'portx_pet_v6_auth_user',
  ACCOUNTS: 'portx_auth_accounts_v1',
  LANGUAGE: 'portx_language_v1'
};

interface ShippingContextType {
  // Internationalization
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;

  shipments: Shipment[];
  ports: PortHub[];
  fleet: FleetVehicle[];
  inquiries: BookingInquiry[];
  portCalls: PortCallSchedule[];
  currentTrackingQuery: string;
  setCurrentTrackingQuery: (q: string) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  adminSubView: string;
  setAdminSubView: (sub: string) => void;
  
  // Shipment Actions
  getShipmentByTrackingNumber: (trackingNumber: string) => Shipment | undefined;
  fetchShipmentByCode: (code: string) => Promise<Shipment | undefined>;
  isLoadingTracking: boolean;
  createShipment: (newShipment: Omit<Shipment, 'id' | 'createdAt' | 'progressPercent' | 'milestones'>) => Shipment;
  updateShipment: (id: string, updates: Partial<Shipment>) => void;
  updateShipmentStatus: (id: string, newStatus: ShipmentStatus, locationName: string, notes?: string, clientNotice?: string) => void;
  addMilestone: (shipmentId: string, milestone: Omit<Milestone, 'id'>) => void;
  deleteShipment: (id: string) => void;
  
  // Inquiry Actions
  submitInquiry: (inquiryData: Omit<BookingInquiry, 'id' | 'quoteRef' | 'status' | 'createdAt'>) => BookingInquiry;
  updateInquiryStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
  convertInquiryToShipment: (inquiryId: string) => Shipment | null;
  
  // Fleet Actions
  updateFleetStatus: (id: string, status: FleetVehicle['status'], location?: string) => void;
  
  // Authentication & Clearance
  isAuthenticated: boolean;
  currentAdminUser: AdminUser | null;
  authError: string | null;
  loginAdmin: (email: string, password: string, rememberMe?: boolean) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (newPassword: string) => boolean;
  authorizedUsersList: { email: string; name: string; role: string; hint: string }[];
  
  // Utility
  resetToSampleData: () => void;
  searchFilter: string;
  setSearchFilter: (term: string) => void;
  selectedShipmentForDetail: Shipment | null;
  setSelectedShipmentForDetail: (s: Shipment | null) => void;
  selectedShipmentForPrint: Shipment | null;
  setSelectedShipmentForPrint: (s: Shipment | null) => void;
}

const ShippingContext = createContext<ShippingContextType | undefined>(undefined);

export const ShippingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Accounts & Authentication State
  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      return saved ? JSON.parse(saved) : DEFAULT_ACCOUNTS;
    } catch {
      return DEFAULT_ACCOUNTS;
    }
  });

  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoadingTracking, setIsLoadingTracking] = useState(false);

  const [shipments, setShipments] = useState<Shipment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SHIPMENTS);
      let list: Shipment[] = saved ? JSON.parse(saved) : [...INITIAL_SHIPMENTS];

      // Fix or ensure the user's Douala -> Mankon shipment VY61242379-100 is always accurate
      const vy6124Index = list.findIndex(
        (s) => s && s.trackingNumber && s.trackingNumber.trim().toUpperCase() === 'VY61242379-100'
      );
      const seedDouala = INITIAL_SHIPMENTS.find((s) => s.trackingNumber === 'VY61242379-100') || INITIAL_SHIPMENTS[0];
      if (vy6124Index === -1) {
        list.unshift(seedDouala);
      } else if (list[vy6124Index].origin?.city?.toLowerCase() === 'cantabria') {
        // Replace corrupted Cantabria copy from older browser test with real Douala data
        list[vy6124Index] = seedDouala;
      }

      // Ensure primary demo shipments exist
      if (!list.some((s) => s && s.trackingNumber && s.trackingNumber.toUpperCase() === 'VY15514662000')) {
        const vy1551 = INITIAL_SHIPMENTS.find((s) => s.trackingNumber === 'VY15514662000');
        if (vy1551) list.push(vy1551);
      }
      if (!list.some((s) => s && s.trackingNumber && s.trackingNumber.toUpperCase() === 'VY22261591')) {
        const vy22 = INITIAL_SHIPMENTS.find((s) => s.trackingNumber === 'VY22261591');
        if (vy22) list.push(vy22);
      }
      return list;
    } catch {
      return INITIAL_SHIPMENTS;
    }
  });

  const [inquiries, setInquiries] = useState<BookingInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [fleet, setFleet] = useState<FleetVehicle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FLEET);
      return saved ? JSON.parse(saved) : INITIAL_FLEET;
    } catch {
      return INITIAL_FLEET;
    }
  });

  // Language & Internationalization (Default: Spanish 'es')
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
      if (saved === 'es' || saved === 'en' || saved === 'de') return saved;
      return 'es';
    } catch {
      return 'es';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch (e) {
      console.warn('Failed to save language:', e);
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.es;

  const [ports] = useState<PortHub[]>(INITIAL_PORTS);
  const [portCalls] = useState<PortCallSchedule[]>(INITIAL_PORT_CALLS);

  // Parse URL on initial boot for guest tracking links (e.g. /tracking/VY22261591 or ?tracking=VY22261591)
  const getInitialUrlState = () => {
    if (typeof window === 'undefined') return { query: '', view: 'home' };
    try {
      const path = window.location.pathname || '';
      const pathMatch = path.match(/\/(?:tracking|track)\/([a-zA-Z0-9_-]+)/i);
      if (pathMatch && pathMatch[1]) {
        return { query: pathMatch[1], view: 'track' };
      }
      if (path === '/tracking' || path === '/track') {
        return { query: '', view: 'track' };
      }
      const searchParams = new URLSearchParams(window.location.search);
      const qCode = searchParams.get('tracking') || searchParams.get('code') || searchParams.get('t');
      if (qCode) {
        return { query: qCode, view: 'track' };
      }
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && hash !== 'track' && hash !== 'home') {
        const hashMatch = hash.match(/(?:tracking\/)?([a-zA-Z0-9_-]+)/i);
        if (hashMatch && hashMatch[1]) {
          return { query: hashMatch[1], view: 'track' };
        }
      }
    } catch {
      // Fallback
    }
    return { query: '', view: 'home' };
  };

  const initialUrlState = getInitialUrlState();
  const [currentTrackingQuery, setCurrentTrackingQueryState] = useState<string>(initialUrlState.query);
  const [activeView, setActiveViewState] = useState<string>(initialUrlState.view);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [adminSubView, setAdminSubView] = useState<string>('dashboard');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedShipmentForDetail, setSelectedShipmentForDetail] = useState<Shipment | null>(null);
  const [selectedShipmentForPrint, setSelectedShipmentForPrint] = useState<Shipment | null>(null);

  const setCurrentTrackingQuery = (q: string) => {
    setCurrentTrackingQueryState(q);
    if (typeof window !== 'undefined') {
      try {
        if (q.trim()) {
          window.history.replaceState(null, '', `?tracking=${encodeURIComponent(q.trim())}`);
        } else if (activeView === 'track') {
          window.history.replaceState(null, '', '?tracking=');
        }
      } catch {
        // Safe fallback
      }
    }
  };

  const setActiveView = (view: string) => {
    setActiveViewState(view);
    if (view === 'track' && !currentTrackingQuery) {
      // If navigating to track without query, default to empty or keep current
    } else if (view === 'home' && typeof window !== 'undefined') {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch {
        // Safe fallback
      }
    }
  };

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SHIPMENTS, JSON.stringify(shipments));
    } catch (e) {
      console.warn('Failed to save shipments to storage:', e);
    }
  }, [shipments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Failed to save inquiries to storage:', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FLEET, JSON.stringify(fleet));
    } catch (e) {
      console.warn('Failed to save fleet to storage:', e);
    }
  }, [fleet]);

  // Fetch central server database and listen on BroadcastChannel for multi-browser & multi-tab sync
  useEffect(() => {
    let isMounted = true;

    const fetchServerShipments = async () => {
      try {
        const res = await fetch('/api/shipments');
        if (res.ok) {
          const serverList: Shipment[] = await res.json();
          if (Array.isArray(serverList) && serverList.length > 0 && isMounted) {
            setShipments((prev) => {
              const map = new Map<string, Shipment>();
              // Put INITIAL_SHIPMENTS first
              INITIAL_SHIPMENTS.forEach(s => map.set(s.trackingNumber.toUpperCase(), s));
              // Put previous local records
              prev.forEach(s => {
                // Discard stale Cantabria version of VY61242379-100
                if (s.trackingNumber?.toUpperCase() === 'VY61242379-100' && s.origin?.city?.toLowerCase() === 'cantabria') {
                  return;
                }
                map.set(s.trackingNumber.toUpperCase(), s);
              });
              // Put server records (server is authoritative)
              serverList.forEach((s: Shipment) => {
                if (s.trackingNumber?.toUpperCase() === 'VY61242379-100' && s.origin?.city?.toLowerCase() === 'cantabria') {
                  return;
                }
                map.set(s.trackingNumber.toUpperCase(), s);
              });
              return Array.from(map.values());
            });
          }
        }
      } catch {
        // Fallback to local
      }
    };

    fetchServerShipments();

    // BroadcastChannel for cross-tab sync in same browser
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        channel = new BroadcastChannel('portx_shipment_sync');
        channel.onmessage = (msg) => {
          if (msg.data?.type === 'SHIPMENTS_UPDATED' && Array.isArray(msg.data.shipments)) {
            setShipments(msg.data.shipments);
          }
        };
      }
    } catch {
      // Safe fallback
    }

    return () => {
      isMounted = false;
      channel?.close();
    };
  }, []);

  const fetchShipmentByCode = async (code: string): Promise<Shipment | undefined> => {
    if (!code) return undefined;
    const clean = code.trim().toUpperCase();
    setIsLoadingTracking(true);
    try {
      const res = await fetch(`/api/shipments/${encodeURIComponent(clean)}`);
      if (res.ok) {
        const remoteShipment: Shipment = await res.json();
        if (remoteShipment && remoteShipment.trackingNumber) {
          setShipments((prev) => {
            const exists = prev.some(s => s.trackingNumber.toUpperCase() === remoteShipment.trackingNumber.toUpperCase());
            const next = exists
              ? prev.map(s => s.trackingNumber.toUpperCase() === remoteShipment.trackingNumber.toUpperCase() ? remoteShipment : s)
              : [remoteShipment, ...prev];
            return next;
          });
          setIsLoadingTracking(false);
          return remoteShipment;
        }
      }
    } catch {
      // Offline fallback
    } finally {
      setIsLoadingTracking(false);
    }
    return undefined;
  };

  const getShipmentByTrackingNumber = (trackingNumber: string) => {
    if (!trackingNumber) return undefined;
    const clean = trackingNumber.trim().toUpperCase();
    const normalized = clean.replace(/[^A-Z0-9]/g, '');

    const found = shipments.find((s) => {
      if (!s) return false;
      const sTn = (s.trackingNumber || '').trim().toUpperCase();
      const sTnNorm = sTn.replace(/[^A-Z0-9]/g, '');
      if (sTn === clean || (normalized.length >= 3 && sTnNorm === normalized)) return true;
      if (s.bookingRef && (s.bookingRef.toUpperCase() === clean || s.bookingRef.toUpperCase().replace(/[^A-Z0-9]/g, '') === normalized)) return true;
      if (s.bolNumber && (s.bolNumber.toUpperCase() === clean || s.bolNumber.toUpperCase().replace(/[^A-Z0-9]/g, '') === normalized)) return true;
      if (s.containerNumber && s.containerNumber.toUpperCase().replace(/[^A-Z0-9]/g, '') === normalized) return true;
      if (s.petInfo?.microchipNumber && s.petInfo.microchipNumber.toUpperCase().replace(/[^A-Z0-9]/g, '') === normalized) return true;
      if (s.petInfo?.healthPassportNumber && s.petInfo.healthPassportNumber.toUpperCase().replace(/[^A-Z0-9]/g, '') === normalized) return true;
      if (s.petInfo?.petName && s.petInfo.petName.trim().toUpperCase() === clean) return true;
      if (s.id && s.id.toUpperCase() === clean) return true;
      return false;
    });

    // Return ONLY real tracking info stored in the database
    return found;
  };

  const createShipment = (
    newShipmentData: Omit<Shipment, 'id' | 'createdAt' | 'progressPercent' | 'milestones'>
  ): Shipment => {
    const id = `sh-${Date.now()}`;
    const trackingNumber = newShipmentData.trackingNumber || `PTX-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowStr = new Date().toISOString();

    const isPet = !!(newShipmentData.petInfo?.petName || newShipmentData.cargo?.description?.toLowerCase().includes('mascota') || newShipmentData.cargo?.description?.toLowerCase().includes('pet'));
    const petName = newShipmentData.petInfo?.petName || 'Mascota';
    const breed = newShipmentData.petInfo?.breed || 'Animal de Compañía';
    const originCity = newShipmentData.origin.city || 'Origen';
    const destCity = newShipmentData.destination.city || 'Destino';
    const doorAddr = newShipmentData.doorstepDelivery?.receiverDoorAddress || newShipmentData.consignee?.address || `${destCity}`;
    const courier = newShipmentData.doorstepDelivery?.courierHandlerName || newShipmentData.carrier?.vesselOrFlightName || 'PortX Logistics Courier';

    const t0 = new Date(Date.now() - 8 * 3600 * 1000).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
    const t1 = new Date(Date.now() - 4 * 3600 * 1000).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
    const t2 = new Date(Date.now() - 1 * 3600 * 1000).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
    const tNow = new Date().toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });

    let milestones: Milestone[] = [];

    if (isPet) {
      milestones = [
        {
          id: `m-${Date.now()}-1`,
          timestamp: t0,
          location: `Centro Operativo de ${originCity}`,
          status: 'booked',
          description: `Ingreso de ${petName} (${breed}) e inspección veterinaria de bienestar superada con éxito. Documentación y microchip validados.`,
          isCompleted: true,
          isCurrent: newShipmentData.status === 'booked',
          checkpointType: 'origin_port',
          operator: 'Servicio Veterinario Homologado'
        },
        {
          id: `m-${Date.now()}-2`,
          timestamp: t1,
          location: `Salida de Base Logística ${originCity}`,
          status: 'in_transit',
          description: `Acomodación en furgoneta climatizada a 21.0°C con arnés de seguridad y bebedero térmico. Salida en autovía hacia ${destCity}.`,
          isCompleted: newShipmentData.status !== 'booked',
          isCurrent: newShipmentData.status === 'in_transit',
          checkpointType: 'in_transit_hub',
          operator: courier
        }
      ];

      if (newShipmentData.status === 'in_transit' || newShipmentData.status === 'out_for_delivery' || newShipmentData.status === 'delivered') {
        milestones.push({
          id: `m-${Date.now()}-3`,
          timestamp: t2,
          location: `Área de Descanso en Ruta hacia ${destCity}`,
          status: 'in_transit',
          description: `Paseo higiénico de 20 minutos, hidratación con agua fresca y control de bienestar. ${petName} se encuentra en perfecto estado.`,
          isCompleted: true,
          isCurrent: newShipmentData.status === 'in_transit',
          checkpointType: 'in_transit_hub',
          operator: courier
        });
      }

      if (newShipmentData.status === 'out_for_delivery' || newShipmentData.status === 'delivered') {
        milestones.push({
          id: `m-${Date.now()}-4`,
          timestamp: tNow,
          location: `Reparto Local a Domicilio (${destCity})`,
          status: 'out_for_delivery',
          description: `Furgoneta en ruta hacia la puerta del receptor en ${doorAddr}. Llamada previa de aviso realizada.`,
          isCompleted: true,
          isCurrent: newShipmentData.status === 'out_for_delivery',
          checkpointType: 'destination_port',
          operator: courier
        });
      }

      if (newShipmentData.status === 'delivered') {
        milestones.push({
          id: `m-${Date.now()}-5`,
          timestamp: tNow,
          location: `Entregado en Mano en Puerta`,
          status: 'delivered',
          description: `Entrega formalizada con éxito en mano en la puerta de ${doorAddr}. Firma del destinatario registrada y certificado de bienestar archivado.`,
          isCompleted: true,
          isCurrent: true,
          checkpointType: 'final_delivery',
          operator: courier
        });
      }
    } else {
      // Standard Commercial Cargo / Freight Milestones
      const cargoDesc = newShipmentData.cargo?.description || 'Mercancía General';
      milestones = [
        {
          id: `m-${Date.now()}-1`,
          timestamp: t0,
          location: `Terminal Logística de ${originCity}`,
          status: 'booked',
          description: `Recepción, pesaje y verificación de ${cargoDesc}. Documentación de expedición y aduanas registrada.`,
          isCompleted: true,
          isCurrent: newShipmentData.status === 'booked',
          checkpointType: 'origin_port',
          operator: 'Control de Carga PortX'
        },
        {
          id: `m-${Date.now()}-2`,
          timestamp: t1,
          location: `Salida de Terminal Central ${originCity}`,
          status: 'in_transit',
          description: `Carga estibada y asegurada en vehículo de transporte. Salida en tránsito con destino a ${destCity}.`,
          isCompleted: newShipmentData.status !== 'booked',
          isCurrent: newShipmentData.status === 'in_transit',
          checkpointType: 'departure',
          operator: courier
        }
      ];

      if (newShipmentData.status === 'in_transit' || newShipmentData.status === 'out_for_delivery' || newShipmentData.status === 'delivered') {
        milestones.push({
          id: `m-${Date.now()}-3`,
          timestamp: t2,
          location: `Punto de Control en Tránsito hacia ${destCity}`,
          status: 'in_transit',
          description: `Escaneo de control en ruta completado sin incidencias. Tráfico fluido hacia la terminal de destino.`,
          isCompleted: true,
          isCurrent: newShipmentData.status === 'in_transit',
          checkpointType: 'in_transit_hub',
          operator: courier
        });
      }

      if (newShipmentData.status === 'out_for_delivery' || newShipmentData.status === 'delivered') {
        milestones.push({
          id: `m-${Date.now()}-4`,
          timestamp: tNow,
          location: `Centro de Distribución Local (${destCity})`,
          status: 'out_for_delivery',
          description: `Asignado a reparto de última milla. En camino hacia la dirección: ${doorAddr}.`,
          isCompleted: true,
          isCurrent: newShipmentData.status === 'out_for_delivery',
          checkpointType: 'destination_port',
          operator: courier
        });
      }

      if (newShipmentData.status === 'delivered') {
        milestones.push({
          id: `m-${Date.now()}-5`,
          timestamp: tNow,
          location: `Dirección de Entrega (${destCity})`,
          status: 'delivered',
          description: `Entrega completada satisfactoriamente en ${doorAddr}. Albarán firmado y archivado.`,
          isCompleted: true,
          isCurrent: true,
          checkpointType: 'final_delivery',
          operator: courier
        });
      }
    }

    let progressPercent = 25;
    if (newShipmentData.status === 'in_transit') progressPercent = 65;
    if (newShipmentData.status === 'customs_hold') progressPercent = 75;
    if (newShipmentData.status === 'out_for_delivery') progressPercent = 90;
    if (newShipmentData.status === 'delivered') progressPercent = 100;

    const created: Shipment = {
      ...newShipmentData,
      id,
      trackingNumber,
      createdAt: nowStr,
      progressPercent,
      milestones
    };

    setShipments((prev) => {
      const next = [created, ...prev.filter(s => s.trackingNumber.toUpperCase() !== created.trackingNumber.toUpperCase())];
      try {
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
          const bc = new BroadcastChannel('portx_shipment_sync');
          bc.postMessage({ type: 'SHIPMENTS_UPDATED', shipments: next });
          bc.close();
        }
      } catch {}
      return next;
    });

    // Persist to central server database
    try {
      fetch('/api/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(created)
      }).catch(err => console.warn('[Client] Server sync notice:', err));
    } catch {}

    return created;
  };

  const updateShipment = (id: string, updates: Partial<Shipment>) => {
    setShipments((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, ...updates } : s));
      try {
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
          const bc = new BroadcastChannel('portx_shipment_sync');
          bc.postMessage({ type: 'SHIPMENTS_UPDATED', shipments: next });
          bc.close();
        }
      } catch {}
      return next;
    });

    // Persist updates to central server database
    try {
      fetch(`/api/shipments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      }).catch(err => console.warn('[Client] Server update notice:', err));
    } catch {}
  };

  const updateShipmentStatus = (
    id: string,
    newStatus: ShipmentStatus,
    locationName: string,
    notes?: string,
    clientNotice?: string
  ) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;

        const statusLabels: Record<ShipmentStatus, string> = {
          booked: 'Shipment Booked / Registered',
          in_transit: 'In Transit',
          customs_hold: 'Customs Examination Hold',
          out_for_delivery: 'Out for Final Delivery',
          delivered: 'Delivered - Confirmed',
          exception: 'Exception Flagged / Delayed'
        };

        const progressMap: Record<ShipmentStatus, number> = {
          booked: 15,
          in_transit: 55,
          customs_hold: 70,
          out_for_delivery: 90,
          delivered: 100,
          exception: s.progressPercent
        };

        // Mark previous milestones as completed, append new current milestone
        const updatedMilestones = s.milestones.map((m) => ({
          ...m,
          isCurrent: false,
          isCompleted: true
        }));

        const newMilestone: Milestone = {
          id: `m-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          location: locationName,
          status: newStatus,
          description: notes || `Shipment status updated to ${statusLabels[newStatus]} at ${locationName}.`,
          isCompleted: true,
          isCurrent: true,
          operator: 'PortX Operations Console'
        };

        return {
          ...s,
          status: newStatus,
          statusLabel: statusLabels[newStatus],
          progressPercent: progressMap[newStatus],
          clientNotice: clientNotice !== undefined ? clientNotice : s.clientNotice,
          currentLocation: {
            ...s.currentLocation,
            name: locationName,
            updatedAt: 'Just now'
          },
          milestones: [...updatedMilestones, newMilestone],
          actualArrival: newStatus === 'delivered' ? new Date().toISOString() : s.actualArrival
        };
      })
    );
  };

  const addMilestone = (shipmentId: string, milestoneData: Omit<Milestone, 'id'>) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id !== shipmentId) return s;

        const updatedExisting = s.milestones.map((m) => ({
          ...m,
          isCurrent: false
        }));

        const newM: Milestone = {
          ...milestoneData,
          id: `m-${Date.now()}`
        };

        return {
          ...s,
          status: milestoneData.status || s.status,
          currentLocation: {
            ...s.currentLocation,
            name: milestoneData.location,
            updatedAt: 'Just now'
          },
          milestones: [...updatedExisting, newM]
        };
      })
    );
  };

  const deleteShipment = (id: string) => {
    setShipments((prev) => {
      const next = prev.filter((s) => s.id !== id);
      try {
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
          const bc = new BroadcastChannel('portx_shipment_sync');
          bc.postMessage({ type: 'SHIPMENTS_UPDATED', shipments: next });
          bc.close();
        }
      } catch {}
      return next;
    });

    try {
      fetch(`/api/shipments/${id}`, {
        method: 'DELETE'
      }).catch(err => console.warn('[Client] Server delete notice:', err));
    } catch {}
  };

  const submitInquiry = (
    inquiryData: Omit<BookingInquiry, 'id' | 'quoteRef' | 'status' | 'createdAt'>
  ): BookingInquiry => {
    const id = `inq-${Date.now()}`;
    const quoteRef = `QUO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: BookingInquiry = {
      ...inquiryData,
      id,
      quoteRef,
      status: 'pending',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateInquiryStatus = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const convertInquiryToShipment = (inquiryId: string): Shipment | null => {
    const inq = inquiries.find((i) => i.id === inquiryId);
    if (!inq) return null;

    const newShipment = createShipment({
      trackingNumber: `PTX-${Math.floor(100000 + Math.random() * 900000)}`,
      bookingRef: inq.quoteRef,
      bolNumber: `BL-GEN-${Math.floor(10000 + Math.random() * 90000)}`,
      mode: inq.mode,
      status: 'booked',
      statusLabel: 'Booked / Pre-Carriage Scheduled',
      sender: {
        name: inq.fullName,
        company: inq.companyName || 'Commercial Shipper',
        address: '',
        city: inq.origin.split(' ')[0] || 'Origin City',
        country: 'Origin',
        phone: inq.phone || '+34602493512',
        email: inq.email
      },
      consignee: {
        name: `${inq.companyName} Receiving Officer`,
        company: inq.companyName,
        address: '',
        city: inq.destination.split(' ')[0] || 'Destination City',
        country: 'Destination',
        phone: inq.phone || '+34602493512',
        email: inq.email
      },
      origin: {
        portName: inq.origin,
        portCode: 'ORIGIN',
        city: inq.origin,
        country: 'International',
        lat: 51.9054,
        lng: 4.4666
      },
      destination: {
        portName: inq.destination,
        portCode: 'DEST',
        city: inq.destination,
        country: 'International',
        lat: 1.2644,
        lng: 103.8229
      },
      currentLocation: {
        name: `Origin Cargo Terminal: ${inq.origin}`,
        lat: 51.9054,
        lng: 4.4666,
        updatedAt: 'Just now'
      },
      carrier: {
        name: 'PortX Logistics Fleet',
        vesselOrFlightName: 'PortX Express Carrier',
        voyageOrFlightNumber: `PX-${Math.floor(100 + Math.random() * 900)}`
      },
      containerNumber: `PXLU-${Math.floor(100000 + Math.random() * 900000)}-4`,
      sealNumber: `SEAL-${Math.floor(10000 + Math.random() * 90000)}`,
      cargo: {
        description: inq.containerOrPackageType || 'General Freight Consignment',
        pieces: 100,
        weightKg: inq.weightKg,
        volumeCbm: inq.volumeCbm
      },
      departedAt: new Date().toISOString(),
      estimatedArrival: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      customsCleared: false,
      notes: inq.specialInstructions || 'Converted from Customer Online Booking Inquiry.'
    });

    setInquiries((prev) =>
      prev.map((i) =>
        i.id === inquiryId
          ? { ...i, status: 'converted', assignedShipmentId: newShipment.id }
          : i
      )
    );

    return newShipment;
  };

  const updateFleetStatus = (
    id: string,
    status: FleetVehicle['status'],
    location?: string
  ) => {
    setFleet((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              status,
              currentLocation: location || v.currentLocation
            }
          : v
      )
    );
  };

  // Authentication Actions
  const loginAdmin = (email: string, password: string, rememberMe = true): boolean => {
    setAuthError(null);
    const trimmedEmail = email.trim().toLowerCase();
    const account = accounts.find((a: any) => a.email.toLowerCase() === trimmedEmail);

    if (!account) {
      setAuthError('Access Denied: Email is not in the approved personnel roster.');
      return false;
    }

    if (account.password !== password) {
      setAuthError('Access Denied: Invalid security password.');
      return false;
    }

    const updatedUser: AdminUser = {
      ...account.user,
      lastLogin: new Date().toLocaleString()
    };

    setCurrentAdminUser(updatedUser);
    setAuthError(null);

    if (rememberMe) {
      try {
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(updatedUser));
      } catch (e) {
        console.warn('Failed to save auth session:', e);
      }
    }

    return true;
  };

  const logoutAdmin = () => {
    setCurrentAdminUser(null);
    setAuthError(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    } catch (e) {
      console.warn('Failed to clear auth session:', e);
    }
  };

  const changeAdminPassword = (newPassword: string): boolean => {
    if (!currentAdminUser || !newPassword || newPassword.length < 6) return false;

    setAccounts((prev: any) => {
      const updated = prev.map((acc: any) =>
        acc.email.toLowerCase() === currentAdminUser.email.toLowerCase()
          ? { ...acc, password: newPassword }
          : acc
      );
      try {
        localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save updated accounts:', e);
      }
      return updated;
    });

    return true;
  };

  const authorizedUsersList = accounts.map((acc: any) => ({
    email: acc.email,
    name: acc.user.name,
    role: acc.user.role,
    hint: acc.hint
  }));

  const resetToSampleData = () => {
    setShipments(INITIAL_SHIPMENTS);
    setInquiries(INITIAL_INQUIRIES);
    setFleet(INITIAL_FLEET);
    setAccounts(DEFAULT_ACCOUNTS);
    localStorage.removeItem(STORAGE_KEYS.SHIPMENTS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.FLEET);
    localStorage.removeItem(STORAGE_KEYS.ACCOUNTS);
  };

  return (
    <ShippingContext.Provider
      value={{
        language,
        setLanguage,
        t,
        shipments,
        ports,
        fleet,
        inquiries,
        portCalls,
        currentTrackingQuery,
        setCurrentTrackingQuery,
        activeView,
        setActiveView,
        isAdminMode,
        setIsAdminMode,
        adminSubView,
        setAdminSubView,
        getShipmentByTrackingNumber,
        fetchShipmentByCode,
        isLoadingTracking,
        createShipment,
        updateShipment,
        updateShipmentStatus,
        addMilestone,
        deleteShipment,
        submitInquiry,
        updateInquiryStatus,
        convertInquiryToShipment,
        updateFleetStatus,
        isAuthenticated: !!currentAdminUser,
        currentAdminUser,
        authError,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        authorizedUsersList,
        resetToSampleData,
        searchFilter,
        setSearchFilter,
        selectedShipmentForDetail,
        setSelectedShipmentForDetail,
        selectedShipmentForPrint,
        setSelectedShipmentForPrint
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};

export const useShipping = () => {
  const context = useContext(ShippingContext);
  if (!context) {
    throw new Error('useShipping must be used within a ShippingProvider');
  }
  return context;
};
