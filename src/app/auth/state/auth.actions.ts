import { createAction, props } from '@ngrx/store';
import { AuthResponse } from '../auth-response.model';
import { Auth } from './auth.model';

export enum AuthAction {
    loginStart = '[Auth Page] Login Start',
    loginSuccess = '[Auth Page] Login Success',
    loginFail = '[Auth Page] Login Fail',
    signupStart = '[Auth Page] Signup Start',
    signupSuccess = '[Auth Page] Signup Success',
    autoLoginAction = '[Auth Page] Auto Login',
    logout = '[Auth Page] Logout'
}

export const loginStart = createAction(AuthAction.loginStart, props<Auth>());
export const loginSuccess = createAction(AuthAction.loginSuccess, props<{ user: AuthResponse; redirect: boolean }>());
export const loginFail = createAction(AuthAction.loginFail);
export const signupStart = createAction(AuthAction.signupStart, props<Auth>());
export const signupSuccess = createAction(AuthAction.signupSuccess, props<{ user: AuthResponse; redirect: boolean }>());
export const autoLogin = createAction(AuthAction.autoLoginAction);
export const autoLogout = createAction(AuthAction.logout);
