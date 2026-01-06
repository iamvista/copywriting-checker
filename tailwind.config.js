/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 現代專業配色方案 - 深邃有力
        primary: {
          DEFAULT: '#3b82f6', // 明亮藍（專業、清晰）
          light: '#60a5fa',
          dark: '#2563eb',
        },
        success: {
          DEFAULT: '#059669', // 深翠綠（成功、正面）
          light: '#10b981',
          dark: '#047857',
          bg: '#d1fae5', // 淺綠背景
        },
        warning: {
          DEFAULT: '#f59e0b', // 琥珀金（警示、注意）
          light: '#fbbf24',
          dark: '#d97706',
          bg: '#fef3c7', // 淺黃背景
        },
        info: {
          DEFAULT: '#3b82f6', // 清晰藍（資訊）
          light: '#60a5fa',
          dark: '#2563eb',
          bg: '#dbeafe', // 淺藍背景
        },
        accent: {
          bronze: '#f59e0b', // 金色（重點）
          coral: '#f97316', // 珊瑚橙（活力）
          teal: '#0d9488', // 青綠（專業）
          purple: '#9333ea', // 紫色（創新）
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
    },
  },
  plugins: [],
}
