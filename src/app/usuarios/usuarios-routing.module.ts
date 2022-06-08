import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { UsuarioAdmPesquisaComponent } from './usuario-adm-pesquisa/usuario-adm-pesquisa.component';
import { UsuariosComponent } from './usuario-cadastro/usuarios.component';
import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';


const routes: Routes = [
  { 
    path: 'novo', 
    component: UsuariosComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_USUARIO'] } 
  },
  { 
    path: '', 
    component: UsuarioPesquisaComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_USUARIO'] } 
  },
  { path: 'adm', component: UsuarioAdmPesquisaComponent },
  { path: ':id', component: UsuariosComponent },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
