import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dayValue = document.querySelector('[ data-days]');
const hourValue = document.querySelector('[data-hours]');
const minuteValue = document.querySelector('[data-minutes]');
const secondValue = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startCountdown(selectedDate);
      startBtn.disabled = true;
    }
  },
};

flatpickr(dateTime, options);

function startCountdown(targetDate) {
  const interval = setInterval(updateConutdown, 1000);
  function updateConutdown() {
    const currentTime = new Date();
    const timeDifference = targetDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(interval);
      updateDateValue(0, 0, 0, 0);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateDateValue(days, hours, minutes, seconds);
  }
}

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
  return value.toString().padStart(2, '0');
}

function updateDateValue(days, hours, minutes, seconds) {
  dayValue.textContent = addLeadingZero(days);
  hourValue.textContent = addLeadingZero(hours);
  minuteValue.textContent = addLeadingZero(minutes);
  secondValue.textContent = addLeadingZero(seconds);
}
