const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 1;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let color = 0;

function draw(event) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${color},85%,50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
  [lastX, lastY] = [event.offsetX, event.offsetY];
  color += (color < 359) ? 1 : -360;
  ctx.lineWidth += 1;
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  [lastX, lastY] = [event.offsetX, event.offsetY];
  ctx.lineWidth = 1;
  return true;
});
canvas.addEventListener('mouseup', () => { isDrawing = false; return false;});
canvas.addEventListener('mouseout', () => { isDrawing = false; return false;});
