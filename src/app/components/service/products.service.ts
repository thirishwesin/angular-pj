import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProducts } from '../products';

import {BehaviorSubject, map, Observable, tap } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) { }
  cartProducts: IProducts[] = [];
  //event = new EventEmitter();

  private productSubject$ = new BehaviorSubject<IProducts[]>([]);
  products$ = this.productSubject$.asObservable();

  getProducts(): Observable<IProducts[]> {
    return this.http.get('http://localhost:8080/api/products') as Observable<IProducts[]>;
  }

  getCartProduct() {
    return this.productSubject$.asObservable();
  }

  setCartProduct(cartProducts: IProducts[]) {
    return this.productSubject$.next(cartProducts);
  }

  findProductById(id:number):Observable<IProducts>{
    return this.getProducts().pipe(
      map(products => products.find(p => p.id == id))
    ) as Observable<IProducts>;
  }

  
  
}