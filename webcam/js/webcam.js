const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const snapshot = document.querySelector('.controls > button');

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src='${data}' />'`;
  strip.insertBefore(link, strip.firstChild);
}

function paintCanvas() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  setInterval(() => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 10);
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((error) => {
      console.error(`Error ${error}`);
    });
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] += 100;
    pixels.data[i + 1] -= 50;
    pixels.data[i + 2] *= 0.5;
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i];
    pixels.data[i + 100] = pixels.data[i + 1];
    pixels.data[i - 150] = pixels.data[i + 2];
  }
  return pixels;
}

window.onload = getVideo;
snapshot.addEventListener('click', takePhoto);
video.addEventListener('canplay', paintCanvas);
