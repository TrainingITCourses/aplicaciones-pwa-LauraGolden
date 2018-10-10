import { Action } from '@ngrx/store';
import { Lanzamiento } from '../../interfaces/lanzamiento';
import { LanzamientosActions, LanzamientosActionTypes } from './lanzamientos.actions';

export interface LanzamientoState {
  lanzamientos: Lanzamiento[];
  mensaje?: string;
  cargando: boolean;
}

export const initialState: LanzamientoState = {
  lanzamientos: [],
  mensaje: '',
  cargando: false,
};

export function reducer(state = initialState, action: LanzamientosActions): LanzamientoState {
  switch (action.type) {
    case LanzamientosActionTypes.CargarLanzamientos:
      return {...state, cargando: true};
    case LanzamientosActionTypes.LanzamientosCargados:
      state.lanzamientos = action.payload;
      state.mensaje = null;
      return {...state, cargando: false };
    case LanzamientosActionTypes.LanzamientosNoCargados:
      state.lanzamientos = [];
      state.mensaje = action.payload;
      return { ...state };
    default:
      return {...state };
  }
}
