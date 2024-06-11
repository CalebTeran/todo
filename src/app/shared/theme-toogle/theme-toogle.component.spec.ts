import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeToogleComponent } from './theme-toogle.component';
import { ThemeService } from '../../core/services/theme.service';

describe('ThemeToogleComponent', () => {
  let component: ThemeToogleComponent;
  let fixture: ComponentFixture<ThemeToogleComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToogleComponent],
      providers: [ ThemeService ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeToogleComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct dark mode state', () => {
    const isDarkMode = themeService.isDarkMode(); 
    expect(component.isDarkMode).toEqual(isDarkMode);
  });

  it('should toggle dark mode', () => {
    const initialMode = component.isDarkMode;
    component.toggleTheme();
    expect(component.isDarkMode).toEqual(!initialMode);
  });

  it('should call setDarkMode method of theme service when toggleTheme is called', () => {
    spyOn(themeService, 'setDarkMode');
    component.toggleTheme();
    expect(themeService.setDarkMode).toHaveBeenCalled();
  });
});
