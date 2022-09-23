<template>
  <div id="app">
    <TheHeader></TheHeader>
    <main>


    </main>
  </div>
</template>

<script>
// import EventsCalendar from './components/EventsCalendar.vue';
import TheHeader from './components/TheHeader.vue';
//import ArrowLeft from './assets/icons/arrow-left.svg';
//import BaseIcon from './components/BaseIcon.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    //ArrowLeft,
    //BaseIcon
  }
}
</script>

<style lang="scss">
@import './assets/scss/style';
#app {
  overflow: hidden;
}
</style>
