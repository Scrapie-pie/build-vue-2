<template>
  <BaseInput type="search" placeholder="Поиск" class="field-search">
    <template #left>
      <IconSearch class="icon icon-search"></IconSearch>
    </template>
  </BaseInput>
</template>

<script>
import BaseInput from './BaseInput.vue';
import IconSearch from '../assets/icons/search.svg';
export default {
  name: 'InputSearch',
  components: {
    BaseInput,
    IconSearch
  }
}
</script>

<style lang="scss">
.field-search {
  background-color: #F2F2F2;
  border-radius: 5px;
  padding: 5px 10px;
}

.icon-search {
  width: 1em;
  font-size: 14px;
}
</style>
