<template>
  <div ref="target" class="mh-dropdown absolute z-[101]">
    <transition name="dropdown">
      <div
        v-if="props.modelValue"
        class="mh-dropdown__list"
        :class="{ [listClass]: true }"
      >
        <slot />
      </div>
    </transition>
    <MhBackDrop v-model="props.modelValue" />
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useLockBody } from "~/hooks/useLockBody";

const target = ref<HTMLElement | null>(null);
const { lock, unlock } = useLockBody();
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    listClass?: string;
  }>(),
  {
    listClass: "",
  }
);
const $emit = defineEmits(["update:modelValue"]);
onClickOutside(target, () => $emit("update:modelValue", false));

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      lock();
    } else {
      unlock();
    }
  }
);
</script>

<style lang="scss" scoped>
.mh-dropdown {
  &__list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    transform-origin: top;
    transition: transform 0.2s ease-in-out;
    overflow: hidden;
    z-index: 101;
    li {
      padding: 10px;
      background: white;
      border-bottom: solid thin #eee;
      border-left: solid medium #cbc;
    }

    &::after {
      content: "";
      width: 15px;
      height: 15px;
      background: #fff;
      position: absolute;
      transform: rotate(45deg);
      top: -7px;
      left: 50%;
      z-index: 10;
      transform: translateX(-50%) rotate(45deg);
    }
  }
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: scaleY(0);
}
</style>