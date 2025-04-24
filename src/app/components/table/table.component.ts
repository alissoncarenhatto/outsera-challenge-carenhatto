import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { TableColumn } from './table.interface';

@Component({
  selector: 'a-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  /** Definição das colunas */
  @Input() columns: Array<TableColumn> = [];

  /** Linhas a serem exibidas na tabela */
  @Input() data: any[] = [];

  /** Total de itens */
  @Input() total = 0;

  /** Página atual */
  @Input() pageIndex = 0;

  /** Quantidade de itens por página */
  @Input() pageSize = 10;

  /** Emite evento quando os filtros mudam */
  @Output() filterChange = new EventEmitter<any>();

  /** Emite evento quando a página muda */
  @Output() pageChange   = new EventEmitter<number>();

  /** Controla se a paginação é exibida ou não */
  @Input() showPagination = true;

  /** Armazena os valores dos filtros */
  filters: any = {};

  /** Número total de páginas */
  totalPages = 0;

  /** Array de índices de página */
  pages: number[] = [];

  /**
   * Detecta mudanças nos Inputs.
   * Sempre que 'total' ou 'pageSize' mudam, recalcula totalPages e pages.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.total || changes.pageSize) {
      // Calcula quantas páginas existem no total de itens
      this.totalPages = Math.ceil(this.total / this.pageSize);
      // Gera um array [0, 1, 2, ... totalPages-1] para iteração
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    }
  }

  /**
   * Chama quando um filtro é alterado.
   * Atualiza o objeto 'filters' e emite o novo valor de filters.
   *
   * @param key   Nome do campo filtrado
   * @param value Valor atual do filtro
   */
  onFilterChange(key: string, value: any): void {
    this.filters[key] = value;
    this.filterChange.emit(this.filters);
  }

  /** Vai para a primeira página */
  first(): void {
    if (this.pageIndex !== 0) this.pageChange.emit(0);
  }

  /** Vai para a página anterior, se não estiver na primeira */
  prev(): void {
    if (this.pageIndex > 0) this.pageChange.emit(this.pageIndex - 1);
  }

  /** Vai para a próxima página, se não estiver na última */
  next(): void {
    if (this.pageIndex + 1 < this.totalPages) this.pageChange.emit(this.pageIndex + 1);
  }

  /** Vai para a última página */
  last(): void {
    const lastPage = this.totalPages - 1;
    if (this.pageIndex !== lastPage) this.pageChange.emit(lastPage);
  }

  /**
   * Vai para uma página específica.
   *
   * @param page Índice da página
   */
  goTo(page: number): void {
    if (page >= 0 && page < this.totalPages) this.pageChange.emit(page);
  }
}