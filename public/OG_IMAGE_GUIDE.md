# OG 分享圖設計指引

Open Graph（OG）分享圖是當用戶在社群媒體（Facebook、LINE、Twitter 等）分享網站連結時顯示的預覽圖片。

## 圖片規格

### 尺寸要求
- **建議尺寸**: 1200 x 630 像素
- **最小尺寸**: 600 x 315 像素
- **比例**: 1.91:1 (接近 16:9)
- **檔案格式**: JPG 或 PNG
- **檔案大小**: 建議 < 5MB，最佳 < 300KB

### 檔案命名與位置
```
public/
└── og-image.jpg  或  og-image.png
```

## 設計建議

### 必要元素

1. **工具名稱**
   - "Vista 文案健檢工具"
   - 使用清晰易讀的字體
   - 字體大小建議 60-80px

2. **核心價值主張**
   - "30秒檢測文案吸引力"
   - "6大維度專業評分"
   - "即時獲得改善建議"

3. **Vista 品牌識別**
   - 使用品牌色：#D4772B（橘色）
   - 可加入 Vista Logo 或頭像
   - 展現專業形象

4. **視覺元素**
   - 文案相關圖示（📝、✍️、💡）
   - 評分相關圖示（⭐、✓、📊）
   - 簡約背景設計

### 設計原則

#### 文字可讀性
- 主標題：大且清晰（建議 60-80px）
- 副標題：適中大小（建議 32-48px）
- 高對比度：深色文字 + 淺色背景 或相反
- 安全區域：避免文字靠近邊緣（留白至少 60px）

#### 配色建議
```
主色調：#D4772B（品牌橘色）
輔助色：
- 背景：#FFFFFF（白色）或 #F5F1EB（米色）
- 文字：#2D2A26（深灰）
- 強調：#B8651F（深橘）
```

#### 視覺層次
1. **第一視覺焦點**：工具名稱
2. **第二視覺焦點**：核心價值（30秒檢測）
3. **第三視覺焦點**：品牌識別（Vista）

## 設計範本建議

### 方案 1：簡約專業風格
```
背景：純白色
---------------------------------------
|                                     |
|        📝 Vista 文案健檢工具         |
|                                     |
|      30秒檢測你的文案吸引力          |
|                                     |
|    ✓ FAB 法則分析                   |
|    ✓ 6大維度評分                    |
|    ✓ 即時改善建議                   |
|                                     |
|           由 Vista Cheng 設計        |
---------------------------------------
```

### 方案 2：數據視覺化風格
```
背景：淺米色漸層
---------------------------------------
|  📊                                 |
|  Vista 文案健檢工具                  |
|                                     |
|  [顯示分數圖表示意圖]                |
|                                     |
|  30秒獲得專業評分 | 免費使用         |
---------------------------------------
```

### 方案 3：問題導向風格
```
背景：品牌橘色漸層
---------------------------------------
|                                     |
|    你的文案夠吸引人嗎？               |
|                                     |
|    Vista 文案健檢工具                |
|    30秒告訴你答案                    |
|                                     |
|    6大維度專業評分 | 立即使用         |
---------------------------------------
```

## 線上設計工具推薦

### 1. Canva（推薦新手）
- 網址：https://www.canva.com/
- 優點：模板豐富、操作簡單、有免費版
- 步驟：
  1. 搜尋 "Facebook Post" 或直接選擇 1200x630 尺寸
  2. 套用模板或從空白開始
  3. 加入文字、圖示、品牌色
  4. 下載為 JPG 或 PNG

### 2. Figma（推薦設計師）
- 網址：https://www.figma.com/
- 優點：專業設計工具、完全免費、協作方便
- 適合：需要精確控制設計的進階使用者

### 3. Adobe Express
- 網址：https://www.adobe.com/express/
- 優點：Adobe 品質、免費版功能完整
- 適合：熟悉 Adobe 產品的使用者

### 4. Photopea（線上 Photoshop）
- 網址：https://www.photopea.com/
- 優點：功能完整、無需註冊
- 適合：熟悉 Photoshop 的使用者

## 文字內容建議

### 主標題選項
1. "Vista 文案健檢工具"
2. "你的文案夠吸引人嗎？"
3. "30秒檢測文案品質"
4. "專業文案評分系統"

### 副標題/說明文字選項
1. "6大維度專業評分，即時改善建議"
2. "基於 Vista 20年實戰經驗設計"
3. "免費使用，無需註冊"
4. "已幫助 500+ 人優化文案"

### CTA 文字選項
1. "立即免費使用"
2. "開始檢測"
3. "免費分析"

## 設計完成後的檢查清單

- [ ] 圖片尺寸為 1200 x 630 像素
- [ ] 檔案大小 < 300KB（最佳）或 < 5MB
- [ ] 文字在各種裝置上都清晰可讀
- [ ] 包含工具名稱「Vista 文案健檢工具」
- [ ] 使用品牌色 #D4772B
- [ ] 所有文字都有足夠的對比度
- [ ] 檔案命名為 `og-image.jpg` 或 `og-image.png`
- [ ] 放置在 `public/` 目錄下

## 更新 index.html

完成設計後，確認 `index.html` 中的 OG 標籤指向正確的圖片：

```html
<!-- Open Graph / Facebook -->
<meta property="og:image" content="https://copywriting-checker.vercel.app/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter Card -->
<meta name="twitter:image" content="https://copywriting-checker.vercel.app/og-image.jpg" />
```

**注意**：將 URL 中的 `copywriting-checker.vercel.app` 替換為實際的網域名稱（如 `copywriting.vista.tw`）。

## 測試 OG 圖片

### 部署後測試工具

1. **Facebook Sharing Debugger**
   - 網址：https://developers.facebook.com/tools/debug/
   - 輸入網站 URL，檢查 OG 圖片是否正確顯示
   - 可以重新抓取快取

2. **Twitter Card Validator**
   - 網址：https://cards-dev.twitter.com/validator
   - 測試 Twitter 分享時的圖片顯示

3. **LinkedIn Post Inspector**
   - 網址：https://www.linkedin.com/post-inspector/
   - 測試 LinkedIn 分享效果

4. **Social Share Preview**
   - 網址：https://socialsharepreview.com/
   - 一次預覽所有社群平台的分享效果

## 快速啟動建議

如果時間有限，建議優先使用 **Canva**：

1. 前往 Canva.com
2. 搜尋 "Facebook Post" 範本
3. 選擇簡約專業的範本
4. 修改文字：
   - 主標題："Vista 文案健檢工具"
   - 副標題："30秒檢測文案吸引力 | 6大維度專業評分"
   - 底部："免費使用 | vista.tw"
5. 調整配色為品牌色 #D4772B
6. 下載為 JPG（1200x630）
7. 重新命名為 `og-image.jpg`
8. 放到 `public/` 目錄

## 目前狀態

- ✅ index.html 已有 OG 標籤設定
- ⏳ 等待 OG 圖片檔案（`public/og-image.jpg`）

圖片設計完成後，部署並使用上述測試工具驗證！
