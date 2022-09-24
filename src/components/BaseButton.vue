<template>
  <button class="button" :class="postClass">
    <slot name="icon" />
    <slot />
  </button>
</template>

<script>

export default {
  name: 'BaseButton',
  data() {
    return {

    }
  },
  props: {
    subClass: {
      type: String,
      validator: (value) => ['primary', 'arrow'].includes(value),
      default: 'primary'
    }
  },
  computed: {
    postClass() {
      return this.subClass ? `button--${this.subClass}` : null;
    }
  }
}
</script>

<style lang="scss">
.button {
  @include flex-centralize;
  cursor: pointer;
  border: none;

  &--primary {
    @include h(5);
    width: 220px;
    padding: 7px 15px;
    border-radius: 7px;
    color: get-var(color, white);
    background: get-var(color, blue_light);
  }

  &--arrow {
    $size: 44px;
    max-width: $size;
    max-height: $size;
    min-width: $size;
    min-height: $size;
    width: $size;
    height: $size;
    background: #EEEEEE;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px -1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
  }
}
</style>
