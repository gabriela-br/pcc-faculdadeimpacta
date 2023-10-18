import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroDeSalaComponent } from './salas/cadastro-de-sala/cadastro-de-sala.component';
import { ListaDeSalasComponent } from './salas/lista-de-salas/lista-de-salas.component';
import { ListaDeReservasComponent } from './reserva-de-salas/lista-de-reservas/lista-de-reservas.component';
import { CadastroDeReservasComponent } from './reserva-de-salas/cadastro-de-reservas/cadastro-de-reservas.component';

const routes: Routes = [
  { path: '', component: ListaDeReservasComponent },
  { path: 'lista-de-salas', component: ListaDeSalasComponent },
  { path: 'lista-de-reservas', component: ListaDeReservasComponent },
  { path: 'cadastro-de-salas', component: CadastroDeSalaComponent },
  { path: 'cadastro-de-reservas', component: CadastroDeReservasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
