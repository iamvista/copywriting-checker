import { FC } from 'react'

export const Privacy: FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="card">
          <h1 className="text-3xl font-bold text-neutral-800 mb-6 pb-4 border-b-2 border-neutral-200">
            隱私權政策
          </h1>

          <div className="space-y-6 text-neutral-700 leading-relaxed">
            <section>
              <p className="text-sm text-neutral-500 mb-4">
                最後更新日期：2026 年 1 月 7 日
              </p>
              <p>
                Vista 文案健檢工具（以下簡稱「本工具」）由 Vista Cheng（鄭緯筌）提供。
                我們重視您的隱私權，本政策說明我們如何收集、使用及保護您的個人資料。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-800 mb-3">1. 資料收集</h2>

              <h3 className="text-lg font-semibold text-neutral-800 mb-2 mt-4">1.1 您提供的資料</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>文案內容</strong>：當您使用本工具分析文案時，您輸入的文字內容會被暫時處理，但<strong>不會被儲存</strong>在我們的伺服器上。</li>
                <li><strong>Email 地址</strong>：當您訂閱 Vista 電子報（透過 Substack）或來信詢問課程時，我們會收集您的 Email 地址。</li>
              </ul>

              <h3 className="text-lg font-semibold text-neutral-800 mb-2 mt-4">1.2 自動收集的資料</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>使用數據</strong>：透過 Google Analytics 4（GA4），我們會收集匿名的使用行為數據，包括：
                  <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                    <li>分析完成次數</li>
                    <li>文案分數分布</li>
                    <li>各維度平均分數</li>
                    <li>課程連結點擊次數</li>
                    <li>社群分享行為</li>
                    <li>頁面瀏覽時間</li>
                  </ul>
                </li>
                <li><strong>技術資訊</strong>：包括瀏覽器類型、裝置類型、IP 位址（經過匿名化處理）、作業系統等。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-800 mb-3">2. 資料使用目的</h2>
              <p className="mb-2">我們收集的資料僅用於以下目的：</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>提供服務</strong>：處理您的文案並產生分析報告。</li>
                <li><strong>改善工具</strong>：了解使用者需求，優化分析邏輯與使用者體驗。</li>
                <li><strong>發送電子報</strong>：若您訂閱，我們會定期發送文案技巧、課程資訊等內容。</li>
                <li><strong>課程諮詢</strong>：回覆您的課程詢問或報名資訊。</li>
                <li><strong>數據分析</strong>：產生匿名的統計報告，了解工具使用趨勢。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-800 mb-3">3. 資料保護</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>文案不儲存</strong>：您輸入的文案內容僅在瀏覽器中處理，<strong>不會上傳或儲存</strong>至任何伺服器。</li>
                <li><strong>加密傳輸</strong>：本網站使用 HTTPS 加密連線，保護資料傳輸安全。</li>
                <li><strong>第三方服務</strong>：
                  <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                    <li>Google Analytics 4：用於匿名數據分析，符合 GDPR 規範。</li>
                    <li>Substack：用於電子報訂閱與發送。</li>
                    <li>Vercel：網站託管服務。</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-800 mb-3">4. 資料分享</h2>
              <p className="mb-2"><strong>我們絕不會將您的個人資料出售或分享給第三方</strong>，除非：</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>獲得您的明確同意</li>
                <li>法律要求或司法程序需要</li>
                <li>保護本工具或使用者的權益與安全</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-800 mb-3">5. Cookie 使用</h2>
              <p className="mb-2">本工具使用 Cookie 與類似技術：</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>必要 Cookie</strong>：確保網站正常運作。</li>
                <li><strong>分析 Cookie</strong>：Google Analytics 用於了解使用者行為（可透過瀏覽器設定停用）。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-800 mb-3">6. 您的權利</h2>
              <p className="mb-2">根據臺灣《個人資料保護法》，您享有以下權利：</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>查詢或請求閱覽</strong>：您可要求查詢我們持有的您的個人資料。</li>
                <li><strong>請求製給複製本</strong>：您可要求提供個人資料副本。</li>
                <li><strong>請求補充或更正</strong>：若資料不正確，您可要求更正。</li>
                <li><strong>請求停止處理或刪除</strong>：您可隨時要求停止使用或刪除您的個人資料。</li>
                <li><strong>取消訂閱</strong>：電子報中提供「取消訂閱」連結，您可隨時退訂。</li>
              </ul>
              <p className="mt-4">
                如需行使上述權利，請來信：
                <a href="mailto:iamvista@gmail.com" className="text-primary hover:text-primary-dark font-semibold ml-1">
                  iamvista@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-800 mb-3">7. 兒童隱私</h2>
              <p>
                本工具不針對 13 歲以下兒童設計。我們不會有意收集兒童的個人資料。
                如果您認為我們無意中收集了兒童資料，請立即通知我們，我們將盡快刪除。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-800 mb-3">8. 政策更新</h2>
              <p>
                我們可能會不定期更新本隱私權政策。任何重大變更將在本頁面公告，並更新「最後更新日期」。
                建議您定期查閱本政策。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-800 mb-3">9. 聯絡我們</h2>
              <p>
                如對本隱私權政策有任何疑問，請透過以下方式聯繫：
              </p>
              <div className="bg-neutral-100 rounded-lg p-4 mt-3">
                <p><strong>服務提供者</strong>：Vista Cheng（鄭緯筌）</p>
                <p><strong>Email</strong>：
                  <a href="mailto:iamvista@gmail.com" className="text-primary hover:text-primary-dark font-semibold">
                    iamvista@gmail.com
                  </a>
                </p>
                <p><strong>網站</strong>：
                  <a href="https://www.vista.tw" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark font-semibold">
                    https://www.vista.tw
                  </a>
                </p>
              </div>
            </section>

            <section className="border-t-2 border-neutral-200 pt-6 mt-8">
              <p className="text-sm text-neutral-500">
                本隱私權政策符合臺灣《個人資料保護法》及相關法規要求。
                使用本工具即表示您同意本政策的內容。
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
