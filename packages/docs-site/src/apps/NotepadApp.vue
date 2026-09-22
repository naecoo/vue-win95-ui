<script setup lang="ts">
import { ref, computed } from "vue";
import { isZh } from "../i18n";

const text = ref(
  isZh.value
    ? "欢迎使用 Win95 记事本。\n这里是 vue-win95 文档站的小应用。\n你可以随意编辑这段文字。"
    : "Welcome to Win95 Notepad.\nThis mini app lives in the vue-win95 docs.\nEdit this text freely."
);

const lines = computed(() => text.value.split("\n").length);
const chars = computed(() => text.value.length);
</script>

<template>
  <div class="font-w95 text-w95 flex flex-col gap-2">
    <textarea
      v-model="text"
      class="w-full h-48 p-2 shadow-w95-field bg-w95-highlight text-w95-text resize-none"
      style="font-family: 'Pixelated MS Sans Serif', monospace; font-size: 12px; border: 0"
    />
    <div class="flex gap-px">
      <p class="flex-1 m-0 px-1 py-0.5 shadow-w95-status">{{ isZh ? "行" : "Lines" }}: {{ lines }}</p>
      <p class="flex-1 m-0 px-1 py-0.5 shadow-w95-status">{{ isZh ? "字数" : "Chars" }}: {{ chars }}</p>
    </div>
  </div>
</template>
