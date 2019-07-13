import * as assert from 'assert';
import { before } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { getTitleLevelFromContent } from "../../title_search";
// import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
	});

	test('Sample test', () => {
		// test("test title level", () => {


		// });
		assert.equal(0, getTitleLevelFromContent(""));
	});


	test('Sample #', () => {
		// test("test title level", () => {


		// });
		assert.equal(1, getTitleLevelFromContent("#"));
		
	});

	test('Sample ##', () => {

		assert.equal(2, getTitleLevelFromContent(`##
			`));
	});
	test("sample ## with content", () => {
		assert.equal(2, getTitleLevelFromContent(`##
		showme the money
			`));
	})
	test("multiple title", () => {
		assert.equal(3, getTitleLevelFromContent(`##
		showme the money
		### sub title
			`));
	})
});
