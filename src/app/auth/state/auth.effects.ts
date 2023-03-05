import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { SharedActionsType } from 'src/app/shared/state/shared.action-type';
import { AppState } from 'src/app/state/app.model';
import { AuthResponse } from '../auth-response.model';
import { AuthService } from '../auth.service';
import { AuthActionTypes } from './auth.action-types';
import { autoLogin, autoLogout, loginFail, loginSuccess, signupSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private action$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router
    ) {}

    login$ = createEffect(() => this.loginAction);
    loginRedirect$ = createEffect(() => this.loginRedirect, { dispatch: false });
    signup$ = createEffect(() => this.signupAction);
    signupRedirect$ = createEffect(() => this.signupRedirect, { dispatch: false });
    autoLogin$ = createEffect(() => this.autoLogin);
    autoLogout$ = createEffect(() => this.autoLogout, { dispatch: false });

    loginAction(): Actions {
        return this.action$.pipe(
            ofType(AuthActionTypes.loginStart),
            exhaustMap((action) => {
                this.store.dispatch(SharedActionsType.setLoadingSpinner({ showLoading: true }));

                return this.authService.login(action).pipe(
                    map((data: AuthResponse) => {
                        const user = this.authService.formatUser(data);

                        this.store.dispatch(SharedActionsType.setLoadingSpinner({ showLoading: false }));

                        if (data.status === 'success') {
                            this.store.dispatch(SharedActionsType.setErrorMessage({ errorMessage: '' }));
                            this.authService.setUserInLocalStorage(user);
                            return loginSuccess({ user, redirect: true });
                        } else {
                            this.store.dispatch(
                                SharedActionsType.setErrorMessage({ errorMessage: 'Invalid Username or Password' })
                            );
                            return loginFail();
                        }
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        this.store.dispatch(SharedActionsType.setLoadingSpinner({ showLoading: false }));

                        return of(SharedActionsType.setErrorMessage({ errorMessage: 'Error Occur' + errorResponse }));
                    })
                );
            })
        );
    }

    loginRedirect(): Actions {
        return this.action$.pipe(
            ofType(...[loginSuccess, signupSuccess]),
            tap((action) => {
                if (action.redirect) {
                    this.router.navigate(['/home']);
                }
            })
        );
    }

    signupAction(): Actions {
        return this.action$.pipe(
            ofType(AuthActionTypes.signupStart),
            exhaustMap((action) => {
                return this.authService.signup(action).pipe(
                    map((data: any) => {
                        const user = data;

                        this.store.dispatch(SharedActionsType.setLoadingSpinner({ showLoading: false }));

                        this.authService.setUserInLocalStorage(user);
                        return signupSuccess({ user, redirect: true });
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        this.store.dispatch(SharedActionsType.setLoadingSpinner({ showLoading: false }));

                        return of(SharedActionsType.setErrorMessage({ errorMessage: 'Error Occur' + errorResponse }));
                    })
                );
            })
        );
    }

    signupRedirect(): Actions {
        return this.action$.pipe(
            ofType(signupSuccess),
            tap((action) => {
                if (action.redirect) {
                    this.router.navigate(['/']);
                }
            })
        );
    }

    autoLogin(): Actions {
        return this.action$.pipe(
            ofType(autoLogin),
            mergeMap(() => {
                const user = this.authService.getUserFromLocalStorage() as AuthResponse;

                return of(user ? loginSuccess({ user, redirect: false }) : autoLogout());
            })
        );
    }

    autoLogout(): Actions {
        return this.action$.pipe(
            ofType(autoLogout),
            tap(() => {
                this.authService.logout();
                this.router.navigate(['/auth/login']);
            })
        );
    }
}
