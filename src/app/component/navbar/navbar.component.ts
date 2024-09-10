// In navbar.component.ts o in un file JavaScript separato

import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {
    // Inizializza lo stato del tema
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit() {
    // Aggiungi un listener per lo scroll
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < 100) { // Modifica questo valore in base all'altezza della navbar
        section.classList.add('destroy-effect');
      } else {
        section.classList.remove('destroy-effect');
      }
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }
}
