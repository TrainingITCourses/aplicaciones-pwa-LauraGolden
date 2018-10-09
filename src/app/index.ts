import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../environments/environment';
import * as fromLanzamientos from './reducers/lanzamientos.reducer';
import * as fromValores from './reducers/valores.reducer';

export interface GlobalState {
  lanzamientos: fromLanzamientos.LanzamientoState;
  valores: fromValores.ValoresState;
}

export const reducers: ActionReducerMap<GlobalState> = {
  lanzamientos: fromLanzamientos.reducer,
  valores: fromValores.reducer,
};


export const metaReducers: MetaReducer<GlobalState>[] = !environment.production ? [] : [];
