<template>
  <div class="events-calendar">
    <div class="events-calendar__container">
      <EventsCalendarDashboard />
      <EventsCalendarForm />
    </div>
  </div>
</template>

<script>
import EventsCalendarDashboard from './EventsCalendarDashboard.vue';
import EventsCalendarForm from './EventsCalendarForm.vue';

export default {
  name: 'EventsCalendar',
  components: {
    EventsCalendarDashboard,
    EventsCalendarForm
  }
}
</script>

<style lang="scss">
.events-calendar {
  &__container {
    @include flex-it(row);
    @include to-responsive(gap, 15px, 30px);
    justify-content: space-between;

    @media(max-width: get-var(breakpoint, xl)) {
      flex-direction: column;
    }
  }
}
</style>
