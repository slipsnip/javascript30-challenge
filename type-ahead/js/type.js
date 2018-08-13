const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let data = {};
fetch(endpoint)
  .then(response => response.json())
  .then( result => data = result);

function search(cities, value) {
  return new Promise( (accept, reject) => {
    const result = cities.filter( ({ city, state }) => {
      return (city.indexOf(value) !== -1 || state.indexOf(value) !== -1);
    });
    accept(result);
  });
};

const markIt = (substr, string) => {
  const i = string.indexOf(substr);
  const len = substr.length;
  return `${string.slice(0, i)}<mark>${string.slice(i, len + i)}</mark>${string.slice(len + i)}`;
}

async function handleInput() {
  let list = [];
  if (this.value !== "") {
    const results = await search(data, this.value);
    list = results.map( ({city, state, population}) => (
      `<li>
      <span>${markIt(this.value,`${state}, ${city}`)}</span>
      <span class="population">${population}</span>
      </li>`
    ));
  } else {
  list = ['<li>Filter for a city</li>', '<li>or a state</li>'];
  }

  const suggestions = document.querySelector('.suggestions');
  suggestions.innerHTML = list.join('');
}

const searchField = document.querySelector('.search');
searchField.addEventListener('input', handleInput);