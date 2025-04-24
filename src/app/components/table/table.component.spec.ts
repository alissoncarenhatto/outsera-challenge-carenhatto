import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { FormsModule } from '@angular/forms';
import { TableColumn } from './table.interface';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const columns: TableColumn[] = [
    { key: 'id',    label: 'ID' },
    { key: 'name',  label: 'Name', isFilter: true, type: 'input' },
    {
      key: 'active',
      label: 'Active',
      isFilter: true,
      type: 'select',
      options: [
        { value: undefined, viewValue: 'All' },
        { value: true,      viewValue: 'Yes' },
        { value: false,     viewValue: 'No' }
      ]
    }
  ];

  const data = [
    { id: 1, name: 'Davi', active: true },
    { id: 2, name: 'Livia',   active: false }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.columns   = columns;
    component.data      = data;
    component.total     = data.length;
    component.pageIndex = 0;
    component.pageSize  = data.length;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalPages and pages on changes', () => {
    component.total = 25;
    component.pageSize = 10;
    component.ngOnChanges({ total: { currentValue: 25 } } as any);
    expect(component.totalPages).toBe(3);
    expect(component.pages).toEqual([0, 1, 2]);
  });

  it('should emit filterChange on input filter change', () => {
    spyOn(component.filterChange, 'emit');
    component.onFilterChange('name', 'Livia');
    expect(component.filters['name']).toBe('Livia');
    expect(component.filterChange.emit).toHaveBeenCalledWith({ name: 'Livia' });
  });

  it('should emit pageChange when first/prev/next/last/goTo methods are called', () => {
    component.total = 40;
    component.pageSize = 10;
    component.pageIndex = 1;
    component.ngOnChanges({ total: { currentValue: 40 } } as any);

    spyOn(component.pageChange, 'emit');

    component.first();
    expect(component.pageChange.emit).toHaveBeenCalledWith(0);

    component.prev();
    expect(component.pageChange.emit).toHaveBeenCalledWith(0);

    component.next();
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);

    component.last();
    expect(component.pageChange.emit).toHaveBeenCalledWith(3);

    component.goTo(1);
    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should hide pagination when showPagination is false', () => {
    component.showPagination = false;
    fixture.detectChanges();
    expect(component.showPagination).toBeFalse();
  });
});