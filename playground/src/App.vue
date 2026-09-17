<script setup lang="ts">
import { ref } from "vue";
import {
  W95Button,
  W95Input,
  W95Checkbox,
  W95Radio,
  W95RadioGroup,
  W95Select,
  W95Slider,
  W95ProgressBar,
  W95GroupBox,
  W95FieldRow,
  W95StatusBarField,
  W95Divider,
  W95Window,
  W95Dialog,
  W95Tabs,
  W95TabList,
  W95Tab,
  W95TabPanel,
  W95MenuBar,
  W95MenuItem,
  W95Toolbar,
  W95Tree,
  W95TreeItem,
  W95Splitter,
} from "vue-win95";

const name = ref("World");
const remember = ref(true);
const dialogOpen = ref(false);
const clicked = ref(0);
const pb = ref("smooth");
const rating = ref("3");
const volume = ref(5);
const progress = ref(40);
const tab = ref("desktop");
const treeSel = ref("css");

const ratingOptions = [
  { value: "5", label: "5 - Incredible!" },
  { value: "4", label: "4 - Great!" },
  { value: "3", label: "3 - Pretty good" },
  { value: "2", label: "2 - Not so great" },
  { value: "1", label: "1 - Unfortunate" },
];
</script>

<template>
  <div class="min-h-screen p-8 flex flex-col items-start gap-6 bg-w95-desktop w95-root">
    <W95Window title="My First VB4 Program" :width="360">
      <p class="mb-3">Hello, {{ name }}!</p>

      <div class="flex flex-col gap-2 mb-3">
        <W95Input v-model="name" label="Your name" />
        <W95Checkbox v-model="remember" label="Remember me" />
      </div>

      <W95Divider class="my-3" />

      <div class="flex gap-2 justify-end">
        <W95Button default @click="clicked++">OK</W95Button>
        <W95Button @click="dialogOpen = true">Cancel</W95Button>
      </div>

      <template #status>
        <W95StatusBarField>Clicks: {{ clicked }}</W95StatusBarField>
        <W95StatusBarField>Press F1 for help</W95StatusBarField>
      </template>
    </W95Window>

    <W95Window title="P0 Gallery" :width="440">
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <W95Button>Normal</W95Button>
        <W95Button default>Default</W95Button>
        <W95Button disabled>Disabled</W95Button>
      </div>

      <W95GroupBox legend="Peanut butter" class="mb-3">
        <W95RadioGroup v-model="pb" name="pb">
          <W95Radio value="smooth" label="Should be smooth" />
          <W95Radio value="crunchy" label="Crunchy is good" />
        </W95RadioGroup>
      </W95GroupBox>

      <div class="flex flex-col gap-2 mb-3">
        <W95Select v-model="rating" :options="ratingOptions" label="Rating" />
        <W95Slider v-model="volume" :min="1" :max="11" label="Volume:" />
        <W95FieldRow>
          <span class="w-16">Progress</span>
          <W95ProgressBar :value="progress" class="flex-1" />
        </W95FieldRow>
      </div>

      <W95Divider class="my-3" />

      <div class="flex items-center gap-3">
        <span>PB: {{ pb }} · Rate: {{ rating }} · Vol: {{ volume }}</span>
        <W95Button @click="progress = (progress + 20) % 120">+20%</W95Button>
      </div>
    </W95Window>

    <W95Window title="Navigation" :width="440">
      <W95MenuBar class="mb-2 -mt-1 -mx-1">
        <W95MenuItem>File</W95MenuItem>
        <W95MenuItem>Edit</W95MenuItem>
        <W95MenuItem>View</W95MenuItem>
        <W95MenuItem disabled>Help</W95MenuItem>
      </W95MenuBar>
      <W95Toolbar class="mb-2 -mx-1">
        <W95Button>New</W95Button>
        <W95Button>Open</W95Button>
        <W95Button>Save</W95Button>
      </W95Toolbar>

      <W95Tabs v-model="tab" class="mb-2">
        <W95TabList>
          <W95Tab value="desktop">Desktop</W95Tab>
          <W95Tab value="computer">My computer</W95Tab>
          <W95Tab value="panel">Control panel</W95Tab>
        </W95TabList>
        <W95TabPanel value="desktop">Desktop background settings.</W95TabPanel>
        <W95TabPanel value="computer">Drives and devices.</W95TabPanel>
        <W95TabPanel value="panel">System configuration.</W95TabPanel>
      </W95Tabs>

      <div class="flex gap-2">
        <W95Tree v-model="treeSel" class="w-[180px]">
          <W95TreeItem value="toc" label="Table of Contents" />
          <W95TreeItem value="css" label="CSS" has-children>
            <W95TreeItem value="selectors" label="Selectors" />
            <W95TreeItem value="specificity" label="Specificity" />
          </W95TreeItem>
          <W95TreeItem value="js" label="JavaScript" />
        </W95Tree>
        <W95Splitter vertical :min="160" :max="280" />
        <div class="flex-1 bg-w95-highlight shadow-w95-field p-2 font-w95 text-w95">
          Selected: {{ treeSel }}
        </div>
      </div>
    </W95Window>

    <W95Dialog v-model="dialogOpen" title="Confirm" @confirm="dialogOpen = false">
      <p>Are you sure you want to cancel?</p>
    </W95Dialog>
  </div>
</template>
