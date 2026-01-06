import { FC } from 'react'
import { DimensionScore } from '@/types/analyzer.types'

interface DimensionDetailProps {
  title: string
  icon: string
  dimension: DimensionScore
}

export const DimensionDetail: FC<DimensionDetailProps> = ({ title, icon, dimension }) => {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'bg-green-100 border-green-300'
    if (score >= 60) return 'bg-blue-100 border-blue-300'
    if (score >= 40) return 'bg-orange-100 border-orange-300'
    return 'bg-red-100 border-red-300'
  }

  return (
    <div className={`card border-2 ${getScoreColor(dimension.score)}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900">{title}</h4>
          <div className="text-2xl font-bold text-primary">{dimension.score}/100</div>
        </div>
      </div>

      {dimension.feedback.length > 0 && (
        <div className="mb-4">
          <p className="font-semibold text-gray-700 mb-2">分析結果：</p>
          <ul className="space-y-1">
            {dimension.feedback.map((item, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <span className={item.startsWith('✓') ? 'text-green-600' : 'text-red-600'}>
                  {item.startsWith('✓') ? '✓' : '✗'}
                </span>
                <span>{item.replace(/^[✓✗]\s*/, '')}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {dimension.suggestions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <span>💡</span>
            <span>改善建議：</span>
          </p>
          <ul className="space-y-2">
            {dimension.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-blue-900">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
