import { describe, it, expect, vi } from 'vitest'
import { AutoCompleteWrongTextArea, SimpleStorage } from './autoCompleteWrongInput'
import { EVENT_RESULT_ERROR } from '../constants'

describe(AutoCompleteWrongTextArea.name, () => {
  it("se o erro acontecer em uma pagina que nao tem o input, nao deve fazer nada", () => {
    const { sut, storage } = makeSut()
    sut.init()
    expect(storage.set).toHaveBeenCalledTimes(0)
  })

  it("se o error acontecer na primeira vez em uma pagina do tipo input deve salvar no local storage oque a pessoa digitou", () => {
    const { sut, storage, getTextAreaSpy } = makeSut()
    sut.init()
    getTextAreaSpy.mockReturnValue(document.createElement('textarea'))
    dispatchEvent(EVENT_RESULT_ERROR)

    expect(storage.set).toHaveBeenCalledTimes(1)
  })

  function dispatchEvent(eventName: string) {
    const event = new Event(eventName)
    document.dispatchEvent(event)
  }

  function makeSut() {
    class SimpleStorageSpy implements SimpleStorage {
      get = vi.fn()
      set = vi.fn()
    }
    const getTextAreaSpy = vi.fn<[], HTMLTextAreaElement | null>(() => null)
    const getQuestionIdSpy = vi.fn<[], string>(() => 'any_question_id')
    const storage = new SimpleStorageSpy()
    const sut = new AutoCompleteWrongTextArea({
      storage,
      getTextArea: getTextAreaSpy,
      getQuestionId: getQuestionIdSpy
    })

    return { sut, storage, getTextAreaSpy, getQuestionIdSpy }
  }
})  