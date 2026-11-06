import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Shipment } from '../../types';
import { Maximize2, Minimize2, Navigation, Radio, ShieldCheck, Thermometer } from 'lucide-react';

interface LiveRouteMapProps {
  shipment: Shipment;
  className?: string;
}

export const LiveRouteMap: React.FC<LiveRouteMapProps> = ({ shipment, className = '' }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Extract coordinates with robust fallbacks
  const originLat = shipment.origin.lat || 40.4168;
  const originLng = shipment.origin.lng || -3.7038;
  const destLat = shipment.destination.lat || 41.3879;
  const destLng = shipment.destination.lng || 2.1699;
  
  // Real live position of the shipment
  const currentLat = shipment.currentLocation?.lat || (originLat + destLat) / 2;
  const currentLng = shipment.currentLocation?.lng || (originLng + destLng) / 2;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Prevent re-initialization on hot reload
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      fadeAnimation: true,
      zoomAnimation: true
    });

    mapInstanceRef.current = map;

    // Add CARTO Positron Light basemap tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    // Custom Origin Marker Icon (Red Pin)
    const originIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
          <div style="position: absolute; width: 28px; height: 28px; background: rgba(220, 38, 38, 0.2); border-radius: 50%;"></div>
          <div style="width: 14px; height: 14px; background: #dc2626; border: 2.5px solid white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });

    // Custom Destination Marker Icon (Charcoal / Checkpoint Pin)
    const destIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
          <div style="position: absolute; width: 28px; height: 28px; background: rgba(24, 24, 27, 0.2); border-radius: 50%;"></div>
          <div style="width: 14px; height: 14px; background: #18181b; border: 2.5px solid white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });

    // Custom Live In-Transit Vehicle Beacon Icon
    const liveVehicleIcon = L.divIcon({
      className: 'custom-leaflet-vehicle',
      html: `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 38px; height: 38px; background: rgba(220, 38, 38, 0.25); border-radius: 50%; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; width: 26px; height: 26px; background: rgba(220, 38, 38, 0.4); border-radius: 50%;"></div>
          <div style="position: relative; width: 22px; height: 22px; background: #dc2626; border: 2.5px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(220, 38, 38, 0.5);">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -22]
    });

    // Add Origin Marker
    const originMarker = L.marker([originLat, originLng], { icon: originIcon }).addTo(map);
    originMarker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4; padding: 4px;">
        <strong style="color: #dc2626; font-size: 11px; text-transform: uppercase;">ORIGIN</strong><br/>
        <strong style="color: #18181b;">${shipment.origin.city}${shipment.origin.country ? `, ${shipment.origin.country}` : ''}</strong><br/>
        <span style="color: #64748b; font-size: 11px;">${shipment.sender?.name || ''}</span>
      </div>
    `);

    // Add Destination Marker
    const destMarker = L.marker([destLat, destLng], { icon: destIcon }).addTo(map);
    destMarker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4; padding: 4px;">
        <strong style="color: #18181b; font-size: 11px; text-transform: uppercase;">DESTINATION</strong><br/>
        <strong style="color: #18181b;">${shipment.destination.city}${shipment.destination.country ? `, ${shipment.destination.country}` : ''}</strong><br/>
        <span style="color: #64748b; font-size: 11px;">${shipment.doorstepDelivery?.receiverDoorAddress || shipment.consignee?.address || shipment.destination.city}</span>
      </div>
    `);

    // Add Live Moving Beacon Marker
    const vehicleMarker = L.marker([currentLat, currentLng], { icon: liveVehicleIcon }).addTo(map);
    vehicleMarker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4; padding: 4px;">
        <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 2px;">
          <span style="width: 7px; height: 7px; background: #dc2626; border-radius: 50%; display: inline-block;"></span>
          <strong style="color: #dc2626; font-size: 11px;">LIVE DISPATCH TELEMETRY</strong>
        </div>
        <strong style="color: #18181b;">${shipment.currentLocation?.name || 'En tránsito'}</strong><br/>
        <span style="color: #52525b; font-size: 11px;">${shipment.statusLabel || 'En ruta'}</span>
        ${shipment.temperatureCelsius !== undefined ? `<br/><span style="color: #059669; font-size: 11px;">Temperatura: ${shipment.temperatureCelsius}°C</span>` : ''}
      </div>
    `);

    // Dynamically interpolate realistic route points between Origin and Destination
    const pointsCount = 6;
    const routePoints: [number, number][] = [];
    for (let i = 0; i <= pointsCount; i++) {
      const fraction = i / pointsCount;
      const lat = originLat + (destLat - originLat) * fraction;
      const lng = originLng + (destLng - originLng) * fraction;
      // Slight natural curvature perpendicular to the line
      const curveOffset = Math.sin(fraction * Math.PI) * 0.12;
      routePoints.push([lat + curveOffset, lng]);
    }

    // Background soft glow line
    L.polyline(routePoints, {
      color: '#dc2626',
      weight: 6,
      opacity: 0.25,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // Primary sharp route polyline
    L.polyline(routePoints, {
      color: '#dc2626',
      weight: 3.5,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round',
      dashArray: '8, 8'
    }).addTo(map);

    // Fit map bounds to show complete transit route
    const bounds = L.latLngBounds([
      [originLat, originLng],
      [destLat, destLng],
      [currentLat, currentLng]
    ]);
    map.fitBounds(bounds, {
      padding: [45, 45],
      maxZoom: 12
    });

    // Cleanup on unmount
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [originLat, originLng, destLat, destLng, currentLat, currentLng, shipment]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleResetView = () => {
    if (!mapInstanceRef.current) return;
    const bounds = L.latLngBounds([
      [originLat, originLng],
      [destLat, destLng],
      [currentLat, currentLng]
    ]);
    mapInstanceRef.current.fitBounds(bounds, {
      padding: [45, 45],
      maxZoom: 12
    });
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#f4f4f5] select-none transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none h-screen'
          : `rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none min-h-[380px] sm:min-h-[440px] ${className}`
      }`}
    >
      {/* The Actual Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[380px] sm:min-h-[440px] z-0" />

      {/* Top Left: Zoom and Recenter Controls */}
      <div className="absolute top-4 left-4 flex flex-col bg-white rounded-xl border border-stone-200 shadow-md shadow-stone-900/10 z-10 overflow-hidden">
        <button
          type="button"
          onClick={handleZoomIn}
          className="p-2 sm:p-2.5 text-stone-700 hover:text-red-600 hover:bg-stone-50 border-b border-stone-100 transition-colors cursor-pointer"
          title="Zoom in"
          aria-label="Acercar mapa"
        >
          <span className="text-base font-bold leading-none select-none">+</span>
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="p-2 sm:p-2.5 text-stone-700 hover:text-red-600 hover:bg-stone-50 border-b border-stone-100 transition-colors cursor-pointer"
          title="Zoom out"
          aria-label="Alejar mapa"
        >
          <span className="text-base font-bold leading-none select-none">−</span>
        </button>
        <button
          type="button"
          onClick={handleResetView}
          className="p-2 sm:p-2.5 text-stone-700 hover:text-red-600 hover:bg-stone-50 transition-colors cursor-pointer flex items-center justify-center"
          title="Recenter Route"
          aria-label="Centrar ruta"
        >
          <Navigation className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top Right: Live GPS Telemetry Badge & Fullscreen Toggle */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-200/90 shadow-md flex items-center gap-2 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-stone-800">
            <Radio className="w-3 h-3 text-red-600" />
            <span>GPS LIVE</span>
            <span className="hidden sm:inline text-stone-400">·</span>
            <span className="hidden sm:inline text-stone-500 font-medium">
              {currentLat.toFixed(4)}°N, {Math.abs(currentLng).toFixed(4)}°W
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 bg-white/95 backdrop-blur-md hover:bg-white text-stone-700 hover:text-red-600 rounded-xl border border-stone-200/90 shadow-md transition-colors cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen' : 'Expand Map'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Floating Telemetry Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-xl border border-stone-200/90 shadow-sm pointer-events-auto text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-red-600 shrink-0" />
          <span className="font-bold text-[#18181b]">
            {shipment.origin.city} → {shipment.destination.city}
          </span>
          {shipment.temperatureCelsius !== undefined && (
            <>
              <span className="text-stone-300">|</span>
              <span className="text-stone-600 font-medium flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-red-600" />
                {shipment.temperatureCelsius}°C
              </span>
            </>
          )}
        </div>

        {/* Real CARTO / OpenStreetMap attribution */}
        <div className="bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] text-stone-500 font-mono pointer-events-auto border border-stone-200/60 shadow-2xs self-end">
          Leaflet | © CARTO © OpenStreetMap
        </div>
      </div>

      {/* Watermark in corner */}
      <div className="absolute top-14 right-4 text-[10px] font-mono font-bold text-stone-400/40 uppercase select-none pointer-events-none rotate-[-25deg] hidden sm:block">
        API KEY · carto.com/basemaps
      </div>
    </div>
  );
};
