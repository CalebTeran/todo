import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { ITodoListItem } from '../../../core/interfaces/todo-interface';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { ListService } from '../../../core/services/list.service';
import { CheckInputComponent } from '../../../shared/check-input/check-input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, 
    NgIf, NgClass, CheckInputComponent, MatButtonModule, MatIconModule],
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: ITodoListItem = {
    title: '',
    completed: false,
    createdAt: new Date(),
  };
  @Output() deleteTodoItem: EventEmitter<number> = new EventEmitter();
  @Output() addChildTodoItem: EventEmitter<ITodoListItem> = new EventEmitter();
  @Output() editTodoItem: EventEmitter<ITodoListItem> = new EventEmitter();
  @Output() completeTodoItem: EventEmitter<ITodoListItem> = new EventEmitter();

  todoForm: FormGroup = new FormGroup({
    inputControl: new FormControl<string>('', [Validators.required]),
    });
    
  isTodoEdited: Boolean = false;
  completedTodo:Array<object> =[];
  showDeleteBtn: Boolean = false;

  constructor(private listService: ListService) {}
  ngOnInit(): void {
  }

  onSubmit(updatedTodo: ITodoListItem): void {
    updatedTodo = {
      id:updatedTodo.id,
      title: this.todoForm.controls['inputControl'].value,
      completed: updatedTodo.completed,
      createdAt: updatedTodo.completedAt? updatedTodo.completedAt: new Date()
    };
    this.listService.updateTodo(updatedTodo);
  }

  completeTodo(todoToComplete: ITodoListItem): void{
    this.todoItem.completed = !this.todoItem.completed;
    this.isTodoEdited = !this.isTodoEdited
    const todoModified = todoToComplete.completed? this.completeTodoChilds(todoToComplete) : this.resetTodoChilds(todoToComplete);
    console.log("todo modified ->",todoModified);
    this.listService.completeTodo(todoModified);
  }

  completeTodoChilds(todo: any): ITodoListItem{
    todo.completed = true;
    todo.childTodo?.forEach((element: { completed: boolean; childTodo: any; }) => {
      element.completed = true;
      if(element.childTodo?.length > 0){
        this.completeTodoChilds(element.childTodo[0])
      }
    });
    console.log("returned Todo ->",todo);
    return todo
  }

  resetTodoChilds(todo: any): ITodoListItem{
    todo.completed = false;
    todo.childTodo?.forEach((element: { completed: boolean; childTodo: any; }) => {
      element.completed = false;
      if(element.childTodo?.length > 0){
        this.resetTodoChilds(element.childTodo[0])
      }
    });
    console.log("returned Todo ->",todo);
    return todo
  }
  removeTodo(id:any): void{
    this.listService.deleteTodo(id);
  }
  enableModifyInput(isCompleted: boolean): void{
    this.isTodoEdited = !isCompleted;
  }
}
