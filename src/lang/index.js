import Vue from 'vue'
import locale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
import cn from './zh-CN'
import en from './en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'

Vue.use(VueI18n)

const language = localStorage.getItem('lang') || 'cn'

const i18n = new VueI18n({
  locale: language,
  messages: {
    cn: { ...zhLocale, ...cn },
    en: { ...enLocale, ...en }
  }
})
locale.i18n((key, value) => i18n.t(key, value))

export default i18n
