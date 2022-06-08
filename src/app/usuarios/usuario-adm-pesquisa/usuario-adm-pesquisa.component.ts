import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { TipoServico } from 'src/app/core/model';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { TipoServicoService } from 'src/app/tipoServicos/tipo-servico.service';
import { UsuarioFiltro, UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-adm-pesquisa',
  templateUrl: './usuario-adm-pesquisa.component.html',
  styleUrls: ['./usuario-adm-pesquisa.component.css']
})
export class UsuarioAdmPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new UsuarioFiltro();
  tipoServicoFiltro = new TipoServico();
  usuarios: any[] = [];
  tipoServicos = new Array<TipoServico>();
  @ViewChild('tabela') grid!: any;

  constructor(
    private usuarioService: UsuarioService,
    private tipoServicoService: TipoServicoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private title: Title,
    private logoutService: LogoutService
  ) {

  }

  ngOnInit(): void {
    this.logoutService.verificarLogado();
    this.title.setTitle('Pesquisa de Usuários');
    this.tipoServicoFiltro = new TipoServico();
    this.carregarTiposServicos();
  }

  carregarTiposServicos() {
    this.tipoServicoService.listarTodos().then((dados: any) => {
      this.tipoServicos = dados;
    })
  }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;
    console.log("filtro: ", this.filtro); 
    this.usuarios = [];
    
    this.usuarioService.pesquisarPorCamposPreenchidos(this.filtro)
      .then((dados: any) => {
        this.usuarios = dados.usuarios;
        this.totalRegistros = dados.total;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  confirmarExclusao(usuario: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(usuario);
      }
    });
  }

  excluir(usuario: any) {

    this.usuarioService.excluir(usuario.id)
      .then(
        () => {
          this.grid.reset();

          this.messageService.add({ severity: 'success', detail: 'Usuario excluído com sucesso!' })
          this.pesquisar();
        }
      )
      .catch((error) => this.errorHandler.handle(error))

  }

}
