import os
import matplotlib
os.environ['MPLCONFIGDIR'] = '/tmp/matplotlib_cache'
matplotlib.use('Agg')
import matplotlib.pyplot as plt

FIG_DIR = '/tmp/nesfic_figures'
os.makedirs(FIG_DIR, exist_ok=True)

def make_budget_fig():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4.2), dpi=200)

    # Data
    categories = [
        "Software Stack &\nEngineering Team\n(₹20.0L / 50%)",
        "Field Tablets (20 units)\n& Capacity Building\n(₹8.0L / 20%)",
        "AI Model Training &\nFish Annotation\n(₹5.0L / 12.5%)",
        "Pilot Operations &\nCooperative Travel\n(₹4.0L / 10%)",
        "CERT-In Security &\nState Cloud Handover\n(₹3.0L / 7.5%)"
    ]
    amounts = [20.0, 8.0, 5.0, 4.0, 3.0]
    colors = ['#1d4ed8', '#0284c7', '#0891b2', '#059669', '#7c3aed']

    # Donut chart
    wedges, texts, autotexts = ax1.pie(
        amounts, 
        labels=None, 
        autopct='%1.1f%%', 
        startangle=140, 
        colors=colors,
        pctdistance=0.75,
        wedgeprops=dict(width=0.42, edgecolor='white', lw=2)
    )
    for autotext in autotexts:
        autotext.set_color('white')
        autotext.set_fontweight('bold')
        autotext.set_fontsize(8)

    ax1.text(0, 0, "Total Grant\n₹40.0 Lacs\n(100%)", ha='center', va='center', fontsize=9, fontweight='bold', color='#00264d')
    ax1.set_title("Indicative Resource & Budget Allocation", fontsize=10.5, fontweight='bold')

    # Horizontal Bar breakdown on right
    y_pos = range(len(categories))[::-1]
    bars = ax2.barh(y_pos, amounts, color=colors, height=0.55, edgecolor='#1e293b', lw=1)
    ax2.set_yticks(y_pos)
    ax2.set_yticklabels(categories, fontsize=7.5, fontweight='semibold')
    ax2.set_xlabel("Grant Allocation in Lakhs (INR)", fontsize=8, fontweight='bold')
    ax2.set_xlim(0, 24)
    ax2.grid(axis='x', linestyle=":", alpha=0.6)
    ax2.set_title("Budget Breakdown by Cost Driver (Total: ₹40 Lacs)", fontsize=10.5, fontweight='bold')

    for bar, amt in zip(bars, amounts):
        w = bar.get_width()
        ax2.text(w + 0.4, bar.get_y() + bar.get_height()/2, f"₹{amt:.1f} Lakhs", va='center', fontsize=8, fontweight='bold', color='#1e293b')

    plt.suptitle("NESFIC-D-33 Problem Statement Grant Budget: ₹40.0 Lakhs", fontsize=11, fontweight='bold')
    path = os.path.join(FIG_DIR, "fig10_budget_allocation.png")
    plt.tight_layout()
    plt.savefig(path, bbox_inches='tight')
    plt.close()
    print("Generated budget figure at", path)
    return path

if __name__ == '__main__':
    make_budget_fig()
