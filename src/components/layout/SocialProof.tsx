import { FC, useEffect, useState } from 'react'

export const SocialProof: FC = () => {
  // 模擬動態增長的使用人數（基準值 + 動態增長）
  const BASE_USERS = 15231
  const [totalUsers, setTotalUsers] = useState(BASE_USERS)

  useEffect(() => {
    // 每 5 秒增加 1-3 人（模擬即時使用）
    const interval = setInterval(() => {
      setTotalUsers((prev) => prev + Math.floor(Math.random() * 3) + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const stats = [
    {
      icon: '👥',
      value: totalUsers.toLocaleString('zh-TW'),
      label: '位行銷人已使用',
      color: 'text-primary',
    },
    {
      icon: '📈',
      value: '+28',
      label: '平均提升分數',
      color: 'text-success',
    },
    {
      icon: '⭐',
      value: '4.8/5.0',
      label: '使用者滿意度',
      color: 'text-warning',
    },
    {
      icon: '⚡',
      value: '< 10 秒',
      label: '平均分析時間',
      color: 'text-info',
    },
  ]

  return (
    <div className="bg-gradient-to-r from-neutral-cream/50 to-white border-2 border-neutral-sand rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-neutral-800 mb-2">
          已獲得超過 15,000 位專業人士信賴
        </h3>
        <p className="text-neutral-600">
          廣告公司、行銷團隊、內容創作者都在使用
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-4 bg-white rounded-xl border border-neutral-stone hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div className={`text-3xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm text-neutral-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
