import { Action } from '@ngrx/store';
import { Estado } from '../../interfaces/estado';
import { EstadosActions, EstadosActionTypes } from './estados.actions';

export interface EstadosState {
  Estados: Estado[];
  mensaje?: string;
  cargado?: boolean;
}

export const initialState: EstadosState = {
  Estados: [],
  mensaje: '',
  cargado: false,
};

export function reducer(state = initialState, action: EstadosActions): EstadosState {
  switch (action.type) {
    case EstadosActionTypes.CargarEstados:
      return {...state};
    case EstadosActionTypes.EstadosCargados:
      state.Estados = action.payload;
      state.mensaje = null;
      return {...state, cargado: true };
    case EstadosActionTypes.EstadosNoCargados:
      state.Estados = [];
      state.mensaje = action.payload;
      return { ...state };
    default:
      return {...state};
  }
}
