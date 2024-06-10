import { NgClass } from '@angular/common';
import { Component, Input} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

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
}
