import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Ship,
  Plane,
  Truck,
  Train,
  Thermometer,
  ShieldCheck,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Maximize2
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
          id: 'ocean_fcl',
          title: 'Seefracht (FCL & LCL)',
          tagline: 'Weltweite Seecontainer-Linien mit garantierten Liegeplatz-Kapazitäten',
          description: 'Vollcontainer (FCL) und Sammelladungen (LCL) verbinden alle bedeutenden internationalen Überseehäfen. Feste Fahrpläne mit 24.000 TEU Großcontainerschiffen.',
          icon: <Ship className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Kapazität', value: 'Bis zu 24.000 TEU pro Schiff' },
            { label: 'Transitzeit', value: '12 - 32 Tage Hafen zu Hafen' },
            { label: 'Abdeckung', value: 'Über 140 Haupthäfen weltweit' },
            { label: 'Zollabwicklung', value: 'Digitales Konnossement (B/L) & ISF' }
          ],
          equipment: ['20ft Standard Dry', '40ft Standard & High Cube', '45ft Pallet-Wide', 'Open Top & Flat Rack'],
          keyFeatures: [
            'Direkte Liniendienste mit automatischen AIS-ETA-Benachrichtigungen',
            'Konsolidierte LCL-Verschiffung mit wöchentlichen Abfahrten',
            'Schwergut- und Projektladung mit Pontonkran-Verladung',
            'VGM-Zertifizierung direkt am Hafengate'
          ]
        },
        {
          id: 'air_freight',
          title: 'Luftfracht Express',
          tagline: 'Prioritäre weltweite Frachtcharter und Linienflug-Kontingente',
          description: 'Dedizierte Luftfracht-Kapazitäten auf Boeing 777F und 747-8F Frachtflugzeugen für zeitkritische Industrieteile, Pharmazeutika und Hightech.',
          icon: <Plane className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Laufzeit', value: '24 - 72 Stunden Haus-zu-Haus' },
            { label: 'Nutzlast', value: 'Bis zu 102 Tonnen Fracht' },
            { label: 'Drehkreuze', value: 'FRA, AMS, ORD, DXB, HND' },
            { label: 'Standard', value: 'IATA Cargo Agent Akkreditiert' }
          ],
          equipment: ['PMC / P6P Hauptdeck-Paletten', 'LD3 / AKE Unterdeck-Container', 'Vollcharter', 'Sicherheits-Luftfrachtbehälter'],
          keyFeatures: [
            'Garantierte Mitnahme auf dem nächsten Flug (Next Flight Out)',
            'Temperaturgeführte Pharma-Kühlketten am Vorfeld',
            'Zertifiziertes Gefahrgut-Handling (IATA DGR)',
            'Direkte Vorfeld-Zollfreigabe'
          ]
        },
        {
          id: 'road_transport',
          title: 'Straßengüterverkehr & Containertrucking',
          tagline: 'Zuverlässige FTL, LTL und Hafennachläufe in ganz Europa',
          description: 'Zollguttransporte, die Seehäfen mit kontinentalen Logistikzentren verbinden. Moderne Zugmaschinen mit GPS-Telemetrie und ADR-Zulassung.',
          icon: <Truck className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Umfang', value: 'Komplettladung (FTL) & Teilladung (LTL)' },
            { label: 'Fuhrpark', value: 'Mega-Trailer, Kühlauflieger, Tieflader' },
            { label: 'Telemetrie', value: 'Live-GPS + Türsensoren' },
            { label: 'Sicherheit', value: 'ADR-Gefahrgut & TAPA TSR' }
          ],
          equipment: ['Container-Chassis', 'Kühlauflieger Doppelstock', 'Tieflader für Schwertransporte', 'Megatrailer 100m³'],
          keyFeatures: [
            'Sofortige Containerevakuierung zur Vermeidung von Standgeldern',
            'Zollgutversand unter Carnet TIR und T1-Verfahren',
            'Geofencing mit automatischen Ein- und Ausfahrt-Meldungen',
            'Hebebühnen- und Kranentladung vor Ort'
          ]
        },
        {
          id: 'rail_freight',
          title: 'Trans-Eurasien Schienengüterverkehr',
          tagline: 'Grüner, schneller Schienentransit zwischen Ostasien und Europa',
          description: 'Direkte Ganzzug-Verbindungen von chinesischen Produktionszentren zu den europäischen Umschlagbahnhöfen Duisburg, Hamburg und Warschau.',
          icon: <Train className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Geschwindigkeit', value: '2x schneller als Seeweg' },
            { label: 'Kosten', value: '70% günstiger als Luftfracht' },
            { label: 'Laufzeit', value: '14 - 18 Tage Terminal zu Terminal' },
            { label: 'CO2-Einsparung', value: 'Bis zu 82% weniger Emissionen' }
          ],
          equipment: ['40ft High Cube Container-Waggons', 'Beheizte & isolierte Waggons', 'Schüttgutwaggons'],
          keyFeatures: [
            'Reibungsloser Spurwechsel an den Grenzbahnhöfen Dostyk & Brest',
            'Einheitlicher CIM/SMGS Frachtbrief',
            'Wöchentlich 5 feste Ganzzug-Abfahrten',
            'Direkte Rhein-Binnenschiff- und Lkw-Anbindung'
          ]
        },
        {
          id: 'cold_chain',
          title: 'Kühlkette & Pharma-Logistik',
          tagline: 'Präziser temperaturgeführter Transport (-25°C bis +25°C)',
          description: 'GDP-zertifizierte Pharma- und Frischelogistik mit ununterbrochener Kühlkette für Impfstoffe, Reagenzien und Gourmet-Lebensmittel.',
          icon: <Thermometer className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Temperatur', value: '-30°C bis +25°C Mehrkammer' },
            { label: 'Richtlinie', value: 'WHO GDP & FDA 21 CFR Part 11' },
            { label: 'Sensoren', value: 'Echtzeit-IoT-Telemetrie' },
            { label: 'Ausfallsicherheit', value: 'Aktive Aggregate & Notstrom' }
          ],
          equipment: ['Carrier Transicold & Thermo King Kühlcontainer', 'Envirotainer RAP Flugcontainer', 'Trockeneis-Spezialbehälter'],
          keyFeatures: [
            'Vorgekühlte Container mit lückenlosem Temperaturzertifikat',
            'Echtzeitwarnung bei minimalen Temperaturabweichungen',
            'Kühllager-Crossdocking in Seehafen- und Flughafenterminals',
            '24/7 Notfalleinsatzteams'
          ]
        },
        {
          id: 'customs_brokerage',
          title: 'Zollabwicklung & Außenwirtschaft',
          tagline: 'AEO-F zertifizierte Zollagentur und Zolllagerhaltung',
          description: 'Zugelassene Zollspezialisten für ATLAS-Verfahren, Tarifeinstufung, Freihandelsabkommen und Zollaufschub.',
          icon: <ShieldCheck className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Zertifizierung', value: 'AEO-F (Zollrechtliche Vereinfachungen)' },
            { label: 'Tarifierung', value: 'Automatisierte HS-Code Prüfung' },
            { label: 'Freigabezeit', value: 'Elektronische Freigabe in < 4 Std.' },
            { label: 'Zollabgaben', value: 'Zolllager Typ II & Zollrückvergütung' }
          ],
          equipment: ['EDI Direktanbindung (ATLAS, e-Zoll, ACE)', 'Zugelassene Verwahrungslager', 'NCTS Versandverfahren'],
          keyFeatures: [
            'Vorabverzollung zur Vermeidung von Standzeiten im Hafen',
            'Prüfung von Präferenzursprungszeugnissen (EUR.1, REX)',
            'Carnet ATA Abwicklung für Messe- und Montagegut',
            'Digitale revisionssichere Zollarchivierung'
          ]
        }
      ];
    }

    if (language === 'en') {
      return [
        {
          id: 'ocean_fcl',
          title: 'Ocean Freight (FCL & LCL)',
          tagline: 'Global sea container lines with guaranteed berth allocations',
          description: 'Full Container Load (FCL) and Less-than-Container Load (LCL) consolidation connecting all major international ports via scheduled mega-vessel liner services.',
          icon: <Ship className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Capacity', value: 'Up to 24,000 TEU per vessel' },
            { label: 'Transit Time', value: '12 - 32 Days port-to-port' },
            { label: 'Coverage', value: '140+ Tier-1 & Tier-2 Ports' },
            { label: 'Customs Clearance', value: 'Digital B/L & Automated ISF' }
          ],
          equipment: ['20ft Standard Dry', '40ft Standard & High Cube', '45ft Pallet-Wide', 'Open Top & Flat Rack'],
          keyFeatures: [
            'Direct port-to-port liner schedules with automated ETA alerts',
            'Consolidated LCL shipping with weekly departures',
            'Breakbulk and out-of-gauge heavy machinery transport',
            'Verified Gross Mass (VGM) certification at port gates'
          ]
        },
        {
          id: 'air_freight',
          title: 'Air Cargo Express',
          tagline: 'Priority worldwide freight charters and scheduled freighter slots',
          description: 'Dedicated air cargo capacity on wide-body Boeing 777F and 747-8F freighters for urgent aerospace, high-tech, and pharmaceutical consignments.',
          icon: <Plane className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Transit Time', value: '24 - 72 Hours door-to-door' },
            { label: 'Max Payload', value: 'Up to 102 Metric Tons' },
            { label: 'Airport Hubs', value: 'FRA, ORD, HND, DXB, AMS' },
            { label: 'Handling Class', value: 'IATA Cargo Agent Accredited' }
          ],
          equipment: ['PMC / P6P Main Deck Pallets', 'LD3 / AKE Lower Hold Containers', 'Full Aircraft Charters', 'Secured Vault ULDs'],
          keyFeatures: [
            'Guaranteed next-flight-out dispatch and priority customs ramp',
            'Airport-to-airport and door-to-door temperature-monitored courier',
            'Dangerous Goods (DGR) certified handling and packing',
            'Charter services for critical industrial project logistics'
          ]
        },
        {
          id: 'road_transport',
          title: 'Overland Road Freight & Drayage',
          tagline: 'Reliable cross-border FTL, LTL and port container drayage',
          description: 'Bonded intermodal trucking connecting ports to regional distribution centers with GPS-telemetry tracked prime movers and heavy-haul trailers.',
          icon: <Truck className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Service Scope', value: 'Full Truckload (FTL) & LTL' },
            { label: 'Vehicle Types', value: 'Heavy Haul, Curtain-sider, Reefer' },
            { label: 'Telemetry', value: 'Real-time GPS + Door Sensors' },
            { label: 'Driver Safety', value: 'Trained ADR & Certified Drayage' }
          ],
          equipment: ['Tri-axle Container Chassis', 'Temperature-Controlled Trailers', 'Lowboy Heavy-Haul Beds', 'Curtain-sided Mega-trailers'],
          keyFeatures: [
            'Immediate port container evacuation to beat demurrage and detention',
            'Cross-border bonded customs transit under TIR carnets',
            'Real-time automated geofence entry and exit alerts',
            'Tailgate and crane-assist deliveries for restricted sites'
          ]
        },
        {
          id: 'rail_freight',
          title: 'Trans-Eurasia Rail Freight',
          tagline: 'Cost-effective, green transit bridging East Asia and Europe',
          description: 'Direct block-train freight services connecting major manufacturing hubs in China and Southeast Asia to European rail terminals in Duisburg and Hamburg.',
          icon: <Train className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Speed vs Ocean', value: '2x Faster than Ocean Sea Route' },
            { label: 'Cost vs Air', value: '70% Lower Cost than Air Cargo' },
            { label: 'Transit Days', value: '14 - 18 Days terminal-to-terminal' },
            { label: 'Carbon Reduction', value: 'Up to 82% Lower CO2 Emissions' }
          ],
          equipment: ['40ft High Cube Container Wagons', 'Heated & Insulated Rail Boxes', 'Bulk Hopper Wagons'],
          keyFeatures: [
            'Seamless gauge changeover at Dostyk and Brest frontier hubs',
            'CIM/SMGS unified railway consignment documentation',
            'Scheduled block train departures 5 times weekly',
            'Direct connection to Rhine barge and European road feeder networks'
          ]
        },
        {
          id: 'cold_chain',
          title: 'Cold Chain & Pharma Logistics',
          tagline: 'Precision climate-controlled transport (-25°C to +25°C)',
          description: 'Dedicated GDP-compliant cold chain logistics for pharmaceutical biologicals, vaccines, fresh produce, and food with live IoT telemetry.',
          icon: <Thermometer className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'Temp Range', value: '-30°C to +25°C Multi-Zone' },
            { label: 'Compliance', value: 'WHO GDP & FDA 21 CFR Part 11' },
            { label: 'Sensors', value: 'Live Cloud IoT Telemetry' },
            { label: 'Backup', value: 'Active Genset & Dual Refrigeration' }
          ],
          equipment: ['Carrier Transicold & Thermo King Reefers', 'Envirotainer e2 & RAP Active Air Boxes', 'Cryogenic Dry Ice Shippers'],
          keyFeatures: [
            'Pre-conditioned containers with multi-point temperature certification',
            'Real-time temperature telemetry with automated excursion warnings',
            'Cold-room cross-docking at bonded airport and seaport terminals',
            'Dedicated emergency power backup at every transit checkpoint'
          ]
        },
        {
          id: 'customs_brokerage',
          title: 'Customs Clearance & Brokerage',
          tagline: 'Authorized trade compliance, duty drawback, and bonded warehousing',
          description: 'Licensed in-house customs brokers handling automated import/export documentation, tariff classification, preferential trade agreements, and bonded storage worldwide.',
          icon: <ShieldCheck className="w-6 h-6 text-orange-600" />,
          specs: [
            { label: 'License', value: 'AEO-F & C-TPAT Certified Broker' },
            { label: 'HS Classification', value: 'Automated Tariff Code Audit' },
            { label: 'Processing Speed', value: 'Electronic release in < 4 hours' },
            { label: 'Duty Management', value: 'Bonded storage & Duty Drawback' }
          ],
          equipment: ['EDI Direct Customs Portals (ATLAS, ACE, TradeNet)', 'Bonded Warehouse Facilities', 'TIR Carnet Processing'],
          keyFeatures: [
            'Pre-arrival electronic declaration filing to prevent terminal delays',
            'Free Trade Agreement (FTA) origin certificate verification',
            'Temporary import under ATA Carnet for exhibition and project freight',
            'Complete audit-ready digital document archiving'
          ]
        }
      ];
    }

    // Default: Spanish ('es')
    return [
      {
        id: 'ocean_fcl',
        title: 'Transporte Marítimo (FCL y LCL)',
        tagline: 'Líneas marítimas internacionales de contenedores con atraque garantizado',
        description: 'Carga completa de contenedor (FCL) y grupaje marítimo consolidado (LCL) conectando los principales puertos del mundo en buques portacontenedores de hasta 24.000 TEU.',
        icon: <Ship className="w-6 h-6 text-orange-600" />,
        specs: [
          { label: 'Capacidad', value: 'Hasta 24.000 TEU por buque' },
          { label: 'Tiempo de Tránsito', value: '12 - 32 Días puerto a puerto' },
          { label: 'Cobertura', value: 'Más de 140 puertos mundiales' },
          { label: 'Despacho Aduanero', value: 'Conocimiento Digital (B/L) e ISF' }
        ],
        equipment: ['20 pies Estándar', '40 pies Estándar y High Cube', '45 pies Pallet-Wide', 'Open Top y Flat Rack'],
        keyFeatures: [
          'Horarios directos de línea con alertas satelitales automáticas de ETA',
          'Consolidación LCL con salidas semanales fijas garantizadas',
          'Transporte de carga sobredimensionada y maquinaria pesada de proyecto',
          'Certificación de Masa Bruta Verificada (VGM) en terminal portuaria'
        ]
      },
      {
        id: 'air_freight',
        title: 'Carga Aérea Exprés',
        tagline: 'Chárter de carga prioritaria y cupos reservados en vuelos de línea regular',
        description: 'Capacidad de bodega garantizada en aviones cargueros Boeing 777F y 747-8F para repuestos industriales urgentes, tecnología de alto valor y suministros farmacéuticos.',
        icon: <Plane className="w-6 h-6 text-orange-600" />,
        specs: [
          { label: 'Tiempo de Tránsito', value: '24 - 72 Horas puerta a puerta' },
          { label: 'Carga Útil Máxima', value: 'Hasta 102 toneladas métricas' },
          { label: 'Centros Aéreos', value: 'MAD, FRA, AMS, ORD, DXB' },
          { label: 'Acreditación', value: 'Agente de Carga IATA Certificado' }
        ],
        equipment: ['Palets de Cubierta Principal PMC / P6P', 'Contenedores de Bodega LD3 / AKE', 'Chárteres Completos', 'Contenedores Blindados'],
        keyFeatures: [
          'Embarque garantizado en el próximo vuelo disponible (Next Flight Out)',
          'Custodia con temperatura controlada directa en pista de aeropuerto',
          'Gestión y embalaje homologado de Mercancías Peligrosas (IATA DGR)',
          'Servicios de chárter aéreo exclusivo para logística industrial crítica'
        ]
      },
      {
        id: 'road_transport',
        title: 'Transporte Terrestre y Arrastre Portuario',
        tagline: 'Flota multimodal de camiones FTL, LTL y acarreo de contenedores',
        description: 'Transporte por carretera en régimen aduanero que conecta puertos marítimos con almacenes centrales y polígonos industriales, con trazabilidad GPS continua.',
        icon: <Truck className="w-6 h-6 text-orange-600" />,
        specs: [
          { label: 'Modalidad', value: 'Carga Completa (FTL) y Fraccionada (LTL)' },
          { label: 'Flota', value: 'Tractocamiones, Lonas, Frigoríficos' },
          { label: 'Telemetría', value: 'GPS en Vivo + Sensores de Apertura' },
          { label: 'Seguridad', value: 'Conductores ADR y Seguro CMR' }
        ],
        equipment: ['Chasis portacontenedores de 3 ejes', 'Semirremolques frigoríficos', 'Góndolas para maquinaria pesada', 'Megatrailers de 100 m³'],
        keyFeatures: [
          'Evacuación inmediata del contenedor portuario evitando paralizaciones',
          'Tránsito aduanero internacional bajo convenios TIR y documento T1',
          'Alertas automáticas por geolocalización a la entrada del muelle',
          'Plataformas elevadoras y grúa autoportante para descargas complejas'
        ]
      },
      {
        id: 'rail_freight',
        title: 'Transporte Ferroviario Trans-Euroasiático',
        tagline: 'Conexión ecológica y económica entre Asia Oriental y Europa',
        description: 'Trenes de mercancías en bloque que unen centros industriales con terminales ferroviarias de Valencia, Duisburgo, Hamburgo y Varsovia.',
        icon: <Train className="w-6 h-6 text-orange-600" />,
        specs: [
          { label: 'Velocidad vs Mar', value: 'El doble de rápido que el barco' },
          { label: 'Coste vs Aire', value: '70% más económico que el avión' },
          { label: 'Tiempo de Tránsito', value: '14 - 18 Días terminal a terminal' },
          { label: 'Huella de Carbono', value: 'Hasta un 82% menos de emisiones CO2' }
        ],
        equipment: ['Vagones plataforma para contenedores 40ft HC', 'Contenedores aislados y calefactados', 'Vagones tolva para graneles'],
        keyFeatures: [
          'Cambio de ancho de vía fluido en pasos fronterizos internacionales',
          'Documento único de transporte ferroviario internacional CIM/SMGS',
          'Cinco salidas semanales regulares en trenes de bloque directos',
          'Conexión multimodal directa con gabarras fluviales y camiones'
        ]
      },
      {
        id: 'cold_chain',
        title: 'Cadena de Frío y Logística Pharma',
        tagline: 'Transporte con control de temperatura estricto (-25°C a +25°C)',
        description: 'Logística de temperatura controlada conforme a normas GDP para vacunas, reactivos biológicos, productos perecederos y alimentos de alta gama.',
        icon: <Thermometer className="w-6 h-6 text-orange-600" />,
        specs: [
          { label: 'Rango Térmico', value: '-30°C a +25°C multizona' },
          { label: 'Homologación', value: 'Normativa OMS GDP y FDA 21 CFR Part 11' },
          { label: 'Monitoreo', value: 'Sensores IoT en tiempo real' },
          { label: 'Seguridad', value: 'Generadores redundantes de reserva' }
        ],
        equipment: ['Contenedores Reefer Carrier Transicold & Thermo King', 'Contenedores aéreos activos Envirotainer', 'Embalajes criogénicos con nieve carbónica'],
        keyFeatures: [
          'Preenfriamiento verificado de contenedores con certificado digital',
          'Alarmas automáticas inmediatas ante variaciones de temperatura',
          'Zonas de cross-docking con cámaras frías en puertos y aeropuertos',
          'Generadores diésel autónomos para mantener el frío en todo el trayecto'
        ]
      },
      {
        id: 'customs_brokerage',
        title: 'Despacho de Aduanas y Consultoría Arancelaria',
        tagline: 'Agentes de aduanas OEA colegiados y depósito aduanero',
        description: 'Gestión aduanera integral: declaraciones DUA de importación y exportación, clasificación arancelaria y exenciones tributarias.',
        icon: <ShieldCheck className="w-6 h-6 text-orange-600" />,
        specs: [
          { label: 'Autorización', value: 'Operador Económico Autorizado (OEA-F)' },
          { label: 'Clasificación', value: 'Revisión y asignación de código TARIC' },
          { label: 'Velocidad', value: 'Levante telemático en menos de 4 horas' },
          { label: 'Depósito', value: 'Régimen de Depósito Aduanero y Devolución' }
        ],
        equipment: ['Conexión telemática EDI con la Agencia Tributaria', 'Almacén de Depósito Temporal (ADT)', 'Tramitación de cuadernos ATA y TIR'],
        keyFeatures: [
          'Presentación previa de declaraciones telemáticas para evitar retenciones',
          'Comprobación de certificados de origen y acuerdos de libre comercio',
          'Importaciones y exportaciones temporales con cuaderno ATA para ferias',
          'Archivo digital homologado para auditorías aduaneras e inspección'
        ]
      }
    ];
  };

  const services = getLocalizedServices();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Boxes className="w-3.5 h-3.5" />
            {t.servicesBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#232331] font-heading tracking-tight">
            {t.servicesHeading}
          </h2>
          <p className="mt-2 text-sm text-[#767676] max-w-xl">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#767676] font-medium bg-white px-3.5 py-2 rounded-lg border border-stone-200 shadow-2xs">
          <span>AEO / C-TPAT Certified</span>
          <span>·</span>
          <span>IATA Accredited</span>
          <span>·</span>
          <span>24/7 Operations</span>
        </div>
      </div>

      {/* Services Grid with PortX Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="group bg-white rounded-2xl border border-stone-200 hover:border-orange-500 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl shadow-2xs"
          >
            <div>
              {/* Service Icon & Mode Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#f8f5f1] border border-stone-200 flex items-center justify-center group-hover:bg-orange-600 transition-all">
                  <div className="group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                </div>
                <span className="text-[11px] font-mono text-stone-600 bg-[#f8f5f1] px-2.5 py-1 rounded border border-stone-200">
                  {service.specs[1]?.value}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#232331] font-heading group-hover:text-orange-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-orange-700 font-semibold mt-1">
                {service.tagline}
              </p>
              <p className="text-xs text-[#767676] mt-3 leading-relaxed">
                {service.description}
              </p>

              {/* Specs pill list */}
              <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
                {service.specs.slice(0, 3).map((spec, i) => (
                  <div key={i} className="flex justify-between text-[11px]">
                    <span className="text-[#767676] font-medium">{spec.label}</span>
                    <span className="font-bold text-[#232331]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedService(service)}
                className="text-xs font-bold text-[#232331] hover:text-orange-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{t.viewSpecsBtn}</span>
                <Maximize2 className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => onOpenBookingModal(service.id === 'customs_brokerage' ? 'ocean_fcl' : service.id as TransportMode)}
                className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <span>{t.bookModeBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#232331]/70 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute right-4 top-4 text-stone-400 hover:text-[#232331] p-2 rounded-lg bg-[#f8f5f1] cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                {selectedService.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#232331] font-heading">{selectedService.title}</h3>
                <p className="text-xs text-orange-600 font-semibold">{selectedService.tagline}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#767676] leading-relaxed mb-6">
              {selectedService.description}
            </p>

            {/* Specifications Grid */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                {t.techSpecsTitle}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {selectedService.specs.map((s, i) => (
                  <div key={i} className="p-3 bg-[#f8f5f1] rounded-xl border border-stone-200">
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">{s.label}</span>
                    <span className="font-bold text-[#232331] mt-0.5 block">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment Options */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                {t.equipmentTypesTitle}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.equipment.map((eq, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-[#f8f5f1] text-[#232331] border border-stone-200 text-xs font-semibold">
                    {eq}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                Service Guarantees
              </h4>
              <ul className="space-y-2 text-xs text-[#767676]">
                {selectedService.keyFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 rounded-lg bg-[#f8f5f1] text-[#232331] text-xs font-bold hover:bg-stone-200 cursor-pointer"
              >
                {t.closeModalBtn}
              </button>
              <button
                onClick={() => {
                  const m = selectedService.id === 'customs_brokerage' ? 'ocean_fcl' : selectedService.id as TransportMode;
                  setSelectedService(null);
                  onOpenBookingModal(m);
                }}
                className="px-6 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                {t.requestQuoteModeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
