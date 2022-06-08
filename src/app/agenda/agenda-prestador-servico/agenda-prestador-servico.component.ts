import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Agenda, TipoServico, Usuario } from 'src/app/core/model';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { TipoServicoService } from 'src/app/tipoServicos/tipo-servico.service';
import { UsuarioService } from 'src/app/usuarios/usuario.service';
import { AgendaFiltro, AgendaService } from '../agenda.service';


@Component({
  selector: 'app-agenda-prestador-servico',
  templateUrl: './agenda-prestador-servico.component.html',
  styleUrls: ['./agenda-prestador-servico.component.css']
})
export class AgendaPrestadorServicoComponent implements OnInit {

  totalRegistros = 0;
  filtro = new AgendaFiltro();
  agenda = new Agenda();
  agendas: any[] = [];
  @ViewChild('tabela') grid!: any;
  tipoServicos = new Array<TipoServico>();
  selectedTipoServico = new TipoServico();
  usuario = new Usuario();
  usuarioLogado= new Usuario();

  formulario!: FormGroup;

  constructor(
    private title: Title,
    public datepipe: DatePipe,
    public tipoServicoService: TipoServicoService,
    public usuarioService: UsuarioService,
    public agendaService: AgendaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private logoutService: LogoutService) {

      
    }
    
    ngOnInit(): void {
      this.logoutService.verificarLogado();
      
      let usuarioLogadoStorage:any = localStorage.getItem('usuarioLogado');
      this.usuarioLogado =  JSON.parse(usuarioLogadoStorage); 
      
      this.title.setTitle('Agenda');
      this.configurarFormulario();
      this.carregarUsuarioLogado();
      
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      dataServico: [null, Validators.required],
      dataServicoFim: [null, Validators.required],
      valorServico: [null, Validators.required],
      selectedTipoServico: [null, Validators.required]
    });
  }

  carregarUsuarioLogado() {
    this.usuarioService.buscarPorCodigo(Number(this.usuarioLogado.id)).then((dados: any) => {
      this.usuario = dados;
      this.pesquisarPorPrestadorServico();
      this.carregarTiposServicos();
    });

  }

  carregarTiposServicos() {
    this.tipoServicos = this.usuario.tipoServicos;
  }

  pesquisarPorPrestadorServico() {
    this.agendas = [];
    this.agendaService.pesquisarPorPrestadorServico(this.usuario).then((dados: any) => {
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

  adicionar() {
    this.agenda.tipoServico = this.selectedTipoServico;
    this.agenda.prestadorServico = this.usuario;

    this.agendaService.adicionar(this.agenda).then((agendaSalva: any) => {
      agendaSalva.cliente = agendaSalva.cliente ? agendaSalva.cliente : new Usuario();
      this.agendas.push(agendaSalva);
      this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso!' });
    }).catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    //this.pesquisar(pagina);
  }

  confirmarExclusao(agenda: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(agenda);
      }
    });
  }

  excluir(agenda: any) {

    if (!agenda.cliente || (agenda.cliente && !agenda.cliente.id)) {

      this.agendaService.excluir(agenda.id)
        .then(
          () => {
            this.grid.reset();
            this.messageService.add({ severity: 'success', detail: 'Horário excluído com sucesso!' })
            this.pesquisarPorPrestadorServico();
          }
        )
        .catch((error) => this.errorHandler.handle(error))

    } else {
      this.messageService.add({ severity: 'error', detail: 'Não é permitido excluir um horário já agendado!' })
    }
  }

}
