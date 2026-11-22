import os
import matplotlib
os.environ['MPLCONFIGDIR'] = '/tmp/matplotlib_cache'
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

FIG_DIR = '/tmp/nesfic_figures'
os.makedirs(FIG_DIR, exist_ok=True)

# 5. Figure: Assam Agro-Ecological GIS Map & Pilot Locations
def make_assam_gis_map():
    fig, ax = plt.subplots(figsize=(10, 5), dpi=200)
    ax.set_facecolor("#f8fafc")
    
    # Draw stylized Brahmaputra River path
    bx = np.linspace(89.8, 95.5, 300)
    by = 26.0 + 0.3 * np.sin(bx * 1.5) + 0.1 * np.cos(bx * 3)
    ax.plot(bx, by, color="#0284c7", lw=5, alpha=0.8, label="Brahmaputra River Mainstem (4,820 km)")
    
    # Draw Barak River path in south
    barak_x = np.linspace(92.0, 93.5, 100)
    barak_y = 24.8 + 0.15 * np.sin(barak_x * 2.5)
    ax.plot(barak_x, barak_y, color="#0891b2", lw=3.5, alpha=0.8, label="Barak River Basin")

    # Key Waterbodies
    locations = [
        ("Urpad Beel\n(Goalpara)", 90.58, 26.08, "#10b981", "Lower Brahmaputra (1,040 Ha)"),
        ("Deepor Beel (Ramsar)\n(Kamrup Metro)", 91.65, 26.13, "#2563eb", "Central Brahmaputra (4,014 Ha)"),
        ("Brahmaputra Ghats\n(Guwahati)", 91.75, 26.19, "#dc2626", "Riverine Mainstem (5,200 Ha)"),
        ("Dora Beel\n(Kamrup Rural)", 91.43, 26.04, "#059669", "Closed Beel (320 Ha)"),
        ("Silghat / Tezpur\n(Sonitpur)", 92.83, 26.61, "#d97706", "Upper Brahmaputra (4,800 Ha)"),
        ("Son Beel\n(Karimganj)", 92.44, 24.69, "#7c3aed", "Barak Valley (3,450 Ha)")
    ]

    for name, lon, lat, color, desc in locations:
        ax.scatter(lon, lat, color=color, s=120, edgecolors="white", lw=2, zorder=5)
        offset_y = 0.18 if lat > 25.5 else -0.22
        offset_x = 0.05 if lon > 92 else -0.05
        ax.annotate(f"{name}\n({desc})", xy=(lon, lat), xytext=(lon + offset_x, lat + offset_y),
                    fontsize=7, fontweight="bold", color="#0f172a",
                    bbox=dict(boxstyle="round,pad=0.3", facecolor="white", edgecolor=color, lw=1.5, alpha=0.95),
                    arrowprops=dict(arrowstyle="->", color=color, lw=1.2))

    ax.set_xlim(89.5, 95.8)
    ax.set_ylim(24.2, 27.5)
    ax.set_xlabel("Longitude (°E)", fontsize=8, fontweight="bold")
    ax.set_ylabel("Latitude (°N)", fontsize=8, fontweight="bold")
    ax.set_title("MatsyaDrishti Assam: Agro-Ecological Strata & Pilot Waterbody Network (NESFIC-D-33)", fontsize=11, fontweight="bold", pad=10)
    ax.grid(True, linestyle=":", alpha=0.5)
    ax.legend(fontsize=7.5, loc="lower right")

    path = os.path.join(FIG_DIR, "fig5_gis_assam_map.png")
    plt.tight_layout()
    plt.savefig(path, bbox_inches='tight')
    plt.close()
    return path

# 6. Figure: Edge AI Fish Species Detection Frame
def make_ai_detection_frame():
    fig, ax = plt.subplots(figsize=(9, 4.5), dpi=200)
    ax.set_facecolor("#0f172a")

    # Header bar
    ax.text(0.02, 0.93, "SENSOR FEED: LANDING TRAY 01  |  CAMERA RESOLUTION: 1080p  |  LATENCY: 142ms", color="#38bdf8", fontsize=7.5, fontfamily="monospace", fontweight="bold")
    ax.text(0.98, 0.93, "STATUS: ON-DEVICE TFLITE INFERENCE ACTIVE", color="#4ade80", fontsize=7.5, fontfamily="monospace", fontweight="bold", ha="right")
    ax.axhline(0.88, color="#334155", lw=1)

    # Simulated Bounding Boxes
    boxes = [
        ("Labeo rohita (Rohu Carp)\nConfidence: 97.4% | Est. Wt: 2.85 kg\nGrade: IMC Foodfish", 0.05, 0.45, 0.42, 0.38, "#10b981"),
        ("Wallago attu (Boal Catfish)\nConfidence: 94.8% | Est. Wt: 4.10 kg\nGrade: Indigenous Predator", 0.52, 0.45, 0.43, 0.38, "#06b6d4"),
        ("Amblypharyngodon mola (Mola SIS)\nConfidence: 92.1% | Est. Wt: 1.15 kg\nGrade: Small Indigenous Species", 0.05, 0.08, 0.42, 0.32, "#a855f7"),
        ("Chitala chitala (Chitala Featherback)\nConfidence: 96.2% | Est. Wt: 3.40 kg\nGrade: Near Threatened Broodstock", 0.52, 0.08, 0.43, 0.32, "#f59e0b")
    ]

    for label, x, y, w, h, col in boxes:
        rect = plt.Rectangle((x, y), w, h, fill=True, facecolor=col, alpha=0.12, edgecolor=col, lw=2, linestyle="-")
        ax.add_patch(rect)
        # Corner markers
        ax.plot([x, x+0.03], [y+h, y+h], color=col, lw=3)
        ax.plot([x, x], [y+h, y+h-0.03], color=col, lw=3)
        ax.text(x + 0.015, y + h - 0.05, label, color="white", fontsize=7.5, fontweight="bold", va="top",
                bbox=dict(boxstyle="square,pad=0.2", facecolor=col, edgecolor="none", alpha=0.85))

    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    ax.set_title("Edge Computer Vision: Multi-Species Classification & Biometric Profiler", fontsize=10.5, fontweight="bold", color="white", pad=8)

    path = os.path.join(FIG_DIR, "fig6_ai_detection.png")
    plt.tight_layout()
    plt.savefig(path, bbox_inches='tight', facecolor="#0f172a")
    plt.close()
    return path

# 7. Figure: 24-Week Gantt Chart Roadmap
def make_gantt_roadmap():
    fig, ax = plt.subplots(figsize=(10, 4.2), dpi=200)
    
    tasks = [
        "M5: CERT-In VAPT Audit & State Launch",
        "M4: Multi-District Pilot (Kamrup, Nagaon)",
        "M3: Prototype & Edge AI Quantization",
        "M2: Statistical Engine & PostGIS Schemas",
        "M1: Baseline Frame Survey & Geofences"
    ]
    starts = [20, 12, 8, 4, 0]
    durations = [4, 8, 4, 4, 4]
    colors_list = ["#8b5cf6", "#f59e0b", "#10b981", "#0284c7", "#3b82f6"]

    y_pos = np.arange(len(tasks))
    ax.barh(y_pos, durations, left=starts, height=0.55, align='center', color=colors_list, edgecolor="#1e293b", lw=1.2)

    # Deliverable labels inside or beside bars
    deliverables = [
        "Weeks 21-24: Safe-to-Host Audit, Handover to Assam Directorate",
        "Weeks 13-20: 30-day Shadow Survey, 20 Enumerators, 1,000+ Landings",
        "Weeks 9-12: Offline PWA Client, TFLite Model (Top-1 > 92%)",
        "Weeks 5-8: Raising Factor Engine, Bilingual UI, PostGIS Database",
        "Weeks 1-4: Cadastral Boundaries of 50 Beels, Gear Taxonomy, SRS"
    ]
    for i, (start, dur, text) in enumerate(zip(starts, durations, deliverables)):
        ax.text(start + dur/2, i, f"W{start+1}-W{start+dur}", ha='center', va='center', color='white', fontweight='bold', fontsize=7.5)

    ax.set_yticks(y_pos)
    ax.set_yticklabels(tasks, fontsize=8, fontweight="bold")
    ax.set_xlabel("Development Timeline (Weeks 1 to 24 / 6 Months)", fontsize=8, fontweight="bold")
    ax.set_xlim(0, 25)
    ax.set_xticks(range(0, 26, 4))
    ax.set_xticklabels([f"Week {w}\n(M{w//4})" if w > 0 else "Start" for w in range(0, 26, 4)], fontsize=7)
    ax.grid(axis='x', linestyle=":", alpha=0.6)
    ax.set_title("24-Week Phased Implementation & Delivery Milestones", fontsize=10.5, fontweight="bold", pad=10)

    path = os.path.join(FIG_DIR, "fig7_gantt_roadmap.png")
    plt.tight_layout()
    plt.savefig(path, bbox_inches='tight')
    plt.close()
    return path

# 8. Figure: ICAR-CIFRI Raising Factor Mathematical Pipeline Infographic
def make_math_pipeline():
    fig, ax = plt.subplots(figsize=(10, 3.8), dpi=200)
    ax.axis("off")

    stages = [
        ("Step 1: Primary Landings", "w_i (kg), t_i (hrs)\nper landing boat", 0.12, "#dbeafe", "#1d4ed8"),
        ("Step 2: Stratum CPUE", "c_bar = (1/m) Σ (w_i/t_i)\nMean kg/craft-hr", 0.38, "#cffafe", "#0891b2"),
        ("Step 3: Raising Factor (R)", "R = N_crafts × D_days\n× (A_sat / A_base)", 0.64, "#fef3c7", "#b45309"),
        ("Step 4: Gross Catch Yield", "Y = c_bar × t_soak × R\n± 1.96 · SE (95% CI)", 0.90, "#dcfce7", "#15803d")
    ]

    for title, formula, x, face, edge in stages:
        ax.text(x, 0.65, title, ha="center", va="center", fontsize=8.5, fontweight="bold", color="#0f172a",
                bbox=dict(boxstyle="round,pad=0.4", facecolor=face, edgecolor=edge, lw=1.5))
        ax.text(x, 0.32, formula, ha="center", va="center", fontsize=8, fontfamily="monospace", fontweight="bold", color="#1e293b",
                bbox=dict(boxstyle="square,pad=0.5", facecolor="#ffffff", edgecolor=edge, lw=1, linestyle="--"))

    # Connectors
    arrows = [(0.21, 0.5, 0.29, 0.5), (0.47, 0.5, 0.55, 0.5), (0.73, 0.5, 0.81, 0.5)]
    for x1, y1, x2, y2 in arrows:
        ax.annotate("", xy=(x2, y2), xytext=(x1, y1), arrowprops=dict(arrowstyle="->", color="#475569", lw=2))

    ax.set_title("ICAR-CIFRI Mathematical Raising Factor & Biomass Extrapolation Pipeline", fontsize=10.5, fontweight="bold", pad=8)
    path = os.path.join(FIG_DIR, "fig8_math_pipeline.png")
    plt.tight_layout()
    plt.savefig(path, bbox_inches='tight')
    plt.close()
    return path

# 9. Figure: High-Resolution UI Mockup Diagram
def make_ui_showcase():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4.5), dpi=200)
    
    # Left: Mobile Field CAS Logbook Mockup
    ax1.set_facecolor("#f1f5f9")
    ax1.text(0.5, 0.92, "MOBILE FIELD CAS LOGBOOK (PWA)", ha="center", fontsize=8.5, fontweight="bold", color="#1e3a8a")
    ax1.text(0.5, 0.84, "Deepor Beel • Tetelia Landing Ghat (±4.2m GPS)", ha="center", fontsize=7.5, color="#0284c7")
    
    fields = [
        ("Craft:", "Dugout Canoe (Kosh Nauka)"),
        ("Gear:", "Phansi Jaal (Gillnet - 50mm mesh)"),
        ("Soak:", "3.5 Hours  |  Crew Size: 2 fishers"),
        ("Landed Catch:", "14.8 kg  (CPUE: 4.23 kg/hr)"),
        ("AI Species Mix:", "40% Rohu, 35% Boal, 25% Punti"),
        ("Sync Status:", "✓ Offline Queued (IndexedDB)")
    ]
    y_pos = 0.72
    for label, val in fields:
        ax1.text(0.08, y_pos, label, fontsize=7.5, fontweight="bold", color="#334155")
        ax1.text(0.40, y_pos, val, fontsize=7.5, fontweight="bold", color="#0f172a")
        y_pos -= 0.11

    ax1.set_xlim(0, 1)
    ax1.set_ylim(0, 1)
    ax1.axis("off")
    rect1 = plt.Rectangle((0.02, 0.02), 0.96, 0.96, fill=False, edgecolor="#3b82f6", lw=2, linestyle="-")
    ax1.add_patch(rect1)

    # Right: Directorate Command Dashboard Mockup
    ax2.set_facecolor("#0f172a")
    ax2.text(0.5, 0.92, "DIRECTORATE BIOMASS DASHBOARD", ha="center", fontsize=8.5, fontweight="bold", color="#38bdf8")
    ax2.text(0.5, 0.84, "Directorate of Fisheries, Govt. of Assam", ha="center", fontsize=7.5, color="#94a3b8")

    kpis = [
        ("Monthly Harvest:", "184.5 MT (Kamrup Basin)"),
        ("Monitored Spread:", "15,820 Ha (Sentinel-2 MNDWI)"),
        ("State Mean CPUE:", "3.84 kg/hr (Weighted Multi-Gear)"),
        ("Biodiversity (H'):", "1.92 (High Species Diversity)"),
        ("Closed-Season Ban:", "96.4% Compliance (Brahmaputra)"),
        ("Export Standard:", "NFDB / PMMSY Automated Return")
    ]
    y_pos = 0.72
    for label, val in kpis:
        ax2.text(0.08, y_pos, label, fontsize=7.5, fontweight="bold", color="#94a3b8")
        ax2.text(0.45, y_pos, val, fontsize=7.5, fontweight="bold", color="#38bdf8")
        y_pos -= 0.11

    ax2.set_xlim(0, 1)
    ax2.set_ylim(0, 1)
    ax2.axis("off")
    rect2 = plt.Rectangle((0.02, 0.02), 0.96, 0.96, fill=False, edgecolor="#0ea5e9", lw=2, linestyle="-")
    ax2.add_patch(rect2)

    plt.suptitle("Live Application Interface: Field Logger (Left) & Executive Console (Right)", fontsize=10.5, fontweight="bold")
    path = os.path.join(FIG_DIR, "fig9_ui_showcase.png")
    plt.tight_layout()
    plt.savefig(path, bbox_inches='tight')
    plt.close()
    return path

print("Generating additional figures...")
make_assam_gis_map()
make_ai_detection_frame()
make_gantt_roadmap()
make_math_pipeline()
make_ui_showcase()
print("All 5 additional figures generated successfully!")
