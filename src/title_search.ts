import * as vscode from "vscode";

export function getTitleLevel(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    let cursor = textEditor.selection.active;
    let content = textEditor.document.getText(new vscode.Range(new vscode.Position(0, 0), cursor));
    return getTitleLevelFromContent(content);

}

export function insertTitle(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, level: number) {
    let content = "#".repeat(level);
    let cusor = textEditor.selection.active;
    edit.insert(cusor, content);
}

export function getTitleLevelFromContent(content: string) {
    let lines = content.match(/[^\r\n]+/g)
    if(!lines) {
        return 0;
    }
    let getLineLevel = (line: string) => {
        line = line.trim();
        let count = 0;
        for (let ch of line) {
            if (ch !== '#') {
                break;
            }
            count += 1;
        }
        return count;
    }
    let length = lines.length;
    for (let i = length -1; i >= 0; i--) {
        let currentLine = lines[i];
        let currentLevel = getLineLevel(currentLine);
        if (currentLevel > 0) {
            return currentLevel;
        }
    }
    return 0;
}