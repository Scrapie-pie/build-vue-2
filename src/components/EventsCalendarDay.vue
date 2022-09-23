<template>
  <div
    v-if="type === 'blank'"
    class="events-calendar__day"
    :class="{'events-calendar__day--disabled': isDisabled}"
  />

  <div
    v-else-if="type === 'date'"
    class="events-calendar__day"
    :class="{
      'events-calendar__day--today': isToday,
      'events-calendar__day--disabled': isDisabled
     }"
  >
    <div class="events-calendar__date">{{date}}</div>
    <div class="events-calendar__events">
      <div
        v-for='event in events'
        :key='event.name'
        :class='[
          `events-calendar__event`,
          `events-calendar__event--${event.status}`,
          {"events-calendar__event--full": isEventsDisplayedFull}
        ]'
      >
        {{event.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventsCalendarDay',
  props: {
    type: {
      type: String,
      required: true
    },
    date: [Number, String],
    events: Array,
    isToday: Boolean,
    isDisabled: Boolean,
    isEventsDisplayedFull: Boolean
  }
}
</script>

<style lang="scss">
.events-calendar {
  $self: &;

  &__date {
    @include h(4, get-var(color, dark), 700);
    align-self: end;
  }

  &__day {
    @include flex-it(column, 5px);
    min-height: to-unit(120px, em);
    padding: 6px;
    align-items: center;
    border: 1px solid get-var(color, grey_dark);
    border-radius: 5px;
    background-color: get-var(color, white);
    &:nth-child(7n + 6), &:nth-child(7n + 7) {
      #{$self}__date {
        color: get-var(color, blue);
      }
    }
  }

  &__day--disabled {
    background-color: get-var(color, grey);
    #{$self}__date {
      color: rgba(get-var(color, dark), 0.5);
    }
    &:nth-child(7n + 6), &:nth-child(7n + 7) {
      #{$self}__date {
        color: rgba(get-var(color, blue), 0.5)
      }
    }
  }

  &__day--today &__date {
    color: get-var(color, today)!important;
  }

  &__events {
    width: 100%;
    @include flex-it(column, 5px);
    @media(max-width: get-var(breakpoint, xl)) {
      gap: 0;
    }
  }

  &__event {
    @include truncate(1);
    min-width: 100%;
    padding: 2px 7px;
    border-radius: 3px;
    font-size: 11px;
    white-space: nowrap;
    &--low {
      color: get-var(color, low_font);
      background-color: get-var(color, low_bg);
    }
    &--medium {
      color: get-var(color, medium_font);
      background-color: get-var(color, medium_bg);
    }
    &--high {
      color: get-var(color, high_font);
      background-color: get-var(color, high_bg);
    }
    &--full {
      @media (min-width: get-var(breakpoint, xl) + 1px) {
        width: fit-content;
        z-index: 2;
      }
    }
  }
}

</style>
