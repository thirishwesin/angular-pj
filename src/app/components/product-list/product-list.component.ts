import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { IProducts } from '../products';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit { 
  products: IProducts[] | any;
 
  cartProducts: IProducts[] = [];
  
  constructor( private service:ProductsService) { }
  products$: Observable<IProducts[]> = this.service.products$;
  
  getAllProducts(): void {
    this.service.getProducts().subscribe((data: any) => { 
    this.products = data;
    });
  }
  ngOnInit() {
    this.getAllProducts ();
  }

  findProductById() {
    this.service.findProductById(this.products.id)
      .subscribe();
  }

  
}
