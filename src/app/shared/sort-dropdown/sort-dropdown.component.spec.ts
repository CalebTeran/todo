import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortDropdownComponent } from './sort-dropdown.component';

import { of } from 'rxjs';
import { ListService } from '../../core/services/list.service';
import { SharedService } from '../../core/services/shared.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SortDropdownComponent', () => {
  let component: SortDropdownComponent;
  let fixture: ComponentFixture<SortDropdownComponent>;
  let sharedService: SharedService;
  let listService: ListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatSelectModule,SortDropdownComponent, BrowserAnimationsModule,], 
      providers: [
        { provide: SharedService, useValue: { setTodoList: jasmine.createSpy() }},
        { provide: ListService, useValue: { getAllTodos: () => of([]), orderByTodos: () => of([]) }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortDropdownComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    listService = TestBed.inject(ListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllTodos method of list service on initialization', () => {
    spyOn(listService, 'getAllTodos').and.returnValue(of([]));
    component.ngOnInit();
    expect(listService.getAllTodos).toHaveBeenCalled();
    expect(sharedService.setTodoList).toHaveBeenCalled();
  });

  it('should call orderByTodos method of list service when onFilterChanged is called', () => {
    spyOn(listService, 'orderByTodos').and.returnValue(of([]));
    const mockEvent = { value: 'someValue' };
    component.onFilterChanged(mockEvent as any);
    expect(listService.orderByTodos).toHaveBeenCalledWith('someValue');
    expect(sharedService.setTodoList).toHaveBeenCalled();
  });
});
