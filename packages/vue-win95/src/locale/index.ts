import { computed, inject, provide, ref, type App, type InjectionKey, type Ref } from "vue";
import { locales } from "./messages";
import type { W95Locale, W95Messages, W95MessageKey } from "./types";

export type { W95Locale, W95Messages, W95MessageKey };
export { locales };

export interface W95LocaleApi {
  locale: Ref<W95Locale>;
  messages: Ref<W95Messages>;
  t: (key: W95MessageKey, vars?: Record<string, string | number>) => string;
  months: Ref<string[]>;
  weekdays: Ref<string[]>;
}

const LocaleKey: InjectionKey<W95LocaleApi> = Symbol("w95-locale");

function createApi(localeRef: Ref<W95Locale>): W95LocaleApi {
  const messages = computed(() => locales[localeRef.value] ?? locales.en);
  return {
    locale: localeRef,
    messages,
    months: computed(() => messages.value.months),
    weekdays: computed(() => messages.value.weekdays),
    t: (key, vars) => {
      const raw = messages.value.messages[key] ?? locales.en.messages[key] ?? key;
      if (!vars) return raw;
      return Object.entries(vars).reduce(
        (acc, [name, value]) => acc.replace(new RegExp(`\\{${name}\\}`, "g"), String(value)),
        raw
      );
    },
  };
}

/** 在应用根部注入语言；未注入时回落到英文 */
export function provideLocale(locale: W95Locale | Ref<W95Locale>): W95LocaleApi {
  const localeRef = typeof locale === "string" ? ref(locale) : locale;
  const api = createApi(localeRef as Ref<W95Locale>);
  provide(LocaleKey, api);
  return api;
}

/** 供 app.use(Win95, { locale }) 使用 */
export function installLocale(app: App, locale: W95Locale | Ref<W95Locale>): W95LocaleApi {
  const localeRef = typeof locale === "string" ? ref(locale) : locale;
  const api = createApi(localeRef as Ref<W95Locale>);
  app.provide(LocaleKey, api);
  return api;
}

const fallback = createApi(ref<W95Locale>("en"));

export function useLocale(): W95LocaleApi {
  return inject(LocaleKey, fallback);
}
