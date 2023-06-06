<template>
  <div class="price-difference">
    <div class="price-difference-price"
         v-if="!useMarketsStore().selectedMarket || useMarketsStore().selectedMarket?.market_id === 0"
    >
      {{getIntegerPart(minimumPrice)}}<span>{{getDecimalPart(minimumPrice)}}</span>
    </div>
    <div class="price-difference-price"
         v-else
         @click="typeof getIntegerPart(selectedStorePrice) === 'string' ? useCategoriesStore().selectedCategory = mainCategory : ''"
         :style="{cursor: typeof getIntegerPart(selectedStorePrice) === 'string' ? 'pointer' : ''}"
    >
      {{getIntegerPart(selectedStorePrice)}}<span>{{getDecimalPart(selectedStorePrice)}}</span>
    </div>
    <div class="price-difference-price" v-if="minimumPrice !== maximumPrice && useMarketsStore().selectedMarket?.market_id === 0"> - {{getIntegerPart(maximumPrice)}}<span>{{getDecimalPart(maximumPrice)}}</span></div>
    <div class="price-difference-currency" v-if="!isNaN(selectedStorePrice)">€/{{props.product.prices[0].price_unit}}</div>
  </div>
</template>
<script lang="ts" setup>
import {IProduct} from "~/types/product";
import {PropType} from "vue";
import { getIntegerPart, getDecimalPart, maxPrice, minPrice } from '~/utils'
import { useMarketsStore } from "~/store/markets";
import {useCategoriesStore} from "~/store/categories";

const selectedStorePrice = ref<number>(props.product.prices.find(item => item.market_id === useMarketsStore().selectedMarket?.market_id)?.price);

const props = defineProps({
  product: Object as PropType<IProduct>
});

const minimumPrice = computed(() => minPrice(props.product))
const maximumPrice = computed(() => maxPrice(props.product))

watch(() => useMarketsStore().selectedMarket, (newValue) => {
  if (newValue?.market_id === 0) {
    selectedStorePrice.value = 0;
    return;
  }
  selectedStorePrice.value = props.product.prices.find(item => item.market_id === newValue.market_id)?.price;
})

const mainCategory = useCategoriesStore().findMainCategory(props.product.categories)
</script>
<style lang="scss" scoped>
@import "assets/styles/variables";
.price-difference{
  display: flex;
  align-items: flex-end;
  &-price{
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: $COLOR_TEXT_PRIMARY;
    display: flex;
    align-items: flex-start;
    & span{
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: $COLOR_TEXT_PRIMARY;
    }
  }
  &-currency{
    color: #777777;
    font-weight: 300;
    font-size: 13px;
    line-height: 20px;
    text-transform: lowercase;
  }
}
</style>