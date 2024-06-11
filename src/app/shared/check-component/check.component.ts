import { NgClass } from '@angular/common';
import { Component, Input} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SharedService } from '../../core/services/shared.service';
import { ITodoListItem } from '../../core/interfaces/todo-interface';
import { ListService } from '../../core/services/list.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-check',
  standalone: true,
  styleUrls: ['./check.component.scss'],
  templateUrl: './check.component.html',
  imports: [FormsModule, ReactiveFormsModule, NgClass,],
})
export class CheckComponent {
  @Input() completed: boolean = false;
  @Input() title: string = "";
  @Input() isMainTodo: boolean = false;
  constructor(private sharedService:SharedService, private listService:ListService){}
  
  completeTodo(): void {
    this.sharedService.fatherToComplete$.pipe(take(1)).subscribe( todoItem =>{
      if(this.isMainTodo && this.completed != todoItem.completed){
        const todoModified = this.completeOtResetTodo(todoItem, this.completed);
        this.listService.completeTodo(todoModified);
      }
    })
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
}
