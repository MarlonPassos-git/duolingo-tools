import { EVENT_SHOW_INPUT, EVENT_RESULT_ERROR } from './constants/events';
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
document.addEventListener(EVENT_RESULT_ERROR, () => {
  console.log('Aconteu algum erro!');
});
console.log("deu ruim, produtividade, 3")
