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
    ['portx_shipments_v1', 'portx_shipments_v2', 'portx_shipments_v3', 'portx_shipments_v4', 'portx_ports_v1', 'portx_ports_v2', 'portx_ports_v3'].forEach(k => {
      localStorage.removeItem(k);
    });
  } catch (err) {
    // Ignore storage errors in non-browser environments
  }
}

const STORAGE_KEYS = {
  SHIPMENTS: 'portx_pet_v5_shipments',
  INQUIRIES: 'portx_pet_v5_inquiries',
  FLEET: 'portx_pet_v5_fleet',
  PORTS: 'portx_pet_v5_ports',
  AUTH_USER: 'portx_pet_v5_auth_user',
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
  createShipment: (newShipment: Omit<Shipment, 'id' | 'createdAt' | 'progressPercent' | 'milestones'>) => Shipment;
  updateShipment: (id: string, updates: Partial<Shipment>) => void;
  updateShipmentStatus: (id: string, newStatus: ShipmentStatus, locationName: string, notes?: string) => void;
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

  const [shipments, setShipments] = useState<Shipment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SHIPMENTS);
      return saved ? JSON.parse(saved) : INITIAL_SHIPMENTS;
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

  const [currentTrackingQuery, setCurrentTrackingQuery] = useState<string>('PET-MAD-8492');
  const [activeView, setActiveView] = useState<string>('home'); // 'home' | 'track' | 'services' | 'calculator' | 'network' | 'about' | 'contact'
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [adminSubView, setAdminSubView] = useState<string>('dashboard'); // 'dashboard' | 'shipments' | 'milestones' | 'fleet' | 'inquiries' | 'ports' | 'manifests'
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedShipmentForDetail, setSelectedShipmentForDetail] = useState<Shipment | null>(null);
  const [selectedShipmentForPrint, setSelectedShipmentForPrint] = useState<Shipment | null>(null);

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

  const getShipmentByTrackingNumber = (trackingNumber: string) => {
    const clean = trackingNumber.trim().toUpperCase();
    return shipments.find(
      (s) =>
        s.trackingNumber.toUpperCase() === clean ||
        s.bookingRef.toUpperCase() === clean ||
        s.bolNumber.toUpperCase() === clean ||
        s.containerNumber.toUpperCase().replace(/\s|-/g, '') === clean.replace(/\s|-/g, '')
    );
  };

  const createShipment = (
    newShipmentData: Omit<Shipment, 'id' | 'createdAt' | 'progressPercent' | 'milestones'>
  ): Shipment => {
    const id = `sh-${Date.now()}`;
    const trackingNumber = newShipmentData.trackingNumber || `PTX-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowStr = new Date().toISOString();

    const initialMilestone: Milestone = {
      id: `m-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      location: `${newShipmentData.origin.portName}`,
      status: newShipmentData.status,
      description: `Shipment booked and initial shipping manifest created for container ${newShipmentData.containerNumber}.`,
      isCompleted: true,
      isCurrent: true,
      checkpointType: 'origin_port',
      operator: 'PortX Central Dispatch'
    };

    const created: Shipment = {
      ...newShipmentData,
      id,
      trackingNumber,
      createdAt: nowStr,
      progressPercent: newShipmentData.status === 'delivered' ? 100 : 15,
      milestones: [initialMilestone]
    };

    setShipments((prev) => [created, ...prev]);
    return created;
  };

  const updateShipment = (id: string, updates: Partial<Shipment>) => {
    setShipments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const updateShipmentStatus = (
    id: string,
    newStatus: ShipmentStatus,
    locationName: string,
    notes?: string
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
    setShipments((prev) => prev.filter((s) => s.id !== id));
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
