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
.input {
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
      height: 100%;
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

  &__toggle {
    .input {
      display: none;
    }

    .input.checked ~ #{$field}__switcher {
      &:before {
        left: 100%;
        transform: translateY(-50%) translateX(calc(-100% - 3px));
      }
    }

    #{$field}__action {
      @include flex-it(row, 12px, true);
      padding: 10px 15px;
      background-color: white;
      border-radius: 4px;
      width: min-content;
    }

    #{$field}__switcher {
      width: 50px;
      height: 20px;
      border: 1px solid #BDD1E4;
      border-radius: 12px;
      position: relative;
      cursor: pointer;

      &:before {
        transition: .35s ease-in-out;
        content: '';
        position: absolute;
        min-width: 13px;
        min-height: 13px;
        max-width: 13px;
        max-height: 13px;
        background: #BDD1E4;
        border-radius: 50%;
        transform: translateY(-50%);
        left: 3px;
        top: 50%;
      }
    }

    #{$field}__state {
      font-size: 18px;
    }
  }

  &__date {
    input {
      max-width: 130px;
    }
  }

  &__time {
    input {
      max-width: 75px;
    }
  }
}
</style>
