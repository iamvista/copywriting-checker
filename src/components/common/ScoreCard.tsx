import { FC } from 'react'

interface ScoreCardProps {
  title: string
  score: number
  icon: string
}

export const ScoreCard: FC<ScoreCardProps> = ({ title, score, icon }) => {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getProgressColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-blue-500'
    if (score >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="card text-center p-3 lg:p-4">
      <div className="text-2xl lg:text-3xl mb-1.5 lg:mb-2">{icon}</div>
      <h4 className="text-xs lg:text-sm font-semibold text-gray-700 mb-1.5 lg:mb-2">{title}</h4>
      <div className={`text-2xl lg:text-3xl font-bold ${getScoreColor(score)} mb-1.5 lg:mb-2`}>
        {score}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 lg:h-2">
        <div
          className={`${getProgressColor(score)} h-1.5 lg:h-2 rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
