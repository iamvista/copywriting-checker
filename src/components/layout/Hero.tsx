import { FC } from 'react'

export const Hero: FC = () => {
  return (
    <section className="py-8 lg:py-12 mb-6 lg:mb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 lg:mb-4">
              30 秒檢測您的文案吸引力 ✨
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-4 lg:mb-6">
              基於 Vista 的多年專業教學經驗，分析您的文案並提供具體改善建議
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 lg:gap-4 text-xs lg:text-sm text-gray-700">
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
          </div>

          {/* Right: Hero Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/images/hero-image.jpg"
              alt="Vista 文案健檢工具 - AI 助手協助分析文案品質"
              className="w-full max-w-md rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
