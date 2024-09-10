import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {

  ngOnInit(): void {
    this.initFilters();
    this.initVideoControls();
    this.initCustomControls();
  }

  initFilters() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        filterButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        projectItems.forEach(item => {
          const categories = item.getAttribute('data-category');

          if (categories && filter) {
            const categoryList = categories.split(' ');
            if (filter === 'all' || categoryList.includes(filter)) {
              item.classList.remove('d-none');
            } else {
              item.classList.add('d-none');
            }
          } else {
            if (filter === 'all') {
              item.classList.remove('d-none');
            } else {
              item.classList.add('d-none');
            }
          }
        });
      });
    });
  }

  initVideoControls() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.addEventListener('timeupdate', () => {
        const progressBar = document.getElementById(`progressBar${video.id.slice(-1)}`) as HTMLInputElement;
        if (progressBar) {
          const value = (video.currentTime / video.duration) * 100;
          progressBar.value = value.toString();
        }
      });
    });
  }

  initCustomControls() {
    const playPauseButtons = document.querySelectorAll('.play-pause');
    const progressBars = document.querySelectorAll('.custom-controls input[type="range"]');

    playPauseButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const videoId = (event.currentTarget as HTMLElement).parentElement?.querySelector('video')?.id;
        if (videoId) {
          const video = document.getElementById(videoId) as HTMLVideoElement;
          if (video) {
            if (video.paused) {
              video.play();
              (event.currentTarget as HTMLElement).textContent = 'Pause';
            } else {
              video.pause();
              (event.currentTarget as HTMLElement).textContent = 'Play';
            }
          }
        }
      });
    });

    progressBars.forEach(progressBar => {
      progressBar.addEventListener('input', (event) => {
        const videoId = (event.currentTarget as HTMLElement).id.slice(-1);
        const video = document.getElementById(`video${videoId}`) as HTMLVideoElement;
        if (video) {
          video.currentTime = (parseFloat((event.currentTarget as HTMLInputElement).value) / 100) * video.duration;
        }
      });
    });

    // Initialize mute buttons
    const muteButtons = document.querySelectorAll('.volume');
    muteButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const videoId = (event.currentTarget as HTMLElement).parentElement?.querySelector('video')?.id;
        if (videoId) {
          const video = document.getElementById(videoId) as HTMLVideoElement;
          if (video) {
            video.muted = !video.muted;
            (event.currentTarget as HTMLElement).textContent = video.muted ? 'Unmute' : 'Mute';
          }
        }
      });
    });
  }

  

}
