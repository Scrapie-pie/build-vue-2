<template>
  <BaseLabel :name="label">
    <template #left>
      <slot name="left"/>
    </template>
    <!-- <div v-if="hasSlot('left')" class="input-left">

    </div> -->

    <input
      class="input"
      :type="type"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
    >
    <template #right>
      <slot name="right"/>
    </template>
    <!-- <div v-if="hasSlot('right')" class="input-right">
      <slot name="right"/>
    </div> -->
  </BaseLabel>
</template>

<script>
import BaseLabel from './BaseLabel.vue';
export default {
  name: "BaseInput",
  inheritAttrs: false,
  props: {
    label: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: String
  },
  methods: {
    hasSlot(name) {
      return (name in this.$slots);
    }
  },
  computed: {

  },
  mounted() {

  },
  components: {
    BaseLabel
  }
}
</script>

<style lang="scss">
.input {
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  color: currentColor;
  outline: none;
  padding: 0;
  border: none;

  &[type="text"], &[type="password"], &[type="email"] {
    background-color: transparent;
    width: 100%;
    height: 100%;
    cursor: text;
  }

  &[type="checkbox"] {
    $size: 16px;
    background-color: transparent;
    max-width:  $size;
    max-height: $size;
    min-width:  $size;
    min-height: $size;
    margin: 0;
  }
}
</style>
