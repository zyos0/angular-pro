import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {CanActivate, CanLoad} from "@angular/router";


@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService) {

  }

  canLoad() {
    return this.authService.checkPermissions();
  }

  canActivate() {
    return this.authService.isLoggedIn();
  }
}
