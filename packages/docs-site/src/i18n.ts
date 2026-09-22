import { computed, ref, watch } from "vue";

export type Lang = "zh" | "en";

function detect(): Lang {
  const saved = localStorage.getItem("w95-docs-lang");
  if (saved === "zh" || saved === "en") return saved;
  const nav = (navigator.language || "zh").toLowerCase();
  return nav.startsWith("zh") ? "zh" : "en";
}

export const lang = ref<Lang>(detect());

watch(lang, (v) => {
  localStorage.setItem("w95-docs-lang", v);
  document.documentElement.lang = v === "zh" ? "zh-CN" : "en";
});

document.documentElement.lang = lang.value === "zh" ? "zh-CN" : "en";

export function toggleLang() {
  lang.value = lang.value === "zh" ? "en" : "zh";
}

export const isZh = computed(() => lang.value === "zh");

const dict = {
  start: { zh: "开始", en: "Start" },
  search: { zh: "搜索页面…", en: "Search pages…" },
  ready: { zh: "就绪", en: "Ready" },
  loading: { zh: "加载中…", en: "Loading…" },
  loadError: { zh: "页面加载失败", en: "Failed to load page" },
  retry: { zh: "重试", en: "Retry" },
  noMatch: { zh: "无匹配", en: "No matches" },
  docsVersion: { zh: "vue-win95 文档", en: "vue-win95 Docs" },
  pages: {
    welcome: { zh: "欢迎 Welcome", en: "Welcome" },
    install: { zh: "安装 Install", en: "Install" },
    all: { zh: "All Components 全组件", en: "All Components" },
    theme: { zh: "Theme Editor 主题", en: "Theme Editor" },
    changelog: { zh: "Changelog & Sponsor", en: "Changelog & Sponsor" },
  },
} as const;

export function t(key: keyof typeof dict, page?: string): string {
  const l = lang.value;
  if (key === "pages" && page) {
    const p = dict.pages[page as keyof typeof dict.pages];
    return p ? p[l] : page;
  }
  const entry = dict[key as keyof typeof dict] as Record<string, string> | undefined;
  return entry?.[l] ?? String(key);
}

/** Use in MDX / components: `const { lang, isZh, t } = useDocsI18n()` */
export function useDocsI18n() {
  return { lang, isZh, t, toggleLang };
}
