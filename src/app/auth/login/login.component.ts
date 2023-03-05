import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.model';
import { loginStart } from '../state/auth.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private store: Store<AppState>) {}

    setLoginForm(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    onLogin(): void {
        if (this.loginForm.invalid) {
            return;
        }

        this.store.dispatch(loginStart(this.loginForm.value));
    }

    ngOnInit(): void {
        this.setLoginForm();
    }
}
