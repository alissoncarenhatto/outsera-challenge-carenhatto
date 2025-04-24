import { Component, OnInit } from '@angular/core';
import { MovieService } from '../core/services/movie.service';
import { YearCount, StudioCount, ProducerInterval, Movie } from '../core/models/movie.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /** Anos em que mais de um filme ganhou no mesmo ano */
  yearsMultiple: YearCount[] = [];
  /** Três estúdios com mais vitórias */
  studiosCount: StudioCount[] = [];
  /** Produtores com menor intervalo entre vitórias */
  producersMin: ProducerInterval[] = [];
  /** Produtores com maior intervalo entre vitórias */
  producersMax: ProducerInterval[] = [];
  /** Lista de vencedores para o ano pesquisado */
  winnersByYear: Movie[] = [];
  /** Ano que o usuário digitar para buscar vencedores */
  yearSearch?: number;

  constructor(private movieService: MovieService) {}

  /** Carrega todos os dados iniciais do dashboard */
  ngOnInit(): void {
    this.movieService.getYearsWithMultipleWinners().subscribe(res => this.yearsMultiple = res.years);
    this.movieService.getStudiosWinCount().subscribe(res => this.studiosCount = res.studios);
    this.movieService.getProducersWinInterval().subscribe(res => {
        this.producersMin = res.min;
        this.producersMax = res.max;
      });
  }

  /**
   * Busca de vencedores para o ano em `yearSearch`.
   * Só executa se tiver preenchido o campo `yearSearch`.
   */
  searchYear(): void {
    if (!this.yearSearch) {
      this.winnersByYear = [];
      return;
    }
    this.movieService.getWinnersByYear(this.yearSearch)
      .subscribe(res => this.winnersByYear = res);
  }
}