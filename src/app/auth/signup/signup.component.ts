import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SharedActionsType } from 'src/app/shared/state/shared.action-type';
import { AuthActionTypes } from '../state/auth.action-types';
import { Auth } from '../state/auth.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    signupForm: FormGroup;

    constructor(private store: Store<Auth>) {}

    onSignup(): void {
        if (this.signupForm.invalid) {
            return;
        }

        this.store.dispatch(SharedActionsType.setLoadingSpinner({ showLoading: true }));
        this.store.dispatch(AuthActionTypes.signupStart(this.signupForm.value));
    }

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }
}
