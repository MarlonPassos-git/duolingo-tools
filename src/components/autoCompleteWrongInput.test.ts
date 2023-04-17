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
    dispatchEventByName(EVENT_RESULT_ERROR)

    expect(storage.set).toHaveBeenCalledTimes(1)
  })

  it("se o error acontecer na primeira vez em uma pagina do tipo input deve salvar no local storage oque a pessoa digitou", () => {
    const { sut, storage, getTextAreaSpy } = makeSut()
    sut.init()
    const $textarea = document.createElement('textarea')
    $textarea.value = 'any_value'
    getTextAreaSpy.mockReturnValue($textarea)
    dispatchEventByName(EVENT_RESULT_ERROR)

    expect(storage.set).toHaveBeenCalledWith('any_question_id', 'any_value')
  })

  it("se cada tipos id de questão deve ter um local storage diferente", () => {
    const { sut, storage, getTextAreaSpy, getQuestionIdSpy } = makeSut()
    sut.init()
    const $textarea = document.createElement('textarea')
    $textarea.value = 'any_value_1'
    getTextAreaSpy.mockReturnValue($textarea)

    dispatchEventByName(EVENT_RESULT_ERROR)

    expect(storage.set).toHaveBeenCalledWith('any_question_id_1', 'any_value_1')

    $textarea.value = 'any_value_2'
    getQuestionIdSpy.mockReturnValue('any_question_id_2')
    dispatchEventByName(EVENT_RESULT_ERROR)

    expect(storage.set).toHaveBeenCalledWith('any_question_id_2', 'any_value_2')
    expect(storage.set).toHaveBeenCalledTimes(2)
  })

  it("se o error acontecer na segunda vez em um mesmo tipo de erro devemos substituir o primeiro valor salvo", () => {
    const { sut, storage, getTextAreaSpy } = makeSut()
    sut.init()
    const $textarea = document.createElement('textarea')
    $textarea.value = 'any_value'
    getTextAreaSpy.mockReturnValue($textarea)
    dispatchEventByName(EVENT_RESULT_ERROR)

    $textarea.value = 'any_value_2'
    dispatchEventByName(EVENT_RESULT_ERROR)

    expect(storage.set).toHaveBeenCalledWith('any_question_id', 'any_value_2')
  })

  function dispatchEventByName(eventName: string) {
    const event = new Event(eventName)
    document.dispatchEvent(event)
  }

  function makeSut() {
    class SimpleStorageSpy implements SimpleStorage {
      get = vi.fn()
      set = vi.fn()
    }
    const getTextAreaSpy = vi.fn<[], HTMLTextAreaElement | null>(() => null)
    const getQuestionIdSpy = vi.fn<[], string>(() => 'any_question_id_1')
    const storage = new SimpleStorageSpy()
    const sut = new AutoCompleteWrongTextArea({
      storage,
      getTextArea: getTextAreaSpy,
      getQuestionId: getQuestionIdSpy
    })

    return { sut, storage, getTextAreaSpy, getQuestionIdSpy }
  }
})  