import { EVENT_SHOW_INPUT } from './constants/events';
import { initAllEvents } from './events'

const square = document.createElement('div');
square.classList.add('square');
square.innerText = 'Clique-me!';

square.addEventListener('click', () => {
  const msg = new SpeechSynthesisUtterance('Olá mundo 3');
  window.speechSynthesis.speak(msg);
});

document.body.appendChild(square);

// Variável de sinalização

initAllEvents();

function minhaFuncao() {
  console.log('O elemento especial apareceu!');
}

document.addEventListener(EVENT_SHOW_INPUT, minhaFuncao);

export function isVisibleWindow<T extends Element>(elemento: T) {
  if (!elemento) return false;
  if (elemento instanceof HTMLInputElement) {
    if (elemento.disabled) return false;
  }
  return elemento?.parentNode !== null;
}

console.log("deu ruim, produtividade, 2")
