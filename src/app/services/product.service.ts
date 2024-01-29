import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../models/order.module';
import { Product } from '../models/product.module';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Url of products
  private productsUrl = 'api/products';
  
  // Url to post orders
  private ordersUrl = 'api/orders';
  
  // Array to store product data or items
  private items: Product[] = [];

  // Total number on cart
   private total: number;

   constructor(private http: HttpClient) {
    this.items = [];
    this.total = 0;
  }

  // Method to get  products from server
  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  // Method to get details of a specific product by ID

  getProductById(id: number): Observable<Product> {
    
    const url = `${this.productsUrl}/${id}`; // url to get product

    return this.http.get<Product>(url);
  }

  // Method to get items in the cart
  getItems() : Product[] {
    return this.items;
  }

  // Method to get total price of the cart
  getTotal(): number {
    return this.total;
  }

  // Method to add products to cart
  addToCart(product: Product): void {

    this.items.push(product); // add product to items array

    this.total += product.price; // update the total price
  }

  // Method to remove product from cart
  removeFromCart(product: Product) : void {
    const index = this.items.indexOf(product); // find the index of product

    if (index > -1) {
      this.items.splice(index,1); // remove product from items array
      
      this.total -= product.price; // update the total price
    }
  }

  // Method to clear cart
  clearCart(): void {
    this.items = []; // empty array
    this.total = 0; // resert price
  }

  // Method to place order
  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order);
  }
}
