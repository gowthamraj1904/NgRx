import { AuthResponse } from '../auth-response.model';

export interface Auth {
    email: string;
    password: string;
}

export interface AuthState {
    user: AuthResponse | null;
}
