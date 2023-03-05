import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getChannelName } from '../state/counter.selectors';
import { AppState } from 'src/app/state/app.model';
import { CounterActionTypes } from '../state/counter.action-type';

@Component({
    selector: 'app-custom-counter-input',
    templateUrl: './custom-counter-input.component.html',
    styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
    count: number;
    channelName: string;

    constructor(private store: Store<AppState>) {}

    onAddValue(): void {
        this.store.dispatch(CounterActionTypes.customValue({ count: this.count }));
    }

    onChangeChannelName(): void {
        this.store.dispatch(CounterActionTypes.channelName({ channelName: 'Custom Channel Name' }));
    }

    ngOnInit(): void {
        this.store.select(getChannelName).subscribe((channelName) => {
            this.channelName = channelName;
        });
    }
}
