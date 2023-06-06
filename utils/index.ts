import {IProduct} from "~/types/product";

function getIntegerPart(number: number) {
  const res = Math.floor(number)
  if (isNaN(res)) return 'Not available'
  return res;
}
function getDecimalPart(number: number) {
  const decimalPart = number - Math.floor(number);
  const res = decimalPart.toFixed(2).substring(2);
  if (isNaN(Number(res))) return '';
  return res;
}

function minPrice(product: IProduct):number{
  return Math.min(...product.prices.map(item => item.price));
}
function maxPrice(product: IProduct):number{
  return Math.max(...product.prices.map(item => item.price))
}

export { getIntegerPart, getDecimalPart, maxPrice, minPrice }