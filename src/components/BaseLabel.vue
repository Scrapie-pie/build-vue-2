<template>
  <label class="label">
    <span class="label__name" v-if="name">{{ name }}</span>
    <slot></slot>
  </label>
</template>

<script>

export default {
  name: "BaseLabel",
  props: {
    name: String,
  }
}
</script>

<style lang="scss">
.label {
  @include flex-it(column, 5px);

  &__name {
    @include h(5, $weight: 500);
  }

  @media (min-width: get-var(breakpoint, xl) + 1px) {
    align-items: flex-end;
  }
}
</style>
