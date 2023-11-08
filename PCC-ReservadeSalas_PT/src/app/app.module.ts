import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastroDeSalaComponent } from './salas/cadastro-de-sala/cadastro-de-sala.component';
import { ListaDeSalasComponent } from './salas/lista-de-salas/lista-de-salas.component';
import { CadastroDeReservasComponent } from './reserva-de-salas/cadastro-de-reservas/cadastro-de-reservas.component';
import { ListaDeReservasComponent } from './reserva-de-salas/lista-de-reservas/lista-de-reservas.component';
import { TimeRangeDirective } from './directives/time-range.directive';


@NgModule({
  declarations: [
    AppComponent,
    CadastroDeSalaComponent,
    ListaDeSalasComponent,
    CadastroDeReservasComponent,
    ListaDeReservasComponent,
    TimeRangeDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
