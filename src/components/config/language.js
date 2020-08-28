import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";

import en from "../string/en";
import th from "../string/th";

const locales = RNLocalize.getLocales();
// console.log('locales ======> ',locales);
if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
  // console.log('array ======> ',locales[0].languageTag);
} 

// languageTag: "en-TH", languageCode: "en",

I18n.fallbacks = true;
I18n.translations = {
  en,
  th
};

export default I18n;