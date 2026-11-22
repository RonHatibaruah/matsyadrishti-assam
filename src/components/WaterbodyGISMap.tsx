import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Layers, 
  Satellite, 
  Maximize2, 
  ExternalLink, 
  Info, 
  CheckCircle2, 
  Filter, 
  ChevronRight, 
  Fish 
} from 'lucide-react';
import { ASSAM_WATERBODIES } from '../services/mockData';
import { Waterbody } from '../types/fishery';

interface WaterbodyGISMapProps {
  onSelectWaterbody?: (wbId: string) => void;
}

export const WaterbodyGISMap: React.FC<WaterbodyGISMapProps> = ({ onSelectWaterbody }) => {
  const [selectedWaterbody, setSelectedWaterbody] = useState<Waterbody>(ASSAM_WATERBODIES[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const [satelliteLayer, setSatelliteLayer] = useState<'mndwi' | 'optical' | 'none'>('mndwi');
  const [seasonView, setSeasonView] = useState<'monsoon' | 'winter'>('winter');

  const filteredWaterbodies = ASSAM_WATERBODIES.filter(wb => {
    if (filterType === 'all') return true;
    return wb.type === filterType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full border border-blue-400/30 mb-2">
              <Satellite className="w-3.5 h-3.5" />
              <span>Copernicus Sentinel-2 • 10m Resolution MNDWI Water-Spread Engine</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              Assam Wetland & Riverine GIS Cadastre
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Geospatial cadastre mapping Assam's 1,392+ registered beels, Brahmaputra river sectors, and landing ghats. Dynamically updates surface water contraction to adjust catch raising factors.
            </p>
          </div>

          {/* Satellite Controls */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700 text-xs">
            <span className="text-slate-400 px-2 font-medium">Layer:</span>
            <button
              onClick={() => setSatelliteLayer('mndwi')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                satelliteLayer === 'mndwi' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              MNDWI Water Mask
            </button>
            <button
              onClick={() => setSatelliteLayer('optical')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                satelliteLayer === 'optical' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              True Color (RGB)
            </button>
          </div>
        </div>
      </div>

      {/* Main GIS Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Waterbody Registry List (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              Waterbody Frame Register ({filteredWaterbodies.length})
            </h3>

            {/* Filter Dropdown */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg p-1.5 bg-slate-50 font-medium"
            >
              <option value="all">All Types</option>
              <option value="Open Beel">Open Beels</option>
              <option value="Closed Beel">Closed Beels</option>
              <option value="River Mainstem">River Mainstem</option>
            </select>
          </div>

          {/* List items */}
          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {filteredWaterbodies.map(wb => {
              const isSelected = selectedWaterbody.id === wb.id;
              const areaChangePct = Number((((wb.currentMNDWIAreaHa - wb.registeredAreaHa) / wb.registeredAreaHa) * 100).toFixed(0));
              return (
                <div
                  key={wb.id}
                  onClick={() => setSelectedWaterbody(wb)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-500 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-slate-900">{wb.name}</p>
                      <p className="text-[11px] text-slate-500">{wb.district} • {wb.ecologicalZone}</p>
                    </div>
                    <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-medium text-slate-700">
                      {wb.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/60 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Baseline Area:</span>
                      <span className="font-semibold text-slate-700">{wb.registeredAreaHa} Ha</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Nov Satellite Extent:</span>
                      <span className="font-bold text-cyan-700">{wb.currentMNDWIAreaHa} Ha</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive Map Visualizer & Profile (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Simulated Satellite GIS Canvas */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden relative min-h-[420px] flex flex-col justify-between p-6">
            {/* Map Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 z-10">
              <div className="bg-slate-800/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="font-bold">{selectedWaterbody.name}</span>
                <span className="text-slate-400">[{selectedWaterbody.coordinates[0]}°N, {selectedWaterbody.coordinates[1]}°E]</span>
              </div>

              {/* Season Toggle */}
              <div className="bg-slate-800/90 backdrop-blur-md p-1 rounded-xl border border-slate-700 text-xs flex items-center gap-1 text-white">
                <button
                  onClick={() => setSeasonView('monsoon')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    seasonView === 'monsoon' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  Monsoon Peak (Flood)
                </button>
                <button
                  onClick={() => setSeasonView('winter')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    seasonView === 'winter' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  Winter Low (Current)
                </button>
              </div>
            </div>

            {/* Simulated Satellite Vector Visualizer */}
            <div className="my-auto py-8 text-center relative">
              {/* Background Map Water Body Graphic */}
              <div className="mx-auto max-w-md h-48 bg-gradient-to-br from-cyan-950 via-blue-900 to-slate-900 rounded-3xl border-2 border-dashed border-cyan-500/40 p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                {/* Simulated Water ripples */}
                <div className={`absolute inset-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 transition-all duration-700 ${
                  seasonView === 'monsoon' ? 'scale-105 bg-cyan-400/20' : 'scale-90 bg-cyan-500/10'
                }`}></div>
                
                <div className="relative z-10 text-white text-center space-y-1">
                  <Fish className="w-10 h-10 text-cyan-400 mx-auto animate-pulse" />
                  <p className="font-black text-lg text-white">{selectedWaterbody.name}</p>
                  <p className="text-xs text-cyan-300 font-mono">
                    {seasonView === 'monsoon' 
                      ? `Monsoon High: ${Math.round(selectedWaterbody.registeredAreaHa * 1.15)} Ha` 
                      : `Winter Effective: ${selectedWaterbody.currentMNDWIAreaHa} Ha`}
                  </p>
                  <span className="inline-block text-[10px] bg-cyan-900/80 text-cyan-200 border border-cyan-700 px-2 py-0.5 rounded-full">
                    MNDWI Spectral Band 3 & 8 (Sentinel-2)
                  </span>
                </div>
              </div>

              {/* Coordinates & Landing Ghat Pinpoints */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                {[1, 2, 3, 4].slice(0, selectedWaterbody.activeGhatCount).map(idx => (
                  <span key={idx} className="bg-slate-800/80 text-slate-300 border border-slate-700 text-[10px] px-2 py-1 rounded-lg flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span>Ghat #{idx} Active</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Map Bottom Metadata */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3 z-10">
              <span>Projection: EPSG:4326 (WGS 84) • Spatial Index: PostGIS R-Tree</span>
              <span className="text-cyan-400 font-mono">Sensor: Sentinel-2 MSI L2A (10m)</span>
            </div>
          </div>

          {/* Selected Waterbody Details Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {selectedWaterbody.name} ({selectedWaterbody.assameseName})
                </h3>
                <p className="text-xs text-slate-500">
                  District: {selectedWaterbody.district} • Ecological Zone: {selectedWaterbody.ecologicalZone}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg">
                  Registered Fisheries Society Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">Fishery Cooperative</span>
                <span className="font-bold text-slate-900 block mt-1">
                  {selectedWaterbody.activeFisheryCooperative}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">Registered Fishing Crafts</span>
                <span className="font-bold text-slate-900 block mt-1 font-mono">
                  {selectedWaterbody.totalRegisteredCrafts} crafts
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">Active Landing Ghats</span>
                <span className="font-bold text-slate-900 block mt-1 font-mono">
                  {selectedWaterbody.activeGhatCount} ghats
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">Historical Annual Yield</span>
                <span className="font-bold text-blue-700 block mt-1 font-mono">
                  {selectedWaterbody.meanAnnualCatchMT} MT / yr
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
