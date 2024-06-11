import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsComponent } from './action-buttons.component';
import { SharedService } from '../../core/services/shared.service';
import { ListService } from '../../core/services/list.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { ITodoListItem } from '../../core/interfaces/todo-interface';

describe('ActionButtonsComponent', () => {
  let component: ActionButtonsComponent;
  let fixture: ComponentFixture<ActionButtonsComponent>;
  let sharedService: SharedService;
  let listService: ListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ActionButtonsComponent,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        { provide: SharedService, useValue: { setTodoList: jasmine.createSpy() }},
        { provide: ListService, useValue: { updateTodo: () => of([]), deleteTodo: () => of([]) }}
      ],
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    listService = TestBed.inject(ListService);
    fixture.detectChanges();
  });

 
});
