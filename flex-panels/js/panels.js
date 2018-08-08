const panels = document.querySelectorAll('.panel');

function toggleOpen () {
  panels.forEach(panel => panel.classList.remove('open'));
  this.classList.toggle('open');
}

function toggleActive (event) {
  if (event.propertyName.includes('flex'))
  this.classList.toggle('open-active');
}

panels.forEach( panel => {
  panel.addEventListener('click', toggleOpen);
  panel.addEventListener('transitionend', toggleActive);
});