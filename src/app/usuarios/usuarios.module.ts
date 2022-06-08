import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';
import { UsuariosComponent } from './usuario-cadastro/usuarios.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { UsuarioAdmPesquisaComponent } from './usuario-adm-pesquisa/usuario-adm-pesquisa.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    TooltipModule,
    InputMaskModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,

    SharedModule,
    UsuariosRoutingModule
  ],
  declarations: [
    UsuariosComponent,
    UsuarioPesquisaComponent,
    UsuarioAdmPesquisaComponent
  ],
  exports: []
})
export class UsuariosModule { }
