import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Globe2,
  Anchor,
  Clock,
  Navigation,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Search,
  Heart,
  Home,
  Truck,
  Ship
} from 'lucide-react';
import { PortHub } from '../../types';

export const GlobalNetworkMap: React.FC = () => {
  const { ports, portCalls, t } = useShipping();
  const [selectedPort, setSelectedPort] = useState<PortHub>(ports[0]);
  const [citySearch, setCitySearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');

  const filteredPorts = ports.filter((p) => {
    const q = citySearch.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (regionFilter === 'all') return true;
    if (regionFilter === 'madrid') return p.city.includes('Madrid') || p.city.includes('Toledo') || p.city.includes('Guadalajara');
    if (regionFilter === 'catalonia') return ['Barcelona', 'Tarragona', 'Girona', 'Lleida', 'Terrassa'].includes(p.city);
    if (regionFilter === 'andalucia') return ['Sevilla', 'Málaga', 'Granada', 'Córdoba', 'Almería', 'Jerez', 'Huelva', 'Jaén'].includes(p.city);
    if (regionFilter === 'valencia') return ['Valencia', 'Alicante', 'Castellón', 'Elche'].includes(p.city);
    if (regionFilter === 'norte') return ['Bilbao', 'San Sebastián', 'Vitoria', 'Santander', 'Pamplona', 'Logroño', 'Oviedo / Gijón', 'A Coruña', 'Vigo', 'Lugo', 'Ourense', 'Santiago'].some(c => p.city.includes(c));
    if (regionFilter === 'islas') return ['Palma de Mallorca', 'Las Palmas de Gran Canaria', 'Santa Cruz de Tenerife'].includes(p.city);
    if (regionFilter === 'europa') return p.country !== 'España';
    return true;
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
            <span>Red Nacional de Bases en España y Enlaces Europeos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#232331] font-heading tracking-tight">
            Cobertura en Cada Ciudad de España
          </h2>
          <p className="mt-2 text-sm text-[#767676] max-w-2xl">
            Desde Madrid, Barcelona, Valencia y Sevilla hasta cada capital y comarca provincial. Conectamos cada base de bienestar animal directamente con el vehículo de reparto local para entrega en tu propia puerta.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold bg-white p-2.5 rounded-xl border border-stone-200 shadow-2xs">
          <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Flujo Normal (&lt; 24h)
          </span>
          <span className="flex items-center gap-1.5 text-orange-800 bg-orange-50 px-2.5 py-1 rounded border border-orange-200">
            <Home className="w-3.5 h-3.5 text-orange-600" />
            Reparto Puerta a Puerta
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-8 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            placeholder="Buscar ciudad o provincia en España (ej. Madrid, Barcelona, Valencia, Zaragoza, Málaga, Bilbao, Tenerife...)"
            className="w-full bg-[#f8f5f1] pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-[#232331] font-medium focus:bg-white focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-bold">
          <span className="text-stone-400 text-xs mr-1 font-normal">Zonas:</span>
          {[
            { id: 'all', label: `Todas (${ports.length})` },
            { id: 'madrid', label: 'Madrid & Centro' },
            { id: 'catalonia', label: 'Cataluña' },
            { id: 'andalucia', label: 'Andalucía' },
            { id: 'valencia', label: 'Comunitat Valenciana' },
            { id: 'norte', label: 'Norte & Cornisa' },
            { id: 'islas', label: 'Baleares & Canarias' },
            { id: 'europa', label: 'Pasarelas Europa' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setRegionFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                regionFilter === cat.id
                  ? 'bg-orange-600 text-white border-orange-600 shadow-2xs'
                  : 'bg-[#f8f5f1] text-[#232331] border-stone-200 hover:bg-stone-200/70'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Terminals + Selected Hub Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Port Terminal Cards (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[640px] overflow-y-auto pr-1">
          {filteredPorts.map((port) => {
            const isSelected = selectedPort.id === port.id;
            return (
              <div
                key={port.id}
                onClick={() => setSelectedPort(port)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-white border-2 border-orange-500 shadow-lg ring-2 ring-orange-200/50'
                    : 'bg-white border-stone-200 hover:border-orange-300 shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🐾</span>
                    <div>
                      <h3 className="font-bold text-sm text-[#232331] font-heading">{port.name}</h3>
                      <span className="text-xs font-mono font-bold text-orange-600">{port.code}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      port.congestionStatus === 'normal'
                        ? 'bg-emerald-100 text-emerald-800'
                        : port.congestionStatus === 'moderate'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {port.congestionStatus === 'normal' ? 'Óptimo' : 'Moderado'} Tránsito
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#767676] mb-3">
                  <div className="flex justify-between">
                    <span>Ciudad / Región:</span>
                    <strong className="text-[#232331]">{port.city} ({port.country})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tiempo de Escala:</span>
                    <strong className="text-[#232331] font-mono">{port.avgTurnaroundHours} h</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Plazas de Descanso:</span>
                    <strong className="text-emerald-700 font-bold">{port.berthsAvailable} Boxes Climatizados</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-mono text-[11px]">{port.lat.toFixed(2)}°N, {port.lng.toFixed(2)}°E</span>
                  <span className={`font-bold text-xs flex items-center gap-1 ${isSelected ? 'text-orange-600' : 'text-stone-400'}`}>
                    <span>Ver Detalles de la Base</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Port Dossier (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm relative">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider">
                Centro de Bienestar y Logística
              </span>
              <h3 className="text-xl font-bold text-[#232331] font-heading mt-0.5">
                {selectedPort.name}
              </h3>
            </div>
            <span className="text-sm font-mono font-bold bg-[#f8f5f1] px-3 py-1 rounded-lg border border-stone-200 text-[#232331]">
              {selectedPort.code}
            </span>
          </div>

          <div className="space-y-4 my-6">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#f8f5f1] rounded-xl border border-stone-200">
                <span className="text-[#767676] block text-[10px] uppercase font-bold">Tipo de Base</span>
                <span className="font-bold text-[#232331] mt-0.5 block capitalize">Centro Canino & Felino</span>
              </div>
              <div className="p-3.5 bg-[#f8f5f1] rounded-xl border border-stone-200">
                <span className="text-[#767676] block text-[10px] uppercase font-bold">Escala Media</span>
                <span className="font-bold text-[#232331] font-mono mt-0.5 block">{selectedPort.avgTurnaroundHours} Horas</span>
              </div>
              <div className="p-3.5 bg-[#f8f5f1] rounded-xl border border-stone-200">
                <span className="text-[#767676] block text-[10px] uppercase font-bold">Furgonetas Activas</span>
                <span className="font-bold text-[#232331] mt-0.5 block">{selectedPort.activePortxVessels} Unidades en Ruta</span>
              </div>
              <div className="p-3.5 bg-[#f8f5f1] rounded-xl border border-stone-200">
                <span className="text-[#767676] block text-[10px] uppercase font-bold">Coordenadas GPS</span>
                <span className="font-bold text-[#232331] font-mono mt-0.5 block">{selectedPort.lat.toFixed(2)}°N, {selectedPort.lng.toFixed(2)}°E</span>
              </div>
            </div>

            <div className="p-4 bg-orange-50/70 rounded-xl border border-orange-200 text-xs text-[#232331] leading-relaxed">
              <span className="font-bold text-orange-950 block mb-1 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-orange-600" />
                Entrega Directa a Domicilio desde esta Base
              </span>
              Esta base cubre la ciudad de {selectedPort.city} y municipios limítrofes, realizando el reparto final directamente al portal del destinatario con vehículo climatizado y cuidador homologado.
            </div>
          </div>
        </div>
      </div>

      {/* Port Call Schedules Table */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#232331] font-heading">
              {t.portCallsScheduleTitle}
            </h3>
            <p className="text-xs text-[#767676]">
              {t.portCallsScheduleSubtitle}
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold">
            Live AIS Port Matrix Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8f5f1] text-[#232331] uppercase font-bold text-[10px] tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">{t.vesselCarrierCol}</th>
                <th className="py-3 px-4">{t.routingCol}</th>
                <th className="py-3 px-4">{t.scheduledEtaCol}</th>
                <th className="py-3 px-4">{t.berthPierCol}</th>
                <th className="py-3 px-4">{t.serviceLineCol}</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-[#232331]">
              {portCalls.map((call) => (
                <tr key={call.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#232331] flex items-center gap-2">
                    <Ship className="w-4 h-4 text-orange-600" />
                    <span>{call.vesselName}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">
                    {call.portName} ({call.portCode})
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium">{call.eta}</td>
                  <td className="py-3.5 px-4 font-mono text-stone-500">{call.berth}</td>
                  <td className="py-3.5 px-4 text-stone-500 font-medium">{call.serviceLine}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        call.status === 'berthed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : call.status === 'approaching'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {call.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
