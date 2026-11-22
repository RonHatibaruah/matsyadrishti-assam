import { CatchAssessmentRecord, Waterbody, RaisingFactorStratumResult } from '../types/fishery';

export class StatisticalEngine {
  /**
   * Calculates Mean Catch Per Unit Effort (CPUE) in kg/hour for a stratum or gear
   */
  static computeMeanCPUE(records: CatchAssessmentRecord[]): number {
    if (!records || records.length === 0) return 0;
    const totalCPUE = records.reduce((acc, r) => acc + (r.computedCPUEKgHr || (r.totalCatchKg / Math.max(0.5, r.soakHours))), 0);
    return Number((totalCPUE / records.length).toFixed(2));
  }

  /**
   * ICAR-CIFRI Compliant Raising Factor Calculation for Open-Water Fisheries
   * Factors in:
   * 1. Sample CPUE (kg/craft-hour)
   * 2. Active Craft Units (N)
   * 3. Operational Days per month (D)
   * 4. Average Soak Duration (hours/day)
   * 5. Dynamic Satellite Water Spread Ratio (A_sat / A_base)
   */
  static calculateStratumRaisingFactor(
    waterbody: Waterbody,
    records: CatchAssessmentRecord[],
    overrides?: {
      activeCrafts?: number;
      activeDays?: number;
      satelliteAreaHa?: number;
      averageSoakHours?: number;
    }
  ): RaisingFactorStratumResult {
    const matchingRecords = records.filter(r => r.waterbodyId === waterbody.id);
    const sampleCount = matchingRecords.length;
    const totalSampleWeightKg = matchingRecords.reduce((acc, r) => acc + r.totalCatchKg, 0);

    const meanCPUE = sampleCount > 0 
      ? this.computeMeanCPUE(matchingRecords) 
      : 3.2; // default regional benchmark

    const activeCrafts = overrides?.activeCrafts ?? waterbody.totalRegisteredCrafts;
    const activeDays = overrides?.activeDays ?? 24; // typical fishing days/month in Assam
    const baselineAreaHa = waterbody.registeredAreaHa;
    const satelliteAreaHa = overrides?.satelliteAreaHa ?? waterbody.currentMNDWIAreaHa;
    const averageSoakHours = overrides?.averageSoakHours ?? 3.5;

    // Dynamic satellite hydrological multiplier
    const areaMultiplier = baselineAreaHa > 0 ? (satelliteAreaHa / baselineAreaHa) : 1.0;

    // Raising factor representing the total gear-hours expansion factor for the month
    const computedRaisingFactor = Math.round(activeCrafts * activeDays * areaMultiplier);

    // Total Estimated Catch in Metric Tonnes:
    // Yield (kg) = Mean CPUE (kg/hr) * avg soak hours * Raising Factor
    const estimatedCatchKg = meanCPUE * averageSoakHours * computedRaisingFactor;
    const monthlyEstimatedCatchMT = Number((estimatedCatchKg / 1000).toFixed(2));

    // Standard Error and 95% Confidence Interval (based on sample size and variance)
    // Formula: SE = (s / sqrt(n)) * N_expansion
    const varianceEstimate = sampleCount > 1 
      ? matchingRecords.reduce((acc, r) => acc + Math.pow(r.computedCPUEKgHr - meanCPUE, 2), 0) / (sampleCount - 1)
      : (meanCPUE * 0.25); // 25% default variance if small sample
    
    const standardErrorCPUE = Math.sqrt(varianceEstimate / Math.max(1, sampleCount));
    const standardErrorMT = Number(((standardErrorCPUE * averageSoakHours * computedRaisingFactor) / 1000).toFixed(2));

    const lowerBoundMT = Math.max(0, Number((monthlyEstimatedCatchMT - (1.96 * standardErrorMT)).toFixed(2)));
    const upperBoundMT = Number((monthlyEstimatedCatchMT + (1.96 * standardErrorMT)).toFixed(2));

    const cvPercentage = monthlyEstimatedCatchMT > 0 
      ? Number(((standardErrorMT / monthlyEstimatedCatchMT) * 100).toFixed(1))
      : 0;

    return {
      waterbodyId: waterbody.id,
      waterbodyName: waterbody.name,
      district: waterbody.district,
      sampleCount,
      totalSampleWeightKg: Number(totalSampleWeightKg.toFixed(1)),
      meanCPUEKgHr: meanCPUE,
      activeCraftUnits: activeCrafts,
      activeDaysPerMonth: activeDays,
      baselineAreaHa,
      satelliteMNDWIAreaHa: satelliteAreaHa,
      areaMultiplier: Number(areaMultiplier.toFixed(3)),
      computedRaisingFactor,
      monthlyEstimatedCatchMT,
      standardErrorMT,
      confidenceInterval95: [lowerBoundMT, upperBoundMT],
      cvPercentage
    };
  }

  /**
   * Calculates Shannon-Wiener Biodiversity Index (H') for ecological monitoring
   * H' = - sum(p_i * ln(p_i))
   */
  static computeShannonDiversity(records: CatchAssessmentRecord[]): {
    index: number;
    healthStatus: 'High Diversity' | 'Moderate Diversity' | 'Depleted / Vulnerable';
    speciesBreakdown: { [speciesId: string]: number };
  } {
    const speciesTotals: { [speciesId: string]: number } = {};
    let totalWeight = 0;

    records.forEach(r => {
      r.speciesComposition.forEach(item => {
        speciesTotals[item.speciesId] = (speciesTotals[item.speciesId] || 0) + item.estimatedWeightKg;
        totalWeight += item.estimatedWeightKg;
      });
    });

    if (totalWeight === 0) {
      return { index: 0, healthStatus: 'Depleted / Vulnerable', speciesBreakdown: {} };
    }

    let hPrime = 0;
    Object.values(speciesTotals).forEach(weight => {
      const p_i = weight / totalWeight;
      if (p_i > 0) {
        hPrime -= p_i * Math.log(p_i);
      }
    });

    const index = Number(hPrime.toFixed(2));
    let healthStatus: 'High Diversity' | 'Moderate Diversity' | 'Depleted / Vulnerable' = 'Moderate Diversity';
    if (index >= 1.8) healthStatus = 'High Diversity';
    else if (index < 1.2) healthStatus = 'Depleted / Vulnerable';

    return { index, healthStatus, speciesBreakdown: speciesTotals };
  }
}
