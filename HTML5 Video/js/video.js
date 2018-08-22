const controls = document.querySelector('.controls');
const video = document.querySelector('video');
const player = document.querySelector('.player');
const playIndicator = document.querySelector('.play-indicator');
let isPlaying = false;

const hide = (...elements) => {
  elements.forEach((element) => {
    element.classList.add('hidden');
  });
};
const show = (...elements) => {
  elements.forEach((element) => {
    element.classList.remove('hidden');
  });
};

const play = () => {
  const pause = '<i class="pause far fa-pause-circle"></i>';
  const play = '<i class="play far fa-play-circle"></i>';

  if (!video.paused) {
    video.pause();
    isPlaying = false;
    playIndicator.innerHTML = play;
    return;
  }
  video.play();
  isPlaying = true;
  playIndicator.innerHTML = pause;
};

player.addEventListener('click', play);
player.addEventListener('mouseover', (event) => {
  show(controls, playIndicator);
});
player.addEventListener('mouseleave', (event) => {
  if (isPlaying) {
    hide(controls, playIndicator);
  }
});
