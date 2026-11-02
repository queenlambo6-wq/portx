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

  // Doorstep & Pet Specific
  doorstepDeliveryBadge: string;
  doorstepDeliveryHeadline: string;
  doorstepDeliveryNotice: string;
  doorstepHandoverTitle: string;
  courierAssignedLabel: string;
  doorstepAddressLabel: string;
  callCourierBtn: string;
  petSpeciesCol: string;
  petBreedCol: string;
  microchipCol: string;
  welfareCheckTitle: string;
  hydrationLogLabel: string;
  comfortTempLabel: string;

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

  // Port Network / Care Hubs
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
    advisoryText: 'Centro de Tránsito de Mascotas: Monitoreo de Bienestar Activo',
    dispatchHotline: 'Atención 24/7 y Reparto',
    quickTrackPlaceholder: 'Nº Rastreo (ej. PET-MAD-8492)',
    quickTrackGo: 'Ir',
    adminPortalBtn: 'Portal de Operaciones',
    adminOperations: 'Operaciones',
    navHome: 'Inicio',
    navTrack: 'Rastreo de Mascotas',
    navServices: 'Servicios de Traslado',
    navCalculator: 'Calculadora de Tarifas',
    navNetwork: 'Bases de Cuidado',
    navAbout: 'Sobre PortX',
    navContact: 'Contacto',
    getQuoteBtn: 'Cotizar Traslado',
    taglineCargo: 'Pet Cargo & Doorstep',

    // Hero
    heroBadge: 'Transporte Especializado de Mascotas & Entrega en Puerta',
    heroTitleLine1: 'Transporte Seguro de Mascotas.',
    heroTitleHighlight: 'Directo a la Puerta del Destinatario.',
    heroDescription: 'Trasladamos perros, gatos y animales de compañía con el máximo bienestar: vehículos climatizados a 21°C, cuidadores veterinarios certificados y entrega en mano en la misma puerta del receptor en toda España e internacionalmente.',
    trackBoxTitle: 'Rastreo en Vivo de tu Mascota y Entrega a Domicilio',
    liveAisStatus: 'GPS y Bienestar Activo',
    trackInputPlaceholder: 'Ingrese Nº de Rastreo (ej. PET-MAD-8492) o Microchip',
    trackButton: 'Rastrear Mascota',
    quickTestLabel: 'Mascotas en Ruta a Domicilio:',
    calculateRatesBtn: 'Calcular Tarifa de Traslado',
    explorePortsBtn: 'Ver Bases de Cuidado Animal',
    liveFleetFeedTitle: 'Estado de Furgonetas y Reparto a Domicilio',
    onScheduleBadge: 'En Horario',
    inFlightBadge: 'Pet Nanny Aéreo',
    customsAuditBadge: 'Revisión Veterinaria',
    statOnTime: '100%',
    statOnTimeLabel: 'Mascotas Entregadas en Puerta',
    statPorts: '21°C',
    statPortsLabel: 'Temperatura en Cabina',
    statTeu: '12K+',
    statTeuLabel: 'Mascotas Reubicadas',
    statResponse: '< 10 min',
    statResponseLabel: 'Actualización al Receptor',

    // Tracking
    trackingHeaderBadge: 'Monitoreo en Tiempo Real de tu Mascota',
    trackingHeading: 'Seguimiento de Traslado y Entrega en Puerta',
    trackingSubheading: 'Supervise el viaje de su mascota paso a paso: descansos, hidratación, chequeo veterinario y la llegada de la furgoneta local hasta la puerta de su domicilio.',
    portOfLoading: 'Origen / Recogida',
    portOfDischarge: 'Destino / Entrega en Puerta',
    currentCheckpoint: 'Ubicación Actual del Cuidador',
    transitProgress: 'Progreso del Viaje',
    departedDate: 'Fecha de Salida',
    estimatedArrival: 'Hora Estimada en Puerta',
    printWaybillBtn: 'Imprimir Ficha de Transporte Animal',
    dispatchUpdateBtn: 'Actualizar Estado',
    milestonesTitle: 'Historial de Cuidado y Puntos de Control',
    milestonesSubtitle: 'Hitos certificados con control de temperatura, hidratación y entrega en mano firmada.',
    cargoSpecsTitle: 'Ficha de Bienestar y Datos de la Mascota',
    cargoDescriptionLabel: 'Mascota / Raza',
    grossWeightLabel: 'Peso de la Mascota',
    volumeLabel: 'Volumen Transportín',
    piecesLabel: 'Transportín IATA',
    containerIdLabel: 'Número de Microchip',
    boltSealLabel: 'Pasaporte Veterinario UE',
    reeferMonitoringLabel: 'Climatización de Cabina (21°C)',
    customsClearanceLabel: 'Aprobación Veterinaria Oficial',
    shipperLabel: 'Remitente / Criador',
    consigneeLabel: 'Destinatario (Receptor en Puerta)',
    noShipmentFoundTitle: 'No se Encontró la Mascota',
    noShipmentFoundText: 'No localizamos ningún traslado con ese código. Por favor verifique el número de rastreo o pruebe con los ejemplos disponibles.',

    // Doorstep & Pet Specific
    doorstepDeliveryBadge: 'Entrega Directa a Domicilio',
    doorstepDeliveryHeadline: 'La entrega se realiza en mano en la misma puerta del receptor',
    doorstepDeliveryNotice: 'Nuestro cuidador profesional conduce en furgoneta climatizada y sube directamente al portal y puerta del destinatario para la entrega segura de la mascota, comprobando microchip e identidad.',
    doorstepHandoverTitle: 'Protocolo de Entrega en Puerta',
    courierAssignedLabel: 'Cuidador y Conductor Asignado:',
    doorstepAddressLabel: 'Dirección Exacta de Entrega en Puerta:',
    callCourierBtn: 'Llamar al Cuidador (+34602493512)',
    petSpeciesCol: 'Especie',
    petBreedCol: 'Raza',
    microchipCol: 'Nº Microchip',
    welfareCheckTitle: 'Control de Bienestar y Confort',
    hydrationLogLabel: 'Última Hidratación:',
    comfortTempLabel: 'Temperatura de Cabina:',

    // Services
    servicesBadge: 'Servicios Profesionales de Transporte Animal',
    servicesHeading: 'Soluciones de Traslado Seguro de Mascotas',
    servicesSubtitle: 'Cuidado especializado para perros, gatos y cachorros con entrega directa en mano en el domicilio del destinatario en toda España e internacionalmente.',
    insuredBadge: 'Cobertura Veterinaria Total',
    accreditedBadge: 'Certificado IATA LAR & Bienestar Animal',
    monitoringBadge: 'Monitoreo 24/7 y Avisos en Vivo',
    fullSpecsBtn: 'Ver Detalles del Servicio',
    bookServiceBtn: 'Solicitar Traslado',
    closeBtn: 'Cerrar',
    bookModeBtn: 'Reservar esta Modalidad',
    supportedEquipment: 'Equipamiento y Transportines Homologados',
    serviceGuarantees: 'Garantías de Bienestar PortX',
    operationalMetrics: 'Métricas de Servicio',

    // Rate Calculator
    calcBadge: 'Cotizador de Traslado de Mascotas',
    calcHeading: 'Calculadora de Tarifas con Entrega en Puerta',
    calcSubtitle: 'Presupuesto inmediato para el transporte de su mascota con recogida y entrega directa a domicilio.',
    selectModeLabel: 'Modalidad de Transporte',
    originPortLabel: 'Ciudad / Base de Origen',
    destPortLabel: 'Ciudad de Destino (Entrega en Puerta)',
    containerUnitLabel: 'Tipo de Mascota y Tamaño',
    grossWeightCalcLabel: 'Peso Aproximado (kg)',
    volumeCalcLabel: 'Tamaño del Transportín',
    optionsHeading: 'Servicios de Cuidado Adicionales',
    optTerminalHandling: 'Acompañamiento Pet Nanny Personalizado',
    optCustoms: 'Gestión de Pasaporte y Certificado Veterinario',
    optInsurance: 'Seguro Médico Veterinario de Viaje',
    estimatedQuoteTitle: 'Tarifa Estimada con Entrega en Puerta',
    transitDaysEstimate: 'Tiempo Estimado de Entrega',
    totalCostLabel: 'Coste Total Estimado (EUR)',
    guaranteedRateBadge: 'Tarifa Cerrada Garantizada',
    baseFreightLabel: 'Transporte Climatizado Puerta a Puerta',
    bunkerSurchargeLabel: 'Vehículo Acondicionado y Cuidado en Ruta',
    thcLabel: 'Desinfección y Acondicionamiento de Transportín',
    customsEntryLabel: 'Revisión Veterinaria Oficial',
    insuranceUnderwritingLabel: 'Cobertura de Salud y Asistencia en Ruta',
    bookConsignmentBtn: 'Reservar Traslado a Domicilio',
    quoteFootnote: 'Tarifa incluye recogida, transporte en cabina a 21°C, paseos de descanso, hidratación continua y entrega en mano en la puerta del receptor.',

    // Port Network / Care Hubs
    networkBadge: 'Red de Cuidado Animal en España y Europa',
    networkHeading: 'Bases de Tránsito y Cuidado Veterinario',
    networkSubtitle: 'Instalaciones equipadas con zonas de paseo, veterinarios residentes y flota de furgonetas preparadas para entrega directa a domicilio.',
    selectedTerminalHub: 'Base de Tránsito Seleccionada',
    availableBerths: 'Módulos de Descanso Disponibles',
    terminalTypeLabel: 'Tipo de Instalación',
    activeVesselsLabel: 'Furgonetas en Servicio',
    avgContainerDwellLabel: 'Tiempo Promedio de Parada',
    geoCoordinatesLabel: 'Ubicación Geográfica',
    terminalGateNoticeTitle: 'Protocolo de Entrega en Puerta:',
    terminalGateNoticeText: 'Todas las entregas se realizan directamente en el domicilio del destinatario por un cuidador certificado, avisando por teléfono antes de subir a la puerta.',
    portCallsTitle: 'Rutas de Entrega Local Activas',
    portCallsSubtitle: 'Horarios de furgonetas climatizadas aproximándose a los domicilios de destino.',

    // About & Trust
    aboutBadge: 'Especialistas en Bienestar y Traslado Animal',
    aboutHeading: 'Cuidamos de tu Mascota Como si Fuera Nuestra',
    aboutP1: 'En PortX entendemos que tu mascota es parte de tu familia. Por eso, nuestro servicio no es simple mensajería, sino un traslado especializado con furgonetas adaptadas, control de temperatura continuo a 21°C, paradas programadas de paseo y cuidadores con formación veterinaria.',
    aboutP2: 'Nos aseguramos de que cada entrega se complete de forma personalizada en la misma puerta del domicilio del receptor, garantizando que el animal llegue tranquilo, hidratado y feliz a los brazos de su destinatario.',
    accreditationTitle: 'Certificaciones y Estándares de Bienestar',

    // Contact
    contactBadge: 'Atención Personalizada 24 Horas',
    contactHeading: '¿Tienes Dudas sobre el Traslado de tu Mascota?',
    contactSubtitle: 'Nuestro equipo de atención al cliente y coordinadores de reparto a domicilio están disponibles para resolver cualquier duda.',
    contactCtaTitle: 'Línea Directa de Coordinación de Mascotas',
    contactCtaSubtitle: 'Llámanos o escríbenos por WhatsApp al +34602493512 para consultar disponibilidad o conocer el estado de tu entrega.',

    // Booking Modal
    bookingModalTitle: 'Solicitar Reserva de Transporte de Mascota',
    bookingModalSubtitle: 'Completa los datos de tu mascota y la dirección de entrega en puerta.',
    contactNameLabel: 'Nombre del Remitente',
    companyNameLabel: 'Tipo de Reserva (Particular / Adopción / Criador)',
    emailLabel: 'Correo Electrónico',
    phoneLabel: 'Teléfono de Contacto (WhatsApp)',
    specialHandlingLabel: 'Nombre de la Mascota, Raza, Cuidados y Dirección de Entrega en Puerta',
    submitBookingBtn: 'Confirmar Solicitud de Traslado',
    cancelBtn: 'Cancelar',
    bookingConfirmedTitle: '¡Solicitud Registrada con Éxito!',
    bookingConfirmedSubtitle: 'Un coordinador de PortX se pondrá en contacto para coordinar la recogida y la entrega en la puerta del destinatario.',
    quoteRefLabel: 'Referencia de Reserva:',
    routeLabel: 'Ruta Seleccionada:',
    statusOperationsLabel: 'Estado:',
    doneBtn: 'Aceptar',

    // Admin Portal & Login
    adminLoginRequiredBadge: 'Acceso Restringido a Oficiales',
    adminLoginHeading: 'Consola de Despacho y Cuidado Animal',
    adminLoginSubtitle: 'Acceso reservado exclusivamente para coordinadores de ruta, veterinarios y conductores autorizados.',
    officerEmailLabel: 'Correo Electrónico Autorizado',
    passwordLabel: 'Contraseña de Acceso',
    rememberSessionLabel: 'Recordar sesión en este equipo',
    verifyLoginBtn: 'Verificar y Acceder a la Consola',
    approvedAccountsTitle: 'Oficiales Autorizados',
    returnToSiteBtn: 'Regresar al Sitio Público de Rastreo',
    terminalOsBadge: 'Consola Operativa PortX',
    lockTerminalBtn: 'Cerrar Sesión',
    viewTrackingSiteBtn: 'Ver Sitio de Rastreo',
    newShipmentBtn: 'Registrar Nueva Mascota',
    recordCheckpointBtn: 'Añadir Actualización de Cuidado',
    activeShipmentsKpi: 'Mascotas en Ruta',
    customsHoldsKpi: 'Revisiones Médicas',
    inquiriesKpi: 'Solicitudes Pendientes',
    weightManifestedKpi: 'Entregas a Domicilio Hoy',
    activeManifestsTitle: 'Mascotas en Transporte Activo',
    recentPingsTitle: 'Telemetría de Cabina y Bienestar',
    trackingCodeCol: 'Código de Rastreo / Mascota',
    shipperConsigneeCol: 'Remitente y Destinatario en Puerta',
    routingCol: 'Ruta y Destino',
    containerSpecsCol: 'Mascota / Microchip / Transportín',
    statusProgressCol: 'Progreso y Estado en Puerta',
    actionsCol: 'Acciones',

    // Extra UI Convenience Keys
    adminDashboardTitle: 'Panel de Control de Transporte de Mascotas',
    adminDashboardSubtitle: 'Gestión en tiempo real de furgonetas climatizadas, telemetría de bienestar animal y entregas locales a domicilio.',
    pillarAeoTitle: 'Cumplimiento IATA LAR',
    pillarAeoDesc: 'Estricto seguimiento de la normativa internacional de transporte de animales vivos.',
    pillarGreenTitle: 'Furgonetas Eco-Confort',
    pillarGreenDesc: 'Vehículos con suspensión suave, climatización independiente y reducción de ruidos.',
    accreditationsTitle: 'Garantías y Certificados',
    originTerminalLabel: 'Origen / Punto de Recogida',
    destinationTerminalLabel: 'Destino / Domicilio del Receptor',
    grossWeightKgLabel: 'Peso de la Mascota (kg)',
    volumeCbmLabel: 'Dimensiones Transportín',
    valueAddedOptions: 'Servicios Especiales de Bienestar',
    optCustomsBrokerage: 'Pasaporte Veterinario y Despacho',
    optCargoInsurance: 'Seguro Médico de Viaje',
    quoteResultTitle: 'Tarifa Estimada de Traslado',
    daysTransit: 'Horas / Días Estimados',
    totalEstimatedCost: 'Coste Total Estimado (EUR)',
    guaranteedRatePill: 'Tarifa Garantizada con Entrega en Puerta',
    baseFreightCharge: 'Traslado Terrestre / Aéreo Climatizado',
    bunkerSurcharge: 'Mantenimiento de Temperatura 21°C',
    terminalHandlingFee: 'Atención y Cuidados en Ruta',
    customsEntryFee: 'Chequeo Veterinario y Validación de Microchip',
    insuranceUnderwritingFee: 'Seguro de Asistencia Veterinaria',
    bookAtThisRateBtn: 'Reservar Traslado a Domicilio',
    rateIncludesFooter: 'Incluye furgoneta climatizada, cuidador certificado, paradas de paseo y entrega en mano en la puerta del receptor.',
    viewSpecsBtn: 'Ver Ficha',
    techSpecsTitle: 'Condiciones de Transporte',
    equipmentTypesTitle: 'Transportines Homologados',
    closeModalBtn: 'Cerrar',
    requestQuoteModeBtn: 'Solicitar Esta Modalidad',
    terminalDetailsTitle: 'Ficha de la Base de Cuidado',
    terminalNoticeTitle: 'Compromiso de Entrega en Puerta:',
    terminalNoticeBody: 'Nuestras furgonetas locales entregan a tu mascota en la puerta de tu casa. El conductor se comunica previamente para coordinar la recepción en mano.',
    portCallsScheduleTitle: 'Plan de Rutas Locales y Entregas en Domicilio',
    portCallsScheduleSubtitle: 'Horarios estimados de llegada a destinos urbanos en España.',
    vesselCarrierCol: 'Furgoneta / Conductor',
    scheduledEtaCol: 'Hora Prevista en Puerta',
    berthPierCol: 'Zona de Reparto',
    serviceLineCol: 'Servicio'
  },

  en: {
    // Topbar & Nav
    advisoryText: 'Pet Transit Operations: Live Animal Welfare Active',
    dispatchHotline: '24/7 Pet Care & Doorstep Delivery',
    quickTrackPlaceholder: 'Track ID (e.g. PET-MAD-8492)',
    quickTrackGo: 'Go',
    adminPortalBtn: 'Operations Portal',
    adminOperations: 'Admin Ops',
    navHome: 'Home',
    navTrack: 'Pet Tracking',
    navServices: 'Pet Relocation Services',
    navCalculator: 'Rate Calculator',
    navNetwork: 'Care Hubs',
    navAbout: 'About PortX',
    navContact: 'Contact',
    getQuoteBtn: 'Get Pet Quote',
    taglineCargo: 'Pet Cargo & Doorstep',

    // Hero
    heroBadge: 'Specialized Pet Transport & Doorstep Delivery',
    heroTitleLine1: 'Safe Pet Transport.',
    heroTitleHighlight: 'Directly to the Receiver\'s Doorstep.',
    heroDescription: 'We relocate dogs, cats, and pets with superior welfare: climate-controlled vans at 21°C, certified pet handlers, and direct handover right to the receiver\'s front door across Spain and internationally.',
    trackBoxTitle: 'Live Pet Tracking & Doorstep Delivery',
    liveAisStatus: 'GPS & Welfare Connected',
    trackInputPlaceholder: 'Enter Tracking # (e.g. PET-MAD-8492) or Microchip ID',
    trackButton: 'Track Pet',
    quickTestLabel: 'Pets En Route to Doorstep:',
    calculateRatesBtn: 'Calculate Pet Relocation',
    explorePortsBtn: 'View Animal Care Hubs',
    liveFleetFeedTitle: 'Live Pet Vans & Doorstep Feed',
    onScheduleBadge: 'On Schedule',
    inFlightBadge: 'Air Pet Nanny',
    customsAuditBadge: 'Vet Inspection',
    statOnTime: '100%',
    statOnTimeLabel: 'Happy Pets Delivered to Doorstep',
    statPorts: '21°C',
    statPortsLabel: 'Climate Cabin Temp',
    statTeu: '12K+',
    statTeuLabel: 'Pets Safely Relocated',
    statResponse: '< 10 min',
    statResponseLabel: 'Receiver Updates',

    // Tracking
    trackingHeaderBadge: 'Real-Time Pet Monitoring',
    trackingHeading: 'Pet Journey & Doorstep Tracking',
    trackingSubheading: 'Follow every step of your pet\'s trip: hydration, comfort stops, veterinary clearance, and local van arrival right at the receiver\'s door.',
    portOfLoading: 'Pickup Origin',
    portOfDischarge: 'Doorstep Delivery Address',
    currentCheckpoint: 'Current Handler Location',
    transitProgress: 'Trip Progress',
    departedDate: 'Departed',
    estimatedArrival: 'Estimated Doorstep Time',
    printWaybillBtn: 'Print Pet Travel Certificate',
    dispatchUpdateBtn: 'Update Status',
    milestonesTitle: 'Care Log & Chain of Custody',
    milestonesSubtitle: 'Certified milestones including temperature logs, hydration, and signed doorstep handover.',
    cargoSpecsTitle: 'Pet Details & Welfare Card',
    cargoDescriptionLabel: 'Pet / Breed',
    grossWeightLabel: 'Pet Weight',
    volumeLabel: 'Kennel Volume',
    piecesLabel: 'IATA Travel Crate',
    containerIdLabel: 'Microchip ID',
    boltSealLabel: 'EU Pet Passport #',
    reeferMonitoringLabel: 'Cabin Climate Control (21°C)',
    customsClearanceLabel: 'Official Vet Clearance',
    shipperLabel: 'Sender / Breeder / Family',
    consigneeLabel: 'Receiver at Doorstep',
    noShipmentFoundTitle: 'No Pet Record Found',
    noShipmentFoundText: 'We couldn\'t find a shipment with that tracking code. Please verify the code or try one of the samples.',

    // Doorstep & Pet Specific
    doorstepDeliveryBadge: 'Direct Doorstep Delivery',
    doorstepDeliveryHeadline: 'Delivery is completed locally right to the receiver\'s front door',
    doorstepDeliveryNotice: 'Our certified handler travels in a climate-controlled van and brings your pet right up to the receiver\'s apartment or house door, verifying microchip and receiving signature.',
    doorstepHandoverTitle: 'Doorstep Handover Protocol',
    courierAssignedLabel: 'Assigned Driver & Pet Handler:',
    doorstepAddressLabel: 'Receiver Doorstep Address:',
    callCourierBtn: 'Call Handler (+34602493512)',
    petSpeciesCol: 'Species',
    petBreedCol: 'Breed',
    microchipCol: 'Microchip #',
    welfareCheckTitle: 'Welfare & Comfort Status',
    hydrationLogLabel: 'Last Hydration:',
    comfortTempLabel: 'Cabin Temperature:',

    // Services
    servicesBadge: 'Professional Animal Transport Services',
    servicesHeading: 'Gentle & Secure Pet Travel Solutions',
    servicesSubtitle: 'Comprehensive pet relocation with certified handlers and local doorstep delivery throughout Spain and worldwide.',
    insuredBadge: 'Full Veterinary Coverage',
    accreditedBadge: 'IATA LAR & Animal Welfare Certified',
    monitoringBadge: '24/7 Welfare Telemetry',
    fullSpecsBtn: 'View Details',
    bookServiceBtn: 'Book Pet Relocation',
    closeBtn: 'Close',
    bookModeBtn: 'Book this Service',
    supportedEquipment: 'Approved IATA Crates & Equipment',
    serviceGuarantees: 'PortX Pet Welfare Guarantees',
    operationalMetrics: 'Service Metrics',

    // Rate Calculator
    calcBadge: 'Pet Travel Calculator',
    calcHeading: 'Instant Quote with Doorstep Delivery',
    calcSubtitle: 'Immediate pricing for your pet relocation including home pickup and doorstep delivery.',
    selectModeLabel: 'Transport Method',
    originPortLabel: 'Origin City / Pet Hub',
    destPortLabel: 'Destination City (Doorstep)',
    containerUnitLabel: 'Pet Type & Size',
    grossWeightCalcLabel: 'Approx Weight (kg)',
    volumeCalcLabel: 'Crate Dimensions',
    optionsHeading: 'Additional Care Services',
    optTerminalHandling: 'Personalized Pet Nanny In-Cabin',
    optCustoms: 'EU Pet Passport & Vet Certificate',
    optInsurance: 'Comprehensive Pet Travel Medical Insurance',
    estimatedQuoteTitle: 'Estimated Rate (Doorstep Included)',
    transitDaysEstimate: 'Estimated Transit Time',
    totalCostLabel: 'Total Estimated Cost (EUR)',
    guaranteedRateBadge: 'Guaranteed Fixed Rate',
    baseFreightLabel: 'Doorstep Climate-Controlled Transit',
    bunkerSurchargeLabel: 'Active 21°C Temperature Maintenance',
    thcLabel: 'IATA Travel Crate Sanitization',
    customsEntryLabel: 'Official Veterinary Health Check',
    insuranceUnderwritingLabel: 'Veterinary Travel Insurance',
    bookConsignmentBtn: 'Book Doorstep Delivery',
    quoteFootnote: 'Rate includes doorstep pickup, 21°C climate van, rest stops, continuous hydration, and in-person handover at receiver\'s door.',

    // Port Network / Care Hubs
    networkBadge: 'Animal Care Network in Spain & Europe',
    networkHeading: 'Pet Transit Hubs & Vet Stations',
    networkSubtitle: 'Modern facilities featuring green exercise areas, resident veterinarians, and doorstep delivery fleet.',
    selectedTerminalHub: 'Selected Care Hub',
    availableBerths: 'Available Rest Suites',
    terminalTypeLabel: 'Facility Type',
    activeVesselsLabel: 'Active Doorstep Vans',
    avgContainerDwellLabel: 'Average Rest Stop',
    geoCoordinatesLabel: 'Coordinates',
    terminalGateNoticeTitle: 'Doorstep Delivery Promise:',
    terminalGateNoticeText: 'All final deliveries are completed locally right to the receiver\'s front door by a certified handler with advance phone notification.',
    portCallsTitle: 'Active Local Doorstep Routes',
    portCallsSubtitle: 'Live schedule of climate vans approaching receiver doorsteps across Spain.',

    // About & Trust
    aboutBadge: 'Passionate Animal Welfare Specialists',
    aboutHeading: 'Caring for Your Pet as Family',
    aboutP1: 'At PortX, we know pets are family members. That\'s why our service is not standard cargo, but dedicated companion animal travel featuring climate-controlled vehicles, continuous 21°C monitoring, scheduled walk breaks, and veterinary-trained staff.',
    aboutP2: 'We ensure every journey ends with personal handover right at the receiver\'s doorstep, ensuring animals arrive calm, hydrated, and ready for happy reunions.',
    accreditationTitle: 'Certifications & Welfare Standards',

    // Contact
    contactBadge: '24/7 Dedicated Support',
    contactHeading: 'Questions About Your Pet\'s Trip?',
    contactSubtitle: 'Our pet care coordinators and doorstep dispatchers are always available.',
    contactCtaTitle: 'Direct Pet Coordination Line',
    contactCtaSubtitle: 'Call or WhatsApp us at +34602493512 to schedule travel or check real-time status.',

    // Booking Modal
    bookingModalTitle: 'Request Pet Transport Booking',
    bookingModalSubtitle: 'Provide pet information and the receiver\'s doorstep delivery address.',
    contactNameLabel: 'Sender Name',
    companyNameLabel: 'Booking Type (Private / Breeder / Adoption)',
    emailLabel: 'Email Address',
    phoneLabel: 'Contact Phone (WhatsApp)',
    specialHandlingLabel: 'Pet Name, Breed, Special Care, and Receiver Doorstep Address',
    submitBookingBtn: 'Submit Pet Booking',
    cancelBtn: 'Cancel',
    bookingConfirmedTitle: 'Pet Booking Received!',
    bookingConfirmedSubtitle: 'A PortX coordinator will contact you shortly to confirm pickup and doorstep delivery schedule.',
    quoteRefLabel: 'Booking Reference:',
    routeLabel: 'Route:',
    statusOperationsLabel: 'Status:',
    doneBtn: 'Done',

    // Admin Portal & Login
    adminLoginRequiredBadge: 'Officer Authorization Required',
    adminLoginHeading: 'Pet Dispatch & Welfare Console',
    adminLoginSubtitle: 'Restricted access for certified route dispatchers, veterinarians, and authorized couriers only.',
    officerEmailLabel: 'Authorized Officer Email',
    passwordLabel: 'Security Password',
    rememberSessionLabel: 'Remember session on this device',
    verifyLoginBtn: 'Verify and Unlock Console',
    approvedAccountsTitle: 'Authorized Officers',
    returnToSiteBtn: 'Return to Public Tracking Site',
    terminalOsBadge: 'PortX Pet Operations OS',
    lockTerminalBtn: 'Lock Console',
    viewTrackingSiteBtn: 'View Public Tracking',
    newShipmentBtn: 'Register New Pet',
    recordCheckpointBtn: 'Log Welfare Update',
    activeShipmentsKpi: 'Pets in Transit',
    customsHoldsKpi: 'Vet Inspections',
    inquiriesKpi: 'Pending Requests',
    weightManifestedKpi: 'Doorstep Deliveries Today',
    activeManifestsTitle: 'Active Pet Manifests',
    recentPingsTitle: 'Cabin Telemetry & Welfare Feeds',
    trackingCodeCol: 'Track Code / Pet Name',
    shipperConsigneeCol: 'Sender & Doorstep Receiver',
    routingCol: 'Route & Destination',
    containerSpecsCol: 'Pet / Microchip / Crate',
    statusProgressCol: 'Progress & Doorstep Status',
    actionsCol: 'Actions',

    // Extra UI Convenience Keys
    adminDashboardTitle: 'Pet Transport Command Center',
    adminDashboardSubtitle: 'Real-time monitoring of climate-controlled vans, animal welfare telemetry, and doorstep handovers.',
    pillarAeoTitle: 'IATA LAR Compliance',
    pillarAeoDesc: 'Strict compliance with international Live Animals Regulations.',
    pillarGreenTitle: 'Eco-Comfort Fleet',
    pillarGreenDesc: 'Electric and hybrid vans with soft suspension and acoustic soundproofing.',
    accreditationsTitle: 'Guarantees & Accreditations',
    originTerminalLabel: 'Pickup Origin / Station',
    destinationTerminalLabel: 'Destination / Receiver Doorstep',
    grossWeightKgLabel: 'Pet Weight (kg)',
    volumeCbmLabel: 'Crate Dimensions',
    valueAddedOptions: 'Welfare Add-ons',
    optCustomsBrokerage: 'Pet Passport & Vet Clearance',
    optCargoInsurance: 'Veterinary Travel Insurance',
    quoteResultTitle: 'Instant Travel Estimate',
    daysTransit: 'Estimated Transit Hours',
    totalEstimatedCost: 'Total Estimated Cost (EUR)',
    guaranteedRatePill: 'Fixed Doorstep Delivery Rate',
    baseFreightCharge: 'Climate Doorstep Van Transit',
    bunkerSurcharge: 'Active 21°C Cabin Temperature Control',
    terminalHandlingFee: 'En-Route Walking & Care Stops',
    customsEntryFee: 'Microchip Check & Vet Audit',
    insuranceUnderwritingFee: 'Medical Emergency Coverage',
    bookAtThisRateBtn: 'Book Doorstep Delivery',
    rateIncludesFooter: 'Includes climate-controlled van, certified handler, hydration, and direct delivery to receiver\'s doorstep.',
    viewSpecsBtn: 'View Specs',
    techSpecsTitle: 'Transport Conditions',
    equipmentTypesTitle: 'Approved IATA Kennels',
    closeModalBtn: 'Close',
    requestQuoteModeBtn: 'Book this Service',
    terminalDetailsTitle: 'Care Hub Profile',
    terminalNoticeTitle: 'Doorstep Delivery Commitment:',
    terminalNoticeBody: 'All deliveries are performed locally directly to the receiver\'s door. The driver calls ahead to ensure a seamless in-person handover.',
    portCallsScheduleTitle: 'Local Doorstep Delivery Schedules',
    portCallsScheduleSubtitle: 'Scheduled arrivals for climate vans across Spanish cities.',
    vesselCarrierCol: 'Van / Driver',
    scheduledEtaCol: 'Estimated Doorstep Time',
    berthPierCol: 'Delivery Sector',
    serviceLineCol: 'Service'
  },

  de: {
    // Topbar & Nav
    advisoryText: 'Tierpflege- und Tiertransportzentrum: Live-Tierwohl aktiv',
    dispatchHotline: '24/7 Tierbetreuung & Haustürzustellung',
    quickTrackPlaceholder: 'Sendungs-Nr. (z.B. PET-MAD-8492)',
    quickTrackGo: 'Los',
    adminPortalBtn: 'Betriebsportal',
    adminOperations: 'Administration',
    navHome: 'Startseite',
    navTrack: 'Haustier-Tracking',
    navServices: 'Transportdienste',
    navCalculator: 'Tarifrechner',
    navNetwork: 'Pflegestationen',
    navAbout: 'Über PortX',
    navContact: 'Kontakt',
    getQuoteBtn: 'Angebot anfordern',
    taglineCargo: 'Tiertransport & Haustürzustellung',

    // Hero
    heroBadge: 'Spezialisierter Tiertransport & Haustürzustellung',
    heroTitleLine1: 'Sicherer Tiertransport.',
    heroTitleHighlight: 'Direkt an die Haustür des Empfängers.',
    heroDescription: 'Wir transportieren Hunde, Katzen und Haustiere mit höchstem Wohlbefinden: klimatisierte Fahrzeuge bei 21°C, zertifizierte Tierpfleger und persönliche Übergabe an der Wohnungstür in ganz Spanien und Europa.',
    trackBoxTitle: 'Live-Tracking Ihres Haustiers und Zustellung',
    liveAisStatus: 'GPS & Tierwohl Aktiv',
    trackInputPlaceholder: 'Sendungs-Nr. (z.B. PET-MAD-8492) oder Mikrochip-ID',
    trackButton: 'Haustier Finden',
    quickTestLabel: 'Tiere auf dem Weg zur Haustür:',
    calculateRatesBtn: 'Transport berechnen',
    explorePortsBtn: 'Pflegestationen ansehen',
    liveFleetFeedTitle: 'Live-Zustellflotte & Hauslieferungen',
    onScheduleBadge: 'Pünktlich',
    inFlightBadge: 'Flug-Tiersitter',
    customsAuditBadge: 'Tierärztliche Prüfung',
    statOnTime: '100%',
    statOnTimeLabel: 'Glücklich an der Haustür übergeben',
    statPorts: '21°C',
    statPortsLabel: 'Konstante Kabinentemperatur',
    statTeu: '12K+',
    statTeuLabel: 'Erfolgreich umgesiedelte Tiere',
    statResponse: '< 10 min',
    statResponseLabel: 'Status-Updates',

    // Tracking
    trackingHeaderBadge: 'Echtzeit-Überwachung Ihres Lieblings',
    trackingHeading: 'Reiseverlauf & Zustellung an die Haustür',
    trackingSubheading: 'Verfolgen Sie jeden Schritt: Trinkpausen, Gassirunden, tierärztliche Freigabe und die Ankunft an Ihrer Haustür.',
    portOfLoading: 'Abholort',
    portOfDischarge: 'Zustelladresse an der Haustür',
    currentCheckpoint: 'Aktueller Standort des Betreuers',
    transitProgress: 'Reisefortschritt',
    departedDate: 'Abfahrt',
    estimatedArrival: 'Voraussichtliche Ankunft an der Haustür',
    printWaybillBtn: 'Tierbegleitschein Drucken',
    dispatchUpdateBtn: 'Status Aktualisieren',
    milestonesTitle: 'Pflegeprotokoll & Meilensteine',
    milestonesSubtitle: 'Zertifizierte Kontrollpunkte inklusive Temperatur, Fütterung und digitaler Unterschrift an der Haustür.',
    cargoSpecsTitle: 'Tierdaten & Wohlfühlpass',
    cargoDescriptionLabel: 'Tier / Rasse',
    grossWeightLabel: 'Gewicht des Tiers',
    volumeLabel: 'Transportbox-Volumen',
    piecesLabel: 'IATA Transportbox',
    containerIdLabel: 'Mikrochip-Nummer',
    boltSealLabel: 'EU-Heimtierausweis #',
    reeferMonitoringLabel: 'Klimatisierung (21°C)',
    customsClearanceLabel: 'Offizielle Tierarztfreigabe',
    shipperLabel: 'Absender / Züchter / Familie',
    consigneeLabel: 'Empfänger an der Haustür',
    noShipmentFoundTitle: 'Kein Eintrag gefunden',
    noShipmentFoundText: 'Unter dieser Nummer wurde kein Transport gefunden. Bitte prüfen Sie den Code.',

    // Doorstep & Pet Specific
    doorstepDeliveryBadge: 'Lokale Haustürzustellung',
    doorstepDeliveryHeadline: 'Die Übergabe erfolgt persönlich direkt an der Haustür des Empfängers',
    doorstepDeliveryNotice: 'Unser geschulter Tierbetreuer fährt im klimatisierten Transporter vor und bringt das Tier persönlich bis an die Wohnungstür mit Chipüberprüfung.',
    doorstepHandoverTitle: 'Haustür-Übergabeprotokoll',
    courierAssignedLabel: 'Zustellfahrer & Tierbetreuer:',
    doorstepAddressLabel: 'Genaue Haustür-Zustelladresse:',
    callCourierBtn: 'Betreuer Anrufen (+34602493512)',
    petSpeciesCol: 'Tierart',
    petBreedCol: 'Rasse',
    microchipCol: 'Mikrochip-Nr.',
    welfareCheckTitle: 'Wohlbefinden & Komfortstatus',
    hydrationLogLabel: 'Letzte Flüssigkeitszufuhr:',
    comfortTempLabel: 'Kabinentemperatur:',

    // Services
    servicesBadge: 'Professionelle Tiertransport-Dienste',
    servicesHeading: 'Sichere & Liebevolle Tiertransporte',
    servicesSubtitle: 'Spezialisierter Transport für Hunde, Katzen und Welpen mit persönlicher Haustürzustellung in Spanien und europaweit.',
    insuredBadge: 'Tierärztliche Vollabdeckung',
    accreditedBadge: 'IATA LAR & Tierschutz-Zertifiziert',
    monitoringBadge: '24/7 Telemetrie & Wohlfühlkontrolle',
    fullSpecsBtn: 'Details ansehen',
    bookServiceBtn: 'Transport buchen',
    closeBtn: 'Schließen',
    bookModeBtn: 'Diese Option wählen',
    supportedEquipment: 'Zugelassene IATA-Transportboxen',
    serviceGuarantees: 'PortX Tierwohl-Garantien',
    operationalMetrics: 'Betriebskennzahlen',

    // Rate Calculator
    calcBadge: 'Tiertransport-Rechner',
    calcHeading: 'Sofortpreis mit Haustürzustellung',
    calcSubtitle: 'Direkte Preiskalkulation inklusive Abholung und Lieferung bis an die Haustür.',
    selectModeLabel: 'Transportart',
    originPortLabel: 'Abholstadt / Station',
    destPortLabel: 'Zielstadt (Haustür)',
    containerUnitLabel: 'Tierart & Größe',
    grossWeightCalcLabel: 'Ungefähres Gewicht (kg)',
    volumeCalcLabel: 'Transportbox-Größe',
    optionsHeading: 'Zusätzliche Betreuung',
    optTerminalHandling: 'Persönliche Flugbegleitung (Pet Nanny)',
    optCustoms: 'EU-Heimtierausweis & Tierarztprüfung',
    optInsurance: 'Umfassende Reisekrankenversicherung für Tiere',
    estimatedQuoteTitle: 'Geschätzter Preis inkl. Haustürzustellung',
    transitDaysEstimate: 'Geschätzte Reisezeit',
    totalCostLabel: 'Gesamtpreis (EUR)',
    guaranteedRateBadge: 'Festpreis-Garantie',
    baseFreightLabel: 'Klimatisierter Haustür-Transport',
    bunkerSurchargeLabel: '21°C Temperaturüberwachung',
    thcLabel: 'IATA-Box Desinfektion & Vorbereitung',
    customsEntryLabel: 'Tierärztlicher Gesundheitscheck',
    insuranceUnderwritingLabel: 'Tierkrankenversicherung auf Reisen',
    bookConsignmentBtn: 'Haustürzustellung buchen',
    quoteFootnote: 'Tarif beinhaltet Abholung, klimatisierten Transporter bei 21°C, Gassipausen, frisches Wasser und persönliche Übergabe an der Wohnungstür.',

    // Port Network / Care Hubs
    networkBadge: 'Tierpflegenetz in Spanien & Europa',
    networkHeading: 'Pflegestationen & Tierarztzentren',
    networkSubtitle: 'Moderne Einrichtungen mit Auslaufflächen, Tierärzten und Transporterflotte für direkte Hauszustellung.',
    selectedTerminalHub: 'Ausgewählte Pflegestation',
    availableBerths: 'Freie Ruheräume',
    terminalTypeLabel: 'Einrichtungstyp',
    activeVesselsLabel: 'Transporter im Einsatz',
    avgContainerDwellLabel: 'Durchschnittliche Rastzeit',
    geoCoordinatesLabel: 'Koordinaten',
    terminalGateNoticeTitle: 'Haustür-Versprechen:',
    terminalGateNoticeText: 'Alle Lieferungen erfolgen durch zertifizierte Betreuer direkt an die Tür des Empfängers mit vorheriger telefonischer Ankündigung.',
    portCallsTitle: 'Aktuelle Haustür-Zustellrouten',
    portCallsSubtitle: 'Fahrpläne der klimatisierten Transporter in spanischen Städten.',

    // About & Trust
    aboutBadge: 'Leidenschaftliche Tierschutz-Spezialisten',
    aboutHeading: 'Wir behandeln Ihr Haustier wie Familie',
    aboutP1: 'Bei PortX wissen wir, dass Haustiere Familienmitglieder sind. Deshalb bieten wir keine normale Fracht, sondern einfühlsamen Tiertransport mit klimatisierten Fahrzeugen (21°C), regelmäßigen Pausen und tierärztlich geschulten Betreuern.',
    aboutP2: 'Jede Reise endet mit der persönlichen Übergabe an der Haustür des Empfängers, damit Tiere entspannt, hydriert und glücklich ankommen.',
    accreditationTitle: 'Zertifikate & Tierschutzstandards',

    // Contact
    contactBadge: '24/7 Betreuung',
    contactHeading: 'Fragen zur Reise Ihres Haustiers?',
    contactSubtitle: 'Unsere Betreuungsteams und Disponenten sind jederzeit für Sie da.',
    contactCtaTitle: 'Direkte Betreuungshotline',
    contactCtaSubtitle: 'Rufen Sie an oder schreiben Sie per WhatsApp an +34602493512.',

    // Booking Modal
    bookingModalTitle: 'Tiertransport Buchen',
    bookingModalSubtitle: 'Geben Sie die Daten Ihres Lieblings und die Haustüradresse an.',
    contactNameLabel: 'Name des Absenders',
    companyNameLabel: 'Buchungsart (Privat / Züchter / Adoption)',
    emailLabel: 'E-Mail-Adresse',
    phoneLabel: 'Telefon (WhatsApp)',
    specialHandlingLabel: 'Tiername, Rasse, Besonderheiten & Haustüradresse',
    submitBookingBtn: 'Transport Verbindlich Anfragen',
    cancelBtn: 'Abbrechen',
    bookingConfirmedTitle: 'Buchungsanfrage Erhalten!',
    bookingConfirmedSubtitle: 'Ein PortX-Koordinator wird sich umgehend mit Ihnen in Verbindung setzen.',
    quoteRefLabel: 'Buchungsreferenz:',
    routeLabel: 'Gewählte Route:',
    statusOperationsLabel: 'Status:',
    doneBtn: 'Fertig',

    // Admin Portal & Login
    adminLoginRequiredBadge: 'Sicherheitsfreigabe Erforderlich',
    adminLoginHeading: 'Tiertransport-Leitstelle',
    adminLoginSubtitle: 'Zugang ausschließlich für autorisierte Disponenten, Tierärzte und Kuriere.',
    officerEmailLabel: 'Autorisierte E-Mail',
    passwordLabel: 'Zugangspasswort',
    rememberSessionLabel: 'Auf diesem Gerät angemeldet bleiben',
    verifyLoginBtn: 'Überprüfen und Anmelden',
    approvedAccountsTitle: 'Autorisierte Offiziere',
    returnToSiteBtn: 'Zurück zur öffentlichen Tracking-Seite',
    terminalOsBadge: 'PortX Tier-Betriebssystem',
    lockTerminalBtn: 'Abmelden',
    viewTrackingSiteBtn: 'Tracking-Seite aufrufen',
    newShipmentBtn: 'Neues Tier Registrieren',
    recordCheckpointBtn: 'Wohlfühl-Update Eintragen',
    activeShipmentsKpi: 'Tiere Unterwegs',
    customsHoldsKpi: 'Tierarzt-Checks',
    inquiriesKpi: 'Offene Anfragen',
    weightManifestedKpi: 'Haustür-Lieferungen Heute',
    activeManifestsTitle: 'Aktive Tiertransporte',
    recentPingsTitle: 'Kabinen-Telemetrie & Tierwohl',
    trackingCodeCol: 'Tracking-Code / Tiername',
    shipperConsigneeCol: 'Absender & Haustür-Empfänger',
    routingCol: 'Route & Ziel',
    containerSpecsCol: 'Tier / Chip / Box',
    statusProgressCol: 'Fortschritt & Haustürstatus',
    actionsCol: 'Aktionen',

    // Extra UI Convenience Keys
    adminDashboardTitle: 'Leitzentrale für Tiertransporte',
    adminDashboardSubtitle: 'Echtzeit-Überwachung klimatisierter Transporter, Tierwohl-Telemetrie und Haustürzustellungen.',
    pillarAeoTitle: 'IATA LAR Richtlinien',
    pillarAeoDesc: 'Strikte Einhaltung der internationalen Richtlinien für den Transport lebender Tiere.',
    pillarGreenTitle: 'Öko-Komfort-Flotte',
    pillarGreenDesc: 'Fahrzeuge mit sanfter Federung, geräuscharmer Kabine und Klimakontrolle.',
    accreditationsTitle: 'Garantien & Zertifikate',
    originTerminalLabel: 'Abholort',
    destinationTerminalLabel: 'Zieladresse / Haustür',
    grossWeightKgLabel: 'Gewicht (kg)',
    volumeCbmLabel: 'Box-Abmessungen',
    valueAddedOptions: 'Wohlfühl-Optionen',
    optCustomsBrokerage: 'Heimtierausweis & Veterinärfreigabe',
    optCargoInsurance: 'Reisekrankenversicherung',
    quoteResultTitle: 'Sofortige Tarifübersicht',
    daysTransit: 'Geschätzte Fahrzeit',
    totalEstimatedCost: 'Gesamtpreis (EUR)',
    guaranteedRatePill: 'Festpreis mit Haustürgarantie',
    baseFreightCharge: 'Klimatisierter Haustür-Transport',
    bunkerSurcharge: '21°C Temperaturüberwachung',
    terminalHandlingFee: 'Gassirunden & Betreuung',
    customsEntryFee: 'Tierärztliche Kontrolle & Chipprüfung',
    insuranceUnderwritingFee: 'Notfall-Versicherungsschutz',
    bookAtThisRateBtn: 'Haustürzustellung buchen',
    rateIncludesFooter: 'Inklusive klimatisierter Transporter, Tierpfleger, Trinkwasser und persönlicher Übergabe an der Wohnungstür.',
    viewSpecsBtn: 'Details',
    techSpecsTitle: 'Transportbedingungen',
    equipmentTypesTitle: 'Zugelassene IATA-Boxen',
    closeModalBtn: 'Schließen',
    requestQuoteModeBtn: 'Diesen Dienst anfragen',
    terminalDetailsTitle: 'Profil der Pflegestation',
    terminalNoticeTitle: 'Haustür-Versprechen:',
    terminalNoticeBody: 'Alle Tiere werden lokal bis an die Haustür des Empfängers geliefert mit vorheriger telefonischer Ankündigung.',
    portCallsScheduleTitle: 'Aktuelle Haustür-Zustellungen',
    portCallsScheduleSubtitle: 'Geplante Ankunftszeiten in spanischen Städten.',
    vesselCarrierCol: 'Transporter / Betreuer',
    scheduledEtaCol: 'Voraussichtliche Ankunft',
    berthPierCol: 'Lieferzone',
    serviceLineCol: 'Dienst'
  }
};
