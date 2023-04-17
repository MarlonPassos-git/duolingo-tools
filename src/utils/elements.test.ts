import { expect, describe, it } from "vitest"
import {
  correctFooterContainer,
  incorrectFooterContainer
} from "../__mocks__/htmls"
import { getIncorrectFooterContainer } from "./elements"

describe(getIncorrectFooterContainer.name, () => {
  it("should return null if is in documents with not incorrect container", () => {
    window.document.body.innerHTML = correctFooterContainer
    console.log("saa")
    expect(getIncorrectFooterContainer()).toBe(null)
  })

  it("should return a element if is in documents with incorrect container", () => {
    window.document.body.innerHTML = incorrectFooterContainer
    expect(getIncorrectFooterContainer()).not.toBe(null)
  })
})