import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { YearCount, StudioCount, ProducerInterval, Movie } from '../models/movie.model';

describe('MovieService', () => {
  let service: MovieService;
  let http: HttpTestingController;
  const API = 'https://challenge.outsera.tech/api/movies';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    http    = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should fetch paged movies with params', () => {
    const mockResponse = { content: [], totalElements: 0 };
    service.getAll(1, 5, true, 2020).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = http.expectOne(r => 
      r.method === 'GET' &&
      r.url === API &&
      r.params.get('page') === '1' &&
      r.params.get('size') === '5' &&
      r.params.get('winner') === 'true' &&
      r.params.get('year') === '2020'
    );
    req.flush(mockResponse);
  });

  it('should get years with multiple winners', () => {
    const mock: { years: YearCount[] } = { years: [{ year: 2000, winnerCount: 2 }] };
    service.getYearsWithMultipleWinners().subscribe(res => {
      expect(res.years).toEqual(mock.years);
    });
    const req = http.expectOne(`${API}?projection=years-with-multiple-winners`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('should get studios win count', () => {
    const mock: { studios: StudioCount[] } = { studios: [{ name: 'Studio A', winCount: 3 }] };
    service.getStudiosWinCount().subscribe(res => {
      expect(res.studios).toEqual(mock.studios);
    });
    const req = http.expectOne(`${API}?projection=studios-with-win-count`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('should get producers win interval', () => {
    const mock: { min: ProducerInterval[], max: ProducerInterval[] } = {
      min: [{ producer: 'Prod A', interval: 1, previousWin: 2000, followingWin: 2001 }],
      max: [{ producer: 'Prod B', interval: 10, previousWin: 1990, followingWin: 2000 }]
    };
    service.getProducersWinInterval().subscribe(res => {
      expect(res.min).toEqual(mock.min);
      expect(res.max).toEqual(mock.max);
    });
    const req = http.expectOne(`${API}?projection=max-min-win-interval-for-producers`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('should get winners by year', () => {
    const year = 1995;
    const mock: Movie[] = [{ id:1, year, title:'X', studios:['A'], producers:['B'], winner:true }];
    service.getWinnersByYear(year).subscribe(res => {
      expect(res).toEqual(mock);
    });
    const req = http.expectOne(`${API}?winner=true&year=${year}`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  describe('getAll branches', () => {
    it('sem filtros, deve chamar GET com só page/size', () => {
      service.getAll(0, 10).subscribe();
      const req = http.expectOne(r =>
        r.params.get('page') === '0' &&
        r.params.get('size') === '10' &&
        !r.params.has('winner') &&
        !r.params.has('year')
      );
      req.flush({ content: [], totalElements: 0 });
    });
  
    it('com winner=true, sem year', () => {
      service.getAll(0, 10, true).subscribe();
      const req = http.expectOne(r =>
        r.params.get('winner') === 'true' &&
        !r.params.has('year')
      );
      req.flush({ content: [], totalElements: 0 });
    });
  
    it('com year e sem winner', () => {
      service.getAll(0, 10, undefined, 2021).subscribe();
      const req = http.expectOne(r =>
        r.params.get('year') === '2021' &&
        !r.params.has('winner')
      );
      req.flush({ content: [], totalElements: 0 });
    });
  
    it('com ambos filtros', () => {
      service.getAll(0, 10, false, 2022).subscribe();
      const req = http.expectOne(r =>
        r.params.get('winner') === 'false' &&
        r.params.get('year') === '2022'
      );
      req.flush({ content: [], totalElements: 0 });
    });
  
    it('deve propagar erro 500', () => {
      service.getAll().subscribe({
        next: () => fail('esperava um erro'),
        error: err => expect(err.status).toBe(500)
      });
      const req = http.expectOne(() => true);
      req.flush('erro interno', { status: 500, statusText: 'Server Err' });
    });
  });
});