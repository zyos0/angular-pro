import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormArray, FormGroup} from "@angular/forms";
import {Product} from "../../models/products.interface";

@Component({
  selector: 'stock-products',
  styleUrls: ['stock-products.component.scss'],
  template: `
    <div class="stock-product" [formGroup]="parent">
      <div formArrayName="stock">
        <div
          *ngFor="let item of stocks; let i = index"
        >
          <div class="stock-product__content" [formGroupName]="i">
            <div class="stock-product__name">
              {{getProduct(item.value.product_id).name}}
            </div>
            <div class="stock-product__price">
              {{getProduct(item.value.product_id).price | currency:'USD':true}}
            </div>
            <input type="number"
                   step="10"
                   min="10"
                   max="100"
                   formControlName="quantity"
            >
            <button type="button"
                    (click)="onRemove(item,i)">
              Remove
            </button>

          </div>

        </div>
      </div>

    </div>
  `
})
export class StockProductsComponent {
  @Input()
  parent: FormGroup


  @Input()
  map: Map<number, Product>;

  getProduct(id): Product {
    return this.map.get(id)
  }

  get stocks() {
    return (this.parent.get('stock') as FormArray).controls
  }

  @Output()
  remove = new EventEmitter<any>();


  onRemove(group, index) {
    this.remove.emit({group, index})
  }
}


