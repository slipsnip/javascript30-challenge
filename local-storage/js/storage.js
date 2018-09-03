const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const controls = document.querySelector('.controls');
const items = JSON.parse(localStorage.getItem('items')) || [];

function loadTapas(plates, plateList) {
  plateList.innerHTML = plates
    .map(
      (plate, i) => `<li>
    <input type="checkbox" id="item${i}" data-index="${i}" ${plate.tacoed ? 'checked' : ''} />
    <label for="item${i}">${plate.name}</label>
    </li>`,
    ).join('');
}

function tacoize(event) {
  let plateId = null;
  switch (event.target.nodeName) {
    case 'LABEL':
      plateId = event.target.htmlFor;
      break;
    case 'LI':
      plateId = event.target.querySelector('input').id;
      break;
    default:
      return;
  }
  const checkBox = itemsList.querySelector(`input[id=${plateId}]`);
  const index = checkBox.dataset.index;
  items[index].tacoed = !checkBox.checked;
  localStorage.setItem('items', JSON.stringify(items));
}

function handleControl(event) {
  let clear = false;
  if (!event.target.matches('input') && !event.target.matches('button')) return;
  const checkBoxes = itemsList.querySelectorAll('input');
  [...checkBoxes].map((checkbox, index) => {
    const value = (!event.target.checked) ? false : event.target.checked;
    checkbox.checked = clear ? false : value;
    items[index].tacoed = checkbox.checked;
  });
  localStorage.setItem('items', JSON.stringify(items));
}

function addPlate(event) {
  event.preventDefault();
  const plate = {
    tacoed: false,
    name: this.item.value,
  };
  items.push(plate);
  localStorage.setItem('items', JSON.stringify(items));
  loadTapas(items, itemsList);
  this.reset();
}
addItems.addEventListener('submit', addPlate);
itemsList.addEventListener('click', tacoize);
controls.addEventListener('click', handleControl);
loadTapas(items, itemsList);
