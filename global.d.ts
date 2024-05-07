type TjMessages = typeof import("./locales/tj.json");
type EnMessages = typeof import("./locales/en.json");
type RuMessages = typeof import("./locales/ru.json");

declare interface IntlMessages extends EnMessages, RuMessages, TjMessages {}