import { Action } from '@ngrx/store';
import { LanzamientosActions, LanzamientosActionTypes } from '../accions/lanzamientos.actions';
import { Lanzamiento } from '../interfaces/lanzamiento';


export interface LanzamientoState {
  lanzamientos: Lanzamiento[];
  mensaje?: string;
}

export const initialState: LanzamientoState = {
  lanzamientos: [],
  mensaje: ''
};

export function reducer(state = initialState, action: LanzamientosActions): LanzamientoState {
  switch (action.type) {
    case LanzamientosActionTypes.CargarLanzamientos:
      return {...state};
    case LanzamientosActionTypes.LanzamientosCargados:
      state.lanzamientos = action.payload;
      state.mensaje = null;
      return {...state };
    case LanzamientosActionTypes.LanzamientosNoCargados:
      state.lanzamientos = [];
      state.mensaje = action.payload;
      return { ...state };
    default:
      return {...state };
  }
}
