class audioKeys {
  constructor() {
    this.audioMap = new Map();
  }
  play(k) {
    const key = this.audioMap.get(k);
    key.currentTime = 0;
    key.play();
  }
  add(key, audioFile) {
    this.audioMap.set(key, new Audio(audioFile));
  }

}

const keys = new audioKeys();
keys.add('a', './sounds/boom.wav');
keys.add('s', './sounds/clap.wav');
keys.add('d', './sounds/hihat.wav');
keys.add('f', './sounds/kick.wav');
keys.add('g', './sounds/openhat.wav');
keys.add('h', './sounds/ride.wav');
keys.add('j', './sounds/snare.wav');
keys.add('k', './sounds/tink.wav');
keys.add('l', './sounds/tom.wav');

const playKey = (k, action) => {

  const spanKeys = document.querySelectorAll('.key');
  const key = [...spanKeys]
    .find( key => key.dataset.key === k );
  if (key !== undefined) {
    if (action === 'active') {
      key.className = 'key active';
      keys.play(k);
    } else {
      key.className =  'key';
    }    
  }
};

const handleKeyDown = (event) => {
  playKey(event.key, 'active');
};

const handleKeyUp = (event) => {
  playKey(event.key);
};

const handleMouseDown = (event) => {
  const key = (event.target.dataset.key || event.srcElement.dataset.key);
  playKey(key, 'active');
}

const handleMouseUp = (event) => {
  const key = (event.target.dataset.key || event.srcElement.dataset.key);
  playKey(key);
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.body.onmousedown = handleMouseDown;
document.body.onmouseup = handleMouseUp;