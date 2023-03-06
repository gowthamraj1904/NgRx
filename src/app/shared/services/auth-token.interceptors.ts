import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AppState } from 'src/app/state/app.model';
import { Store } from '@ngrx/store';
import { getToken } from 'src/app/auth/state/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(getToken).pipe(
            take(1),
            exhaustMap((token: any) => {
                if (!token) {
                    return next.handle(req);
                }

                let modifyReq = req.clone({
                    params: req.params.append('auth', token)
                });

                return next.handle(modifyReq);
            })
        );
    }
}
