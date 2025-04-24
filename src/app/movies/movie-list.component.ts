import { Component, OnInit } from '@angular/core';
import { MovieService } from '../core/services/movie.service';
import { Movie } from '../core/models/movie.model';
import { TableColumn } from '../components/table/table.interface';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  /** Lista de filmes exibidos na tabela */
  movies: Movie[] = [];
  /** Total de elementos retornados pela API (para paginação) */
  total = 0;
  /** Quantidade de itens por página */
  pageSize = 15;
  /** Índice da página atual */
  pageIndex = 0;
  /** Filtro de ano */
  yearFilter?: number;
  /** Filtro de somente vencedores */
  winnerFilter?: boolean;

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', align: 'center' },
    { key: 'year', label: 'Year', isFilter: true, type: 'input', align: 'center' },
    {
      key: 'title',
      label: 'Title',
      align: 'center'
    },
    {
      key: 'winner',
      label: 'Winner?',
      isFilter: true,
      type: 'select',
      align: 'center',
      options: [
        { value: undefined, viewValue: 'Yes/No' },
        { value: true, viewValue: 'Yes' },
        { value: false, viewValue: 'No' }
      ]
    }
  ]

  constructor(private movieService: MovieService) {}

  /**
   * Carrega a primeira página de filmes com filtros padrão.
   */
  ngOnInit(): void {
    this.loadMovies();
  }

  /**
   * Busca os filmes na API
   * Preenche `movies` e `total` com a resposta da API.
   */
  loadMovies(): void {
    const winner = this.winnerFilter;
    const year   = this.yearFilter;

    this.movieService
      .getAll(this.pageIndex, this.pageSize, winner, year)
      .subscribe(res => {
        this.movies = res.content.map((m) => ({
          ...m,
          winnerText: m.winner ? 'Yes' : 'No'
        }));
        this.total  = res.totalElements;
      });
  }

  /**
   * Aplica os filtros que são recebido pelo TableComponent.
   *
   * @param filters Objeto contendo chave-valor, ex:
   *   { year: 2000, winner: true }
   */
  applyFilters(filters: { [key: string]: any }) {
    this.yearFilter   = filters['year'] ?? undefined;
    this.winnerFilter = filters['winner'] !== undefined ? filters['winner'] : undefined;

    this.pageIndex    = 0;
    this.loadMovies();
  }

  /**
   * Dispara quando troca de página do TableComponent.
   *
   * @param page Índice da página selecionada
   */
  onPageChangeCustom(page: number) {
    this.pageIndex = page;
    this.loadMovies();
  }
}