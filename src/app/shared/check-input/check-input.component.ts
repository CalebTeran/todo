import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ITodoListItem } from '../../core/interfaces/todo-interface';
import { ListService } from '../../core/services/list.service';
import { NgIf } from '@angular/common';

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

  @Input() title: string = '';

  constructor(private listService: ListService) {}

  ngOnInit(): void {}

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
