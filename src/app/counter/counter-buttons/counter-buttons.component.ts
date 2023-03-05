import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.model';
import { CounterActionTypes } from '../state/counter.action-type';

@Component({
    selector: 'app-counter-buttons',
    templateUrl: './counter-buttons.component.html',
    styleUrls: ['./counter-buttons.component.scss']
})
export class CounterButtonsComponent {
    constructor(private store: Store<AppState>) {}

    onIncrement(): void {
        this.store.dispatch(CounterActionTypes.increment());
    }

    onDecrement(): void {
        this.store.dispatch(CounterActionTypes.decrement());
    }

    onReset(): void {
        this.store.dispatch(CounterActionTypes.reset());
    }
}
