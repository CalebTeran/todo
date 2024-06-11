import { Component, Input } from '@angular/core';
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
export class CheckInputComponent {
  todoForm: FormGroup = new FormGroup({
    inputControl: new FormControl<string>('', [Validators.required]),
    checkControl: new FormControl<boolean>(true),
  });
  @Input() todo!: any;
  @Input() todofather!: ITodoListItem;

  constructor(private sharedService: SharedService, private listService: ListService) { }


  onSubmit(): void {
    if(this.todoForm.valid && this.todoForm.controls['inputControl'].value != null){
      this.sharedService.todoFather$.subscribe(fatherTodo => {
        if (fatherTodo.title != "") {
          const newChildTodo: IChildTodo = {
            id: getUniqueId(4),
            fatherId: this.todo.id!,
            title: this.todoForm.controls['inputControl'].value,
            completed: this.todoForm.controls['checkControl'].value,
            createdAt: new Date(),
          }
          if(newChildTodo.title != null){
            this.addNewChildToFather(fatherTodo, newChildTodo, this.todo.id);
            this.listService.updateTodo(fatherTodo);
          }
        } else {
          const todoItem: ITodoListItem = {
            title: this.todoForm.controls['inputControl'].value,
            completed: this.todoForm.controls['checkControl'].value,
            createdAt: new Date(),
          };
          this.listService.createTodo(todoItem);
        }
        this.todoForm.reset();
      })
    }
  }
  // TODO add recusive function to add unlimited todos if I have time to do it
    addNewChildToFather(fatherTodo: ITodoListItem, child: IChildTodo, childId:string): ITodoListItem {
    if (Array.isArray(fatherTodo.childTodo)) {
      if(childId === fatherTodo.id){
        fatherTodo.childTodo.push(child);
      }else{
        fatherTodo.childTodo.forEach(childItem=>{
          if(child.fatherId === childItem.id){
            childItem.childTodo=[];
            childItem.childTodo?.push(child);
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
