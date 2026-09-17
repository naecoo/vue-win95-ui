<script setup lang="ts">
import { computed, provide, ref, watch } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    class?: string;
  }>(),
  {
    modelValue: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
}>();

const uid = useId("w95-tabs");
const active = ref<string | number | undefined>(props.modelValue);

watch(
  () => props.modelValue,
  (v) => {
    active.value = v;
  }
);

function select(id: string | number) {
  active.value = id;
  emit("update:modelValue", id);
}

provide(
  "w95-tabs",
  computed(() => ({
    uid: uid.value,
    active: active.value,
    select,
  }))
);

const rootClasses = computed(() => cn("font-w95 text-w95 text-w95-text", props.class));
</script>

<template>
  <div :class="rootClasses">
    <slot />
  </div>
</template>
