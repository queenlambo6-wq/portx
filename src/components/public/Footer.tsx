import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import { Heart, Home, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setIsAdminMode, t } = useShipping();
  const [footerLogoError, setFooterLogoError] = useState(false);

  return (
    <footer className="bg-white text-[#232331] border-t border-stone-200 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/90 shadow-2xs shrink-0 p-1">
                {!footerLogoError ? (
                  <img
                    src="/portx-assets/img/logo/favicon.png"
                    alt="PortX Logo Icon"
                    className="w-full h-full object-contain"
                    onError={() => setFooterLogoError(true)}
                  />
                ) : (
                  <Heart className="w-5 h-5 text-orange-600" />
                )}
              </div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xl font-black tracking-tight text-[#232331] font-heading leading-none">
                  PORT<span className="text-orange-600">X</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 leading-none">
                  Pet Logistics
                </span>
              </div>
            </div>
            <p className="text-[#767676] leading-relaxed max-w-sm">
              Servicio especializado de transporte de mascotas y animales de compañía. Vehículos climatizados a 21°C, cuidadores veterinarios certificados y entrega en mano en la misma puerta del receptor en toda España y destinos internacionales.
            </p>

            <div className="space-y-2 text-[#767676] pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-600 shrink-0" />
                <a href="tel:+34602493512" className="hover:text-orange-600 font-semibold transition-colors">
                  Atención y Despacho 24/7: +34602493512
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-600 shrink-0" />
                <a href="mailto:mascotas@portx-global.com" className="hover:text-orange-600 transition-colors">
                  mascotas@portx-global.com
                </a>
              </div>
            </div>
          </div>

          {/* Pet Services */}
          <div>
            <h4 className="text-sm font-bold text-[#232331] font-heading mb-4 uppercase tracking-wider">
              {t.navServices}
            </h4>
            <ul className="space-y-2.5 text-[#767676]">
              <li>
                <button onClick={() => { setActiveView('services'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer text-left">
                  Entrega Local en Puerta (21°C)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('services'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer text-left">
                  Pet Nanny Aéreo en Cabina
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('services'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer text-left">
                  Cachorros y Adopciones
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('services'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer text-left">
                  Reubicación Internacional
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('services'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer text-left">
                  Pasaporte Veterinario y Microchip
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[#232331] font-heading mb-4 uppercase tracking-wider">
              Enlaces Directos
            </h4>
            <ul className="space-y-2.5 text-[#767676]">
              <li>
                <button onClick={() => { setActiveView('track'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  {t.navTrack}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('calculator'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  {t.navCalculator}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('network'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  Bases de Cuidado en España
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('about'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('contact'); setIsAdminMode(false); }} className="hover:text-orange-600 font-medium transition-colors cursor-pointer">
                  {t.navContact}
                </button>
              </li>
            </ul>
          </div>

          {/* Doorstep Commitment Box */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#232331] font-heading uppercase tracking-wider flex items-center gap-1.5">
              <Home className="w-4 h-4 text-orange-600" />
              <span>Entrega en Puerta</span>
            </h4>
            <p className="text-[#767676] leading-relaxed">
              La entrega se efectúa en mano en la misma puerta del receptor con aviso telefónico previo y verificación de microchip.
            </p>
            <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
              <span className="text-[11px] font-bold text-orange-950 block">Teléfono de Reparto</span>
              <a href="tel:+34602493512" className="text-sm font-black text-orange-600 font-mono mt-0.5 block hover:underline">
                +34602493512
              </a>
            </div>
            <button
              onClick={() => setIsAdminMode(true)}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-orange-600 font-semibold transition-colors cursor-pointer pt-1"
            >
              <span>Acceso Administración Operaciones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#767676]">
          <p>© {new Date().getFullYear()} PortX Pet Relocation & Doorstep Cargo. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-semibold text-stone-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Normativa IATA Live Animals (LAR)
            </span>
            <span>·</span>
            <span>Entrega Local Garantizada a Domicilio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
