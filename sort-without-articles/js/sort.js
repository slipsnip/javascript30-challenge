// I love ES6
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
const bandList = document.querySelector('#bands');
const articles = ['The', 'A', 'An']; // Banned words
// Bands that begin with an article: /(^a1\s)|(^a2\s)/ where a1 => article 1 etc...
let search = articles.reduce((acc, article) => `${acc}^(${article}\\s)|`, '');
search = new RegExp(`${search}(.+)`); // Last group, remainder after article
// Strip out the article - Last group capture
const strip = (string, regex) => string.replace(regex, `$${articles.length + 1}`);
bandList.innerHTML = bands.sort((strA, strB) => {
  const [a, b] = [strA, strB].map(string => strip(string, search));
  if (a < b) return -1;
  return (a > b) ? 1 : 0;
}).map(band => `<li>${band}</li>`).join('');
