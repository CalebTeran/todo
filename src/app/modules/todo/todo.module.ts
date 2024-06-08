import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  imports: [
    SharedModule,
    CommonModule,
  ],
   declarations: [
    TodoListComponent,
    TodoComponent,
    TodoItemComponent,
  ],
  exports: [TodoComponent],
})
export class TodoModule { }
