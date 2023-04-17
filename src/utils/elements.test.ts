import { expect, describe, it } from "vitest"
import {
  correctFooterContainer,
  incorrectFooterContainer
} from "../__mocks__/htmls"
import { getIncorrectFooterContainerElement } from "./elements"

describe(getIncorrectFooterContainerElement.name, () => {
  it("should return null if is in documents with not incorrect container", () => {
    mockDocumentWith(correctFooterContainer)
    expect(getIncorrectFooterContainerElement()).toBe(null)
  })

  it("should return a element if is in documents with incorrect container", () => {
    mockDocumentWith(incorrectFooterContainer)
    expect(getIncorrectFooterContainerElement()).not.toBe(null)
  })

  function mockDocumentWith(html: string) {
    window.document.body.innerHTML = html
  }
})