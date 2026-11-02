import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Globe2,
  Anchor,
  Clock,
  Ship,
  Navigation,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PortHub } from '../../types';

export const GlobalNetworkMap: React.FC = () => {
  const { ports, portCalls, t } = useShipping();
  const [selectedPort, setSelectedPort] = useState<PortHub>(ports[0]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Globe2 className="w-3.5 h-3.5" />
            {t.networkBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#232331] font-heading tracking-tight">
            {t.networkHeading}
          </h2>
          <p className="mt-2 text-sm text-[#767676] max-w-xl">
            {t.networkSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold bg-white p-2 rounded-xl border border-stone-200 shadow-2xs">
          <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Normal Flow (&lt; 24h)
          </span>
          <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Moderate Wait
          </span>
          <span className="flex items-center gap-1.5 text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            Congestion
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Terminals + Selected Hub Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Port Terminal Cards (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ports.map((port) => {
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
                    <span className="text-xl">⚓</span>
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
                    {port.congestionStatus} Traffic
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#767676] mb-3">
                  <div className="flex justify-between">
                    <span>Country / Region:</span>
                    <strong className="text-[#232331]">{port.country}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Turnaround:</span>
                    <strong className="text-[#232331] font-mono">{port.avgTurnaroundHours} Hours</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Berth Availability:</span>
                    <strong className="text-emerald-700 font-bold">{port.berthsAvailable} Open Berths</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-mono text-[11px]">{port.lat.toFixed(2)}°N, {port.lng.toFixed(2)}°E</span>
                  <span className={`font-bold text-xs flex items-center gap-1 ${isSelected ? 'text-orange-600' : 'text-stone-400'}`}>
                    <span>Inspect Hub</span>
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
                {t.terminalDetailsTitle}
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
                <span className="text-[#767676] block text-[10px] uppercase font-bold">{t.terminalTypeLabel}</span>
                <span className="font-bold text-[#232331] mt-0.5 block capitalize">{selectedPort.type} Hub</span>
              </div>
              <div className="p-3.5 bg-[#f8f5f1] rounded-xl border border-stone-200">
                <span className="text-[#767676] block text-[10px] uppercase font-bold">{t.avgContainerDwellLabel}</span>
                <span className="font-bold text-[#232331] font-mono mt-0.5 block">{selectedPort.avgTurnaroundHours} Hours</span>
              </div>
              <div className="p-3.5 bg-[#f8f5f1] rounded-xl border border-stone-200">
                <span className="text-[#767676] block text-[10px] uppercase font-bold">{t.activeVesselsLabel}</span>
                <span className="font-bold text-[#232331] mt-0.5 block">{selectedPort.activePortxVessels} Vessels Docked</span>
              </div>
              <div className="p-3.5 bg-[#f8f5f1] rounded-xl border border-stone-200">
                <span className="text-[#767676] block text-[10px] uppercase font-bold">{t.geoCoordinatesLabel}</span>
                <span className="font-bold text-[#232331] font-mono mt-0.5 block">{selectedPort.lat.toFixed(2)}°N, {selectedPort.lng.toFixed(2)}°E</span>
              </div>
            </div>

            <div className="p-4 bg-[#f8f5f1] rounded-xl border border-stone-200 text-xs text-[#232331] leading-relaxed">
              <span className="font-bold text-[#232331] block mb-1">{t.terminalNoticeTitle}</span>
              {t.terminalNoticeBody}
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
