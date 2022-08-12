import Notiflix from 'notiflix';

const firstDelayHTML = document.querySelector('input[name="delay"]');
const stepDelayHTML = document.querySelector('input[name="step"]');
const amountHTML = document.querySelector('input[name="amount"]');
const buttonCreatePromiseHTML = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
};


buttonCreatePromiseHTML.addEventListener('click', e => {
  e.preventDefault();
  const firstDelay = Number(firstDelayHTML.value);
  const stepDelay = Number(stepDelayHTML.value);
  const amount = Number(amountHTML.value);

  for (let i = 1; i <= amount; i++) {
    let stepTime = firstDelay + stepDelay * (i - 1);
    createPromise(i, stepTime)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay} ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay} ms`
        );
      });
  }
});