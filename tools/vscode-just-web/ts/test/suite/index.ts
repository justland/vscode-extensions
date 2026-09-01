import { globSync } from 'node:fs'
import * as path from 'node:path'

import Mocha = require('mocha')

export async function run(): Promise<void> {
	const mocha = new Mocha({ ui: 'tdd', color: true })
	const testsRoot = path.resolve(__dirname, '..')

	for (const file of globSync('**/*.test.js', { cwd: testsRoot })) {
		mocha.addFile(path.resolve(testsRoot, file))
	}

	const failures = await new Promise<number>((resolve) => mocha.run(resolve))
	if (failures > 0) throw new Error(`${failures} tests failed.`)
}
