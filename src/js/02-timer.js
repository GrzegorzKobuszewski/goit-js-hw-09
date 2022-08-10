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
const startButton = document.querySelector('button[data-start]');
const timerDiv = document.querySelector('.timer');

// Definicja zmiennych
let timerId = null;
let selectedDay;

// Ustawienie aktywności przyciusku --> przycisk wyłączony, nie można w niego kliknąć
startButton.disabled = true;



// Pozwala użytkownikowi wybrać datę i godzinę 
flatpickr(input, options);
// Włączenie odliczania czasu przez kliknięcie w START Button
startButton.addEventListener('click', countdown);



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
      selectedDay = selectedDates[0].getTime();
        if (selectedDay < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    },
};

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

/* Sprawdzenie
days.textContent = 11;
hours.textContent = 12;
minutes.textContent = 20;
seconds.textContent = 5;
*/

// Funkcja, która uruchamia odliczanie
function countdown(e) {
  startButton.disabled = true;
  timerId = setInterval(() => {
    startButton.disabled = true;
    const timeLeft = selectedDay - new Date().getTime;
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

