import { Action } from '@ngrx/store';
import { Estado } from '../../interfaces/estado';
import { EstadosActions, EstadosActionTypes } from './estados.actions';

export interface EstadosState {
  Estados: Estado[];
  mensaje?: string;
  // cargando: boolean;
}

export const initialState: EstadosState = {
  Estados: [],
  mensaje: '',
  // cargando: false,
};

export function reducer(state = initialState, action: EstadosActions): EstadosState {
  switch (action.type) {
    case EstadosActionTypes.CargarEstados:
      // return {...state, cargando: true};
      return {...state};
    case EstadosActionTypes.EstadosCargados:
      state.Estados = action.payload;
      state.mensaje = null;
      // return {...state, cargando: false };
      return {...state};
    case EstadosActionTypes.EstadosNoCargados:
      state.Estados = [];
      state.mensaje = action.payload;
      // return { ...state, cargando: false };
      return { ...state};
    default:
      return {...state};
  }
}
