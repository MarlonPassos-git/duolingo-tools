import { expect, describe, beforeEach, afterEach, it, vi, Mock } from 'vitest';
import { createRecurringVisibleEvent } from './createRecurringVisibleEvent';

vi.useFakeTimers();

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

  it('should be call event Listener if element found in DOM', () => {
    const eventFunction = createRecurringVisibleEvent(EVENT_NAME, findElement);
    eventFunction();
    expect(eventListener).toHaveBeenCalledTimes(1);
  });

  it.only('should be call event Listener at the right time that the element is visible ', () => {
    const queryElementMocked = vi.fn().mockImplementation(doNotFindElement);
    const eventFunction = createRecurringVisibleEvent(EVENT_NAME, queryElementMocked);

    eventFunction();

    queryElementMocked.mockImplementation(findElement);
    expect(eventListener).toHaveBeenCalledTimes(0);
    vi.advanceTimersByTime(100);

    expect(eventListener).toHaveBeenCalledTimes(1);
  });

  function doNotFindElement() {
    return null;
  }

  function findElement() {
    return document.createElement('div');
  }
});
