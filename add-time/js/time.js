const videos = document.querySelectorAll('.videos > li');
const totalSeconds = [...videos].reduce((acc, video) => {
  let [mins, secs] = video.dataset.time.split(':').map(time => Number(time));
  return acc + secs + (mins * 60);
}, 0);

videos.forEach((video) => {video.innerHTML += ` [${video.dataset.time}]`; });

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  let secondsLeft = seconds % 3600;
  const minutes = Math.floor(secondsLeft / 60);
  secondsLeft %= 60;
  return `${hours}:${minutes}:${secondsLeft}`;

}

const totalItem = document.createElement('li');
totalItem.setAttribute('id','total');
const totalText = document.createTextNode(`Total Time: ${formatTime(totalSeconds)}`);
totalItem.appendChild(totalText);
document.querySelector('.videos').appendChild(totalItem);

console.info(`Total: ${formatTime(totalSeconds)}`);
