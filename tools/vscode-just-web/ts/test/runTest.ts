import * as path from 'node:path'
import { runTests } from '@vscode/test-electron'

async function main() {
	// The folder containing the extension manifest, passed as --extensionDevelopmentPath
	const extensionDevelopmentPath = path.resolve(__dirname, '../../')
	// The test runner, passed as --extensionTestsPath
	const extensionTestsPath = path.resolve(__dirname, './suite/index')

	await runTests({ extensionDevelopmentPath, extensionTestsPath })
}

main().catch((err) => {
	console.error('Failed to run tests', err)
	process.exit(1)
})
