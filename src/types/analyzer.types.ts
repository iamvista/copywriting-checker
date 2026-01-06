export interface DimensionScore {
  score: number
  feedback: string[]
  suggestions: string[]
}

export interface AnalysisSummary {
  overallAssessment: string
  strengths: string[]
  weaknesses: string[]
  topPriorities: string[]
  expectedImpact: string
  vistaRecommendation: string
}

export interface AnalysisResult {
  totalScore: number
  grade: 'excellent' | 'good' | 'needsImprovement' | 'needsRewrite'
  summary: AnalysisSummary
  dimensions: {
    fab: DimensionScore
    titleAppeal: DimensionScore
    consumerInsight: DimensionScore
    callToAction: DimensionScore
    readability: DimensionScore
    valueProposition: DimensionScore
  }
  analyzedText: string
  timestamp: Date
}

export interface AnalyzerConfig {
  minLength: number
  maxLength: number
  useAI: boolean
}
