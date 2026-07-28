const progressBar = document.querySelector('.progress span');
const revealBlocks = document.querySelectorAll('.reveal');
const videoModal = document.querySelector('.modal');
const videoFrame = videoModal.querySelector('iframe');

window.addEventListener('scroll', () => {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(window.scrollY / distance) * 100}%`;
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealBlocks.forEach((block) => revealObserver.observe(block));

document.querySelector('.video').addEventListener('click', (event) => {
  videoFrame.src = event.currentTarget.dataset.video;
  videoModal.showModal();
});
document.querySelector('.modal-close').addEventListener('click', () => videoModal.close());
videoModal.addEventListener('close', () => { videoFrame.src = ''; });
