import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from "@angular/http";

import {StockInventoryComponent} from './containers/stock-inventory/stock-inventory.component';
import {StockSelectorComponent} from "./components/stock-selector/stock-selector.component";
import {StockProductsComponent} from "./components/stock-products/stock-products.component";
import {StockBranchComponent} from "./components/stock-branch/stock-branch.component";
import {StockInventoryService} from "./services/stock-inventory.service";

@NgModule({
  declarations: [
    StockInventoryComponent,
    StockSelectorComponent,
    StockProductsComponent,
    StockBranchComponent
  ],
  providers: [
    StockInventoryService
  ],
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule
  ],
  exports: [
    StockInventoryComponent
  ]
})
export class StockInventoryModule {
}
