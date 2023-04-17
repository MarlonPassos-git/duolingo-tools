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

export type IAutoCompleteWrongInput = {
  init: () => void;
}

export class AutoCompleteWrongTextArea implements IAutoCompleteWrongInput {
  constructor(
    private storage: SimpleStorage,
    private getTextArea: () => HTMLTextAreaElement | null = getInputElement,
    private getQuestionId: () => string
  ) { }


  init() {
    document.addEventListener(EVENT_RESULT_ERROR, this.handle.bind(this));
  }

  private handle() {
    if (!this.hasTextAreaInPage()) return
    const input = this.getTextArea()!;
    this.storage.set(this.getQuestionId(), input.value);
  }

  private hasTextAreaInPage(): boolean {
    return this.getTextArea() !== null;
  }
}