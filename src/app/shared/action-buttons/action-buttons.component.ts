import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class ActionButtonsComponent implements OnInit{
  
  showBtns: boolean = false;
  @Input() todo!: ITodoListItem;

  constructor(private listService:ListService, private sharedService: SharedService){}

  ngOnInit(): void {
    this.sharedService.showBtnGroups$.subscribe(show =>{
      this.showBtns = show;
      console.log(show);
    })
  }

  hideButtonGroup():void{
    this.sharedService.showBtnGroup(false);
  }

  removeTodo(id: string): void {
    this.listService.deleteTodo(id);
    this.showBtns = false;
  }
}