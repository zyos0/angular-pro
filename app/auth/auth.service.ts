import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  user = {isAdmin: false};

  checkPermissions() {
    return Observable.of(this.user.isAdmin)
  }

  isLoggedIn() {
    return Observable.of(true)
  }

}
