import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  AlertTriangle, 
  Calendar, 
  Satellite, 
  Users, 
  FileSpreadsheet, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Sliders, 
  Eye, 
  Lock, 
  Download, 
  Compass, 
  AlertOctagon, 
  Database, 
  Activity, 
  Layers, 
  Cpu, 
  Search, 
  Filter, 
  ExternalLink 
} from 'lucide-react';

interface AnomalyRecord {
  id: string;
  waterbody: string;
  district: string;
  date: string;
  gear: string;
  reportedCatchKg: number;
  expectedCatchKg: number;
  sigmaDeviation: number;
  status: 'quarantined' | 'approved' | 'rejected' | 'inspection_requested';
  reason: string;
  demonstrator: string;
  species: string;
  aiConfidence: string;
}

interface RotaSchedule {
  id: string;
  date: string;
  waterbody: string;
  stratum: 'Open Wetland' | 'Closed Beel' | 'River Mainstem' | 'Oxbow Lake';
  ghatPoint: string;
  demonstrator: string;
  shift: 'Dawn (04:30 - 08:30)' | 'Dusk (15:00 - 19:00)';
  targetGear: string;
  status: 'Scheduled' | 'Dispatched' | 'Active' | 'Completed';
  geofenceEnforced: boolean;
}

interface CooperativeRecord {
  id: string;
  name: string;
  waterbody: string;
  district: string;
  activeFishers: number;
  annualLeaseFee: string;
  stockingTargetFingerlings: number;
  actualStockedFingerlings: number;
  harvestRealizationPct: number;
  complianceRating: 'A+' | 'A' | 'B' | 'Review Required';
}

interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  entityId: string;
  hash: string;
  status: 'Verified';
}

const INITIAL_ANOMALIES: AnomalyRecord[] = [
  {
    id: "ANOM-2026-089",
    waterbody: "Deepor Beel (Ghat #2)",
    district: "Kamrup Metro",
    date: "2026-11-25",
    gear: "Khewali jaal (Cast net)",
    reportedCatchKg: 385.5,
    expectedCatchKg: 42.0,
    sigmaDeviation: 4.8,
    status: 'quarantined',
    reason: "Catch weight exceeds 4.8 standard deviations for artisanal cast net operations.",
    demonstrator: "Pranab Kalita (Demonstrator #04)",
    species: "Labeo rohita (ৰৌ মাছ)",
    aiConfidence: "98.2%"
  },
  {
    id: "ANOM-2026-090",
    waterbody: "Brahmaputra (Pandu Ghat)",
    district: "Kamrup Metro",
    date: "2026-11-24",
    gear: "Phansi jaal (Gillnet 90mm)",
    reportedCatchKg: 520.0,
    expectedCatchKg: 110.0,
    sigmaDeviation: 3.9,
    status: 'quarantined',
    reason: "Sudden spike during post-flood upstream migration wave.",
    demonstrator: "Bhaskar Das (Demonstrator #09)",
    species: "Tenualosa ilisha (ইলিচ / Hilsa)",
    aiConfidence: "96.5%"
  },
  {
    id: "ANOM-2026-091",
    waterbody: "Son Beel (Ramnagar Sector)",
    district: "Karimganj",
    date: "2026-11-23",
    gear: "Chepa & Polo (Bamboo Traps)",
    reportedCatchKg: 198.0,
    expectedCatchKg: 28.0,
    sigmaDeviation: 3.4,
    status: 'quarantined',
    reason: "Trap catch exceeds expected seasonal drainage pool capacity.",
    demonstrator: "M. Ahmed (Demonstrator #14)",
    species: "Amblypharyngodon mola (মলা মাছ)",
    aiConfidence: "91.8%"
  }
];

const INITIAL_ROTAS: RotaSchedule[] = [
  {
    id: "ROTA-W48-01",
    date: "2026-11-27",
    waterbody: "Deepor Beel",
    stratum: "Open Wetland",
    ghatPoint: "Chakardeo Landing Point",
    demonstrator: "Pranab Kalita",
    shift: "Dawn (04:30 - 08:30)",
    targetGear: "Gillnet (Phansi) & Cast net",
    status: "Scheduled",
    geofenceEnforced: true
  },
  {
    id: "ROTA-W48-02",
    date: "2026-11-27",
    waterbody: "Urpad Beel",
    stratum: "Closed Beel",
    ghatPoint: "Agia Cooperative Ghat",
    demonstrator: "Hemanta Nath",
    shift: "Dawn (04:30 - 08:30)",
    targetGear: "Ber jaal (Seine net)",
    status: "Scheduled",
    geofenceEnforced: true
  },
  {
    id: "ROTA-W48-03",
    date: "2026-11-28",
    waterbody: "Brahmaputra Mainstem",
    stratum: "River Mainstem",
    ghatPoint: "Uzanbazar Ghat (Guwahati)",
    demonstrator: "Bhaskar Das",
    shift: "Dusk (15:00 - 19:00)",
    targetGear: "Drift Gillnet & Longline",
    status: "Scheduled",
    geofenceEnforced: true
  },
  {
    id: "ROTA-W48-04",
    date: "2026-11-29",
    waterbody: "Son Beel",
    stratum: "Oxbow Lake",
    ghatPoint: "Anipur Ghat",
    demonstrator: "M. Ahmed",
    shift: "Dawn (04:30 - 08:30)",
    targetGear: "Traps & Cast nets",
    status: "Scheduled",
    geofenceEnforced: true
  }
];

const COOPERATIVES: CooperativeRecord[] = [
  {
    id: "FCS-KM-01",
    name: "Deepor Beel Matsyajibi Samabai Samiti Ltd.",
    waterbody: "Deepor Beel",
    district: "Kamrup Metro",
    activeFishers: 420,
    annualLeaseFee: "₹18,50,000",
    stockingTargetFingerlings: 250000,
    actualStockedFingerlings: 245000,
    harvestRealizationPct: 98.0,
    complianceRating: "A+"
  },
  {
    id: "FCS-GP-04",
    name: "Urpad Anchalik Fishery Cooperative Society",
    waterbody: "Urpad Beel",
    district: "Goalpara",
    activeFishers: 310,
    annualLeaseFee: "₹12,80,000",
    stockingTargetFingerlings: 180000,
    actualStockedFingerlings: 175000,
    harvestRealizationPct: 97.2,
    complianceRating: "A"
  },
  {
    id: "FCS-KJ-02",
    name: "Son Beel Fisherman & Aquatic Union",
    waterbody: "Son Beel",
    district: "Karimganj",
    activeFishers: 580,
    annualLeaseFee: "₹24,00,000",
    stockingTargetFingerlings: 350000,
    actualStockedFingerlings: 310000,
    harvestRealizationPct: 88.5,
    complianceRating: "B"
  }
];

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "LOG-9821",
    timestamp: "2026-11-26 15:42:10 IST",
    actor: "Ron Hatibaruah",
    role: "Lead System Architect",
    action: "Updated Raising Engine allometric parameters for Labeo rohita (W=0.0125*L^3.02)",
    entityId: "CFG-SPECIES-IMC",
    hash: "a4f891b2c7e4...6b19",
    status: "Verified"
  },
  {
    id: "LOG-9820",
    timestamp: "2026-11-26 14:15:32 IST",
    actor: "DFDO Kamrup Metro",
    role: "District Officer",
    action: "Approved bi-weekly Catch Assessment Survey Rota for Week 48",
    entityId: "ROTA-W48-BATCH",
    hash: "8e32c1fa09b1...21d4",
    status: "Verified"
  },
  {
    id: "LOG-9819",
    timestamp: "2026-11-26 11:05:44 IST",
    actor: "Copernicus Ingestion Bot",
    role: "System Automation",
    action: "Ingested Sentinel-2 Level-2A Tile 46RCN; computed Deepor Beel MNDWI water-spread (2,840 Ha)",
    entityId: "SAT-S2-20261125",
    hash: "3f9801ec29aa...18a0",
    status: "Verified"
  }
];

export const AdminConsole: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<'triage' | 'rota' | 'satellite' | 'cooperatives' | 'enforcement' | 'audit' | 'export'>('triage');
  const [anomalies, setAnomalies] = useState<AnomalyRecord[]>(INITIAL_ANOMALIES);
  const [rotas, setRotas] = useState<RotaSchedule[]>(INITIAL_ROTAS);
  const [mndwiThreshold, setMndwiThreshold] = useState<number>(0.12);
  const [sarFallbackActive, setSarFallbackActive] = useState<boolean>(false);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [notification, setNotification] = useState<string | null>(null);

  const handleActionAnomaly = (id: string, action: 'approved' | 'rejected' | 'inspection_requested') => {
    setAnomalies(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: action };
      }
      return a;
    }));

    const actionText = action === 'approved' ? 'Approved as Authentic Harvest' : action === 'rejected' ? 'Rejected as Data Error' : 'Marked for Physical Field Inspection';
    setNotification(`Record ${id} has been ${actionText}. Audit hash recorded.`);
    setTimeout(() => setNotification(null), 4000);

    // Append to audit log
    const newLog: AuditLogEntry = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + " IST",
      actor: "DFDO Admin / Directorate",
      role: "Zonal Officer",
      action: `${actionText} for ${id}`,
      entityId: id,
      hash: "e7" + Math.random().toString(16).substring(2, 14),
      status: "Verified"
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleGenerateRota = () => {
    const newRota: RotaSchedule = {
      id: `ROTA-W49-${Math.floor(10 + Math.random() * 90)}`,
      date: "2026-12-02",
      waterbody: "Brahmaputra Sector 3 (Tezpur Ghat)",
      stratum: "River Mainstem",
      ghatPoint: "Bhomoraguri Landing Center",
      demonstrator: "Dipak Barman",
      shift: "Dawn (04:30 - 08:30)",
      targetGear: "Gillnet (Phansi 80mm)",
      status: "Scheduled",
      geofenceEnforced: true
    };
    setRotas(prev => [newRota, ...prev]);
    setNotification("Automated stratified random sampling rota generated for Week 49 across 12 zonal strata.");
    setTimeout(() => setNotification(null), 4000);
  };

  const quarantinedCount = anomalies.filter(a => a.status === 'quarantined').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-blue-900/30 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                Directorate Executive Administration Console
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-mono font-bold">
                Tier-1 Authority (State & Zonal DFDO)
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-mono">
                Lead Architect: Ron Hatibaruah
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">
              State Fisheries Control Center & Data Governance Suite
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Supervisory suite for the Directorate of Fisheries, Government of Assam: manage randomized Catch Assessment rotas, triage statistical outliers, calibrate Sentinel-2 satellite water-spread indices, enforce closed-season breeding bans, and inspect immutable audit trails.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {quarantinedCount > 0 && (
              <div className="bg-amber-500/20 border border-amber-500/50 text-amber-300 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold animate-pulse">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>{quarantinedCount} Catches in Anomaly Quarantine</span>
              </div>
            )}
            <button
              onClick={handleGenerateRota}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Generate Bi-Weekly Rota</span>
            </button>
          </div>
        </div>

        {/* Status Notification Toast */}
        {notification && (
          <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-medium">{notification}</span>
          </div>
        )}
      </div>

      {/* Admin Feature Navigation Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-200 text-xs font-bold">
        <button
          onClick={() => setActiveAdminTab('triage')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
            activeAdminTab === 'triage'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <AlertOctagon className="w-4 h-4" />
          <span>3-Sigma Anomaly Triage</span>
          {quarantinedCount > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              activeAdminTab === 'triage' ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-800'
            }`}>
              {quarantinedCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('rota')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
            activeAdminTab === 'rota'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Zonal Sampling Rotas</span>
          <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full text-[10px]">
            {rotas.length}
          </span>
        </button>

        <button
          onClick={() => setActiveAdminTab('satellite')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
            activeAdminTab === 'satellite'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Satellite className="w-4 h-4" />
          <span>Satellite Ingest & Calibrator</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('cooperatives')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
            activeAdminTab === 'cooperatives'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Cooperative Societies (FCS)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('enforcement')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
            activeAdminTab === 'enforcement'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Closed Season & Enforcement</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('audit')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
            activeAdminTab === 'audit'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>CERT-In Audit Log (SHA-256)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('export')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
            activeAdminTab === 'export'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Central & State Exports</span>
        </button>
      </div>

      {/* TAB 1: 3-SIGMA ANOMALY TRIAGE */}
      {activeAdminTab === 'triage' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5 text-amber-600" />
                  Statistical Anomaly Quarantine & Review Queue
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Catches deviating Greater Than 3.0 standard deviations from historical gear/ecotype baselines are automatically sequestered from statewide aggregate raising factors pending DFDO approval.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-slate-100 text-slate-700 font-mono px-3 py-1.5 rounded-lg font-semibold">
                  Algorithm: Jackknife 3-Sigma Filter
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {anomalies.map(record => {
                const isQuarantined = record.status === 'quarantined';
                return (
                  <div 
                    key={record.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isQuarantined 
                        ? 'bg-amber-50/50 border-amber-200 shadow-sm'
                        : record.status === 'approved'
                        ? 'bg-emerald-50/40 border-emerald-200 opacity-90'
                        : record.status === 'rejected'
                        ? 'bg-rose-50/40 border-rose-200 opacity-75'
                        : 'bg-blue-50/40 border-blue-200'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded border border-slate-200">
                            {record.id}
                          </span>
                          <span className="font-bold text-sm text-slate-900">
                            {record.waterbody}
                          </span>
                          <span className="text-xs text-slate-500">
                            • {record.district}
                          </span>
                          <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                            {record.date}
                          </span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            record.status === 'quarantined'
                              ? 'bg-amber-200 text-amber-900'
                              : record.status === 'approved'
                              ? 'bg-emerald-200 text-emerald-900'
                              : record.status === 'rejected'
                              ? 'bg-rose-200 text-rose-900'
                              : 'bg-blue-200 text-blue-900'
                          }`}>
                            {record.status.replace('_', ' ')}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 font-medium">
                          <span className="font-bold text-slate-900">Species Logged:</span> {record.species} (AI Conf: {record.aiConfidence}) • <span className="font-bold text-slate-900">Gear:</span> {record.gear}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                          <div className="bg-white p-2 rounded-lg border border-slate-200">
                            <span className="text-[10px] text-slate-500 block">Reported Catch:</span>
                            <span className="font-black text-rose-600 text-sm">{record.reportedCatchKg} kg</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-200">
                            <span className="text-[10px] text-slate-500 block">Rolling Baseline:</span>
                            <span className="font-bold text-slate-700 text-sm">{record.expectedCatchKg} kg</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-200">
                            <span className="text-[10px] text-slate-500 block">Standard Deviation:</span>
                            <span className="font-black text-amber-700 text-sm">+{record.sigmaDeviation}σ</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-200">
                            <span className="text-[10px] text-slate-500 block">Reporting Staff:</span>
                            <span className="font-medium text-slate-800 truncate block">{record.demonstrator}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-amber-800 font-medium pt-1">
                          ⚠️ {record.reason}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      {isQuarantined && (
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto pt-2 lg:pt-0">
                          <button
                            onClick={() => handleActionAnomaly(record.id, 'approved')}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve Catch</span>
                          </button>
                          <button
                            onClick={() => handleActionAnomaly(record.id, 'inspection_requested')}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Verify On-Site</span>
                          </button>
                          <button
                            onClick={() => handleActionAnomaly(record.id, 'rejected')}
                            className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject (Error)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ZONAL SAMPLING ROTAS */}
      {activeAdminTab === 'rota' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  ICAR-CIFRI Stratified Sampling Rota Management
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Randomized scheduling across Assam's 4 agro-ecological strata ensuring unbiased temporal and spatial Catch Per Unit Effort (CPUE) observation.
                </p>
              </div>
              <button
                onClick={handleGenerateRota}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Add Randomized Rota Slot</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-3 font-bold">Rota ID</th>
                    <th className="py-3 px-3 font-bold">Date & Shift</th>
                    <th className="py-3 px-3 font-bold">Target Waterbody & Ghat</th>
                    <th className="py-3 px-3 font-bold">Ecological Stratum</th>
                    <th className="py-3 px-3 font-bold">Assigned Demonstrator</th>
                    <th className="py-3 px-3 font-bold">Target Gears</th>
                    <th className="py-3 px-3 font-bold">Geofence</th>
                    <th className="py-3 px-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {rotas.map(rota => (
                    <tr key={rota.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-blue-900">{rota.id}</td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 block">{rota.date}</span>
                        <span className="text-[11px] text-slate-500">{rota.shift}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 block">{rota.waterbody}</span>
                        <span className="text-[11px] text-slate-500">{rota.ghatPoint}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px]">
                          {rota.stratum}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-900">{rota.demonstrator}</td>
                      <td className="py-3 px-3 text-slate-600">{rota.targetGear}</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          500m Lock
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          {rota.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SATELLITE INGEST & CALIBRATOR */}
      {activeAdminTab === 'satellite' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Calibration Parameters (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Satellite className="w-5 h-5 text-indigo-600" />
                  Copernicus Sentinel Earth Observation Pipeline
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust Modified Normalized Difference Water Index (MNDWI) spectral thresholding for seasonal wetland boundary extraction.
                </p>
              </div>

              {/* Slider for MNDWI */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">MNDWI Water Surface Threshold:</span>
                  <span className="font-mono font-black text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200 text-sm">
                    {mndwiThreshold.toFixed(2)}
                  </span>
                </div>
                <input 
                  type="range"
                  min="0.05"
                  max="0.25"
                  step="0.01"
                  value={mndwiThreshold}
                  onChange={(e) => setMndwiThreshold(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0.05 (Wetland Fringe + Macrophytes)</span>
                  <span>0.12 (Optimal Open Water)</span>
                  <span>0.25 (Deep Limnetic Core Only)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Formula: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-bold">MNDWI = (Band 3 Green - Band 11 SWIR) / (Band 3 Green + Band 11 SWIR)</code>. Pixels exceeding {mndwiThreshold} are delineated into active surface water-spread ($A_&#123;\text&#123;sat&#125;&#125;$).
                </p>
              </div>

              {/* Monsoon SAR Radar Cloud-Penetration Toggle */}
              <div className="p-5 rounded-2xl border border-indigo-100 bg-indigo-50/50 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 text-xs block">
                    Monsoon Cloud Cover Fallback: Sentinel-1 SAR (C-Band Synthetic Aperture Radar)
                  </span>
                  <p className="text-[11px] text-slate-600">
                    Penetrates heavy monsoonal overcast and torrential rain between June and August when optical Sentinel-2 data is Greater Than 70% obscured.
                  </p>
                </div>
                <button
                  onClick={() => setSarFallbackActive(!sarFallbackActive)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    sarFallbackActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {sarFallbackActive ? 'SAR Active (Radar)' : 'Optical S-2 Default'}
                </button>
              </div>

              {/* Biometric Equation Editor */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Allometric Biomass Coefficients (W = a · L^b)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Labeo rohita (Rohu)</span>
                    <span className="text-[11px] font-mono text-indigo-800">a = 0.0125, b = 3.02</span>
                    <span className="text-[10px] text-slate-500 block">Assam plains ecotype</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Catla catla (Bhakua)</span>
                    <span className="text-[11px] font-mono text-indigo-800">a = 0.0112, b = 3.15</span>
                    <span className="text-[10px] text-slate-500 block">Fast-growing limnetic carp</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Satellite Metadata Tile (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-sm space-y-5 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-cyan-400">TILE: 46RCN-20261122</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-mono font-bold border border-emerald-500/30">
                  Cloud Cover: 4.2%
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Extracted Water Surface (Deepor Beel):</span>
                  <span className="text-2xl font-black text-cyan-300">2,840.6 Hectares</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Post-monsoon contraction phase (-27.5% vs. July peak)</span>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 space-y-2">
                  <span className="font-bold text-slate-200 text-xs block">Dynamic Scaling Factor (Deepor):</span>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Baseline Cadastral Area:</span>
                    <span className="font-mono text-slate-200">4,014.0 Ha</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Dynamic Satellite Area:</span>
                    <span className="font-mono text-cyan-300">2,840.6 Ha</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold border-t border-slate-700 pt-1.5">
                    <span className="text-slate-300">Area Multiplier (Asat/Abase):</span>
                    <span className="font-mono text-emerald-400 text-sm">0.7076</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  By applying dynamic satellite scaling rather than static cadastral figures, MatsyaDrishti eliminates a +41.3% overestimation error during winter contraction periods.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COOPERATIVE SOCIETIES (FCS) */}
      {activeAdminTab === 'cooperatives' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  Beel Fishery Cooperative Societies (FCS) Registry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Lessee management, subsidized fingerling stocking tracking, and harvest recovery realization rates across registered wetland bodies.
                </p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 font-mono text-xs font-bold">
                Assam Fishery Rules Regulated
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {COOPERATIVES.map(fcs => (
                <div key={fcs.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 block">{fcs.id}</span>
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">{fcs.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{fcs.waterbody} • {fcs.district}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      fcs.complianceRating === 'A+'
                        ? 'bg-emerald-100 text-emerald-800'
                        : fcs.complianceRating === 'A'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      Rating: {fcs.complianceRating}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs border-t border-slate-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Active Fishermen:</span>
                      <span className="font-bold text-slate-900">{fcs.activeFishers} members</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Annual Settlement Fee:</span>
                      <span className="font-bold text-slate-900">{fcs.annualLeaseFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fingerlings Stocked:</span>
                      <span className="font-mono text-indigo-700 font-bold">{fcs.actualStockedFingerlings.toLocaleString()} / {fcs.stockingTargetFingerlings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Harvest Realization:</span>
                      <span className="font-mono text-emerald-700 font-black">{fcs.harvestRealizationPct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CLOSED SEASON & CONSERVATION ENFORCEMENT */}
      {activeAdminTab === 'enforcement' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-rose-600" />
                  Assam Fishery Rules Regulatory Compliance & Closed Season
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enforcement of the statutory breeding ban (1st May – 15th July) under Section 23 of the Assam Fishery Rules and monitoring of illegal fishing gears.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">Breeding Closed Season</span>
                <p className="text-sm font-black text-rose-950">1st May to 15th July (76 Days)</p>
                <p className="text-xs text-rose-800">
                  Automatic system lockdown: commercial gillnet and seine logging disabled; only traditional subsistence fishing permitted.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Banned Gear Vigilance</span>
                <p className="text-sm font-black text-amber-950">Monofilament Mesh Smaller than 7cm</p>
                <p className="text-xs text-amber-800">
                  Instant incident reporting portal for riverine patrol units capturing illegal gillnets, current nets, and electro-fishing devices.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Broodstock Sanctuary Geofencing</span>
                <p className="text-sm font-black text-blue-950">Protected Deep River Pools (Dahas)</p>
                <p className="text-xs text-blue-800">
                  Critical breeding havens for Chitala chitala and native carps obfuscated to 2 decimal degrees on public portals to prevent targeted poaching.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CERT-IN AUDIT LOG */}
      {activeAdminTab === 'audit' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-indigo-600" />
                  CERT-In Cryptographic Audit Log (SHA-256 Chain)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tamper-proof evidentiary log tracking all administrative interventions, model parameter adjustments, and anomaly approvals.
                </p>
              </div>
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl border border-indigo-200 font-mono text-xs font-bold">
                Safe-to-Host Compliant
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {auditLogs.map(log => (
                <div key={log.id} className="p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">{log.id}</span>
                      <span className="text-slate-400 text-[11px]">• {log.timestamp}</span>
                      <span className="bg-indigo-900/60 text-indigo-300 text-[10px] px-2 py-0.5 rounded border border-indigo-700/50">
                        {log.role}
                      </span>
                    </div>
                    <p className="text-slate-100 font-sans text-xs">
                      <span className="text-amber-300 font-semibold">{log.actor}:</span> {log.action}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">HASH: {log.hash}</span>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: CENTRAL & STATE EXPORTS */}
      {activeAdminTab === 'export' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  Inter-Departmental Reporting & Export Engine
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Automated compilation of statutory returns for the National Fisheries Development Board (NFDB) and ICAR-CIFRI.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <span className="text-xs font-bold text-slate-900 block">ICAR-CIFRI Monthly CAS Return</span>
                <p className="text-xs text-slate-600">
                  Standardized monthly catch assessment survey tables formatted to ICAR-CIFRI Bulletin No. 130/188 guidelines.
                </p>
                <a
                  href="/NESFIC_D33_ICAR_CIFRI_Methodology_Alignment_Report.pdf"
                  download
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all block text-center"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Compliance Report (PDF)</span>
                </a>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <span className="text-xs font-bold text-slate-900 block">NFDB Statewide Harvest Dataset</span>
                <p className="text-xs text-slate-600">
                  Tabular CSV/JSON export of open-water biomass estimates, gear CPUEs, and species proportions.
                </p>
                <a
                  href="/PROPOSAL_SUBMISSION_CLEAN_TEXT.txt"
                  download
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all block text-center"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Proposal Submission Text</span>
                </a>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <span className="text-xs font-bold text-slate-900 block">Official Technical Evidence Dossier</span>
                <p className="text-xs text-slate-600">
                  Comprehensive 10-figure technical report containing architecture, satellite extractions, and $R^2=0.942$ model proof.
                </p>
                <a
                  href="/NESFIC_D33_MatsyaDrishti_Proof_of_Work.pdf"
                  download
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all block text-center"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Proof of Work (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
