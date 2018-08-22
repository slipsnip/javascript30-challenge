const boxes = document.querySelectorAll('input');
let [start, end] = [];


document.addEventListener('click', (e) => {
  if (e.target.type === 'checkbox') {
    const index = [...boxes].findIndex(box => box === e.target);
    if (!e.shiftKey) {
      [start, end] = [index]; // make end undefined
      // Clear others
      [...boxes].filter(box => box !== e.target).forEach((box) => { box.checked = false; });
    } else {
      if (start > index) {
        [start, end] = [index, start];
      } else {
        end = index;
      }
      // console.debug(`start: ${start}, end: ${end}`);
      [...boxes].slice(start, end + 1).forEach((box) => { box.checked = true; });
    }

  }
});
