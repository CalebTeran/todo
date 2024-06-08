import { Component } from '@angular/core';
import { TitleComponent } from '../../shared/title/title.component';
import { CheckInputComponent } from '../../shared/check-input/check-input.component';
import { ThemeToogleComponent } from '../../shared/theme-toogle/theme-toogle.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    TitleComponent,
    CheckInputComponent,
    ThemeToogleComponent,
    TodoListComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

}
