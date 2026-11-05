import React from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Ship,
  LayoutDashboard,
  Package,
  MapPin,
  Anchor,
  MessageSquare,
  LogOut,
  RotateCcw,
  PlusCircle,
  FileCheck2,
  Globe,
  Lock
} from 'lucide-react';
import { Language } from '../../i18n/translations';

export const AdminSidebar: React.FC<{ onOpenCreateModal: () => void }> = ({ onOpenCreateModal }) => {
  const {
    adminSubView,
    setAdminSubView,
    setIsAdminMode,
    shipments,
    inquiries,
    resetToSampleData,
    language,
    setLanguage,
    t,
    logoutAdmin,
    currentAdminUser
  } = useShipping();

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'pending').length;
  const inTransitCount = shipments.filter((s) => s.status === 'in_transit').length;

  const menuItems = [
    {
      id: 'dashboard',
      label: language === 'es' ? 'Centro de Mando (Cockpit)' : language === 'de' ? 'Leitstand Cockpit' : 'Dispatch Cockpit',
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: null
    },
    {
      id: 'shipments',
      label: language === 'es' ? 'Manifiestos y Envíos' : language === 'de' ? 'Alle Frachtsendungen' : 'All Shipments',
      icon: <Package className="w-4 h-4" />,
      badge: shipments.length
    },
    {
      id: 'milestones',
      label: language === 'es' ? 'Registro de Hitos' : language === 'de' ? 'Meilenstein-Disposition' : 'Milestone Dispatcher',
      icon: <MapPin className="w-4 h-4" />,
      badge: inTransitCount > 0 ? `${inTransitCount} Act.` : null
    },
    {
      id: 'fleet',
      label: language === 'es' ? 'Flota y Buques' : language === 'de' ? 'Flotte & Frachter' : 'Fleet & Vessels',
      icon: <Ship className="w-4 h-4" />,
      badge: null
    },
    {
      id: 'inquiries',
      label: language === 'es' ? 'Solicitudes de Reserva' : language === 'de' ? 'Buchungsanfragen' : 'Booking Inquiries',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: pendingInquiriesCount > 0 ? pendingInquiriesCount : null,
      badgeColor: 'bg-red-600 text-white font-bold'
    },
    {
      id: 'ports',
      label: language === 'es' ? 'Terminales y Atraques' : language === 'de' ? 'Hafen-Terminals' : 'Port Hubs & Berths',
      icon: <Anchor className="w-4 h-4" />,
      badge: null
    },
    {
      id: 'manifests',
      label: language === 'es' ? 'Conocimientos (B/L)' : language === 'de' ? 'Frachtbriefe (B/L)' : 'Waybills & Manifests',
      icon: <FileCheck2 className="w-4 h-4" />,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-stone-200 flex flex-col justify-between shrink-0 min-h-screen text-[#232331] shadow-2xs">
      <div>
        {/* Admin Brand Header */}
        <div className="p-5 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-2xs">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-black text-[#232331] font-heading tracking-tight">
                PORT<span className="text-red-600">X</span> ADMIN
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{t.terminalOsBadge}</span>
              </div>
            </div>
          </div>

          {/* Quick Language Toggle in Sidebar */}
          <div className="mt-3 flex items-center justify-between p-1 bg-[#f8f5f1] rounded-lg border border-stone-200">
            <span className="text-[10px] font-bold text-stone-500 flex items-center gap-1 pl-1">
              <Globe className="w-3 h-3 text-red-600" />
              Lang:
            </span>
            <div className="flex items-center gap-1">
              {(['es', 'en', 'de'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-all ${
                    language === lang
                      ? 'bg-red-600 text-white shadow-2xs'
                      : 'text-stone-600 hover:text-[#232331]'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Create Shipment Button */}
          <button
            onClick={onOpenCreateModal}
            className="w-full mt-3 py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md shadow-red-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.newShipmentBtn}</span>
          </button>
        </div>

        {/* Current Dispatch Desk Info */}
        <div className="px-5 py-2.5 bg-[#f8f5f1] border-b border-stone-200 text-[11px] flex items-center justify-between">
          <span className="text-stone-500 font-medium">{currentAdminUser?.station ? currentAdminUser.station.split('(')[0] : 'Central Hub'}:</span>
          <span className="text-red-700 font-bold font-mono">PX-9041</span>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider px-3 py-1.5 block">
            {language === 'es' ? 'Control de Despacho' : language === 'de' ? 'Disposition & Steuerung' : 'Cargo Dispatch Control'}
          </span>
          {menuItems.map((item) => {
            const isActive = adminSubView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAdminSubView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-50 text-red-700 font-bold border border-red-200'
                    : 'text-stone-600 hover:text-[#232331] hover:bg-[#f8f5f1]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-red-600' : 'text-stone-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== null && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      item.badgeColor || (isActive ? 'bg-red-200 text-red-800 font-bold' : 'bg-stone-100 text-stone-600')
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-stone-200 space-y-2">
        <button
          onClick={logoutAdmin}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-stone-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-stone-200 cursor-pointer"
          title="Lock terminal and sign out officer"
        >
          <Lock className="w-3.5 h-3.5 text-stone-500" />
          <span>{t.lockTerminalBtn}</span>
        </button>

        <button
          onClick={resetToSampleData}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-[11px] text-stone-500 hover:text-[#232331] hover:bg-[#f8f5f1] rounded-lg transition-colors border border-stone-200 cursor-pointer"
          title="Restore sample shipments"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{language === 'es' ? 'Restaurar Datos' : language === 'de' ? 'Musterdaten laden' : 'Reset Sample Shipments'}</span>
        </button>

        <button
          onClick={() => setIsAdminMode(false)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-[#232331] hover:text-white bg-[#f8f5f1] hover:bg-[#232331] rounded-lg border border-stone-300 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-red-600" />
          <span>{t.viewTrackingSiteBtn}</span>
        </button>
      </div>
    </aside>
  );
};
