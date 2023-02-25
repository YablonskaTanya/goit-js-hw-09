const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

const DELAY = 1000;
let timerId = null;
refs.buttonStop.disabled = true;

refs.buttonStart.addEventListener('click', () => {
  refs.buttonStart.disabled = true;
  refs.buttonStop.disabled = false;

  timerId = setInterval(() => {
    let color = getRandomHexColor();
    refs.body.style.backgroundColor = color;
  }, DELAY);
});

refs.buttonStop.addEventListener('click', () => {
  refs.buttonStart.disabled = false;
  refs.buttonStop.disabled = true;

  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
