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
  search: { zh: "搜索…", en: "Search…" },
  ready: { zh: "就绪", en: "Ready" },
  loading: { zh: "加载中…", en: "Loading…" },
  loadError: { zh: "页面加载失败", en: "Failed to load page" },
  retry: { zh: "重试", en: "Retry" },
  noMatch: { zh: "无匹配", en: "No matches" },
  docsVersion: { zh: "组件库文档", en: "Docs" },
  pages: {
    welcome: { zh: "欢迎", en: "Welcome" },
    install: { zh: "安装", en: "Install" },
    all: { zh: "全部组件", en: "All Components" },
    theme: { zh: "主题编辑器", en: "Theme Editor" },
    changelog: { zh: "更新日志", en: "Changelog" },
  },
} as const;

export function t(key: keyof typeof dict, page?: string): string {
  const l = lang.value;
  if (key === "pages" && page) {
    const p = dict.pages[page as keyof typeof dict.pages] as
      | { zh: string; en: string }
      | undefined;
    return p ? p[l] : page;
  }
  const entry = dict[key as keyof typeof dict] as Record<string, string> | undefined;
  return entry?.[l] ?? String(key);
}

export function useDocsI18n() {
  return { lang, isZh, t, toggleLang };
}
