<template>
  <div class="events-calendar__month">
    <div class="events-calendar__month-wrapper">
      <BaseButton :subClass="'arrow'" @click.native="$emit('lastMonth')">
        <ArrowLeft />
      </BaseButton>
      <span class="events-calendar__name">
        {{month}}
      </span>
      <BaseButton :subClass="'arrow'" @click.native="$emit('nextMonth')">
        <ArrowRight />
      </BaseButton>
    </div>
    <span class="events-calendar__year" v-if='year !== initialYear'>
      {{year}}
    </span>
  </div>
</template>

<script>
const moment = require('moment');
import ArrowLeft from '../assets/icons/arrow-left.svg';
import ArrowRight from '../assets/icons/arrow-right.svg';
import BaseButton from './BaseButton.vue';

export default {
  name: 'EventsCalendarMonth',
  props: {
    month: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    initialYear: {
      type: String,
      required: true
    }
  },
  components: {
    ArrowLeft,
    ArrowRight,
    BaseButton
  }
}
</script>

<style lang="scss">
.events-calendar {
  &__month {
    @include flex-it(row, 10px);
    align-items: center;
    margin-bottom: 30px;
    @media (max-width: get-var(breakpoint, xl)) {
      flex-direction: column;
    }
  }
  &__month-wrapper {
    @include flex-it(row, 20px);
    align-items: center;
  }
  &__name {
    text-transform: capitalize;
    @include h(2, $weight: 700);
  }
}
</style>
