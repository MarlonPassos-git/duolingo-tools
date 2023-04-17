import { expect, it, describe, vi, beforeAll } from "vitest";
import { isElementVisible } from "./isElementVisible"

describe(isElementVisible.name, () => {

  beforeAll(() => {
    document.body.innerHTML = ''
  })

  it('should be return false if element is null', () => {
    expect(isElementVisible(null)).toBe(false)
  })

  it('should be return false if element is disabled', () => {
    const element = document.createElement('input')
    element.disabled = true

    expect(isElementVisible(element)).toBe(false)
  })

  it('should be return false if element is not in DOM', () => {
    const element = document.createElement('div')

    expect(isElementVisible(element)).toBe(false)
  })

  it('should be return true if element is in DOM', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    expect(isElementVisible(element)).toBe(true)
  })
})
