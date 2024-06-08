import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { ITodoListItem } from '../../../core/interfaces/todo-interface';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { ListService } from '../../../core/services/list.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, NgIf],
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
  constructor(private listService: ListService) {}
  ngOnInit(): void {
    console.log('item', this.todoItem);
  }

  onSubmit(): void {
    const newTodo: ITodoListItem = {
      title: this.todoForm.controls['inputControl'].value,
      completed: this.todoForm.controls['checkControl'].value,
      createdAt: new Date(),
    };
    this.listService.createTodo(newTodo).then((resp) => {
      console.log('onSubmit todo ->', resp);
    });
  }
}
