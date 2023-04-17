import { EVENT_SHOW_INPUT } from './constants/events';

const square = document.createElement('div');
square.classList.add('square');
square.innerText = 'Clique-me!';

square.addEventListener('click', () => {
  const msg = new SpeechSynthesisUtterance('Olá mundo 3');
  window.speechSynthesis.speak(msg);
});

document.body.appendChild(square);
const eventoEspecial = new Event(EVENT_SHOW_INPUT);

// Variável de sinalização
let eventoJaAcionado = false;

function initEventShowInput() {
  const elementoEspecial = document.querySelector('[data-test="challenge-translate-input"]:enabled');

  if (elementoEspecial) {

    const interval = setInterval(() => {
      if (!isVisibleWindow(elementoEspecial)) {
        initEventShowInput();
        eventoJaAcionado = false;
        clearInterval(interval);
      }
    }, 100);

    if (!eventoJaAcionado) {
      eventoJaAcionado = true;
      document.dispatchEvent(eventoEspecial);
    }
  } else {
    setTimeout(initEventShowInput, 100);
  }
}

initEventShowInput();

function minhaFuncao() {
  console.log('O elemento especial apareceu!');
}

document.addEventListener(EVENT_SHOW_INPUT, minhaFuncao);

function isVisibleWindow(elemento) {
  if (!elemento) return false;
  if (elemento.disabled) return false;
  return elemento?.parentNode !== null;
}

console.log("deu ruim, produtividade")
