import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../../seguranca/logout.service';
import { ErrorHandlerService } from '../error-handler.service';
import { Perfil, PerfilEnum } from '../model';

import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu: boolean = false;
  usuarioLogado: any;

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
    let store: any = localStorage.getItem('usuarioLogado');
    console.log("stream: ", store);
    
    if(store){
      this.usuarioLogado = JSON.parse(store);
    }
    ; //this.auth.jwtPayload?.nome;
  }

  temPermissao(tela: string) {
    if (this.usuarioLogado &&  this.usuarioLogado.perfil.id == PerfilEnum.Cliente && (tela == 'agendas/historico' || tela == 'usuarios' || tela == 'agendas/marcacao')) {
      return true;
    }

    if (this.usuarioLogado && this.usuarioLogado.perfil.id == PerfilEnum['Prestador de Serviços'] && tela == 'agendas') {
      return true
    }

    if (this.usuarioLogado && this.usuarioLogado.perfil.id == PerfilEnum.Administrador && tela == 'usuarios/adm') {
     
      return true
    }

   

    return false


    //return this.auth.temPermissao(permissao);
  }

  logout() {

    this.logoutService.logout();
    /*this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));*/
  }
}
