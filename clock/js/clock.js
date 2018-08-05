const to12Hour = (hour) => {
  if (hour === 0 | hour === 12) {
    return (hour === 0) ? [12, 'am'] : [12, 'pm'];
  }
  if (hour >=1 && hour <= 11) {
    return [hour, 'am'];
  }
  return [hour - 12, 'pm'];
}

const getRotations = (hour, minute, second) => {
  const rot = -90; // Initial rotation : 12 oclock
  const step = 365 / 60; // Minute / second divisions
  const hourRot = rot + (hour * step * 5);
  const minuteRot = rot + (minute * step);
  const secondRot = rot + (second * step);
  return [hourRot, minuteRot, secondRot];
}

const hourHand = document.querySelector(".hand.hour");
const minuteHand = document.querySelector(".hand.minute");
const secondHand = document.querySelector(".hand.second");

const updateClock = () => {
  const date = new Date();
  const [ hours, antePost ] = to12Hour(date.getHours());
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const [hourRot, minuteRot, secondRot] = getRotations(hours, minutes, seconds);
  hourHand.style.transform = `rotate(${hourRot}deg)`;
  minuteHand.style.transform = `rotate(${minuteRot}deg)`;
  secondHand.style.transform = `rotate(${secondRot}deg)`;
  console.log(hours, minutes, seconds);
}

window.setInterval(updateClock, 1000);