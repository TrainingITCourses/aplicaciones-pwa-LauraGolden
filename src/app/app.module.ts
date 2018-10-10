import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent} from './shell-container/search/search.component';
import { LaunchesListComponent } from './shared/launches-list/launches-list.component';
import { CriterionComponent } from './shared/criterion/criterion.component';
import { CounterComponent } from './shared/counter/counter.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '.';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ApiService } from './services/api.service';
import { EffectsModule } from '@ngrx/effects';
import { LanzamientosEffects } from './reducers/lanzamientos/lanzamientos.effects';
import { ValoresEffects } from './reducers/valores/valores.effects';
import { EstadosEffects } from './reducers/estados/estados.effects';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ShellContainerComponent } from './shell-container/shell-container/shell-container.component';



@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LaunchesListComponent,
    CriterionComponent,
    CounterComponent,
    ShellContainerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([LanzamientosEffects, ValoresEffects, EstadosEffects]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
