import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {CanActivate, CanActivateChild, CanLoad} from "@angular/router";


@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private authService: AuthService) {

  }

  canLoad() {
    return this.authService.checkPermissions();
  }

  canActivate() {
    return this.authService.isLoggedIn();
  }

  canActivateChild(){
    return false;
  }
}
