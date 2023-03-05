import { createReducer, on } from '@ngrx/store';
import { SharedActionsType } from './shared.action-type';
import { SharedState } from './shared.model';
import { initialState } from './shared.state';

const _sharedReducer = createReducer(
    initialState,
    on(SharedActionsType.setLoadingSpinner, (state: SharedState, action: SharedState) => {
        return {
            ...state,
            showLoading: action.showLoading
        };
    }),
    on(SharedActionsType.setErrorMessage, (state: SharedState, action: SharedState) => {
        return {
            ...state,
            errorMessage: action.errorMessage
        };
    })
);

export const sharedReducer = (state: any, action: any) => {
    return _sharedReducer(state, action);
};
