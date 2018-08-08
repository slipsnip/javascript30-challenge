const panels = document.querySelectorAll('.panel');
const childern = document.querySelectorAll('.panel p');

const selectPanel = (event) => {
  const currentPanel = (event.target.className === '') ? event.target.parentNode : event.target;
  panels.forEach( panel => panel.classList.remove('open'));
  currentPanel.classList.add('open');
  

}

panels.forEach( panel => panel.addEventListener('mousedown', selectPanel));
childern.forEach( child => child.addEventListener('mousedown', selectPanel));