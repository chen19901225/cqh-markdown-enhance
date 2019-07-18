'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {convertAnchorHtml} from "./convertutil";
import {getTitleLevel, insertTitle} from "./title_search"

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('[cqh-markdown-enhance], your extension "cqh-markdown-enhance" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerTextEditorCommand('cqh-markdown-enhance.generateAnchorHtml', (textEditor, edit) => {
        // The code you place here will be executed every time your command is executed
        if(textEditor.selection.isEmpty) {
            let cursor = textEditor.selection.active;
            let line = textEditor.document.lineAt(cursor.line);
            textEditor.selection = new vscode.Selection(line.range.start, line.range.end);
        }
        if(textEditor.document.languageId != "markdown") {
            vscode.window.showErrorMessage("Only work with markdown");
            return;
        }
        // const position = textEditor.selection.active;
        const range = textEditor.selection;
        const selectedText = textEditor.document.getText(range);
        console.log(`[cqh-markdown-enhance], selectedText:${selectedText}`);
        const convertLine = convertAnchorHtml(selectedText);
        let newEndPosition = new vscode.Position(range.start.line, range.start.character + convertLine.length);
        edit.replace(range, convertLine);
        let end = range.end;
        textEditor.selection = new vscode.Selection(newEndPosition, newEndPosition);


        // Display a message box to the user
        
    });
    let wrapStrongDisposable = vscode.commands.registerTextEditorCommand("cqh-markdown-enhance.wrapStrong", (textEditor, edit) => {
        if(!(textEditor.selection)) {
            vscode.window.showErrorMessage("You must select a content to convert");
            return;
        }
        if(textEditor.document.languageId != "markdown") {
            vscode.window.showErrorMessage("Only work with markdown");
            return;
        }
        const selection = textEditor.selection;
        const text = textEditor.document.getText(selection);
        edit.replace(selection, `<strong>${text}</strong>`);
        
    })

    context.subscriptions.push(disposable);
    context.subscriptions.push(wrapStrongDisposable);


    let getCurrentTitleDisposable = vscode.commands.registerTextEditorCommand("cqh-markdown-enhance.get_current_title", (textEditor, edit) => {
        let currentTitleLevel = getTitleLevel(textEditor, edit);
        let setLevel = currentTitleLevel;
        if(setLevel === 0) {
            setLevel = 1;
        }
        insertTitle(textEditor, edit, setLevel);
    })
    context.subscriptions.push(getCurrentTitleDisposable);


    let getNextTitleDisposable = vscode.commands.registerTextEditorCommand("cqh-markdown-enhance.get_next_title", (textEditor, edit) => {
        let currentTitleLevel = getTitleLevel(textEditor, edit);
        let setLevel = currentTitleLevel;
        if(setLevel === 0) {
            setLevel = 1;
        }
        insertTitle(textEditor, edit, setLevel + 1);
    })
    context.subscriptions.push(getNextTitleDisposable);



    let getPrevTitleDisposable = vscode.commands.registerTextEditorCommand("cqh-markdown-enhance.get_prev_title", (textEditor, edit) => {
        let currentTitleLevel = getTitleLevel(textEditor, edit);
        let setLevel = currentTitleLevel;
        if(setLevel === 0) {
            setLevel = 1;
        }
        insertTitle(textEditor, edit, Math.max(1, setLevel -1));
    })
	context.subscriptions.push(getPrevTitleDisposable);
	// &emsp;
	let InsertTabDisposable =  vscode.commands.registerTextEditorCommand("cqh-markdown-enhance.insert_black", (textEditor, edit) => {
        edit.insert(textEditor.selection.active, "&emsp;");
    })
	context.subscriptions.push(InsertTabDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}