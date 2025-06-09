import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "hi", "ml", "es"],
    resources: {
      en: {
        translation: {
          settings: "Settings",
          accentColor: "Accent Color",
          themeMode: "Theme Mode",
          editHome: "Edit Home Page",
          language: "Language",
          customizeHomepage: "Customize your homepage layout",
          selectColor: "Select a color theme for the interface",
          selectTheme: "Select light or dark theme",
          languagePref: "App language preference"
        }
      },
      hi: {
        translation: {
          settings: "सेटिंग्स",
          accentColor: "मुख्य रंग",
          themeMode: "थीम मोड",
          editHome: "मुखपृष्ठ संपादित करें",
          language: "भाषा",
          customizeHomepage: "अपने होमपेज को अनुकूलित करें",
          selectColor: "इंटरफ़ेस के लिए रंग थीम चुनें",
          selectTheme: "लाइट या डार्क थीम चुनें",
          languagePref: "ऐप भाषा वरीयता"
        }
      },
      ml: {
        translation: {
          settings: "ക്രമീകരണങ്ങൾ",
          accentColor: "അക്സന്റ് നിറം",
          themeMode: "തീം മോഡ്",
          editHome: "ഹോംപേജ് തിരുത്തുക",
          language: "ഭാഷ",
          customizeHomepage: "നിങ്ങളുടെ ഹോംപേജ് ഇഷ്ടാനുസൃതമാക്കുക",
          selectColor: "ഇന്റർഫേസിനുള്ള നിറം തിരഞ്ഞെടുക്കുക",
          selectTheme: "ലൈറ്റ് അല്ലെങ്കിൽ ഡാർക്ക് തീം തിരഞ്ഞെടുക്കുക",
          languagePref: "ആപ്പ് ഭാഷയുടെ ഇഷ്‌ടം"
        }
      },
      es: {
        translation: {
          settings: "Configuraciones",
          accentColor: "Color de acento",
          themeMode: "Modo de tema",
          editHomePage: "Editar página de inicio",
          language: "Idioma",
          customizeHomepage: "Personaliza tu página de inicio",
          selectColor: "Selecciona un tema de color para la interfaz",
          selectTheme: "Selecciona tema claro u oscuro",
          languagePref: "Preferencia de idioma de la aplicación"
        }
      }
    }
  })

export default i18n
