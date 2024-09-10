// footer.component.ts
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private lastScrollTop: number = 0;
  private footer: HTMLElement | null = null;

  ngOnInit() {
    this.footer = document.querySelector('.mobile-footer');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (this.footer) {
      if (scrollTop > this.lastScrollTop) {
        // Scroll verso il basso
        this.footer.classList.add('hidden');
        this.footer.classList.remove('visible');
      } else {
        // Scroll verso l'alto
        this.footer.classList.add('visible');
        this.footer.classList.remove('hidden');
      }
      this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Per mobile
    }
  }
}
