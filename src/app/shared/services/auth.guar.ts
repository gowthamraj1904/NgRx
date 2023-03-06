import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isAuthenticated } from 'src/app/auth/state/auth.selectors';
import { AppState } from 'src/app/state/app.model';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(isAuthenticated).pipe(
            map((authenticate) => {
                if (!authenticate) {
                    return this.router.createUrlTree(['auth/login']);
                }

                return true;
            })
        );
        return true;
    }
}
