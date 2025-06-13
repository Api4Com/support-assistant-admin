import "@testing-library/jest-dom"

import { TextEncoder, TextDecoder } from "node:util"

global.matchMedia = global.matchMedia || function() {
    return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    }
}

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as typeof global.TextDecoder

global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({
        valid: true,
        provider: "test"
    }),
    text: jest.fn().mockResolvedValue("")
})
  