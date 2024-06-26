import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IChildTodo, ITodoListItem } from '../interfaces/todo-interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _showBtnGroups: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showBtnGroups$: Observable<boolean> = this._showBtnGroups.asObservable();

  private _todoFather: BehaviorSubject<ITodoListItem|IChildTodo > = new BehaviorSubject<ITodoListItem|IChildTodo>({
    title:"",
    completed: false,
    createdAt: new Date(),
  });
  todoFather$: Observable<ITodoListItem|IChildTodo> = this._todoFather.asObservable();

  private _todoList: BehaviorSubject<ITodoListItem[]> = new BehaviorSubject<ITodoListItem[]>([]);
  todoList$: Observable<ITodoListItem[]> = this._todoList.asObservable();

  private _fatherToComplete: BehaviorSubject<ITodoListItem> = new BehaviorSubject<ITodoListItem>({
    title:"",
    completed: false,
    createdAt: new Date(),
  });
  fatherToComplete$: Observable<ITodoListItem> = this._fatherToComplete.asObservable();


  constructor() { }
 
  showBtnGroup(newValue: boolean) {
    this._showBtnGroups.next(newValue);
  }

  setFatherTodo(todoFather: ITodoListItem|IChildTodo){
    this._todoFather.next(todoFather);
  }

  setFatherToComplete(todoFather: ITodoListItem|IChildTodo){
    this._fatherToComplete.next(todoFather);
  }
  
  setTodoList(todoList:ITodoListItem[]){
    this._todoList.next(todoList);
  }

}
