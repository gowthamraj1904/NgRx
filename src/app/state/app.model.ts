import { AuthState } from '../auth/state/auth.model';
import { SharedState } from '../shared/state/shared.model';
import { AUTH_STATE_NAME } from '../auth/state/auth.selectors';
import { SHARED_STATE_NAME } from '../shared/state/shared.selector';

export interface AppState {
    [SHARED_STATE_NAME]: SharedState;
    [AUTH_STATE_NAME]: AuthState;
}
