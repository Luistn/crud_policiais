import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Policial {
  id?: number;
  rg_civil: string;
  rg_militar: string;
  cpf: string;
  data_nascimento: string;
  matricula: string;
}

@Injectable({ providedIn: 'root' })
export class PoliciaisService {
  private apiUrl = 'http://localhost:3333/policiais';

  constructor(private http: HttpClient) {}

  cadastrarPolicial(dados: Policial): Observable<any> {
    return this.http.post(this.apiUrl, dados).pipe(
      catchError(this.handleError)
    );
  }

  listarPoliciais(filtro?: { cpf?: string; rg?: string }): Observable<Policial[]> {
    let params = new HttpParams();
    if (filtro?.cpf) params = params.set('cpf', filtro.cpf);
    if (filtro?.rg) params = params.set('rg', filtro.rg);
    return this.http.get<Policial[]>(this.apiUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error?.error || 'Erro de comunicação com o servidor.');
  }
}