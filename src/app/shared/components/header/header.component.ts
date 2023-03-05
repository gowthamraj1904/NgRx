import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActionTypes } from 'src/app/auth/state/auth.action-types';
import { isAuthenticated } from 'src/app/auth/state/auth.selectors';
import { AppState } from 'src/app/state/app.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuthenticated: Observable<boolean>;

    constructor(private store: Store<AppState>) {}

    onLogout(event: Event): void {
        event.preventDefault();

        this.store.dispatch(AuthActionTypes.autoLogout());
    }

    ngOnInit(): void {
        this.isAuthenticated = this.store.select(isAuthenticated);
    }
}
