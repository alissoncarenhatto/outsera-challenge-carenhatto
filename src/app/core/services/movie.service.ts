import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly API = environment.apiUrl;
  constructor(private http: HttpClient) {}

  /**
   * Busca uma página de filmes
   * @param page Índice da página.
   * @param size Quantidade de itens por página.
   * @param winner Se true, retorna só vencedores; false não‑vencedores; se não passar retorna ambos.
   * @param year filtrar filmes daquele ano.
   */
  getAll(page = 0, size = 10, winner?: boolean, year?: number): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    
    if (winner !== undefined) {
      params = params.set('winner', String(winner));
    }
    
    if (year !== undefined) {
      params = params.set('year', String(year));
    }

    return this.http.get<any>(this.API, { params });
  }

  /** Retorna os anos que tiveram mais de um vencedor */
  getYearsWithMultipleWinners(): Observable<any> {
    return this.http.get<any>(`${this.API}?projection=years-with-multiple-winners`);
  }

  /** Retorna estúdios com contagem de vitórias, ordenados decrescente */
  getStudiosWinCount(): Observable<any> {
    return this.http.get<any>(`${this.API}?projection=studios-with-win-count`);
  }

  /** Retorna produtores com maior e menor intervalo entre vitórias */
  getProducersWinInterval(): Observable<any> {
    return this.http.get<any>(`${this.API}?projection=max-min-win-interval-for-producers`);
  }

  /**
   * Busca vencedores de um ano específico
   * @param year filtrar vencedor daquele ano.
   */
  getWinnersByYear(year: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}?winner=true&year=${year}`);
  }
}