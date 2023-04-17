/**
 * Verifica se um elemento HTML esta visível na tela principal do duolingo
 */
export function isElementVisible<T extends Element>(elemento: T) {
  if (!elemento)
    return false;
  if (elemento instanceof HTMLInputElement) {
    if (elemento.disabled)
      return false;
  }
  return elemento?.parentNode !== null;
}
