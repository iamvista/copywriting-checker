# Vista 文案健檢工具

一個專為企業顧問、講師 Vista 鄭緯筌設計的文案分析工具。

## 功能特色

- 📝 **六大維度分析**：FAB 法則、標題吸引力、消費者洞察、行動呼籲、可讀性、價值主張
- 🎯 **即時回饋**：基於專業框架的即時分析與評分
- 💡 **具體建議**：不只給分數，更提供可執行的改善建議
- ⚡ **快速高效**：30 秒內完成分析

## 快速開始

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

在瀏覽器中打開 `http://localhost:5173`

### 建構生產版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

## 技術棧

- React 18
- TypeScript
- Vite
- Tailwind CSS

## 專案結構

```
src/
├── components/        # React 組件
│   ├── analyzer/      # 文案分析相關組件
│   ├── common/        # 共用組件
│   └── layout/        # 版面配置組件
├── services/          # API 服務層
├── types/             # TypeScript 類型定義
├── utils/             # 工具函數
├── hooks/             # Custom React Hooks
└── styles/            # 全局樣式
```

## 開發指南

詳見 `CLAUDE.md` 和 `docs/product-spec.md`

## License

Private - Vista Cheng © 2026
