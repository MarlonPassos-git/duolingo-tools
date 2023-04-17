import { isVisibleWindow } from '..';
import { EVENT_SHOW_INPUT } from '../constants/events';

export let eventHasTriggered = false;
export const event = new Event(EVENT_SHOW_INPUT);

export function initEventShowInput() {
  const $element = document.querySelector('[data-test="challenge-translate-input"]:enabled');

  if ($element) {

    const interval = setInterval(() => {
      if (!isVisibleWindow($element)) {
        initEventShowInput();
        eventHasTriggered = false;
        clearInterval(interval);
      }
    }, 100);

    if (!eventHasTriggered) {
      eventHasTriggered = true;
      document.dispatchEvent(event);
    }
  } else {
    setTimeout(initEventShowInput, 100);
  }
}
