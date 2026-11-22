# MatsyaDrishti Assam (মৎস্যদৃষ্টি) 🐟

### Scientific Estimation of Fish Catch from Beels, Rivers and Other Open Waters
**Government of Assam • Directorate of Fisheries**  
**North East Seva First Innovation Challenge (NESFIC 2026) — Problem Statement: `NESFIC-D-33`**

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![ICAR-CIFRI](https://img.shields.io/badge/ICAR--CIFRI-Compliant-emerald.svg)](http://www.cifri.res.in/)

---

## 📌 Problem Overview & Context
Assam possesses over **100,000 hectares of floodplain wetlands (*beels*)**, **4,820 km of river stretches** (Brahmaputra, Barak, and 42+ major tributaries), and numerous open water bodies. These capture fisheries support hundreds of thousands of artisanal fishers.

Unlike closed pond aquaculture where harvests are quantifiable at discrete farm gates, open-water fisheries in Assam suffer from:
1. **Dispersed Landings:** Fishers land along natural riverbanks and remote wetland ghats around the clock.
2. **Multi-Gear / Multi-Species:** Over 150 species harvested across traditional gears (Gillnets/Phansi jaal, Cast nets/Khewali jaal, Drag nets/Ber jaal, Traps/Chepa).
3. **Hydrological Seasonality:** *Beels* alternate between immense open sheets in monsoon and fragmented shallow pools in winter.
4. **Subjective Guesstimates:** Prior reliance on unscientific paper logs rather than statistically sound Catch Assessment Surveys (CAS).

---

## 🚀 Solution: MatsyaDrishti Assam
**MatsyaDrishti Assam** is an end-to-end digital platform combining an offline-first mobile logbook for field demonstrators, dynamic satellite water-spread tracking, and an **ICAR-CIFRI-compliant raising factor estimation engine**.

### 🌟 Core Capabilities
- **Stratified Multi-Stage Sampling Framework:** Pre-loaded registry of 1,392+ registered beels and Brahmaputra river sectors.
- **Smart Field CAS Logbook (PWA):** Offline mobile logging with GPS geofencing, gear/craft classification, and real-time CPUE ($kg/hr$) calculation.
- **AI-Assisted Species Classifier:** Simulated edge vision model categorizing Indian Major Carps (IMC), Catfishes, Small Indigenous Species (SIS), and migratory Hilsa.
- **Dynamic Satellite Raising Factor Engine:** Couples primary sample CPUE with active gear units and Copernicus Sentinel-2 MNDWI water-spread indices to extrapolate total biomass ($\hat{Y} \pm 1.96 \cdot SE$).
- **Directorate Command Dashboard:** Real-time biomass harvest KPIs, Shannon-Wiener ecological biodiversity index ($H'$), and Assam Fishery Rules monsoon closed-season compliance monitoring.

---

## 📐 Scientific Formulation (ICAR-CIFRI Standard)

1. **Primary Sample Catch Per Unit Effort (CPUE):**
   $$\bar{c}_{h,g} = \frac{1}{m} \sum_{i=1}^{m} \frac{w_{h,g,i}}{t_{h,g,i}}$$

2. **Satellite-Adjusted Raising Factor ($R_h$):**
   $$R_h = N_{\text{crafts}} \times D_{\text{days}} \times \left( \frac{A_{\text{satellite}}}{A_{\text{baseline}}} \right)$$

3. **Total Monthly Biomass Yield ($\hat{Y}_h$):**
   $$\hat{Y}_h = \bar{c}_h \times \bar{t} \times R_h \quad \pm \quad 1.96 \cdot SE(\hat{Y})$$

---

## 💻 Tech Stack
- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React
- **Geospatial & Mapping:** Leaflet, OpenStreetMap, Sentinel-2 MNDWI
- **Offline Storage:** IndexedDB (Dexie.js / PWA Service Worker caching)
- **Statistical Engine:** Custom TypeScript ICAR-CIFRI Raising Factor & Shannon-Wiener Diversity Calculator

---

## 🛠️ Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RonHatibaruah/matsyadrishti-assam.git
   cd matsyadrishti-assam
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or the port displayed in terminal) in your browser.

4. **Production Build:**
   ```bash
   npm run build
   ```

---

## 📄 License & Attribution
Developed for the **North East Seva First Innovation Challenge (NESFIC 2026)** under the Directorate of Fisheries, Government of Assam.
