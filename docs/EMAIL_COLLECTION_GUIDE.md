# Email 收集系統使用指南

## 📧 如何查看收集到的 Email？

### 方法 1：透過管理後台（推薦）

1. 訪問管理後台：**https://copywriting.vista.tw/admin**
2. 輸入管理密碼：`vista2026`（請修改為您自己的密碼）
3. 即可看到所有收集到的 Email 列表

### 管理後台功能

- **📋 複製列表**：快速複製所有 Email 地址（用換行分隔）
- **📥 匯出 CSV**：下載完整資料表格，可用 Excel 或 Google Sheets 開啟
- **🗑️ 清除全部**：清除所有記錄（謹慎使用！）

### 匯出的 CSV 包含以下欄位：

| 欄位 | 說明 | 範例 |
|------|------|------|
| Email | 使用者的 Email 地址 | user@example.com |
| 來源 | 收集來源 | exit_intent / pdf_download |
| 分數 | 使用者的文案分數 | 75 |
| 時間 | 提交時間 | 2026/01/07 下午3:45:00 |

---

## 🎁 如何設定 PDF 下載連結？

### 步驟 1：上傳您的 PDF 到雲端

建議使用以下雲端服務：

1. **Google Drive**（推薦）
   - 上傳 PDF
   - 右鍵 → 取得連結
   - 設定為「知道連結的任何人」
   - 複製共享連結

2. **Dropbox**
   - 上傳 PDF
   - 建立共享連結
   - 確保設定為公開

3. **其他選擇**
   - OneDrive
   - iCloud Drive
   - 自己的網站伺服器

### 步驟 2：修改設定檔

編輯檔案：`src/config/downloads.ts`

```typescript
export const DOWNLOAD_LINKS = {
  // Exit Intent 贈品：Vista 文案黃金公式檢查表 PDF
  EXIT_INTENT_PDF: 'https://drive.google.com/file/d/YOUR_FILE_ID/view',

  // PDF 下載贈品：完整分析報告 + 改寫範例
  FULL_REPORT_PDF: 'https://drive.google.com/file/d/YOUR_FILE_ID/view',

  // 其他資源
  WEEKLY_TIPS_SUBSCRIBE: 'https://iamvista.substack.com/',
}
```

### Google Drive 連結格式

原始連結：
```
https://drive.google.com/file/d/1ABC123XYZ/view?usp=sharing
```

使用連結（保留到 /view 即可）：
```
https://drive.google.com/file/d/1ABC123XYZ/view
```

---

## 🔄 Email 收集流程

### 使用者體驗流程

1. **觸發條件**
   - Exit Intent：使用者準備離開頁面時
   - PDF 下載：點擊下載 PDF 按鈕時（可擴展）
   - 分析完成：分析完成後（可擴展）

2. **填寫 Email**
   - 使用者輸入 Email 地址
   - 系統驗證 Email 格式
   - 顯示贈品說明

3. **成功畫面**
   - ✅ 顯示感謝訊息
   - 📥 提供 PDF 下載按鈕
   - 📧 說明後續會收到的內容

4. **後端記錄**
   - Email 儲存到 localStorage
   - 記錄來源、分數、時間
   - 觸發 Meta Pixel Lead 事件

---

## 📊 資料儲存位置

### 目前方案：瀏覽器 localStorage

**優點：**
- 無需後端伺服器
- 即時查看
- 零成本

**缺點：**
- 僅儲存在單一瀏覽器
- 清除瀏覽器資料會遺失
- 無法多人協作查看

**建議：定期匯出 CSV 備份到 Google Sheets**

---

## 🚀 升級到雲端資料庫（進階）

### 方案 1：Google Sheets API（推薦）

**優點：**
- 免費
- 自動同步到 Google Sheets
- 可多人查看
- 方便分析與分群

**實作步驟：**
1. 建立 Google Cloud 專案
2. 啟用 Google Sheets API
3. 取得 API 金鑰
4. 修改 `EmailCollector.tsx` 的 `handleSubmit`
5. 將資料 POST 到 Google Sheets

**範例程式碼：**
```typescript
// 在 handleSubmit 中加入
await fetch('/api/save-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(emailData),
})
```

### 方案 2：Mailchimp / ConvertKit（推薦用於 Email 行銷）

**優點：**
- 自動加入郵件列表
- 支援自動發送歡迎信
- 內建 Email 行銷功能
- 可根據標籤分群

**Mailchimp 整合步驟：**
1. 註冊 Mailchimp 帳號
2. 建立 Audience（受眾列表）
3. 取得 API Key
4. 使用 Mailchimp API 加入訂閱者

**範例：**
```typescript
await fetch('https://us1.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email_address: email,
    status: 'subscribed',
    tags: [trigger, `score_${score}`],
  }),
})
```

### 方案 3：Airtable（視覺化資料庫）

**優點：**
- 視覺化介面
- 類似 Excel 但雲端同步
- 支援自動化工作流程（Zapier 整合）

---

## 🎯 分群策略建議

根據收集到的資料，可以進行精準分群：

### 按分數分群

| 分數範圍 | 標籤 | 推薦內容 |
|---------|------|----------|
| 0-34 | 新手 | 免費基礎課程、入門指南 |
| 35-59 | 進階 | 付費課程、實戰案例 |
| 60-79 | 專業 | 寫作陪伴計畫、1對1諮詢 |
| 80-100 | 專家 | 合作機會、講師邀請 |

### 按來源分群

| 來源 | 意圖 | 後續策略 |
|------|------|----------|
| exit_intent | 猶豫離開 | 提供價值內容建立信任 |
| pdf_download | 想深入了解 | 提供進階資源與課程 |
| analysis_complete | 已完成分析 | 根據分數推薦適合產品 |

---

## 📝 修改管理密碼

編輯檔案：`src/pages/Admin.tsx`

找到第 12 行：
```typescript
const ADMIN_PASSWORD = 'vista2026' // 請修改為您自己的密碼
```

改為您想要的密碼，例如：
```typescript
const ADMIN_PASSWORD = 'my_secure_password_2026'
```

**安全建議：**
- 使用複雜密碼（字母+數字+符號）
- 不要使用常見密碼
- 定期更換密碼
- 未來建議升級到後端驗證

---

## 🔧 常見問題

### Q1：為什麼看不到收集的 Email？

**A：** 可能原因：
1. 使用不同瀏覽器（localStorage 是瀏覽器獨立的）
2. 清除了瀏覽器資料
3. 使用無痕模式

**解決方案：** 建議定期匯出 CSV 備份

### Q2：如何測試 Email 收集功能？

**A：**
1. 開啟首頁
2. 等待 5 秒
3. 將滑鼠快速移出視窗頂部
4. 應該會看到 Email 收集彈窗
5. 填寫測試 Email
6. 前往 `/admin` 查看是否記錄成功

### Q3：PDF 下載連結無效怎麼辦？

**A：** 檢查事項：
1. Google Drive 連結是否設定為「公開」
2. 連結格式是否正確（需包含 /view）
3. 檔案是否存在

### Q4：可以整合到 CRM 系統嗎？

**A：** 可以！您可以：
1. 修改 `EmailCollector.tsx` 的 `handleSubmit`
2. 加入 API 呼叫，將資料發送到您的 CRM
3. 使用 Zapier 自動化（從 Google Sheets 同步到 CRM）

---

## 📞 需要協助？

如果您在設定過程中遇到問題，歡迎：

1. 查看程式碼註解
2. 參考本文檔
3. 聯繫技術支援

---

**最後更新：** 2026/01/07
**版本：** 1.0.0
