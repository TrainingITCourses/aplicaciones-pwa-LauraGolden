import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { LanzamientosActionTypes, CargarLanzamientos, LanzamientosCargados, LanzamientosNoCargados} from './lanzamientos.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

@Injectable()
export class LanzamientosEffects {

  @Effect()
  public Carga$ = this.actions$
    .ofType(LanzamientosActionTypes.CargarLanzamientos)
    .pipe(
      mergeMap((action: CargarLanzamientos) =>
        this.apiService
          .getFilterLaunches(action.payload[0], action.payload[1])
          .pipe(map(lanFiltrados => new LanzamientosCargados(lanFiltrados)),
             catchError( err => of(new LanzamientosNoCargados('Los lanzamientos no han podido filtrarse')))
      ))
    );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
