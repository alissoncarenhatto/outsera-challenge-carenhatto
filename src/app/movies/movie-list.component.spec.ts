import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../core/services/movie.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../components/table/table.component';
import { By } from '@angular/platform-browser';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let mockService: any;

  const mockResponse = {
    content: [
      { id: 1, year: 2020, title: 'Movie A', studios: ['S1'], producers: ['P1'], winner: true },
      { id: 2, year: 2021, title: 'Movie B', studios: ['S2'], producers: ['P2'], winner: false }
    ],
    totalElements: 2
  };

  beforeEach(async () => {
    mockService = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of(mockResponse))
    };

    await TestBed.configureTestingModule({
      declarations: [MovieListComponent, TableComponent],
      imports: [CommonModule, FormsModule],
      providers: [{ provide: MovieService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should load movies with default pagination', () => {
    fixture.detectChanges();
    expect(mockService.getAll).toHaveBeenCalledWith(0, 15, undefined, undefined);
    expect(component.movies.length).toBe(2);
    expect(component.total).toBe(2);
  });

  it('applyFilters should set filters and reload movies', () => {
    spyOn(component, 'loadMovies');
    component.applyFilters({ year: 1999, winner: true });
    expect(component.yearFilter).toBe(1999);
    expect(component.winnerFilter).toBe(true);
    expect(component.pageIndex).toBe(0);
    expect(component.loadMovies).toHaveBeenCalled();
  });

  it('onPageChangeCustom should update pageIndex and reload', () => {
    spyOn(component, 'loadMovies');
    component.onPageChangeCustom(3);
    expect(component.pageIndex).toBe(3);
    expect(component.loadMovies).toHaveBeenCalled();
  });

  it('should pass correct inputs to TableComponent', () => {
    fixture.detectChanges();
    const tableDE = fixture.debugElement.query(By.directive(TableComponent));
    const tableInstance = tableDE.componentInstance as TableComponent;

    expect(tableInstance.data[0].winner).toBeTrue();
    expect(tableInstance.data[1].winner).toBeFalse();
    expect(tableInstance.data[0].winnerText).toBe('Yes');
    expect(tableInstance.data[1].winnerText).toBe('No');
 
    expect(tableInstance.total).toBe(2);
    expect(tableInstance.pageIndex).toBe(0);
    expect(tableInstance.pageSize).toBe(15);
  });
 
});