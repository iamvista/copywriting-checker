# Vista 文案健檢工具 - 知識庫說明

## 📁 目錄結構

```
knowledge-base/
├── articles/              # Vista Cheng 的原始教學資料（PDF）
│   ├── Vista Cheng 文案寫作完整資料.pdf
│   ├── Vista Cheng 文案寫作教學精華與方法論完整指南.pdf
│   ├── Vista_Cheng_文案寫作作品整理.pdf
│   └── Vista_Cheng_文案教學精華_公式大全.pdf
│
├── rules/                 # 評分規則（JSON格式）
│   ├── fab-rules.json                    # FAB 銷售法則規則
│   ├── title-rules.json                  # 標題吸引力規則
│   ├── cta-rules.json                    # 行動呼籲規則
│   ├── readability-rules.json            # 可讀性規則
│   └── value-proposition-rules.json      # 價值主張規則
│
└── templates/             # 改善建議模板
    └── suggestions.json                   # 各維度的改善建議模板
```

## 🎯 規則文件說明

### 1. FAB 銷售法則規則 (`fab-rules.json`)

**用途**：評估文案是否完整運用 Vista Cheng 最核心的 FAB 法則

**三大要素**：
- **F (Feature 特性)**：陳述產品的特色、規格、功能
- **A (Advantage 優勢)**：說明相較於競爭對手的優勢
- **B (Benefit 效益)**：強調對目標受眾的具體利益

**評分權重**：
- Feature: 25%
- Advantage: 35%
- Benefit: 40% （最重要！）

**關鍵檢測點**：
- 最常見錯誤：只停留在 F（特性）層面，沒有說明 B（效益）
- 核心原則：Features tell, but benefits sell

### 2. 標題吸引力規則 (`title-rules.json`)

**用途**：評估標題是否具備吸引讀者點擊的元素

**六大元素**：
1. **數據（數字）** - 權重 20%
   - 檢測模式：具體數字、百分比、時間
   - 範例：「3個步驟」、「提升200%」

2. **問題（疑問句）** - 權重 15%
   - 檢測模式：問號、為什麼、如何
   - 範例：「為什麼這5個方法能讓業績翻倍？」

3. **痛點關鍵字** - 權重 25%
   - 關鍵詞：避免、解決、不再、困擾
   - 範例：「解決文案寫不出來的困擾」

4. **好奇心觸發詞** - 權重 20%
   - 關鍵詞：秘訣、方法、原來、你不知道的
   - 範例：「很少人知道的文案技巧」

5. **情緒詞彙** - 權重 20%
   - 關鍵詞：驚人、必學、輕鬆、免費
   - 範例：「驚人的轉換率提升技巧」

6. **權威/名人** - 權重 15%
7. **緊迫感** - 權重 15%

### 3. 行動呼籲規則 (`cta-rules.json`)

**用途**：評估是否有效促使讀者採取行動

**核心三問**：
1. 我希望目標受眾做哪些事情？
2. 如何確保目標受眾知道自己該做什麼事？
3. 目標受眾為什麼要這樣做？可以得到什麼利益？

**六大元素**：
1. **明確指示** - 權重 40%（最重要）
   - 關鍵詞：立即、馬上、現在、報名、購買

2. **行動動詞** - 權重 20%
   - 關鍵詞：開始、體驗、領取、獲得

3. **急迫感** - 權重 20%
   - 關鍵詞：限時、限量、最後、倒數

4. **降低門檻** - 權重 20%
   - 關鍵詞：免費、一鍵、30秒、無需

5. **利益提醒** - 權重 15%（加分項）
6. **社會認同** - 權重 10%（加分項）

### 4. 可讀性規則 (`readability-rules.json`)

**用途**：評估文案的閱讀難易度

**五大標準**：
1. **句子長度** - 權重 25%
   - 理想：< 25字
   - 可接受：< 35字
   - 過長：> 35字

2. **段落結構** - 權重 25%
   - 理想：3-5行
   - 可接受：6-8行
   - 過長：> 8行

3. **標點符號使用** - 權重 20%
   - 逗點、冒號、驚嘆號、破折號
   - 注意：驚嘆號不宜過多（≤3個）

4. **專業術語** - 權重 15%
   - 最少：≤2個術語
   - 適中：≤5個術語
   - 過多：>5個術語

5. **留白與分段** - 權重 15%
   - 使用列表、小標題、空行

### 5. 價值主張規則 (`value-proposition-rules.json`)

**用途**：評估文案是否清楚傳達產品/服務的價值

**四大核心**：
1. **清楚說明能得到什麼** - 權重 30%
   - 關鍵詞：讓你、幫你、獲得、節省、提升

2. **具體數字或證據** - 權重 25%
   - 數字：提升40%、節省3小時
   - 時間框架：30天內、3週見效
   - 社會證明：200位學員見證

3. **差異化表達** - 權重 25%
   - 關鍵詞：獨家、唯一、首創、業界第一

4. **可信度支持** - 權重 20%
   - 客戶見證、認證、媒體報導、專家推薦

**價值主張公式**：
```
[目標受眾] + [痛點] + [解決方案] + [具體成果] + [差異化]
```

## 💡 改善建議模板 (`suggestions.json`)

**用途**：根據分析結果提供具體、可執行的改善建議

**五大維度的建議模板**：

### 標題吸引力
- 加入數字：「{original}」→「{count}個方法{topic}」
- 改為問句：「{original}」→「如何{action}？」
- 加入痛點：使用「避免」、「解決」、「不再」

### 消費者洞察
- 明確受眾：「為{target_audience}量身打造」
- 痛點情境：「身為{role}，你是否常常{pain_point}？」
- 同理心：「我懂」、「也曾經」

### 行動呼籲
- 明確指示：「立即{action}」
- 加入急迫：「限時{timeframe}」、「僅剩{quantity}」
- 降低門檻：「免費試用」、「30秒完成」
- 重申好處：「立即{action}，{benefit}」

### 可讀性
- 縮短句子：每句≤25字
- 適當分段：每段3-5行
- 簡化術語：加上白話文解釋
- 使用列表：讓內容更易讀

### 價值主張
- 具體好處：「讓你{benefit}」
- 加入數字：「提升{percentage}%」、「{timeframe}內見效」
- 差異化：「業界唯一」、「獨家」
- 社會證明：「{number}位學員見證」

## 📊 評分等級對照

所有規則文件都採用統一的四級評分：

| 等級 | 分數範圍 | 標籤 | 說明 |
|------|---------|------|------|
| 🏆 優秀 | 80-100 | excellent | 文案品質卓越，可直接使用 |
| 👍 良好 | 60-79 | good | 文案基礎紮實，稍作調整更佳 |
| ⚠️ 待改進 | 40-59 | fair | 有明顯改善空間 |
| 🚨 需重寫 | 0-39 | poor | 建議參考範例重新撰寫 |

## 🔧 使用方式

### 在 TypeScript 中引用

```typescript
import fabRules from './knowledge-base/rules/fab-rules.json';
import titleRules from './knowledge-base/rules/title-rules.json';
import ctaRules from './knowledge-base/rules/cta-rules.json';
import readabilityRules from './knowledge-base/rules/readability-rules.json';
import valueRules from './knowledge-base/rules/value-proposition-rules.json';
import suggestions from './knowledge-base/templates/suggestions.json';

// 使用範例
function analyzeFAB(text: string) {
  const keywords = fabRules.rules.benefit.keywords;
  // ... 分析邏輯
}
```

### 在分析引擎中應用

```typescript
// 1. 載入規則
const rules = {
  fab: require('./knowledge-base/rules/fab-rules.json'),
  title: require('./knowledge-base/rules/title-rules.json'),
  // ... 其他規則
};

// 2. 執行分析
function analyze(text: string) {
  const scores = {
    fabScore: analyzeFAB(text, rules.fab),
    titleScore: analyzeTitle(text, rules.title),
    // ... 其他維度
  };

  // 3. 生成建議
  const suggestions = generateSuggestions(scores);

  return { scores, suggestions };
}
```

## 📚 相關文檔

- [產品規格書](../docs/product-spec.md) - 完整的產品功能規格
- [Vista 評分標準](./vista-scoring-standards.md) - Vista 的評分標準詳細說明

## 🔄 版本歷史

- **v1.0** (2026-01-03) - 初始版本
  - 建立5個規則JSON文件
  - 建立改善建議模板
  - 完整整合 Vista Cheng 的文案寫作方法論

## 📝 備註

- 所有規則和建議都是基於 Vista Cheng 的著作和教學內容
- 關鍵字和模式會根據實際使用情況持續優化
- 歡迎根據數據分析結果調整權重和閾值
