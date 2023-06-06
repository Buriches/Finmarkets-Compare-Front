<template>
  <form class="header-search" @submit.prevent="submitSearch()">
    <input type="text" class="header-search-input" placeholder="I'm looking for..." v-model="request">
    <button class="header-search-button" type="submit">
      <Icon
        name="iconamoon:search-thin"
        color="#F1F1F1"
        width="25"
        height="25"
        :rotate="1"
        :verticalFlip="true"
      />
    </button>
  </form>
</template>

<script setup lang="ts">
const request = ref<string>('');

function submitSearch(){
  console.log(request.value)
}
</script>

<style scoped lang="scss">
@import "assets/styles/variables";
.header-search{
  max-width: 500px;
  width: 100%;
  display: flex;
  align-items: center;
  height: 37px;
  border-radius: 3px;
  &-input{
    height: 100%;
    width: 100%;
    background-color: #EFEFEF;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #8F8F8F;
    outline: none;
    border: 0;
    padding-left: 25px;
  }
  &-button{
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $COLOR_PRIMARY;
    outline: none;
    border: 0;
    cursor: pointer;
    transition-duration: .3s;
    &:hover{
      filter: contrast(2);
    }
    &:active{
      filter: contrast(3);
    }
  }
}
</style>