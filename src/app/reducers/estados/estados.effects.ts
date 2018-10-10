import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { EstadosActionTypes, CargarEstados, EstadosCargados, EstadosNoCargados} from './estados.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

@Injectable()
export class EstadosEffects {

  @Effect()
  public Carga$ = this.actions$
    .ofType(EstadosActionTypes.CargarEstados)
    .pipe(
      mergeMap((action: CargarEstados) =>
        this.apiService
          .getStatusTypes$()
          .pipe(map(estados => new EstadosCargados(estados)),
             catchError( err => of(new EstadosNoCargados('Los estados no han podido cargarse')))
      ))
    );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
