<template>
  <header class="header">

    <InputSearch></InputSearch>
    <BaseField placeholder="qwe"></BaseField>


  </header>
</template>

<script>
import InputSearch from './InputSearch.vue';
import BaseField from './BaseField.vue';
export default {
  name: 'TheHeader',
  components: {
    InputSearch,
    BaseField
  }
}
</script>

<style lang="scss">
.header {
  padding: 10px 15px;
  background-color: grey;
}
</style>
