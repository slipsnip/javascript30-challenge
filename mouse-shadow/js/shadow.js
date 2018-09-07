const text = document.querySelector('.hero > h1');
const style = window.getComputedStyle(text);
const strWidth = style.getPropertyValue('width').match(/[\d.]+/)[0];
const strHeight = style.getPropertyValue('height').match(/[\d.]+/)[0];
const width = Number(strWidth);
const height = Number(strHeight);


function updateShadow(event) {
  // Calculate center x,y of text via computed style

  // Remove trailing unit from string version of style

  const textX = Math.round(text.offsetLeft + (width / 2));
  const textY = Math.round(text.offsetTop + (height / 2));
  const maxDistance = 10;
  // text-shadow: 10px 10px 0 rgba(0,0,0,1);
  const delta = (mouse, reference) => {
    if (Math.abs(mouse - reference) <= maxDistance) {
      return mouse - reference;
    }
    return ((mouse - reference) < 0)
      ? -Math.abs(maxDistance)
      : maxDistance;
  };
  const dx = delta(event.clientX, textX);
  const dy = delta(event.clientY, textY);
  text.style.setProperty('text-shadow', `${dx}px ${dy}px 0 rgba(0,0,0,1)`);
}

document.addEventListener('mousemove', updateShadow);
