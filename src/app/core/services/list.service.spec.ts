import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';
import { ITodoListItem } from '../interfaces/todo-interface';

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListService);
  });

  it('should return a list of todo items', () => {
    service.getAllTodos().subscribe((todoList)=>{
      console.log(todoList);
      expect(todoList).toBeTruthy();
    })
  });
});
