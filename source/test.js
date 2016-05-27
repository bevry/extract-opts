/* eslint key-spacing:0 */

// Import
const deepEqual = require('assert-helpers').deepEqual
const joe = require('joe')
const eachr = require('eachr')
const extractOpts = require('../')

// Test
joe.describe('extract-opts', function (describe, it) {
	// Prepare
	function cb () {}
	const fixtures = {
		empty: {
			in:  [],
			out: [{}, null]
		},
		opts: {
			in:  [{a:1}],
			out: [{a:1}, null]
		},
		cb: {
			in:  [null, cb],
			out: [{}, cb]
		},
		both: {
			in:  [{a:1}, cb],
			out: [{a:1}, cb]
		},
		mixed: {
			in:  [{a:1, next:cb}],
			out: [{a:1}, cb]
		},
		rename: {
			in:  [{a:1, asd:cb}, null, {completionCallbackNames: ['asd']}],
			out: [{a:1}, cb]
		}
	}

	// Test
	eachr(fixtures, function (value, key) {
		it(key, function () {
			const actual = extractOpts.apply(extractOpts, value.in)
			deepEqual(actual, value.out, 'result comparison')
		})
	})
})
