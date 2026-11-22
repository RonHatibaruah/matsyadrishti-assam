export type WaterbodyType = 'Open Beel' | 'Closed Beel' | 'River Mainstem' | 'River Tributary' | 'Reservoir';

export interface Waterbody {
  id: string;
  name: string;
  assameseName: string;
  district: string;
  type: WaterbodyType;
  coordinates: [number, number]; // [lat, lng]
  registeredAreaHa: number;
  currentMNDWIAreaHa: number;
  activeFisheryCooperative: string;
  totalRegisteredCrafts: number;
  activeGhatCount: number;
  meanAnnualCatchMT: number;
  ecologicalZone: 'Upper Brahmaputra' | 'Central Brahmaputra' | 'Lower Brahmaputra' | 'Barak Valley';
  boundaryPolygon?: [number, number][];
}

export type CraftType = 'Dugout Canoe (Kosh Nauka)' | 'Plank-built Dinghi' | 'Motorized Country Boat' | 'Shore-based / Wading';

export interface GearType {
  id: string;
  name: string;
  assameseName: string;
  category: 'Gillnet' | 'Cast Net' | 'Drag Net' | 'Trap' | 'Hook & Line' | 'Dip Net';
  typicalMeshMm: number;
  averageCatchRateKgHr: number;
  unitEffortDescription: string;
}

export interface FishSpecies {
  id: string;
  scientificName: string;
  commonName: string;
  assameseName: string;
  category: 'IMC (Major Carp)' | 'Exotic Carp' | 'Catfish' | 'SIS (Small Indigenous)' | 'Migratory / Clupeid' | 'Featherback';
  conservationStatus: 'LC' | 'NT' | 'VU' | 'EN';
  averagePricePerKg: number;
  lengthWeight_a: number;
  lengthWeight_b: number;
}

export interface CatchSampleItem {
  speciesId: string;
  percentage: number;
  estimatedWeightKg: number;
}

export interface CatchAssessmentRecord {
  id: string;
  sampleDate: string;
  waterbodyId: string;
  ghatName: string;
  gpsCoordinates: [number, number];
  craftType: CraftType;
  gearTypeId: string;
  crewSize: number;
  netLengthM?: number;
  meshSizeMm?: number;
  soakHours: number;
  totalCatchKg: number;
  speciesComposition: CatchSampleItem[];
  computedCPUEKgHr: number;
  enumeratorName: string;
  verifiedByDFDO: boolean;
  syncStatus: 'synced' | 'pending';
  sampleNotes?: string;
  photoUrl?: string;
}

export interface RaisingFactorStratumResult {
  waterbodyId: string;
  waterbodyName: string;
  district: string;
  sampleCount: number;
  totalSampleWeightKg: number;
  meanCPUEKgHr: number;
  activeCraftUnits: number;
  activeDaysPerMonth: number;
  baselineAreaHa: number;
  satelliteMNDWIAreaHa: number;
  areaMultiplier: number;
  computedRaisingFactor: number;
  monthlyEstimatedCatchMT: number;
  standardErrorMT: number;
  confidenceInterval95: [number, number];
  cvPercentage: number;
}
