const videos = document.querySelectorAll(".ritual-video");

const videoObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target;

    if (entry.isIntersecting) {
      video.play();
      video.style.opacity = "1";
    } else {
      video.pause();
      video.style.opacity = "0";
    }
  });
}, { threshold: 0.35 });

videos.forEach(video => videoObserver.observe(video));