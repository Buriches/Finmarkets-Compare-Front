import { defineStore } from 'pinia'
import {useMarketsStore} from "~/store/markets";

export const useCartStore = defineStore('cart', () => {
  const cart = reactive<Map<number, object>>(new Map());

  function deleteCartItem(itemId: number):void{
    cart.delete(itemId)
  }
  function getCartItem(itemId: number): any | undefined{
    return cart.get(itemId)
  }
  function setCartItem(itemId: number, product: object):void{
    cart.set(itemId, product)
  }

  function getAllCartItems(): object[] | undefined{
    return [...cart.entries()]
  }

  function removeFromCart(product: any){
    const item = getCartItem(product.good_id);
    if (item === undefined) return;
    if (item.metadata.count >= 2){
      setCartItem(product.good_id, {product: product, metadata: { count: item.metadata.count - 1 }});
      return;
    } else {
      deleteCartItem(product.good_id)
      return;
    }
  }
  function addToCart(product: any){
    const item = getCartItem(product.good_id);
    if (item === undefined){
      setCartItem(product.good_id, {product: product, metadata: { count: 1 }});
      return;
    } else {
      setCartItem(product.good_id, {product: product, metadata: { count: item.metadata.count + 1 }});
      return;
    }
  }

  function getSmallestKey(map: Map<string, number>): string | undefined {
    let smallestKey: string | undefined;
    let smallestValue: number | undefined;

    for (const [key, value] of map.entries()) {
      if (smallestValue === undefined || value < smallestValue) {
        smallestKey = key;
        smallestValue = value;
      }
    }

    return smallestKey;
  }

  function findCheapestMarket(): {name: string, price: number} {
    const cartPrices: Map<string, number> = new Map<string, number>();

    const commonMarkets = findCommonMarkets();
    // @ts-ignore
    if (commonMarkets.length === 0) return;

    // Calculate prices
    const cartProducts = Array.from(cart.values());
    for (let i = 0; i < cartProducts.length; i++){
      // @ts-ignore
      cartProducts[i].product.prices.forEach((market: {name: string, price: number}) => {
        // @ts-ignore
        cartPrices.set(market.name, ((cartPrices.get(market.name) || 0) + market.price || 0) * cartProducts[i].metadata.count);
      });
    }

    // Cut common markets
    let commonMarketPrices = new Map<string, number>();
    commonMarkets.forEach(market => {
      commonMarketPrices.set(market, cartPrices.get(market)!);
    });

    // Find cheapest prise
    const cheapestMarket = getSmallestKey(commonMarketPrices);
    // @ts-ignore
    return { name: cheapestMarket!, price: cartPrices.get(cheapestMarket!).toFixed(2) }
  }

  function findCommonMarkets() {
    let initialArrayInitiated = false;
    let commonMarkets = new Array<string>();

    const cartProducts = Array.from(cart.values());

    for (let i = 0; i < cartProducts.length; i++) {
      // @ts-ignore
      const currentProductMarkets = cartProducts[i].product.prices.map(market => market.name);

      if (!initialArrayInitiated) {
        commonMarkets = currentProductMarkets;
        initialArrayInitiated = true;
        continue;
      }

      commonMarkets = commonMarkets.filter(e => currentProductMarkets.includes(e));
    }

    return commonMarkets;
  }

  function clearCart() {
    cart.clear()
  }

  function findCardPriceByMarket(id: number): number | null{
    let res :number = 0;
    const cartProducts = Array.from(cart.values());
    for (let i = 0; i < cartProducts.length; i++){
      // @ts-ignore
      res = res + cartProducts[i].product.prices.find(item => item.market_id === id)?.price * cartProducts[i].metadata.count;
    }
    return isNaN(res) ? null : +res.toFixed(2);
  }

  const cheapestPrice = () :number|string => +findCheapestMarket()?.price || 'Not available';
  // @ts-ignore
  const selectedPrice = () :number|string => findCardPriceByMarket(useMarketsStore()?.selectedMarket?.market_id) || 'Not available';

  function bestOffer(product: any): string[]{
    const prices = product.prices
    let lowestPrice = Number.MAX_VALUE;
    for (const shop of prices) {
      if (shop.price < lowestPrice) {
        lowestPrice = shop.price;
      }
    }

    // Collect the names of shops with the lowest price
    const shopsWithLowestPrice: string[] = [];
    for (const shop of prices) {
      if (shop.price === lowestPrice) {
        shopsWithLowestPrice.push(shop.name);
      }
    }

    return shopsWithLowestPrice;
  }
  return { deleteCartItem, getCartItem, setCartItem, getAllCartItems, removeFromCart, addToCart, findCheapestMarket, clearCart, findCardPriceByMarket, cheapestPrice, selectedPrice, bestOffer }
})