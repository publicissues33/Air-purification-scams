import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/Air-purification-scams/', // ⚠️ 必須與 GitHub repo 名稱完全一致
  plugins: [react(), tailwindcss()], // ✅ 合併 plugins 陣列
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})