import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize with an empty title', () => {
    expect(component.title).toEqual('');
  });
  
  it('should set title correctly', () => {
    const testTitle = 'Test Title';
    component.title = testTitle;
    expect(component.title).toEqual(testTitle);
  });

  it('should receive the input value and set on the HTML', () => {
    const inputValue = 'Test Title';
    component.title = inputValue;
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('.title'); // Assuming you have a class named 'title' in your component template
    expect(titleElement.textContent).toContain(inputValue);
  });
});
