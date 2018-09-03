const imgs = document.querySelectorAll('.slide-in');

function debounce(func, wait = 20, immediate = true, ...args) {
  let timeout;
  return () => {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// function handleFocus() {
//   this.classList.toggle('active');
//   console.info('called');
// }

function handleScroll(event) {
  imgs.forEach((img) => {
    // scrollY how far down top of vp is scrolled
    // Calculate how far down bottom of viewport minus half img height
    const slideInAt = window.scrollY + window.innerHeight - img.height / 2;
    const imgBottom = img.offsetTop + img.height; // Bottom of image
    const isHalfShown = slideInAt > img.offsetTop;
    const isNotPast = window.scrollY < imgBottom;
    if (isHalfShown && isNotPast) {
      img.classList.add('active');
    } else {
      img.classList.remove('active');
    }
  });
}
// imgs.forEach((img) => {
//   img.addEventListener('focusin', handleFocus);
// });

window.addEventListener('scroll', debounce(handleScroll));
