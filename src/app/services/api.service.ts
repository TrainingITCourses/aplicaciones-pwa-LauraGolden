import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { GlobalState } from '..';
import { ModoBusqueda } from '../shared/criterion/criterion-modo';


@Injectable()
export class ApiService {
  constructor(private httpC: HttpClient, private store: Store<GlobalState>) {}

  public getCriteria(criterio: ModoBusqueda): Observable<any>  {
    switch (criterio) {
      case 1 : // 'Estado':
        return this.getStatusTypes();
      case 2: // 'Agencia':
        return this.getAgencies();
      case 3: // 'Tipo':
        return this.getMissionsTypes();
    }
  }

  public getAllCriteria(criterio: ModoBusqueda): Observable<any>  {
    switch (criterio) {
      case 1 : // 'Estado':
        return this.getStatusTypes();
      case 2: // 'Agencia':
        return this.getAgencies();
      case 3: // 'Tipo':
        return this.getMissionsTypes();
    }
  }
  private getStatusTypes() {
    return this.httpC.get('../../assets/launchstatus.json').pipe(
      map((res: any) => {
        return res.types;
      })
    );
  }

  private getAgencies() {
    return this.httpC.get('../../assets/launchagencies.json').pipe(
      map((res: any) => {
        return res.agencies;
      })
    );
  }

  private getMissionsTypes() {
    return this.httpC.get('../../assets/launchmissions.json').pipe(
      map((res: any) => {
        return res.types;
      })
    );
  }


  public getStatusTypes$ = (): Observable<any[]> =>
    this.httpC
      .get('../../assets/launchstatus.json')
      .pipe(map((res: any) => res.types))


  public getFilterLaunches(criterio: ModoBusqueda, valor): Observable<any> {
    if (valor !== null) {
      return this.httpC.get('../../assets/launchlibrary.json').pipe(
        map((res: any) =>
          res.launches
            .filter(lan => {
              switch (criterio) {
                case 1: // Estado
                  return this.filtraEstados(lan, Number(valor));
                case 2: // Agencia
                  return this.filtraAgencias(lan, Number(valor));
                case 3: // Tipo de mision
                  return this.filtraMisiones(lan, Number(valor));
              }
            })
            .map(lanzamiento => {
              return lanzamiento;
            })
        )
      );
    } else {
      return of([]);
    }
  }

  private filtraEstados(lanzamiento: any, valor: number): boolean {
    return (lanzamiento.status === valor);
  }
  private filtraAgencias(lanzamiento: any, valor: number): boolean {
      let res: boolean;
      res = false;
      if (lanzamiento.rocket !== undefined && lanzamiento.rocket !== null) {
        if (lanzamiento.rocket.agencies !== undefined && lanzamiento.rocket.agencies !== null) {
          if (lanzamiento.rocket.agencies !== undefined && lanzamiento.rocket.agencies !== null) {}
          if (lanzamiento.rocket.agencies.length !== null && lanzamiento.rocket.agencies.length !== undefined) {
            if (lanzamiento.rocket.agencies.length > 0) {
              res = lanzamiento.rocket.agencies[0].id === valor;
            }
          }
        }
      }
      return res;
  }
  private filtraMisiones(lanzamiento: any, valor: number): boolean {
      let res: boolean;
      res = false;
      if (lanzamiento.missions !== undefined) {
        if (lanzamiento.missions.length > 0) {
          res = lanzamiento.missions[0].type === valor;
        }
      }
      return res;
  }
}
