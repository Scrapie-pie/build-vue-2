<template>
  <label class="field">
    <span v-if="label" class="field__name">
      {{label}}
    </span>
    <div :class="`field__${type}`">

      <div v-if="typeMatched(types.textable)" class="field__action">
        <div class="field__fit">
          <input
            class="input"
            :type="inputType"
            v-bind="$attrs"
            v-model="value"
          />
          <span
            v-if="placeholder"
            v-show="shownPlaceholder"
            class="field__placeholder">
            {{placeholder}}
          </span>
        </div>
      </div>

      <div v-else-if="typeMatched(types.checkable)" class="field__action">
        <input
          :class="['input', { checked }]"
          :type="inputType"
          v-bind="$attrs"
          v-model="checked"
        />
        <span v-if="typeMatched('toggle')" class="field__state" @click.prevent="onClickState('off')">онлайн</span>
        <span v-if="typeMatched('toggle')" class="field__switcher"/>
        <span v-if="typeMatched('toggle')" class="field__state" @click.prevent="onClickState('on')">оффлайн</span>

        <span>
          <slot v-if="typeMatched(['checkbox', 'radio'])"></slot>
        </span>

      </div>

      <div v-else-if="typeMatched(types.timeable)" class="field__action">
        <div class="field__fit">
          <input
            class="input"
            :type="inputType"
            v-bind="$attrs"
            v-model="value"
          />
          <span
            v-if="placeholder"
            v-show="shownPlaceholder"
            class="field__placeholder">
            {{placeholder}}
          </span>
        </div>
      </div>

      <div v-else-if="typeMatched(types.selectable)" class="field__action">
        <select
          :class='`select`'
        >
          <option v-for="option in options" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>

    </div>
  </label>
</template>

<script>
// import DatePicker from 'vue2-datepicker';
// import 'vue2-datepicker/index.css';
// import 'vue2-datepicker/locale/ru';

const types = {
  textable: ['text', 'password', 'email'],
  checkable: ['checkbox', 'radio', 'toggle'],
  timeable: ['date', 'datetime', 'time'],
  selectable: ['select']
}

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
    const data = {};
    const [modelKey, modelValue] = this.getVModelEntry();
    const isTime = this.type === 'time';

    //data[modelKey] = isTime ? '12:00' : modelValue;
    data[modelKey] = modelValue;
    data.types = types;

    // if (modelKey === 'time') {
    //   data.icon = isTime ? 'clock' : 'calendar'
    //   data.options = {
    //     type: isTime ? 'time' : 'date',
    //     format: isTime ? 'HH:mm' : 'MM.DD.YYYY',
    //     placeholder: isTime ? null : 'xx.xx.xxxx',
    //     valueType: "format",
    //     editable: false,
    //     clearable: false,
    //   }
    // }

    return data;
  },
  computed: {
    inputType() {
      return this.type === 'toggle' ? 'checkbox' : this.type;
    },
    shownPlaceholder() {
      return !this.value.length;
    },
    timeProps() {
      return Object.assign(this.$attrs, this.options);
    }
  },
  methods: {
    typeMatched(subSetTypes) {
      subSetTypes = typeof(subSetTypes) === 'string' ? subSetTypes.split() : subSetTypes;
      return subSetTypes.includes(this.type);
    },
    onClickState(state) {
      this.checked = state === 'on';
    },
    getVModelEntry() {
      const t = types;
      const tm = this.typeMatched;
      if (tm(t.textable))  return ['value', ''];
      if (tm(t.checkable)) return ['checked', false];
      //if (tm(t.timeable))  return ['time', null];
      if (tm(t.timeable))  return ['value', ''];
      if (tm(t.selectable))  return ['selected', ''];
    },
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

.mx {
  $bg: get-var(color, white);
  $pref: &;

  &-datepicker {
    //width: 100%;
    cursor: pointer;
    width: auto;
    svg {
      width: 100%;
      height: auto;
      vertical-align: 0;
      color: get-var(color, light);
    }
  }
  &-input-wrapper {
    display: flex;
    align-items: center;
    background-color: $bg;

    border: 0;
    border-radius: 4px;
  }
  &-input {
    background-color: $bg;
    font-size: 18px;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    color: black;
    cursor: pointer;
    padding: 10px 15px;

    &::placeholder {
      color: black;
      opacity: 1;
      letter-spacing: 0.2px;
    }

    &:disabled {
      background-color: inherit;
      color: currentColor;
      cursor: default;

      & + i {
        cursor: default;
      }
    }
  }
  &-icon {
    &-calendar, &-clear {
      @include flex-centralize;
      position: relative;
      top: auto;
      right: auto;
      transform: none;
      line-height: 0;
      max-width: 42px;
      max-height: 42px;
      min-width: 42px;
      min-height: 42px;
      border-left: 1px solid get-var(color, grey);
      padding: 5px 5px;
    }
  }
}
</style>
