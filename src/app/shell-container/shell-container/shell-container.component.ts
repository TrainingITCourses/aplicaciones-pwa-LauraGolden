import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { UpdateAvailableEvent } from '@angular/service-worker/src/low_level';
import { SwUpdate } from '@angular/service-worker';
import { GlobalState } from '../..';
// import { MdDialogsHelperService } from 'src/app/core/md-dialogs-helper/md-dialogs-helper.service';


@Component({
  selector: 'app-shell-container',
  templateUrl: './shell-container.component.html',
  styleUrls: ['./shell-container.component.css']
})
export class ShellContainerComponent implements OnInit {
  @Input() public titulo: string;
  @Input() public version: string;
  @Input() public _cargado: boolean;

  // public cargado = false;

  constructor(
    private store: Store<GlobalState>,
    // private dialogs: MdDialogsHelperService,
    private swUpdate: SwUpdate
  ) { }

  ngOnInit() {
    console.log('Shell_ngOnInit');
    this.observeVersions();
     this.observeLoading();
  }


  private observeVersions() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((event: UpdateAvailableEvent) => {
        // const msg =
        // 'current: ' +
        // event.current.hash +
        // '. Load new: ' +
        // event.available.hash +
        // ' ?';
        const msg = 'Existe una nueva versión: ' + this.version + ', ¿desea instalarla?';
        if (confirm(msg)) window.location.reload();
      });
    }
  }

        // this.dialogs
        //   .confirm('There is a new version', 'Click ok to install')
        //   .subscribe(res => {
        //     if (res) window.location.reload();
        //   });


  private observeLoading() {
    this.store.select('lanzamientos').subscribe(st => {
      if (st.cargando) {
        this._cargado = true;
      } else {
        // if (this.loadingDialog) {
        //   setTimeout(() => {
        //     this.dialogs.closeLoading(this.loadingDialog);
        //     this.loadingDialog = null;
        //   }, 100);
        // }
      }
    });
  }
}
