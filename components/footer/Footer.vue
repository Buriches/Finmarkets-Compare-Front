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
    <form class="footer-search" name="footer-search" @submit.prevent>
      <input type="text" placeholder="Search">
      <button type="submit">
        <Icon
          name="iconamoon:search-thin"
          color="#468966"
          width="20"
          height="20"
          :rotate="1"
          :verticalFlip="true"
        />
      </button>
    </form>
    <div class="footer-media">
      <p class="footer-media-title">We are in social networks</p>
      <div class="footer-media-list">
        <div class="footer-media-list-item"><a href="https://www.instagram.com/"><Icon name="cib:instagram" color="#dadada" width="17" height="17" /></a></div>
        <div class="footer-media-list-item"><a href="https://facebook.com/"><Icon name="ri:facebook-fill" color="#dadada" width="20" height="20" /></a></div>
        <div class="footer-media-list-item"><a href="https://www.wechat.com/"><Icon name="ic:baseline-wechat" color="#dadada" width="20" height="20" /></a></div>
        <div class="footer-media-list-item"><a href="https://web.telegram.org/"><Icon name="basil:telegram-solid" color="#dadada" width="18" height="18" /></a></div>
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
  &-search{
    display: flex;
    width: 395px;
    height: 40px;
    background: #FFFFFF;
    border-radius: 5px;
    align-items: center;
    justify-content: space-between;
    & input{
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #777777;
      border: 0;
      outline: none;
      width: 100%;
      padding-left: 20px;
    }
    & button{
      padding-right: 20px;
      height: 100%;
      padding-left: 5px;
      cursor: pointer;
      outline: none;
      border: 0;
      background-color: transparent;
    }
  }
  &-media{
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    &-title{
      font-weight: 300;
      font-size: 16px;
      line-height: 20px;
      color: $COLOR_TEXT_PRIMARY;
    }
    &-list{
      display: flex;
      column-gap: 15px;
      justify-content: space-between;
      &-item{
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $COLOR_PRIMARY;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
}
</style>