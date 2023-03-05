import { createAction, props } from '@ngrx/store';
import { SharedState } from './shared.model';

enum sharedActions {
    setLoadingAction = '[Shared State] Set Loading Spinner',
    setErrorMessage = '[Shared State] Set Error Message'
}

export const setLoadingSpinner = createAction(sharedActions.setLoadingAction, props<SharedState>());
export const setErrorMessage = createAction(sharedActions.setErrorMessage, props<SharedState>());
