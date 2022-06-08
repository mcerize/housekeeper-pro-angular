import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda, TipoServico, Usuario } from 'src/app/core/model';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { TipoServicoService } from 'src/app/tipoServicos/tipo-servico.service';
import { UsuarioService } from 'src/app/usuarios/usuario.service';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-agenda-cliente-detalhe',
  templateUrl: './agenda-cliente-detalhe.component.html',
  styleUrls: ['./agenda-cliente-detalhe.component.css']
})
export class AgendaClienteDetalheComponent implements OnInit {

  agendas: any[] = [];
  idUsuario: number = 0;
  idTipoServico: number = 0;
  usuario = new Usuario();
  agenda = new Agenda();
  servicosPrestados: String = '';
  tipoServico = new TipoServico();

  constructor(
    private route: ActivatedRoute,
    public usuarioService: UsuarioService,
    public agendaService: AgendaService,
    public tipoServicoService: TipoServicoService,
    private router: Router,
    private logoutService: LogoutService
  ) { }

  ngOnInit(): void {
    this.logoutService.verificarLogado();
    this.idUsuario = this.route.snapshot.params['id'];
    this.idTipoServico = this.route.snapshot.params['idTipoServico'];
    this.carregarTipoServico();
    this.carregarPrestadorServico();
  }

  carregarPrestadorServico() {
    this.usuarioService.buscarPorCodigo(this.idUsuario).then((dados: any) => {
      this.usuario = dados;
      this.usuario.tipoServicos.forEach(tipoServico => {
        this.servicosPrestados = tipoServico.nome + '; ';
        
      })
    });

  }

  carregarTipoServico() {
    this.tipoServicoService.buscarPorCodigo(this.idTipoServico).then((dados: any) => {
      this.tipoServico = dados;
      console.log("tipoServico: ", this.tipoServico);    
    })
  }

  solicitarServico() {
    this.router.navigate(['/agendas/marcacao', this.idUsuario, this.idTipoServico ]);
  }

}
