import { expect, describe, beforeEach, afterEach, it, vi, Mock } from 'vitest';
import { createRecurringVisibleEvent } from './createRecurringVisibleEvent';

describe('createRecurringVisibleEvent', () => {
  const EVENT_NAME = 'any_event_name'
  let eventListener: Mock<[], void>

  beforeEach(() => {
    eventListener = vi.fn();
    document.addEventListener(EVENT_NAME, eventListener);
  });

  afterEach(() => {
    document.removeEventListener(EVENT_NAME, eventListener);
  });

  it('should be not call event Listener if element do not found in DOM', () => {

    const eventFunction = createRecurringVisibleEvent(EVENT_NAME, doNotFindElement);
    eventFunction();
    expect(eventListener).toHaveBeenCalledTimes(0);
  });

  function doNotFindElement() {
    return null;
  }

  function findElement() {
    return document.createElement('div');
  }
});
