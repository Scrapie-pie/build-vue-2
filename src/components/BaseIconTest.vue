<template>
  <!-- <component :is="currentComponent" :class="`icon`"/> -->
  <currentComponent></currentComponent>
</template>

<script>
//const folderPath = '~/src/icons/actualtest/';
//import ArrowLeft from '../assets/icons/arrow-left.svg';
//const icons = require('../assets/icons/arrow-left.svg');
//import '~/src/icons/actualtest/generated/style.css';
export default {
  name: 'BaseIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
  },

  components: {
    // ...Object.fromEntries(icons.map(icon => [
    //   toComponentName(icon),
    //   () => import(`~/src/icons/actualtest/${icon}.svg`)
    // ]))

    currentComponent: () => import(`../assets/icons/${this.icon}.svg`)
  },
  computed: {
    // currentComponent() {
    //   //return toComponentName(this.icon);
    // },
  },

  mounted() {
    //console.log(icons);
  }
};

// function capitalize(string) {
//   return string[0].toUpperCase() + string.slice(1);
// };
//
// function toComponentName(name) {
//   return 'Icon' + name.split(/[-|_]/).map(chunk => capitalize(chunk)).join('');
// }
</script>

<style lang="scss">
.icon {

  //color: #000000;
  //font-size: 22px; // icon_name
  max-width: 1em;
  min-width: 1em;
  width: 100%;

}

</style>
