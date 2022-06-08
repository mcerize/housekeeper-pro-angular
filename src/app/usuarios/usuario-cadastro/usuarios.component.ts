import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Perfil, PerfilEnum, TipoServico, Usuario } from 'src/app/core/model';
import { PerfilService } from 'src/app/perfis/perfil.service';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { TipoServicoService } from 'src/app/tipoServicos/tipo-servico.service';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario = new Usuario();
  perfis = new Array<Perfil>();
  tipoServicos = new Array<TipoServico>();

  checked = false;
  formBuilder: any;
  validarObrigatoriedade: any;

  constructor(
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    private tipoServicoService: TipoServicoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    public title: Title,
    private logoutService: LogoutService
  ) {
  }

  ngOnInit() {
    const idUsuario = this.route.snapshot.params['id'];
    console.log("idUsuario",idUsuario);
    

    this.title.setTitle('Novo Usuário');
    this.carregarPerfis();

    if (idUsuario) {
      this.carregarUsuario(idUsuario);
    }
  }

  aoSelecionarPerfil(evento: any) {

    if (evento.value == 3) {
      this.carregarTiposServicos(this.usuario);
    }
  }

  carregarTiposServicos(usuario: Usuario) {
    this.tipoServicoService.listarTodos().then((dados: any) => {
      this.tipoServicos = dados;

      this.tipoServicos.forEach(tipo => {
        usuario.tipoServicos.forEach(usuTipo => {
          if (tipo.id == usuTipo.id) {
            tipo.selecionado = true;
          }
        })
      })


    })
  }

  carregarUsuario(id: number) {
    this.usuarioService.buscarPorCodigo(id)
      .then(usuario => {
        this.usuario = usuario;
        this.atualizarTituloEdicao();
        this.carregarPerfis();
        if (usuario.perfil.id == 3) {
          this.carregarTiposServicos(this.usuario);
        }
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPerfis() {
    this.perfis = [];
    this.perfilService.listarTodos().
      then((dados: any) => {
        var newArray: any[] = dados;
        console.log(this.usuario.perfil.id);
        
        if (this.usuario.perfil.id != PerfilEnum.Administrador) {
          newArray.forEach(n => {
            if (n.id !== 1) {
              this.perfis.push(n);
            }
          })
        } else {
          this.perfis = newArray;
        }
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de usuário: ${this.usuario.nome}`);
  }

  salvar(form: NgForm) {
    if (this.tipoServicos && this.tipoServicos.length > 0) {
      this.atribuirTipoServicos();
    }

    if (this.editando) {
      this.atualizarUsuario(form);
    } else {
      this.adicionarUsuario(form);
    }
  }

  atribuirTipoServicos() {
    this.usuario.tipoServicos = new Array<TipoServico>();
    this.tipoServicos.forEach(dado => {
      if (dado.selecionado) {
        this.usuario.tipoServicos.push(dado);
      }
    })
  }

  adicionarUsuario(form: NgForm) {
    this.usuarioService.adicionar(this.usuario)
      .then(usuarioAdicionado => {

        this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso!' });
        //this.router.navigate(['/usuarios', usuarioAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarUsuario(form: NgForm) {
    this.usuarioService.atualizar(this.usuario)
      .then(usuario => {
        this.usuario = usuario;
        this.messageService.add({ severity: 'success', detail: 'Usuário alterado com sucesso!' });

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  limpar(form: NgForm) {
    form.reset();

    this.router.navigate(['/usuarios/novo']);
  }

  get editando() {
    return Boolean(this.usuario.id)
  }

}
