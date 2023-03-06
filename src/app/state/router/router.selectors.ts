import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './custom-serializer';

export const ROUTER_STATE_NAME = 'router';
const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>(ROUTER_STATE_NAME);

export const getCurrentRoute = createSelector(getRouterState, (router) => router.state);
