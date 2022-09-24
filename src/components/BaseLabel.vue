<template>
  <label class="label">
    <span class="label-name" v-if="name">{{ name }}</span>
    <div class="label-content">
       <div v-if="$slots.left" class="label-content-left"> <!-- rm class -->
        <slot name="left"></slot>
      </div>
      <div class="label-content-main">
        <slot></slot>
      </div>
      <div v-if="$slots.right" class="label-content-right"> <!-- rm class -->
        <slot name="right"></slot>
      </div>
    </div>
  </label>
</template>

<script>

export default {
  name: "BaseLabel",
  props: {
    name: String
  },
  inheritAttrs: false
}
</script>

<style lang="scss">
.label {
  @include flex-it(column, 5px);
  display: inline-flex; // add to flex-it

  &-name {
    @include h(5, $weight: 500);
  }

  &-content {
    @include flex-it(row, 10px);
    * {
      display: flex;
    }
  }

  @media (min-width: get-var(breakpoint, xl) + 1px) {
    align-items: flex-end;
  }
}
</style>
