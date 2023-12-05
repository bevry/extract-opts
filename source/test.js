/* eslint key-spacing:0 */
'use strict'

// Import
const deepEqual = require('assert-helpers').deepEqual
const kava = require('kava')
const eachr = require('eachr').default
const extractOpts = require('./')

// Test
kava.suite('extract-opts', function (suite, test) {
	// Prepare
	function cb() {}
	const fixtures = {
		empty: {
			in: [],
			out: [{}, null],
		},
		opts: {
			in: [{ a: 1 }],
			out: [{ a: 1 }, null],
		},
		cb: {
			in: [null, cb],
			out: [{}, cb],
		},
		both: {
			in: [{ a: 1 }, cb],
			out: [{ a: 1 }, cb],
		},
		mixed: {
			in: [{ a: 1, next: cb }],
			out: [{ a: 1 }, cb],
		},
		rename: {
			in: [{ a: 1, asd: cb }, null, { completionCallbackNames: ['asd'] }],
			out: [{ a: 1 }, cb],
		},
	}

	// Test
	eachr(fixtures, function (value, key) {
		test(key, function () {
			const actual = extractOpts.apply(extractOpts, value.in)
			deepEqual(actual, value.out, 'result comparison')
		})
	})
})
