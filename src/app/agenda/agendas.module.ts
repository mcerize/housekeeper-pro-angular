import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from "@angular/material/select";
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import { SharedModule } from "../shared/shared.module";
import { AgendaClienteDetalheComponent } from "./agenda-cliente-detalhe/agenda-cliente-detalhe.component";
import { AgendaClienteMarcacaoComponent } from "./agenda-cliente-marcacao/agenda-cliente-marcacao.component";
import { AgendaPrestadorServicoComponent } from "./agenda-prestador-servico/agenda-prestador-servico.component";
import { AgendasRoutingModule } from "./agendas-routing-module";
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AgendaClienteHistoricoComponent } from "./agenda-cliente-historico/agenda-cliente-historico.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    TooltipModule,
    InputMaskModule,
    MatSelectModule,
    MatDatepickerModule,
    CurrencyMaskModule,

    SharedModule,
    AgendasRoutingModule,
    MatNativeDateModule,
    DropdownModule,
    MatCardModule,


    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule

  ],
  declarations: [
    AgendaPrestadorServicoComponent,
    AgendaClienteDetalheComponent,
    AgendaClienteMarcacaoComponent,
    AgendaClienteHistoricoComponent

  ],
  exports: []
})
export class AgendasModule { }
