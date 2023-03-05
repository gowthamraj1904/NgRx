import { createReducer, on } from '@ngrx/store';
import { AuthActionTypes } from './auth.action-types';
import { AuthState } from './auth.model';
import { initialState } from './auth.state';

const _authReducer = createReducer(
    initialState,
    on(AuthActionTypes.loginSuccess, (state: AuthState, action: AuthState) => {
        return {
            ...state,
            user: action.user
        };
    }),
    on(AuthActionTypes.loginFail, (state: AuthState) => {
        return {
            ...state,
            user: null
        };
    }),
    on(AuthActionTypes.signupStart, (state: AuthState, action: any) => {
        return {
            ...state,
            user: action
        };
    }),
    on(AuthActionTypes.autoLogout, (state: AuthState) => {
        return {
            ...state,
            user: null
        };
    })
);

export const AuthReducer = (state: any, action: any) => {
    return _authReducer(state, action);
};
