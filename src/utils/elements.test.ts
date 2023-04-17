import { expect, describe, it } from "vitest"
import { correctFooterContainer } from "../__mocks__/htmls/correctFooterContainer"
import { getIncorrectFooterContainer } from "./elements"

describe(getIncorrectFooterContainer.name, () => {
  it("should return null if is in documents with not incorrect container", () => {
    window.document.body.innerHTML = correctFooterContainer
    console.log("saa")
    expect(getIncorrectFooterContainer()).toBe(null)
  })
})