import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ITodoListItem } from '../../core/interfaces/todo-interface';
import { ListService } from '../../core/services/list.service';
import { CheckInputComponent } from '../check-input/check-input.component';
import { SharedService } from '../../core/services/shared.service';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    NgIf,
    CheckInputComponent
  ],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss'
})
export class ActionButtonsComponent implements OnInit {

  showBtns: boolean = false;
  @Input() todo!: ITodoListItem;

  constructor(private listService: ListService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.showBtnGroups$.subscribe(show => {
      this.showBtns = show;
      console.log(show);
    })
  }

  hideButtonGroup(): void {
    this.sharedService.showBtnGroup(false);
  }

  removeTodo(todoId: string): void {
    this.sharedService.todoFather$.subscribe(todo => {
      
      if(Array.isArray(todo.childTodo)){
        this.removeChildTodo(todoId!, todo)
        console.log(todo);
        this.listService.updateTodo(todo)
      }else{
        this.listService.deleteTodo(todoId);
      }
    
      this.showBtns = false;
    });
  }

  removeChildTodo(childId: string, todo:ITodoListItem) {
    if (todo.childTodo && todo.childTodo.length > 0) {
      todo.childTodo = todo.childTodo.filter(child => {
        if (child.id === childId) {
          return false;
        }
        this.removeChildTodo(childId,child);
        return true;
      });
    }
  }
}
