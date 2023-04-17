export function getInputElement() {
  const CSS_SELECTOR = '[data-test="challenge-translate-input"]:enabled';
  return document.querySelector(CSS_SELECTOR);
}

export function getIncorrectFooterContainer() {
  const CSS_SELECTOR = '[data-test*="blame-incorrect"]';
  return document.querySelector(CSS_SELECTOR);
}