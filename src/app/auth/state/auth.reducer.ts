import { createReducer, on } from '@ngrx/store';
import { autoLogout, loginFail, loginSuccess, signupStart } from './auth.actions';
import { Auth, AuthState } from './auth.model';
import { initialState } from './auth.state';

const _authReducer = createReducer(
    initialState,
    on(loginSuccess, (state: AuthState, action: AuthState) => {
        return {
            ...state,
            user: action.user
        };
    }),
    on(loginFail, (state: AuthState) => {
        return {
            ...state,
            user: null
        };
    }),
    on(signupStart, (state: AuthState, action: any) => {
        return {
            ...state,
            user: action
        };
    }),
    on(autoLogout, (state: AuthState) => {
        return {
            ...state,
            user: null
        };
    })
);

export const AuthReducer = (state: any, action: any) => {
    return _authReducer(state, action);
};
