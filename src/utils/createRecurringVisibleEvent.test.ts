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
    vi.clearAllTimers();
  });

  it('should be not call event Listener if element do not found in DOM', () => {
    const sut = createRecurringVisibleEvent(EVENT_NAME, doNotFindElement);
    sut();

    expect(eventListener).toHaveBeenCalledTimes(0);
  });

  it('should be call event Listener if element found in DOM', () => {
    const sut = createRecurringVisibleEvent(EVENT_NAME, findElement);
    sut();

    expect(eventListener).toHaveBeenCalledTimes(1);
  });

  it('should be call event Listener at the right time that the element is visible ', () => {
    const queryElementMocked = vi.fn().mockImplementation(doNotFindElement);
    const sut = createRecurringVisibleEvent(EVENT_NAME, queryElementMocked);

    sut();

    queryElementMocked.mockImplementation(findElement);
    expect(eventListener).toHaveBeenCalledTimes(0);
    vi.advanceTimersByTime(100);

    expect(eventListener).toHaveBeenCalledTimes(1);
  });

  it('should be call event Listener at the right time that the element is visible and call again when the element is not visible', () => {
    const queryElementMocked = vi.fn().mockImplementation(doNotFindElement);
    const sut = createRecurringVisibleEvent(EVENT_NAME, queryElementMocked);

    sut();

    queryElementMocked.mockImplementation(findElement);
    expect(eventListener).toHaveBeenCalledTimes(0);
    vi.advanceTimersByTime(200);

    expect(eventListener).toHaveBeenCalledTimes(1);

    queryElementMocked.mockImplementation(doNotFindElement);
    vi.advanceTimersByTime(100);

    expect(eventListener).toHaveBeenCalledTimes(1);

    queryElementMocked.mockImplementation(findElement);
    vi.advanceTimersByTime(100);

    expect(eventListener).toHaveBeenCalledTimes(2);
  });

  function doNotFindElement() {
    return null;
  }

  function findElement() {
    const root = document.createElement('div');
    const div = document.createElement('div');

    root.appendChild(div);

    return div;
  }
});
