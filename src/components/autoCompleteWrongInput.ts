/** 
 * Funcionalidade: 
 * - quando alguma pessoa errar alguma questao do tipo input
 * - vai salvar no no local storage o id da questao e oque a pessoa digitou
 * - na proxima vez que vemos essa mesma questao, vamos preencher o input com oque a pessoa digitou de corretor 
 */

import {
  EVENT_RESULT_ERROR,
  LOCAL_STORAGE_KEY_AUTO_COMPLETE_INPUT as LOCAL_STORAGE_KEY
} from '../constants';
import { getInputElement } from "../utils/elements"

export interface SimpleStorage {
  get(key: string): null | string;
  set(key: string, value: string): void;
}

type AutoCompleteWrongTextAreaConfig = {
  storage: SimpleStorage;
  getTextArea?: () => HTMLTextAreaElement | null;
  getQuestionId: () => string;
}

export class AutoCompleteWrongTextArea {
  private storage: SimpleStorage;
  private getTextArea: () => HTMLTextAreaElement | null;
  private getQuestionId: () => string;

  constructor({ storage, getTextArea = getInputElement, getQuestionId }: AutoCompleteWrongTextAreaConfig) {
    this.storage = storage;
    this.getTextArea = getTextArea;
    this.getQuestionId = getQuestionId;
  }

  init() {
    document.addEventListener(EVENT_RESULT_ERROR, this.handle.bind(this));
  }

  private handle() {
    if (!this.hasTextAreaInPage()) return
    const input = this.getTextArea()!;
    this.storage.set(this.getQuestionId(), input.value);
  }

  private hasTextAreaInPage() {
    return this.getTextArea() !== null
  }
}