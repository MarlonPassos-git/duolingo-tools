import { expect, describe, it } from "vitest"
import {
  correctFooterContainer,
  incorrectFooterContainer
} from "../__mocks__/htmls"
import {
  getIncorrectFooterContainerElement,
  getInputElement
} from "./elements"

describe(getIncorrectFooterContainerElement.name, () => {
  it("should return null if is in documents with not incorrect container", () => {
    mockBodyWith(correctFooterContainer)
    expect(getIncorrectFooterContainerElement()).toBe(null)
  })

  it("should return a element if is in documents with incorrect container", () => {
    mockBodyWith(incorrectFooterContainer)
    expect(getIncorrectFooterContainerElement()).not.toBe(null)
  })
})

describe(getInputElement.name, () => {
  it("should return null if is in documents with not input element", () => {
    mockBodyWith(correctFooterContainer)
    expect(getInputElement()).toBe(null)
  })
})

function mockBodyWith(html: string) {
  window.document.body.innerHTML = html
}