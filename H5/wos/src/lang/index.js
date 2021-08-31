
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'

import vantEnLocale from 'vant/lib/locale/lang/en-US'
import vantZhLocale from 'vant/lib/locale/lang/zh-CN'
import enLocale from './en_US'
import zhLocale from './zh_CN'
import thLocale from './th_TH'

Vue.use(VueI18n)

const messages = {
  'en-US': {
    ...enLocale,
    ...vantEnLocale
  },
  'zh-CN': {
    ...zhLocale,
    ...vantZhLocale
  },
  'th-TH': {
    ...thLocale
  }
}

export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage)
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en-US'
}

const i18n = new VueI18n({
  // set locale
  locale: getLanguage(),
  // set locale messages
  messages
})

export default i18n
