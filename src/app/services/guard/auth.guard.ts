import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = localStorage.getItem("User-Token");
    if (isLoggedIn) {
      // this.router.navigate(["seller"]);
      return true;
    } else {
      this.router.navigate(["seller/auth"]);
      return false;
    }
  }
}
@Injectable({
  providedIn: "root",
})
export class LogInGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = localStorage.getItem("User-Token");

    if (!isLoggedIn) {
      // this.router.navigate(["my-profile"]);
      return true;
    } else {
      this.router.navigate(["seller/my-profile"]);
      return false;
    }
  }
}
