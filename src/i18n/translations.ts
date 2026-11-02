export type Language = 'es' | 'en' | 'de';

export interface Translations {
  // Topbar & Nav
  advisoryText: string;
  dispatchHotline: string;
  quickTrackPlaceholder: string;
  quickTrackGo: string;
  adminPortalBtn: string;
  adminOperations: string;
  navHome: string;
  navTrack: string;
  navServices: string;
  navCalculator: string;
  navNetwork: string;
  navAbout: string;
  navContact: string;
  getQuoteBtn: string;
  taglineCargo: string;

  // Hero
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroDescription: string;
  trackBoxTitle: string;
  liveAisStatus: string;
  trackInputPlaceholder: string;
  trackButton: string;
  quickTestLabel: string;
  calculateRatesBtn: string;
  explorePortsBtn: string;
  liveFleetFeedTitle: string;
  onScheduleBadge: string;
  inFlightBadge: string;
  customsAuditBadge: string;
  statOnTime: string;
  statOnTimeLabel: string;
  statPorts: string;
  statPortsLabel: string;
  statTeu: string;
  statTeuLabel: string;
  statResponse: string;
  statResponseLabel: string;

  // Tracking
  trackingHeaderBadge: string;
  trackingHeading: string;
  trackingSubheading: string;
  portOfLoading: string;
  portOfDischarge: string;
  currentCheckpoint: string;
  transitProgress: string;
  departedDate: string;
  estimatedArrival: string;
  printWaybillBtn: string;
  dispatchUpdateBtn: string;
  milestonesTitle: string;
  milestonesSubtitle: string;
  cargoSpecsTitle: string;
  cargoDescriptionLabel: string;
  grossWeightLabel: string;
  volumeLabel: string;
  piecesLabel: string;
  containerIdLabel: string;
  boltSealLabel: string;
  reeferMonitoringLabel: string;
  customsClearanceLabel: string;
  shipperLabel: string;
  consigneeLabel: string;
  noShipmentFoundTitle: string;
  noShipmentFoundText: string;

  // Services
  servicesBadge: string;
  servicesHeading: string;
  servicesSubtitle: string;
  insuredBadge: string;
  accreditedBadge: string;
  monitoringBadge: string;
  fullSpecsBtn: string;
  bookServiceBtn: string;
  closeBtn: string;
  bookModeBtn: string;
  supportedEquipment: string;
  serviceGuarantees: string;
  operationalMetrics: string;

  // Rate Calculator
  calcBadge: string;
  calcHeading: string;
  calcSubtitle: string;
  selectModeLabel: string;
  originPortLabel: string;
  destPortLabel: string;
  containerUnitLabel: string;
  grossWeightCalcLabel: string;
  volumeCalcLabel: string;
  optionsHeading: string;
  optTerminalHandling: string;
  optCustoms: string;
  optInsurance: string;
  estimatedQuoteTitle: string;
  transitDaysEstimate: string;
  totalCostLabel: string;
  guaranteedRateBadge: string;
  baseFreightLabel: string;
  bunkerSurchargeLabel: string;
  thcLabel: string;
  customsEntryLabel: string;
  insuranceUnderwritingLabel: string;
  bookConsignmentBtn: string;
  quoteFootnote: string;

  // Port Network
  networkBadge: string;
  networkHeading: string;
  networkSubtitle: string;
  selectedTerminalHub: string;
  availableBerths: string;
  terminalTypeLabel: string;
  activeVesselsLabel: string;
  avgContainerDwellLabel: string;
  geoCoordinatesLabel: string;
  terminalGateNoticeTitle: string;
  terminalGateNoticeText: string;
  portCallsTitle: string;
  portCallsSubtitle: string;

  // About & Trust
  aboutBadge: string;
  aboutHeading: string;
  aboutP1: string;
  aboutP2: string;
  accreditationTitle: string;

  // Contact
  contactBadge: string;
  contactHeading: string;
  contactSubtitle: string;
  contactCtaTitle: string;
  contactCtaSubtitle: string;

  // Booking Modal
  bookingModalTitle: string;
  bookingModalSubtitle: string;
  contactNameLabel: string;
  companyNameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  specialHandlingLabel: string;
  submitBookingBtn: string;
  cancelBtn: string;
  bookingConfirmedTitle: string;
  bookingConfirmedSubtitle: string;
  quoteRefLabel: string;
  routeLabel: string;
  statusOperationsLabel: string;
  doneBtn: string;

  // Admin Portal & Login
  adminLoginRequiredBadge: string;
  adminLoginHeading: string;
  adminLoginSubtitle: string;
  officerEmailLabel: string;
  passwordLabel: string;
  rememberSessionLabel: string;
  verifyLoginBtn: string;
  approvedAccountsTitle: string;
  returnToSiteBtn: string;
  terminalOsBadge: string;
  lockTerminalBtn: string;
  viewTrackingSiteBtn: string;
  newShipmentBtn: string;
  recordCheckpointBtn: string;
  activeShipmentsKpi: string;
  customsHoldsKpi: string;
  inquiriesKpi: string;
  weightManifestedKpi: string;
  activeManifestsTitle: string;
  recentPingsTitle: string;
  trackingCodeCol: string;
  shipperConsigneeCol: string;
  routingCol: string;
  containerSpecsCol: string;
  statusProgressCol: string;
  actionsCol: string;

  // Extra UI Convenience Keys
  adminDashboardTitle: string;
  adminDashboardSubtitle: string;
  pillarAeoTitle: string;
  pillarAeoDesc: string;
  pillarGreenTitle: string;
  pillarGreenDesc: string;
  accreditationsTitle: string;
  originTerminalLabel: string;
  destinationTerminalLabel: string;
  grossWeightKgLabel: string;
  volumeCbmLabel: string;
  valueAddedOptions: string;
  optCustomsBrokerage: string;
  optCargoInsurance: string;
  quoteResultTitle: string;
  daysTransit: string;
  totalEstimatedCost: string;
  guaranteedRatePill: string;
  baseFreightCharge: string;
  bunkerSurcharge: string;
  terminalHandlingFee: string;
  customsEntryFee: string;
  insuranceUnderwritingFee: string;
  bookAtThisRateBtn: string;
  rateIncludesFooter: string;
  viewSpecsBtn: string;
  techSpecsTitle: string;
  equipmentTypesTitle: string;
  closeModalBtn: string;
  requestQuoteModeBtn: string;
  terminalDetailsTitle: string;
  terminalNoticeTitle: string;
  terminalNoticeBody: string;
  portCallsScheduleTitle: string;
  portCallsScheduleSubtitle: string;
  vesselCarrierCol: string;
  scheduledEtaCol: string;
  berthPierCol: string;
  serviceLineCol: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  es: {
    // Topbar & Nav
    advisoryText: 'Centro de Operaciones Globales: Tráfico Portuario Normal',
    dispatchHotline: 'Mesa de Despacho 24/7',
    quickTrackPlaceholder: 'Nº Rastreo (ej. PTX-849201)',
    quickTrackGo: 'Ir',
    adminPortalBtn: 'Portal de Operaciones',
    adminOperations: 'Operaciones',
    navHome: 'Inicio',
    navTrack: 'Rastreo y Seguimiento',
    navServices: 'Servicios de Carga',
    navCalculator: 'Calculadora de Tarifas',
    navNetwork: 'Red de Puertos',
    navAbout: 'Sobre PortX',
    navContact: 'Contacto',
    getQuoteBtn: 'Cotizar Carga',
    taglineCargo: 'Carga Global',

    // Hero
    heroBadge: 'Transporte de Carga Marítima y Logística Intermodal',
    heroTitleLine1: 'Transporte de Carga Global.',
    heroTitleHighlight: 'Precisión Puntual.',
    heroDescription: 'PortX conecta el comercio comercial internacional a través de buques portacontenedores, vuelos de carga chárter, ferrocarril continental y transporte terrestre con rastreo satelital verificable.',
    trackBoxTitle: 'Rastreo en Tiempo Real de Envíos',
    liveAisStatus: 'Telemetría Satelital AIS Activa',
    trackInputPlaceholder: 'Ingrese Nº de Rastreo (ej. PTX-849201), Contenedor o B/L',
    trackButton: 'Rastrear Carga',
    quickTestLabel: 'Números de Prueba:',
    calculateRatesBtn: 'Calcular Tarifas de Flete',
    explorePortsBtn: 'Explorar Más de 140 Terminales',
    liveFleetFeedTitle: 'Tráfico Marítimo y Aéreo en Vivo',
    onScheduleBadge: 'A Tiempo',
    inFlightBadge: 'En Vuelo',
    customsAuditBadge: 'Auditoría Aduanal',
    statOnTime: '99.8%',
    statOnTimeLabel: 'Entrega Puntual de Carga',
    statPorts: '140+',
    statPortsLabel: 'Puertos Conectados',
    statTeu: '2.4M',
    statTeuLabel: 'TEU Gestionados al Año',
    statResponse: '< 15 min',
    statResponseLabel: 'Respuesta Rápida de Despacho',

    // Tracking
    trackingHeaderBadge: 'Rastreo Global de Carga en Tiempo Real',
    trackingHeading: 'Rastreo y Seguimiento de Envíos',
    trackingSubheading: 'Supervise su contenedor marítimo, palet aéreo o carga intermodal con telemetría satelital y auditorías en cada punto de control.',
    portOfLoading: 'Puerto de Carga (POL)',
    portOfDischarge: 'Puerto de Descarga (POD)',
    currentCheckpoint: 'Punto de Control Actual',
    transitProgress: 'Progreso del Tránsito',
    departedDate: 'Zarpó',
    estimatedArrival: 'Llegada Estimada',
    printWaybillBtn: 'Imprimir Carta de Porte Oficial',
    dispatchUpdateBtn: 'Actualizar Despacho',
    milestonesTitle: 'Puntos de Control y Cadena de Custodia',
    milestonesSubtitle: 'Hitos con marca de tiempo y auditoría verificados por estaciones de PortX y autoridades portuarias.',
    cargoSpecsTitle: 'Especificaciones de la Carga',
    cargoDescriptionLabel: 'Descripción de Mercancía',
    grossWeightLabel: 'Peso Bruto',
    volumeLabel: 'Volumen',
    piecesLabel: 'Cantidad de Bultos',
    containerIdLabel: 'ID de Contenedor',
    boltSealLabel: 'Número de Precinto',
    reeferMonitoringLabel: 'Monitoreo Frigorífico',
    customsClearanceLabel: 'Despacho Aduanal',
    shipperLabel: 'Remitente (Cargador)',
    consigneeLabel: 'Consignatario (Receptor)',
    noShipmentFoundTitle: 'No se Encontró el Envío',
    noShipmentFoundText: 'No localizamos ninguna carga con ese identificador. Por favor verifique el número de rastreo o pruebe con los ejemplos disponibles.',

    // Services
    servicesBadge: 'Capacidades de Carga Integrales',
    servicesHeading: 'Soluciones de Envío Especializadas',
    servicesSubtitle: 'Infraestructura logística marítima, aérea, ferroviaria y terrestre para garantizar que su carga viaje sin fronteras ni demoras.',
    insuredBadge: 'Carga Asegurada al 100%',
    accreditedBadge: 'Acreditado IATA / FIATA',
    monitoringBadge: 'Monitoreo 24/7',
    fullSpecsBtn: 'Especificaciones Completas',
    bookServiceBtn: 'Reservar Servicio',
    closeBtn: 'Cerrar',
    bookModeBtn: 'Reservar esta Modalidad',
    supportedEquipment: 'Equipos y Contenedores Soportados',
    serviceGuarantees: 'Garantías Operativas del Servicio',
    operationalMetrics: 'Métricas Operativas',

    // Rate Calculator
    calcBadge: 'Estimador de Tarifas en Tiempo Real',
    calcHeading: 'Cotización Inmediata y Calculadora de Rutas',
    calcSubtitle: 'Calcule presupuestos de transporte marítimo, aéreo y multimodal con desglose transparente de combustible (BAF), manipulación en terminal (THC) e impuestos aduanales.',
    selectModeLabel: 'Seleccione Modalidad de Transporte',
    originPortLabel: 'Terminal / Puerto de Origen',
    destPortLabel: 'Puerto de Destino',
    containerUnitLabel: 'Tipo de Contenedor / Unidad',
    grossWeightCalcLabel: 'Peso Bruto (kg)',
    volumeCalcLabel: 'Volumen (CBM)',
    optionsHeading: 'Opciones de Cumplimiento y Manejo PortX',
    optTerminalHandling: 'Manipulación en Terminal (THC)',
    optCustoms: 'Agencia de Aduanas',
    optInsurance: 'Seguro de Carga a Todo Riesgo',
    estimatedQuoteTitle: 'Presupuesto Comercial Estimado',
    transitDaysEstimate: 'Días de Tránsito Estimados',
    totalCostLabel: 'Costo Total Estimado (USD)',
    guaranteedRateBadge: 'Tarifa Garantizada por 14 Días',
    baseFreightLabel: 'Flete Base:',
    bunkerSurchargeLabel: 'Recargo de Combustible (BAF 12%):',
    thcLabel: 'Manejo en Terminal (THC):',
    customsEntryLabel: 'Gestión y Entrada Aduanal:',
    insuranceUnderwritingLabel: 'Póliza de Seguro Todo Riesgo:',
    bookConsignmentBtn: 'Reservar Envío con esta Tarifa',
    quoteFootnote: 'Incluye Carta de Porte digital, acceso a rastreo satelital GPS 24/7 y pase de entrada portuaria certificado.',

    // Port Network
    networkBadge: 'Terminales Marítimas y Aéreas Mundiales',
    networkHeading: 'Red Global de Puertos Conectados',
    networkSubtitle: 'Operaciones de atraque en tiempo real, capacidad de muelles y escalas programadas en los principales centros de trasbordo.',
    selectedTerminalHub: 'Terminal Seleccionada',
    availableBerths: 'Muelles Comerciales Disponibles',
    terminalTypeLabel: 'Tipo de Terminal',
    activeVesselsLabel: 'Buques PortX Activos',
    avgContainerDwellLabel: 'Estadía Promedio de Contenedor',
    geoCoordinatesLabel: 'Coordenadas Geográficas',
    terminalGateNoticeTitle: 'Aviso de Acceso al Terminal:',
    terminalGateNoticeText: 'Ingreso automatizado con escáner óptico e-Gate. Los clientes de PortX disponen de carriles prioritarios de camiones sin cargos por demora de estadía.',
    portCallsTitle: 'Escalas de Buques y Matriz de Atraque',
    portCallsSubtitle: 'Llegadas y salidas de embarcaciones monitoreadas bajo acuerdos de línea regular de PortX.',

    // About & Trust
    aboutBadge: 'Acerca de PortX Global Logistics',
    aboutHeading: 'Más de Dos Décadas de Excelencia Marítima e Intermodal',
    aboutP1: 'Fundada en el Puerto de Róterdam, PortX ha evolucionado de un operador regional a una potencia de transporte marítimo global de primer nivel, gestionando anualmente más de 2.4 millones de contenedores TEU, 350,000 toneladas de carga aérea y 85,000 operaciones terrestres.',
    aboutP2: 'Conectamos a fabricantes industriales, laboratorios farmacéuticos y minoristas globales con mercados de todo el mundo mediante cadenas de custodia verificadas satelitalmente.',
    accreditationTitle: 'Acreditaciones Operativas',

    // Contact
    contactBadge: 'Atención Global de Carga 24/7',
    contactHeading: 'Comuníquese con Operaciones PortX',
    contactSubtitle: 'Contacte con nuestras oficinas de despacho central, solicite asesoría sobre proyectos de carga o comuníquese con agentes de estación marítima.',
    contactCtaTitle: '¿Requiere un Despacho Inmediato de Carga?',
    contactCtaSubtitle: 'Utilice nuestra calculadora de tarifas y generador de reservas en línea para obtener confirmación instantánea y alta de envío.',

    // Booking Modal
    bookingModalTitle: 'Solicitud de Reserva Comercial de Carga',
    bookingModalSubtitle: 'Su solicitud es recibida directamente por la mesa de despacho de PortX para la reserva de espacio garantizado.',
    contactNameLabel: 'Nombre de Contacto *',
    companyNameLabel: 'Empresa / Organización',
    emailLabel: 'Correo Electrónico *',
    phoneLabel: 'Teléfono / WhatsApp',
    specialHandlingLabel: 'Instrucciones Especiales / Naturaleza de la Carga',
    submitBookingBtn: 'Enviar Reserva de Carga',
    cancelBtn: 'Cancelar',
    bookingConfirmedTitle: '¡Solicitud de Reserva Confirmada!',
    bookingConfirmedSubtitle: 'Su trámite ha sido transmitido con éxito a la consola de operaciones de fletes de PortX.',
    quoteRefLabel: 'Código de Cotización:',
    routeLabel: 'Ruta:',
    statusOperationsLabel: 'Estado en Operaciones:',
    doneBtn: 'Finalizar',

    // Admin Portal & Login
    adminLoginRequiredBadge: 'Requiere Autorización de Seguridad',
    adminLoginHeading: 'Ingreso a Operaciones PortX',
    adminLoginSubtitle: 'Acceso restringido. Solo despachadores marítimos autorizados, supervisores de terminal y oficiales aduanales pueden ingresar.',
    officerEmailLabel: 'Correo Corporativo del Oficial',
    passwordLabel: 'Contraseña de Seguridad',
    rememberSessionLabel: 'Recordar sesión en esta terminal',
    verifyLoginBtn: 'Verificar y Desbloquear Mesa de Control',
    approvedAccountsTitle: 'Cuentas de Oficiales Aprobados (Autollenado)',
    returnToSiteBtn: 'Regresar al Sitio Público de Rastreo',
    terminalOsBadge: 'Sistema Operativo del Terminal (TOS)',
    lockTerminalBtn: 'Bloquear Terminal',
    viewTrackingSiteBtn: 'Ver Sitio de Rastreo',
    newShipmentBtn: 'Nueva Reserva de Envío',
    recordCheckpointBtn: 'Publicar Punto de Control',
    activeShipmentsKpi: 'Envíos Activos',
    customsHoldsKpi: 'Retenciones Aduanales',
    inquiriesKpi: 'Solicitudes en Espera',
    weightManifestedKpi: 'Tonelaje Manifestado',
    activeManifestsTitle: 'Manifiestos de Carga Activos',
    recentPingsTitle: 'Telemetría en Vivo',
    trackingCodeCol: 'Código Rastreo / B/L',
    shipperConsigneeCol: 'Cargador y Consignatario',
    routingCol: 'Ruta',
    containerSpecsCol: 'Contenedor y Medidas',
    statusProgressCol: 'Estado y Progreso',
    actionsCol: 'Acciones de Despacho',

    // Extra UI Convenience Keys
    adminDashboardTitle: 'Centro de Mando de Despacho',
    adminDashboardSubtitle: 'Control operativo de líneas marítimas, cargueros aéreos, corredores ferroviarios e hitos aduaneros.',
    pillarAeoTitle: 'Certificación OEA-F y C-TPAT',
    pillarAeoDesc: 'Operador Económico Autorizado con canales aduaneros preferentes.',
    pillarGreenTitle: 'Transporte Verde 2030',
    pillarGreenDesc: 'Biocombustibles marinos, buques GNL y compensación verificada de huella.',
    accreditationsTitle: 'Acreditaciones Operativas',
    originTerminalLabel: 'Terminal de Origen / Puerto',
    destinationTerminalLabel: 'Terminal de Destino',
    grossWeightKgLabel: 'Peso Bruto (kg)',
    volumeCbmLabel: 'Volumen (CBM)',
    valueAddedOptions: 'Opciones de Cumplimiento y Servicios de Valor',
    optCustomsBrokerage: 'Despacho de Aduanas',
    optCargoInsurance: 'Seguro de Carga Todo Riesgo',
    quoteResultTitle: 'Tarifa Instantánea de Flete',
    daysTransit: 'Días de Tránsito',
    totalEstimatedCost: 'Coste Total Estimado (USD)',
    guaranteedRatePill: 'Tarifa Garantizada 14 Días',
    baseFreightCharge: 'Flete Base Portuario',
    bunkerSurcharge: 'Recargo de Combustible (BAF 12%)',
    terminalHandlingFee: 'Gastos de Terminal (THC)',
    customsEntryFee: 'Despacho Aduanero Import/Export',
    insuranceUnderwritingFee: 'Cobertura de Seguro de Mercancías',
    bookAtThisRateBtn: 'Reservar Envío con Esta Tarifa',
    rateIncludesFooter: 'Incluye conocimiento de embarque digital (B/L), monitoreo satelital 24/7 y pase de muelle.',
    viewSpecsBtn: 'Especificaciones',
    techSpecsTitle: 'Métricas Operativas',
    equipmentTypesTitle: 'Equipos y Contenedores Homologados',
    closeModalBtn: 'Cerrar',
    requestQuoteModeBtn: 'Reservar esta Modalidad',
    terminalDetailsTitle: 'Ficha del Terminal Portuario',
    terminalNoticeTitle: 'Aviso Operativo de Terminal:',
    terminalNoticeBody: 'Entrada automatizada e-Gate OCR activa. Clientes de PortX cuentan con carriles prioritarios sin recargos por demora.',
    portCallsScheduleTitle: 'Escalas Portuarias y Matriz de Atraques',
    portCallsScheduleSubtitle: 'Llegadas y salidas de buques en tiempo real según acuerdos de línea PortX.',
    vesselCarrierCol: 'Buque / Naviera',
    scheduledEtaCol: 'ETA Previsto',
    berthPierCol: 'Atraque / Muelle',
    serviceLineCol: 'Línea de Servicio'
  },

  en: {
    // Topbar & Nav
    advisoryText: 'Global Operations Center: Normal Port Traffic Flow',
    dispatchHotline: '24/7 Dispatch Desk',
    quickTrackPlaceholder: 'Track ID (e.g. PTX-849201)',
    quickTrackGo: 'Go',
    adminPortalBtn: 'Operations Portal',
    adminOperations: 'Admin Ops',
    navHome: 'Home',
    navTrack: 'Track & Trace',
    navServices: 'Cargo Services',
    navCalculator: 'Rate Calculator',
    navNetwork: 'Port Network',
    navAbout: 'About PortX',
    navContact: 'Contact',
    getQuoteBtn: 'Get Freight Quote',
    taglineCargo: 'Global Cargo',

    // Hero
    heroBadge: 'Commercial Maritime Freight & Intermodal Shipping',
    heroTitleLine1: 'Global Cargo Shipping.',
    heroTitleHighlight: 'Precision On Schedule.',
    heroDescription: 'PortX powers commercial intermodal shipping across ocean mega-vessels, air cargo freighters, rail networks, and bonded trucking with satellite tracking and verifiable chain-of-custody.',
    trackBoxTitle: 'Instant Consignment Tracking',
    liveAisStatus: 'Satellite AIS Connected',
    trackInputPlaceholder: 'Enter Tracking # (e.g. PTX-849201) or Container ID',
    trackButton: 'Track Cargo',
    quickTestLabel: 'Quick Test Numbers:',
    calculateRatesBtn: 'Calculate Freight Rates',
    explorePortsBtn: 'View 140+ Port Terminals',
    liveFleetFeedTitle: 'Live Maritime & Air Freight Feed',
    onScheduleBadge: 'On Schedule',
    inFlightBadge: 'In Flight',
    customsAuditBadge: 'Customs Audit',
    statOnTime: '99.8%',
    statOnTimeLabel: 'On-Time Cargo Delivery',
    statPorts: '140+',
    statPortsLabel: 'Connected Seaports',
    statTeu: '2.4M',
    statTeuLabel: 'TEU Handled Yearly',
    statResponse: '< 15 min',
    statResponseLabel: 'Rapid Dispatch Response',

    // Tracking
    trackingHeaderBadge: 'Real-Time Global Cargo Tracking',
    trackingHeading: 'Track & Trace Consignment',
    trackingSubheading: 'Monitor your ocean container, air freight pallet, or intermodal freight with live satellite telemetry and checkpoint audits.',
    portOfLoading: 'Port of Loading (POL)',
    portOfDischarge: 'Port of Discharge (POD)',
    currentCheckpoint: 'Current Checkpoint',
    transitProgress: 'Transit Progress',
    departedDate: 'Departed',
    estimatedArrival: 'Estimated Arrival',
    printWaybillBtn: 'Print Official Waybill',
    dispatchUpdateBtn: 'Dispatch Update',
    milestonesTitle: 'Tracking Milestones & Chain of Custody',
    milestonesSubtitle: 'Timestamped verifiable checkpoints recorded by PortX stations & port authorities.',
    cargoSpecsTitle: 'Cargo Specifications',
    cargoDescriptionLabel: 'Cargo Description',
    grossWeightLabel: 'Gross Weight',
    volumeLabel: 'Volume',
    piecesLabel: 'Package Quantity',
    containerIdLabel: 'Container ID',
    boltSealLabel: 'Bolt Seal Number',
    reeferMonitoringLabel: 'Reefer Monitoring',
    customsClearanceLabel: 'Customs Clearance',
    shipperLabel: 'Shipper (Consignor)',
    consigneeLabel: 'Consignee (Delivery Party)',
    noShipmentFoundTitle: 'No Shipment Found',
    noShipmentFoundText: "We couldn't locate any consignment matching your query. Please verify the tracking code or try one of the active sample numbers.",

    // Services
    servicesBadge: 'Comprehensive Cargo Capabilities',
    servicesHeading: 'Specialized Shipping Solutions',
    servicesSubtitle: 'Engineered logistics infrastructure spanning sea, sky, rail, and land to ensure your freight moves reliably without border delays.',
    insuredBadge: 'Fully Insured Cargo',
    accreditedBadge: 'IATA / FIATA Accredited',
    monitoringBadge: '24/7 Monitoring',
    fullSpecsBtn: 'Full Specs',
    bookServiceBtn: 'Book Service',
    closeBtn: 'Close',
    bookModeBtn: 'Book This Cargo Mode',
    supportedEquipment: 'Supported Equipment & Containers',
    serviceGuarantees: 'Key Service Guarantees',
    operationalMetrics: 'Operational Metrics',

    // Rate Calculator
    calcBadge: 'Real-Time Cargo Rate Estimator',
    calcHeading: 'Instant Freight Quote & Route Calculator',
    calcSubtitle: 'Compute accurate port-to-port and multimodal shipping quotes with transparent breakdowns for fuel surcharges, terminal handling, and customs compliance.',
    selectModeLabel: 'Select Transport Mode',
    originPortLabel: 'Origin Terminal / Port',
    destPortLabel: 'Destination Port',
    containerUnitLabel: 'Container / Unit Type',
    grossWeightCalcLabel: 'Gross Weight (kg)',
    volumeCalcLabel: 'Volume (CBM)',
    optionsHeading: 'PortX Compliance & Handling Options',
    optTerminalHandling: 'Terminal Handling (THC)',
    optCustoms: 'Customs Brokerage',
    optInsurance: 'All-Risk Cargo Insurance',
    estimatedQuoteTitle: 'Estimated Commercial Quote',
    transitDaysEstimate: 'Estimated Transit Days',
    totalCostLabel: 'Total Estimated Cost (USD)',
    guaranteedRateBadge: 'Guaranteed 14-Day Rate',
    baseFreightLabel: 'Base Freight Charge:',
    bunkerSurchargeLabel: 'Bunker Fuel Surcharge (BAF 12%):',
    thcLabel: 'Terminal Handling Charge (THC):',
    customsEntryLabel: 'Export/Import Customs Entry:',
    insuranceUnderwritingLabel: 'All-Risk Cargo Insurance:',
    bookConsignmentBtn: 'Book Consignment At This Rate',
    quoteFootnote: 'Includes electronic Bill of Lading, 24/7 GPS satellite tracking access, and certified port gate pass.',

    // Port Network
    networkBadge: 'Global Maritime & Air Terminals',
    networkHeading: 'Connected Global Port Network',
    networkSubtitle: 'Live turnaround operations, berth capacity, and scheduled port calls across primary transshipment hubs.',
    selectedTerminalHub: 'Selected Terminal Hub',
    availableBerths: 'Available Commercial Berths',
    terminalTypeLabel: 'Terminal Type',
    activeVesselsLabel: 'PortX Active Vessels',
    avgContainerDwellLabel: 'Avg Container Dwell',
    geoCoordinatesLabel: 'Geo Coordinates',
    terminalGateNoticeTitle: 'Terminal Gate Notice:',
    terminalGateNoticeText: 'Automated gate-in with e-Gate OCR container scanner active. PortX clients enjoy reserved priority truck drayage lanes and zero dwell-time penalties.',
    portCallsTitle: 'Scheduled Port Calls & Berthing Matrix',
    portCallsSubtitle: 'Real-time vessel arrivals and departures managed under PortX liner agreements.',

    // About & Trust
    aboutBadge: 'About PortX Global Logistics',
    aboutHeading: 'Over Two Decades of Unbroken Maritime & Intermodal Excellence',
    aboutP1: 'Founded at the Port of Rotterdam, PortX has evolved from a regional terminal feeder service into a global Tier-1 freight forwarding power managing over 2.4 million TEU container movements, 350,000 air cargo tons, and 85,000 overland drayage operations each year.',
    aboutP2: 'We bridge industrial manufacturers, pharmaceuticals, high-tech robotics, and global retailers directly to worldwide consumer markets with satellite-verified chains of custody.',
    accreditationTitle: 'Operational Accreditations',

    // Contact
    contactBadge: '24/7 Global Shipping Support',
    contactHeading: 'Connect With PortX Cargo Operations',
    contactSubtitle: 'Reach our central dispatch offices, request project freight consultations, or contact 24/7 maritime station agents.',
    contactCtaTitle: 'Need an Immediate Cargo Dispatch Booking?',
    contactCtaSubtitle: 'Use our automated rate calculator and booking request generator for instant confirmation numbers and live consignment creation.',

    // Booking Modal
    bookingModalTitle: 'Commercial Cargo Booking Request',
    bookingModalSubtitle: 'Your request is directly received by the PortX dispatch desk and reviewed for automated space reservation.',
    contactNameLabel: 'Contact Name *',
    companyNameLabel: 'Company / Organization',
    emailLabel: 'Email Address *',
    phoneLabel: 'Phone / WhatsApp',
    specialHandlingLabel: 'Special Handling / Commodity Remarks',
    submitBookingBtn: 'Submit Cargo Booking',
    cancelBtn: 'Cancel',
    bookingConfirmedTitle: 'Booking Request Confirmed!',
    bookingConfirmedSubtitle: 'Your inquiry has been successfully transmitted to the PortX Freight Operations console.',
    quoteRefLabel: 'Quote Reference ID:',
    routeLabel: 'Route:',
    statusOperationsLabel: 'Status in Operations:',
    doneBtn: 'Done',

    // Admin Portal & Login
    adminLoginRequiredBadge: 'Terminal Security Clearance Required',
    adminLoginHeading: 'PORTX Operations Login',
    adminLoginSubtitle: 'Restricted access. Only approved PortX maritime station dispatchers, terminal officers, and cargo supervisors may log in.',
    officerEmailLabel: 'Officer Work Email',
    passwordLabel: 'Security Access Password',
    rememberSessionLabel: 'Remember terminal session',
    verifyLoginBtn: 'Verify & Unlock Operations Desk',
    approvedAccountsTitle: 'Approved Officer Accounts (1-Click Fill)',
    returnToSiteBtn: 'Return to Public Customer Tracking Site',
    terminalOsBadge: 'Terminal Operating System (TOS)',
    lockTerminalBtn: 'Lock Terminal',
    viewTrackingSiteBtn: 'View Customer Site',
    newShipmentBtn: 'New Shipment Booking',
    recordCheckpointBtn: 'Post Checkpoint Update',
    activeShipmentsKpi: 'Active Shipments',
    customsHoldsKpi: 'Customs / Exception Holds',
    inquiriesKpi: 'Booking Inquiries',
    weightManifestedKpi: 'Total Weight Manifested',
    activeManifestsTitle: 'Active Freight Manifests',
    recentPingsTitle: 'Live Telemetry',
    trackingCodeCol: 'Tracking / B/L',
    shipperConsigneeCol: 'Shipper & Consignee',
    routingCol: 'Route & Mode',
    containerSpecsCol: 'Container & Specs',
    statusProgressCol: 'Status & Progress',
    actionsCol: 'Operations Actions',

    // Extra UI Convenience Keys
    adminDashboardTitle: 'Cargo Dispatch Cockpit',
    adminDashboardSubtitle: 'Real-time management for maritime liners, air express freight, rail corridors, and customs milestones.',
    pillarAeoTitle: 'AEO-F & C-TPAT Certified',
    pillarAeoDesc: 'Authorized Economic Operator for expedited priority customs lanes.',
    pillarGreenTitle: 'Green Shipping 2030',
    pillarGreenDesc: 'Bio-bunker fuel blending, LNG vessels, and verified carbon credit offsets.',
    accreditationsTitle: 'Operational Accreditations',
    originTerminalLabel: 'Origin Terminal / Port',
    destinationTerminalLabel: 'Destination Port',
    grossWeightKgLabel: 'Gross Weight (kg)',
    volumeCbmLabel: 'Volume (CBM)',
    valueAddedOptions: 'PortX Compliance & Handling Options',
    optCustomsBrokerage: 'Customs Brokerage',
    optCargoInsurance: 'All-Risk Cargo Insurance',
    quoteResultTitle: 'Instant Freight Rate',
    daysTransit: 'Days Transit',
    totalEstimatedCost: 'Total Estimated Cost (USD)',
    guaranteedRatePill: 'Guaranteed 14-Day Rate',
    baseFreightCharge: 'Base Freight Charge',
    bunkerSurcharge: 'Bunker Fuel Surcharge (BAF 12%)',
    terminalHandlingFee: 'Terminal Handling Charge (THC)',
    customsEntryFee: 'Export/Import Customs Entry',
    insuranceUnderwritingFee: 'All-Risk Cargo Insurance Underwriting',
    bookAtThisRateBtn: 'Book Consignment At This Rate',
    rateIncludesFooter: 'Includes electronic Bill of Lading, 24/7 GPS satellite tracking access, and certified port gate pass.',
    viewSpecsBtn: 'Full Specs',
    techSpecsTitle: 'Operational Metrics',
    equipmentTypesTitle: 'Supported Equipment & Containers',
    closeModalBtn: 'Close',
    requestQuoteModeBtn: 'Book This Cargo Mode',
    terminalDetailsTitle: 'Port Terminal Dossier',
    terminalNoticeTitle: 'Terminal Gate Notice:',
    terminalNoticeBody: 'Automated gate-in with e-Gate OCR container scanner active. PortX clients enjoy reserved priority truck drayage lanes and zero dwell-time penalties.',
    portCallsScheduleTitle: 'Scheduled Port Calls & Berthing Matrix',
    portCallsScheduleSubtitle: 'Real-time vessel arrivals and departures managed under PortX liner agreements.',
    vesselCarrierCol: 'Vessel / Carrier',
    scheduledEtaCol: 'Scheduled ETA',
    berthPierCol: 'Berth / Pier',
    serviceLineCol: 'Service Line'
  },

  de: {
    // Topbar & Nav
    advisoryText: 'Globales Lagezentrum: Normaler Hafenbetrieb & Schiffsverkehr',
    dispatchHotline: '24/7 Leitstand',
    quickTrackPlaceholder: 'Sendungsnr. (z.B. PTX-849201)',
    quickTrackGo: 'Los',
    adminPortalBtn: 'Betriebsportal',
    adminOperations: 'Administration',
    navHome: 'Startseite',
    navTrack: 'Sendungsverfolgung',
    navServices: 'Frachtdienste',
    navCalculator: 'Tarif-Rechner',
    navNetwork: 'Hafen-Netzwerk',
    navAbout: 'Über PortX',
    navContact: 'Kontakt',
    getQuoteBtn: 'Frachtangebot',
    taglineCargo: 'Globale Fracht',

    // Hero
    heroBadge: 'Kommerzieller See- & Intermodal-Güterverkehr',
    heroTitleLine1: 'Globale Frachtschifffahrt.',
    heroTitleHighlight: 'Punktgenaue Zustellung.',
    heroDescription: 'PortX verbindet weltweite Lieferketten über Mega-Containerschiffe, Luftfracht-Charter, Schienengüterverkehr und Schwerlasttransporte mit lückenloser Satellitentelemetrie.',
    trackBoxTitle: 'Echtzeit-Sendungsverfolgung',
    liveAisStatus: 'Satelliten-AIS Signal Aktiv',
    trackInputPlaceholder: 'Sendungsnummer (z.B. PTX-849201), Container oder B/L eingeben',
    trackButton: 'Fracht Suchen',
    quickTestLabel: 'Beispiel-Nummern:',
    calculateRatesBtn: 'Frachttarife Berechnen',
    explorePortsBtn: '140+ Terminals Erkunden',
    liveFleetFeedTitle: 'Schifffahrts- & Luftfracht-Livefeed',
    onScheduleBadge: 'Pünktlich',
    inFlightBadge: 'Im Flug',
    customsAuditBadge: 'Zollprüfung',
    statOnTime: '99.8%',
    statOnTimeLabel: 'Pünktliche Frachtzustellung',
    statPorts: '140+',
    statPortsLabel: 'Verbundene Seehäfen',
    statTeu: '2.4M',
    statTeuLabel: 'TEU Jährlich Abgewickelt',
    statResponse: '< 15 min',
    statResponseLabel: 'Reaktionszeit der Disposition',

    // Tracking
    trackingHeaderBadge: 'Echtzeit-Frachtverfolgung Weltweit',
    trackingHeading: 'Sendungsverfolgung & Frachtstatus',
    trackingSubheading: 'Überwachen Sie Seecontainer, Luftfracht-Paletten und Bahnfracht mit verifizierten Kontrollpunkt-Zeitstempeln.',
    portOfLoading: 'Ladehafen (POL)',
    portOfDischarge: 'Löschhafen (POD)',
    currentCheckpoint: 'Aktueller Kontrollpunkt',
    transitProgress: 'Transportfortschritt',
    departedDate: 'Abfahrt',
    estimatedArrival: 'Voraussichtliche Ankunft',
    printWaybillBtn: 'Offiziellen Frachtbrief Drucken',
    dispatchUpdateBtn: 'Status Aktualisieren',
    milestonesTitle: 'Meilensteine & lückenlose Transportkette',
    milestonesSubtitle: 'Zeitgestempelte Kontrollpunkte, beglaubigt durch PortX-Terminals und Hafenbehörden.',
    cargoSpecsTitle: 'Fracht-Spezifikationen',
    cargoDescriptionLabel: 'Warenbezeichnung',
    grossWeightLabel: 'Bruttogewicht',
    volumeLabel: 'Volumen',
    piecesLabel: 'Packstückanzahl',
    containerIdLabel: 'Container-Nummer',
    boltSealLabel: 'Bolzen-Plombennummer',
    reeferMonitoringLabel: 'Kühlketten-Überwachung',
    customsClearanceLabel: 'Zollabfertigung',
    shipperLabel: 'Absender (Verlader)',
    consigneeLabel: 'Empfänger (Warenempfänger)',
    noShipmentFoundTitle: 'Keine Sendung Gefunden',
    noShipmentFoundText: 'Zu dieser Abfrage liegt kein Sendungseintrag vor. Bitte prüfen Sie den Frachtcode oder nutzen Sie eine der Beispielnummern.',

    // Services
    servicesBadge: 'Umfassende Frachtkompetenz',
    servicesHeading: 'Spezialisierte Logistiklösungen',
    servicesSubtitle: 'Moderne Frachtinfrastruktur für See, Luft, Schiene und Straße für reibungslose internationale Lieferketten.',
    insuredBadge: 'Vollständig Frachtversichert',
    accreditedBadge: 'IATA / FIATA Akkreditiert',
    monitoringBadge: '24/7 Überwachung',
    fullSpecsBtn: 'Technische Daten',
    bookServiceBtn: 'Service Buchen',
    closeBtn: 'Schließen',
    bookModeBtn: 'Diesen Frachtmodus Buchen',
    supportedEquipment: 'Verfügbares Equipment & Container',
    serviceGuarantees: 'Betriebliche Leistungsgarantien',
    operationalMetrics: 'Betriebskennzahlen',

    // Rate Calculator
    calcBadge: 'Echtzeit-Frachttarif-Rechner',
    calcHeading: 'Sofort-Frachtangebot & Routenplaner',
    calcSubtitle: 'Transparente Frachtkostenkalkulation inklusive Treibstoffzuschlag (BAF), Terminal-Handling (THC) und Zollabwicklung.',
    selectModeLabel: 'Transportmodus Wählen',
    originPortLabel: 'Abgangshafen / Terminal',
    destPortLabel: 'Zielhafen / Terminal',
    containerUnitLabel: 'Container- / Einheitstyp',
    grossWeightCalcLabel: 'Bruttogewicht (kg)',
    volumeCalcLabel: 'Volumen (CBM)',
    optionsHeading: 'Zusatzleistungen & Abfertigungsoptionen',
    optTerminalHandling: 'Terminalabfertigung (THC)',
    optCustoms: 'Zollabfertigung',
    optInsurance: 'All-Risk Frachtversicherung',
    estimatedQuoteTitle: 'Kaufmännisches Richtangebot',
    transitDaysEstimate: 'Geschätzte Transporttage',
    totalCostLabel: 'Gesamtkosten (USD)',
    guaranteedRateBadge: '14 Tage Preisgarantie',
    baseFreightLabel: 'Grundfracht:',
    bunkerSurchargeLabel: 'Bunkertreibstoffzuschlag (BAF 12%):',
    thcLabel: 'Terminal-Handling (THC):',
    customsEntryLabel: 'Zolleinfuhrabfertigung:',
    insuranceUnderwritingLabel: 'Allgefahren-Transportversicherung:',
    bookConsignmentBtn: 'Fracht zu diesem Tarif Buchen',
    quoteFootnote: 'Beinhaltet digitales Konnossement (B/L), 24/7 GPS-Satellitenverfolgung und zertifizierte Hafengenehmigung.',

    // Port Network
    networkBadge: 'Globale See- & Luftfahrtterminals',
    networkHeading: 'Vernetztes Welthafen-Netzwerk',
    networkSubtitle: 'Echtzeit-Umschlagszeiten, Liegeplatzkapazitäten und reguläre Schiffsankünfte an zentralen Umschlagsknoten.',
    selectedTerminalHub: 'Ausgewähltes Frachtzentrum',
    availableBerths: 'Verfügbare Frachtliegeplätze',
    terminalTypeLabel: 'Terminaltyp',
    activeVesselsLabel: 'Aktive PortX-Schiffe',
    avgContainerDwellLabel: 'Durchschnittliche Liegezeit',
    geoCoordinatesLabel: 'Geokoordinaten',
    terminalGateNoticeTitle: 'Hinweis zum Terminal-Gate:',
    terminalGateNoticeText: 'Automatisierte Einfahrt mit OCR-Kamerascannern. PortX-Kunden nutzen reservierte Lkw-Zufahrten ohne Standgeldverzögerung.',
    portCallsTitle: 'Schiffsankünfte & Liegeplatz-Matrix',
    portCallsSubtitle: 'Schiffsbewegungen im Rahmen regulärer PortX-Liniendienste.',

    // About & Trust
    aboutBadge: 'Über PortX Global Logistics',
    aboutHeading: 'Über Zwei Jahrzehnte Maritime & Intermodale Exzellenz',
    aboutP1: 'Am Hafen von Rotterdam gegründet, hat sich PortX zu einem führenden globalen Frachtführer entwickelt mit jährlich über 2,4 Millionen TEU Containerbewegungen, 350.000 Tonnen Luftfracht und 85.000 Straßentransporten.',
    aboutP2: 'Wir verbinden Industriehersteller, Pharmaunternehmen und weltweite Handelskonzerne sicher mit globalen Absatzmärkten.',
    accreditationTitle: 'Zertifizierungen & Akkreditierungen',

    // Contact
    contactBadge: '24/7 Weltweiter Frachtsupport',
    contactHeading: 'Kontakt mit der PortX Disposition',
    contactSubtitle: 'Wenden Sie sich an unsere Leitstände, fordern Sie Projektfracht-Beratung an oder kontaktieren Sie Hafenstationen.',
    contactCtaTitle: 'Benötigen Sie eine Sofort-Frachtbuchung?',
    contactCtaSubtitle: 'Nutzen Sie unseren Tarifrechner für sofortige Referenznummern und operative Freigabe.',

    // Booking Modal
    bookingModalTitle: 'Buchungsanfrage für Frachtsendung',
    bookingModalSubtitle: 'Ihre Buchung wird direkt an den PortX-Leitstand zur Raumreservierung übertragen.',
    contactNameLabel: 'Ansprechpartner *',
    companyNameLabel: 'Firma / Organisation',
    emailLabel: 'E-Mail-Adresse *',
    phoneLabel: 'Telefon / WhatsApp',
    specialHandlingLabel: 'Besondere Anforderungen / Frachtart',
    submitBookingBtn: 'Buchungsanfrage Absenden',
    cancelBtn: 'Abbrechen',
    bookingConfirmedTitle: 'Buchungsanfrage Bestätigt!',
    bookingConfirmedSubtitle: 'Ihre Anfrage wurde erfolgreich an das operative Dispositionssystem übermittelt.',
    quoteRefLabel: 'Angebots-Referenz:',
    routeLabel: 'Routenverlauf:',
    statusOperationsLabel: 'Bearbeitungsstatus:',
    doneBtn: 'Fertig',

    // Admin Portal & Login
    adminLoginRequiredBadge: 'Sicherheitsfreigabe Erforderlich',
    adminLoginHeading: 'PORTX Dispositions-Login',
    adminLoginSubtitle: 'Geschützter Bereich. Nur autorisierte Disponenten, Hafenleiter und Zollbeauftragte dürfen sich anmelden.',
    officerEmailLabel: 'Dienstliche E-Mail-Adresse',
    passwordLabel: 'Sicherheits-Passwort',
    rememberSessionLabel: 'Sitzung auf diesem Terminal speichern',
    verifyLoginBtn: 'Überprüfen & Leitstand Entsperren',
    approvedAccountsTitle: 'Autorisierte Benutzerkonten (1-Klick)',
    returnToSiteBtn: 'Zurück zur öffentlichen Sendungsverfolgung',
    terminalOsBadge: 'Terminal Operating System (TOS)',
    lockTerminalBtn: 'Terminal Sperren',
    viewTrackingSiteBtn: 'Kundenportal Anzeigen',
    newShipmentBtn: 'Neue Sendung Anlegen',
    recordCheckpointBtn: 'Neuen Meilenstein Erfassen',
    activeShipmentsKpi: 'Aktive Sendungen',
    customsHoldsKpi: 'Zollprüfungen',
    inquiriesKpi: 'Offene Anfragen',
    weightManifestedKpi: 'Manifestiertes Gewicht',
    activeManifestsTitle: 'Aktive Frachtmanifeste',
    recentPingsTitle: 'Live-Telemetrie',
    trackingCodeCol: 'Tracking / B/L',
    shipperConsigneeCol: 'Versender & Empfänger',
    routingCol: 'Route & Modus',
    containerSpecsCol: 'Container & Spezifikation',
    statusProgressCol: 'Status & Fortschritt',
    actionsCol: 'Dispositions-Aktionen',

    // Extra UI Convenience Keys
    adminDashboardTitle: 'Leitstand & Frachtdisposition',
    adminDashboardSubtitle: 'Echtzeit-Disposition für Seelinien, Frachtflugzeuge, Bahnkorridore und Zollmeilensteine.',
    pillarAeoTitle: 'AEO-F & C-TPAT Zertifiziert',
    pillarAeoDesc: 'Zugelassener Wirtschaftsbeteiligter mit bevorzugten Zollabfertigungsspuren.',
    pillarGreenTitle: 'Grüne Schifffahrt 2030',
    pillarGreenDesc: 'Bio-Bunkerkraftstoffe, LNG-Schiffe und zertifizierter CO2-Ausgleich.',
    accreditationsTitle: 'Betriebliche Akkreditierungen',
    originTerminalLabel: 'Abgangsterminal / Seehafen',
    destinationTerminalLabel: 'Zielhafen / Terminal',
    grossWeightKgLabel: 'Bruttogewicht (kg)',
    volumeCbmLabel: 'Volumen (CBM)',
    valueAddedOptions: 'Zusatz- & Zolldienstleistungen',
    optCustomsBrokerage: 'Zollabwicklung & Gestellung',
    optCargoInsurance: 'Transportversicherung (All-Risk)',
    quoteResultTitle: 'Sofortige Frachtrate',
    daysTransit: 'Tage Regellaufzeit',
    totalEstimatedCost: 'Geschätzte Gesamtkosten (USD)',
    guaranteedRatePill: '14 Tage Preisgarantie',
    baseFreightCharge: 'Basisfracht',
    bunkerSurcharge: 'Treibstoffzuschlag (BAF 12%)',
    terminalHandlingFee: 'Terminalgebühren (THC)',
    customsEntryFee: 'Zollabfertigung Einfuhr/Ausfuhr',
    insuranceUnderwritingFee: 'Transportversicherungsprämie',
    bookAtThisRateBtn: 'Sendung zu diesem Tarif buchen',
    rateIncludesFooter: 'Inklusive digitalem Konnossement (B/L), 24/7 Satellitenverfolgung und Hafengate-Pass.',
    viewSpecsBtn: 'Details & Spezifikationen',
    techSpecsTitle: 'Betriebskennzahlen',
    equipmentTypesTitle: 'Verfügbare Containertypen',
    closeModalBtn: 'Schließen',
    requestQuoteModeBtn: 'Diesen Frachtmodus buchen',
    terminalDetailsTitle: 'Terminal-Stammdaten',
    terminalNoticeTitle: 'Hinweis zum Terminal-Gate:',
    terminalNoticeBody: 'Automatisierte OCR-Zufahrt aktiv. PortX-Partner nutzen reservierte Vorfahrtspuren.',
    portCallsScheduleTitle: 'Schiffsankünfte & Liegeplatz-Matrix',
    portCallsScheduleSubtitle: 'Echtzeit-Hafenanläufe im Rahmen der PortX-Liniendienste.',
    vesselCarrierCol: 'Schiff / Reeder',
    scheduledEtaCol: 'Geplante ETA',
    berthPierCol: 'Liegeplatz / Pier',
    serviceLineCol: 'Dienstlinie'
  }
};
