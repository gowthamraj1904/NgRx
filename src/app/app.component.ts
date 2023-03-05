import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActionTypes } from './auth/state/auth.action-types';
import { getErrorMessage, getLoading } from './shared/state/shared.selector';
import { AppState } from './state/app.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    showLoading: Observable<boolean | undefined>;
    errorMessage: Observable<string | undefined>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.showLoading = this.store.select(getLoading);
        this.errorMessage = this.store.select(getErrorMessage);

        this.store.dispatch(AuthActionTypes.autoLogin());
    }
}
