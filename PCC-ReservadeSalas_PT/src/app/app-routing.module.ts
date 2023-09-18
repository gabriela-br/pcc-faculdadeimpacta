import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroDeSalaComponent } from './cadastro-de-sala/cadastro-de-sala.component';
import { ListaDeSalasComponent } from './lista-de-salas/lista-de-salas.component';

const routes: Routes = [
  { path: '', component: ListaDeSalasComponent },
  { path: 'cadastro', component: CadastroDeSalaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
