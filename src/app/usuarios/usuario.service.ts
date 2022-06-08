import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { TipoServico, Usuario } from '../core/model';

export class UsuarioFiltro {
  nome?: string;
  cpf?: string;
  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
}
)
export class UsuarioService {
  usuariosUrl: string;

  constructor(private http: HttpClient) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`;
  }

  pesquisar(filtro: UsuarioFiltro): Promise<any> {

    /*const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');*/

    const headers = new HttpHeaders().
      append('Content-Type', 'application/json');

    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.usuariosUrl}`, { headers })
      .toPromise()
      .then((response: any) => {
        const usuarios = response;

        const resultado = {
          usuarios,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  pesquisarPorTipoServico(filtro: TipoServico): Promise<any> {

    /*const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');*/

    const headers = new HttpHeaders().
      append('Content-Type', 'application/json');

    let id = filtro.id;

    return this.http.get(`${this.usuariosUrl}/tiposServicos/${id}`, { headers })
      .toPromise()
      .then((response: any) => {
        const usuarios = response;

        const resultado = {
          usuarios,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  pesquisarPorCamposPreenchidos(filtro: UsuarioFiltro): Promise<any> {

    /*const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');*/

    const headers = new HttpHeaders().
      append('Content-Type', 'application/json');

    if (!filtro.nome || filtro.nome == "") {
      filtro.nome = undefined;
    }

    if (!filtro.cpf || filtro.cpf == "") {
      filtro.cpf = undefined;
    }

    return this.http.get(`${this.usuariosUrl}/${filtro.nome}/${filtro.cpf}`, { headers })
      .toPromise()
      .then((response: any) => {
        const usuarios = response;

        const resultado = {
          usuarios,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  listarTodos(): Promise<any> {
    return this.http.get(this.usuariosUrl)
      .toPromise()
      .then((response: any) => response.json().content);
  }

  excluir(id: number): Promise<void> {
    //const headers = new HttpHeaders()
    //.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    const headers = new HttpHeaders().
      append('Content-Type', 'application/json');

    return this.http.delete<void>(`${this.usuariosUrl}/${id}`, { headers })
      .toPromise();
  }
  //return this.http.post(this.oauthTokenUrl, body,
  // { headers, withCredentials: true })

  adicionar(usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders().
      append('Content-Type', 'application/json');

    return this.http.post<Usuario>(this.usuariosUrl, usuario, { headers })
      .toPromise();

  }

  atualizar(usuario: Usuario): Promise<Usuario> {

    const headers = new HttpHeaders().
      append('Content-Type', 'application/json');

    return this.http.put(`${this.usuariosUrl}/${usuario.id}`,
      usuario, { headers })
      .toPromise()
      .then((response: any) => {
        return response
      });
  }

  buscarPorCodigo(id: number): Promise<any> {
    const headers = new HttpHeaders().
      append('Content-Type', 'application/json');

    return this.http.get(`${this.usuariosUrl}/${id}`, { headers })
      .toPromise()
      .then((response: any) => {
        this.converterStringsParaDatas([response]);
        return response;
      });
  }



  buscarPorEmailSenha(email: string, senha: string): Promise<Usuario> {
    const headers = new HttpHeaders().
      append('Content-Type', 'application/json');

    let usuario = new Usuario();
    usuario.email = email;
    usuario.senha = senha;

    return this.http.post(`${this.usuariosUrl}/usuario-logado`,
      usuario, { headers })
      .toPromise()
      .then((response: any) => {
        return response
      });
  }


  private converterStringsParaDatas(usuarios: any[]) {

    for (const usuario of usuarios) {

      usuario.dataNascimento = new Date(usuario.dataNascimento);

      if (usuario.dataNascimento) {
        usuario.dataNascimento = new Date(usuario.dataNascimento);
      }
    }
  }
}