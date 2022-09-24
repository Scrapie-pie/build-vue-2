<template>
  <header class="header">

    <InputSearch></InputSearch>
    <BaseButton>
      <template #icon><IconAdd class="icon icon-add"/></template>
      Добавить
    </BaseButton>

  </header>
</template>

<script>
import InputSearch from './InputSearch.vue';
import BaseButton from './BaseButton.vue';
import IconAdd from '../assets/icons/add.svg';
// import BaseField from './BaseField.vue';
export default {
  name: 'TheHeader',
  components: {
    InputSearch,
    BaseButton,
    IconAdd
    //BaseField
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: grey;
}

.icon-add {
  width: 1em;
  font-size: 15px;
}
</style>
