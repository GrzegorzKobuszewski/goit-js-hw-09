// biblioteki i style
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// potrzebne elementy - dane wejściowe
const input = document.querySelector('input#datetime-picker');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

// Ustawienie aktywności przyciusku --> przycisk wyłączony, nie można w niego kliknąć
const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;

let selectedDay = null;

// objekt parametrów do funkcji flatpickr
// objekt ten jest przekazywany do flatpickr'a jako drugi argument
// pierwszym argumentem jest wybrana przez użytkownika data
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    // metoda pozwalająca opracować datę wybraną przez użytkownika
    // selectedDates to tablica wybranych dat
    onClose(selectedDates) {
      const selectedDay = selectedDates[0].getTime();
        if (selectedDay < options.defaultDate.getTime()) {
          Notiflix.Notify.failure('Please choose a date in the future'); 
        } else {
          startButton.disabled = false;
          localStorage.setItem('selectedDate', `${selectedDates[0].getTime()}`);
          return selectedDate = selectedDates[0];
        }
    },
};



// Pozwala użytkownikowi wybrać datę i godzinę 
flatpickr(input, options);



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
};

// Funkcja pozwalająca zmienić format czasu, gdy liczba zawiera mniej niż dwie cyfry, np. z 5 robi 05
function addLeadingZero(value) {
    return value
        .toString()
        .padStart(2, '0');
};

let timerId = null;

// Funkcja, która uruchamia odliczanie
const countdown = () => {
  startButton.disabled = true;
  timerId = setInterval(() => {
    startButton.disabled = true;
    const timeLeft = localStorage.getItem('selectedDate') - new Date().getTime();
    const timeLeftConvertMs = convertMs(timeLeft);
    if (timeLeftConvertMs.seconds >= 0) {
      days.textContent = addLeadingZero(timeLeftConvertMs.days);
      hours.textContent = addLeadingZero(timeLeftConvertMs.hours);
      minutes.textContent = addLeadingZero(timeLeftConvertMs.minutes);
      seconds.textContent = addLeadingZero(timeLeftConvertMs.seconds);

    } else {
      Notiflix.Notify.success('Countdown finished');
      clearInterval(timer);
    }
  }, 1000);
};



// Włączenie odliczania czasu przez kliknięcie w START Button
startButton.addEventListener('click', countdown);



// Style
const body = document.querySelector('body');
body.style.marginLeft = '20px';

input.style.width = '190px';
input.style.fontSize = '20px';
input.style.padding = '10px';
input.textAlign = 'center';

startButton.style.width = '80px';
startButton.style.fontSize = '20px';
startButton.style.padding = '5px';
startButton.style.marginLeft= '10px';
startButton.style.border = 'solid';
startButton.style.borderShadow = '5px';
startButton.style.borderRadius = '5px';

// Timer, Licznik, Odliczanie

const timer = document.querySelector('.timer');

timer.style.display = 'flex';
timer.style.marginTop = '20px';

const timerFields = Array.from(document.querySelectorAll('div.field'));

for (const timerField of timerFields) {
  timerField.style.display = 'flex';
  timerField.style.flexDirection = 'column';
  timerField.style.textAlign = 'center';
  timerField.style.paddingRight = '20px';
}

const values = Array.from(document.querySelectorAll('span.value'));

for (const value of values) {
  value.style.fontSize = '60px';
  value.style.lineHeight = '1.6';
  value.style.display = 'block';
  value.style.textAlign = 'center';
}

const labels = Array.from(document.querySelectorAll('.label'));

for (const label of labels) {
  label.style.display = 'block';
  label.style.textAlign = 'center';
  label.style.fontSize = '20px';
  label.style.textTransform = 'uppercase';
  label.style.lineHeight = '0.1';
}