import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IChildTodo, ITodoListItem } from '../../../core/interfaces/todo-interface';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { NgFor, NgIf } from '@angular/common';
import { ActionButtonsComponent } from '../../../shared/action-buttons/action-buttons.component';
import { SortDropdownComponent } from '../../../shared/sort-dropdown/sort-dropdown.component';
import { SharedService } from '../../../core/services/shared.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [TodoItemComponent, NgFor, NgIf, ActionButtonsComponent, SortDropdownComponent],
})
export class TodoListComponent implements OnInit, AfterViewInit {
  todoList: Array<ITodoListItem> = [];
  showActionBtns: boolean = false;
  todo: ITodoListItem|IChildTodo = {
    title: '',
    completed: false,
    createdAt: new Date(),
  }
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sharedService.todoList$.subscribe(todos =>{
      this.todoList = todos;
    })
  }

  setShowActionsBtn(show: boolean): void{
    this.showActionBtns = show;
  }

  setTodo(todo:ITodoListItem|IChildTodo):void{
    this.todo = todo;
  }


}
