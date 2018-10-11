import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { UpdateAvailableEvent } from '@angular/service-worker/src/low_level';
import { SwUpdate } from '@angular/service-worker';
import { GlobalState } from '../..';
import { CargarLanzamientos } from 'src/app/reducers/lanzamientos/lanzamientos.actions';
import { CargarValores } from 'src/app/reducers/valores/valores.actions';
import { CargarEstados } from '../../reducers/estados/estados.actions';


@Component({
  selector: 'app-shell-container',
  templateUrl: './shell-container.component.html',
  styleUrls: ['./shell-container.component.css']
})
export class ShellContainerComponent implements OnInit {
  @Input() public titulo: string;
  public version: string;
  public _cargado = false;

  // public cargado = false;

  constructor(
    private store: Store<GlobalState>,
    // private dialogs: MdDialogsHelperService,
    private swUpdate: SwUpdate
  ) {

    this.store.select('estados').subscribe(st => {
      if (st) {
        if (st.cargado) {
          console.log('Cargado');
          this._cargado = true;
        } else {
          console.log('No Cargado');
        }
      }

      // if (st.cargando) {
      //   this._cargado = true;
      //   console.log('cargados estados');
      // } else {
      //   console.log('No cargados estados');
      //   // if (this.loadingDialog) {
      //   //   setTimeout(() => {
      //   //     this.dialogs.closeLoading(this.loadingDialog);
      //   //     this.loadingDialog = null;
      //   //   }, 100);
      //   // }
      // }
    });

  }

  ngOnInit() {
    console.log('Shell_ngOnInit');
    this.observeVersions();
    this.observeLoading();
  }


  private observeVersions() {
    this.version = '1';
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((event: UpdateAvailableEvent) => {
        const msg = 'Existe una nueva versión, ¿desea instalarla?';
        if (confirm(msg)) { window.location.reload(); }
      });
    }
  }

  private observeLoading() {
    this.store.dispatch(new CargarEstados());

    // this.store.select('estados').subscribe(st => {
    //   if (st.cargado) {
    //     console.log('Cargado');
    //     this._cargado = true;
    //   } else {
    //     console.log('No Cargado');
    //   }
    //   // if (st.cargando) {
    //   //   this._cargado = true;
    //   //   console.log('cargados estados');
    //   // } else {
    //   //   console.log('No cargados estados');
    //   //   // if (this.loadingDialog) {
    //   //   //   setTimeout(() => {
    //   //   //     this.dialogs.closeLoading(this.loadingDialog);
    //   //   //     this.loadingDialog = null;
    //   //   //   }, 100);
    //   //   // }
    //   // }
    // });
  }
}
