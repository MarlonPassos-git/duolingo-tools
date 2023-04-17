import { isElementVisible } from "../utils/isElementVisible";
import { EVENT_SHOW_INPUT } from '../constants/events';
import { getInputElement } from "../utils/elements";

export let eventHasTriggered = false;
export const event = new Event(EVENT_SHOW_INPUT);

export function initEventShowInput() {

  if (getInputElement()) {

    const interval = setInterval(() => {
      if (!isElementVisible(getInputElement())) {
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
