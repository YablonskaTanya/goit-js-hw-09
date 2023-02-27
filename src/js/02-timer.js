// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const DELAY = 1000;
let stopWatch = null;

const refs = {
  input: document.querySelector('input#datetime-picker'),
  button: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

const { input, button, dataDays, dataHours, dataMinutes, dataSeconds } = refs;

button.disabled = true;

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      button.disabled = false;
    }
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

button.addEventListener('click', () => {
  stopWatch = setInterval(() => {
    const countdownTime = new Date(input.value) - new Date();
    let timeValue = convertMs(countdownTime);
    changeTimerCounter(timeValue);
    if (countdownTime <= DELAY) {
      clearInterval(stopWatch);
    }
  }, DELAY);
});

function changeTimerCounter({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(`${days}`);
  dataHours.textContent = addLeadingZero(`${hours}`);
  dataMinutes.textContent = addLeadingZero(`${minutes}`);
  dataSeconds.textContent = addLeadingZero(`${seconds}`);
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
