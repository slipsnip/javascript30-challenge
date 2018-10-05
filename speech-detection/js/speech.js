// Giving up on this until it gets standardized, right now
// chrome does not support grammar, ff does but does not
// support SpeechRecognition.

var recognition = window.SpeechRecognition();
recognition.interimResults = true;
const inverted = '′';
const double = '²';
const grammar = "#JSGF V1.0; grammar turns; public <turn> = right | left | up | down | back | front;";
const algorithmRecognition = new (SpeechGrammarList || webkitSpeechGrammarList)();
algorithmRecognition.addFromString(grammar, 1);
recognition.grmmars = algorithmRecognition;



const process = new webkitSpeechRecognitionEvent('process', {
  bubbles: true,
  cancelable: true,
});
let algorithm = '';
let start = false;

const p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

// const replacements = new Map();
// replacements.set(/i|(prime)/gi, inverted);
// replacements.set(/(you)/gi, 'U');
// replacements.set(/2|(too)|(two)|(tube)/gi, double);
// replacements.set(/(are)/gi, 'R');

recognition.addEventListener('result', (event) => {
  let interim = [...event.results]
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  console.dir(`recognition: ${algorithmRecognition[0].src}`);
  if (event.results[0].isFinal) {
    algorithm = `${algorithm} ${interim}`;
    console.log('final');
    console.log(algorithm);
  };
});

recognition.addEventListener('end', recognition.start);
recognition.start();
recognition.addEventListener('process', () => {
  console.log('Processing');
  start = false;
});
