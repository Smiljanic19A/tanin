import englishTranslations from '@/locales/english.json'
import serbianTranslations from '@/locales/serbian.json'

const translations = {
  English: englishTranslations,
  Serbian: serbianTranslations
}

export function getTranslation(language, key) {
  const keys = key.split('.')
  let translation = translations[language] || translations.English
  
  for (const k of keys) {
    translation = translation[k]
    if (!translation) {
      // Fallback to English if translation is missing
      translation = translations.English
      for (const k of keys) {
        translation = translation[k]
        if (!translation) return key // Return key if even English is missing
      }
      break
    }
  }
  
  return translation || key
}

export function getCurrentLanguageTranslations(language) {
  return translations[language] || translations.English
}

export const availableLanguages = ['English', 'Serbian'] 