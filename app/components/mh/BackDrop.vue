<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="modelValue"
        class="bg-primary fixed w-full h-full opacity-80 inset-0"
        :class="{
          [zIndexDefault]: true,
        }"
        @click="$emit('update:modelValue', false)"
      ></div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  zIndex?: string;
}>();
defineEmits(["update:modelValue"]);

const zIndexDefault = computed(() => {
  if (props.zIndex) return props.zIndex;
  return "z-40";
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease all;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>