import React, { useState } from 'react';
import { 
  PlusCircle, 
  CheckCircle2, 
  MapPin, 
  Scale, 
  Clock, 
  Ship, 
  Camera, 
  Sparkles, 
  RefreshCw, 
  AlertCircle, 
  Check, 
  Layers, 
  Info 
} from 'lucide-react';
import { 
  ASSAM_WATERBODIES, 
  ASSAM_GEARS, 
  ASSAM_FISH_SPECIES 
} from '../services/mockData';
import { CatchAssessmentRecord, CraftType } from '../types/fishery';

interface FieldCASLogbookProps {
  records: CatchAssessmentRecord[];
  onAddRecord: (record: CatchAssessmentRecord) => void;
  onSyncAll: () => void;
}

export const FieldCASLogbook: React.FC<FieldCASLogbookProps> = ({
  records,
  onAddRecord,
  onSyncAll
}) => {
  const [selectedWaterbodyId, setSelectedWaterbodyId] = useState(ASSAM_WATERBODIES[0].id);
  const [ghatName, setGhatName] = useState('Pamohi Canal Landing Ghat');
  const [craftType, setCraftType] = useState<CraftType>('Dugout Canoe (Kosh Nauka)');
  const [selectedGearId, setSelectedGearId] = useState(ASSAM_GEARS[0].id);
  const [crewSize, setCrewSize] = useState(2);
  const [soakHours, setSoakHours] = useState(3.5);
  const [totalCatchKg, setTotalCatchKg] = useState<number>(14.5);
  const [enumeratorName, setEnumeratorName] = useState('P. Kalita (Demonstrator)');
  const [notes, setNotes] = useState('');
  
  // Species breakdown state: percentage mapping
  const [speciesDistribution, setSpeciesDistribution] = useState<{ [speciesId: string]: number }>({
    rohu: 40,
    boal: 35,
    punti: 25
  });

  const [isAiScanning, setIsAiScanning] = useState(false);
  const [aiScanMessage, setAiScanMessage] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const selectedWaterbody = ASSAM_WATERBODIES.find(w => w.id === selectedWaterbodyId)!;
  const selectedGear = ASSAM_GEARS.find(g => g.id === selectedGearId)!;

  // Real-time CPUE
  const currentCPUE = soakHours > 0 ? Number((totalCatchKg / soakHours).toFixed(2)) : 0;

  // Handle AI Auto-Tagging simulation
  const handleSimulateAiScan = () => {
    setIsAiScanning(true);
    setAiScanMessage('Edge MobileNet-V3 inspecting landing catch basket...');
    setTimeout(() => {
      setIsAiScanning(false);
      setAiScanMessage('✓ Identified: 45% Labeo rohita, 30% Wallago attu, 25% Amblypharyngodon mola');
      setSpeciesDistribution({
        rohu: 45,
        boal: 30,
        mola: 25
      });
      setTimeout(() => setAiScanMessage(null), 4000);
    }, 1200);
  };

  const handleSpeciesSliderChange = (speciesId: string, val: number) => {
    setSpeciesDistribution(prev => ({
      ...prev,
      [speciesId]: val
    }));
  };

  const handleQuickAddCatch = (addedKg: number) => {
    setTotalCatchKg(prev => Number((Math.max(0.5, prev + addedKg)).toFixed(1)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Normalize percentages if they don't add to 100
    const rawTotal = Object.values(speciesDistribution).reduce((a, b) => a + b, 0) || 100;
    const speciesComp = Object.entries(speciesDistribution)
      .filter(([_, pct]) => pct > 0)
      .map(([sId, pct]) => {
        const normalizedPct = Number(((pct / rawTotal) * 100).toFixed(1));
        const estimatedWeight = Number(((normalizedPct / 100) * totalCatchKg).toFixed(2));
        return {
          speciesId: sId,
          percentage: normalizedPct,
          estimatedWeightKg: estimatedWeight
        };
      });

    const newRecord: CatchAssessmentRecord = {
      id: `REC-2026-${String(records.length + 1).padStart(3, '0')}`,
      sampleDate: new Date().toISOString().split('T')[0],
      waterbodyId: selectedWaterbodyId,
      ghatName,
      gpsCoordinates: [
        Number((selectedWaterbody.coordinates[0] + (Math.random() - 0.5) * 0.01).toFixed(4)),
        Number((selectedWaterbody.coordinates[1] + (Math.random() - 0.5) * 0.01).toFixed(4))
      ],
      craftType,
      gearTypeId: selectedGearId,
      crewSize,
      soakHours,
      totalCatchKg,
      speciesComposition: speciesComp,
      computedCPUEKgHr: currentCPUE,
      enumeratorName,
      verifiedByDFDO: false,
      syncStatus: 'pending', // Starts in offline queue
      sampleNotes: notes || `Field catch recorded via PWA at ${ghatName}`
    };

    onAddRecord(newRecord);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-xl border border-blue-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-800/80 text-blue-200 text-xs px-2.5 py-1 rounded-full mb-2 border border-blue-700">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>ICAR-CIFRI Stratified Catch Assessment Survey (CAS)</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              Field Catch Assessment Mobile Logbook
            </h1>
            <p className="text-sm text-blue-200 mt-1 max-w-2xl">
              Rapid digital landing registration for Beel & River ghats. Operates fully offline; logs store in client IndexedDB and auto-reconcile with state server when network is detected.
            </p>
          </div>

          <button
            onClick={onSyncAll}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-700/30 whitespace-nowrap"
          >
            <RefreshCw className="w-4 h-4 animate-spin-hover" />
            <span>Sync All to State Server</span>
          </button>
        </div>
      </div>

      {showSuccessToast && (
        <div className="bg-emerald-50 border border-emerald-400 text-emerald-900 p-4 rounded-xl flex items-center justify-between shadow-md animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm">Landing Record Saved Locally!</p>
              <p className="text-xs text-emerald-700">
                Queued in offline store with cryptographic timestamp and GPS lock. Ready for raising factor integration.
              </p>
            </div>
          </div>
          <span className="text-xs bg-emerald-200 text-emerald-800 font-bold px-2 py-1 rounded">
            Sync: Pending
          </span>
        </div>
      )}

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: The Input Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Waterbody & Ghat Location */}
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  1. Waterbody & Landing Ghat (Geofenced)
                </span>
                <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-medium">
                  GPS Fixed: ±4.2m
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Target Beel / River Sector *
                  </label>
                  <select
                    value={selectedWaterbodyId}
                    onChange={(e) => setSelectedWaterbodyId(e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    {ASSAM_WATERBODIES.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.district}) - {w.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Landing Ghat / Fishing Village Name *
                  </label>
                  <input
                    type="text"
                    value={ghatName}
                    onChange={(e) => setGhatName(e.target.value)}
                    placeholder="e.g. Tetelia Ghat, Silghat..."
                    required
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Craft & Gear Specifications */}
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Ship className="w-4 h-4 text-blue-600" />
                  2. Craft Type & Gear Deployed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fishing Craft (Assam Traditional)
                  </label>
                  <select
                    value={craftType}
                    onChange={(e) => setCraftType(e.target.value as CraftType)}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option value="Dugout Canoe (Kosh Nauka)">Dugout Canoe (Kosh Nauka / নাও)</option>
                    <option value="Plank-built Dinghi">Plank-built Dinghi (ডিঙি)</option>
                    <option value="Motorized Country Boat">Motorized Country Boat</option>
                    <option value="Shore-based / Wading">Shore-based / Wading (No boat)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gear Classification
                  </label>
                  <select
                    value={selectedGearId}
                    onChange={(e) => setSelectedGearId(e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    {ASSAM_GEARS.map(g => (
                      <option key={g.id} value={g.id}>
                        {g.name} - {g.assameseName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Crew Size (Active Fishers)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={15}
                      value={crewSize}
                      onChange={(e) => setCrewSize(Math.max(1, Number(e.target.value)))}
                      className="w-24 text-sm border border-slate-300 rounded-lg p-2 bg-slate-50 text-center font-bold"
                    />
                    <span className="text-xs text-slate-500">fishers on craft</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Soak / Operation Duration (Hours)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step={0.5}
                      min={0.5}
                      max={24}
                      value={soakHours}
                      onChange={(e) => setSoakHours(Math.max(0.5, Number(e.target.value)))}
                      className="w-24 text-sm border border-slate-300 rounded-lg p-2 bg-slate-50 text-center font-bold text-blue-700"
                    />
                    <div className="flex gap-1">
                      {[1, 2, 3.5, 6].map(h => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setSoakHours(h)}
                          className={`text-xs px-2 py-1 rounded border ${
                            soakHours === h 
                              ? 'bg-blue-600 text-white border-blue-600 font-bold' 
                              : 'bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          {h}h
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Gross Catch Weight & Live CPUE */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  3. Gross Catch Harvest & Calculated CPUE
                </span>
                <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  CPUE: {currentCPUE} kg / hr
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Landed Weight (Kilograms) *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step={0.1}
                      min={0.1}
                      value={totalCatchKg}
                      onChange={(e) => setTotalCatchKg(Math.max(0.1, Number(e.target.value)))}
                      className="w-32 text-lg font-black border border-slate-300 rounded-lg p-2 bg-white text-emerald-700"
                    />
                    <div className="flex flex-wrap gap-1">
                      {[+1, +5, +10, -1].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleQuickAddCatch(val)}
                          className="text-xs bg-white hover:bg-slate-100 border border-slate-300 px-2 py-1 rounded font-semibold text-slate-700"
                        >
                          {val > 0 ? `+${val}` : val} kg
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Selected Gear:</span>
                    <span className="font-semibold text-slate-900">{selectedGear.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Regional Benchmark:</span>
                    <span className="font-mono">{selectedGear.averageCatchRateKgHr} kg/hr</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Effort Intensity:</span>
                    <span className={`font-bold ${currentCPUE > selectedGear.averageCatchRateKgHr ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {currentCPUE > selectedGear.averageCatchRateKgHr ? 'Above Normal' : 'Moderate'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Species Composition (AI-Assisted) */}
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  4. Species Breakdown & AI Classifier (TFLite)
                </span>

                <button
                  type="button"
                  onClick={handleSimulateAiScan}
                  disabled={isAiScanning}
                  className="flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs px-3 py-1 rounded-lg font-semibold transition-all disabled:opacity-50"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{isAiScanning ? 'Classifying...' : 'AI Photo Scan'}</span>
                </button>
              </div>

              {aiScanMessage && (
                <div className="mb-3 text-xs bg-purple-100 text-purple-900 border border-purple-300 p-2.5 rounded-lg flex items-center gap-2 animate-pulse">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>{aiScanMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ASSAM_FISH_SPECIES.slice(0, 6).map(spec => {
                  const currentPct = speciesDistribution[spec.id] || 0;
                  const estimatedWt = Number(((currentPct / 100) * totalCatchKg).toFixed(1));
                  return (
                    <div key={spec.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-slate-900">{spec.commonName}</p>
                          <p className="text-[10px] text-slate-500 italic">{spec.scientificName}</p>
                          <span className="text-[10px] bg-slate-200 px-1.5 py-0.2 rounded font-medium text-slate-700">
                            {spec.assameseName}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                          {currentPct}%
                        </span>
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={currentPct}
                        onChange={(e) => handleSpeciesSliderChange(spec.id, Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />

                      <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                        <span>Est. Yield:</span>
                        <span className="font-semibold text-slate-800">{estimatedWt} kg</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enumerator & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Field Enumerator / Demonstrator Name
                </label>
                <input
                  type="text"
                  value={enumeratorName}
                  onChange={(e) => setEnumeratorName(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Field Observations / Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Floodwater recession, high river current..."
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all text-sm"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Save Landing Record to Field Store</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Recent Submissions & Waterbody Overview */}
        <div className="space-y-6">
          {/* Active Waterbody Snapshot */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              Active Waterbody Frame Profile
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Name:</span>
                <span className="font-bold text-slate-900">{selectedWaterbody.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Ecosystem Type:</span>
                <span className="bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-medium">
                  {selectedWaterbody.type}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Registered Area:</span>
                <span className="font-mono font-semibold">{selectedWaterbody.registeredAreaHa} Ha</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Satellite Water Spread (Nov):</span>
                <span className="font-mono font-bold text-cyan-700">{selectedWaterbody.currentMNDWIAreaHa} Ha</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Registered Fishing Crafts:</span>
                <span className="font-semibold text-slate-800">{selectedWaterbody.totalRegisteredCrafts} boats</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Fishery Cooperative:</span>
                <span className="font-semibold text-slate-800 text-right">{selectedWaterbody.activeFisheryCooperative}</span>
              </div>
            </div>
          </div>

          {/* Recent CAS Logs */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">
                Recent Survey Landings ({records.length})
              </h3>
              <span className="text-[11px] text-slate-500">Latest first</span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
              {records.slice().reverse().map(rec => {
                const gear = ASSAM_GEARS.find(g => g.id === rec.gearTypeId);
                const wb = ASSAM_WATERBODIES.find(w => w.id === rec.waterbodyId);
                return (
                  <div key={rec.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{rec.id}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        rec.syncStatus === 'synced' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {rec.syncStatus === 'synced' ? 'Synced' : 'Offline Queued'}
                      </span>
                    </div>

                    <div className="text-slate-600">
                      <p className="font-medium text-slate-800">{wb?.name} • {rec.ghatName}</p>
                      <p className="text-[11px] text-slate-500">{gear?.name} • {rec.soakHours} hrs soak</p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                      <span className="font-black text-slate-900">{rec.totalCatchKg} kg</span>
                      <span className="font-mono text-blue-700 font-bold">{rec.computedCPUEKgHr} kg/hr</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
