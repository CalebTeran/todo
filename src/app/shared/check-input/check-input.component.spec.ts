import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInputComponent } from './check-input.component';
import { ListService } from '../../core/services/list.service';
import { SharedService } from '../../core/services/shared.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { IChildTodo, ITodoListItem } from '../../core/interfaces/todo-interface';

describe('CheckInputComponent', () => {
  let component: CheckInputComponent;
  let fixture: ComponentFixture<CheckInputComponent>;
  let sharedService: SharedService;
  let listService: ListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckInputComponent,ReactiveFormsModule],
      providers:[ 
        { provide: SharedService, useValue: { todoFather$: of({ title: '' }) } },
        { provide: ListService, useValue: { createTodo: () => of([]), updateTodo: () => of([]) }}
      ]
    })
    .compileComponents();
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(CheckInputComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    listService = TestBed.inject(ListService);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#onSubmit()", ()=>{
    it('should call createTodo method of list service when we submit the form to create a new todo', () => {
      const spyCreateTodo = spyOn(listService, 'createTodo').and.callThrough();
      component.todoForm.setValue({ inputControl: 'Test Todo', checkControl: true });
      component.onSubmit();
      expect(spyCreateTodo).toHaveBeenCalled();
    });

    it('should add new child to father when fatherTodo has childTodos array', () => {
      const fatherTodo = {
        id: '1',
        title: 'Father Todo',
        completed: false,
        createdAt: new Date(),
        childTodo: []
      } as ITodoListItem;
      const childTodo = {
        id: '2',
        fatherId: fatherTodo.id,
        title: 'Child Todo',
        completed: false,
        createdAt: new Date()
      } as IChildTodo;
  
      const updatedFatherTodo = component.addNewChildToFather(fatherTodo, childTodo, "1");
  
      expect(updatedFatherTodo?.childTodo?.length).toBe(1);
      expect(updatedFatherTodo?.childTodo?.[0]).toEqual(childTodo);
    });

    it('should create new childTodos array and add new child to father when fatherTodo does not have childTodos array', () => {
      const fatherTodo = {
        id: '1',
        title: 'Father Todo',
        completed: false,
        createdAt: new Date(),
      };
      const childTodo = {
        id: '2',
        fatherId: fatherTodo.id,
        title: 'Child Todo',
        completed: false,
        createdAt: new Date()
      };
  
      const updatedFatherTodo = component.addNewChildToFather(fatherTodo, childTodo, fatherTodo.id);
  
      expect(updatedFatherTodo?.childTodo?.length).toBe(1);
      expect(updatedFatherTodo?.childTodo?.[0]).toEqual(childTodo);
    });

  it('should add new child to appropriate father when fatherId matches childId', () => {
    const fatherTodo = {
      id: '1',
      title: 'Father Todo',
      completed: false,
      createdAt: new Date(),
      childTodo: [
        {
          id: '2',
          fatherId: '2',
          completed: false,
          title: 'Child 1',
          createdAt: new Date(),
          childTodo: []
        }
      ]
    };
    const childTodo = {
      id: '3',
      fatherId: '2',
      title: 'Child Todo',
      completed: false,
      createdAt: new Date()
    };

    const updatedFatherTodo = component.addNewChildToFather(fatherTodo, childTodo, '2');

    expect(updatedFatherTodo?.childTodo?.[0].childTodo?.length).toBe(1);
    expect(updatedFatherTodo?.childTodo?.[0].childTodo?.[0]).toEqual(childTodo);
  });

   });

});
