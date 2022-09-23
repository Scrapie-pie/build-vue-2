<template>
  <BaseLabel :name="label">
    <input
      class="input"
      :type="type"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
    >
  </BaseLabel>
</template>

<script>
import BaseLabel from './BaseLabel.vue';
export default {
  name: "BaseInput",
  inheritAttrs: false,
  props: {
    label: String,
    type: String,
    placeholder: String
  },
  components: {
    BaseLabel
  }
}
</script>
