<script setup lang="ts">
import { ref } from "vue";
import ContextMenu from "./ContextMenu.vue";
import MenuItem from "../menu/MenuItem.vue";

export interface W95MenuEntry {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

withDefaults(
  defineProps<{
    items?: W95MenuEntry[];
  }>(),
  { items: () => [] }
);

const open = ref(false);
const x = ref(0);
const y = ref(0);

function onContext(e: MouseEvent) {
  e.preventDefault();
  x.value = e.clientX;
  y.value = e.clientY;
  open.value = true;
}
</script>

<template>
  <div class="contents" @contextmenu="onContext">
    <slot />
    <ContextMenu v-model="open" :x="x" :y="y">
      <MenuItem
        v-for="(item, i) in items"
        :key="i"
        :disabled="item.disabled"
        @click="item.onClick && item.onClick()"
      >
        {{ item.label }}
      </MenuItem>
    </ContextMenu>
  </div>
</template>
