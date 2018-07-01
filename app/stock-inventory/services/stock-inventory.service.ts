import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs/Observable";
import {Item, Product} from "../models/products.interface";

@Injectable()
export class StockInventoryService {
  constructor(
    private http: Http
  ) {
  }

  getCartItems(): Observable<Item[]> {
    return this.http
      .get('/api/cart')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()))

  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get('/api/products')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()))

  }
}


