const text = document.querySelector('.hero > h1');
const hero = document.querySelector('.hero');
// const style = window.getComputedStyle(text);
// const strWidth = style.getPropertyValue('width').match(/[\d.]+/)[0];
// const strHeight = style.getPropertyValue('height').match(/[\d.]+/)[0];
const walk = 100;


function updateShadow(event) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = event;

  if (this !== event.target) {
    x += event.target.offsetLeft;
    y += event.target.offsetTop;
  }
  // Percentage of walk
  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));
  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
  `;
  // const textX = Math.round(text.offsetLeft + (width / 2));
  // const textY = Math.round(text.offsetTop + (height / 2));
  // const maxDistance = 10;
  // // text-shadow: 10px 10px 0 rgba(0,0,0,1);
  // const delta = (mouse, reference) => {
  //   if (Math.abs(mouse - reference) <= maxDistance) {
  //     return mouse - reference;
  //   }
  //   return ((mouse - reference) < 0)
  //     ? -Math.abs(maxDistance)
  //     : maxDistance;
  // };
  // const dx = delta(event.clientX, textX);
  // const dy = delta(event.clientY, textY);
  // text.style.setProperty('text-shadow', `${dx}px ${dy}px 0 rgba(0,0,0,1)`);
}

hero.addEventListener('mousemove', updateShadow);
