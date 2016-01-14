# Import
{expect} = require('chai')
joe = require('joe')
eachr = require('eachr')
extractOpts = require('../..')

# Test
joe.describe 'extract-opts', (describe,it) ->
	# Prepare
	cb = ->
	fixtures =
		empty:
			in:  []
			out: [{}, null]
		opts:
			in:  [{a:1}]
			out: [{a:1}, null]
		cb:
			in:  [null, cb]
			out: [{}, cb]
		both:
			in:  [{a:1}, cb]
			out: [{a:1}, cb]
		mixed:
			in:  [{a:1, next:cb}]
			out: [{a:1}, cb]
		rename:
			in:  [{a:1, asd:cb}, null, {completionCallbackNames:['asd']}]
			out: [{a:1}, cb]

	# Test
	eachr fixtures, (value,key) ->
		it key, ->
			actual = extractOpts.apply(extractOpts, value.in)
			expect(actual).to.deep.equal(value.out)
