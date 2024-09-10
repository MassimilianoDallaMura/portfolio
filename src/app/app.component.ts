// app.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from './service/theme.service';
import { ScrollEffectService } from './service/scroll-effetc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkMode = false;
  showScrollToTopButton = false;

  constructor(
    private themeService: ThemeService,
    private scrollEffectService: ScrollEffectService
  ) {}

  ngOnInit(): void {
    this.scrollEffectService; // Assicurati che questo servizio sia usato correttamente
    if (this.themeService.isDarkMode()) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.showScrollToTopButton = scrollTop > 1200; // Mostra il pulsante se scroll oltre 1200px
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.isDarkMode();
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    document.body.classList.toggle('light-mode', !this.isDarkMode);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolla in cima con effetto morbido
  }
}
