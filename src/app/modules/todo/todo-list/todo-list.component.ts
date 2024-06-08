import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ITodoListItem } from '../../../core/interfaces/todo-interface';
import { ListService } from '../../../core/services/list.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [TodoItemComponent, NgFor, NgIf],
})
export class TodoListComponent implements OnInit, AfterViewInit {
  todoList: Array<ITodoListItem> = [];
  constructor(private listService: ListService) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.listService.getAllTodos().subscribe((todos) => {
      this.todoList = todos;
      console.log(todos);
    });
  }
}
