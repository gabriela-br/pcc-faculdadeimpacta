import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroDeSalaComponent } from './salas/cadastro-de-sala/cadastro-de-sala.component';
import { ListaDeSalasComponent } from './salas/lista-de-salas/lista-de-salas.component';
import { ListaDeReservasComponent } from './reserva-de-salas/lista-de-reservas/lista-de-reservas.component';
import { CadastroDeReservasComponent } from './reserva-de-salas/cadastro-de-reservas/cadastro-de-reservas.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lista-de-salas', component: ListaDeSalasComponent, canActivate: [AuthGuard] },
  { path: 'lista-de-reservas', component: ListaDeReservasComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-de-salas', component: CadastroDeSalaComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-de-reservas', component: CadastroDeReservasComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
