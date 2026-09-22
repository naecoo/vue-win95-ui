<script setup lang="ts">
import { ref, computed } from "vue";
import { W95Button, W95Input } from "vue-win95";
import { isZh } from "../i18n";

const display = ref("0");
const acc = ref<number | null>(null);
const op = ref<string | null>(null);
const fresh = ref(true);

function compute(a: number, b: number, o: string) {
  if (o === "+") return a + b;
  if (o === "-") return a - b;
  if (o === "*") return a * b;
  if (o === "/") return b === 0 ? NaN : a / b;
  return b;
}

function digit(d: string) {
  if (fresh.value) {
    display.value = d === "." ? "0." : d;
    fresh.value = false;
  } else if (d === "." && display.value.includes(".")) return;
  else display.value = display.value === "0" && d !== "." ? d : display.value + d;
}

function setOp(o: string) {
  const n = Number(display.value);
  if (acc.value !== null && op.value && !fresh.value) {
    acc.value = compute(acc.value, n, op.value);
    display.value = String(acc.value);
  } else acc.value = n;
  op.value = o;
  fresh.value = true;
}

function equals() {
  if (acc.value === null || !op.value) return;
  const n = Number(display.value);
  display.value = String(compute(acc.value, n, op.value));
  acc.value = null;
  op.value = null;
  fresh.value = true;
}

function clearAll() {
  display.value = "0";
  acc.value = null;
  op.value = null;
  fresh.value = true;
}

const keys = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];

function press(k: string) {
  if (k === "=") equals();
  else if (["+", "-", "*", "/"].includes(k)) setOp(k);
  else digit(k);
}

const label = computed(() => (isZh.value ? "计算器" : "Calculator"));
</script>

<template>
  <div class="font-w95 text-w95">
    <W95Input :model-value="display" :label="label" readonly class="mb-2 w-full" />
    <div class="grid grid-cols-4 gap-1">
      <W95Button v-for="k in keys" :key="k" class="min-w-0" @click="press(k)">{{ k }}</W95Button>
    </div>
    <W95Button class="mt-2 w-full" block @click="clearAll">
      {{ isZh ? "清除" : "Clear" }}
    </W95Button>
  </div>
</template>
