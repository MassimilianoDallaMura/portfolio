import { Component, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
  private isDragging: boolean = false;
  private startX: number = 0;
  private currentX: number = 0;
  private sidebarWidth: number = 300; 
  private closedOffset: number = 280; 

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const sidebar = this.el.nativeElement.querySelector('.sidebar');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const exploreBtn = this.el.nativeElement.querySelector('#explore-btn');

    // Ensure sidebar is open by default
    sidebar.style.transform = `translateX(0)`;
    sidebar.classList.remove('closed');
    overlay.style.display = 'block'; // Show overlay when sidebar is open
    exploreBtn.style.display = 'block'; // Show explore button when sidebar is open

    // Add click event listener to the "Esplora" button
    exploreBtn.addEventListener('click', () => this.closeSidebar());
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX;
    this.el.nativeElement.querySelector('.sidebar').style.transition = 'none';  // Disable transition while dragging
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.currentX = event.clientX;
    const offsetX = this.currentX - this.startX;

    const sidebar = this.el.nativeElement.querySelector('.sidebar');
    const currentTransform = sidebar.classList.contains('closed') ? -this.closedOffset : 0;
    const newOffsetX = currentTransform + offsetX;

    // Limit dragging to within the sidebar width and not beyond the open state
    if (newOffsetX < 0 && newOffsetX > -this.sidebarWidth) {
      sidebar.style.transform = `translateX(${newOffsetX}px)`;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    const sidebar = this.el.nativeElement.querySelector('.sidebar');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const exploreBtn = this.el.nativeElement.querySelector('#explore-btn');

    // Determine if the sidebar was dragged beyond halfway to close or open
    if (this.currentX < this.startX - this.sidebarWidth / 2) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
    sidebar.style.transition = 'transform 0.3s ease';  // Re-enable transition
  }

  openSidebar(): void {
    const sidebar = this.el.nativeElement.querySelector('.sidebar');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const exploreBtn = this.el.nativeElement.querySelector('#explore-btn');

    sidebar.style.transform = `translateX(0)`;  // Fully open the sidebar
    sidebar.classList.remove('closed');
    overlay.style.display = 'block'; // Show overlay when sidebar is open
    exploreBtn.style.display = 'block'; // Show explore button when sidebar is open
  }

  closeSidebar(): void {
    const sidebar = this.el.nativeElement.querySelector('.sidebar');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const exploreBtn = this.el.nativeElement.querySelector('#explore-btn');

    sidebar.style.transform = `translateX(-${this.closedOffset}px)`;  // Partially hide the sidebar
    sidebar.classList.add('closed');
    overlay.style.display = 'none'; // Hide overlay when sidebar is closed
    exploreBtn.style.display = 'none'; // Hide explore button when sidebar is closed
  }


  
}
