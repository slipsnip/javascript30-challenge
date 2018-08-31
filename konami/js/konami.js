let keystrokes = ''; // key sequence entered
const secretArea = document.querySelector('#secret');

function baphomet(event) {
  const secret = 'baphomet';
  const index = secret.indexOf(event.key);  
  console.info(event);
  if (index !== -1) {
    const checkIndex = (keystrokes.length === 0) ? 0 : keystrokes.length;
    if (secret.charAt(checkIndex) === event.key) {
      // console.log('correct key');
      keystrokes += event.key;
      if (keystrokes === secret) {
        secretArea.innerHTML = '<img src="media/Baphomet.jpg">';
        console.info('KONAMI!');
        keystrokes = '';
        return;
      }
      return;
    }
  }
  keystrokes = '';
  // console.error('bad key');

}

document.addEventListener('keydown', baphomet);
