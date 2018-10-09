import { Action } from '@ngrx/store';
import { ModoBusqueda } from '../shared/criterion/criterion-modo';
import { Valores } from '../interfaces/valores';


export enum ValoresActionTypes {
  CargarValores = '[Valores] Cargar',
  ValoresCargados = '[Valores] Cargados',
  ValoresNoCargados = '[Valores] No Cargados',
}

export class CargarValores implements Action {
  readonly type = ValoresActionTypes.CargarValores;
  constructor(public readonly payload: ModoBusqueda) { }
}

export class ValoresGuardados implements Action {
  readonly type = ValoresActionTypes.ValoresCargados;
  constructor(public readonly payload: Valores[]) { }
}

export class ValoresNoGuardados implements Action {
  readonly type = ValoresActionTypes.ValoresNoCargados;
  constructor(public readonly payload: string) { }
}
export type ValoresActions =
  |CargarValores
  |ValoresGuardados
  |ValoresNoGuardados;
