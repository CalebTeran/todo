import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { IChildTodo, ITodoListItem } from '../../../core/interfaces/todo-interface';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ListService } from '../../../core/services/list.service';
import { CheckInputComponent } from '../../../shared/check-input/check-input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CheckComponent } from '../../../shared/check-component/check.component';
import { SharedService } from '../../../core/services/shared.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    NgClass,
    CheckInputComponent,
    MatButtonModule,
    MatIconModule,
    CheckComponent],

})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: any = {
    title: '',
    completed: false,
    createdAt: new Date(),
  };
  @Output() sendTodoSelected: EventEmitter<ITodoListItem> = new EventEmitter<ITodoListItem>();
  @Output() sendTodoFatherSelected: EventEmitter<ITodoListItem> = new EventEmitter<ITodoListItem>();

  todoForm: FormGroup = new FormGroup({
    inputControl: new FormControl<string>('', [Validators.required]),
  });

  isTodoEdited: Boolean = false;
  completedTodo: Array<object> = [];
  showDeleteBtn: Boolean = false;
  showAddInput: Boolean = false;
  showBtnActions: Boolean = false;
  collapseItems: Boolean = false;

  constructor(private listService: ListService,private sharedService: SharedService,) { }
  ngOnInit(): void {
  }

  onSubmit(updatedTodo: ITodoListItem): void {
    updatedTodo = {
      id: updatedTodo.id,
      title: this.todoForm.controls['inputControl'].value,
      completed: updatedTodo.completed,
      createdAt: updatedTodo.completedAt ? updatedTodo.completedAt : new Date()
    };
    this.listService.updateTodo(updatedTodo);
  }

  completeTodo(todoToComplete: ITodoListItem): void {
    this.todoItem.completed = !this.todoItem.completed;
    this.isTodoEdited = !this.isTodoEdited
    const todoModified = this.completeOtResetTodo(todoToComplete, todoToComplete.completed);
    console.log("todo modified ->", todoModified);
    this.listService.completeTodo(todoModified);
  }

  completeOtResetTodo(todo: any, completeOrReset: boolean): ITodoListItem {
    todo.completed = completeOrReset;
    todo.childTodo?.forEach((element: { completed: boolean; childTodo: any; }) => {
      element.completed = completeOrReset;
      if (element.childTodo?.length > 0) {
        this.completeOtResetTodo(element.childTodo[0], completeOrReset);
      }
    });
    return todo
  }

  onEditItem(todo: ITodoListItem | IChildTodo, todoFather?: ITodoListItem | IChildTodo){
    this.sharedService.showBtnGroup(true);
    this.sharedService.setFatherTodo(todoFather!);
    this.sendTodoSelected.emit(todo);
  }

}
