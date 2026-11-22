import React from 'react';
import { 
  Fish, 
  MapPin, 
  Calculator, 
  ClipboardCheck, 
  BarChart3, 
  FileText, 
  Wifi, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'dashboard' | 'field-cas' | 'raising-engine' | 'gis-map' | 'proposal' | 'dossier';
  setActiveTab: (tab: 'dashboard' | 'field-cas' | 'raising-engine' | 'gis-map' | 'proposal' | 'dossier') => void;
  pendingSyncCount: number;
  userRole: 'demonstrator' | 'dfdo' | 'directorate';
  setUserRole: (role: 'demonstrator' | 'dfdo' | 'directorate') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  pendingSyncCount,
  userRole,
  setUserRole
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      {/* Top Banner with Assam Govt & Challenge Info */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 px-4 py-1.5 text-xs border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-mono font-semibold">
            NESFIC-D-33
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Directorate of Fisheries, Govt. of Assam • ICAR-CIFRI Compliant Open-Water Biomass Engine
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-800/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <Wifi className="w-3.5 h-3.5" />
            <span className="font-medium">Online (IndexedDB PWA Sync Active)</span>
          </div>
          {pendingSyncCount > 0 && (
            <span className="bg-amber-600/90 text-white font-semibold px-2 py-0.5 rounded-full text-[11px] animate-bounce">
              {pendingSyncCount} offline records queued
            </span>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Fish className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-blue-200 to-white bg-clip-text text-transparent">
                  মৎস্যদৃষ্টি • MatsyaDrishti
                </span>
                <span className="text-[10px] bg-blue-500/30 text-blue-300 font-bold px-1.5 py-0.5 rounded uppercase">
                  Assam
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Scientific Open-Water Catch Assessment System (Beels & Rivers)
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Directorate Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('field-cas')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'field-cas'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Field CAS Logbook</span>
              {pendingSyncCount > 0 && (
                <span className="bg-amber-500 text-slate-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {pendingSyncCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('raising-engine')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'raising-engine'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Raising Factor Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('gis-map')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'gis-map'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>GIS Beel Map</span>
            </button>

            <button
              onClick={() => setActiveTab('proposal')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'proposal'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-800 border border-emerald-500/30'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Proposal (12 Parts)</span>
            </button>

            <button
              onClick={() => setActiveTab('dossier')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'dossier'
                  ? 'bg-amber-500 text-slate-900 shadow-sm'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-slate-800 border border-amber-500/30'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Proof of Work (PDF Dossier)</span>
            </button>
          </nav>

          {/* User Role Switcher */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-lg border border-slate-700/80 text-xs">
            <span className="text-[11px] text-slate-400 px-1 hidden lg:inline">Role:</span>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as any)}
              className="bg-slate-900 text-white border-0 text-xs rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 font-medium cursor-pointer"
            >
              <option value="demonstrator">Field Demonstrator</option>
              <option value="dfdo">District Officer (DFDO)</option>
              <option value="directorate">State Director / CIFRI</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Nav Tabs */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-800 px-2 py-1 gap-1 text-xs">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-3 py-1.5 whitespace-nowrap rounded font-medium ${
            activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('field-cas')}
          className={`px-3 py-1.5 whitespace-nowrap rounded font-medium ${
            activeTab === 'field-cas' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          Field Logbook {pendingSyncCount > 0 ? `(${pendingSyncCount})` : ''}
        </button>
        <button
          onClick={() => setActiveTab('raising-engine')}
          className={`px-3 py-1.5 whitespace-nowrap rounded font-medium ${
            activeTab === 'raising-engine' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          Raising Engine
        </button>
        <button
          onClick={() => setActiveTab('gis-map')}
          className={`px-3 py-1.5 whitespace-nowrap rounded font-medium ${
            activeTab === 'gis-map' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          GIS Map
        </button>
        <button
          onClick={() => setActiveTab('proposal')}
          className={`px-3 py-1.5 whitespace-nowrap rounded font-medium ${
            activeTab === 'proposal' ? 'bg-emerald-600 text-white' : 'text-emerald-400'
          }`}
        >
          Proposal Content
        </button>
        <button
          onClick={() => setActiveTab('dossier')}
          className={`px-3 py-1.5 whitespace-nowrap rounded font-bold ${
            activeTab === 'dossier' ? 'bg-amber-500 text-slate-900' : 'text-amber-400'
          }`}
        >
          PDF Dossier (10 Figs)
        </button>
      </div>
    </header>
  );
};
