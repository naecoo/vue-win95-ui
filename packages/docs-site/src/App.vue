<script setup lang="ts">
import { computed, h, onMounted, ref, watch } from "vue";
import { lang, toggleLang, t, isZh } from "./i18n";

type PageId =
  | "welcome"
  | "install"
  | "input"
  | "window"
  | "navigation"
  | "overlays"
  | "data"
  | "misc"
  | "gallery"
  | "all"
  | "theme"
  | "changelog";

interface WinState {
  id: PageId;
  title: string;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
}

const pages: Record<
  PageId,
  { titleKey: PageId; icon: string; mod: () => Promise<unknown> }
> = {
  welcome: {
    titleKey: "welcome",
    icon: "help",
    mod: () => import("./mdx/welcome.mdx"),
  },
  install: {
    titleKey: "install",
    icon: "folder",
    mod: () => import("./mdx/install.mdx"),
  },
  input: {
    titleKey: "input",
    icon: "folder",
    mod: () => import("./mdx/input.mdx"),
  },
  window: {
    titleKey: "window",
    icon: "folder",
    mod: () => import("./mdx/window.mdx"),
  },
  navigation: {
    titleKey: "navigation",
    icon: "folder",
    mod: () => import("./mdx/navigation.mdx"),
  },
  overlays: {
    titleKey: "overlays",
    icon: "folder",
    mod: () => import("./mdx/overlays.mdx"),
  },
  data: {
    titleKey: "data",
    icon: "folder",
    mod: () => import("./mdx/data.mdx"),
  },
  misc: {
    titleKey: "misc",
    icon: "folder",
    mod: () => import("./mdx/misc.mdx"),
  },
  gallery: {
    titleKey: "gallery",
    icon: "computer",
    mod: () => import("./mdx/gallery.mdx"),
  },
  all: {
    titleKey: "all",
    icon: "computer",
    mod: () => import("./mdx/all.mdx"),
  },
  theme: {
    titleKey: "theme",
    icon: "help",
    mod: () => import("./mdx/theme.mdx"),
  },
  changelog: {
    titleKey: "changelog",
    icon: "help",
    mod: () => import("./mdx/changelog.mdx"),
  },
};

function pageTitle(id: PageId) {
  return t("pages", id);
}

const windows = ref<WinState[]>([]);
const zTop = ref(10);
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

const resolved = new Map<PageId, unknown>();

async function loadMod(id: PageId) {
  if (!resolved.has(id)) {
    const mod = (await pages[id]!.mod()) as { default?: unknown };
    resolved.set(id, mod.default ?? mod);
  }
  return resolved.get(id);
}

async function ensurePage(id: PageId) {
  if (modCache.value[id]) return;
  try {
    const comp = await loadMod(id);
    modCache.value = { ...modCache.value, [id]: comp };
  } catch (err) {
    console.error("Failed to load docs page", id, err);
    modCache.value = {
      ...modCache.value,
      [id]: {
        name: "PageError",
        render() {
          return h("div", { class: "w95-md" }, [
            h("p", { style: "font-size:14px" }, t("loadError")),
            h(
              "button",
              {
                type: "button",
                class:
                  "w95-focus min-w-w95-btn min-h-w95-btn bg-w95-surface shadow-w95-raised border-0 font-w95 text-w95 cursor-default",
                onClick: () => {
                  resolved.delete(id);
                  const next = { ...modCache.value };
                  delete next[id];
                  modCache.value = next;
                  void ensurePage(id);
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

function focus(w: WinState) {
  w.z = ++zTop.value;
}

function close(w: WinState) {
  windows.value = windows.value.filter((x) => x.id !== w.id);
}

function minimize(w: WinState) {
  w.minimized = true;
}

function restoreFromTaskbar(w: WinState) {
  w.minimized = false;
  focus(w);
}

let drag: { w: WinState; ox: number; oy: number } | null = null;

function onTitleDown(e: PointerEvent, w: WinState) {
  focus(w);
  const target = e.target as HTMLElement;
  if (target.closest("button")) return;
  drag = { w, ox: e.clientX - w.x, oy: e.clientY - w.y };
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
}

function onTitleMove(e: PointerEvent) {
  if (!drag) return;
  drag.w.x = Math.max(0, e.clientX - drag.ox);
  drag.w.y = Math.max(0, e.clientY - drag.oy);
}

function onTitleUp() {
  drag = null;
}

const pageIds = Object.keys(pages) as PageId[];
const modCache = ref<Record<string, unknown>>({});

watch(
  () => windows.value.map((w) => w.id).join(","),
  async () => {
    for (const w of windows.value) {
      await ensurePage(w.id);
    }
  },
  { immediate: true }
);

/** keep window titles in sync with language */
watch(lang, () => {
  windows.value = windows.value.map((w) => ({
    ...w,
    title: pageTitle(w.id),
  }));
});

watch(
  () =>
    windows.value.map((w) => `${w.id}:${modCache.value[w.id] ? 1 : 0}`).join(","),
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

const desktopIds = computed<PageId[]>(() => [
  "welcome",
  "install",
  "input",
  "window",
  "navigation",
  "gallery",
  "all",
  "theme",
  "changelog",
]);

const query = ref("");

const filteredIds = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return pageIds;
  return pageIds.filter((id) => {
    const name = pageTitle(id).toLowerCase();
    return name.includes(q) || id.toLowerCase().includes(q);
  });
});

function syncHash() {
  const id = location.hash.replace(/^#/, "") as PageId;
  if (id && id in pages) openPage(id);
}

window.addEventListener("hashchange", syncHash);
onMounted(() => syncHash());

function openPage(id: PageId) {
  startOpen.value = false;
  if (location.hash !== `#${id}`) {
    history.replaceState(null, "", `#${id}`);
  }
  const existing = windows.value.find((w) => w.id === id);
  if (existing) {
    existing.minimized = false;
    focus(existing);
    return;
  }
  const offset = windows.value.length * 24;
  windows.value.push({
    id,
    title: pageTitle(id),
    x: 40 + offset,
    y: 32 + offset,
    z: ++zTop.value,
    minimized: false,
  });
  void ensurePage(id);
}

function onDesktopClick(e: MouseEvent) {
  const el = e.target as HTMLElement;
  if (!el.closest(".w95-start-panel") && !el.closest("[data-start-btn]")) {
    startOpen.value = false;
  }
}
</script>

<template>
  <div
    class="w95-scanlines relative w-full h-full overflow-hidden bg-w95-desktop select-none"
    @pointerdown="onDesktopClick"
  >
    <div class="absolute top-3 left-3 flex flex-col gap-4">
      <button
        v-for="id in desktopIds"
        :key="id"
        type="button"
        class="flex flex-col items-center gap-1 w-[88px] bg-transparent border-0 cursor-default p-1 focus:outline-none"
        @dblclick="openPage(id)"
        @click="openPage(id)"
      >
        <span :class="iconClass(pages[id]!.icon)" />
        <span
          class="text-white text-center px-1 leading-tight"
          style="text-shadow: 1px 1px 0 #000;font-size:12px"
        >
          {{ pageTitle(id) }}
        </span>
      </button>
    </div>

    <div
      v-for="w in windows"
      :key="w.id"
      v-show="!w.minimized"
      class="absolute"
      :style="{ left: w.x + 'px', top: w.y + 'px', zIndex: w.z }"
      @pointerdown="focus(w)"
    >
      <div
        class="bg-w95-surface shadow-w95-window p-[3px] w-[720px] max-w-[calc(100vw-24px)] font-w95 text-w95"
      >
        <div
          class="bg-gradient-to-r from-w95-blue to-w95-blue-light flex items-center justify-between px-[3px] py-[2px] cursor-move touch-none"
          @pointerdown="onTitleDown($event, w)"
          @pointermove="onTitleMove"
          @pointerup="onTitleUp"
        >
          <span class="text-white font-bold mr-4 truncate">
            {{ w.title }}
          </span>
          <div class="flex shrink-0">
            <button
              type="button"
              class="w-4 h-[14px] min-w-0 p-0 border-0 bg-w95-surface shadow-w95-raised w95-title-glyph-min relative cursor-default"
              aria-label="Minimize"
              @pointerdown.stop
              @click.stop="minimize(w)"
            />
            <button
              type="button"
              class="w-4 h-[14px] min-w-0 p-0 border-0 bg-w95-surface shadow-w95-raised w95-title-glyph-close relative cursor-default ml-0.5"
              aria-label="Close"
              @pointerdown.stop
              @click.stop="close(w)"
            />
          </div>
        </div>

        <div
          class="m-2 p-3 max-h-[62vh] overflow-auto bg-w95-surface docs-body"
          style="
            box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf,
              inset -2px -2px #808080, inset 2px 2px #ffffff;
          "
        >
          <component :is="modCache[w.id]" v-if="modCache[w.id]" :key="w.id + lang" />
          <p v-else class="font-w95 text-w95 m-0">{{ t("loading") }}</p>
        </div>

        <div class="flex gap-px mx-px mb-px">
          <p class="m-0 px-[3px] py-0.5 flex-1 shadow-w95-status font-w95 text-w95">
            {{ t("ready") }}
          </p>
          <p class="m-0 px-[3px] py-0.5 flex-1 shadow-w95-status font-w95 text-w95">
            {{ t("docsVersion") }} v0.2.1
          </p>
        </div>
      </div>
    </div>

    <div v-if="startOpen" class="absolute bottom-[28px] left-0 z-[2000]">
      <div class="w95-start-panel">
        <div class="w95-start-banner">vue-win95</div>
        <ul class="flex-1 list-none m-0 p-1 font-w95 text-w95 max-h-[50vh] overflow-auto">
          <li class="px-1 pb-1">
            <input
              v-model="query"
              type="search"
              :placeholder="t('search')"
              aria-label="Search pages"
              class="w95-focus box-border w-full font-w95 text-w95"
              style="height:22px;padding:2px 4px;box-shadow:inset -1px -1px #fff,inset 1px 1px #808080,inset -2px -2px #dfdfdf,inset 2px 2px #0a0a0a;border:0;background:#fff;font-size:12px"
            />
          </li>
          <li
            v-for="id in filteredIds"
            :key="id"
            class="px-2 py-1.5 cursor-default hover:bg-w95-blue hover:text-w95-highlight flex items-center gap-2"
            style="font-size:13px"
            @click="openPage(id)"
          >
            <span class="w-4 text-center" aria-hidden="true">
              {{ pages[id]!.icon === "folder" ? "📁" : pages[id]!.icon === "computer" ? "💻" : "❓" }}
            </span>
            {{ pageTitle(id) }}
          </li>
          <li v-if="filteredIds.length === 0" class="px-2 py-1 text-w95-shadow" style="font-size:12px">
            {{ t("noMatch") }}
          </li>
        </ul>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 h-[28px] bg-w95-surface shadow-w95-raised flex items-center gap-1 px-1 z-[1900] font-w95 text-w95"
    >
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
      <button
        v-for="w in windows"
        :key="w.id"
        type="button"
        class="min-w-[120px] max-w-[180px] h-[22px] px-2 border-0 rounded-none truncate cursor-default"
        :class="
          !w.minimized
            ? 'shadow-w95-sunken bg-w95-face'
            : 'shadow-w95-raised bg-w95-surface'
        "
        @click="restoreFromTaskbar(w)"
      >
        {{ w.title }}
      </button>
      <div class="flex-1" />
      <div class="h-[22px] px-2 flex items-center shadow-w95-status min-w-[70px] justify-center">
        {{ clock }}
      </div>
    </div>
  </div>
</template>
