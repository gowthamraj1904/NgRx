import { createAction, props } from '@ngrx/store';

export enum CounterAction {
    increment = '[Counter] Increment',
    decrement = '[Counter] Decrement',
    reset = '[Counter] Reset',
    customValue = '[Counter] Custom Value',
    channelName = '[Counter] Channel Name'
}

export const increment = createAction(CounterAction.increment);
export const decrement = createAction(CounterAction.decrement);
export const reset = createAction(CounterAction.reset);
export const customValue = createAction(CounterAction.customValue, props<{ count: number }>());
export const channelName = createAction(CounterAction.channelName, props<{ channelName: string }>());
