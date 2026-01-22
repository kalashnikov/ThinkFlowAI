import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'
import zhTW from './locales/zh-TW.json'

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: localStorage.getItem('language') || 'zh-TW', // 預設繁體中文
  fallbackLocale: 'zh-TW',
  messages: {
    en,
    zh,
    'zh-TW': zhTW
  }
})

export default i18n
