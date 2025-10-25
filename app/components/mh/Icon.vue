<template>
  <component :is="iconComponent" :class="customClass" class="ml-1" />
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  class?: string;
}>();

const customClass = computed(() => props.class || "");

const svgModules = import.meta.glob("~/assets/images/icons/*.svg", {
  eager: true,
  import: "default",
});
const iconComponent = computed(() => {
  const path = `/assets/images/icons/${props.name}.svg`;
  return svgModules[path] || null;
});
</script>
