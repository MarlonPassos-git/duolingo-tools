const square = document.createElement('div');
square.style.position = 'fixed';
square.style.bottom = '20px';
square.style.right = '20px';
square.style.width = '50px';
square.style.height = '50px';
square.style.background = 'red';
square.style.color = 'white';
square.style.textAlign = 'center';
square.style.lineHeight = '50px';
square.style.cursor = 'pointer';
square.innerText = 'Clique-me!';

square.addEventListener('click', () => {
  const msg = new SpeechSynthesisUtterance('Olá mundo');
  window.speechSynthesis.speak(msg);
});

document.body.appendChild(square);
