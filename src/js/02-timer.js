import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");

datetimePicker.addEventListener("change", () => {
  const selectedDate = new Date(datetimePicker.value);
  const currentDate = new Date();

  if (selectedDate < currentDate) {
    window.alert("Please choose a date in the future");
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
});

datetimePicker.addEventListener("focus", () => {
  flatpickr(datetimePicker, {
    enableTime: true,
    minDate: "today",
    dateFormat: "Y-m-d H:i",
  });
});

startButton.addEventListener("click", () => {
  const selectedDate = new Date(datetimePicker.value);
  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = selectedDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      updateTimerValues(0, 0, 0, 0);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerValues(days, hours, minutes, seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}

function updateTimerValues(days, hours, minutes, seconds) {
  daysValue.textContent = formatTimerValue(days);
  hoursValue.textContent = formatTimerValue(hours);
  minutesValue.textContent = formatTimerValue(minutes);
  secondsValue.textContent = formatTimerValue(seconds);
}

function formatTimerValue(value) {
  return value.toString().padStart(2, "0");
}