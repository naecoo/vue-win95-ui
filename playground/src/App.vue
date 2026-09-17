<script setup lang="ts">
import { ref } from "vue";
import {
  W95Button,
  W95Input,
  W95Checkbox,
  W95Window,
  W95Dialog,
} from "vue-win95";

const name = ref("World");
const remember = ref(true);
const dialogOpen = ref(false);
const clicked = ref(0);
</script>

<template>
  <div class="min-h-screen p-8 flex flex-col items-start gap-6 bg-w95-desktop">
    <W95Window title="My First VB4 Program" :width="360">
      <p class="mb-3">Hello, {{ name }}!</p>

      <div class="flex flex-col gap-2 mb-3">
        <W95Input v-model="name" label="Your name" />
        <W95Checkbox v-model="remember" label="Remember me" />
      </div>

      <div class="flex gap-2 justify-end">
        <W95Button default @click="clicked++">OK</W95Button>
        <W95Button @click="dialogOpen = true">Cancel</W95Button>
      </div>

      <template #status>
        <p class="shadow-w95-status flex-1 px-[3px] py-0.5 m-0">
          Clicks: {{ clicked }}
        </p>
        <p class="shadow-w95-status flex-1 px-[3px] py-0.5 m-0">Press F1 for help</p>
      </template>
    </W95Window>

    <W95Window title="Component Gallery" :width="420">
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <W95Button>Normal</W95Button>
        <W95Button default>Default</W95Button>
        <W95Button disabled>Disabled</W95Button>
      </div>
      <div class="flex flex-col gap-2">
        <W95Input label="Occupation" placeholder="Engineer" />
        <W95Input label="Password" type="password" />
        <W95Input label="Disabled" model-value="Cannot edit" disabled />
      </div>
    </W95Window>

    <W95Dialog v-model="dialogOpen" title="Confirm" @confirm="dialogOpen = false">
      <p>Are you sure you want to cancel?</p>
    </W95Dialog>
  </div>
</template>
