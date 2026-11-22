import { Waterbody, GearType, FishSpecies, CatchAssessmentRecord } from '../types/fishery';

export const ASSAM_WATERBODIES: Waterbody[] = [
  {
    id: 'deepor-beel',
    name: 'Deepor Beel',
    assameseName: 'দীপােৰ বিল',
    district: 'Kamrup Metropolitan',
    type: 'Open Beel',
    coordinates: [26.1264, 91.6548],
    registeredAreaHa: 4014,
    currentMNDWIAreaHa: 2850,
    activeFisheryCooperative: 'Deepor Beel Fishery Samabai Samiti Ltd.',
    totalRegisteredCrafts: 142,
    activeGhatCount: 6,
    meanAnnualCatchMT: 184.5,
    ecologicalZone: 'Central Brahmaputra',
    boundaryPolygon: [
      [26.140, 91.640],
      [26.142, 91.670],
      [26.115, 91.680],
      [26.110, 91.645]
    ]
  },
  {
    id: 'urpad-beel',
    name: 'Urpad Beel',
    assameseName: 'উৰ্পদ বিল',
    district: 'Goalpara',
    type: 'Open Beel',
    coordinates: [26.0825, 90.5891],
    registeredAreaHa: 1040,
    currentMNDWIAreaHa: 920,
    activeFisheryCooperative: 'Urpad Fishery Union Society',
    totalRegisteredCrafts: 88,
    activeGhatCount: 4,
    meanAnnualCatchMT: 95.2,
    ecologicalZone: 'Lower Brahmaputra'
  },
  {
    id: 'son-beel',
    name: 'Son Beel',
    assameseName: 'চোন বিল',
    district: 'Karimganj',
    type: 'Open Beel',
    coordinates: [24.6908, 92.4419],
    registeredAreaHa: 3450,
    currentMNDWIAreaHa: 1980,
    activeFisheryCooperative: 'Barak Valley Central Matsyagibi Samiti',
    totalRegisteredCrafts: 210,
    activeGhatCount: 9,
    meanAnnualCatchMT: 245.0,
    ecologicalZone: 'Barak Valley'
  },
  {
    id: 'dora-beel',
    name: 'Dora Beel',
    assameseName: 'দৰা বিল',
    district: 'Kamrup Rural',
    type: 'Closed Beel',
    coordinates: [26.0441, 91.4312],
    registeredAreaHa: 320,
    currentMNDWIAreaHa: 290,
    activeFisheryCooperative: 'Rampur Beel Fishery Society',
    totalRegisteredCrafts: 35,
    activeGhatCount: 3,
    meanAnnualCatchMT: 42.8,
    ecologicalZone: 'Central Brahmaputra'
  },
  {
    id: 'brahmaputra-guwahati',
    name: 'Brahmaputra River - Guwahati Sector',
    assameseName: 'ব্ৰহ্মপুত্ৰ নদী (গুৱাহাটী ঘাট)',
    district: 'Kamrup Metropolitan',
    type: 'River Mainstem',
    coordinates: [26.1925, 91.7456],
    registeredAreaHa: 5200,
    currentMNDWIAreaHa: 5200,
    activeFisheryCooperative: 'Guwahati Nodi Matsyajibee Sanstha',
    totalRegisteredCrafts: 165,
    activeGhatCount: 8,
    meanAnnualCatchMT: 310.4,
    ecologicalZone: 'Central Brahmaputra'
  },
  {
    id: 'brahmaputra-tezpur',
    name: 'Brahmaputra River - Silghat / Tezpur',
    assameseName: 'ব্ৰহ্মপুত্ৰ নদী (তেজপুৰ/শিলঘাট)',
    district: 'Sonitpur',
    type: 'River Mainstem',
    coordinates: [26.6112, 92.8315],
    registeredAreaHa: 4800,
    currentMNDWIAreaHa: 4800,
    activeFisheryCooperative: 'Kalia Bhomora River Fishery Co-op',
    totalRegisteredCrafts: 110,
    activeGhatCount: 5,
    meanAnnualCatchMT: 198.6,
    ecologicalZone: 'Upper Brahmaputra'
  },
  {
    id: 'morigaon-pobitora-beel',
    name: 'Morakolong & Pokoria Beel System',
    assameseName: 'মৰাকলং আৰু পকৰীয়া বিল',
    district: 'Morigaon',
    type: 'Open Beel',
    coordinates: [26.2415, 92.0521],
    registeredAreaHa: 890,
    currentMNDWIAreaHa: 760,
    activeFisheryCooperative: 'Mayong Fishery Cooperative',
    totalRegisteredCrafts: 64,
    activeGhatCount: 4,
    meanAnnualCatchMT: 84.1,
    ecologicalZone: 'Central Brahmaputra'
  }
];

export const ASSAM_GEARS: GearType[] = [
  {
    id: 'phansi-jaal',
    name: 'Phansi Jaal (Gillnet)',
    assameseName: 'ফাঁসি জাল',
    category: 'Gillnet',
    typicalMeshMm: 50,
    averageCatchRateKgHr: 2.4,
    unitEffortDescription: 'kg per 100m net length per hour of soak'
  },
  {
    id: 'khewali-jaal',
    name: 'Khewali Jaal (Cast Net)',
    assameseName: 'খেৱালি জাল',
    category: 'Cast Net',
    typicalMeshMm: 15,
    averageCatchRateKgHr: 1.1,
    unitEffortDescription: 'kg per fisher per 20 active throws'
  },
  {
    id: 'ber-jaal',
    name: 'Ber Jaal / Mahajaal (Seine/Drag Net)',
    assameseName: 'বেৰ জাল / মহাজাল',
    category: 'Drag Net',
    typicalMeshMm: 25,
    averageCatchRateKgHr: 8.5,
    unitEffortDescription: 'kg per active haul (typically 6-10 crew members)'
  },
  {
    id: 'chepa-trap',
    name: 'Chepa & Polo (Bamboo Woven Traps)',
    assameseName: 'চেপা আৰু পলʼ',
    category: 'Trap',
    typicalMeshMm: 10,
    averageCatchRateKgHr: 0.8,
    unitEffortDescription: 'kg per trap cluster per 12-hour overnight setting'
  },
  {
    id: 'borhi-longline',
    name: 'Borhi (Hook and Longline)',
    assameseName: 'বৰশী',
    category: 'Hook & Line',
    typicalMeshMm: 0,
    averageCatchRateKgHr: 1.6,
    unitEffortDescription: 'kg per 50 hooks per 4-hour drift'
  }
];

export const ASSAM_FISH_SPECIES: FishSpecies[] = [
  {
    id: 'rohu',
    scientificName: 'Labeo rohita',
    commonName: 'Rohu Carp',
    assameseName: 'ৰৌ',
    category: 'IMC (Major Carp)',
    conservationStatus: 'LC',
    averagePricePerKg: 320,
    lengthWeight_a: 0.0125,
    lengthWeight_b: 3.02
  },
  {
    id: 'catla',
    scientificName: 'Gibelion catla (Catla catla)',
    commonName: 'Catla / Bhakun',
    assameseName: 'বাহু / বাহু মাছ',
    category: 'IMC (Major Carp)',
    conservationStatus: 'LC',
    averagePricePerKg: 360,
    lengthWeight_a: 0.0142,
    lengthWeight_b: 3.10
  },
  {
    id: 'mrigal',
    scientificName: 'Cirrhinus mrigala',
    commonName: 'Mrigal Carp',
    assameseName: 'মিৰিকা',
    category: 'IMC (Major Carp)',
    conservationStatus: 'LC',
    averagePricePerKg: 290,
    lengthWeight_a: 0.0118,
    lengthWeight_b: 2.98
  },
  {
    id: 'boal',
    scientificName: 'Wallago attu',
    commonName: 'Helicopter Catfish / Boal',
    assameseName: 'বৰালী',
    category: 'Catfish',
    conservationStatus: 'VU',
    averagePricePerKg: 450,
    lengthWeight_a: 0.0068,
    lengthWeight_b: 3.12
  },
  {
    id: 'pabda',
    scientificName: 'Ompok pabda',
    commonName: 'Pabda Catfish',
    assameseName: 'পাবদা / পাভ',
    category: 'Catfish',
    conservationStatus: 'NT',
    averagePricePerKg: 650,
    lengthWeight_a: 0.0075,
    lengthWeight_b: 3.05
  },
  {
    id: 'mola',
    scientificName: 'Amblypharyngodon mola',
    commonName: 'Mola Carplet (SIS)',
    assameseName: 'মলা / মৌৱা',
    category: 'SIS (Small Indigenous)',
    conservationStatus: 'LC',
    averagePricePerKg: 380,
    lengthWeight_a: 0.0092,
    lengthWeight_b: 2.95
  },
  {
    id: 'punti',
    scientificName: 'Puntius sophore',
    commonName: 'Pool Barb',
    assameseName: 'পুঠি',
    category: 'SIS (Small Indigenous)',
    conservationStatus: 'LC',
    averagePricePerKg: 260,
    lengthWeight_a: 0.0135,
    lengthWeight_b: 3.00
  },
  {
    id: 'chitala',
    scientificName: 'Chitala chitala',
    commonName: 'Humped Featherback',
    assameseName: 'চিতল',
    category: 'Featherback',
    conservationStatus: 'NT',
    averagePricePerKg: 750,
    lengthWeight_a: 0.0051,
    lengthWeight_b: 3.20
  },
  {
    id: 'hilsa',
    scientificName: 'Tenualosa ilisha',
    commonName: 'Hilsa Shad',
    assameseName: 'ইলিহ',
    category: 'Migratory / Clupeid',
    conservationStatus: 'LC',
    averagePricePerKg: 1200,
    lengthWeight_a: 0.0088,
    lengthWeight_b: 3.08
  }
];

export const INITIAL_CATCH_RECORDS: CatchAssessmentRecord[] = [
  {
    id: 'REC-2026-001',
    sampleDate: '2026-11-20',
    waterbodyId: 'deepor-beel',
    ghatName: 'Tetelia Landing Ghat',
    gpsCoordinates: [26.1264, 91.6548],
    craftType: 'Dugout Canoe (Kosh Nauka)',
    gearTypeId: 'phansi-jaal',
    crewSize: 2,
    netLengthM: 120,
    meshSizeMm: 45,
    soakHours: 3.5,
    totalCatchKg: 14.8,
    speciesComposition: [
      { speciesId: 'rohu', percentage: 40, estimatedWeightKg: 5.92 },
      { speciesId: 'boal', percentage: 35, estimatedWeightKg: 5.18 },
      { speciesId: 'punti', percentage: 25, estimatedWeightKg: 3.70 }
    ],
    computedCPUEKgHr: 4.23,
    enumeratorName: 'P. Kalita (Demonstrator)',
    verifiedByDFDO: true,
    syncStatus: 'synced',
    sampleNotes: 'Morning haul landed at 6:30 AM. Favorable clear conditions.'
  },
  {
    id: 'REC-2026-002',
    sampleDate: '2026-11-20',
    waterbodyId: 'deepor-beel',
    ghatName: 'Pamohi Canal Mouth',
    gpsCoordinates: [26.1189, 91.6621],
    craftType: 'Shore-based / Wading',
    gearTypeId: 'khewali-jaal',
    crewSize: 1,
    soakHours: 2.0,
    totalCatchKg: 3.6,
    speciesComposition: [
      { speciesId: 'mola', percentage: 60, estimatedWeightKg: 2.16 },
      { speciesId: 'punti', percentage: 40, estimatedWeightKg: 1.44 }
    ],
    computedCPUEKgHr: 1.80,
    enumeratorName: 'P. Kalita (Demonstrator)',
    verifiedByDFDO: true,
    syncStatus: 'synced',
    sampleNotes: 'Small indigenous species harvest along marginal macrophyte edge.'
  },
  {
    id: 'REC-2026-003',
    sampleDate: '2026-11-21',
    waterbodyId: 'brahmaputra-guwahati',
    ghatName: 'Uzanbazar Fish Landing Ghat',
    gpsCoordinates: [26.1950, 91.7580],
    craftType: 'Plank-built Dinghi',
    gearTypeId: 'ber-jaal',
    crewSize: 7,
    netLengthM: 250,
    meshSizeMm: 35,
    soakHours: 4.0,
    totalCatchKg: 42.5,
    speciesComposition: [
      { speciesId: 'catla', percentage: 45, estimatedWeightKg: 19.12 },
      { speciesId: 'rohu', percentage: 30, estimatedWeightKg: 12.75 },
      { speciesId: 'chitala', percentage: 15, estimatedWeightKg: 6.38 },
      { speciesId: 'hilsa', percentage: 10, estimatedWeightKg: 4.25 }
    ],
    computedCPUEKgHr: 10.63,
    enumeratorName: 'D. Goswami (Field Investigator)',
    verifiedByDFDO: true,
    syncStatus: 'synced',
    sampleNotes: 'Large commercial riverine haul. High market value catch.'
  },
  {
    id: 'REC-2026-004',
    sampleDate: '2026-11-21',
    waterbodyId: 'son-beel',
    ghatName: 'Ramkrishna Nagar Ghat',
    gpsCoordinates: [24.6908, 92.4419],
    craftType: 'Dugout Canoe (Kosh Nauka)',
    gearTypeId: 'chepa-trap',
    crewSize: 1,
    soakHours: 8.0,
    totalCatchKg: 7.2,
    speciesComposition: [
      { speciesId: 'pabda', percentage: 50, estimatedWeightKg: 3.60 },
      { speciesId: 'mola', percentage: 30, estimatedWeightKg: 2.16 },
      { speciesId: 'punti', percentage: 20, estimatedWeightKg: 1.44 }
    ],
    computedCPUEKgHr: 0.90,
    enumeratorName: 'S. Das (Demonstrator)',
    verifiedByDFDO: false,
    syncStatus: 'synced',
    sampleNotes: 'Overnight bamboo trap retrieve. Rich in high-value Ompok pabda.'
  },
  {
    id: 'REC-2026-005',
    sampleDate: '2026-11-22',
    waterbodyId: 'urpad-beel',
    ghatName: 'Agia Central Ghat',
    gpsCoordinates: [26.0825, 90.5891],
    craftType: 'Plank-built Dinghi',
    gearTypeId: 'phansi-jaal',
    crewSize: 2,
    netLengthM: 100,
    meshSizeMm: 55,
    soakHours: 3.0,
    totalCatchKg: 11.4,
    speciesComposition: [
      { speciesId: 'mrigal', percentage: 55, estimatedWeightKg: 6.27 },
      { speciesId: 'boal', percentage: 35, estimatedWeightKg: 3.99 },
      { speciesId: 'chitala', percentage: 10, estimatedWeightKg: 1.14 }
    ],
    computedCPUEKgHr: 3.80,
    enumeratorName: 'M. Rabha (Fishery Officer)',
    verifiedByDFDO: true,
    syncStatus: 'synced',
    sampleNotes: 'Regular winter monitoring sample.'
  }
];
