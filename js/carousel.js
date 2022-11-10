const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotNav = document.querySelector('.carousel__nav');
const dot = Array.from(dotNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

const moveSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const updateDot = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

const hideArrow = (targetIndex, prevButton, nextButton, slides) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
};

nextButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  moveSlide(track, currentSlide, nextSlide);
  updateDot(currentDot, nextDot);
  hideArrow(nextIndex, prevButton, nextButton, slides);
});

prevButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  moveSlide(track, currentSlide, prevSlide);
  updateDot(currentDot, prevDot);
  hideArrow(prevIndex, prevButton, nextButton, slides);
});

dotNav.addEventListener('click', (e) => {
  const targetDot = e.target.closest('button');

  if (!targetDot) return;
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotNav.querySelector('.current-slide');
  const targetIndex = dot.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveSlide(track, currentSlide, targetSlide);
  updateDot(currentDot, targetDot);
  hideArrow(targetIndex, prevButton, nextButton, slides);

  // console.log(targetIndex);
});
