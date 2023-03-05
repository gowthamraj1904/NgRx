import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from '../state/app.model';
import { AuthResponse } from './auth-response.model';
import { Auth } from './state/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    timeoutInterval: any;

    constructor(private httpClient: HttpClient, private store: Store<AppState>) {}

    login(auth: Auth): Observable<AuthResponse> {
        return this.httpClient.get<Auth>('http://localhost:3000/auth').pipe(
            map((res: Auth) => {
                return this.validateLogin(res, auth);
            })
        );
    }

    validateLogin(data: Auth, auth: Auth): AuthResponse {
        if (data.email === auth.email && data.password === auth.password) {
            return {
                email: data.email,
                status: 'success',
                expiryDate: new Date('2023-04-04T16:17:24.657Z')
            };
        } else {
            return {
                email: data.email,
                status: 'failed',
                expiryDate: new Date('2023-04-04T16:17:24.657Z')
            };
        }
    }

    signup(auth: Auth): Observable<Auth> {
        return this.httpClient.post<Auth>('http://localhost:3000/auth', auth, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    formatUser(data: AuthResponse): AuthResponse {
        return {
            email: data.email,
            status: data.status,
            expiryDate: data?.expiryDate
        };
    }

    setUserInLocalStorage(user: AuthResponse): void {
        localStorage.setItem('userData', JSON.stringify(user));

        this.runTimeoutInterval(user);
    }

    runTimeoutInterval(user: AuthResponse): void {
        const todayDate = new Date().getTime();
        const expirationDate = user.expiryDate?.getTime() ?? 0;
        const timeInterval = expirationDate - todayDate;

        // this.timeoutInterval = setTimeout(() => {
        //     this.store.dispatch(autoLogout());
        // }, timeInterval);
    }

    getUserFromLocalStorage(): AuthResponse | null {
        const userDataString = localStorage.getItem('userData');

        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const expiryDate = new Date(userData?.expirationDate);
            const user = {
                email: userData.email,
                status: userData.status,
                expiryDate
            };

            this.runTimeoutInterval(user);
            return user;
        }

        return null;
    }

    logout(): void {
        localStorage.removeItem('userData');

        if (this.timeoutInterval) {
            clearTimeout(this.timeoutInterval);
            this.timeoutInterval = null;
        }
    }
}
