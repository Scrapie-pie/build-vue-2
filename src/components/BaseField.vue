<template>
  <label class="field">
    <span v-if="label" class="field__name">
      {{label}}
    </span>
    <div :class="`field__${type}`">

      <div class="field__action">
        <div class="field__fit">
          <input
            class="input"
            v-bind="$attrs"
            v-model="value"
          />
          <span
            v-if="placeholder"
            v-show="shownPlaceholder"
            class="field__placeholder"
          >
            {{placeholder}}
          </span>
        </div>
      </div>
    </div>
  </label>
</template>

<script>
export default {
  name: 'BaseField',
  //components: { DatePicker },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'text',
    },
    label: String,
    placeholder: String,
    options: Array,
  },
  data() {
    return {
      value: ''
    }
  },
  computed: {
    shownPlaceholder() {
      return !this.value.length;
    },
  },
  methods: {

  },
}
</script>

<style lang="scss">
.field {
  $field: &;

  &__state {
    cursor: pointer;
    user-select: none;
  }

  pointer-events: none;

  & > * {
    pointer-events: auto;
  }

  &__name {
    color: get-var(color, grey_dark);
    pointer-events: auto;
    width: min-content;
    cursor: pointer;
  }

  @include flex-it(column, 10px);

  &__action {
    display: flex;

  }

  &__checkbox {
    #{$field}__action {
      grid-gap: 12px;
    }
    font-weight: 300;
    font-size: 14px;
    line-height: 18px;
    color: get-var(color, grey_dark);
  }

  &__text, &__password, &__email {
    #{$field}__action {
      cursor: text;
      background-color: get-var(color, white);
      box-shadow: 0px 2px 10px rgb(0 0 0 / 5%);
      position: relative;
      border-left: 3px solid get-var(color, blue);

      display: flex;
      align-items: center;
      height: 50px;

      padding: 10px 25px;
      width: 100%;

      font-size: 20px;
      font-weight: 300;
    }

    #{$field}__fit {
      width: 100%;
      //height: 100%;
      overflow: hidden;
      position: relative;
    }

    #{$field}__placeholder {
      cursor: text;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      pointer-events: none;
    }

    .input {
      &[required] + #{$field}__placeholder {
        &:after {
          content: ' *';
          color: get-var(color, blue);
        }
      }
    }
  }

}
</style>
