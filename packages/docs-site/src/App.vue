<script setup lang="ts">
import { ref, computed, h, onMounted, watch } from "vue";
import {
  W95Desktop,
  W95Window,
  W95Taskbar,
  W95TaskbarItem,
  provideLocale,
} from "vue-win95-ui";
import { lang, toggleLang, t, isZh } from "./i18n";
import CalculatorApp from "./apps/CalculatorApp.vue";
import NotepadApp from "./apps/NotepadApp.vue";
import MinesApp from "./apps/MinesApp.vue";

type DocId = "welcome" | "install" | "all" | "theme" | "changelog";
type AppId = "calc" | "notepad" | "mines";
type WinId = DocId | AppId;

interface WinState {
  id: WinId;
  title: string;
  x: number;
  y: number;
  minimized: boolean;
  kind: "doc" | "app";
}

const docPages: Record<DocId, { icon: string; mod: () => Promise<unknown> }> = {
  welcome: { icon: "help", mod: () => import("./mdx/welcome.mdx") },
  install: { icon: "folder", mod: () => import("./mdx/install.mdx") },
  all: { icon: "computer", mod: () => import("./mdx/all.mdx") },
  theme: { icon: "folder", mod: () => import("./mdx/theme.mdx") },
  changelog: { icon: "help", mod: () => import("./mdx/changelog.mdx") },
};

const apps: Record<AppId, { icon: string; title: { zh: string; en: string }; comp: unknown }> = {
  calc: { icon: "computer", title: { zh: "计算器 Calculator", en: "Calculator" }, comp: CalculatorApp },
  notepad: { icon: "file", title: { zh: "记事本 Notepad", en: "Notepad" }, comp: NotepadApp },
  mines: { icon: "star", title: { zh: "扫雷 Minesweeper", en: "Minesweeper" }, comp: MinesApp },
};

function winTitle(id: WinId) {
  if (id in apps) return apps[id as AppId].title[lang.value];
  return t("pages", id);
}

// 文档站切换中/英时，库内文案（按钮、日历、分页）跟着切
provideLocale(computed(() => (lang.value === "zh" ? "zh-CN" : "en")) as never);

const windows = ref<WinState[]>([]);
const activeId = ref<WinId | null>(null);
const startOpen = ref(false);
const now = ref(new Date());
setInterval(() => {
  now.value = new Date();
}, 30_000);

const clock = computed(() =>
  now.value.toLocaleTimeString(lang.value === "zh" ? "zh-CN" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
);

const resolved = new Map<string, unknown>();
const modCache = ref<Record<string, unknown>>({});

async function loadDoc(id: DocId) {
  if (!resolved.has(id)) {
    const mod = (await docPages[id].mod()) as { default?: unknown };
    resolved.set(id, mod.default ?? mod);
  }
  return resolved.get(id);
}

async function ensureWin(id: WinId) {
  if (modCache.value[id]) return;
  if (id in apps) {
    modCache.value = { ...modCache.value, [id]: apps[id as AppId].comp };
    return;
  }
  try {
    const comp = await loadDoc(id as DocId);
    modCache.value = { ...modCache.value, [id]: comp };
  } catch (err) {
    console.error("Failed to load", id, err);
    modCache.value = {
      ...modCache.value,
      [id]: {
        render() {
          return h("div", { class: "w95-md" }, [
            h("p", { style: "font-size:14px" }, t("loadError")),
            h(
              "button",
              {
                type: "button",
                class: "w95-focus min-w-w95-btn min-h-w95-btn bg-w95-surface shadow-w95-raised border-0 font-w95",
                onClick: () => {
                  resolved.delete(id);
                  const next = { ...modCache.value };
                  delete next[id];
                  modCache.value = next;
                  void ensureWin(id);
                },
              },
              t("retry")
            ),
          ]);
        },
      },
    };
  }
}

function close(w: WinState) {
  windows.value = windows.value.filter((x) => x.id !== w.id);
  if (activeId.value === w.id) activeId.value = null;
}
function restore(w: WinState) {
  w.minimized = false;
  activeId.value = w.id;
}

function openWin(id: WinId) {
  startOpen.value = false;
  if (location.hash !== `#${id}`) history.replaceState(null, "", `#${id}`);
  const existing = windows.value.find((w) => w.id === id);
  if (existing) {
    existing.minimized = false;
    existing.title = winTitle(id);
    activeId.value = id;
    return;
  }
  const offset = windows.value.length * 24;
  windows.value.push({
    id,
    title: winTitle(id),
    x: 48 + offset,
    y: 36 + offset,
    minimized: false,
    kind: id in apps ? "app" : "doc",
  });
  activeId.value = id;
  void ensureWin(id);
}

watch(lang, () => {
  windows.value = windows.value.map((w) => ({ ...w, title: winTitle(w.id) }));
});

watch(
  () => windows.value.map((w) => `${w.id}:${modCache.value[w.id] ? 1 : 0}`).join(","),
  () => {
    requestAnimationFrame(() => {
      document.querySelectorAll(".docs-body pre").forEach((pre) => {
        if (pre.querySelector(".copy-btn")) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "copy-btn";
        btn.textContent = "Copy";
        btn.addEventListener("click", async () => {
          const code = pre.querySelector("code");
          const text = code?.textContent ?? pre.textContent ?? "";
          try {
            await navigator.clipboard.writeText(text);
            btn.textContent = "Copied";
            setTimeout(() => {
              btn.textContent = "Copy";
            }, 1200);
          } catch {
            btn.textContent = "Failed";
          }
        });
        pre.appendChild(btn);
      });
    });
  },
  { immediate: true }
);

function iconClass(kind: string) {
  return kind === "folder"
    ? "w95-icon w95-icon-folder"
    : kind === "computer"
      ? "w95-icon w95-icon-computer"
      : "w95-icon w95-icon-help";
}

const desktopItems = computed<{ id: WinId; label: string; icon: string }[]>(() => [
  { id: "all", label: winTitle("all"), icon: "computer" },
  { id: "welcome", label: winTitle("welcome"), icon: "help" },
  { id: "install", label: winTitle("install"), icon: "folder" },
  { id: "calc", label: apps.calc.title[lang.value], icon: "computer" },
  { id: "notepad", label: apps.notepad.title[lang.value], icon: "file" },
  { id: "mines", label: apps.mines.title[lang.value], icon: "star" },
  { id: "theme", label: winTitle("theme"), icon: "folder" },
  { id: "changelog", label: winTitle("changelog"), icon: "help" },
]);

const startItems = computed(() => [
  ...(Object.keys(docPages) as DocId[]).map((id) => ({
    id: id as WinId,
    label: winTitle(id),
    icon: docPages[id].icon,
  })),
  ...(Object.keys(apps) as AppId[]).map((id) => ({
    id: id as WinId,
    label: winTitle(id),
    icon: apps[id].icon,
  })),
]);

const query = ref("");
const filteredStart = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return startItems.value;
  return startItems.value.filter(
    (i) => i.label.toLowerCase().includes(q) || i.id.includes(q)
  );
});

function syncHash() {
  const id = location.hash.replace(/^#/, "") as WinId;
  if (id in docPages || id in apps) openWin(id);
}
window.addEventListener("hashchange", syncHash);
onMounted(() => syncHash());

function onDesktopClick(e: MouseEvent) {
  const el = e.target as HTMLElement;
  if (!el.closest(".w95-start-panel") && !el.closest("[data-start-btn]")) {
    startOpen.value = false;
  }
}
</script>

<template>
  <W95Desktop class="w95-scanlines select-none" @pointerdown="onDesktopClick">
    <div class="absolute top-3 left-3 flex flex-col gap-4">
      <button
        v-for="item in desktopItems"
        :key="item.id"
        type="button"
        class="flex flex-col items-center gap-1 w-[92px] bg-transparent border-0 cursor-default p-1 focus:outline-none"
        @dblclick="openWin(item.id)"
        @click="openWin(item.id)"
      >
        <span :class="iconClass(item.icon)" />
        <span class="text-white text-center px-1 leading-tight" style="text-shadow: 1px 1px 0 #000; font-size: 12px">
          {{ item.label }}
        </span>
      </button>
    </div>

    <W95Window
      v-for="w in windows"
      :key="w.id"
      floating
      :title="w.title"
      :active="activeId === w.id"
      :width="w.kind === 'app' ? 360 : 760"
      :show-maximize="w.kind === 'doc'"
      :default-x="w.x"
      :default-y="w.y"
      v-model:minimized="w.minimized"
      @focus="activeId = w.id"
      @close="close(w)"
    >
      <div
        class="m-2 max-h-[62vh] overflow-auto bg-w95-surface"
        :class="w.kind === 'doc' ? 'p-3 docs-body' : 'p-2'"
      >
        <component :is="modCache[w.id]" v-if="modCache[w.id]" :key="w.id + lang" />
        <p v-else class="font-w95 text-w95 m-0">{{ t("loading") }}</p>
      </div>
      <template #status>
        <p class="m-0 px-[3px] py-0.5 flex-1 shadow-w95-status font-w95 text-w95">{{ t("ready") }}</p>
        <p class="m-0 px-[3px] py-0.5 flex-1 shadow-w95-status font-w95 text-w95">vue-win95-ui Docs</p>
      </template>
    </W95Window>

    <div v-if="startOpen" class="absolute bottom-[28px] left-0 z-[2000]">
      <div class="w95-start-panel">
        <div class="w95-start-banner">vue-win95-ui</div>
        <ul class="flex-1 list-none m-0 p-1 font-w95 text-w95 max-h-[50vh] overflow-auto">
          <li class="px-1 pb-1">
            <input
              v-model="query"
              type="search"
              :placeholder="t('search')"
              aria-label="Search"
              class="w95-focus box-border w-full font-w95 text-w95"
              style="height: 22px; padding: 2px 4px; box-shadow: inset -1px -1px #fff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a; border: 0; background: #fff; font-size: 12px"
            />
          </li>
          <li
            v-for="item in filteredStart"
            :key="item.id"
            class="px-2 py-1.5 cursor-default hover:bg-w95-blue hover:text-w95-highlight flex items-center gap-2"
            style="font-size: 13px"
            @click="openWin(item.id)"
          >
            <span class="w-4 text-center" aria-hidden="true">
              {{ item.icon === "folder" ? "📁" : item.icon === "computer" ? "💻" : item.icon === "file" ? "📄" : "❓" }}
            </span>
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>

    <W95Taskbar class="absolute bottom-0 left-0 right-0 h-[28px] gap-1 px-1 z-[1900]">
      <button
        type="button"
        data-start-btn
        class="min-w-w95-btn h-[22px] px-2 border-0 rounded-none bg-w95-surface shadow-w95-raised font-bold cursor-default active:shadow-w95-sunken"
        :aria-expanded="startOpen"
        @pointerdown.stop
        @click="startOpen = !startOpen"
      >
        <span class="mr-1">🪟</span> {{ t("start") }}
      </button>
      <button
        type="button"
        class="h-[22px] px-2 border-0 rounded-none bg-w95-surface shadow-w95-raised cursor-default active:shadow-w95-sunken"
        :aria-label="isZh ? 'Switch to English' : '切换为中文'"
        @click="toggleLang"
      >
        {{ isZh ? "EN" : "中" }}
      </button>
      <div class="h-[18px] w-px bg-w95-button-shadow mx-0.5" />
      <W95TaskbarItem
        v-for="w in windows"
        :key="w.id"
        :title="w.title"
        :active="activeId === w.id"
        :minimized="w.minimized"
        @click="restore(w)"
      />
      <div class="flex-1" />
      <div class="h-[22px] px-2 flex items-center shadow-w95-status min-w-[70px] justify-center">{{ clock }}</div>
    </W95Taskbar>
  </W95Desktop>
</template>
