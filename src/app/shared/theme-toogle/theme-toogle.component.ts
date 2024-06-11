import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toogle',
  standalone: true,
  templateUrl: './theme-toogle.component.html',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  styleUrls: ['./theme-toogle.component.scss'],
})
export class ThemeToogleComponent {
    // TODO Use material Theme is a better solution but That means to make a palette color, define theme, mixins.
  isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
}
