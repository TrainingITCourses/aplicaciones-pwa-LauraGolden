import { Action } from '@ngrx/store';
import { Estado } from '../../interfaces/estado';

export enum EstadosActionTypes {
  CargarEstados = '[Estados] Cargar',
  EstadosCargados = '[Estados] Cargados',
  EstadosNoCargados = '[Estados] No Cargados',
}

export class CargarEstados implements Action {
  readonly type = EstadosActionTypes.CargarEstados;
}

export class EstadosCargados implements Action {
  readonly type = EstadosActionTypes.EstadosCargados;
  constructor(readonly payload: Estado[]) {}
}

export class EstadosNoCargados implements Action {
  readonly type = EstadosActionTypes.EstadosNoCargados;
  constructor(readonly payload: string) {}
}

export type EstadosActions =
  | CargarEstados
  | EstadosCargados
  | EstadosNoCargados;
