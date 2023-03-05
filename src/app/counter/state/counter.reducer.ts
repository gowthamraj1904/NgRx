import { createReducer, on } from '@ngrx/store';
import { CounterActionTypes } from './counter.action-type';
import { initialState } from './counter.state';

const _counterReducer = createReducer(
    initialState,
    on(CounterActionTypes.increment, (state) => {
        return {
            ...state,
            counter: state.counter + 1
        };
    }),
    on(CounterActionTypes.decrement, (state) => {
        return {
            ...state,
            counter: state.counter - 1
        };
    }),
    on(CounterActionTypes.reset, (state) => {
        return {
            ...state,
            counter: 0
        };
    }),
    on(CounterActionTypes.customValue, (state, action) => {
        return {
            ...state,
            counter: +action.count
        };
    }),
    on(CounterActionTypes.channelName, (state, action) => {
        return {
            ...state,
            channelName: action.channelName
        };
    })
);

export const counterReducer = (state: any, action: any) => {
    return _counterReducer(state, action);
};
