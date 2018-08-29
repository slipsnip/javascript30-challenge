const controls = document.querySelector('.controls');
const video = document.querySelector('video');
const player = document.querySelector('.player');
const playIndicator = document.querySelector('.play-indicator');
let isPlaying = false;

const hide = (...elements) => {
  elements.forEach(element => {
    element.classList.add('hidden');
  });
};
const show = (...elements) => {
  elements.forEach(element => {
    element.classList.remove('hidden');
  });
};

function play(event) {
  const pauseIcon = '<i class="pause far fa-pause-circle"></i>';
  const playIcon = '<i class="play far fa-play-circle"></i>';
  console.dir(event.target);

  if (!video.paused) {
    video.pause();
    isPlaying = false;
    playIndicator.innerHTML = playIcon;
    return;
  }
  video.play();
  isPlaying = true;
  playIndicator.innerHTML = pauseIcon;
};

const updateProgress = () => {
  const current = video.currentTime;
  const position = Math.ceil((current / video.duration) * 100);
  player.querySelector('progress').value = position;
};

function handleControl(event) {
  event.cancelBubble = (event.target.nodeName === 'I') ? true : false;
  let newTime = video.currentTime;
  switch (event.target.dataset.ctrl) {
    case 'fast-back':
    // Set currentTime directly
      video.currentTime = 0;
      play();
      break;
    case 'step-back':
      newTime -= 10;
      video.currentTime = (newTime >= 0) ? newTime : 0;

      break;
    case 'step-forward':
      newTime += 10;
      video.currentTime = (newTime <= video.duration) ? newTime : video.duration;

      break;
    case 'fast-forward':
      video.currentTime = video.duration;
      break;
    default:
      break;
  }

}

player.addEventListener('click', play);
player.addEventListener('mouseover', event => {
  show(controls, playIndicator);
});
player.addEventListener('mouseleave', event => {
  if (isPlaying) {
    hide(controls, playIndicator);
  }
});
video.addEventListener('timeupdate', updateProgress);
document.addEventListener(
  'DOMContentLoaded',
  () => {
    player.querySelector('progress').style.width = `${video.width}px`;
  },
  false,
);
controls.addEventListener('click', handleControl, true);
