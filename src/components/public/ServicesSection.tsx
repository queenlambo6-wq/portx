import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Truck,
  Plane,
  Heart,
  Home,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Maximize2,
  Award
} from 'lucide-react';
import { TransportMode } from '../../types';

interface ServiceDetail {
  id: TransportMode | 'customs_brokerage';
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  specs: { label: string; value: string }[];
  equipment: string[];
  keyFeatures: string[];
}

export const ServicesSection: React.FC<{ onOpenBookingModal: (mode: TransportMode) => void }> = ({ onOpenBookingModal }) => {
  const { t, language } = useShipping();
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const getLocalizedServices = (): ServiceDetail[] => {
    if (language === 'de') {
      return [
        {
          id: 'road_transport',
          title: 'Lokale Haustürzustellung (Klimatisiert 21°C)',
          tagline: 'Persönliche Übergabe direkt an der Wohnungstür des Empfängers in ganz Spanien',
          description: 'Spezialausgebaute Transporter mit Mehrzonen-Klimatisierung, Anti-Stress-Atmosphäre und ausgebildeten Tierbetreuern, die Ihr Haustier persönlich bis an die Tür bringen.',
          icon: <Home className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Zustellart', value: 'Direkt an die Haustür (Doorstep)' },
            { label: 'Temperatur', value: 'Konstant 21°C geregelt' },
            { label: 'Pausenintervall', value: 'Alle 2-3 Stunden Gassi & Wasser' },
            { label: 'Betreuung', value: 'Zertifizierter Tierpfleger an Bord' }
          ],
          equipment: ['IATA Sky Kennel Boxen', 'Beruhigende Pheromon-Zerstäuber', 'Trinkspender mit Frischwasser', 'Antirutsch-Bettung'],
          keyFeatures: [
            'Telefonische Vorankündigung 15 Minuten vor Ankunft an der Haustür',
            'Mikrochip-Überprüfung mit Scanner bei persönlicher Übergabe',
            'Fotobeweis und digitale Empfangsunterschrift an der Tür',
            'Live-GPS und Temperaturüberwachung für Besitzer'
          ]
        },
        {
          id: 'air_freight',
          title: 'Pet Nanny Flugbegleitung & Hauszustellung',
          tagline: 'Persönliche Begleitung in der Passagierkabine mit anschließender Haustürlieferung',
          description: 'Für Langstrecken reist unser Tiersitter gemeinsam mit Ihrem Haustier in der Flugzeugkabine und bringt es nach der Landung im privaten Transporter direkt an Ihre Tür.',
          icon: <Plane className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Reiseklasse', value: 'In der Passagierkabine (In-Cabin)' },
            { label: 'Dauer', value: 'Schnellste Verbindung am selben Tag' },
            { label: 'Betreuungsschlüssel', value: '1:1 Persönliche Begleitung' },
            { label: 'Standard', value: 'IATA LAR Tierschutzkonform' }
          ],
          equipment: ['Atmungsaktive Kabinentaschen', 'Sicherheitsgeschirre', 'Reiseapotheke für Haustiere', 'EU-Heimtierausweis-Hülle'],
          keyFeatures: [
            'Kontinuierliche Begleitung ohne Frachtraum-Stress',
            'Schnelle Sicherheitsabfertigung an VIP-Schaltern',
            'Direkte Anschlussfahrt zur Haustür im Zielgebiet',
            'Regelmäßige Foto- und Video-Updates per WhatsApp'
          ]
        },
        {
          id: 'cold_chain',
          title: 'Transport für Welpen & Züchter',
          tagline: 'Klinisch saubere Betreuung für junge Welpen und Adoptionshunde',
          description: 'Sanfter Transport für Welpen ab der 8. Woche mit tierärztlicher Erstprüfung, Wärmedecken und freudiger Übergabe an die neue Familie an deren Haustür.',
          icon: <Heart className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Zielgruppe', value: 'Welpen, Kätzchen & Zuchttiere' },
            { label: 'Hygiene', value: 'Hospital-Grade Desinfektion' },
            { label: 'Fütterung', value: 'Nach Züchterplan mit Welpenmilch/Starter' },
            { label: 'Übergabe', value: 'Willkommenspaket an der Haustür' }
          ],
          equipment: ['Thermo-Kuscheldecken', 'Welpen-Auslaufgitter für Pausen', 'Desinfizierte Transportboxen', 'Spielzeug mit Muttergeruch'],
          keyFeatures: [
            'Überprüfung aller Impfungen und Entwurmungen vor Abfahrt',
            'Sanfte Fahrweise mit speziellem Federungssystem',
            'Feierliche Übergabe mit Übergabeprotokoll an die Besitzer',
            '24/7 Notfall-Tierarzt-Bereitschaft auf allen Routen'
          ]
        },
        {
          id: 'ocean_fcl',
          title: 'Internationale Haustier-Umsiedlung',
          tagline: 'Weltweite Umzüge mit Haustieren inklusive aller Behördenformalitäten',
          description: 'Komplette Organisation von Titer-Tests, Quarantäne-Vermeidung, Visa-Dokumenten und Haustür-Abholung sowie Anlieferung im neuen Zuhause weltweit.',
          icon: <Award className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Umfang', value: 'Vollständige Relocation Weltweit' },
            { label: 'Bürokratie', value: 'Tollwut-Titer, Amtstierarzt & Zoll' },
            { label: 'Länder', value: 'Spanien, Deutschland, UK, USA & mehr' },
            { label: 'Garantie', value: 'Rechtskonforme Einreise ohne Verzögerung' }
          ],
          equipment: ['IATA Übersee-Transportkennel', 'Doppelte Sicherheitsschlösser', 'Wassernäpfe mit Außenbefüllung', 'Reisedokumenten-Mappe'],
          keyFeatures: [
            'Komplette Vorbereitung aller amtstierärztlichen Zeugnisse',
            'Haus-zu-Haus Betreuung vom alten zum neuen Wohnsitz',
            'Zollabfertigung für lebende Tiere ohne Lagerzeiten',
            'Feste Ansprechpartner für die gesamte Familie'
          ]
        }
      ];
    }

    if (language === 'en') {
      return [
        {
          id: 'road_transport',
          title: 'Doorstep Local Delivery (21°C Climate Van)',
          tagline: 'Personal handover directly to the receiver\'s front door across Spain',
          description: 'Custom-built pet transport vans featuring multi-zone climate control, soothing music, fresh water dispensers, and certified pet handlers delivering straight to the doorstep.',
          icon: <Home className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Delivery Scope', value: 'Direct to Receiver\'s Front Door' },
            { label: 'Temperature', value: 'Constant 21°C Climate Controlled' },
            { label: 'Rest Intervals', value: 'Walk & Hydration every 2-3 hours' },
            { label: 'Care Staff', value: 'Certified Animal Handler Onboard' }
          ],
          equipment: ['IATA Sky Kennels', 'Soothing Pheromone Diffusers', 'Filtered Water Dispensers', 'Anti-slip Absorbent Bedding'],
          keyFeatures: [
            '15-minute advance phone call before arriving at the doorstep',
            'Microchip scanner verification upon personal handover',
            'Photo proof of doorstep delivery and verified digital signature',
            'Live GPS location and welfare temperature updates'
          ]
        },
        {
          id: 'air_freight',
          title: 'In-Cabin Pet Nanny & Doorstep Link',
          tagline: 'Accompanied passenger cabin travel with final doorstep delivery',
          description: 'For long distances or international flights, a dedicated pet nanny flies with your pet in the passenger cabin and transports them in a private van straight to the receiver\'s door.',
          icon: <Plane className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Travel Mode', value: 'In-Cabin Passenger Accompanied' },
            { label: 'Transit Time', value: 'Fastest Same-Day Connections' },
            { label: 'Attention', value: '1:1 Dedicated Attendant Care' },
            { label: 'Regulation', value: 'IATA LAR Welfare Compliant' }
          ],
          equipment: ['Soft-Sided Airline Carriers', 'Padded Safety Harnesses', 'Pet First Aid Kit', 'EU Passport Document Wallet'],
          keyFeatures: [
            'Zero cargo hold stress; pet stays next to attendant in cabin',
            'Expedited airport clearance via VIP passenger channels',
            'Direct private vehicle transfer to the recipient\'s door',
            'Real-time WhatsApp photos, videos, and comfort updates'
          ]
        },
        {
          id: 'cold_chain',
          title: 'Puppy & Adoption Doorstep Transport',
          tagline: 'Hygienic and gentle relocation for newly adopted puppies and kittens',
          description: 'Specialized neonatal care transport for puppies from certified breeders and shelters. Complete with pre-trip veterinary check and an exciting handover right at their new home.',
          icon: <Heart className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Age Group', value: 'Puppies (8+ weeks) & Kittens' },
            { label: 'Sanitation', value: 'Hospital-Grade Van Disinfection' },
            { label: 'Feeding', value: 'Follows Breeder Feeding Schedule' },
            { label: 'Handover', value: 'Welcome Kit & Unboxing at Doorstep' }
          ],
          equipment: ['Thermal Comfort Fleece', 'Portable Exercise Playpen', 'Sanitized Travel Pods', 'Litter Scent Blanket'],
          keyFeatures: [
            'Thorough verification of vaccinations, deworming, and microchip',
            'Extra-soft air suspension vans for gentle movement',
            'Celebratory handover with health booklet and signature at door',
            '24/7 on-call veterinary support along all transit corridors'
          ]
        },
        {
          id: 'ocean_fcl',
          title: 'International Pet Relocation',
          tagline: 'Worldwide pet moves including all governmental paperwork and door delivery',
          description: 'End-to-end relocation handling: rabies antibody titers, import permits, EU health passports, customs clearance, and direct doorstep delivery to your new home abroad.',
          icon: <Award className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Coverage', value: 'Global Cross-Border Pet Moves' },
            { label: 'Documentation', value: 'Titer Tests, Rabies, Health Certs' },
            { label: 'Countries', value: 'Spain, UK, USA, Germany & Worldwide' },
            { label: 'Guarantee', value: 'Zero Quarantine Delay Entry' }
          ],
          equipment: ['IATA Wooden & Rigid Travel Kennels', 'Dual Spring Latches', 'Exterior Fill Water Bowls', 'Custom Pet Cargo Passports'],
          keyFeatures: [
            'Government veterinary approval and consular paperwork handled',
            'Door-to-door escort from departure home to arrival doorstep',
            'Fast-track customs clearance with no warehouse waiting',
            'Single dedicated pet coordinator for your family'
          ]
        }
      ];
    }

    // Default: Spanish ('es')
    return [
      {
        id: 'road_transport',
        title: 'Entrega Local en Puerta (Furgoneta Climatizada 21°C)',
        tagline: 'Entrega en mano en la misma puerta del receptor en cualquier ciudad de España',
        description: 'Furgonetas adaptadas con climatización independiente a 21°C, suspensión suave, bebederos automáticos antigoteo y cuidadores certificados que suben directamente a la puerta de tu domicilio.',
        icon: <Home className="w-6 h-6 text-orange-600" />,
        specs: [
          { label: 'Modalidad de Entrega', value: 'Directo en la Puerta del Destinatario' },
          { label: 'Temperatura en Cabina', value: '21°C Constante y Monitorizada' },
          { label: 'Paradas de Paseo', value: 'Cada 2 a 3 horas con hidratación' },
          { label: 'Personal a Bordo', value: 'Cuidador Canino / Felino Titulado' }
        ],
        equipment: ['Transportines IATA Sky Kennel', 'Difusores de Feromonas Calmantes', 'Bebederos Antigoteo', 'Alfombrillas Térmicas Absorbentes'],
        keyFeatures: [
          'Aviso telefónico al destinatario 15 minutos antes de llegar al portal',
          'Comprobación del microchip con escáner oficial en el momento de la entrega',
          'Firma digital en tablet y comprobante de entrega feliz en puerta',
          'GPS en vivo y reporte de temperatura accesible para remitente y receptor'
        ]
      },
      {
        id: 'air_freight',
        title: 'Pet Nanny Aéreo Acompañado & Enlace a Domicilio',
        tagline: 'Un especialista viaja junto a tu mascota en cabina y la entrega en su puerta',
        description: 'Para distancias largas o conexiones internacionales. Nuestro especialista viaja con la mascota como pasajero acompañante en cabina, y al aterrizar la traslada en furgoneta privada hasta la puerta del receptor.',
        icon: <Plane className="w-6 h-6 text-orange-600" />,
        specs: [
          { label: 'Acomodación', value: 'En Cabina de Pasajeros (In-Cabin)' },
          { label: 'Tiempo de Viaje', value: 'Conexión más rápida en el mismo día' },
          { label: 'Ratio de Cuidado', value: '1:1 Atención Exclusiva Individual' },
          { label: 'Certificación', value: 'Homologación IATA Live Animals (LAR)' }
        ],
        equipment: ['Bolsos de Viaje Homologados para Cabina', 'Arneses Ergonómicos Acolchados', 'Kit de Primeros Auxilios Veterinarios', 'Funda Portadocumentos UE'],
        keyFeatures: [
          'Cero estrés: la mascota viaja a los pies del cuidador con caricias continuas',
          'Paso prioritario por filtros de seguridad y controles de aeropuerto',
          'Traslado final inmediato en furgoneta climatizada hasta el domicilio',
          'Fotos y vídeos en tiempo real por WhatsApp durante todo el trayecto'
        ]
      },
      {
        id: 'cold_chain',
        title: 'Traslado Especial de Cachorros y Adopciones',
        tagline: 'Transporte delicado y afectuoso para cachorros y animales adoptados',
        description: 'Servicio diseñado para cachorros a partir de las 8 semanas de vida y animales procedentes de protectoras o criadores oficiales. Chequeo médico previo y entrega emocionante en su nuevo hogar.',
        icon: <Heart className="w-6 h-6 text-orange-600" />,
        specs: [
          { label: 'Destinado a', value: 'Cachorros, Gatitos y Adopciones' },
          { label: 'Nivel Higiénico', value: 'Desinfección Hospitalaria Grado Veterinario' },
          { label: 'Alimentación', value: 'Pienso starter pautado por el criador' },
          { label: 'Entrega', value: 'Kit de Bienvenida y entrega festiva en puerta' }
        ],
        equipment: ['Mantas con Olor a Madre y Camada', 'Corrales Plegables para Pausas en Césped', 'Habitáculos Aislados del Frío y Ruido', 'Juguetes Estimulantes'],
        keyFeatures: [
          'Verificación rigurosa de cartilla de vacunas, desparasitación y microchip',
          'Furgonetas con amortiguación suave para evitar mareos en cachorros',
          'Entrega formal con explicación de pautas de adaptación al nuevo dueño',
          'Línea de consulta veterinaria 24 horas incluida tras la entrega'
        ]
      },
      {
        id: 'ocean_fcl',
        title: 'Reubicación Internacional de Mascotas',
        tagline: 'Mudanzas globales con gestión completa de aduanas y entrega en el nuevo hogar',
        description: 'Gestión integral de traslados al extranjero: test de anticuerpos de rabia, pasaporte europeo de animales de compañía, certificados CEXGAN y entrega directa en la puerta de la nueva vivienda.',
        icon: <Award className="w-6 h-6 text-orange-600" />,
        specs: [
          { label: 'Alcance', value: 'Reubicaciones Internacionales Completas' },
          { label: 'Documentación', value: 'Titulación de Rabia, Pasaporte y Trámites CEXGAN' },
          { label: 'Países', value: 'España, Reino Unido, Alemania, EE.UU., etc.' },
          { label: 'Garantía', value: 'Entrada legal sin estancias en cuarentena' }
        ],
        equipment: ['Transportines Rígidos IATA para Vuelos Largos', 'Cierres de Seguridad Reforzados', 'Tolvas de Comida y Agua con Acceso Exterior', 'Maletín Documental'],
        keyFeatures: [
          'Gestión directa con veterinarios oficiales de sanidad animal de aduanas',
          'Servicio integral puerta a puerta: desde la casa de origen a la de destino',
          'Despacho preferencial de animales vivos sin tiempos de espera en almacén',
          'Asesor personal dedicado a la tranquilidad de la familia'
        ]
      }
    ];
  };

  const services = getLocalizedServices();

  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
            <span>{t.servicesBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#232331] font-heading tracking-tight">
            {t.servicesHeading}
          </h2>
          <p className="mt-3 text-base text-[#767676] leading-relaxed">
            {t.servicesSubtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#f8f5f1] border border-stone-200 hover:border-orange-400 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-5 shadow-xs group-hover:scale-105 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-[#232331] font-heading group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-orange-700 mt-1">
                  {service.tagline}
                </p>
                <p className="text-xs text-[#767676] mt-3 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Specs Pills */}
                <div className="mt-4 pt-4 border-t border-stone-200/80 space-y-2">
                  {service.specs.slice(0, 2).map((sp, idx) => (
                    <div key={idx} className="flex justify-between text-[11px]">
                      <span className="text-[#767676] font-medium">{sp.label}:</span>
                      <span className="font-bold text-[#232331] text-right">{sp.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="flex-1 py-2.5 px-3 bg-white hover:bg-stone-100 text-[#232331] text-xs font-bold rounded-xl border border-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>{t.fullSpecsBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenBookingModal(service.id as TransportMode)}
                  className="py-2.5 px-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center cursor-pointer"
                  title="Reservar este traslado"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Service Guarantees Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-orange-50 border border-orange-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-orange-950">Garantía Total de Bienestar y Entrega en Puerta</h4>
              <p className="text-xs text-orange-800 mt-0.5 max-w-xl">
                Todos los traslados incluyen furgoneta climatizada a 21°C, cuidador acreditado, hidratación programada y entrega en mano en la misma puerta del destinatario con aviso telefónico previo.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-orange-900 shrink-0">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              IATA LAR Certificado
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Firma en Puerta
            </span>
          </div>
        </div>

      </div>

      {/* Modal with Full Service Specs */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-stone-200">
            <div className="flex items-start justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  {selectedService.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#232331] font-heading">{selectedService.title}</h3>
                  <p className="text-xs text-orange-600 font-semibold">{selectedService.tagline}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#767676] mt-4 leading-relaxed">
              {selectedService.description}
            </p>

            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                {t.operationalMetrics}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedService.specs.map((sp, idx) => (
                  <div key={idx} className="p-3 bg-[#f8f5f1] rounded-xl border border-stone-200 text-xs">
                    <span className="text-[#767676] block mb-0.5">{sp.label}</span>
                    <strong className="text-[#232331] font-bold">{sp.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                {t.supportedEquipment}
              </h4>
              <ul className="space-y-1.5 text-xs text-[#232331]">
                {selectedService.equipment.map((eq, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                {t.serviceGuarantees}
              </h4>
              <ul className="space-y-1.5 text-xs text-[#767676]">
                {selectedService.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-bold text-[#767676] hover:text-[#232331] cursor-pointer"
              >
                {t.closeBtn}
              </button>
              <button
                type="button"
                onClick={() => {
                  const mode = selectedService.id as TransportMode;
                  setSelectedService(null);
                  onOpenBookingModal(mode);
                }}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                {t.bookModeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
