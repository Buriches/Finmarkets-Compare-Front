<template>
  <div class="main-list">
    <div class="main-list-topside">
      <h2 class="main-list-topside-category">{{useCategoriesStore().selectedCategory?.name}}</h2>
      <div class="main-list-topside-sorting" @click="useSortingStore().changeSorting()">
        <span>Price</span>
        <Icon
          name="ph:arrow-up"
          color="#292d32"
          :rotate="useSortingStore().sorting === 'price-up' ? '2' : '0'"
          size="15"
          v-if="useSortingStore().sorting !== undefined"
        />
      </div>
    </div>
    <div class="main-list-content" :style="{gridTemplateColumns: useThemeStore().hideCart ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)'}">
      <div
        class="main-list-content-item"
        v-for="product in useTapeStore().tape"
        :key="product.good_id"
      >
        <div class="main-list-content-item-topside">
          <div class="main-list-content-item-image-wrap">
            <img :src="`https://cdn.s-cloud.fi/v1/w640_q75/product/ean/${product.img}_kuva1.jpg`" class="main-list-content-item-image" alt="product image">
            <div class="main-list-content-item-image-wrap-hover">
              <button class="main-list-content-item-image-wrap-hover-button" @click="useCartStore().removeFromCart(product)">-</button>
              <span class="main-list-content-item-image-wrap-hover-count">
                {{useCartStore().getCartItem(product.good_id) === undefined ? '0' : useCartStore().getCartItem(product.good_id).metadata.count}}{{product.prices[0].price_unit}}
              </span>
              <button class="main-list-content-item-image-wrap-hover-button" @click="useCartStore().addToCart(product)">+</button>
            </div>
          </div>

          <div class="main-list-content-item-name"><NuxtLink :to="`/product/${product.path}`">{{product.name}}</NuxtLink></div>
        </div>
        <PriceDifference :product="product"/>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoriesStore } from "~/store/categories";
import { useSortingStore } from "~/store/sorting";
import { useTapeStore } from "~/store/goods tape";
import { useCartStore } from "~/store/cart";
import {IProduct} from "~/types/product";
import PriceDifference from "~/components/price difference/PriceDifference.vue";
import {useThemeStore} from "~/store/theme";

onMounted(async () => {
  await fetch('http://localhost:1500/get/get24?from:0')
    .then(response => response.json())
    .then(responseData => {
      useTapeStore().tape = responseData;
    })
    .catch(error => {
      console.error(error);
    });
})


</script>

<style scoped lang="scss">
@import "assets/styles/variables";
.main-list{
  width: 100%;
  &-topside{
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-category{
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      color: $COLOR_TEXT_PRIMARY;
    }
    &-sorting{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      gap: 10px;
      background: #FFFFFF;
      border-radius: 4px;
      cursor: pointer;
      height: 40px;
      & span{
        color: $COLOR_TEXT_PRIMARY;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        user-select: none;
      }
    }
  }
  &-content{
    margin-top: 10px;
    display: grid;

    gap: 10px;
    &-item{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 15px;
      gap: 10px;
      background: #FFFFFF;
      border-radius: 5px;
      justify-content: space-between;
      height: 100%;
      row-gap: 25px;
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
      &:hover{
        & .main-list-content-item-image-wrap-hover{
          opacity: 1;
        }
      }
      &-topside{
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        width: 100%;
      }
      &-name{
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        word-break: break-all;
        & a{
          color: #181717;
        }
      }
      &-image{
        display: flex;
        max-width: 182px;
        max-height: 140px;
        align-self: center;
        &-wrap{
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          height: 140px;
          position: relative;
          &-hover{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(2px);
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            text-transform: lowercase;
            opacity: 0;
            transition-duration: .3s;
            &-button{
              width: 25px;
              height: 25px;
              background-color: $COLOR_PRIMARY;
              border-radius: 2px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #FFFFFF;
              border: 0;
              outline: none;
              cursor: pointer;
              transition-duration: .3s;
              &:hover{
                background-color: $COLOR_HOVER;
              }
            }
            &-count{
              font-weight: 400;
              font-size: 14px;
              line-height: 21px;
              color: #777777;
            }
          }
        }
      }

    }
  }
}
</style>