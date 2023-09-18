import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroDeSalaComponent } from './cadastro-de-sala/cadastro-de-sala.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaDeSalasComponent } from './lista-de-salas/lista-de-salas.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroDeSalaComponent,
    ListaDeSalasComponent
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
