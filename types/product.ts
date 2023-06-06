import { ICategory } from "~/types/category";
import { IPrice } from "~/types/price";

export interface IProduct{
  good_id: number;
  name: string;
  for_adults: boolean;
  path: string;
  brand: string;
  img: string;
  categories?: ICategory[];
  prices: IPrice[];
}