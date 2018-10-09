import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ValoresActionTypes, CargarValores, ValoresGuardados, ValoresNoGuardados } from '../accions/valores.actions';
import { mergeMap, map, catchError} from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { of } from 'rxjs';


@Injectable()
export class ValoresEffects {

  @Effect()
  public Carga$ = this.actions$
    .ofType(ValoresActionTypes.CargarValores)
    .pipe(
      mergeMap((action: CargarValores) =>
        this.apiService
          .getCriteria(action.payload)
          .pipe(map(valores => new ValoresGuardados(valores)),
            catchError( err => of(new ValoresNoGuardados('Los valores no han podido cargarse')))
      ))
    );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
