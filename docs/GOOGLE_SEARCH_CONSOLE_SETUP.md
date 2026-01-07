# Google Search Console 設定指引

Google Search Console（GSC）是 Google 提供的免費工具，可協助您監控、維護網站在 Google 搜尋結果中的排名表現。

## 為什麼需要 Google Search Console？

透過 GSC，您可以：

✅ **監控搜尋表現**
- 查看網站在哪些關鍵字獲得曝光
- 追蹤點擊率（CTR）與排名變化
- 了解使用者如何找到你的網站

✅ **發現問題**
- 檢測索引問題
- 找出 404 錯誤頁面
- 偵測行動裝置可用性問題

✅ **提交內容**
- 加速新頁面被 Google 索引
- 提交 Sitemap 讓 Google 更容易爬取

✅ **優化 SEO**
- 了解搜尋查詢數據
- 改善網站在搜尋結果的表現

---

## 設定步驟

### 步驟 1：登入 Google Search Console

1. 前往 [Google Search Console](https://search.google.com/search-console/)
2. 使用您的 Google 帳號登入
3. 點擊「新增資源」

### 步驟 2：選擇資源類型

Google Search Console 提供兩種資源類型：

#### 選項 A：網域（Domain）- **建議使用**
- 涵蓋所有子網域（www、app 等）
- 涵蓋所有協定（HTTP、HTTPS）
- **需要 DNS 驗證**

#### 選項 B：網址前置字元（URL Prefix）
- 僅驗證特定 URL
- 多種驗證方式可選
- **較簡單，適合初學者**

**本指引以「網址前置字元」為例**

### 步驟 3：輸入網站 URL

輸入您的網站完整 URL：
```
https://copywriting-checker.vercel.app/
```

或如果使用自訂網域：
```
https://copywriting.vista.tw/
```

點擊「繼續」

### 步驟 4：驗證網站所有權

Google 提供多種驗證方式，選擇最適合您的：

#### 方法 1：HTML 檔案上傳（推薦）

1. 下載 Google 提供的 HTML 驗證檔案（例如：`google1234567890abcdef.html`）
2. 將檔案上傳到 `public/` 目錄
3. 確認可以透過瀏覽器訪問：
   ```
   https://copywriting-checker.vercel.app/google1234567890abcdef.html
   ```
4. 回到 Search Console 點擊「驗證」

#### 方法 2：HTML 標籤（推薦）

1. 複製 Google 提供的 meta 標籤，例如：
   ```html
   <meta name="google-site-verification" content="your_verification_code" />
   ```

2. 將標籤加入 `index.html` 的 `<head>` 區段：
   ```html
   <head>
     <meta charset="UTF-8" />
     <meta name="google-site-verification" content="your_verification_code" />
     <!-- 其他 meta 標籤 -->
   </head>
   ```

3. 部署更新後的網站

4. 回到 Search Console 點擊「驗證」

#### 方法 3：Google Analytics

如果您已經設定 Google Analytics（本專案已設定 GA4）：
1. 確認 GA4 追蹤碼在網站上運作
2. 在 Search Console 選擇「Google Analytics」驗證方式
3. Google 會自動偵測並驗證

#### 方法 4：Google 代碼管理工具（GTM）

如果使用 Google Tag Manager：
1. 確認 GTM 容器已安裝在網站上
2. 選擇「Google 代碼管理工具」驗證方式
3. Google 會自動驗證

#### 方法 5：DNS 記錄（僅限網域驗證）

如果使用網域驗證：
1. 複製 Google 提供的 TXT 記錄
2. 登入您的網域註冊商（如 GoDaddy、Namecheap、Cloudflare）
3. 在 DNS 設定中新增 TXT 記錄
4. 等待 DNS 生效（最多 48 小時）
5. 回到 Search Console 驗證

---

## 驗證完成後的設定

### 1. 提交 Sitemap

Sitemap 幫助 Google 更有效地爬取您的網站。

**步驟：**
1. 在 Search Console 左側選單點擊「Sitemap」
2. 輸入 Sitemap URL：
   ```
   https://copywriting-checker.vercel.app/sitemap.xml
   ```
3. 點擊「提交」

**確認成功：**
- 狀態顯示為「成功」
- 可以看到已發現的頁面數量

### 2. 檢查網址索引狀態

**步驟：**
1. 點擊「網址審查」（頂部搜尋欄）
2. 輸入要檢查的 URL
3. 查看索引狀態

**如果尚未索引：**
- 點擊「要求建立索引」
- Google 會優先爬取該頁面

### 3. 設定偏好網域（如適用）

如果同時擁有 www 和非 www 版本：
1. 兩個版本都加入 Search Console
2. 選擇偏好的網域版本
3. 設定 301 重新導向（在 Vercel 設定）

### 4. 檢查行動裝置可用性

**步驟：**
1. 左側選單點擊「行動裝置可用性」
2. 查看是否有錯誤
3. 修正任何問題（例如：文字太小、元素太接近）

**本專案已使用 Tailwind CSS 響應式設計，通常不會有問題**

### 5. 設定電子郵件通知

**步驟：**
1. 點擊右上角齒輪圖示「設定」
2. 選擇「使用者和權限」
3. 確認您的 Email 已啟用通知
4. Google 會在發現重大問題時通知您

---

## 監控與分析

### 成效報告

**位置：** Search Console > 成效

**可查看指標：**
- **曝光次數**：網站在搜尋結果中顯示的次數
- **點擊次數**：使用者點擊連結的次數
- **平均點閱率（CTR）**：點擊次數 ÷ 曝光次數
- **平均排名**：網站在搜尋結果的平均位置

**分析技巧：**
1. 篩選「查詢」：查看哪些關鍵字帶來流量
2. 篩選「網頁」：了解哪些頁面表現最好
3. 比較時間區間：追蹤進步情況

### 涵蓋範圍報告

**位置：** Search Console > 涵蓋範圍

**檢查項目：**
- **有效頁面**：已成功索引的頁面數量
- **錯誤**：無法索引的頁面（需修正）
- **有效但有警告**：已索引但有潛在問題
- **排除**：刻意不索引的頁面

**常見錯誤處理：**
- **404 Not Found**：移除已刪除頁面的連結
- **伺服器錯誤（5xx）**：檢查網站狀態
- **重新導向錯誤**：修正 vercel.json 設定

### 體驗報告

**核心網頁指標（Core Web Vitals）**
- **LCP**（Largest Contentful Paint）：載入效能
- **FID**（First Input Delay）：互動性
- **CLS**（Cumulative Layout Shift）：視覺穩定性

**目標：**
- LCP < 2.5 秒
- FID < 100 毫秒
- CLS < 0.1

---

## 最佳實踐

### 定期檢查（建議頻率）

| 項目 | 頻率 | 重點 |
|------|------|------|
| 成效報告 | 每週 | 關鍵字排名、CTR 變化 |
| 涵蓋範圍 | 每月 | 索引錯誤、新頁面狀態 |
| 行動可用性 | 每季 | 響應式問題 |
| 核心網頁指標 | 每月 | 載入速度、使用者體驗 |

### SEO 優化建議

基於 Search Console 數據優化：

1. **低 CTR 高曝光頁面**
   - 優化標題（title）與描述（description）
   - 加入更吸引人的文案

2. **排名 11-20 的關鍵字**
   - 這些最有機會衝到第一頁
   - 優化內容、增加相關資訊

3. **高跳出率頁面**
   - 改善內容品質
   - 確保符合使用者搜尋意圖

### 常見 Q&A

**Q: 為什麼我的網站還沒出現在 Google 搜尋？**
A: 新網站需要時間被索引，通常 1-4 週。可以透過「要求建立索引」加速。

**Q: Sitemap 提交後狀態一直顯示「待處理」？**
A: 正常現象，Google 需要時間處理。通常 24-48 小時內會更新。

**Q: 為什麼有些頁面被排除？**
A: 可能原因：
- robots.txt 禁止爬取
- noindex 標籤
- 重複內容
- 低品質內容

**Q: 涵蓋範圍顯示錯誤怎麼辦？**
A:
1. 點擊錯誤查看詳細資訊
2. 根據建議修正
3. 點擊「驗證修正」
4. 等待 Google 重新爬取

---

## 快速檢查清單

部署後 24 小時內：
- [ ] 完成 Search Console 驗證
- [ ] 提交 Sitemap
- [ ] 要求索引首頁

部署後 1 週：
- [ ] 檢查涵蓋範圍報告
- [ ] 確認主要頁面已索引
- [ ] 查看是否有錯誤需修正

部署後 1 個月：
- [ ] 分析成效報告
- [ ] 查看主要關鍵字排名
- [ ] 優化 CTR 較低的頁面
- [ ] 檢查核心網頁指標

---

## 進階設定（選擇性）

### 結構化資料

如果未來想加入結構化資料（Rich Snippets）：
1. 使用 JSON-LD 格式
2. 在 Search Console 使用「結構化資料測試工具」驗證
3. 可獲得更豐富的搜尋結果呈現

### 國際化設定

如果未來支援多語言：
1. 使用 hreflang 標籤
2. 在 Search Console 設定目標國家/地區

### 連結報告

追蹤反向連結：
1. 查看哪些網站連結到您
2. 了解最常被連結的內容
3. 發現垃圾連結並拒絕（如需要）

---

## 有用的資源

- [Google Search Console 官方說明](https://support.google.com/webmasters/)
- [Google 搜尋中心](https://developers.google.com/search)
- [SEO 入門指南](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [結構化資料標記協助工具](https://www.google.com/webmasters/markup-helper/)

---

## 疑難排解

遇到問題？請檢查：
1. 網站是否正常運作（無 5xx 錯誤）
2. robots.txt 是否正確設定
3. Sitemap.xml 是否可訪問
4. 是否有 noindex 標籤阻擋索引

仍無法解決？歡迎來信：iamvista@gmail.com

---

最後更新：2026 年 1 月 7 日

祝您的網站在 Google 搜尋中表現優異！ 🚀
