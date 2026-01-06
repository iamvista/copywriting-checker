/**
 * Vista 文案心法資料庫
 * 從 Vista 的教學經驗和專業框架中萃取的文案寫作智慧
 */

export interface CopywritingWisdom {
  quote: string
  explanation: string
  category: 'fab' | 'title' | 'psychology' | 'cta' | 'structure' | 'general'
}

export const COPYWRITING_WISDOM: CopywritingWisdom[] = [
  // FAB 法則相關 (15條)
  {
    quote: 'Features tell, but benefits sell',
    explanation: '功能只是告知，利益才能銷售。別只說產品有什麼，要說對顧客有什麼好處。',
    category: 'fab',
  },
  {
    quote: '不要賣鑽孔機，要賣牆上的洞',
    explanation: '顧客買的不是產品本身，而是產品能為他們解決的問題。',
    category: 'fab',
  },
  {
    quote: '說特性是規格表，說利益才是文案',
    explanation: 'Feature 只是資訊，Benefit 才能打動人心。永遠記得從顧客角度出發。',
    category: 'fab',
  },
  {
    quote: '好文案回答三個問題：是什麼、為什麼、有什麼好處',
    explanation: 'Feature（特性）、Advantage（優勢）、Benefit（效益）缺一不可。',
    category: 'fab',
  },
  {
    quote: '與其說「32GB 記憶體」，不如說「同時開20個分頁也不當機」',
    explanation: '把技術規格翻譯成使用情境，讓顧客立刻理解價值。',
    category: 'fab',
  },
  {
    quote: '顧客不在乎您的產品，只在乎自己的問題',
    explanation: '從痛點出發，用解決方案包裝產品，才能引起共鳴。',
    category: 'fab',
  },
  {
    quote: '別說「防水」，要說「下雨天也不怕」',
    explanation: '把產品特性轉換成生活場景，讓顧客產生畫面感。',
    category: 'fab',
  },
  {
    quote: 'So What? 是檢驗文案最好的方法',
    explanation: '每寫一句話就問自己「那又怎樣？」，確保真正傳達了對顧客的好處。',
    category: 'fab',
  },
  {
    quote: '好處要具體，不要抽象',
    explanation: '「提升效率」太空泛，「每天節省2小時」才有感。',
    category: 'fab',
  },
  {
    quote: '賣的是結果，不是過程',
    explanation: '顧客要的是瘦下來，不是運動課程；要的是學會英文，不是文法教學。',
    category: 'fab',
  },
  {
    quote: '與其強調「我們很棒」，不如證明「對您有用」',
    explanation: '自我吹噓不如實際價值。把焦點從產品轉到顧客身上。',
    category: 'fab',
  },
  {
    quote: '功能要說人話，利益要說心裡話',
    explanation: '避免專業術語，用顧客的語言描述他們真正在意的事。',
    category: 'fab',
  },
  {
    quote: '好的 Benefit 讓人想像擁有後的美好',
    explanation: '不只解決痛點，更要描繪擁有後的理想狀態。',
    category: 'fab',
  },
  {
    quote: '先建立 Why，再說明 What',
    explanation: '先讓顧客理解為什麼需要，再介紹是什麼產品。',
    category: 'fab',
  },
  {
    quote: '轉換率的關鍵在於「這對我有什麼好處」說得夠不夠清楚',
    explanation: 'Benefit 不明確，顧客就不會採取行動。',
    category: 'fab',
  },

  // 標題吸引力相關 (15條)
  {
    quote: '標題決定80%的成敗',
    explanation: '再好的內容，沒有吸引人的標題就沒人看。用數字、痛點、好奇心抓住注意力。',
    category: 'title',
  },
  {
    quote: '好標題要在3秒內抓住眼球',
    explanation: '現代人注意力有限，標題必須瞬間引起興趣或共鳴。',
    category: 'title',
  },
  {
    quote: '數字是標題的魔法',
    explanation: '「5個方法」、「3分鐘學會」、「提升50%」都比模糊的形容詞有效。',
    category: 'title',
  },
  {
    quote: '好標題問對問題，而不是給答案',
    explanation: '「您是否也有這個困擾？」比「解決方案在這裡」更能引起點擊。',
    category: 'title',
  },
  {
    quote: '痛點標題比甜點標題更有效',
    explanation: '人們逃避痛苦的動力往往大於追求快樂。先戳痛點，再給解方。',
    category: 'title',
  },
  {
    quote: '具體的承諾勝過空泛的形容',
    explanation: '「30天見效」比「快速有效」更可信。',
    category: 'title',
  },
  {
    quote: '好奇心是點擊率的引擎',
    explanation: '製造資訊缺口，讓人想知道「然後呢？」',
    category: 'title',
  },
  {
    quote: '反差製造吸引力',
    explanation: '「月薪3萬如何存到100萬」這種反常識的標題特別吸睛。',
    category: 'title',
  },
  {
    quote: '負面標題往往比正面標題有效',
    explanation: '「別再犯這5個錯誤」比「5個成功秘訣」更吸引人。',
    category: 'title',
  },
  {
    quote: '時間限定創造急迫感',
    explanation: '「最後3天」、「限時優惠」都能提升點擊率。',
    category: 'title',
  },
  {
    quote: '標題要針對明確的受眾',
    explanation: '「給新手爸媽」比「給大家」更能引起共鳴。',
    category: 'title',
  },
  {
    quote: '好標題像電影預告片',
    explanation: '透露足夠的資訊引起興趣，但不全部說完。',
    category: 'title',
  },
  {
    quote: '簡潔有力勝過華麗辭藻',
    explanation: '標題不是文學創作，清楚傳達價值最重要。',
    category: 'title',
  },
  {
    quote: '測試標題是專業文案的必修課',
    explanation: 'A/B 測試不同標題，數據會告訴您答案。',
    category: 'title',
  },
  {
    quote: '標題要承諾，內容要兌現',
    explanation: '標題黨只會失去信任。承諾什麼就要給什麼。',
    category: 'title',
  },

  // 心理學與洞察相關 (20條)
  {
    quote: '不是寫您想說的話，而是寫讀者想聽的話',
    explanation: '好文案的核心是同理心，站在讀者的角度思考，才能真正打動人心。',
    category: 'psychology',
  },
  {
    quote: '人們根據情感做決定，再用理性合理化',
    explanation: '先打動情感，再提供理性支持，這是說服的黃金公式。',
    category: 'psychology',
  },
  {
    quote: '恐懼比承諾更能驅動行動',
    explanation: 'FOMO（錯失恐懼）是強大的行銷工具。「別錯過」往往比「立即擁有」有效。',
    category: 'psychology',
  },
  {
    quote: '社會認同是最強大的說服力',
    explanation: '「10萬人使用」、「業界第一」、「客戶見證」都在運用從眾心理。',
    category: 'psychology',
  },
  {
    quote: '具體的細節創造可信度',
    explanation: '「提升業績300%」比「大幅提升」更可信。數字越精確，可信度越高。',
    category: 'psychology',
  },
  {
    quote: '稀缺性製造價值感',
    explanation: '「限量100組」、「僅剩3個名額」會讓人覺得更珍貴。',
    category: 'psychology',
  },
  {
    quote: '故事比數據更能打動人',
    explanation: '一個真實案例的說服力勝過十個統計數字。',
    category: 'psychology',
  },
  {
    quote: '痛點要挖深，不要只停留表面',
    explanation: '「沒時間」背後可能是「錯過孩子成長」，深層痛點才真正痛。',
    category: 'psychology',
  },
  {
    quote: '給人台階下，降低決策門檻',
    explanation: '「免費試用」、「不滿意退費」都在降低心理障礙。',
    category: 'psychology',
  },
  {
    quote: '對比創造價值感',
    explanation: '「原價9800，現在只要2980」利用了錨定效應。',
    category: 'psychology',
  },
  {
    quote: '身份認同比產品功能更重要',
    explanation: '賣的不是手錶，是成功人士的身份象徵。',
    category: 'psychology',
  },
  {
    quote: '專業術語會疏離讀者',
    explanation: '除非您的受眾是專家，否則用白話文才能擴大影響力。',
    category: 'psychology',
  },
  {
    quote: '第一印象決定後續認知',
    explanation: '開頭沒抓住注意力，後面寫得再好也沒用。',
    category: 'psychology',
  },
  {
    quote: '損失厭惡強於獲得期待',
    explanation: '「別再浪費錢」比「省下錢」更有動力。',
    category: 'psychology',
  },
  {
    quote: '權威背書降低信任門檻',
    explanation: '「醫師推薦」、「獲獎肯定」都在借用權威性。',
    category: 'psychology',
  },
  {
    quote: '視覺化描述強化記憶',
    explanation: '讓讀者在腦中看到畫面，比抽象描述更有說服力。',
    category: 'psychology',
  },
  {
    quote: '同理心是文案的基礎',
    explanation: '真正理解受眾的困境，才能寫出打動人的文案。',
    category: 'psychology',
  },
  {
    quote: '重複關鍵訊息加深印象',
    explanation: '重要的價值主張要多次以不同方式呈現。',
    category: 'psychology',
  },
  {
    quote: '情境化的描述比條列更有感',
    explanation: '「想像週末早晨，在陽台喝咖啡」比「舒適的陽台」更吸引人。',
    category: 'psychology',
  },
  {
    quote: '給予選擇權增加掌控感',
    explanation: '「A方案或B方案」比「買或不買」更容易成交。',
    category: 'psychology',
  },

  // 行動呼籲相關 (15條)
  {
    quote: '沒有行動呼籲，就沒有轉換',
    explanation: '明確告訴讀者下一步該做什麼，降低決策門檻，提升轉換率。',
    category: 'cta',
  },
  {
    quote: 'CTA 要清楚、明確、單一',
    explanation: '一次只要求一個行動。選擇太多反而降低轉換率。',
    category: 'cta',
  },
  {
    quote: '動詞開頭的 CTA 最有力',
    explanation: '「立即下載」、「馬上報名」比「了解更多」更能驅動行動。',
    category: 'cta',
  },
  {
    quote: '急迫感是 CTA 的催化劑',
    explanation: '「限時3天」、「僅剩5個名額」會加速決策。',
    category: 'cta',
  },
  {
    quote: '降低門檻提高轉換',
    explanation: '「免費試用」比「立即購買」容易跨出第一步。',
    category: 'cta',
  },
  {
    quote: '告訴他們會得到什麼，而不只是要做什麼',
    explanation: '「下載免費指南」比「點這裡」更有吸引力。',
    category: 'cta',
  },
  {
    quote: 'CTA 按鈕要醒目但不突兀',
    explanation: '顏色對比、大小適中、位置明確，但要融入整體設計。',
    category: 'cta',
  },
  {
    quote: '第一人稱的 CTA 更有效',
    explanation: '「開始我的免費試用」比「開始免費試用」轉換率更高。',
    category: 'cta',
  },
  {
    quote: '消除風險增加信心',
    explanation: '「不滿意全額退費」讓人更願意嘗試。',
    category: 'cta',
  },
  {
    quote: '重複 CTA 但不要煩人',
    explanation: '長文案可以有多個 CTA，但要自然融入內容。',
    category: 'cta',
  },
  {
    quote: '指明具體的下一步',
    explanation: '「填寫下方表格」比「聯絡我們」更明確。',
    category: 'cta',
  },
  {
    quote: '正面用語比負面用語有效',
    explanation: '「加入我們」比「不要錯過」給人更好的感覺。',
    category: 'cta',
  },
  {
    quote: '承諾要兌現，不要過度承諾',
    explanation: 'CTA 的承諾要與實際體驗一致，否則會失去信任。',
    category: 'cta',
  },
  {
    quote: '簡化流程減少流失',
    explanation: '能一鍵完成就不要三個步驟。每增加一步都會流失客戶。',
    category: 'cta',
  },
  {
    quote: '測試不同的 CTA 文案',
    explanation: '「立即購買」和「加入購物車」可能有截然不同的效果。',
    category: 'cta',
  },

  // 結構與可讀性相關 (15條)
  {
    quote: '好文案像階梯，一步步引導讀者',
    explanation: '邏輯清晰、層次分明，讓人順著您的思路走。',
    category: 'structure',
  },
  {
    quote: '開頭3秒決定讀者去留',
    explanation: '用痛點、好奇心或承諾立刻抓住注意力。',
    category: 'structure',
  },
  {
    quote: '一段只說一件事',
    explanation: '單一主題容易閱讀，資訊過載會讓人放棄。',
    category: 'structure',
  },
  {
    quote: '短句子比長句子更有力',
    explanation: '一口氣能唸完的句子最容易理解。',
    category: 'structure',
  },
  {
    quote: '留白是文案的呼吸',
    explanation: '適當的空白讓視覺舒適，降低閱讀壓力。',
    category: 'structure',
  },
  {
    quote: '項目符號提升可讀性',
    explanation: '條列重點比大段文字更容易掃視和吸收。',
    category: 'structure',
  },
  {
    quote: '金字塔結構：結論先行',
    explanation: '先說最重要的，再補充細節。符合現代人的閱讀習慣。',
    category: 'structure',
  },
  {
    quote: '轉折詞引導閱讀節奏',
    explanation: '「但是」、「因此」、「更重要的是」讓文案流暢。',
    category: 'structure',
  },
  {
    quote: '視覺化元素打破文字疲勞',
    explanation: '圖片、圖表、引言框都能讓版面更生動。',
    category: 'structure',
  },
  {
    quote: '每個段落都要有存在的理由',
    explanation: '砍掉不必要的內容，精簡才有力。',
    category: 'structure',
  },
  {
    quote: '手機優先的時代，要考慮小螢幕閱讀',
    explanation: '短段落、大字體、清楚的行動按鈕。',
    category: 'structure',
  },
  {
    quote: '重要資訊要重複但不重複',
    explanation: '用不同的方式表達相同的核心訊息。',
    category: 'structure',
  },
  {
    quote: '節奏要有快有慢',
    explanation: '時而激昂，時而平緩，避免單調。',
    category: 'structure',
  },
  {
    quote: '結尾要強化核心訊息',
    explanation: '最後一段要呼應開頭，加強記憶點。',
    category: 'structure',
  },
  {
    quote: '掃讀測試：只看標題和粗體也要能理解',
    explanation: '多數人是掃視而非精讀，重點要明顯。',
    category: 'structure',
  },

  // 通用原則 (20條)
  {
    quote: '好文案是改出來的，不是寫出來的',
    explanation: '第一版永遠不是最好的。反覆修改、精煉，才能達到最佳效果。',
    category: 'general',
  },
  {
    quote: '誠實是最好的長期策略',
    explanation: '過度包裝會失去信任。真實的價值才能建立長久關係。',
    category: 'general',
  },
  {
    quote: '寫文案前先研究受眾',
    explanation: '不了解讀者就像閉眼射箭。知道他們是誰、要什麼、怕什麼。',
    category: 'general',
  },
  {
    quote: '少即是多',
    explanation: '能用10個字說清楚就不要用20個。精簡才有力量。',
    category: 'general',
  },
  {
    quote: '聲音要一致，建立品牌個性',
    explanation: '專業？親切？幽默？確定語調後要持續一致。',
    category: 'general',
  },
  {
    quote: '數據驅動優化',
    explanation: 'A/B 測試、點擊率、轉換率都會告訴您什麼有效。',
    category: 'general',
  },
  {
    quote: '模仿優秀案例，但不抄襲',
    explanation: '學習成功文案的結構和技巧，但要有自己的聲音。',
    category: 'general',
  },
  {
    quote: '寫完後大聲唸出來',
    explanation: '不順口的地方就是要修改的地方。文案要有節奏感。',
    category: 'general',
  },
  {
    quote: '換位思考：如果是您會買單嗎',
    explanation: '最誠實的測試就是問自己：這說服得了我嗎？',
    category: 'general',
  },
  {
    quote: '持續學習，文案沒有終點',
    explanation: '市場在變、受眾在變、平台在變。要保持學習和實驗。',
    category: 'general',
  },
  {
    quote: '截止期限是創意的朋友',
    explanation: '完成比完美重要。先發佈，再根據反饋優化。',
    category: 'general',
  },
  {
    quote: '建立素材庫',
    explanation: '收集好的標題、開頭、CTA。靈感來自積累。',
    category: 'general',
  },
  {
    quote: '每個字都要賺取它的位置',
    explanation: '刪掉裝飾性的形容詞和廢話。每個字都要有功能。',
    category: 'general',
  },
  {
    quote: '了解平台特性',
    explanation: 'Facebook、IG、LinkedIn 的文案風格各不相同。',
    category: 'general',
  },
  {
    quote: '永遠為行動做準備',
    explanation: '不只是好看的文字，要能驅動實際的業務結果。',
    category: 'general',
  },
  {
    quote: '與設計師合作',
    explanation: '好文案配上好設計才能發揮最大效果。',
    category: 'general',
  },
  {
    quote: '建立檢查清單',
    explanation: 'FAB 檢查了嗎？CTA 清楚嗎？錯字抓了嗎？',
    category: 'general',
  },
  {
    quote: '寫給一個人，而不是一群人',
    explanation: '「您」比「大家」更有親切感和針對性。',
    category: 'general',
  },
  {
    quote: '情境比產品重要',
    explanation: '賣的是使用後的美好生活，不是冰冷的產品。',
    category: 'general',
  },
  {
    quote: '定期回顧和反思',
    explanation: '什麼有效？什麼無效？每個案例都是學習機會。',
    category: 'general',
  },
]

/**
 * 隨機選取指定數量的文案心法
 */
export function getRandomWisdom(count: number = 4): CopywritingWisdom[] {
  const shuffled = [...COPYWRITING_WISDOM].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

/**
 * 根據分類選取文案心法
 */
export function getWisdomByCategory(
  category: CopywritingWisdom['category'],
  count: number = 4
): CopywritingWisdom[] {
  const filtered = COPYWRITING_WISDOM.filter(w => w.category === category)
  const shuffled = [...filtered].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, filtered.length))
}
