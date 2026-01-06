/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 高端顧問公司配色方案（溫暖專業色調）
        primary: {
          DEFAULT: '#8B4049', // 深酒紅（專業、權威）
          light: '#A85C66',
          dark: '#6B2F36',
        },
        accent: {
          bronze: '#B8860B', // 古銅金（數據、洞察）
          burgundy: '#722F37', // 深勃艮第紅（優先事項）
          amber: '#D4A574', // 琥珀色（亮點、成就）
          olive: '#9B8B6F', // 橄欖灰（正面、成功）
        },
        neutral: {
          cream: '#FAF8F3', // 象牙白背景
          sand: '#EDE8E0', // 淺沙色
          stone: '#D4CEC4', // 石頭色
          slate: '#5A5550', // 深灰文字
          charcoal: '#3A3632', // 炭灰色（標題）
        },
        morandi: {
          taupe: '#B5A89A', // 柔和灰褐色
          rose: '#D4B5A8', // 玫瑰灰
          mauve: '#C4B5BC', // 淡紫灰
          khaki: '#B8AE9C', // 卡其灰
        },
      },
    },
  },
  plugins: [],
}
