import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MovieService } from '../core/services/movie.service';
import { of } from 'rxjs';
import { TableComponent } from '../components/table/table.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      getYearsWithMultipleWinners: () => of({ years: [{ year: 2000, winnerCount: 2 }] }),
      getStudiosWinCount:         () => of({ studios: [{ name: 'Studio A', winCount: 5 }] }),
      getProducersWinInterval:    () => of({ min: [], max: [] }),
      getWinnersByYear:           () => of([{ id:1, year:2000, title:'X', studios:['A'], producers:['B'], winner:true }])
    };

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, TableComponent],
      imports: [CommonModule, FormsModule],
      providers: [{ provide: MovieService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load metrics on init', () => {
    expect(component.yearsMultiple.length).toBe(1);
    expect(component.studiosCount.length).toBe(1);
  });

  it('should render a table for yearsMultiple', () => {
    const table = fixture.nativeElement.querySelector('a-table');
    expect(table).toBeTruthy();
  });

  it('searchYear should clear winnersByYear when empty yearSearch', () => {
    component.yearSearch = undefined;
    component.searchYear();
    expect(component.winnersByYear.length).toBe(0);
  });

  it('searchYear should call service when yearSearch set', () => {
    component.yearSearch = 2000;
    component.searchYear();
    expect(component.winnersByYear.length).toBe(1);
  });
});