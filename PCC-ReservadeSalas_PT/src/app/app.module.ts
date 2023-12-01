import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastroDeSalaComponent } from './salas/cadastro-de-sala/cadastro-de-sala.component';
import { ListaDeSalasComponent } from './salas/lista-de-salas/lista-de-salas.component';
import { CadastroDeReservasComponent } from './reserva-de-salas/cadastro-de-reservas/cadastro-de-reservas.component';
import { ListaDeReservasComponent } from './reserva-de-salas/lista-de-reservas/lista-de-reservas.component';
import { TimeRangeDirective } from './directives/time-range.directive';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthInterceptor } from './services/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    CadastroDeSalaComponent,
    ListaDeSalasComponent,
    CadastroDeReservasComponent,
    ListaDeReservasComponent,
    TimeRangeDirective,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
