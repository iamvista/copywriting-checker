import { FC, useState, useEffect } from 'react'

interface EmailEntry {
  email: string
  trigger: string
  score?: number
  timestamp: number
}

export const Admin: FC = () => {
  const [emails, setEmails] = useState<EmailEntry[]>([])
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // 簡單的密碼保護（實際應用應該用後端驗證）
  const ADMIN_PASSWORD = 'vista2026' // 請修改為您自己的密碼

  useEffect(() => {
    if (isAuthenticated) {
      loadEmails()
    }
  }, [isAuthenticated])

  const loadEmails = () => {
    try {
      const stored = localStorage.getItem('collected_emails')
      if (stored) {
        const emailList = JSON.parse(stored)
        setEmails(emailList.reverse()) // 最新的在前面
      }
    } catch (error) {
      console.error('Failed to load emails:', error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert('密碼錯誤')
    }
  }

  const exportToCSV = () => {
    if (emails.length === 0) {
      alert('沒有 Email 資料可匯出')
      return
    }

    // 建立 CSV 內容
    const headers = ['Email', '來源', '分數', '時間']
    const rows = emails.map((entry) => [
      entry.email,
      entry.trigger,
      entry.score || 'N/A',
      new Date(entry.timestamp).toLocaleString('zh-TW'),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n')

    // 加入 BOM 支援 Excel 中文顯示
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Vista文案健檢_Email名單_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const clearAllEmails = () => {
    if (window.confirm('確定要清除所有 Email 記錄嗎？此操作無法復原！')) {
      localStorage.removeItem('collected_emails')
      setEmails([])
      alert('已清除所有記錄')
    }
  }

  const copyEmailList = () => {
    const emailList = emails.map((e) => e.email).join('\n')
    navigator.clipboard.writeText(emailList)
    alert('✓ Email 列表已複製到剪貼簿')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-cream to-neutral-sand p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
              <span className="text-4xl">🔒</span>
            </div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">管理後台</h1>
            <p className="text-neutral-600">輸入密碼以查看收集的 Email</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-neutral-700 mb-2">
                密碼
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="輸入管理密碼"
                className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:border-primary focus:outline-none"
                required
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              登入
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-cream to-neutral-sand p-4">
      <div className="container mx-auto max-w-6xl py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-800 mb-2">📧 Email 管理後台</h1>
              <p className="text-neutral-600">
                已收集 <span className="font-bold text-primary">{emails.length}</span> 個 Email
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={copyEmailList} className="btn-secondary" disabled={emails.length === 0}>
                📋 複製列表
              </button>
              <button onClick={exportToCSV} className="btn-primary" disabled={emails.length === 0}>
                📥 匯出 CSV
              </button>
              <button onClick={clearAllEmails} className="btn-secondary text-red-600" disabled={emails.length === 0}>
                🗑️ 清除全部
              </button>
            </div>
          </div>
        </div>

        {/* Email List */}
        {emails.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-neutral-800 mb-2">尚無收集到的 Email</h3>
            <p className="text-neutral-600">當有使用者填寫 Email 後，會顯示在這裡</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-100 border-b-2 border-neutral-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-neutral-800">#</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-neutral-800">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-neutral-800">來源</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-neutral-800">分數</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-neutral-800">時間</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {emails.map((entry, index) => (
                    <tr key={index} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-neutral-600">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-mono text-neutral-800">{entry.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            entry.trigger === 'exit_intent'
                              ? 'bg-warning/20 text-warning-dark'
                              : entry.trigger === 'pdf_download'
                              ? 'bg-info/20 text-info-dark'
                              : 'bg-success/20 text-success-dark'
                          }`}
                        >
                          {entry.trigger === 'exit_intent'
                            ? '🚪 Exit Intent'
                            : entry.trigger === 'pdf_download'
                            ? '📑 PDF 下載'
                            : '📊 分析完成'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {entry.score ? (
                          <span className="font-bold text-primary">{entry.score} 分</span>
                        ) : (
                          <span className="text-neutral-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">
                        {new Date(entry.timestamp).toLocaleString('zh-TW')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 說明 */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <span>💡</span>
            <span>使用說明</span>
          </h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• <strong>複製列表：</strong>快速複製所有 Email 地址</li>
            <li>• <strong>匯出 CSV：</strong>下載完整資料表格，可用 Excel 開啟</li>
            <li>• <strong>資料儲存：</strong>目前資料儲存在瀏覽器 localStorage，建議定期匯出備份</li>
            <li>• <strong>長期方案：</strong>建議整合 Google Sheets API 或 Mailchimp 自動同步</li>
          </ul>
        </div>

        {/* 返回首頁 */}
        <div className="mt-6 text-center">
          <a href="/" className="text-primary hover:text-primary-dark font-semibold transition-colors">
            ← 返回首頁
          </a>
        </div>
      </div>
    </div>
  )
}
