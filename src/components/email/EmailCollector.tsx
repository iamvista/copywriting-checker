import { FC, useState } from 'react'
import { trackMetaLead } from '@/utils/metaPixel'

interface EmailCollectorProps {
  trigger: 'analysis_complete' | 'pdf_download' | 'exit_intent'
  score?: number
  onEmailSubmit: (email: string) => void
  onClose: () => void
  title: string
  description: string
  incentive: string
}

export const EmailCollector: FC<EmailCollectorProps> = ({
  trigger,
  score,
  onEmailSubmit,
  onClose,
  title,
  description,
  incentive,
}) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) {
      setError('請輸入有效的 Email 地址')
      return
    }

    setIsSubmitting(true)

    try {
      // 儲存 Email 到 localStorage（實際應用應該發送到後端）
      const emailData = {
        email,
        trigger,
        score,
        timestamp: Date.now(),
      }

      const existingEmails = JSON.parse(localStorage.getItem('collected_emails') || '[]')
      existingEmails.push(emailData)
      localStorage.setItem('collected_emails', JSON.stringify(existingEmails))

      // 追蹤轉換
      trackMetaLead({
        content_name: `Email Collection - ${trigger}`,
        value: score,
      })

      // 通知父組件
      onEmailSubmit(email)
    } catch (err) {
      setError('提交失敗，請稍後再試')
      console.error('Email submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800 text-2xl font-bold transition-colors"
          aria-label="關閉"
        >
          ×
        </button>

        {/* Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
            <span className="text-4xl">📧</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-800 mb-2">{title}</h3>
          <p className="text-neutral-600 leading-relaxed">{description}</p>
        </div>

        {/* Incentive Box */}
        <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-xl p-5 mb-6 border-2 border-primary/20">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🎁</span>
            <div>
              <h4 className="font-bold text-neutral-800 mb-1">免費獲得</h4>
              <p className="text-sm text-neutral-700">{incentive}</p>
            </div>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
              Email 地址
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:border-primary focus:outline-none transition-colors"
              required
              disabled={isSubmitting}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !email}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>處理中...</span>
              </>
            ) : (
              <>
                <span>✓</span>
                <span>立即獲取</span>
              </>
            )}
          </button>
        </form>

        {/* Privacy Note */}
        <p className="text-xs text-neutral-500 text-center mt-4">
          🔒 我們重視您的隱私，絕不會將您的資料分享給第三方
        </p>

        {/* Skip Option */}
        <button
          onClick={onClose}
          className="text-sm text-neutral-500 hover:text-neutral-700 underline mt-4 w-full text-center transition-colors"
        >
          暫時跳過
        </button>
      </div>
    </div>
  )
}
