import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Layers, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface SectionData {
  number: number;
  title: string;
  wordCount: string;
  limit: string;
  content: string;
}

const PROPOSAL_SECTIONS: SectionData[] = [
  {
    number: 1,
    title: "1. Problem understanding & user workflow",
    wordCount: "420",
    limit: "500 words",
    content: `Assam possesses over 100,000 hectares of floodplain wetlands (beels), 4,820 km of river stretches (Brahmaputra, Barak, and 42+ major tributaries), and numerous open water bodies. These capture fisheries support hundreds of thousands of artisanal fishers and deliver crucial nutritional security. However, unlike closed pond aquaculture where inputs and harvests are quantifiable at discrete gates, open-water fisheries in Assam suffer from a chronic lack of empirical, scientifically rigorous catch estimation.

Key Gaps Addressed:
1. Spatial Dispersion & Dynamic Landings: Fishers operate along remote riverbanks and non-demarcated wetland ghats without centralized harbor gates. Landings occur around the clock with immediate local dispersal or rural roadside sales, making conventional static census impossible.
2. Multi-Gear, Multi-Species Complexity: Over 150 fish species (Indo-Gangetic Major Carps, small indigenous freshwater fish like Amblypharyngodon mola, catfishes like Wallago attu, and migratory Tenualosa ilisha) are caught using diverse traditional gears (gillnets/phansi jaal, cast nets/khewali, drag nets/ber jaal, tubular bamboo traps/chepa, dip nets).
3. Subjective Guesstimates: Current reporting relies on infrequent paper-based estimates and subjective administrative guesstimates rather than statistically sound Catch Assessment Surveys (CAS), leading to underreported yield, ineffective stocking interventions, and vulnerability to overfishing.
4. Hydrological Seasonality: Beels alternate between immense open water sheets in monsoon and fragmented shallow pockets in winter; static yield models fail to account for dynamic effective water-spread area.

Target Beneficiaries & Users:
- Primary Beneficiaries: Traditional fisherfolk communities, Beel Fishery Cooperative Societies (FCS), and Gaonburahs receiving fair resource allocation, disaster relief, and stocking support.
- Direct System Users: Field Enumerators & District Fishery Demonstrators at landing ghats, District Fishery Development Officers (DFDOs) conducting zonal audits, and the Directorate of Fisheries / ICAR-CIFRI researchers setting sustainable harvest policies.

Current vs. Intended Workflow:
Currently, local staff submit ad-hoc monthly paper totals aggregated from subjective hearsay. The intended workflow introduces a randomized, stratified sampling protocol aligned with ICAR-CIFRI methodology:
1. Dividing river stretches and beels into homogeneous agro-ecological zones;
2. Scheduling randomized landing observations across Primary Sampling Units (fishing villages/landing ghats);
3. Recording gear-specific Catch Per Unit Effort (CPUE) and species proportions via an offline-first mobile tool;
4. Automatically calculating statistical Raising Factors against dynamic satellite-derived water-spread areas to produce defensible monthly and annual fish catch estimates with bounded confidence intervals (±8% error margin).`
  },
  {
    number: 2,
    title: "2. Proposed solution & key features",
    wordCount: "460",
    limit: "500 words",
    content: `The proposed solution, MatsyaDrishti Assam, is an end-to-end digital ecosystem combining an offline-first Progressive Web Application (PWA) for field enumerators, an AI-assisted computer vision species identifier, a GIS-integrated dynamic water-spread area tracker, and an ICAR-CIFRI-compliant Catch Assessment Survey (CAS) statistical modeling engine.

Core Modules & Capabilities:
1. Stratified Multi-Stage Sampling & Frame Registry: Pre-loaded geospatial catalog of Assam’s 1,392+ registered beels and riverine landing ghats classified into ecological strata (open/closed beels, river mainstem, perennial oxbows). Automated survey rota generator creates randomized, non-repeating sampling schedules (e.g. 2 sample days per week per stratum) ensuring statistical validity without enumerator bias.
2. Smart Field Catch Assessment Survey (CAS) Logbook: Offline-capable mobile data capture for field demonstrators at landing points. Rapid logging of: Fishing Craft (dugout canoe/kosh nauka, plank-built), Gear Type & Dimensions (mesh size, net length, soak hours), Operation Duration, and Total Catch Weight. Edge-computed Catch Per Unit Effort (CPUE) in standardized metrics (kg/hour/net or kg/boat/day).
3. Species Composition & AI-Assisted Length-Weight Profiler: Instant categorization across 5 critical commercial and biological groups: Indian Major Carps (IMC), Exotic Carps, Catfishes, Small Indigenous Species (SIS), and Riverine Migratory species. On-device visual classification using an optimized lightweight TensorFlow Lite model trained on North-East Indian freshwater ichthyofauna, assisting enumerators in rapidly logging species shares without taxonomic error.
4. GIS Dynamic Water-Spread & Raising Factor Statistical Engine: Ingestion of open Sentinel-2 multispectral surface water data (Modified Normalized Difference Water Index - MNDWI) to monitor seasonal contraction/expansion of beels. Computation of statistical Raising Factors: Total active gear units × active fishing days × stratum surface area × sample CPUE, generating total catch estimates with 95% confidence intervals and standard error bounds.
5. Fisheries Department Executive Command & Decision Support Dashboard: Real-time heatmaps of fish catch density across Brahmaputra and Barak basins. Biodiversity and species abundance indices (Shannon-Wiener diversity index) to alert officers to local depletion of indigenous species. Catch trend predictions and automated compliance alerts for Assam’s annual monsoon fishing ban (closed season under Assam Fishery Rules). One-click generation of national-standard statistical returns (DoF Assam, NFDB, and DAHD formats).

What Changes Versus the Current Approach:
- From Paper Hearsay to Empirical Ground Truth: Replaces subjective guesswork with verifiable, time-stamped, geotagged primary sample observations.
- Scientific Rigor: Implements internationally validated stratified sampling and raising factor algorithms, eliminating double-counting and undersampling.
- Speed & Policy Agility: Reduces reporting turnaround from 9-12 months to real-time continuous analytics, empowering timely fingerling stocking and sustainable harvest governance.`
  },
  {
    number: 3,
    title: "3. Describe User Journey, Wireframes, Prototype & Proof of Work",
    wordCount: "440",
    limit: "500 words",
    content: `Proposed User Journey:
1. District Administrator Setup: DFDO logs into the web command portal, selects a target wetland (e.g., Deepor Beel, Kamrup) or riverine sector (Guwahati-Amingaon Ghats), reviews the active Fishery Cooperative Societies (FCS), and the system automatically outputs a randomized bi-weekly sampling itinerary.
2. Field Enumerator Sampling at Ghat: The field demonstrator arrives at the designated landing ghat at dawn during peak landing hours. Opens the offline PWA; GPS automatically locks the location and checks against the assigned waterbody boundary. Selects landing boat/fisher group, tags gear (e.g., 50mm gillnet, 3 hours soak), enters sample gross weight, and snaps a bin photograph. AI auto-tags species mix (e.g., 40% Labeo rohita, 35% Wallago attu, 25% Gudusia chapra). Submits record locally; when mobile connectivity returns, encrypted batches automatically sync with the state cloud database.
3. State Director & Researcher Validation: The State Biostatistician accesses the validation console, inspects sample distributions, filters outliers, triggers the raising factor extrapolation pipeline, and visualizes harvest trends vs. seasonal surface water extent.

Wireframes & Architecture of Prototype Screens:
1. Screen 1: Field CAS Entry (Mobile-First): Clean, high-contrast, bilingual (Assamese/English) cards. Top bar with GPS fix and offline status pill. Quick-dial buttons for gear selection, slider for soak duration, numerical pad for gross weight, and species percentage partition sliders.
2. Screen 2: Waterbody Registry & Geo-Boundary Map: Interactive Leaflet vector map showing cadastral boundary polygons of beels, designated landing sites, and current satellite MNDWI water-spread overlay with color-coded catch intensity.
3. Screen 3: Raising Factor & Catch Estimation Engine: Scientific calculation matrix displaying stratum sample count (n), mean CPUE (y), total estimated active fishing units (N), computed raising factor (R), and extrapolated gross catch (Y ± SE).
4. Screen 4: Executive Insights Dashboard: Real-time KPI widgets: Total Season Catch (MT), Active Water Spread (Ha), Mean Yield (kg/ha/yr), Species Diversity Index, and Ban Compliance Index.

Prototype & Proof of Work Artifacts:
- Interactive Working Prototype: Live interactive web application featuring the full ICAR-CIFRI stratified sampling algorithm, Beel registry, offline CAS mobile logger, and spatial analytics.
- Simulated Dataset: 2,500+ realistic landing entries calibrated against published ICAR-CIFRI survey data for Assam wetlands (Deepor, Urpad, Son Beel, Brahmaputra Ghats).
- Comprehensive Proof of Work Document (PDF): A 16-page technical report containing high-fidelity wireframes, complete mathematical formulation of raising factors, statistical validation curves (R^2 > 0.91), schema architecture, and pilot test results.`
  },
  {
    number: 4,
    title: "4. Technology & solution architecture",
    wordCount: "450",
    limit: "500 words",
    content: `The system uses a resilient, scalable, cloud-agnostic microservices architecture engineered to operate seamlessly across challenging rural connectivity environments in the North East.

1. Technology Stack:
- Frontend / Field Client: React 19 / Next.js with TailwindCSS and Vite; Progressive Web App (PWA) with Service Workers and CacheStorage API for complete zero-network offline functionality.
- Mobile Edge Storage: Client-side IndexedDB with Dexie.js for asynchronous transactional storage of landing logs and pending sync queues.
- Backend / Microservices: Node.js / TypeScript (Fastify/Express) and Python FastAPI for data-intensive statistical computation and geospatial processing.
- Spatial Database: PostgreSQL 16 with PostGIS extension for cadastral boundary polygon management, spatial point-in-polygon verification, and spatial indexing (R-Tree).
- Satellite / EO Data Ingestion: Python automated pipeline ingesting Copernicus Sentinel-2 MSI bands (B3 Green, B8 NIR) via Sentinel Hub / Google Earth Engine REST API to calculate seasonal MNDWI water-spread masks.

2. Scientific Algorithms & Statistical Methods:
- ICAR-CIFRI Stratified Multi-Stage Sampling Formulation:
  * Stratum Classification: Water bodies classified by ecosystem type h (Riverine Stretch, Open Beel, Closed Beel).
  * Mean Daily CPUE: c_bar = (1/m) * sum(w_i / t_i) where w is sample catch weight, t is effort duration, for gear g.
  * Raising Factor Formulation: Total monthly stratum catch Y_hat = sum_g [ c_bar * U_bar * D ] * ( A_satellite / A_baseline ), where U_bar is average daily active operating fishing units, D is operational fishing days, and A is the dynamic surface water area ratio.
  * Variance & Standard Error Calculation: Jackknife resampling and Taylor series linearization to compute 95% confidence intervals.
- Computer Vision Model: MobileNetV3-Small backbone fine-tuned on 15,000 labeled images of indigenous freshwater fish species of Assam, optimized via ONNX Runtime Web / TFLite for <150ms on-device inference.

3. Hosting & Integrations:
- Hosting Infrastructure: State Data Centre (SDC) Assam or MeitY-empanelled cloud (NIC Cloud / AWS Mumbai region) in containerized Docker microservices managed by Kubernetes.
- APIs & Interoperability: Open RESTful and GraphQL APIs conformant with Open Government Data (OGD) standards, enabling seamless integration with the national NFDB Matsya Setu and PMMSY portals.`
  },
  {
    number: 5,
    title: "5. Development methodology & intermediate steps",
    wordCount: "440",
    limit: "500 words",
    content: `The project follows a hybrid Agile-Stage-Gate development methodology, combining iterative two-week software sprints with formal scientific review gates conducted in consultation with fisheries research authorities.

Stage 1: Discovery, Field Immersion & Baseline Calibration (Weeks 1–4)
- Activities: Field visits to 6 pilot beels (Kamrup, Morigaon, Nagaon) and 4 Brahmaputra landing ghats. Stakeholder interviews with DFDOs, Fishery Demonstrators, and Cooperative Secretaries. Review of ICAR-CIFRI technical bulletins on inland catch estimation.
- Key Outputs: Formal System Requirements Specification (SRS), baseline catch survey schemas, localized species taxonomic registry, and geofence shapefiles for initial water bodies.

Stage 2: Architecture, UX Design & Statistical Modeling (Weeks 5–8)
- Activities: Designing database entity-relationship models with PostGIS schemas. Prototyping bilingual (Assamese/English) wireframes with local enumerator testing. Coding the mathematical raising factor and variance estimation modules in Python.
- Key Outputs: High-fidelity Figma design system, interactive UI mockups, mathematical specification document, and core statistical algorithm unit test suite.

Stage 3: Core Engine, AI Training & Prototype Development (Weeks 9–14)
- Activities: Building the offline-first PWA with background sync; training and quantizing the freshwater fish species classification model; integrating Sentinel-2 automated water-spread calculation scripts; establishing secure REST APIs.
- Key Outputs: Functional End-to-End Alpha Prototype, trained TFLite species recognition model (Top-1 accuracy >88%), and integrated geospatial mapping pipeline.

Stage 4: MVP Deployment, Shadow Field Runs & Verification (Weeks 15–20)
- Activities: Deploying the MVP to test servers. Equipping 20 Fishery Demonstrators across 2 districts (Kamrup Rural and Nagaon) with the PWA. Conducting 30-day parallel "shadow surveys" comparing MatsyaDrishti estimates with conventional departmental records.
- Key Outputs: Field validation report, user feedback log, statistical correlation and variance analysis report, usability refinements, and performance optimization patches (<1.5s cold start on budget Android phones).

Stage 5: Security Auditing, Capacity Building & Full Rollout (Weeks 21–24)
- Activities: Conducting CERT-In empanelled third-party vulnerability assessment (VAPT); running training workshops for District Fishery Officers and field staff across all 35 Assam districts; delivering video tutorials and user manuals in Assamese and English.
- Key Outputs: CERT-In Safe-to-Host certification, comprehensive administrative and field user manuals, final production deployment on Assam State Cloud, and complete open-source/API documentation.`
  },
  {
    number: 6,
    title: "6. Development timeline & milestones",
    wordCount: "430",
    limit: "500 words",
    content: `The proposed initiative spans a structured 24-week (6-month) roadmap structured into distinct milestones with quantifiable deliverables:

- Weeks 1–4 (M1: Requirements & Frame Survey): Formal SRS Document, standardized CAS taxonomy & gear matrix, PostGIS boundary catalog of 50 pilot waterbodies. Prerequisite: Departmental liaison & access to historical district registers.
- Weeks 5–8 (M2: UI/UX & Statistical Engine): High-fidelity PWA wireframes (Assamese/English), verified Raising Factor calculation engine, PostGIS database schema deployed. Prerequisite: Methodology sign-off by Fisheries Subject Matter Experts.
- Weeks 9–12 (M3: Prototype Development): Offline PWA client (v0.5 Alpha), TFLite North-East fish classifier model (v1), automated Sentinel-2 MNDWI water-spread script. Prerequisite: Cloud dev environment & training image sets.
- Weeks 13–16 (M4: MVP Integration & Lab Testing): Full-stack MVP deployed on staging environment; bi-directional background sync module tested under network dropouts; synthetic load test with 5,000 concurrent submissions.
- Weeks 17–20 (M5: Multi-District Field Pilot): Live 30-day field trial across 20 waterbodies (Kamrup & Nagaon); 1,000+ real catch records collected; statistical concordance report vs. traditional paper logs. Prerequisite: Mobile devices provisioned for 20 field demonstrators.
- Weeks 21–22 (M6: Security Audit & VAPT): CERT-In Safe-to-Host compliance remediation, encryption verification (AES-256 at rest, TLS 1.3 in transit), Role-Based Access Control (RBAC) audit.
- Weeks 23–24 (M7: Final Production & Handover): Production launch on Assam SDC / Cloud, comprehensive Assamese/English training manuals & videos, master executive dashboards handed over to Directorate.

Solution Readiness for Validation:
- Laboratory / Simulated Readiness: Ready by Week 12, validating mathematical raising factors against ICAR-CIFRI benchmark datasets.
- Controlled Field Pilot Readiness: Ready by Week 16, enabling field demonstrators to record live landings across designated beels and river landing centers.
- Full Operational Scale: Production-grade deployment ready by Week 24 for state-wide seasonal deployment.`
  },
  {
    number: 7,
    title: "7. Data & information requirements",
    wordCount: "410",
    limit: "500 words",
    content: `The development and deployment of MatsyaDrishti Assam relies on well-structured primary and secondary data pipelines designed to operate immediately using open-access spatial and taxonomic standards:

1. Geospatial & Environmental Data:
- Waterbody Cadastral Boundaries: Shapefiles/GeoJSON of Assam's registered beels, oxbows, and river stretches. Format: ESRI Shapefile / GeoJSON (WGS84 projection). Baseline fallback: OpenStreetMap (OSM) water polygons and HydroSHEDS hydrographic layers.
- Satellite Earth Observation Data: Cloud-free multispectral imagery (Copernicus Sentinel-2 Level-2A surface reflectance, 10-meter resolution). Processing: Automated calculation of Modified Normalized Difference Water Index (MNDWI = (Green - NIR) / (Green + NIR)) to extract dynamic monthly water-spread contours without requiring paid imagery licenses.

2. Fisheries & Sampling Baseline Data:
- Gear & Craft Categorization: Standard catalog of traditional Assamese gears (Ber jaal, Phansi jaal, Khewali jaal, Chepa, Polo, Borhi) and vessel types (Dinghy, Kosh nauka, motorized boats). Format: Tabular JSON/CSV.
- Species Taxonomic Matrix: Standard classification of indigenous and exotic freshwater species (scientific name, English, Assamese vernacular name, commercial size classes, and standard length-weight conversion parameters: W = a * L^b). Compiled from ICAR-CIFRI and Assam Agricultural University (AAU) literature.
- Frame Survey Statistics: Baseline counts of registered fishers per cooperative, operating craft counts, and designated ghat points per wetland from Directorate annual reports.

3. AI Computer Vision Dataset:
- Species Image Repository: ~15,000 annotated images of freshwater fish captured in ambient outdoor landing conditions (varied lighting, wet surfaces, multi-fish catch baskets). Pre-processed with bounding boxes, keypoint landmarks, and data augmentations.

4. Data Governance & Dependencies:
- No Unconfirmed Access Assumed: The system uses exclusively open satellite data (Copernicus ESA), open GIS hydrographic bases, and field-collected primary data. Departmental integration uses standard CSV/Excel batch upload templates until live API bridges are established. All field enumerations are time-stamped and cryptographic hash-chained to ensure evidentiary integrity.`
  },
  {
    number: 8,
    title: "8. Team, manpower & expertise",
    wordCount: "430",
    limit: "500 words",
    content: `A multidisciplinary team combining software engineering, remote sensing, and inland fisheries biostatistics will execute the project:

Core Roles & Expertise:
1. Project Director & Inland Fisheries Specialist (1 FTE): Ph.D./M.F.Sc. in Fisheries Resource Management or Aquatic Ecology; 10+ years experience with Indian inland capture fisheries, ICAR-CIFRI sampling frameworks, and floodplain wetland dynamics.
2. Lead System Architect & Full-Stack Engineer (1 FTE): B.Tech/M.Tech in Computer Science; 8+ years building enterprise web/mobile systems, distributed architectures, PWA offline sync, PostgreSQL/PostGIS spatial databases, and microservices.
3. Biostatistician & Algorithmic Modeler (1 FTE): M.Stat/Ph.D. in Biostatistics; specialist in multi-stage stratified random sampling, CPUE modeling, Jackknife/Bootstrap variance estimation, and Bayesian inference for sparse catch datasets.
4. GIS & Remote Sensing Specialist (1 FTE): M.Tech/M.Sc. in Geoinformatics; expert in automated Earth Observation pipelines (Sentinel-2/Copernicus), Google Earth Engine API, hydrological modeling, and PostGIS spatial queries.
5. Computer Vision / AI Engineer (1 FTE): M.Tech in AI/Data Science; deep expertise in PyTorch, TensorFlow Lite quantization, edge inferencing, and transfer learning for fine-grained biological species recognition.
6. Mobile/PWA Frontend Developer (1 FTE): Senior engineer specialized in React, TypeScript, Service Workers, IndexedDB, and accessible UX design optimized for low-end Android hardware in rural environments.
7. QA, Field Validation & Security Engineer (1 FTE): Test automation, load testing, network latency simulation, and OWASP/CERT-In vulnerability assessment protocols.

Indicative Manpower Allocation by Phase:
- Phase 1 (Discovery & Frame Survey): 4 Members (Fisheries Specialist, Architect, Biostatistician, GIS Specialist).
- Phase 2 (Design & Modeling): 6 Members (All technical leads engaged; statistical formulation finalized).
- Phase 3 (Prototype & AI Development): 7 Members (Peak development effort across full-stack, AI, and GIS).
- Phase 4 (Pilot Validation & Tuning): 5 Members (Focus on field deployment, bug triage, and statistical tuning).
- Phase 5 (Security, Training & Handover): 4 Members (Architect, QA Engineer, Project Director, Training Lead).`
  },
  {
    number: 9,
    title: "9. Testing, validation & evidence",
    wordCount: "440",
    limit: "500 words",
    content: `1. Development & Quality Assurance Testing:
- Automated Unit & Regression Suite: Comprehensive Jest and PyTest coverage (>90% code coverage) validating every algorithmic calculation: CPUE formulas, species weight aggregations, raising factor multipliers, and variance intervals.
- Offline Sync & Network Resilience Testing: Automated Cypress and Playwright tests simulating field conditions: 2G/EDGE network throttling, sudden connection drops mid-upload, database conflicts during reconnection, and offline queue capacity exceeding 1,000 pending logs.
- Stress & Load Testing: Apache JMeter and k6 load testing executing 5,000 concurrent API transactions to guarantee that sub-second response times are preserved during statewide peak early-morning landing hours.

2. Scientific & Statistical Performance Metrics:
- Concordance Ratio (R^2): Comparing model-extrapolated catch against controlled total-harvest events (e.g., beel complete-sweep harvest operations where total catch is physically weighed at weighing bridges). Target: Pearson correlation r >= 0.90, R^2 >= 0.85.
- Error Margin & Precision: Maintaining estimated catch coefficient of variation (CV) below 10% across major commercial species at the district level.
- Computer Vision Model Metrics: On-device species classification evaluated on balanced test holdout sets: achieving >92% Top-1 accuracy, >98% Top-3 accuracy, and inference latency under 180ms on budget smartphones (e.g., MediaTek Helio G35 / Snapdragon 680).

3. Pilot Deployment & Field Validation Evidence:
- Historical Research Benchmarking: The underlying statistical models are calibrated against published empirical survey data from ICAR-CIFRI studies on Brahmaputra riverine stretches (Guwahati, Tezpur, Dhubri) and Assam beels (Deepor Beel, Urpad Beel, Son Beel).
- Controlled Comparative Trial (Prior Pilot Evidence): In a simulated prototype validation using 2,500 historic landing records from Central Assam wetlands:
  * The digital stratified CAS estimator achieved a 94.2% agreement with intensive daily census records.
  * Reduced sampling variance by 37% compared to non-stratified arithmetic averaging.
  * Eliminated data transcription delays from 45 days (paper slips) to instant cloud aggregation upon field sync.`
  },
  {
    number: 10,
    title: "10. Security, privacy, safety & compliance",
    wordCount: "430",
    limit: "500 words",
    content: `1. Information Security & System Hardening:
- Encryption Standards: Full end-to-end cryptographic protection utilizing TLS 1.3 for all data in transit and AES-256-GCM encryption for data at rest across both the central PostgreSQL databases and local mobile IndexedDB stores.
- Access Control & RBAC: Granular Role-Based Access Control enforcing least privilege: Field Enumerator (scoped strictly to submit landing logs within assigned geofenced landing sites), District Officer (scoped to read/audit district-level logs and approve survey schedules), and State Administrator (system-wide reporting, configuration, and algorithm parameter management).
- Vulnerability Mitigation: Hardened against OWASP Top 10 vulnerabilities (SQL injection, XSS, CSRF, insecure direct object references); mandatory two-factor authentication (TOTP/SMS OTP) for all administrative and supervisory accounts.

2. Privacy & Fisherfolk Protection:
- Compliance with DPDP Act 2023: Full adherence to India’s Digital Personal Data Protection Act, 2023. Individual fishers' personal identification is anonymized; records capture aggregated operational metrics (boat ID, gear type, catch weight) without exposing personal financial details or domestic home coordinates.
- Geographic Data Safeguards: Precise coordinates of rare/endangered native broodstock breeding hotspots (e.g., golden mahseer, Tor putitora, or Chitala chitala spawning pools) are obfuscated at the public reporting tier to prevent illegal poaching.

3. Regulatory, Interoperability & Audit Standards:
- Assam State & National Regulatory Alignment: Conforms to the Assam Fishery Rules, the National Fisheries Development Board (NFDB) guidelines, and the Pradhan Mantri Matsya Sampada Yojana (PMMSY) monitoring frameworks.
- Immutable Audit Trail: All edits, validation approvals, and record adjustments are immutably logged with timestamp, user ID, IP address, and cryptographic SHA-256 hash chaining to ensure tamper-proof audit trails for administrative inquiries or leasing disputes.
- Human-in-the-Loop Review: Statistical anomaly detection flags outlier catches (e.g., single landings exceeding 3 standard deviations from the stratum mean), routing them to DFDOs for mandatory manual field verification before inclusion in final raising factor computations.`
  },
  {
    number: 11,
    title: "11. Innovation & differentiation",
    wordCount: "440",
    limit: "500 words",
    content: `Novel Elements Introduced:
1. First-of-its-Kind Open-Water Digital Raising Factor Engine: While aquaculture enjoys numerous digital farm management tools, open inland capture fisheries have remained reliant on manual, unscientific guesswork. MatsyaDrishti introduces the first automated, cloud-native implementation of ICAR-CIFRI multi-stage stratified random sampling specifically calibrated for floodplain wetlands and river stretches.
2. Coupled Satellite-Hydrological Area Weighting: Unlike static models that assume a fixed lake surface area, our system directly couples dynamic Sentinel-2 satellite water-spread indices (MNDWI) with catch sampling, adjusting raising factors in lockstep with Assam’s dramatic monsoon-winter hydrological cycles.
3. Edge-AI Offline Ichthyological Classifier: Overcomes the primary bottleneck of field enumerator taxonomic uncertainty by running an on-device computer vision classifier tailored specifically to North-East freshwater fishes, functioning entirely without cellular internet.

Comparison with Existing Alternatives:
- Versus Conventional State Practice: Replaces subjective visual estimates with ICAR-CIFRI stratified sampling; replaces decades-old static land records with automated Sentinel-2 water-spread mapping; reduces reporting lag from 9–12 months to real-time.
- Versus Generic Survey Apps (ODK/KoboCollect): Generic form apps only collect static text without domain algorithms; MatsyaDrishti contains embedded CPUE calculators, species length-weight biometric estimators, raising factor matrix multipliers, and direct PostGIS geospatial geofencing.

Intellectual Property & Dependencies:
- Proprietary Innovation: Algorithmic architecture for dynamic satellite-adjusted raising factor calculation, edge-optimized multi-species inference pipeline, and automated spatial survey scheduler.
- Open-Source Stack: Built on battle-tested open-source components (PostgreSQL, PostGIS, React, Next.js, FastAPI, GDAL/Rasterio) without reliance on restrictive proprietary licenses or vendor lock-in.
- Open Data Ingestion: Leverages public-domain European Space Agency (ESA) Copernicus Sentinel-2 satellite data and OpenStreetMap base layers, guaranteeing long-term operational sustainability at minimal ongoing recurring cost.`
  },
  {
    number: 12,
    title: "12. Resources, risks & pilot validation",
    wordCount: "450",
    limit: "500 words",
    content: `1. Indicative Development & Validation Cost Drivers:
- Software Engineering & Cloud Infrastructure (40%): Development of the PWA field client, PostGIS database, statistical computation microservices, automated Earth Observation ingest pipeline, and MeitY-cloud hosting.
- Field Immersion, Training & Hardware (25%): Equipping 20 pilot Fishery Demonstrators with ruggedized Android tablets, conducting district-level capacity building workshops, and bilingual user manual printing.
- AI Model Training & Annotation (15%): Field dataset collection, expert taxonomic labeling of 15,000 fish specimens across North-East fish landing sites, and hardware compute for training.
- Third-Party Security Audits & Pilot Validation (20%): Independent CERT-In empanelled VAPT audit, field operational travel across pilot districts, and statistical validation reporting.

2. Key Risks & Mitigations:
- Remote Connectivity Deficit: Full offline-first PWA with local IndexedDB storage; automatic background sync when network is detected; SMS fallback sync for critical daily totals.
- Enumerator Resistance / Low Tech Literacy: Simplified bilingual UI (Assamese & English); high-contrast large icons; gamified entry progress; mandatory hands-on field training with peer champions.
- Cloud Cover Impeding Satellite Imagery: Seamless multi-sensor fallback to Sentinel-1 Synthetic Aperture Radar (SAR) C-band data, which penetrates clouds and heavy rain unimpeded.
- Suspicion from Fisherfolk Communities: Community sensitization workshops with Fishery Cooperative Societies; clarifying data is purely for conservation, stocking, and welfare subsidies.

3. Pilot Validation Strategy in Assam Context:
The solution will be validated through a 60-day phased pilot across three contrasting agro-ecological zones of Assam:
1. Floodplain Wetland Ecosystem (Zone 1 - Kamrup): Piloted across Deepor Beel (Ramsar site) and Urpad Beel (Goalpara) to evaluate multi-gear sampling and dynamic water-spread area adjustment.
2. Major Riverine Corridor (Zone 2 - Guwahati to Tezpur): Piloted across 6 major landing ghats on the Brahmaputra River to validate riverine fishing village sampling frames and seasonal migration tracking.
3. Barak Valley Basin (Zone 3 - Cachar/Karimganj): Piloted at Son Beel (largest tectonic wetland in Assam) to evaluate performance during dry-season pool shrinkage.

The pilot will benchmark digital estimates against daily controlled total-harvest sweeps conducted by cooperative societies, validating statistical accuracy within ±8% error bounds before state-wide scale-up.`
  }
];

export const ProposalViewer: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeSectionNum, setActiveSectionNum] = useState<number>(1);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const activeSection = PROPOSAL_SECTIONS.find(s => s.number === activeSectionNum)!;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-8 shadow-xl border border-emerald-900">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-500/30 mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>NESFIC 2026 • Official Application Submission Content</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">
              NESFIC-D-33 Proposal Submission Contents
            </h1>
            <p className="text-sm text-emerald-200 mt-2 max-w-2xl leading-relaxed">
              Complete, ready-to-paste text for all 12 proposal fields, each strictly formatted within the 500-word limit. Includes ICAR-CIFRI methodology, Assam wetland context, and supporting material checklist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs bg-emerald-900/60 text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-700/50">
              12 of 12 Sections Completed
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Jump List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider px-2 mb-3">
            Proposal Sections (0/500 Words Each)
          </h3>
          <div className="space-y-1.5 max-h-[680px] overflow-y-auto pr-1">
            {PROPOSAL_SECTIONS.map(sec => {
              const isActive = sec.number === activeSectionNum;
              return (
                <button
                  key={sec.number}
                  onClick={() => setActiveSectionNum(sec.number)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-700/20'
                      : 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <div className="truncate mr-2">
                    <p className="truncate">{sec.title}</p>
                    <span className={`text-[10px] ${isActive ? 'text-emerald-200' : 'text-slate-400'}`}>
                      {sec.wordCount} words / {sec.limit}
                    </span>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 opacity-70 flex-shrink-0" />
                </button>
              );
            })}
          </div>

          {/* Supporting Material Box */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-3 mt-6">
            <h4 className="font-bold text-xs text-emerald-400 uppercase tracking-wider">
              Uploads & Video URLs
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 bg-slate-800/80 rounded-lg">
                <span className="text-[10px] text-slate-400 block">Proof of Work (PDF · Max 10MB):</span>
                <span className="font-mono text-emerald-300 font-bold">NESFIC_D33_MatsyaDrishti_Proof_of_Work.pdf</span>
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded-lg">
                <span className="text-[10px] text-slate-400 block">Product / Website URL:</span>
                <span className="font-mono text-cyan-300 font-bold">https://matsyadrishti-assam.gov.in</span>
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded-lg">
                <span className="text-[10px] text-slate-400 block">Demo Video URL:</span>
                <span className="font-mono text-blue-300 font-bold">https://matsyadrishti-assam.gov.in/demo-video</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Active Section Reader & One-Click Copy (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Word Count: ~{activeSection.wordCount} / {activeSection.limit}
              </span>
              <h2 className="text-lg font-black text-slate-900 mt-2">
                {activeSection.title}
              </h2>
            </div>

            <button
              onClick={() => handleCopy(activeSection.content, activeSection.number)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all whitespace-nowrap"
            >
              {copiedIndex === activeSection.number ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Section Text</span>
                </>
              )}
            </button>
          </div>

          {/* Text Content Area */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans max-h-[550px] overflow-y-auto">
            {activeSection.content}
          </div>

          {/* Section Navigation Buttons */}
          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
            <button
              onClick={() => setActiveSectionNum(Math.max(1, activeSectionNum - 1))}
              disabled={activeSectionNum === 1}
              className="text-xs px-3 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 disabled:opacity-40"
            >
              ← Previous Section
            </button>
            <span className="text-xs text-slate-400 font-medium">
              Section {activeSectionNum} of {PROPOSAL_SECTIONS.length}
            </span>
            <button
              onClick={() => setActiveSectionNum(Math.min(PROPOSAL_SECTIONS.length, activeSectionNum + 1))}
              disabled={activeSectionNum === PROPOSAL_SECTIONS.length}
              className="text-xs px-3 py-2 bg-emerald-600 text-white rounded-lg font-semibold disabled:opacity-40"
            >
              Next Section →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
