<template>
  <form class="events-calendar__form" @submit.prevent="addEvent({name, date, status})">
    <h2>Добавить событие</h2>

    <div class="events-calendar__fields">
      <BaseInput type="text" placeholder="Введите текст события" v-model="name" :label="'Текст'" />
      <BaseInput type="date" v-model="date" :label="'Дата'" />
      <BaseSelect v-model="status" :options="statusOptions" :label="'Статус'"/>
    </div>

    <BaseInput type="checkbox"></BaseInput>
    <BaseInput type="radio"></BaseInput>
    <BaseTextarea label="asd" name="asd" placeholder="qwe">asdad</BaseTextarea>


    <!-- <BaseField type="checkbox" placeholder="govno"></BaseField>
    <BaseField type="date" placeholder="govno"></BaseField>
    <BaseField v-model="status" type="select" :options="statusOptions"></BaseField> -->

    <BaseButton type="submit">Сохранить</BaseButton>
  </form>
</template>

<script>
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';
import BaseSelect from './BaseSelect.vue';
import BaseField from './BaseField.vue';
import BaseTextarea from './BaseTextarea.vue';
export default {
  name: 'EventsCalendarForm',
  data() {
    return {
      name: '',
      date: '',
      status: 'low',
      statusOptions: [
        { text: 'Низкий', value: 'low' },
        { text: 'Средний', value: 'medium' },
        { text: 'Высокий', value: 'high' }
      ]
    }
	},
	methods: {
    addEvent(event) {
      event.date = event.date.split('-').reverse().join('.');
      let {d, m, y} = event;

      let isEventExist = !!this.$store.getters.EVENTS.filter(
        storeEvent => JSON.stringify(storeEvent) === JSON.stringify(event)
      ).length

      let isEventValid = !Object.values(event).filter(value => !value.length).length

      if (!isEventExist && isEventValid) {
        this.$store.dispatch('SAVE_EVENT', event);
      }
    }
	},
  components: {
    BaseInput,
    BaseButton,
    BaseSelect,
    BaseField,
    BaseTextarea
  }
}
</script>

<style lang="scss">
.events-calendar {
  &__form {
    @include flex-it(column);
    .button {
      @include to-responsive(margin-top, 10px, 45px);
      @media (min-width: get-var(breakpoint, xl) + 1px) {
        align-self: end;
      }
    }
  }
  &__fields {
    @include to-responsive(padding-top, 5px, 15px);
    @include flex-it(column, 10px);
  }
}
</style>
