<template>
  <svg class="sprite-icon" :class="`v-icon_${name}`" role="presentation">
    <use :xlink:href="src"></use>
    <!-- <component :is="componentName"></component> -->
  </svg>

        <!-- svg.sprite-icon(

            :class="v-icon_${name}"
            role="presentation"): use( :xlink:href="src" ) -->
</template>

<script>
function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context('../assets/icons/', true, /\.svg$/));

//const ComponentContext = require.context('../assets/icons/', true, /\.vue$/i, 'lazy');
//console.log(ComponentContext)
export default {
//components: {VIcon},
  props: {
    name: {
      required: true
    }
  },
  computed: {
    src() {
        //return #${this.name};

      return `/img/icons.svg#${this.name}`;
    },
    styles() {
      console.log(this)
    }
  },
  components: {
    //componentName: () => ComponentContext(this.name)
  },
  created() {
    console.log(this)
  },
  mounted() {
    let el = this.$el;
    let log = getComputedStyle(el)

    console.log(log);
  },
};
</script>

<style lang="scss">
.sprite-icon {
  box-sizing: border-box;
  //max-width: 100%;
  max-width: 1em;
  min-width: 1em;
  width: 100%;
  path, use {
    fill: currentColor;
  }
}
// .sprite-icon {
//   max-width:100%;
//   max-height:100%;
// }
</style>
