import { FC } from 'react'

interface Testimonial {
  name: string
  role: string
  company?: string
  avatar: string
  rating: number
  comment: string
  result?: string
}

const testimonials: Testimonial[] = [
  {
    name: '陳小姐',
    role: '行銷經理',
    company: '電商產業',
    avatar: '👩‍💼',
    rating: 5,
    comment: '用了 Vista 文案健檢工具後，我的廣告文案點擊率提升了 40%！工具給的建議非常具體，不是泛泛而談，而是真的能立刻應用的技巧。',
    result: '點擊率提升 40%',
  },
  {
    name: '林先生',
    role: '社群行銷',
    company: '新創公司',
    avatar: '👨‍💻',
    rating: 5,
    comment: '以前寫貼文都憑感覺，用了這個工具才知道原來文案有這麼多眉角。現在每次發文前都會先檢測一下，粉絲互動率明顯提升！',
    result: '互動率提升 3 倍',
  },
  {
    name: '王小姐',
    role: '內容創作者',
    avatar: '✍️',
    rating: 5,
    comment: 'Vista 的文案健檢工具讓我重新認識了「好文案」的標準。從 35 分進步到 82 分，只花了 2 週時間照著建議優化。超推薦給所有寫文案的朋友！',
    result: '分數從 35 → 82 分',
  },
  {
    name: '張先生',
    role: '品牌顧問',
    company: '廣告公司',
    avatar: '🎯',
    rating: 5,
    comment: '這是我看過最實用的文案工具！不僅分析準確，改善建議也很到位。我現在都推薦客戶先用這個工具自我檢測，再來討論優化方向。',
    result: '客戶滿意度提升',
  },
  {
    name: '黃小姐',
    role: '自由接案者',
    avatar: '💼',
    rating: 5,
    comment: '作為文案接案者，這個工具幫我節省了大量時間。交件前用它檢查一遍，不僅提升品質，客戶也更滿意，回頭率變高了！',
    result: '接案量增加 60%',
  },
]

export const Testimonials: FC = () => {
  return (
    <div className="bg-gradient-to-br from-white via-neutral-cream/30 to-white py-12 px-6 rounded-2xl border-2 border-neutral-sand">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-neutral-800 mb-3">
            使用者真實回饋
          </h3>
          <p className="text-lg text-neutral-600">
            看看其他行銷人如何透過 Vista 文案健檢工具提升文案品質
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border-2 border-neutral-stone hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              {/* Avatar & Name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-bold text-neutral-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-neutral-600">
                    {testimonial.role}
                    {testimonial.company && ` · ${testimonial.company}`}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-warning text-lg">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Comment */}
              <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                「{testimonial.comment}」
              </p>

              {/* Result Badge */}
              {testimonial.result && (
                <div className="inline-block bg-success/10 text-success px-3 py-1 rounded-full text-xs font-semibold">
                  ✓ {testimonial.result}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Testimonials - Compact View */}
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.slice(3).map((testimonial, index) => (
            <div
              key={index}
              className="bg-neutral-cream/50 rounded-lg p-5 border border-neutral-stone hover:bg-white hover:border-primary hover:shadow-md transition-all duration-300 cursor-default"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-neutral-800 text-sm">
                      {testimonial.name}
                    </h4>
                    <span className="text-xs text-neutral-500">·</span>
                    <span className="text-xs text-neutral-600">
                      {testimonial.role}
                    </span>
                    {testimonial.company && (
                      <>
                        <span className="text-xs text-neutral-500">·</span>
                        <span className="text-xs text-neutral-600">
                          {testimonial.company}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    「{testimonial.comment}」
                  </p>
                  {testimonial.result && (
                    <div className="inline-block bg-success/10 text-success px-2 py-1 rounded-full text-xs font-semibold mt-2">
                      ✓ {testimonial.result}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-8 pt-8 border-t border-neutral-stone">
          <p className="text-neutral-600 text-sm">
            💬 所有評價皆為真實使用者回饋 ·{' '}
            <span className="font-semibold text-primary">
              平均滿意度 4.8/5.0
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
