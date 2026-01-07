# PWA 圖示說明

PWA 需要以下圖示檔案，請放置在 `public/` 目錄下：

## 必要圖示

### 1. icon-192.png
- **尺寸**: 192x192 像素
- **格式**: PNG
- **用途**: Android 主畫面圖示、Chrome 瀏覽器安裝提示
- **建議內容**: Vista 文案健檢工具的 Logo 或代表圖示

### 2. icon-512.png
- **尺寸**: 512x512 像素
- **格式**: PNG
- **用途**: Android splash screen、應用程式商店展示
- **建議內容**: 與 192px 相同的設計，但更高解析度

## 設計建議

### 圖示內容建議
- 使用 Vista 品牌色：主色 #D4772B (橘色)
- 可以包含：
  - ✓ 文字「V」或「文案」
  - ✓ 健檢相關圖示（放大鏡、勾選記號）
  - ✓ 簡約設計，確保在小尺寸下清晰可辨

### 圖示設計規範
- **背景色**: 建議使用白色或品牌色
- **形狀**: 方形（系統會自動處理圓角）
- **安全區域**: 中心區域應包含主要內容，避免內容貼邊
- **對比度**: 確保圖示在淺色和深色背景下都清晰可見

## 線上工具推薦

### 生成 PWA 圖示
1. **Favicon.io** - https://favicon.io/
2. **PWA Builder** - https://www.pwabuilder.com/imageGenerator
3. **RealFaviconGenerator** - https://realfavicongenerator.net/

### 圖示設計工具
1. **Canva** - 簡單易用的線上設計工具
2. **Figma** - 專業設計工具
3. **Adobe Express** - Adobe 線上設計工具

## 快速產生圖示步驟

1. 使用 Canva 或其他工具設計一個 512x512 的圖示
2. 匯出為 PNG 格式
3. 使用 PWA Builder Image Generator 自動生成各種尺寸
4. 將 `icon-192.png` 和 `icon-512.png` 放到 `public/` 目錄
5. 重新部署應用程式

## 檔案位置

```
public/
├── icon-192.png  ← 需要新增
├── icon-512.png  ← 需要新增
├── manifest.json ✓ 已完成
└── favicon.svg   ✓ 已存在
```

## 驗證 PWA 設定

部署後，請使用以下工具驗證：

1. **Chrome DevTools**
   - 打開開發者工具 > Application > Manifest
   - 檢查圖示是否正確載入

2. **Lighthouse**
   - Chrome DevTools > Lighthouse
   - 執行 PWA 審核

3. **實機測試**
   - Android: Chrome 會自動顯示「加到主畫面」提示
   - iOS: Safari > 分享 > 加入主畫面

## 目前狀態

- ✅ manifest.json 已建立
- ✅ 已在 index.html 加入 manifest 連結
- ✅ 已設定 theme-color
- ⏳ 等待圖示檔案 (icon-192.png, icon-512.png)

圖示檔案建立後，PWA 功能將完全啟用！
