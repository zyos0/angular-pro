import {Component, OnInit} from '@angular/core';
import {FormGroup, FormArray, FormBuilder} from "@angular/forms";
import 'rxjs/add/observable/forkJoin'
import {Item, Product} from "../../models/products.interface";
import {StockInventoryService} from "../../services/stock-inventory.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <stock-branch [parent]="form"></stock-branch>
        <stock-selector [parent]="form" [products]="products"
                        (added)="addStock($event)"
        ></stock-selector>
        <stock-products [parent]="form"
                        [map]="productMap"
                        (remove)="removeStock($event)"
        ></stock-products>

        <div class="stock-inventory__price">
          Total: {{total | currency: 'USD':true}}
        </div>


        <div class="stock-inventory__buttons">
          <button type="submit"
                  [disabled]="form.invalid">
            Order Stock
          </button>
        </div>

        <pre>{{form.value | json}}</pre>
      </form>
    </div>
  `
})
export class StockInventoryComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private stockService: StockInventoryService
  ) {
  }

  products: Product[];
  productMap: Map<number, Product>;
  total: number;


  form = this.fb.group({
    store: this.fb.group({
      branch: '',
      code: ''
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
  });

  ngOnInit() {
    const cart = this.stockService.getCartItems();
    const products = this.stockService.getProducts();
    Observable
      .forkJoin(cart, products)
      .subscribe(([cart, products]: [Item[], Product[]]) => {
        const myMap = products
          .map<[number, Product]>(product => [product.id, product]);

        this.productMap = new Map<number, Product>(myMap);
        this.products = products;

        cart.forEach(item => this.addStock(item));
        this.calculateTotal(this.form.get('stock').value)

        this.form.get('stock')
          .valueChanges.subscribe(value=>this.calculateTotal(value));


      })
  }

  calculateTotal(value: Item[]) {
    const total = value.reduce((prev, next) => {
      return prev + next.quantity * this.productMap.get(next.product_id).price;
    }, 0)
    this.total = total;
  }

  createStock(stock) {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10
    })
  }


  addStock(stock) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({group, index}: { group: FormGroup, index: number }) {
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }


  onSubmit() {
    console.log(this.form.value)

  }

}
