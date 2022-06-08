import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Agenda, Usuario } from 'src/app/core/model';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { UsuarioService } from 'src/app/usuarios/usuario.service';
import { AgendaFiltro, AgendaService } from '../agenda.service';

@Component({
  selector: 'app-agenda-cliente-historico',
  templateUrl: './agenda-cliente-historico.component.html',
  styleUrls: ['./agenda-cliente-historico.component.css']
})
export class AgendaClienteHistoricoComponent implements OnInit {

  totalRegistros = 0;
  filtro = new AgendaFiltro();
  agendas: any[] = [];
  agenda = new Agenda();
  usuario = new Usuario();
  usuarioLogado= new Usuario();
  @ViewChild('tabela') grid!: any;

  constructor(public usuarioService: UsuarioService, public agendaService: AgendaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private logoutService: LogoutService) { }

  ngOnInit(): void {
    this.logoutService.verificarLogado();
    let usuarioLogadoStorage:any = localStorage.getItem('usuarioLogado');
    this.usuarioLogado =  JSON.parse(usuarioLogadoStorage);

    this.carregarUsuarioLogado();
  }

  carregarUsuarioLogado() {
    this.usuarioService.buscarPorCodigo(Number(this.usuarioLogado.id)).then((dados: any) => {
      this.usuario = dados;
      this.pesquisarPorCliente();
    });

  }

  pesquisarPorCliente() {
    this.agendas = [];
    this.agendaService.pesquisarPorCliente(this.usuario).then((dados: any) => {
      this.agendas = dados.agendas;
      this.inicializarClienteNulo();

    })
  }

  private inicializarClienteNulo() {
    this.agendas.forEach(agenda => {
      if (!agenda.cliente) {
        agenda.cliente = new Usuario();
      }
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    //this.pesquisar(pagina);
  }

  confirmarExclusao(agenda: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir o agendamento?',
      accept: () => {
        this.excluirCliente(agenda);
      }
    });
  }

  excluirCliente(agenda: any) {

      agenda.cliente = undefined;

      this.agendaService.atualizar(agenda).then((dados: any) => {
        this.pesquisarPorCliente();   
        this.messageService.add({ severity: 'success', detail: 'Agendamento excluído com sucesso!' });
        
      }).catch(erro => this.errorHandler.handle(erro));

    } 

}
