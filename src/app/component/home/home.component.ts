import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private intervalId: any;

  ngAfterViewInit(): void {
    this.initCarousel();
  }

  ngOnDestroy(): void {
    // Pulisce l'intervallo quando il componente viene distrutto
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private initCarousel(): void {
    const prevButton = document.querySelector('.carousel-control.prev') as HTMLButtonElement;
    const nextButton = document.querySelector('.carousel-control.next') as HTMLButtonElement;
    const carouselInner = document.querySelector('.carousel-inner') as HTMLElement;
    const items = document.querySelectorAll('.carousel-item') as NodeListOf<HTMLElement>;
    const itemCount = items.length;
    let currentIndex = 0;

    function updateCarousel(): void {
      const offset = -currentIndex * 100;
      carouselInner.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
      updateCarousel();
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });

    // auto slide ogni 5 sec
    this.intervalId = setInterval(() => {
      currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    }, 5000);
  }
}
