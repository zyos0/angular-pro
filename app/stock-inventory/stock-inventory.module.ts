import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {StockInventoryComponent} from './containers/stock-inventory/stock-inventory.component';
import {StockSelectorComponent} from "./components/stock-selector/stock-selector.component";
import {StockProductsComponent} from "./components/stock-products/stock-products.component";
import {StockBranchComponent} from "./components/stock-branch/stock-branch.component";

@NgModule({
  declarations: [
    StockInventoryComponent,
    StockSelectorComponent,
    StockProductsComponent,
    StockBranchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    StockInventoryComponent
  ]
})
export class StockInventoryModule {
}
