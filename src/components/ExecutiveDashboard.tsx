import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Fish, 
  ShieldAlert, 
  Download, 
  Calendar, 
  CheckCircle2, 
  PieChart, 
  AlertCircle, 
  ArrowUpRight, 
  FileSpreadsheet, 
  Building 
} from 'lucide-react';
import { ASSAM_WATERBODIES, ASSAM_GEARS, ASSAM_FISH_SPECIES } from '../services/mockData';
import { StatisticalEngine } from '../services/statisticalEngine';
import { CatchAssessmentRecord } from '../types/fishery';

interface ExecutiveDashboardProps {
  records: CatchAssessmentRecord[];
  onNavigateToCAS: () => void;
  onNavigateToRaising: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  records,
  onNavigateToCAS,
  onNavigateToRaising
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [exportSuccess, setExportSuccess] = useState(false);

  // Compute overall state estimates
  const allStratumResults = ASSAM_WATERBODIES.map(wb => 
    StatisticalEngine.calculateStratumRaisingFactor(wb, records)
  );

  const totalExtrapolatedCatchMT = allStratumResults.reduce((a, b) => a + b.monthlyEstimatedCatchMT, 0);
  const totalWaterSpreadHa = ASSAM_WATERBODIES.reduce((a, b) => a + b.currentMNDWIAreaHa, 0);
  const overallMeanCPUE = StatisticalEngine.computeMeanCPUE(records);
  const diversityResult = StatisticalEngine.computeShannonDiversity(records);

  // Catch by species aggregation
  const speciesTotals: { [name: string]: number } = {};
  records.forEach(r => {
    r.speciesComposition.forEach(item => {
      const sp = ASSAM_FISH_SPECIES.find(s => s.id === item.speciesId);
      const spName = sp ? sp.commonName : item.speciesId;
      speciesTotals[spName] = (speciesTotals[spName] || 0) + item.estimatedWeightKg;
    });
  });

  const handleExportData = () => {
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Directorate Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full border border-blue-400/30 mb-3">
              <Building className="w-3.5 h-3.5" />
              <span>Directorate of Fisheries, Govt. of Assam • State Biomass Command Console</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">
              Statewide Open-Water Fisheries Intelligence
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Real-time harvest monitoring across Assam's Brahmaputra-Barak river basins and 1,392+ registered floodplain beels, powered by ICAR-CIFRI Catch Assessment Surveys (CAS).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>{exportSuccess ? '✓ NFDB Export Ready' : 'Export NFDB / DoF Return'}</span>
            </button>
            <button
              onClick={onNavigateToRaising}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all"
            >
              <span>Explore Raising Engine</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Extrapolated Biomass */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider">Estimated Monthly Harvest</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Fish className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {totalExtrapolatedCatchMT.toFixed(1)} <span className="text-sm font-bold text-slate-400">MT</span>
          </div>
          <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4.2% vs previous seasonal cycle</span>
          </p>
        </div>

        {/* KPI 2: Active Water Spread */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider">Monitored Water Spread</span>
            <span className="p-2 bg-cyan-50 text-cyan-600 rounded-xl">
              <BarChart3 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {totalWaterSpreadHa.toLocaleString()} <span className="text-sm font-bold text-slate-400">Ha</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Sentinel-2 MNDWI automated measurement
          </p>
        </div>

        {/* KPI 3: Mean CPUE */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider">Mean State CPUE</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {overallMeanCPUE} <span className="text-sm font-bold text-slate-400">kg/hr</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Multi-gear weighted average
          </p>
        </div>

        {/* KPI 4: Species Diversity (Shannon-Wiener) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider">Biodiversity Index (H')</span>
            <span className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <PieChart className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {diversityResult.index} <span className="text-sm font-bold text-purple-600">H'</span>
          </div>
          <p className="text-xs text-emerald-700 font-bold mt-2">
            Status: {diversityResult.healthStatus}
          </p>
        </div>
      </div>

      {/* Compliance Alert & Season Notification Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-amber-950">
              Assam Fishery Rules: Monsoon Closed Season Preparedness (1st May - 15th July)
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              Automated compliance check active. No commercial drag net (Ber jaal) operations permitted during breeding period. Digital surveillance linked to Brahmaputra riverine patrol ghats.
            </p>
          </div>
        </div>
        <span className="bg-amber-200 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap">
          Compliance Index: 96.4%
        </span>
      </div>

      {/* Charts & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Card: Species Composition Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Species Group Biomass Distribution
              </h3>
              <p className="text-xs text-slate-500">Based on primary landing surveys</p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
              Sampled: {records.length} Landings
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {Object.entries(speciesTotals).map(([name, weight]) => {
              const maxVal = Math.max(...Object.values(speciesTotals));
              const pct = maxVal > 0 ? (weight / maxVal) * 100 : 0;
              return (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{name}</span>
                    <span className="font-mono font-bold text-blue-700">{weight.toFixed(1)} kg</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Card: Gear Productivity Comparison */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Gear Productivity (CPUE Benchmark vs Field Sample)
              </h3>
              <p className="text-xs text-slate-500">Measured in kg caught per hour</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {ASSAM_GEARS.map(gear => {
              const matching = records.filter(r => r.gearTypeId === gear.id);
              const sampleCPUE = StatisticalEngine.computeMeanCPUE(matching);
              return (
                <div key={gear.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900">{gear.name}</span>
                      <span className="text-[10px] text-slate-500 block">{gear.assameseName} • Mesh: {gear.typicalMeshMm}mm</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-base text-blue-700">
                        {sampleCPUE > 0 ? `${sampleCPUE} kg/hr` : `${gear.averageCatchRateKgHr} kg/hr`}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Bench: {gear.averageCatchRateKgHr} kg/hr
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
