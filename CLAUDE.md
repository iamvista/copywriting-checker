# Vista 文案健檢工具 (Copywriting Checker)

## Project Overview
一個專為企業顧問、講師 Vista 鄭緯筌設計的文案分析工具，協助學員和客戶自我檢視文案品質，提供基於專業框架的即時回饋和改善建議。

## Target Users
- 企業內容行銷人員
- Vista 課程學員
- 中小企業主
- 自媒體創作者

## Core Value Proposition
將 Vista 的文案寫作與內容行銷專業知識系統化、工具化，提供：
- 即時文案健檢與評分
- 具體改善建議
- 可作為課程引流工具和教學輔助

## Tech Stack
- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useContext)
- **AI Integration**: Claude API (Anthropic)
- **Deployment**: Vercel
- **Version Control**: Git

## Project Structure
```
copywriting-checker/
├── src/
│   ├── components/        # React components
│   │   ├── analyzer/      # 文案分析相關組件
│   │   ├── common/        # 共用組件 (Button, Card, etc.)
│   │   └── layout/        # 版面配置組件
│   ├── services/          # API 服務層
│   │   └── analyzer.ts    # 文案分析 API
│   ├── types/             # TypeScript 類型定義
│   ├── utils/             # 工具函數
│   ├── hooks/             # Custom React Hooks
│   └── styles/            # 全局樣式
├── public/                # 靜態資源
└── docs/                  # 專案文檔
```

## Coding Standards

### TypeScript
- 嚴格模式啟用 (`strict: true`)
- 所有 exported 函數必須有明確的型別定義
- 優先使用 interface 而非 type (除非需要 union types)
- 避免使用 `any`，必要時使用 `unknown`

### React
- 使用 Functional Components + Hooks
- 組件名稱使用 PascalCase
- Props interface 命名格式：`{ComponentName}Props`
- 一個檔案一個組件 (輔助型組件可例外)
- 優先使用組合 (composition) 而非繼承

### Styling
- 使用 Tailwind CSS utility classes
- 複雜樣式可使用 @apply 整合
- 響應式設計：mobile-first approach
- 色彩系統遵循品牌色調 (專業、清晰、信任感)

### Code Formatting
- 使用 2 空格縮進
- 使用單引號 (') 而非雙引號 (")
- 自動格式化：Prettier
- Linting：ESLint

### File Naming
- Components: `PascalCase.tsx` (e.g., `AnalyzerPanel.tsx`)
- Utilities: `camelCase.ts` (e.g., `textAnalysis.ts`)
- Types: `camelCase.types.ts` (e.g., `analyzer.types.ts`)
- Hooks: `use{HookName}.ts` (e.g., `useAnalyzer.ts`)

## Component Guidelines

### 組件結構範本
```typescript
import { FC } from 'react'

interface ComponentNameProps {
  // Props definition
}

export const ComponentName: FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  // Hooks
  // Event handlers
  // Render logic

  return (
    <div className="...">
      {/* JSX */}
    </div>
  )
}
```

### Props 設計原則
- 保持 props 最小化和明確
- 使用 destructuring 取得 props
- 為可選 props 提供預設值
- 複雜的 props 使用 interface 定義

## Feature Development Workflow

### MVP Phase (2-3 weeks)
1. **Week 1**: 專案設定 + 基礎 UI 框架
   - Vite + React + TypeScript 環境
   - Tailwind CSS 整合
   - 基本版面配置

2. **Week 2**: 核心分析功能
   - 文案輸入介面
   - 分析引擎 (規則式 + AI 輔助)
   - 評分系統

3. **Week 3**: 報告與優化
   - 分析報告呈現
   - 改善建議產生
   - UI/UX 優化

### Analysis Dimensions (分析維度)
基於 Vista 的教學框架，工具將分析以下面向：

1. **標題吸引力** (Title Appeal)
   - 數字使用
   - 疑問句
   - 痛點關鍵字
   - 好奇心觸發

2. **消費者洞察** (Consumer Insight)
   - 痛點呼應
   - 情緒連結
   - 目標受眾定位

3. **行動呼籲** (Call-to-Action)
   - CTA 明確性
   - 急迫性營造
   - 下一步指引

4. **可讀性** (Readability)
   - 句子長度
   - 段落結構
   - 專業術語使用

5. **價值主張** (Value Proposition)
   - 利益陳述清晰度
   - 差異化表達
   - 證據支持

## Git Workflow
- **Branch Naming**:
  - `feature/feature-name` - 新功能
  - `fix/bug-description` - Bug 修復
  - `docs/documentation-update` - 文檔更新

- **Commit Message Format**:
  ```
  <type>: <description>

  [optional body]
  ```
  Types: feat, fix, docs, style, refactor, test, chore

- **Development Flow**:
  1. Create feature branch from `main`
  2. Develop and commit
  3. Test locally
  4. Merge to `main` (small project, no PR needed initially)

## Environment Setup

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Common Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npm run type-check
```

## API Integration

### Claude API (Anthropic)
- Used for advanced text analysis
- Endpoint: `https://api.anthropic.com/v1/messages`
- Model: `claude-3-haiku-20240307` (fast, cost-effective for MVP)
- Rate limiting: Handle gracefully with user feedback

### Environment Variables
```
VITE_CLAUDE_API_KEY=your_api_key_here
```

## Design Principles

### UI/UX
- **簡潔優先**: 避免複雜的介面，讓使用者專注於文案本身
- **即時回饋**: 分析結果即時呈現
- **教育性**: 不只給分數，更要解釋「為什麼」
- **行動導向**: 每個分析結果都要有具體改善建議

### Brand Tone
- 專業但親切
- 教練式引導而非批判
- 數據支持的建議
- 鼓勵持續改進

## Performance Goals
- Time to Interactive: < 3 seconds
- Lighthouse Score: > 90
- Analysis Time: < 5 seconds (with AI)
- Mobile-friendly: 完整功能支援

## Security & Privacy
- 不儲存使用者的文案內容 (除非使用者同意)
- API key 安全儲存
- HTTPS only
- 符合 GDPR (如適用)

## Future Enhancements (Post-MVP)
- [ ] 文案範本庫
- [ ] 歷史記錄與進步追蹤
- [ ] 產業別分析模板
- [ ] PDF 報告匯出
- [ ] 團隊協作功能
- [ ] A/B 測試建議
- [ ] 競品文案比較

## Known Constraints
- MVP 階段不支援圖片/影片文案分析
- 初期僅支援繁體中文文案
- AI 分析需要網路連線

## Success Metrics (MVP)
- 30 位測試用戶使用
- 平均分析時間 < 10 秒
- 使用者滿意度 > 4/5
- 工具完成率 > 70% (開始分析後完成的比例)

## Contact & Ownership
- **Project Owner**: Vista Cheng (鄭緯筌)
- **Website**: https://www.empower.tw
- **Purpose**: 教學工具 + 潛在客戶引流
