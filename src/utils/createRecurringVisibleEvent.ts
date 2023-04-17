import { isElementVisible } from "./isElementVisible";

export function createRecurringVisibleEvent(eventName: string, queryElement: () => Element | null) {
  const event = new Event(eventName);
  let eventHasTriggered = false;

  return function initEvent() {
    if (queryElement()) {

      const interval = setInterval(() => {
        if (!isElementVisible(queryElement())) {
          initEvent();
          eventHasTriggered = false;
          clearInterval(interval);
        }
      }, 100);

      if (!eventHasTriggered) {
        eventHasTriggered = true;
        document.dispatchEvent(event);
      }
    } else {
      setTimeout(initEvent, 100);
    }
  }
}