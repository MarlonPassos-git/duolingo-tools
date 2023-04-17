import { EVENT_SHOW_INPUT } from '../constants/events';
import { getInputElement } from "../utils/elements";
import { createRecurringVisibleEvent } from "../utils/createRecurringVisibleEvent";

export const initEventShowInput = createRecurringVisibleEvent(EVENT_SHOW_INPUT, getInputElement)

