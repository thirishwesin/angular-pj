import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../service/products.service";
import { IProducts } from "../products";

@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.css"]
})
export class CartListComponent implements OnInit {
  cartProducts: IProducts[] = [];
  totalQuantity: number | any;
  price: number | any;
  totalPrice: number | any;
  cartList = "cart";

  constructor(private _productsService: ProductsService) {}

  ngOnInit() {
    this._productsService.getCartProduct().subscribe((cartProducts: IProducts[]) => {
     
      this.cartProducts = cartProducts;
    });

  }

  deleteProduct(id:any) {
    let index = this.cartProducts.findIndex(item => item.id === id);
    this.cartProducts.splice(index, 1);
  }

  increaseProduct(p: any) {
    if(p.order_qty <= p.qty)
      p.order_qty += 1

  }
  decreaseProduct(p: any) {
    if(p.order_qty > 0)
    p.order_qty -= 1
  }

  checkout(cart:any) {
    localStorage.setItem(this.cartList, JSON.stringify(cart));
    console.log(cart);
    
  }
  
}
