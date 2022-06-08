import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { TipoServico } from '../core/model';

@Injectable({
  providedIn: 'root'
}
)
export class TipoServicoService {
  tipoServicosUrl: string;

  constructor(private http: HttpClient) {
    this.tipoServicosUrl = `${environment.apiUrl}/servicos`;
  }

  listarTodos(): Promise<any> {
    /* const headers = new HttpHeaders()
       .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');*/

    const headers = new HttpHeaders().
      append('Content-Type', 'application/json');

    return this.http.get(this.tipoServicosUrl, { headers })
      .toPromise()
      .then((response: any) => response);
  }

  buscarPorCodigo(id: number): Promise<TipoServico> {
    const headers = new HttpHeaders().
      append('Content-Type', 'application/json');

    return this.http.get(`${this.tipoServicosUrl}/${id}`, { headers })
      .toPromise()
      .then((response: any) => {
        return response;
      });
  }

}