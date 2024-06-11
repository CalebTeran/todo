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
  showAddInput: Boolean = false;
  showBtnActions: Boolean = false;
  collapseItems: Boolean = false;
  mainComplete: Boolean = false;
  todoSelected: ITodoListItem ={
    title: '',
    completed: false,
    createdAt: new Date(),
  } 
  constructor(private listService: ListService,private sharedService: SharedService,) { }
  
  ngOnInit(): void {
    this.mainComplete = this.todoItem.completed;
  }

  onSubmit(): void {
    this.todoItem.title = this.todoForm.controls['inputControl'].value;
    this.listService.updateTodo(this.todoItem);
    this.showAddInput = false;
  }

  setFatherToComplete(todoFather: ITodoListItem): void{
    this.sharedService.setFatherToComplete(todoFather!);
    this.mainComplete = this.mainComplete
  }

  onEditItem(todo: ITodoListItem | IChildTodo, todoFather?: ITodoListItem | IChildTodo){
    this.sharedService.showBtnGroup(true);
    this.sharedService.setFatherTodo(todoFather!);
    this.sendTodoSelected.emit(todo);
  }

}
