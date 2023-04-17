import { isElementVisible } from "../utils/isElementVisible";
import { EVENT_RESULT_ERROR } from '../constants/events';
import { getIncorrectFooterContainerElement } from "../utils/elements";

let eventHasTriggered = false;
export const event = new Event(EVENT_RESULT_ERROR);

export function initEventResultError() {

  if (getIncorrectFooterContainerElement()) {

    const interval = setInterval(() => {
      if (!isElementVisible(getIncorrectFooterContainerElement())) {
        initEventResultError();
        eventHasTriggered = false;
        clearInterval(interval);
      }
    }, 100);

    if (!eventHasTriggered) {
      eventHasTriggered = true;
      document.dispatchEvent(event);
    }
  } else {
    setTimeout(initEventResultError, 100);
  }
}
