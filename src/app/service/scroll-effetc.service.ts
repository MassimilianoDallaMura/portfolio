// scroll-effect.service.ts
import { Injectable, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollEffectService {
  private scrollThreshold = 100; // Altezza della navbar o altro valore

  constructor() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < this.scrollThreshold) {
        section.classList.add('destroy-effect');
      } else {
        section.classList.remove('destroy-effect');
      }
    });
  }
}
