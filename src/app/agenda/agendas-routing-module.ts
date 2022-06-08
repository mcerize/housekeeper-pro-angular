import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { AgendaClienteDetalheComponent } from './agenda-cliente-detalhe/agenda-cliente-detalhe.component';
import { AgendaClienteHistoricoComponent } from './agenda-cliente-historico/agenda-cliente-historico.component';
import { AgendaClienteMarcacaoComponent } from './agenda-cliente-marcacao/agenda-cliente-marcacao.component';
import { AgendaPrestadorServicoComponent } from './agenda-prestador-servico/agenda-prestador-servico.component';


const routes: Routes = [
  { 
    path: 'novo', 
    component: AgendaPrestadorServicoComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_AGENDA'] } 
  },
  { 
    path: '', 
    component: AgendaPrestadorServicoComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_AGENDA'] } 
  },
  { path: 'marcacao/:idUsuario/:idTipoServico', component: AgendaClienteMarcacaoComponent },
  
  { path: ':id/:idTipoServico', component: AgendaClienteDetalheComponent },
  { path: 'historico', component: AgendaClienteHistoricoComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AgendasRoutingModule { }
