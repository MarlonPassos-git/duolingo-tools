import { describe, it, expect, vi } from 'vitest'
import { AutoCompleteWrongInput, SimpleStorage } from './autoCompleteWrongInput'

describe(AutoCompleteWrongInput.name, () => {



  it("se o erro acontecer em uma pagina que nao tem o input, nao deve fazer nada", () => {
    const { sut, storage } = makeSut()
    sut.init()
    expect(storage.set).toHaveBeenCalledTimes(0)
  })

  it.todo("se o error acontecer na primeira vez em uma pagina do tipo input deve salvar no local storage oque a pessoa digitou")


  function makeSut() {
    class SimpleStorageSpy implements SimpleStorage {
      get = vi.fn()
      set = vi.fn()
    }
    const storage = new SimpleStorageSpy()
    const sut = new AutoCompleteWrongInput(storage)

    return { sut, storage }
  }
})  