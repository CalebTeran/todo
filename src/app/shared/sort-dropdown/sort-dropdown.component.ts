import { Component, OnInit } from '@angular/core';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { SharedService } from '../../core/services/shared.service';
import { ListService } from '../../core/services/list.service';

@Component({
  selector: 'app-sort-dropdown',
  standalone: true,
  imports: [  
    MatFormFieldModule,
    MatSelectModule,
    MatLabel],
  templateUrl: './sort-dropdown.component.html',
  styleUrl: './sort-dropdown.component.scss'
})

export class SortDropdownComponent implements OnInit {
  constructor (private sharedService: SharedService, private listService:ListService) {}

  ngOnInit(): void {
    this.listService.getAllTodos().subscribe(todos =>{
      this.sharedService.setTodoList(todos);
    });
  }
  
  onFilterChanged(e : MatSelectChange){
    this.listService.orderByTodos(e.value).subscribe(sortTodos =>{
      this.sharedService.setTodoList(sortTodos)
    });
  }
}
