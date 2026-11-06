import React, { useState, useEffect } from 'react';
import { ShippingProvider, useShipping } from './context/ShippingContext';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { TrackingSection } from './components/public/TrackingSection';
import { ServicesSection } from './components/public/ServicesSection';
import { RateCalculator } from './components/public/RateCalculator';
import { GlobalNetworkMap } from './components/public/GlobalNetworkMap';
import { AboutSection } from './components/public/AboutSection';
import { Footer } from './components/public/Footer';
import { GradlynShowcase } from './components/public/GradlynShowcase';
import { BookingModal } from './components/public/BookingModal';
import { WaybillModal } from './components/public/WaybillModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { TransportMode } from './types';
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  ArrowRight
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    activeView,
    isAdminMode,
    selectedShipmentForPrint,
    setSelectedShipmentForPrint,
    t,
    language
  } = useShipping();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBookingMode, setSelectedBookingMode] = useState<TransportMode>('ocean_fcl');
  const [calculatorPrefill, setCalculatorPrefill] = useState<any | null>(null);

  // Sync document html lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleOpenBooking = (mode: TransportMode = 'ocean_fcl') => {
    setSelectedBookingMode(mode);
    setCalculatorPrefill(null);
    setIsBookingModalOpen(true);
  };

  const handleBookFromCalculator = (quoteData: any) => {
    setSelectedBookingMode(quoteData.mode);
    setCalculatorPrefill(quoteData);
    setIsBookingModalOpen(true);
  };

  // If Admin mode is toggled, render the comprehensive Admin Operations Portal
  if (isAdminMode) {
    return <AdminLayout />;
  }

  // Otherwise, render the Public Logistics Web App in PortX Red & White
  return (
    <div className="min-h-screen bg-white text-[#18181b] flex flex-col selection:bg-red-600 selection:text-white">
      {/* Main Navigation */}
      <Navbar />

      {/* Main Content Area Based on Active Nav */}
      <main className="flex-1">
        {activeView === 'home' && (
          <div>
            <Hero />
            
            {/* Gradlyn Global Showcase (Explore our expertise, Why PortX, Core Service, Reviews Marquee, Map CTA) */}
            <GradlynShowcase onOpenBookingModal={() => handleOpenBooking()} />
          </div>
        )}

        {activeView === 'track' && (
          <TrackingSection />
        )}

        {activeView === 'services' && (
          <div className="py-6 bg-[#f8f5f1] min-h-screen">
            <ServicesSection onOpenBookingModal={handleOpenBooking} />
          </div>
        )}

        {activeView === 'calculator' && (
          <div className="py-6 bg-[#f8f5f1] min-h-screen">
            <RateCalculator onBookRate={handleBookFromCalculator} />
          </div>
        )}

        {activeView === 'network' && (
          <div className="py-6 bg-[#f8f5f1] min-h-screen">
            <GlobalNetworkMap />
          </div>
        )}

        {activeView === 'about' && (
          <div className="py-6 bg-white min-h-screen">
            <AboutSection />
          </div>
        )}

        {activeView === 'contact' && (
          <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-red-100 text-red-700 border border-red-200 text-xs font-bold uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5" />
                {t.contactBadge}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#232331] font-heading tracking-tight">
                {t.contactHeading}
              </h1>
              <p className="mt-2 text-sm text-[#767676]">
                {t.contactSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#232331] text-base">
                  {language === 'es' ? 'Central de Despacho 24/7' : language === 'de' ? '24/7 Leitstand & Disposition' : '24/7 Dispatch Hotline'}
                </h3>
                <p className="text-xs text-[#767676] mt-1">
                  {language === 'es' ? 'Atención directa para cotizaciones inmediatas, fletes marítimos, aéreos e intermodales.' : language === 'de' ? 'Direkte telefonische Frachtberatung, Notfall-Routing und Buchungen.' : 'Direct voice line for urgent freight quotes, dispatching, and vessel bookings.'}
                </p>
                <a href="tel:+34602493512" className="inline-flex items-center gap-1.5 text-sm text-red-600 font-bold mt-4 hover:underline">
                  <Phone className="w-3.5 h-3.5" />
                  +34602493512
                </a>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#232331] text-base">
                  {language === 'es' ? 'Mesa de Operaciones y Manifiestos' : language === 'de' ? 'Fracht-Disposition E-Mail' : 'Cargo Operations Desk'}
                </h3>
                <p className="text-xs text-[#767676] mt-1">
                  {language === 'es' ? 'Envío de manifiestos, consultas de Bill of Lading (B/L) y documentación aduanal.' : language === 'de' ? 'Übermittlung von Frachtdokumenten, B/L Anfragen und Zollabwicklung.' : 'Manifest submissions, Bill of Lading queries, and customs clearing documentation.'}
                </p>
                <a href="mailto:cargo.ops@portx-global.com" className="inline-flex items-center gap-1.5 text-sm text-blue-600 font-bold mt-4 hover:underline">
                  <Mail className="w-3.5 h-3.5" />
                  cargo.ops@portx-global.com
                </a>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#232331] text-base">
                  {language === 'es' ? 'WhatsApp y Soporte Rápido' : language === 'de' ? 'WhatsApp & Express-Support' : 'WhatsApp & Rapid Support'}
                </h3>
                <p className="text-xs text-[#767676] mt-1">
                  {language === 'es' ? 'Canal prioritario para actualizaciones de telemetría y seguimiento de contenedores.' : language === 'de' ? 'Prioritärer Kanal für Echtzeit-Status und Telemetrie-Abfragen.' : 'Priority channel for live satellite telemetry checks and container milestones.'}
                </p>
                <a href="https://wa.me/34602493512" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-bold mt-4 hover:underline">
                  <Phone className="w-3.5 h-3.5" />
                  +34602493512
                </a>
              </div>
            </div>

            {/* Contact Form CTA */}
            <div className="bg-white border-2 border-red-200 rounded-2xl p-8 max-w-3xl mx-auto text-center shadow-md">
              <h2 className="text-xl font-bold text-[#232331]">{t.contactCtaTitle}</h2>
              <p className="text-xs text-[#767676] mt-2 max-w-lg mx-auto">
                {t.contactCtaSubtitle}
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={() => handleOpenBooking()}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.getQuoteBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setCalculatorPrefill(null);
        }}
        initialMode={selectedBookingMode}
        prefillData={calculatorPrefill}
      />

      <WaybillModal
        shipment={selectedShipmentForPrint}
        onClose={() => setSelectedShipmentForPrint(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ShippingProvider>
      <MainAppContent />
    </ShippingProvider>
  );
}
