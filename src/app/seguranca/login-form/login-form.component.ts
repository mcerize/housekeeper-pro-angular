import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { UsuarioService } from 'src/app/usuarios/usuario.service';
import { PerfilEnum } from 'src/app/core/model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  login(email: string, senha: string) {
    //this.router.navigate(['/dashboard']);
    /*
         this.usuarioService.atualizar(this.usuario)
           .then(usuario => {
             this.usuario = usuario;
             this.messageService.add({ severity: 'success', detail: 'Usuário alterado com sucesso!' });
     
             this.atualizarTituloEdicao();
           })
           .catch(erro => this.errorHandler.handle(erro));
       
   */
    this.usuarioService.buscarPorEmailSenha(email, senha)
      .then((usuarioL: any) => {

        if (usuarioL) {
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioL));
          console.log("localStorage", localStorage.getItem('usuarioLogado'));

          if (usuarioL.perfil.id == PerfilEnum.Cliente) {
            this.router.navigate(['/usuarios']);
          }
          if (usuarioL.perfil.id == PerfilEnum['Prestador de Serviços']) {
            this.router.navigate(['/agendas']);
          }
          if (usuarioL.perfil.id == PerfilEnum.Administrador) {
            this.router.navigate(['/usuarios/adm']);
          }
          // this.router.navigate(['/usuarios']);

        }
      })
      .catch(erro => this.errorHandler.handle(erro));

    /* this.auth.login(usuario, senha)
       .then(() => {
         this.router.navigate(['/dashboard']);
       })
       .catch((erro:any) => {
         this.errorHandler.handle(erro);
       });*/
  }

  novaConta() {
    this.router.navigate(['/usuarios/novo']);
  }

}
