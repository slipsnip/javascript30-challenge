const controls = document.querySelector('.controls');
const video = document.querySelector('video');
const player = document.querySelector('.player');
const playIndicator = document.querySelector('.play-indicator');
const playControl = controls.querySelector('.play');
const progress = player.querySelector('progress');
const ranges = controls.querySelector('input[type=range]');

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

function togglePlay(event) {
  if (event) {
    console.info('play triggered');
    console.dir(event.target);
  }
  
  const method = video.paused ? 'play' : 'pause';
  video[method]();
};

function updatePlayBtn() {
  const pauseIcon = '<i class="pause fa fa-pause" data-ctrl="pause"></i>';
  const playIcon = '<i class="play fa fa-play" data-ctrl="play"></i>';

  if (!video.paused) {
    playIndicator.innerHTML = playIcon;
    playControl.innerHTML = playIcon;
    return;
  }
  playIndicator.innerHTML = pauseIcon;
  playControl.innerHTML = pauseIcon;
}


function scrub(event) {
  video.currentTime = (event.offsetX / progress.offsetWidth) * video.duration;
  togglePlay();
  updatePlayBtn();
}
const updateProgress = () => {
  const current = video.currentTime;
  const position = Math.ceil((current / video.duration) * 100);
  player.querySelector('progress').value = position;
};

function handleControl(event) {
  event.cancelBubble = (event.target.nodeName === 'I') ? true : false;
  let newTime = video.currentTime;
  const control = (!event.target.dataset.ctrl) ? 'play' : event.target.dataset.ctrl;

  switch (control) {
    case 'play':
      togglePlay();
      break;
    case 'pause':
      togglePlay();
      break;
    case 'fast-back':
    // Set currentTime directly
      video.currentTime = 0;
      togglePlay();
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
    case 'volume':
      video.volume = event.target.value;
      break;
    case 'fullscreen':
      toggleFullscreen();
      break;
    default:
      break;
  }

}

function toggleFullscreen() {
  if (isFullScreen()) {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    setFullscreenData(false);
 }
 else {
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.mozRequestFullScreen) video.mozRequestFullScreen();
    else if (video.webkitRequestFullScreen) video.webkitRequestFullScreen();
    else if (video.msRequestFullscreen) video.msRequestFullscreen();
    setFullscreenData(true);
 }
}

const isFullScreen = function() {
  return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
}

player.addEventListener('click', handleControl);
player.addEventListener('mouseover', event => {
  progress.classList.add('show');
  show(controls, playIndicator);
});
player.addEventListener('mouseleave', event => {
  if (!video.paused) {
    progress.classList.remove('show');
    hide(controls, playIndicator);
  }
});

video.addEventListener('play', updatePlayBtn);
video.addEventListener('pause', updatePlayBtn);
video.addEventListener('timeupdate', updateProgress);
document.addEventListener(
  'DOMContentLoaded',
  () => {
    player.querySelector('progress').style.width = `${video.width}px`;
  },
  false,
);
controls.addEventListener('change', handleControl, true);
progress.addEventListener('click', scrub);
let mousedown = false;
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);