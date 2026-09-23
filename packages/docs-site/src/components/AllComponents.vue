<script setup lang="ts">
import { ref, computed, h, defineComponent } from "vue";
import { isZh } from "../i18n";
import * as Win95 from "vue-win95";
import { docs, type ComponentDoc } from "./component-docs";

const W95Dialog = (Win95 as any).W95Dialog;

const openName = ref<string | null>(null);
const modalOpen = ref(false);
const tab = ref<"guide" | "api">("guide");

function showDetail(name: string) {
  openName.value = name;
  modalOpen.value = true;
  tab.value = "guide";
}

function hideDetail() {
  modalOpen.value = false;
  openName.value = null;
}

const current = computed(() => docs.find((d) => d.name === openName.value));

const groups = [
  { key: "basics", zh: "基础", en: "Basics" },
  { key: "form", zh: "表单", en: "Form" },
  { key: "container", zh: "容器", en: "Container" },
  { key: "nav", zh: "导航", en: "Navigation" },
  { key: "overlay", zh: "浮层", en: "Overlay" },
  { key: "data", zh: "数据", en: "Data" },
];

const cardStyle =
  "min-width:140px;min-height:36px;border:0;background:#c0c0c0;box-shadow:inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px #808080,inset 2px 2px #dfdfdf;font-family:inherit;font-size:13px;cursor:default;padding:4px 8px";

const th =
  "border:1px solid #808080;background:#c0c0c0;padding:4px 8px;text-align:left;font-size:12px";
const td = "border:1px solid #808080;padding:4px 8px;font-size:12px;vertical-align:top";

function LiveDemo(props: { doc?: ComponentDoc }) {
  const live = props.doc?.demos?.find((d) => d.live)?.live;
  if (!live) return null;
  const comp = (Win95 as any)[live.comp];
  if (!comp) return null;
  return h(
    "div",
    {
      style:
        "background:#008080;padding:12px;margin:8px 0;box-shadow:inset -1px -1px #fff,inset 1px 1px #808080,inset -2px -2px #dfdfdf,inset 2px 2px #0a0a0a",
    },
    [
      h(
        "div",
        {
          style:
            "color:#fff;font-weight:bold;font-size:12px;margin-bottom:8px;font-family:'Pixelated MS Sans Serif',sans-serif",
        },
        "LIVE"
      ),
      h(comp, { ...(live.props || {}) }, () => live.text),
    ]
  );
}

const LiveDemoComp = defineComponent({
  props: ["doc"],
  setup(props) {
    return () => h(LiveDemo, { doc: props.doc as ComponentDoc });
  },
});
</script>

<template>
  <div class="w95-md" style="font-size: 14px; line-height: 1.55">
    <template v-if="isZh">
      <h1>全部组件</h1>
      <p>点击卡片查看<strong>完整说明</strong>：用途、示例、属性、事件与插槽。</p>
    </template>
    <template v-else>
      <h1>All Components</h1>
      <p>Click a card for the <strong>full guide</strong>: usage, examples, props, events, and slots.</p>
    </template>

    <template v-for="g in groups" :key="g.key">
      <h3 style="margin: 16px 0 8px">{{ isZh ? g.zh : g.en }}</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 12px">
        <button
          v-for="item in docs.filter((d) => d.group === g.key)"
          :key="item.name"
          type="button"
          class="w95-focus"
          :style="cardStyle"
          @click="showDetail(item.name)"
        >
          {{ item.name.replace(/^W95/, "") }}
        </button>
      </div>
    </template>

    <W95Dialog
      :model-value="modalOpen"
      :title="current ? (isZh ? current.title.zh : current.title.en) : ''"
      :width="720"
      size="lg"
      @update:model-value="hideDetail"
      @close="hideDetail"
    >
      <div v-if="current" style="font-size: 14px; line-height: 1.55; max-height: 62vh; overflow: auto">
        <!-- tabs -->
        <div style="display: flex; gap: 4px; margin-bottom: 12px">
          <button
            type="button"
            class="w95-focus"
            :style="cardStyle + (tab === 'guide' ? ';box-shadow:inset -1px -1px #fff,inset 1px 1px #0a0a0a,inset -2px -2px #dfdfdf,inset 2px 2px #808080;padding-top:6px' : '')"
            @click="tab = 'guide'"
          >
            {{ isZh ? "指南" : "Guide" }}
          </button>
          <button
            type="button"
            class="w95-focus"
            :style="cardStyle + (tab === 'api' ? ';box-shadow:inset -1px -1px #fff,inset 1px 1px #0a0a0a,inset -2px -2px #dfdfdf,inset 2px 2px #808080;padding-top:6px' : '')"
            @click="tab = 'api'"
          >
            API
          </button>
        </div>

        <!-- Guide -->
        <template v-if="tab === 'guide'">
          <p style="margin: 0 0 12px">
            <code style="font-weight: bold">{{ current.name }}</code>
            — {{ isZh ? current.desc.zh : current.desc.en }}
          </p>

          <template v-if="current.when.zh.length">
            <h4 style="margin: 12px 0 6px">{{ isZh ? "何时使用" : "When to use" }}</h4>
            <ul style="margin: 0 0 12px; padding-left: 1.2em">
              <li v-for="(w, i) in (isZh ? current.when.zh : current.when.en)" :key="i">{{ w }}</li>
            </ul>
          </template>

          <template v-for="(demo, i) in current.demos" :key="i">
            <h4 style="margin: 12px 0 6px">{{ isZh ? demo.title.zh : demo.title.en }}</h4>
            <LiveDemoComp :doc="current" v-if="i === 0" />
            <pre
              style="background:#fff;box-shadow:inset -1px -1px #fff,inset 1px 1px #808080,inset -2px -2px #dfdfdf,inset 2px 2px #0a0a0a;padding:10px;overflow:auto;font-size:12px;margin:0 0 12px"
            ><code>{{ demo.code }}</code></pre>
          </template>

          <p v-if="current.a11y" style="margin: 12px 0 0">
            <b>{{ isZh ? "无障碍" : "Accessibility" }}：</b>
            {{ isZh ? current.a11y.zh : current.a11y.en }}
          </p>
        </template>

        <!-- API -->
        <template v-else>
          <h4 style="margin: 0 0 6px">Props</h4>
          <table style="border-collapse: collapse; width: 100%; margin: 0 0 16px; background: #fff">
            <thead>
              <tr>
                <th :style="th">{{ isZh ? "名称" : "Name" }}</th>
                <th :style="th">{{ isZh ? "说明" : "Description" }}</th>
                <th :style="th">Type</th>
                <th :style="th">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in current.props" :key="p.name">
                <td :style="td"><code>{{ p.name }}</code></td>
                <td :style="td">{{ isZh ? p.desc.zh : p.desc.en }}</td>
                <td :style="td"><code>{{ p.type }}</code></td>
                <td :style="td"><code>{{ p.def }}</code></td>
              </tr>
              <tr v-if="!current.props.length">
                <td :style="td" colspan="4">{{ isZh ? "无属性" : "No props" }}</td>
              </tr>
            </tbody>
          </table>

          <h4 style="margin: 0 0 6px">Events</h4>
          <table style="border-collapse: collapse; width: 100%; margin: 0 0 16px; background: #fff">
            <thead>
              <tr>
                <th :style="th">{{ isZh ? "名称" : "Name" }}</th>
                <th :style="th">{{ isZh ? "说明" : "Description" }}</th>
                <th :style="th">{{ isZh ? "参数" : "Params" }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="e in current.events" :key="e.name">
                <td :style="td"><code>{{ e.name }}</code></td>
                <td :style="td">{{ isZh ? e.desc.zh : e.desc.en }}</td>
                <td :style="td"><code>{{ e.params }}</code></td>
              </tr>
              <tr v-if="!current.events.length">
                <td :style="td" colspan="3">{{ isZh ? "无事件" : "No events" }}</td>
              </tr>
            </tbody>
          </table>

          <h4 style="margin: 0 0 6px">Slots</h4>
          <table style="border-collapse: collapse; width: 100%; margin: 0; background: #fff">
            <thead>
              <tr>
                <th :style="th">{{ isZh ? "名称" : "Name" }}</th>
                <th :style="th">{{ isZh ? "说明" : "Description" }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in current.slots" :key="s.name">
                <td :style="td"><code>{{ s.name }}</code></td>
                <td :style="td">{{ isZh ? s.desc.zh : s.desc.en }}</td>
              </tr>
              <tr v-if="!current.slots.length">
                <td :style="td" colspan="2">{{ isZh ? "无插槽" : "No slots" }}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    </W95Dialog>
  </div>
</template>
