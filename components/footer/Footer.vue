<template>
<footer class="footer">
  <div class="wrap">
    <div class="footer-account">
      <div class="footer-account-icon">c</div>
      <div class="footer-account-name">Default user</div>
    </div>
    <div class="footer-navigation">
      <NuxtLink to="/auth">Authorisation</NuxtLink>
      <NuxtLink to="/about">About us</NuxtLink>
      <NuxtLink to="/">Store</NuxtLink>
    </div>
    <div class="footer-search">
      <input type="text" placeholder="Search">
      <Icon
        name="iconamoon:search-thin"
        color="#468966"
        width="20"
        height="20"
        :rotate="1"
        :verticalFlip="true"
      />
    </div>
    <div class="footer-media">
      <p>We are in social networks</p>
      <div class="footer-media-list">
        <div class="footer-media-list-item"><Icon icon="cib:instagram" color="#dadada" width="15" height="15" /></div>
        <div class="footer-media-list-item"><Icon icon="ri:facebook-fill" color="#dadada" width="15" height="15" /></div>
        <div class="footer-media-list-item"><Icon icon="ic:baseline-wechat" color="#dadada" width="15" height="15" /></div>
        <div class="footer-media-list-item"><Icon icon="basil:telegram-solid" color="#dadada" width="15" height="15" /></div>
      </div>
    </div>
  </div>
</footer>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import "assets/styles/variables";
.footer{
  background: #EFEFEF;
  & .wrap{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 120px;
    gap: 10px;
  }
  &-account{
    display: flex;
    column-gap: 10px;
    align-items: center;
    &-icon{
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FFFFFF;
      border-radius: 100%;
      width: 25px;
      height: 25px;
      color: $COLOR_TEXT_SECONDARY;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }
    &-name{
      font-weight: 300;
      font-size: 16px;
      line-height: 20px;
      color: $COLOR_TEXT_PRIMARY;
    }
  }
  &-navigation{
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    & a{
      font-weight: 300;
      font-size: 16px;
      line-height: 20px;
      color: $COLOR_TEXT_PRIMARY;
      padding-bottom: 2px;
      border-bottom: 1px solid #C8C8C8;
      width: fit-content;
      transition-duration: .3s;
      &:hover{
        color: $COLOR_HOVER;
        border-bottom: 1px solid $COLOR_HOVER;
      }
    }
  }
}
</style>