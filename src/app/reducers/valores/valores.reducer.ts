import { ValoresActions, ValoresActionTypes } from './valores.actions';
import { Valores } from '../../interfaces/valores';


export interface ValoresState {
  valores: Valores[];
  message?: string;
}

export const initialState: ValoresState = {
  valores: [] ,
  message: ''
};

export function reducer(state = initialState, action: ValoresActions): ValoresState {
  switch (action.type) {
    case ValoresActionTypes.CargarValores:
      return { ...state };
    case ValoresActionTypes.ValoresCargados:
      return { ...state, valores: action.payload };
    case ValoresActionTypes.ValoresNoCargados:
      this.message = action.payload;
      break;
    default:
      return state;
  }
}
