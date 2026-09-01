import * as assert from 'node:assert'
import * as vscode from 'vscode'

suite('vscode-just-web', () => {
	test('registers the helloWorld command', async () => {
		const commands = await vscode.commands.getCommands(true)
		assert.ok(commands.includes('vscode-just-web.helloWorld'))
	})
})
