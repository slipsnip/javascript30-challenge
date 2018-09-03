// strings, numbers and booleans are assigned as copys
let age = 100;
const age2 = age;
console.info(age, age2);
age = 200;
console.info(age, age2);
/* === */
// Arrays are assigned as references
const colors = ['#FFEE45', '#BADA55', '#451500'];
const colorCopy = colors;
console.info(colors, colorCopy);
colorCopy[3] = '#FE23AB';
console.info(colors, colorCopy);
// slice will make copy
let colorCopy2 = colors.slice();
console.info(colors, colorCopy, colorCopy2);
colorCopy2[3] = '#FFFFFF';
console.info(colors, colorCopy, colorCopy2);
// so will concat on a empty array
colorCopy2 = [].concat(colors);
// as will es6 spread
colorCopy2 = [...colors];
// and Array.from(colors)
// Objects are also references
const obj = {
  x: 20,
  y: 15,
  color: colors[0],
};
console.info(obj.color);
let objCopy = obj;
objCopy.color = 'ABCDEF';
console.info(obj, objCopy);
// Use Object.assign for copys
// Only goes one deep so nested objects are still references
objCopy = Object.assign({}, obj);
objCopy.x = 69;
console.info(obj, objCopy);
// Can now spread objects
objCopy = { ...obj };
