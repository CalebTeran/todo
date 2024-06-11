import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { Subscription, take } from 'rxjs';
import { ITodoListItem } from '../interfaces/todo-interface';

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show button groups', async () => {
    const newValue = true;
    let emittedValue: boolean | undefined;
    let subscription: Subscription;
  
    subscription = service.showBtnGroups$.subscribe(value => {
      emittedValue = value;
    });
  
    service.showBtnGroup(newValue);
    await new Promise(resolve => setTimeout(resolve));
  
    expect(emittedValue).toEqual(newValue);
  
    subscription.unsubscribe();
  });

  it('should set father todo', async () => {
    let subscription: Subscription;
    let todoUpdated: ITodoListItem | undefined;
    const todo = {
      id: '1',
      title: 'Father Todo',
      completed: false,
      createdAt: new Date(),
      childTodo: []
    };
    subscription = service.todoFather$.subscribe(value => {
      todoUpdated = value;
    });
    service.setFatherTodo(todo);
    await new Promise(resolve => setTimeout(resolve));
    expect(todoUpdated).toEqual(todo)
  });


  it('should set todo list', async () => {
    let subscription: Subscription;
    let todoListUpdated: ITodoListItem[] | undefined;
    const todoList = [
      {
        id: '1',
        title: 'Todo 1',
        completed: false,
        createdAt: new Date(),
        childTodo: []
      },
      {
        id: '2',
        title: 'Todo 2',
        completed: true,
        createdAt: new Date(),
        childTodo: []
      }
    ];
    subscription = service.todoList$.subscribe(value => {
      todoListUpdated = value;
    });
    service.setTodoList(todoList);
    await new Promise(resolve => setTimeout(resolve));
    expect(todoListUpdated).toEqual(todoList)
  });
});
