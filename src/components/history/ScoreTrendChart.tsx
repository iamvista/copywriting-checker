import { FC } from 'react'
import { getScoreTrend, getAverageScore, getHighestScore } from '@/utils/historyManager'

export const ScoreTrendChart: FC = () => {
  const trend = getScoreTrend()
  const averageScore = getAverageScore()
  const highestScore = getHighestScore()

  if (trend.length === 0) {
    return null
  }

  // 只顯示最近 10 筆
  const displayTrend = trend.slice(-10)

  // 計算圖表尺寸
  const chartWidth = 800
  const chartHeight = 300
  const padding = { top: 40, right: 40, bottom: 60, left: 60 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  // 計算 X 和 Y 座標
  const maxScore = 100
  const minScore = 0

  const getX = (index: number) => {
    return padding.left + (index / (displayTrend.length - 1 || 1)) * innerWidth
  }

  const getY = (score: number) => {
    return padding.top + innerHeight - ((score - minScore) / (maxScore - minScore)) * innerHeight
  }

  // 生成折線路徑
  const pathData = displayTrend
    .map((point, index) => {
      const x = getX(index)
      const y = getY(point.score)
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  // 生成漸層填充路徑
  const areaData =
    pathData +
    ` L ${getX(displayTrend.length - 1)} ${padding.top + innerHeight}` +
    ` L ${getX(0)} ${padding.top + innerHeight} Z`

  // Y軸刻度
  const yTicks = [0, 25, 50, 75, 100]

  // 計算改善幅度
  const improvement =
    displayTrend.length >= 2
      ? displayTrend[displayTrend.length - 1].score - displayTrend[0].score
      : null

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-neutral-800 mb-2">📈 分數趨勢分析</h3>
        <p className="text-sm text-neutral-600">追蹤您的文案寫作進步軌跡</p>
      </div>

      {/* 統計數據 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-sm text-blue-600 font-semibold mb-1">平均分數</div>
          <div className="text-3xl font-bold text-blue-700">{averageScore}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-sm text-green-600 font-semibold mb-1">最高分數</div>
          <div className="text-3xl font-bold text-green-700">{highestScore}</div>
        </div>
        <div className={`rounded-lg p-4 text-center ${
          improvement === null ? 'bg-neutral-50' :
          improvement > 0 ? 'bg-green-50' :
          improvement < 0 ? 'bg-red-50' : 'bg-neutral-50'
        }`}>
          <div className={`text-sm font-semibold mb-1 ${
            improvement === null ? 'text-neutral-600' :
            improvement > 0 ? 'text-green-600' :
            improvement < 0 ? 'text-red-600' : 'text-neutral-600'
          }`}>
            {improvement === null ? '總分變化' : improvement > 0 ? '進步幅度' : '退步幅度'}
          </div>
          <div className={`text-3xl font-bold ${
            improvement === null ? 'text-neutral-700' :
            improvement > 0 ? 'text-green-700' :
            improvement < 0 ? 'text-red-700' : 'text-neutral-700'
          }`}>
            {improvement === null ? '-' : improvement > 0 ? `+${improvement}` : improvement === 0 ? '0' : improvement}
          </div>
        </div>
      </div>

      {/* 圖表 */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto"
          style={{ minHeight: '300px' }}
        >
          {/* 定義漸層 */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4772B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D4772B" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Y軸刻度線 */}
          {yTicks.map((tick) => {
            const y = getY(tick)
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={chartWidth - padding.right}
                  y2={y}
                  stroke="#E5E5E5"
                  strokeWidth="1"
                  strokeDasharray={tick === 0 || tick === 100 ? 'none' : '4,4'}
                />
                <text
                  x={padding.left - 10}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize="12"
                  fill="#666"
                >
                  {tick}
                </text>
              </g>
            )
          })}

          {/* 漸層填充區域 */}
          <path d={areaData} fill="url(#scoreGradient)" />

          {/* 折線 */}
          <path
            d={pathData}
            fill="none"
            stroke="#D4772B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 數據點 */}
          {displayTrend.map((point, index) => {
            const x = getX(index)
            const y = getY(point.score)
            const isFirst = index === 0
            const isLast = index === displayTrend.length - 1

            return (
              <g key={index}>
                {/* 數據點圓圈 */}
                <circle
                  cx={x}
                  cy={y}
                  r={isLast ? 6 : 4}
                  fill="white"
                  stroke="#D4772B"
                  strokeWidth={isLast ? 3 : 2}
                />

                {/* 分數標籤（只在第一個和最後一個點顯示） */}
                {(isFirst || isLast) && (
                  <text
                    x={x}
                    y={y - 15}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#D4772B"
                  >
                    {point.score}
                  </text>
                )}

                {/* X軸標籤 */}
                <text
                  x={x}
                  y={chartHeight - padding.bottom + 20}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#666"
                  transform={`rotate(-45, ${x}, ${chartHeight - padding.bottom + 20})`}
                >
                  {point.date}
                </text>
              </g>
            )
          })}

          {/* X軸 */}
          <line
            x1={padding.left}
            y1={padding.top + innerHeight}
            x2={chartWidth - padding.right}
            y2={padding.top + innerHeight}
            stroke="#333"
            strokeWidth="2"
          />

          {/* Y軸 */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + innerHeight}
            stroke="#333"
            strokeWidth="2"
          />

          {/* Y軸標籤 */}
          <text
            x={padding.left - 40}
            y={padding.top + innerHeight / 2}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#333"
            transform={`rotate(-90, ${padding.left - 40}, ${padding.top + innerHeight / 2})`}
          >
            分數
          </text>
        </svg>
      </div>

      {/* 說明文字 */}
      <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
        <p className="text-sm text-neutral-700">
          💡 <strong>趨勢解讀</strong>：
          {improvement !== null && improvement > 0 && (
            <span className="text-green-700">
              {' '}恭喜！您的文案品質相較首次分析進步了 <strong>{improvement}</strong> 分，持續保持！
            </span>
          )}
          {improvement !== null && improvement < 0 && (
            <span className="text-orange-700">
              {' '}分數有所下降，建議重新檢視文案核心要素，並參考改善建議調整。
            </span>
          )}
          {improvement === 0 && (
            <span className="text-neutral-700">
              {' '}分數維持穩定，試著挑戰更高難度的文案類型來提升能力！
            </span>
          )}
          {improvement === null && (
            <span className="text-neutral-700">
              {' '}繼續使用工具分析，就能看到您的進步軌跡！
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
