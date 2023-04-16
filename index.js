const square = document.createElement('div');
square.classList.add('square');
square.innerText = 'Clique-me!';

square.addEventListener('click', () => {
  const msg = new SpeechSynthesisUtterance('Olá mundo 2');
  window.speechSynthesis.speak(msg);
});

document.body.appendChild(square);
