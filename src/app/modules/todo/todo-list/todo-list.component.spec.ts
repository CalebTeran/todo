import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { SharedService } from '../../../core/services/shared.service';
import { IChildTodo, ITodoListItem } from '../../../core/interfaces/todo-interface';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { firebaseConfig } from '../../../enviroments/enviroment';
import { ActionButtonsComponent } from '../../../shared/action-buttons/action-buttons.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let sharedService: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        TodoListComponent,
        AngularFirestoreModule,
        ActionButtonsComponent,
        TodoItemComponent,
      ],
      providers: [
        { provide: SharedService, useValue: { setTodoList: jasmine.createSpy() }},
      ]
    })
    .compileComponents();
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    fixture.detectChanges();
  })

});
