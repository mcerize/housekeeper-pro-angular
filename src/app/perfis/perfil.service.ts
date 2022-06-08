import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
}
)
export class PerfilService {
  perfisUrl: string;

  constructor(private http: HttpClient) {
    this.perfisUrl = `${environment.apiUrl}/perfis`;
  }

  /* listarTodos(): Promise<any> {
 
     return this.http.get(this.perfisUrl)
       .toPromise()
       .then((response: any) => response.json().content);
   }*/

  listarTodos(): Promise<any> {
    /* const headers = new HttpHeaders()
       .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');*/

    const headers = new HttpHeaders().
      append('Content-Type', 'application/json');

    return this.http.get(this.perfisUrl, { headers })
      .toPromise()
      .then((response: any) => response);


  }

}