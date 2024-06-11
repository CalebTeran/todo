import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { IChildTodo, ITodoListItem } from '../../core/interfaces/todo-interface';
import { ListService } from '../../core/services/list.service';
import { NgIf } from '@angular/common';
import { getUniqueId } from '../helpers/uuid-generator-helpers';
import { SharedService } from '../../core/services/shared.service';
getUniqueId

@Component({
  selector: 'app-check-input',
  standalone: true,
  styleUrls: ['./check-input.component.scss'],
  templateUrl: './check-input.component.html',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
})
export class CheckInputComponent implements OnInit {
  todoForm: FormGroup = new FormGroup({
    inputControl: new FormControl<string>('', [Validators.required]),
    checkControl: new FormControl<boolean>(true),
  });
  @Input() todo!: ITodoListItem;
  @Input() todofather!: ITodoListItem;

  constructor(private sharedService: SharedService, private listService: ListService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.todo) {
      const childTodo: IChildTodo = {
        id: getUniqueId(4),
        fatherId: this.todo.id!,
        title: this.todoForm.controls['inputControl'].value,
        completed: this.todoForm.controls['checkControl'].value,
        createdAt: new Date(),
      }
      const todoModified = this.addNewChildToFather(this.todo, childTodo);
      this.listService.updateTodo(todoModified);
    } else {
      const todoItem: ITodoListItem = {
        title: this.todoForm.controls['inputControl'].value,
        completed: this.todoForm.controls['checkControl'].value,
        createdAt: new Date(),
      };
      this.listService.createTodo(todoItem);
    }
    this.sharedService.showBtnGroup(false);
    this.todoForm.reset();
  }

  addNewChildToFather(fatherTodo: any, child: IChildTodo): ITodoListItem {
    if (Array.isArray(fatherTodo.childTodo )) {
      if(fatherTodo.id === child.fatherId){
        fatherTodo.childTodo.push(child);
      }else{
        fatherTodo.childTodo?.forEach((element: { completed: boolean; childTodo: any; }) => {
          if (element.childTodo?.length > 0 ) {
            this.addNewChildToFather(element.childTodo[0], child);
          }else{
            element.childTodo = []
            element.childTodo.push(child)
          }
        });
      }
    }
    else {
      fatherTodo.childTodo=[];
      fatherTodo.childTodo.push(child);
    }
    return fatherTodo
  }

}
