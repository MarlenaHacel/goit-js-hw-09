function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let time = 0;
const body = document.body;

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopColorChange);

function startChangeColor() {
  time = setInterval(changeBackgroundColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}
function stopColorChange() {
  clearInterval(time);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function changeBackgroundColor() {
  const randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}
