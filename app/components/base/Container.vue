<template>
  <div class="mystays-container max-w-7xl mx-auto px-4 lg:px-0" v-on="$attrs">
    <slot></slot>
  </div>
</template>
  
  <script>
export default {
  name: "Container",
};
</script>
  
<style lang="scss" scoped >
.mstays-container {
  width: 100%;

  @include min-sm {
    width: 720px;
  }

  @include min-lg {
    width: 960px;
  }

  @include min-xl {
    width: 1110px;
  }

  @include min-xxl {
    width: 1280px;
  }
}
</style>
  