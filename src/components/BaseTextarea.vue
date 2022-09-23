<template>
  <BaseLabel :name="label">
    <textarea
      :class='`textarea`'
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
    />
  </BaseLabel>
</template>

<script>
import BaseLabel from './BaseLabel.vue';
export default {
  name: "BaseTextarea",
  inheritAttrs: false,
  props: {
    label: String,
  },
  components: {
    BaseLabel
  }
}
</script>
