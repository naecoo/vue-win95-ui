<script setup lang="ts">
import { computed, ref, watch } from "vue";

type PageId =
  | "welcome"
  | "button"
  | "input"
  | "window"
  | "navigation"
  | "gallery";

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
  { title: string; icon: string; mod: () => Promise<unknown> }
> = {
  welcome: {
    title: "Welcome to vue-win95",
    icon: "help",
    mod: () => import("./mdx/welcome.mdx"),
  },
  button: {
    title: "Button 文档",
    icon: "folder",
    mod: () => import("./mdx/button.mdx"),
  },
  input: {
    title: "Input / Form 文档",
    icon: "folder",
    mod: () => import("./mdx/input.mdx"),
  },
  window: {
    title: "Window & Dialog",
    icon: "folder",
    mod: () => import("./mdx/window.mdx"),
  },
  navigation: {
    title: "Navigation 组件",
    icon: "folder",
    mod: () => import("./mdx/navigation.mdx"),
  },
  gallery: {
    title: "Component Gallery",
    icon: "computer",
    mod: () => import("./mdx/gallery.mdx"),
  },
};

const windows = ref<WinState[]>([]);
const zTop = ref(10);
const startOpen = ref(false);
const now = ref(new Date());

setInterval(() => {
  now.value = new Date();
}, 30_000);

const clock = computed(() =>
  now.value.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
);

const resolved = new Map<PageId, unknown>();

async function loadMod(id: PageId) {
  if (!resolved.has(id)) {
    const mod = (await pages[id]!.mod()) as { default?: unknown };
    // vite-plugin-md exports a Vue component on `default`
    resolved.set(id, mod.default ?? mod);
  }
  return resolved.get(id);
}

function openPage(id: PageId) {
  startOpen.value = false;
  const existing = windows.value.find((w) => w.id === id);
  if (existing) {
    existing.minimized = false;
    focus(existing);
    return;
  }
  const offset = windows.value.length * 24;
  windows.value.push({
    id,
    title: pages[id]!.title,
    x: 40 + offset,
    y: 32 + offset,
    z: ++zTop.value,
    minimized: false,
  });
  void ensurePage(id);
}

async function ensurePage(id: PageId) {
  const comp = await loadMod(id);
  // replace whole object so nested key is reactive
  modCache.value = { ...modCache.value, [id]: comp };
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

/* drag — only from title text / empty bar area, never from control buttons */
let drag: { w: WinState; ox: number; oy: number } | null = null;

function onTitleDown(e: PointerEvent, w: WinState) {
  focus(w);
  const target = e.target as HTMLElement;
  if (target.closest("button")) return; // let close/minimize receive click
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

function iconClass(kind: string) {
  return kind === "folder"
    ? "w95-icon w95-icon-folder"
    : kind === "computer"
      ? "w95-icon w95-icon-computer"
      : "w95-icon w95-icon-help";
}

function onDesktopClick(e: MouseEvent) {
  const t = e.target as HTMLElement;
  if (!t.closest(".w95-start-panel") && !t.closest("[data-start-btn]")) {
    startOpen.value = false;
  }
}
</script>

<template>
  <div
    class="w95-scanlines relative w-full h-full overflow-hidden bg-w95-desktop select-none"
    @pointerdown="onDesktopClick"
  >
    <!-- Desktop icons -->
    <div class="absolute top-3 left-3 flex flex-col gap-4">
      <button
        v-for="id in pageIds"
        :key="id"
        type="button"
        class="flex flex-col items-center gap-1 w-[76px] bg-transparent border-0 cursor-default p-1 focus:outline-none"
        @dblclick="openPage(id)"
        @click="openPage(id)"
      >
        <span :class="iconClass(pages[id]!.icon)" />
        <span
          class="text-white text-center px-1 leading-tight"
          style="text-shadow: 1px 1px 0 #000"
        >
          {{ pages[id]!.title }}
        </span>
      </button>
    </div>

    <!-- Windows -->
    <div
      v-for="w in windows"
      :key="w.id"
      v-show="!w.minimized"
      class="absolute"
      :style="{ left: w.x + 'px', top: w.y + 'px', zIndex: w.z }"
      @pointerdown="focus(w)"
    >
      <div
        class="bg-w95-surface shadow-w95-window p-[3px] w-[640px] max-w-[calc(100vw-24px)] font-w95 text-w95"
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
          class="m-2 p-2 max-h-[60vh] overflow-auto bg-w95-surface"
          style="
            box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf,
              inset -2px -2px #808080, inset 2px 2px #ffffff;
          "
        >
          <component :is="modCache[w.id]" v-if="modCache[w.id]" :key="w.id" />
          <p v-else class="font-w95 text-w95 m-0">Loading…</p>
        </div>

        <div class="flex gap-px mx-px mb-px">
          <p
            class="m-0 px-[3px] py-0.5 flex-1 shadow-w95-status font-w95 text-w95"
          >
            Ready
          </p>
          <p
            class="m-0 px-[3px] py-0.5 flex-1 shadow-w95-status font-w95 text-w95"
          >
            vue-win95 v0.2.0 Docs
          </p>
        </div>
      </div>
    </div>

    <!-- Start menu -->
    <div
      v-if="startOpen"
      class="absolute bottom-[28px] left-0 z-[2000]"
    >
      <div class="w95-start-panel">
        <div class="w95-start-banner">vue-win95</div>
        <ul class="flex-1 list-none m-0 p-1 font-w95 text-w95">
          <li
            v-for="id in pageIds"
            :key="id"
            class="px-2 py-1 cursor-default hover:bg-w95-blue hover:text-w95-highlight flex items-center gap-2"
            @click="openPage(id)"
          >
            <span class="w-4 text-center" aria-hidden="true">
              {{ pages[id]!.icon === "folder" ? "📁" : pages[id]!.icon === "computer" ? "💻" : "❓" }}
            </span>
            {{ pages[id]!.title }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Taskbar -->
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
        <span class="mr-1">🪟</span> Start
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
      <div
        class="h-[22px] px-2 flex items-center shadow-w95-status min-w-[70px] justify-center"
      >
        {{ clock }}
      </div>
    </div>
  </div>
</template>
