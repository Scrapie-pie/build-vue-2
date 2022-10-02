<template>
  <header class="header">

    <!-- <InputSearch></InputSearch> -->
    <!-- <BaseButton>
      <template #icon><IconAdd class="icon icon-add"/></template>
      Добавить
    </BaseButton> -->
    qwe
    <!-- <BaseIconTest icon="add"></BaseIconTest> -->
    <!-- <VIcon name="arrow-type-1-vector"></VIcon> -->
    <BaseIcon icon="arrow-type-1-vector"></BaseIcon>

    <!-- <ScalebleIcon icon="search"></ScalebleIcon> -->


  </header>
</template>

<script>
import InputSearch from './InputSearch.vue';
//import ScalebleIcon from './ScalebleIcon.vue';
//import VIcon from './VIcon.vue';
//import BaseIconTest from './BaseIconTest.vue';
import BaseIcon from './BaseIcon.vue';
import BaseButton from './BaseButton.vue';
import IconAdd from '../assets/icons/add.svg';
// import BaseField from './BaseField.vue';
export default {
  name: 'TheHeader',
  components: {
    InputSearch,
    BaseButton,
    IconAdd,
    //BaseIconTest,
    //VIcon,
    BaseIcon
    //ScalebleIcon
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
