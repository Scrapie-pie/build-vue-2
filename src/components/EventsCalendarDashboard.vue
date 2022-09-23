<template>
  <div class="events-calendar__dashboard">
    <EventsCalendarMonth
      :month='monthName'
      :year='year'
      :initialYear='initialYear'
      @lastMonth='lastMonth'
      @nextMonth='nextMonth'
    />

    <div class="events-calendar__days">
      <div class="events-calendar__day-name" v-for="name in dayNames">{{name}}</div>

      <EventsCalendarDay
        v-for="blank in blanksBefore"
        :type="'blank'"
        :isDisabled='isBlanksBeforeDisabled'
      />

      <EventsCalendarDay
        v-for="date in daysInMonth"
        :type="'date'"
        :date='date'
        :events='getEventsByDate(date)'
        :isToday='checkToday(date)'
        :isDisabled='disableDate(date)'
        :isEventsDisplayedFull='isEventsDisplayedFull(date)'
      />

      <EventsCalendarDay
        v-for="blank in blanksAfter"
        :type="'blank'"
        :isDisabled='isBlanksAfterDisabled'
      />
    </div>
  </div>
</template>

<script>
const moment = require('moment');
import ArrowLeft from '../assets/icons/arrow-left.svg';
import ArrowRight from '../assets/icons/arrow-right.svg';
import EventsCalendarDay from './EventsCalendarDay';
import EventsCalendarMonth from './EventsCalendarMonth';

export default {
  name: 'EventsCalendar',
  data() {
    return {
      todayContext: moment(),
      dateContext: moment(),
      date: '',
      dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    }
	},
	methods: {
    getEventsByDate(date) {
      return this.$store.getters.EVENTS_BY_DATE(this.formatDate(date), this.month, this.year);
    },
    formatDate(date) {
      date = String(date);
      return date.length < 2 ? '0' + date : date;
    },
    checkToday(date) {
      return date == this.initialDate && this.month == this.initialMonth && this.year == this.initialYear;
    },
    disableDate(date) {
      return (
        date < this.initialDate && this.month == this.initialMonth && this.year == this.initialYear
        || this.month < this.initialMonth && this.year <= this.initialYear
      );
    },
    isEventsDisplayedFull(date) {
      let t = this;
      let datePosition = t.blanksBefore + date;
      let rowNum = Math.floor((datePosition - 1) / 7) + 1;
      let cellsOnRight = rowNum * 7 - datePosition;
      let lastDateInRow = date + cellsOnRight;

      let IsDisplayedFull = !t.events.filter(event => {
        let [d, m, y] = event.date.split('.');
        d = Number(d);
        return m == t.month && y == t.year && d > date && d <= lastDateInRow;
      }).length

      return IsDisplayedFull;
    },

    nextMonth() {
      this.dateContext = moment(this.dateContext).add(1, 'month');
    },
    lastMonth() {
      this.dateContext = moment(this.dateContext).subtract(1, 'month');
    },
	},
	computed: {
    events() {
      return this.$store.getters.EVENTS;
    },
  	year() {
      return this.dateContext.format('YYYY');
    },
    month() {
      return this.dateContext.format('MM');
    },
    monthName() {
      return this.dateContext.lang('ru').format('MMMM');
    },
    currentDate() {
      return this.dateContext.get('date');
    },
    initialYear() {
      return this.todayContext.format('YYYY');
    },
    initialMonth() {
      return this.todayContext.format('MM');
    },
    initialDate() {
      return this.todayContext.get('date');
    },
    daysInMonth() {
      return this.dateContext.daysInMonth();
    },
    blanksBefore() {
      let blanks = moment(this.dateContext).subtract((this.currentDate - 1), 'days');
      return blanks.weekday();
    },
    isBlanksBeforeDisabled() {
      if (this.month == this.initialMonth && this.year == this.initialYear) {
         return true;
      }
      let blank = moment(this.dateContext).subtract((this.currentDate - 1), 'days');
      return moment(this.todayContext).unix() > moment(blank).unix();
    },
    blanksAfter() {
      let filledCells = this.daysInMonth + this.blanksBefore;
      let totalCells = filledCells <= 35 ? 35 : 42;
      return totalCells - filledCells;
    },
    isBlanksAfterDisabled() {
      if (this.month < this.initialMonth && this.year <= this.initialYear) {
        return moment(this.dateContext).unix() < moment(this.todayContext).unix();
      }
      return false;
    },
  },
  components: {
    ArrowLeft,
    ArrowRight,
    EventsCalendarDay,
    EventsCalendarMonth,
  }
}
</script>

<style lang="scss">
.events-calendar {
  &__days {
    @include to-responsive(gap, 1px, 5px);
    display: grid;
    grid-template-columns: repeat(7, minmax(30px, 170px));
    flex-wrap: wrap;
  }

  &__day-name {
    @include h(6, $weight: 700);
  }
}
</style>
