import { defineStore } from 'pinia'

export interface IMarket{
  market_id: number;
  name: string;
}

export const useMarketsStore = defineStore('markets', () => {

  const markets = ref<IMarket[]>();

  const selectedMarket = ref<IMarket>();

  function marketImage(name: string):string {
    return new URL(`/static/markets/${name}.png`, import.meta.url).href;
  }

  return { markets, selectedMarket, marketImage }
})