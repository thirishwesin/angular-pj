import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProducts } from '../products';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private productService: ProductsService, private route: ActivatedRoute,private router:Router) { }

  cartProducts: IProducts[] = [];

  product$!:Observable<IProducts>;
  id!: number;
  
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get("id") as string);
    console.log("Id, ", this.id);
    
    this.product$ = this.productService.findProductById(this.id);
    this.product$.subscribe(data =>  console.log("Product: " + data ));
  }

  addToCart(product: any): void {
    if (product.qty != 0) {
      this.cartProducts.push(product);
              
      product.qty -= 1;
              
      this.productService.setCartProduct(this.cartProducts);
    }
     
    product.order_qty = 1;
    this.router.navigate(['cart']);
  }


}
