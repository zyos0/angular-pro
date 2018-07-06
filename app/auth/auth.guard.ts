import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {CanLoad} from "@angular/router";


@Injectable()
export class AuthGuard implements CanLoad{
  constructor(private authService:AuthService){

  }

  canLoad(){
    return this.authService.checkPermissions();
  }
}
