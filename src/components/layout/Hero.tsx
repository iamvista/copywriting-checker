import { FC } from 'react'

export const Hero: FC = () => {
  return (
    <section className="text-center py-8 lg:py-12 mb-6 lg:mb-8 px-4">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 lg:mb-4">
        30 秒檢測您的文案吸引力
      </h2>
      <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-4 lg:mb-6 max-w-2xl mx-auto px-4">
        基於 Vista 的多年專業教學經驗，分析您的文案並提供具體改善建議
      </p>
      <div className="flex flex-wrap justify-center gap-3 lg:gap-4 text-xs lg:text-sm text-gray-700">
        <div className="flex items-center gap-1.5 lg:gap-2">
          <span className="text-green-500">✓</span>
          <span>標題吸引力分析</span>
        </div>
        <div className="flex items-center gap-1.5 lg:gap-2">
          <span className="text-green-500">✓</span>
          <span>消費者洞察評估</span>
        </div>
        <div className="flex items-center gap-1.5 lg:gap-2">
          <span className="text-green-500">✓</span>
          <span>行動呼籲檢測</span>
        </div>
        <div className="flex items-center gap-1.5 lg:gap-2">
          <span className="text-green-500">✓</span>
          <span>即時改善建議</span>
        </div>
      </div>
    </section>
  )
}
