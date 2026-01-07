import { FC, useState } from 'react'

interface FAQItem {
  question: string
  answer: string | JSX.Element
}

const faqData: FAQItem[] = [
  {
    question: '這個工具是免費的嗎？',
    answer: '是的！Vista 文案健檢工具完全免費使用，沒有使用次數限制。我們希望幫助更多人提升文案寫作能力。',
  },
  {
    question: '我的文案會被儲存嗎？',
    answer: '不會。您輸入的文案內容僅在您的瀏覽器中處理，不會上傳或儲存至任何伺服器。我們重視您的隱私，所有分析都在本地完成。',
  },
  {
    question: '分數是如何計算的？',
    answer: (
      <>
        <p className="mb-2">分數基於 6 大維度的綜合評估：</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><strong>FAB 法則</strong>（25 分）：是否清楚呈現特性、優勢與效益</li>
          <li><strong>標題吸引力</strong>（20 分）：標題是否吸睛、引發好奇</li>
          <li><strong>消費者洞察</strong>（20 分）：是否深入了解目標受眾需求</li>
          <li><strong>行動呼籲</strong>（15 分）：CTA 是否明確、有急迫性</li>
          <li><strong>可讀性</strong>（10 分）：文字是否易讀、結構清晰</li>
          <li><strong>價值主張</strong>（10 分）：是否清楚傳達獨特價值</li>
        </ul>
        <p className="mt-2">總分 100 分，分數越高代表文案品質越好。</p>
      </>
    ),
  },
  {
    question: '可以重複使用嗎？有次數限制嗎？',
    answer: '當然可以！沒有任何次數限制。您可以無限次使用本工具分析不同的文案，持續優化您的寫作技巧。',
  },
  {
    question: '為什麼我的分數很低？',
    answer: (
      <>
        <p className="mb-2">分數低通常是因為以下原因：</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>文案太短（建議至少 50 字以上才能完整分析）</li>
          <li>缺少明確的價值主張或利益點</li>
          <li>沒有吸引人的標題或開頭</li>
          <li>缺少行動呼籲（CTA）</li>
          <li>過於籠統，沒有針對特定受眾</li>
        </ul>
        <p className="mt-2">
          別擔心！查看分析報告中的「改善建議」，按照建議優化文案，
          分數就會提升。如果分數低於 35 分，我們還提供免費課程協助您打好基礎。
        </p>
      </>
    ),
  },
  {
    question: 'Vista 是誰？',
    answer: (
      <>
        <p>
          Vista Cheng（鄭緯筌）是臺灣知名的文案寫作與內容行銷專家，擁有超過 20 年的專業經驗。
          他是多本暢銷書作者，包括《文案力就是你的鈔能力》、《慢讀秒懂數位好文案》、
          《1分鐘驚豔ChatGPT爆款文案寫作聖經》等。
        </p>
        <p className="mt-2">
          Vista 長期在企業、大學授課，培訓超過 10,000+ 位學員。
          本工具基於他多年的教學經驗與專業方法論開發，旨在幫助更多人提升文案寫作能力。
        </p>
        <p className="mt-2">
          了解更多：
          <a
            href="https://www.vista.tw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark font-semibold ml-1"
          >
            https://www.vista.tw
          </a>
        </p>
      </>
    ),
  },
  {
    question: '分析結果準確嗎？',
    answer: (
      <>
        <p>
          本工具基於 Vista 的專業文案寫作框架開發，結合規則式分析與 AI 輔助，
          能夠提供具參考價值的評估。但請注意：
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>文案好壞有時也取決於情境、目標受眾與媒介</li>
          <li>工具無法完全取代人類的創意與判斷</li>
          <li>建議將分析結果作為優化參考，而非絕對標準</li>
        </ul>
        <p className="mt-2">
          如果您想獲得更深入的專業指導，歡迎參考我們推薦的課程或寫作陪伴計畫。
        </p>
      </>
    ),
  },
  {
    question: '可以分析英文文案嗎？',
    answer: '目前本工具主要針對繁體中文文案設計，英文文案的分析準確度可能較低。我們未來會考慮加入多語言支援。',
  },
  {
    question: '可以匯出分析報告嗎？',
    answer: '可以！分析完成後，您可以選擇匯出 PDF 或 Markdown 格式的報告，方便儲存、分享或列印。',
  },
  {
    question: '為什麼推薦我課程？',
    answer: (
      <>
        <p>
          根據您的分數，我們會推薦適合的學習資源：
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li><strong>{'< 35 分'}</strong>：免費 Skool 基礎課程，從 0 開始打好文案基礎</li>
          <li><strong>35-59 分</strong>：品牌故事行銷課程，學會說一個好故事</li>
          <li><strong>≥ 60 分</strong>：Vista 寫作陪伴計畫，3 個月教練式深度陪伴</li>
        </ul>
        <p className="mt-2">
          這些推薦完全基於您的需求，沒有任何強制性。您可以自由選擇是否參加。
        </p>
      </>
    ),
  },
  {
    question: '如何取消電子報訂閱？',
    answer: '如果您訂閱了 Vista 電子報，每封信件底部都有「取消訂閱」連結，點擊即可隨時退訂。我們尊重您的選擇。',
  },
  {
    question: '遇到技術問題怎麼辦？',
    answer: (
      <>
        <p>如果您遇到任何技術問題，請嘗試以下步驟：</p>
        <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
          <li>重新整理頁面</li>
          <li>清除瀏覽器快取</li>
          <li>使用 Chrome、Firefox 或 Safari 等現代瀏覽器</li>
          <li>確保瀏覽器版本是最新的</li>
        </ol>
        <p className="mt-2">
          如果問題仍然存在，請來信：
          <a
            href="mailto:iamvista@gmail.com"
            className="text-primary hover:text-primary-dark font-semibold ml-1"
          >
            iamvista@gmail.com
          </a>
        </p>
      </>
    ),
  },
  {
    question: '可以提供客製化企業方案嗎？',
    answer: (
      <>
        <p>
          可以！如果您的企業需要：
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>內訓課程</li>
          <li>文案策略顧問</li>
          <li>團隊寫作訓練</li>
          <li>客製化分析規則</li>
        </ul>
        <p className="mt-2">
          歡迎來信洽詢：
          <a
            href="mailto:iamvista@gmail.com?subject=企業客製化方案諮詢"
            className="text-primary hover:text-primary-dark font-semibold ml-1"
          >
            iamvista@gmail.com
          </a>
        </p>
      </>
    ),
  },
]

const FAQItemComponent: FC<{ item: FAQItem; isOpen: boolean; onClick: () => void }> = ({
  item,
  isOpen,
  onClick,
}) => {
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full text-left py-4 px-4 hover:bg-neutral-50 transition-colors flex items-center justify-between gap-4"
      >
        <span className="font-semibold text-neutral-800 flex-1">{item.question}</span>
        <span className={`text-primary text-xl transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-neutral-700 leading-relaxed">
          {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
        </div>
      )}
    </div>
  )
}

export const FAQ: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="card">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2 pb-4 border-b-2 border-neutral-200">
            常見問題 FAQ
          </h1>
          <p className="text-neutral-600 mb-6">
            找不到答案？歡迎來信：
            <a
              href="mailto:iamvista@gmail.com"
              className="text-primary hover:text-primary-dark font-semibold ml-1"
            >
              iamvista@gmail.com
            </a>
          </p>

          <div className="space-y-0">
            {faqData.map((item, index) => (
              <FAQItemComponent
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>

          <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-neutral-700">
              💡 <strong>小提示</strong>：建議先使用工具分析您的文案，根據分析報告的建議進行優化，
              您會發現文案品質有明顯提升！
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
