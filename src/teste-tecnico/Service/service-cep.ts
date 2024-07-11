import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private apiUrl = 'https://viacep.com.br/ws/30160907/json/';

  constructor(private http: HttpClient) { }

  buscarEndereco(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map((response: any) => {
        return {
          cep: response.cep,
          logradouro: response.logradouro,
          complemento: response.complemento,
          bairro: response.bairro,
          localidade: response.localidade,
          uf: response.uf,
          ibge: response.ibge,
          gia: response.gia,
          ddd: response.ddd,
          siafi: response.siafi
        };
      }),
      catchError(error => {
        return throwError('Erro ao buscar o endereço');
      })
    );
  }
}
