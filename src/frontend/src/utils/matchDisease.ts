import type { Disease } from "../data/diseases";

export interface MatchResult {
  disease: Disease;
  confidence: number;
  matchCount: number;
  matchedSymptoms: string[];
}

export function matchDiseases(
  selectedSymptoms: string[],
  diseases: Disease[],
): MatchResult[] {
  if (selectedSymptoms.length === 0) return [];

  const results: MatchResult[] = diseases
    .map((disease) => {
      const matchedSymptoms = disease.symptoms.filter((s) =>
        selectedSymptoms.includes(s),
      );
      const matchCount = matchedSymptoms.length;
      if (matchCount === 0) return null;

      const score =
        0.7 * (matchCount / disease.symptoms.length) +
        0.3 * (matchCount / selectedSymptoms.length);
      const confidence = Math.min(Math.round(score * 100), 99);

      return { disease, confidence, matchCount, matchedSymptoms };
    })
    .filter((r): r is MatchResult => r !== null)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5);

  return results;
}
