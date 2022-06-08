import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl = 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
  ) { }

  logout() {

    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);

    /* return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
       .toPromise()
       .then(() => {
         this.auth.limparAccessToken();
       });*/
  }


verificarLogado() {
   if(!localStorage.getItem('usuarioLogado')) {
    this.router.navigate(['/login']);
  }
  
}



}
