import { Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GlobalState } from '../..';
import { ModoBusqueda } from '../../shared/criterion/criterion-modo';
import { CargarValores } from '../../accions/valores.actions';
import { CargarLanzamientos } from '../../accions/lanzamientos.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ApiService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  public valores$: Observable<any>;
  public lanzamientos$: Observable<any>;
  private criterioActual: ModoBusqueda;
  public loaded = false;

  constructor(private store: Store<GlobalState>) { }
  @Input() public titulo: string;

  ngOnInit() {
    this.cargaObservables();
    console.log('Search_ngOnInit');
  }


  private cargaObservables() {
      this.valores$ = this.store.select('valores').pipe(
        map(Val => {
          return Val.valores;
        })
      );

      this.lanzamientos$ = this.store.select('lanzamientos').pipe(
        tap(() => (this.loaded = true)),
        map(Lan => {
          return Lan.lanzamientos;
        })
      );
  }

  onCriterioSeleccionado (criterioSel: ModoBusqueda) {
    console.log('criterio seleccionado: ' + criterioSel);

    this.criterioActual = criterioSel;
    // como se selecciona un nuevo criterio de búsqueda, vaciamos los lanzamientos que estuviesen cargados
    this.store.dispatch(new CargarLanzamientos([-1, -1]));
    // cargamos la acción de carga de valores según un criterio de búsqueda,
    // el efecto escucha dicha acción, y éste es el que llama al api para cargar la información.
    this.store.dispatch(new CargarValores(this.criterioActual));


  }

  onSubCriterioSeleccionado = (SubcriterioSel: Number) => {
    console.log('Busqueda por criterio seleccionado: ' + SubcriterioSel);
    // Duda: por mucho que reciba un parámetro de tipo Number, me llega siempre un string,
    // ¿da igual qué tipo se ponga para recibir el parámetro?
    const busca: number = Number(SubcriterioSel);
    // cargamos la acción del lanzamiento, el efecto escucha dicha acción, y éste es el que llama al api para cargar la información.
    this.store.dispatch(new CargarLanzamientos([this.criterioActual, SubcriterioSel]));

  }
}
