<script setup lang="ts">
import { ref, computed } from "vue";
import { W95Button } from "vue-win95";
import { isZh } from "../i18n";

const N = 5;
const MINE_COUNT = 3;
type Cell = { mine: boolean; open: boolean; flag: boolean; near: number };

function makeBoard(): Cell[] {
  const cells: Cell[] = Array.from({ length: N * N }, () => ({
    mine: false,
    open: false,
    flag: false,
    near: 0,
  }));
  let placed = 0;
  while (placed < MINE_COUNT) {
    const i = Math.floor(Math.random() * N * N);
    if (!cells[i]!.mine) {
      cells[i]!.mine = true;
      placed++;
    }
  }
  for (let i = 0; i < N * N; i++) {
    if (cells[i]!.mine) continue;
    const r = Math.floor(i / N);
    const c = i % N;
    let near = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const rr = r + dr;
        const cc = c + dc;
        if (rr < 0 || cc < 0 || rr >= N || cc >= N) continue;
        if (cells[rr * N + cc]!.mine) near++;
      }
    }
    cells[i]!.near = near;
  }
  return cells;
}

const cells = ref(makeBoard());
const status = ref<"playing" | "win" | "lose">("playing");

function reset() {
  cells.value = makeBoard();
  status.value = "playing";
}

function open(i: number) {
  if (status.value !== "playing") return;
  const cell = cells.value[i]!;
  if (cell.open || cell.flag) return;
  cell.open = true;
  if (cell.mine) {
    status.value = "lose";
    cells.value.forEach((c) => {
      if (c.mine) c.open = true;
    });
    return;
  }
  if (cell.near === 0) {
    const r = Math.floor(i / N);
    const c = i % N;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const rr = r + dr;
        const cc = c + dc;
        if (rr >= 0 && cc >= 0 && rr < N && cc < N) open(rr * N + cc);
      }
    }
  }
  if (cells.value.filter((c) => !c.mine && !c.open).length === 0) status.value = "win";
}

function toggleFlag(i: number) {
  if (status.value !== "playing") return;
  const cell = cells.value[i]!;
  if (!cell.open) cell.flag = !cell.flag;
}

const msg = computed(() =>
  status.value === "win"
    ? isZh.value ? "你赢了！" : "You win!"
    : status.value === "lose"
      ? isZh.value ? "踩雷了…" : "Boom…"
      : isZh.value ? "点击翻开，右键插旗" : "Click to open, right-click to flag"
);
</script>

<template>
  <div class="font-w95 text-w95">
    <p class="mb-2 mt-0">{{ msg }}</p>
    <div class="grid gap-0.5" :style="{ gridTemplateColumns: `repeat(${N}, 24px)` }">
      <button
        v-for="(cell, i) in cells"
        :key="i"
        type="button"
        class="w-6 h-6 box-border border-0 cursor-default font-w95 text-w95 leading-none"
        :class="cell.open ? 'shadow-w95-field bg-w95-face' : 'shadow-w95-raised bg-w95-surface'"
        @click="open(i)"
        @contextmenu.prevent="toggleFlag(i)"
      >
        {{ cell.open ? (cell.mine ? "*" : cell.near || "") : cell.flag ? "P" : "" }}
      </button>
    </div>
    <W95Button class="mt-2" @click="reset">{{ isZh ? "重来" : "New game" }}</W95Button>
  </div>
</template>
