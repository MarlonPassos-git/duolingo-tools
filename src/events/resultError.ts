import { EVENT_RESULT_ERROR } from '../constants/events';
import { createRecurringVisibleEvent } from '../utils/createRecurringVisibleEvent';
import { getIncorrectFooterContainerElement } from "../utils/elements";

export const initEventResultError = createRecurringVisibleEvent(EVENT_RESULT_ERROR, getIncorrectFooterContainerElement) 
