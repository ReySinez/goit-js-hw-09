import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const btnEl = document.querySelector('button[data-start]');
const hoursEl = document.querySelector('span[data-hours]');
const daysEl = document.querySelector('span[data-days]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

const datetimePicker = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      let userDate = selectedDates[0].getTime();
      const dateNow = new Date();
      if (userDate < dateNow.getTime()) {
        Notiflix.Notify.info("Please choose a date in the future");
        btnEl.disabled = true;
      } else {
        btnEl.disabled = false;
      };   
    },
});

let timerId;

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    let days = Math.floor(ms / day);
    let hours = Math.floor((ms % day) / hour);
    let minutes = Math.floor(((ms % day) % hour) / minute);
    let seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
};

function updateDateTime() {

    const selectedDate = datetimePicker.selectedDates[0].getTime();
    const currentDate = new Date().getTime();
    const difference = selectedDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(difference);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if(difference <= 0) {
        clearInterval(timerId);
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }
};
function addLeadingZero(value) {

    return value.toString().padStart(2, '0');
};

function onBtnClick() {
    updateDateTime();
    timerId = setInterval(() => updateDateTime(), 1000);
};

btnEl.addEventListener('click', onBtnClick);