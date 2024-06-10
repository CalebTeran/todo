import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IChildTodo, ITodoListItem } from '../../../core/interfaces/todo-interface';
import { ListService } from '../../../core/services/list.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { NgFor, NgIf } from '@angular/common';
import { ActionButtonsComponent } from '../../../shared/action-buttons/action-buttons.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [TodoItemComponent, NgFor, NgIf, ActionButtonsComponent],
})
export class TodoListComponent implements OnInit, AfterViewInit {
  todoList: Array<ITodoListItem> = [];
  showActionBtns: boolean = false;
  todo: ITodoListItem|IChildTodo = {
    title: '',
    completed: false,
    createdAt: new Date(),
  }
  constructor(private listService: ListService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.listService.getAllTodos().subscribe((todos) => {
      console.log(todos);
      this.todoList = todos;
    });
  }

  setShowActionsBtn(show: boolean): void{
    this.showActionBtns = show;
  }

  setTodo(todo:ITodoListItem|IChildTodo):void{
    this.todo = todo;
  }


}
