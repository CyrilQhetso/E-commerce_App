import { Product } from "./product.module";

export interface Order {
  id: number;
  itemes: Product[];
  total: number;
}
