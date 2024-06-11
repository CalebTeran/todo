import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default dark mode status as false', () => {
    const isDarkMode = service.isDarkMode();
    expect(isDarkMode).toBeFalse();
  });

  it('should set dark mode status to true', () => {
    service.setDarkMode(true);
    const isDarkMode = service.isDarkMode();
    expect(isDarkMode).toBeTrue();
    expect(document.body.classList.contains('dark-theme')).toBeTrue();
  });

  it('should set dark mode status to false', () => {
    service.setDarkMode(false);
    const isDarkMode = service.isDarkMode();
    expect(isDarkMode).toBeFalse();
    expect(document.body.classList.contains('dark-theme')).toBeFalse();
  });
});
