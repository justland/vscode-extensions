import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
	const helloWorld = vscode.commands.registerCommand('vscode-just-web.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vscode-just-web!')
	})

	context.subscriptions.push(helloWorld)
}

export function deactivate() {}
