import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCalendar } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda, Usuario } from 'src/app/core/model';
import { UsuarioService } from 'src/app/usuarios/usuario.service';
import { AgendaService } from '../agenda.service';
import { Moment } from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { NavbarComponent } from 'src/app/core/navbar/navbar.component';
import { LogoutService } from 'src/app/seguranca/logout.service';


@Component({
  selector: 'app-agenda-cliente-marcacao',
  templateUrl: './agenda-cliente-marcacao.component.html',
  styleUrls: ['./agenda-cliente-marcacao.component.css']
})
export class AgendaClienteMarcacaoComponent implements OnInit {

  idUsuario: number = 0;
  idTipoServico: number = 0;
  agendasUsuarioServico: Array<Agenda> = [];
  agendasSelecionadas: Array<Agenda> = [];
  minDate = new Date();
  cliente = new Usuario();
  eventSelected: any;
  usuarioLogado= new Usuario();
  @ViewChild('calendar') calendar?: MatCalendar<Moment>;

  constructor(
    private route: ActivatedRoute,
    public usuarioService: UsuarioService,
    public agendaService: AgendaService,
    private confirmationService: ConfirmationService,
    private renderer: Renderer2,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private logoutService: LogoutService
  ) { }

  ngOnInit(): void {
    this.logoutService.verificarLogado();

    let usuarioLogadoStorage:any = localStorage.getItem('usuarioLogado');
    this.usuarioLogado =  JSON.parse(usuarioLogadoStorage);

    this.idUsuario = this.route.snapshot.params['idUsuario'];
    this.idTipoServico = this.route.snapshot.params['idTipoServico'];
    this.buscarAgendasPorUsuarioServico();
    this.carregarUsuarioLogado();
 
  }

  ngAfterViewInit() {
    const buttons = document
     .querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');
    
    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          this.colorirDatasCadastradas();
        });
      });
    }
  }

  private colorirDatasCadastradas() {
    let dias: Array<string> = [];
    this.agendasUsuarioServico.forEach(agenda => {
      let dataFormatadda = this.converterFormatDateToString(agenda.dataServico);
      dias.push(dataFormatadda);
      this.highlightDays(dias);

    });
  }

  carregarUsuarioLogado() {
    this.usuarioService.buscarPorCodigo(Number(this.usuarioLogado.id)).then((dados: any) => {
      this.cliente = dados;       
    });

  }

  buscarAgendasPorUsuarioServico(salvando?: boolean) {
    this.agendaService.buscarPorUsuarioServico(this.idUsuario, this.idTipoServico).then((dados: any) => {
      this.agendasUsuarioServico = dados.agendas;
      this.colorirDatasCadastradas();
      console.log("Salvando: ", salvando);
      
      if(salvando) {
        this.aoSelecionarData(this.eventSelected);
      }
    })
  }

  aoSelecionarData(event: any) {   
    this.agendasSelecionadas = [];
    let dateSelectedFormatted = this.converterFormatDateToString(new Date(event._d));
    this.eventSelected = event;

    this.destacarDiaSelecionado(dateSelectedFormatted);

    this.agendasUsuarioServico.forEach(agenda => {
      let dataServicoDate = new Date(agenda.dataServico);
      let dataServicoFimDate = new Date(agenda.dataServicoFim);
      if (dataServicoDate.getDate() == event._i.date && dataServicoDate.getMonth() == event._i.month && dataServicoDate.getFullYear() == event._i.year) {
        agenda.horarioServico = dataServicoDate.getHours() + ":" + this.formatarMinuto(dataServicoDate);
        agenda.horarioServicoFim = dataServicoFimDate.getHours() + ":" + this.formatarMinuto(dataServicoFimDate);

        this.agendasSelecionadas.push(agenda);
      }

    })

  }

  private formatarMinuto(data: Date) {
    return (data.getMinutes() != null && data.getMinutes() != undefined && data.getMinutes().toString().length == 1) ? data.getMinutes() + '0' : data.getMinutes();
  }

  private destacarDiaSelecionado(dateSelectedFormatted: string) {
    let dias: Array<string> = [];
    dias.push(dateSelectedFormatted);
    this.sublimeDays(dias);
  }


  converterFormatDateToString(dataServico: Date): string {
    const dataServicoDate = new Date(dataServico);
    const day = dataServicoDate.getDate();
    const month = this.converterMonthNumberToMonthName(dataServicoDate);
    const year = dataServicoDate.getFullYear();

    return month + " " + day + ", " + year;

  }

  converterMonthNumberToMonthName(dataServico: Date): any {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[dataServico.getMonth()];
  }

  private highlightDays(days: string[]) {
    const dayElements = document.querySelectorAll(
      'mat-calendar .mat-calendar-table .mat-calendar-body-cell'
    );


    Array.from(dayElements).forEach((element) => {
      const matchingDay = days.find((d) => d === element.getAttribute('aria-label')) !== undefined;

      if (matchingDay) {
        this.renderer.addClass(element, 'available');
        //this.renderer.setAttribute(element, 'title', 'Event 1');
      } else {
        this.renderer.removeClass(element, 'available');
        this.renderer.removeAttribute(element, 'title');
      }
    });
  }

  private sublimeDays(days: string[]) {
    const dayElements = document.querySelectorAll(
      'mat-calendar .mat-calendar-table .mat-calendar-body-cell'
    );


    Array.from(dayElements).forEach((element) => {
      const matchingDay = days.find((d) => d === element.getAttribute('aria-label')) !== undefined;

      if (matchingDay) {
        this.renderer.addClass(element, 'selected');
      } else {
        this.renderer.removeClass(element, 'selected');
        this.renderer.removeAttribute(element, 'title');
      }
    });
  }

  confirmarAgendamento(agenda: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja realizar o agendamento?',
      accept: () => {
        this.salvar(agenda);

      }
    });
  }

  salvar(item: any) {
    console.log("item: ", item);
    item.cliente = this.cliente;
    this.agendaService.atualizar(item).then((dados: any) => {
      this.buscarAgendasPorUsuarioServico(true);   
      this.messageService.add({ severity: 'success', detail: 'Agendamento realizado com sucesso!' });
      
    }).catch(erro => this.errorHandler.handle(erro));
  }

}
