import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminDashboard } from './AdminDashboard';
import { AdminShipments } from './AdminShipments';
import { AdminMilestones } from './AdminMilestones';
import { AdminFleet } from './AdminFleet';
import { AdminInquiries } from './AdminInquiries';
import { AdminShipmentModal } from './AdminShipmentModal';
import { AdminMilestoneModal } from './AdminMilestoneModal';
import { AdminLoginGate } from './AdminLoginGate';
import { GlobalNetworkMap } from '../public/GlobalNetworkMap';
import { WaybillModal } from '../public/WaybillModal';
import { Shipment } from '../../types';
import {
  ExternalLink,
  Printer,
  ShieldCheck,
  Lock,
  User,
  KeyRound,
  CheckCircle2,
  X
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const {
    adminSubView,
    setAdminSubView,
    setIsAdminMode,
    setActiveView,
    shipments,
    selectedShipmentForPrint,
    setSelectedShipmentForPrint,
    isAuthenticated,
    currentAdminUser,
    logoutAdmin,
    changeAdminPassword,
    language,
    t
  } = useShipping();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [preselectedMilestoneShipmentId, setPreselectedMilestoneShipmentId] = useState<string | undefined>();

  // Change password modal
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // If user is not authenticated with approved credentials, enforce the login gate!
  if (!isAuthenticated) {
    return <AdminLoginGate />;
  }

  const handleOpenMilestoneModal = (shipmentId?: string) => {
    setPreselectedMilestoneShipmentId(shipmentId);
    setIsMilestoneModalOpen(true);
  };

  const handleOpenEditModal = (shipment: Shipment) => {
    setEditingShipment(shipment);
    setIsCreateModalOpen(true);
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword.length < 6) {
      setPasswordError(language === 'es' ? 'La contraseña debe tener al menos 6 caracteres.' : language === 'de' ? 'Das Passwort muss mindestens 6 Zeichen lang sein.' : 'Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(language === 'es' ? 'Las contraseñas no coinciden. Por favor verifique.' : language === 'de' ? 'Passwörter stimmen nicht überein.' : 'Passwords do not match. Please verify.');
      return;
    }

    const success = changeAdminPassword(newPassword);
    if (success) {
      setPasswordSuccess(true);
      setTimeout(() => {
        setPasswordSuccess(false);
        setIsPasswordModalOpen(false);
        setNewPassword('');
        setConfirmPassword('');
      }, 2500);
    } else {
      setPasswordError(language === 'es' ? 'No se pudo actualizar la contraseña.' : 'Failed to update password.');
    }
  };

  const renderSubView = () => {
    switch (adminSubView) {
      case 'dashboard':
        return (
          <AdminDashboard
            onOpenCreateModal={() => {
              setEditingShipment(null);
              setIsCreateModalOpen(true);
            }}
            onOpenMilestoneModal={handleOpenMilestoneModal}
          />
        );
      case 'shipments':
        return (
          <AdminShipments
            onOpenCreateModal={() => {
              setEditingShipment(null);
              setIsCreateModalOpen(true);
            }}
            onOpenEditModal={handleOpenEditModal}
            onOpenMilestoneModal={handleOpenMilestoneModal}
          />
        );
      case 'milestones':
        return <AdminMilestones />;
      case 'fleet':
        return <AdminFleet />;
      case 'inquiries':
        return <AdminInquiries />;
      case 'ports':
        return (
          <div className="p-6">
            <GlobalNetworkMap />
          </div>
        );
      case 'manifests':
        return (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h1 className="text-2xl font-black text-[#232331] font-heading tracking-tight">
                {language === 'es' ? 'Repositorio de Conocimientos de Embarque y Cartas de Porte' : language === 'de' ? 'Konnossemente & Frachtbriefe' : 'Bill of Lading & Waybill Repository'}
              </h1>
              <p className="text-xs text-[#767676] mt-0.5">
                {language === 'es' ? 'Genere, visualice e imprima documentos de transporte verificables conforme a normas FIATA y OMI.' : 'Generate, preview, and print verifiable transport documents with barcoding and FIATA clauses.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shipments.map((s) => (
                <div key={s.id} className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-red-600 uppercase font-bold">
                        {s.bolNumber}
                      </span>
                      <h3 className="font-bold text-[#232331] text-sm font-mono mt-0.5">{s.trackingNumber}</h3>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#f8f5f1] text-[#232331] border border-stone-200">
                      {s.mode.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-xs text-[#767676] space-y-1">
                    <div><strong className="text-[#232331]">{t.shipperLabel}:</strong> {s.sender.company}</div>
                    <div><strong className="text-[#232331]">{t.consigneeLabel}:</strong> {s.consignee.company}</div>
                    <div><strong className="text-[#232331]">{t.routeLabel}</strong> {s.origin.city} → {s.destination.city}</div>
                    <div><strong className="text-[#232331]">{t.containerIdLabel}:</strong> <span className="font-mono text-[#232331] font-semibold">{s.containerNumber}</span></div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
                    <span className="text-[10px] text-emerald-700 font-bold">
                      {s.customsCleared ? 'Customs Released' : 'Border Audit'}
                    </span>
                    <button
                      onClick={() => setSelectedShipmentForPrint(s)}
                      className="px-3.5 py-1.5 bg-red-50 hover:bg-red-600 text-red-700 hover:text-white font-bold text-xs rounded-lg border border-red-200 hover:border-red-600 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{t.printWaybillBtn}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <AdminDashboard
            onOpenCreateModal={() => {
              setEditingShipment(null);
              setIsCreateModalOpen(true);
            }}
            onOpenMilestoneModal={handleOpenMilestoneModal}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f1] text-[#232331] flex">
      {/* Sidebar */}
      <AdminSidebar
        onOpenCreateModal={() => {
          setEditingShipment(null);
          setIsCreateModalOpen(true);
        }}
      />

      {/* Main Admin Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Topbar with authenticated officer information and logout */}
        <header className="h-16 bg-white border-b border-stone-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#232331] uppercase tracking-wider hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.terminalOsBadge}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Officer Profile Badge */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#f8f5f1] rounded-xl border border-stone-200">
              <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                {currentAdminUser?.name.charAt(0) || 'A'}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-[#232331] leading-tight">
                  {currentAdminUser?.name}
                </div>
                <div className="text-[10px] text-red-600 font-semibold leading-tight">
                  {currentAdminUser?.role}
                </div>
              </div>
            </div>

            {/* Change Password Button */}
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 cursor-pointer"
              title={language === 'es' ? 'Cambiar Contraseña de Oficial' : 'Change Security Password'}
            >
              <KeyRound className="w-4 h-4" />
            </button>

            {/* Lock / Logout */}
            <button
              onClick={logoutAdmin}
              className="px-2.5 py-1.5 text-xs text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-lg font-bold border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Lock Terminal & Log Out"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{t.lockTerminalBtn}</span>
            </button>

            <button
              onClick={() => {
                setIsAdminMode(false);
                setActiveView('track');
              }}
              className="text-xs text-[#232331] hover:text-red-700 flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-lg bg-[#f8f5f1] hover:bg-red-50 border border-stone-200 transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">{t.viewTrackingSiteBtn}</span>
              <ExternalLink className="w-3.5 h-3.5 text-red-600" />
            </button>
          </div>
        </header>

        {/* Dynamic Subview Body */}
        <main className="flex-1 pb-16">
          {renderSubView()}
        </main>
      </div>

      {/* Modals */}
      <AdminShipmentModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingShipment(null);
        }}
        shipmentToEdit={editingShipment}
      />

      <AdminMilestoneModal
        isOpen={isMilestoneModalOpen}
        onClose={() => {
          setIsMilestoneModalOpen(false);
          setPreselectedMilestoneShipmentId(undefined);
        }}
        preselectedShipmentId={preselectedMilestoneShipmentId}
      />

      <WaybillModal
        shipment={selectedShipmentForPrint}
        onClose={() => setSelectedShipmentForPrint(null)}
      />

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#232331]/70 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 relative shadow-2xl text-[#232331]">
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute right-4 top-4 text-stone-400 hover:text-[#232331] p-2 rounded-lg bg-[#f8f5f1] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                {language === 'es' ? 'Gestión de Credenciales de Seguridad' : 'Security Credentials Management'}
              </span>
              <h3 className="text-lg font-bold text-[#232331] font-heading mt-0.5">
                {language === 'es' ? 'Actualizar Contraseña de Acceso' : 'Update Terminal Password'}
              </h3>
              <p className="text-xs text-[#767676] mt-1">
                {language === 'es' ? 'Actualizando para ' : 'Updating credentials for '}
                <strong className="text-[#232331]">{currentAdminUser?.email}</strong>
              </p>
            </div>

            {passwordSuccess ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs text-center font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{language === 'es' ? '¡Contraseña actualizada correctamente en el almacén seguro!' : 'Password successfully updated!'}</span>
              </div>
            ) : (
              <form onSubmit={handleChangePasswordSubmit} className="space-y-4 text-xs">
                {passwordError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs font-semibold">
                    {passwordError}
                  </div>
                )}

                <div>
                  <label className="block text-[#232331] font-bold mb-1">{language === 'es' ? 'Nueva Contraseña de Acceso *' : 'New Access Password *'}</label>
                  <input
                    type="password"
                    required
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-red-500 focus:bg-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[#232331] font-bold mb-1">{language === 'es' ? 'Confirmar Nueva Contraseña *' : 'Confirm New Password *'}</label>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#f8f5f1] text-[#232331] p-2.5 rounded-xl border border-stone-300 focus:border-red-500 focus:bg-white focus:outline-none font-mono"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-[#f8f5f1] text-[#232331] text-xs font-bold hover:bg-stone-200 cursor-pointer"
                  >
                    {t.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    {language === 'es' ? 'Guardar Nueva Contraseña' : 'Save New Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
