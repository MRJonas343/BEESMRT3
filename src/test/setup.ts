/// <reference types="vitest" />

import { afterEach } from "node:test"
import { cleanup } from "@testing-library/react"
afterEach(() => {
	cleanup()
})
