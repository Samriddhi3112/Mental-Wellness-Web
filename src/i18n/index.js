import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import hi from "./hi.json";
import bn from "./bn.json";
import or from "./or.json";
import as from "./as.json";
import ml from "./ml.json";
import ta from "./ta.json";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  bn: { translation: bn },
  or: { translation: or },
  as: { translation: as },
  ml: { translation: ml },
  ta: { translation: ta },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;