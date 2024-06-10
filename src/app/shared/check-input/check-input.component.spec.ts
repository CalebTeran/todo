import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInputComponent } from './check-input.component';
import { ListService } from '../../core/services/list.service';

describe('CheckInputComponent', () => {
  let component: CheckInputComponent;
  let listService: ListService;
  let fixture: ComponentFixture<CheckInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckInputComponent],
      providers:[ListService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
