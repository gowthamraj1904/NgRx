import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Counter } from './counter.model';

export const COUNTER_STATE_NAME = 'counter';
const getCounterState = createFeatureSelector<Counter>(COUNTER_STATE_NAME);

export const getCounter = createSelector(getCounterState, (state: Counter) => state.counter);
export const getChannelName = createSelector(getCounterState, (state: Counter) => state.channelName);
