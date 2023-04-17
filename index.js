const square = document.createElement('div');
square.classList.add('square');
square.innerText = 'Clique-me!';

square.addEventListener('click', () => {
  const msg = new SpeechSynthesisUtterance('Olá mundo 3');
  window.speechSynthesis.speak(msg);
});

document.body.appendChild(square);
const eventoEspecial = new Event('elementoEspecialApareceu');

// Variável de sinalização
let eventoJaAcionado = false;
let elementoEstaVisivel = false;

// Função que cria e configura o observer
function configurarObserver() {
  console.log("configurarObserver")
  // Seleciona o elemento que deve ser observado
  const elementoEspecial = document.querySelector('[data-test="challenge-translate-input"]:enabled');
  // adicina o elemento especial como uma variável global
  window.elementoEspecial = elementoEspecial;

  // Verifica se o elemento especial existe
  if (elementoEspecial) {
    elementoEstaVisivel = true;

    const interval = setInterval(() => {
      if (!estaVisivelNaTela(elementoEspecial)) {
        configurarObserver();
        eventoJaAcionado = false;
        clearInterval(interval);
      }
    }, 100);


      // Verifica se o evento ainda não foi acionado
      if (!eventoJaAcionado) {

        console.log("evento nao acionado")
        // Sinaliza que o evento já foi acionado
        eventoJaAcionado = true;

        // Dispara o evento personalizado
        document.dispatchEvent(eventoEspecial);
      }
  } else {
  setTimeout(configurarObserver, 100);
    elementoEstaVisivel = false;
  }
}

// Chama a função para configurar o observer
configurarObserver();

// Configura o observer para observar mudanças no elemento pai do elemento especial e seus filhos
function minhaFuncao() {
  console.log('O elemento especial apareceu!');
}

// Inscreva-se no evento personalizado
document.addEventListener('elementoEspecialApareceu', minhaFuncao);



function estaVisivelNaTela(elemento) {
  if (!elemento) return false;
  if (elemento.disabled) return false;
  return elemento?.parentNode !== null;
} 

console.log("oi")